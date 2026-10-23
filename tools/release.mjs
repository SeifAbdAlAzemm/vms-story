// =====================================================================
// RELEASE  ·  npm run release  →  root index.html (served by GitHub Pages)
//  0. preflight: sharp must load on this platform
//  1. run the normal build (tools/build.mjs)  →  dist/index.html
//  2. copy dist/index.html → index.html
//  3. verify both files are byte-identical (SHA-256); fail if not
// Cross-platform: Node fs / crypto / child_process only. No cp, cmp or copy.
// =====================================================================
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD = path.join(ROOT, "tools", "build.mjs");
const DIST_HTML = path.join(ROOT, "dist", "index.html");
const ROOT_HTML = path.join(ROOT, "index.html");

const fail = (msg) => { console.error("\n✖ RELEASE FAILED: " + msg + "\n"); process.exit(1); };
const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

/* ---------- 0. preflight ----------
   build.mjs only warns when sharp is missing and then embeds unoptimised images,
   which produces a different (larger) index.html. A release must never ship that. */
try {
  await import("sharp");
} catch {
  fail(`sharp cannot load on ${process.platform}-${process.arch}. ` +
       `node_modules was installed on another platform. Run "npm ci" here, then release again.`);
}

/* ---------- 1. build ---------- */
const build = spawnSync(process.execPath, [BUILD], { cwd: ROOT, stdio: "inherit" });
if (build.error) fail("could not start the build: " + build.error.message);
if (build.status !== 0) fail(`build exited with ${build.status ?? "signal " + build.signal}. Nothing was copied.`);
if (!fs.existsSync(DIST_HTML)) fail("build finished but dist/index.html does not exist. Nothing was copied.");

/* ---------- 2. copy ---------- */
const previous = fs.existsSync(ROOT_HTML) ? sha256(fs.readFileSync(ROOT_HTML)) : null;
fs.copyFileSync(DIST_HTML, ROOT_HTML);

/* ---------- 3. verify ---------- */
const dist = fs.readFileSync(DIST_HTML);
const root = fs.readFileSync(ROOT_HTML);
const distHash = sha256(dist);
const rootHash = sha256(root);
if (dist.length !== root.length || !dist.equals(root) || distHash !== rootHash) {
  fail(`index.html does not match dist/index.html after copy\n  dist/index.html  ${distHash}\n  index.html       ${rootHash}`);
}

const status = previous === null ? "created" : previous === rootHash ? "unchanged (identical to previous release)" : "UPDATED";
console.log(`
  ✔ RELEASE OK
  dist/index.html == index.html   byte-identical
  SHA-256                          ${rootHash}
  Size                             ${(root.length / 1048576).toFixed(2)} MB (${root.length} bytes)
  Root index.html                  ${status}
  Next: review, commit and push master yourself. Pushing master deploys to GitHub Pages.
`);
