// =====================================================================
// BUILD  ·  npm run build  →  dist/index.html (single, offline, self-contained)
//  1. load the data layer        5. inline the font (base64)
//  2. render data into HTML      6. embed Jira / process images as WebP
//  3. inline the icon sprite     7. embed real prototype exports if present
//  4. inline CSS + JS + GSAP     8. verify: beats, markers, zero external refs
// =====================================================================
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { makeRenderers } from "./render.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const read = (p) => fs.readFileSync(p, "utf8");
const fail = (msg) => { console.error("\n✖ BUILD FAILED: " + msg + "\n"); process.exit(1); };

let sharp = null;
try { sharp = (await import("sharp")).default; } catch { console.warn("! sharp not installed — images embedded without optimisation"); }

/* ---------- 1. data layer ---------- */
const dataFiles = ["project", "stakeholders", "raci", "features", "requirements", "jira", "prototype", "beats"];
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of dataFiles) vm.runInContext(read(path.join(SRC, "scripts/data", f + ".js")), sandbox, { filename: f + ".js" });
const D = sandbox.window.VMS_DATA;

/* ---------- images ---------- */
async function toDataUri(abs, { width, quality = 86 } = {}) {
  const buf = fs.readFileSync(abs);
  if (!sharp) return `data:image/${path.extname(abs).slice(1).replace("jpg", "jpeg")};base64,${buf.toString("base64")}`;
  let img = sharp(buf);
  const meta = await img.metadata();
  if (width && meta.width > width) img = img.resize({ width });
  const out = await img.webp({ quality, effort: 5 }).toBuffer();
  return `data:image/webp;base64,${out.toString("base64")}`;
}

/* ---------- 7. prototype (only the configured filenames are ever read) ---------- */
const protoDir = path.join(SRC, "assets/prototype");
const prototypeImages = {};
const P = D.prototype;
const shown = [P.hero, ...P.support].filter((s) => s.enabled);
let protoFound = 0;
const protoNames = [];
for (const s of shown) {
  if (!/^prototype_0[1-5]\.(png|jpg|jpeg|webp)$/i.test(s.filename)) fail(`prototype filename not allowed: ${s.filename}`);
  const abs = path.join(protoDir, s.filename);
  if (fs.existsSync(abs) && fs.statSync(abs).size > 0) {
    // hero keeps native resolution so the Arabic UI stays sharp; supporting screens are shown smaller
    const opt = s === P.hero ? { quality: 90 } : { width: 1200, quality: 88 };
    prototypeImages[s.filename] = await toDataUri(abs, opt);
    protoFound++; protoNames.push(s.title);
  }
}

/* ---------- 2. render ---------- */
const R = makeRenderers(D, { prototypeImages });
let html = read(path.join(SRC, "index.html"));
html = html.replace(/<!--@render:(\w+)-->/g, (_, name) => { if (!R[name]) fail(`no renderer for @render:${name}`); return R[name](); });

/* ---------- 3. sprite ---------- */
html = html.replace(/<!--@include:([\w/.-]+)-->/g, (_, rel) => read(path.join(SRC, rel)));

/* ---------- 4 + 5. CSS (font inlined) ---------- */
const fontB64 = fs.readFileSync(path.join(SRC, "assets/fonts/inter-latin-wght.woff2")).toString("base64");
const cssLinks = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">\n?/g)];
let css = cssLinks.map((m) => `/* ${m[1]} */\n` + read(path.join(SRC, m[1]))).join("\n");
css = css.replace(/url\("\.\.\/assets\/fonts\/inter-latin-wght\.woff2"\)/g, `url("data:font/woff2;base64,${fontB64}")`);
html = html.replace(/<!-- @styles:[^>]*-->\n/, "");
cssLinks.forEach((m, i) => { html = html.replace(m[0], () => (i === 0 ? `<style>\n${css}\n</style>\n` : "")); });

/* ---------- 4. JS (vendor + data + engine + scenes) ---------- */
const scriptTags = [...html.matchAll(/<script src="([^"]+)"><\/script>\n?/g)];
html = html.replace(/<!-- @scripts:[^>]*-->\n/, "");
for (const m of scriptTags) {
  const code = read(path.resolve(SRC, m[1])).replace(/<\/script/gi, "<\\/script");
  html = html.replace(m[0], () => `<script>/* ${path.basename(m[1])} */\n${code}\n</script>\n`);
}

/* ---------- 6. Jira + process images ---------- */
const assetTokens = [...new Set([...html.matchAll(/@asset\(([^)]+)\)/g)].map((m) => m[1]))];
const assetUris = {};
for (const rel of assetTokens) {
  const abs = path.join(SRC, "assets", rel);
  if (!fs.existsSync(abs)) fail(`missing asset ${rel}`);
  const width = rel.startsWith("jira/") ? 1720 : rel.startsWith("hero/") ? 1672 : 720;   // hero/ = full-canvas supplied slides, kept at native width
  assetUris[rel] = await toDataUri(abs, { width, quality: rel.startsWith("jira/") ? 90 : rel.startsWith("hero/") ? 86 : 84 });
}
html = html.replace(/@asset\(([^)]+)\)/g, (_, rel) => assetUris[rel]);

/* ---------- 8. verification ---------- */
if (/<!--@(render|include)/.test(html)) fail("unresolved build marker");
const sceneBeats = [...html.matchAll(/<section class="scene" id="([\w-]+)" data-beats="(\d+)"/g)].map((m) => [m[1], +m[2]]);
const totalBeats = sceneBeats.reduce((a, [, b]) => a + b, 0);
if (totalBeats !== D.beats.length) fail(`scene beats (${totalBeats}) ≠ beats data (${D.beats.length})`);
let bi = 0;
for (const [id, b] of sceneBeats) for (let k = 0; k < b; k++, bi++) if (D.beats[bi].scene !== id) fail(`beat ${bi + 1} belongs to ${D.beats[bi].scene}, expected ${id}`);
const external = [];
for (const m of html.matchAll(/\b(?:src|href)\s*=\s*"([^"]*)"/g)) if (!/^(data:|#)/.test(m[1])) external.push(m[1]);
for (const m of html.matchAll(/url\(\s*["']?([^"')]+)/g)) if (!/^(data:|#)/.test(m[1])) external.push(m[1]);
const scriptSrc = /<script[^>]+src=/.test(html);
if (external.length || scriptSrc) fail("external runtime references found: " + external.slice(0, 5).join(", "));
const banned = ["1de14123", "13893f4d", "c8a68dbc", "Capital Courier", "UNIFI", "Olivia Rhye", "shipment"];
for (const b of banned) if (html.toLowerCase().includes(b.toLowerCase())) fail(`inspiration content detected: ${b}`);

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, "index.html"), html);
fs.copyFileSync(path.join(ROOT, "tools/README.dist.txt"), path.join(DIST, "README.txt"));

const mb = (fs.statSync(path.join(DIST, "index.html")).size / 1048576).toFixed(2);
console.log(`
Build complete
  Output:                    dist/index.html
  Scenes / beats:            ${sceneBeats.length} scenes · ${totalBeats} beats
  Jira assets:               ${assetTokens.filter((a) => a.startsWith("jira/")).length}
  Process thumbnails:        ${assetTokens.filter((a) => a.startsWith("process/")).length}
  Prototype:                 ${protoFound}/${shown.length} real images found${protoNames.length ? " (" + protoNames.join(", ") + ")" : ""}${protoFound < shown.length ? " · others shown as placeholders" : ""}
  Final HTML size:           ${mb} MB
  External runtime requests: 0
`);
