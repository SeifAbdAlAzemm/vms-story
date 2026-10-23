// =====================================================================
// QA  ·  npm run qa   (Playwright + Chromium)
// Phases (default: all):  --only=functional,visual,viewports,offline,
//                         failure,reduced,perf
// Output: qa/report.json, qa/QA-REPORT.md, qa/shots/*, qa/sheets/*
// =====================================================================
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const URL = "file://" + path.join(ROOT, "dist/index.html");
const OUT = path.join(ROOT, "qa");
const only = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7).split(",").filter(Boolean);
const want = (p) => !only.length || only.includes(p);
for (const d of ["shots", "sheets"]) fs.mkdirSync(path.join(OUT, d), { recursive: true });
const report = { url: URL, started: new Date().toISOString(), phases: {} };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SETTLE = 1500;

const browser = await chromium.launch();

async function open(opts = {}) {
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 1920, height: 1080 }, deviceScaleFactor: opts.dsf || 1, reducedMotion: opts.reducedMotion || "no-preference", javaScriptEnabled: opts.js !== false });
  const page = await ctx.newPage();
  const log = { errors: [], warnings: [], requests: [] };
  page.on("pageerror", (e) => log.errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") log.errors.push(m.text()); if (m.type() === "warning") log.warnings.push(m.text()); });
  await ctx.route("**/*", (route) => { const u = route.request().url(); if (!/^(file:|data:|blob:)/.test(u)) { log.requests.push(u); return route.abort(); } return route.continue(); });
  if (opts.init) await page.addInitScript(opts.init);
  await page.goto(URL);
  await sleep(opts.js === false ? 400 : 1800);
  return { ctx, page, log };
}

/* in-page layout audit for the scene in view */
const AUDIT = () => {
  const vw = innerWidth, vh = innerHeight, issues = [];
  const mid = scrollY + vh / 2;
  const sc = [...document.querySelectorAll(".scene")].find((s) => { const r = s.getBoundingClientRect(); return mid >= r.top + scrollY && mid < r.top + scrollY + r.height; });
  if (!sc) return { scene: null, issues: ["no scene in view"] };
  const safe = sc.querySelector(".safe"), sr = safe.getBoundingClientRect();
  const topH = document.querySelector(".topbar").offsetHeight, rail = document.querySelector(".rail").getBoundingClientRect();
  if (sr.top < topH - 1 || sr.bottom > rail.top + 1 || sr.left < -1 || sr.right > vw + 1) issues.push(`safe area outside chrome: ${[sr.left, sr.top, sr.right, sr.bottom].map(Math.round)}`);
  const effOpacity = (el) => { let o = 1; for (let e = el; e && e !== safe.parentElement; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity); return o; };
  const textEls = [...safe.querySelectorAll("*")].filter((el) => !el.closest("svg") && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && getComputedStyle(el).display !== "none");
  const tol = 3 * (sr.width / 1600);
  const vis = [];
  for (const el of textEls) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || effOpacity(el) < 0.15) continue;
    if (r.left < sr.left - tol || r.right > sr.right + tol || r.top < sr.top - tol || r.bottom > sr.bottom + tol) issues.push(`outside canvas: "${el.textContent.trim().slice(0, 40)}"`);
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== "visible") issues.push(`clipped: "${el.textContent.trim().slice(0, 40)}"`);
    vis.push({ el, r });
  }
  for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
    const a = vis[i], b = vis[j];
    if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
    const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
    if (w > 2 && h > 2 && w * h > 0.15 * Math.min(a.r.width * a.r.height, b.r.width * b.r.height)) issues.push(`overlap: "${a.el.textContent.trim().slice(0, 28)}" × "${b.el.textContent.trim().slice(0, 28)}"`);
  }
  // images: aspect ratio preserved, fully inside the canvas, decoded, not upscaled past native
  for (const img of safe.querySelectorAll("img")) {
    const r = img.getBoundingClientRect();
    if (!r.width || effOpacity(img) < 0.15) continue;
    if (!img.complete || !img.naturalWidth) { issues.push(`image not decoded: ${img.alt.slice(0, 30)}`); continue; }
    const want = img.naturalWidth / img.naturalHeight, got = img.clientWidth / img.clientHeight; // content box: borders excluded
    if (Math.abs(got / want - 1) > 0.01) issues.push(`image aspect distorted (${got.toFixed(3)} vs ${want.toFixed(3)}): ${img.alt.slice(0, 30)}`);
    if (r.left < sr.left - tol || r.right > sr.right + tol || r.top < sr.top - tol || r.bottom > sr.bottom + tol) issues.push(`image outside canvas: ${img.alt.slice(0, 30)}`);
    const fr = img.parentElement.getBoundingClientRect();
    if (r.bottom > fr.bottom + 1.5 || r.right > fr.right + 1.5) issues.push(`image clipped by frame: ${img.alt.slice(0, 30)}`);
    if (r.width * devicePixelRatio > img.naturalWidth * 1.05) issues.push(`image upscaled ${(r.width * devicePixelRatio / img.naturalWidth).toFixed(2)}×: ${img.alt.slice(0, 30)}`);
  }
  return { scene: sc.id, issues };
};

/* time-based intros (opening on load, Meet the Team on arrival) must finish before a shot */
const introsDone = (page) => page.waitForFunction(() => ![VMS.coverIntro, VMS.intro, VMS.teamIntro, VMS.taxIntro].some((t) => t && t.isActive()), null, { timeout: 6000 }).catch(() => {});

async function stepAll(page, label, { shots = false, settle = SETTLE } = {}) {
  const n = await page.evaluate(() => VMS.nav.count);
  const positions = await page.evaluate(() => VMS.nav.positions);
  const rows = [];
  for (let i = 0; i < n; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), positions[i]);
    await sleep(settle);
    await introsDone(page);
    const a = await page.evaluate(AUDIT);
    rows.push({ beat: i + 1, ...a });
    if (shots) await page.screenshot({ path: path.join(OUT, "shots", `${label}-b${String(i + 1).padStart(2, "0")}.png`) });
  }
  return rows;
}

async function sheet(files, out, cols = 3, w = 640) {
  if (!files.length) return;
  const h = Math.round(w * 9 / 16), rows = Math.ceil(files.length / cols);
  const tiles = await Promise.all(files.map(async (f, i) => ({ input: await sharp(f).resize(w, h, { fit: "contain", background: "#fff" }).toBuffer(), left: (i % cols) * (w + 8), top: Math.floor(i / cols) * (h + 8) })));
  await sharp({ create: { width: cols * (w + 8) - 8, height: rows * (h + 8) - 8, channels: 3, background: "#ffffff" } }).composite(tiles).png().toFile(out);
}

/* ---------------- FUNCTIONAL ---------------- */
if (want("functional")) {
  const { ctx, page, log } = await open();
  const r = {};
  r.anim = await page.evaluate(() => document.documentElement.classList.contains("anim"));
  r.beats = await page.evaluate(() => VMS.nav.count);
  r.timelineWarnings = await page.evaluate(() => VMS.warnings);
  r.scrollTriggers = await page.evaluate(() => ScrollTrigger.getAll().length);
  r.domNodes = await page.evaluate(() => document.querySelectorAll("*").length);
  const counter = () => page.textContent("#beatCounter");
  const atBeat = () => page.evaluate(() => { const p = VMS.nav.positions; return p.indexOf(p.reduce((b, y) => (Math.abs(y - scrollY) < Math.abs(b - scrollY) ? y : b), p[0])) + 1; });
  const onExact = () => page.evaluate(() => VMS.nav.positions.some((y) => Math.abs(y - scrollY) < 2));
  const keys = {};
  for (const [k, expect] of [["ArrowRight", 2], ["Space", 3], ["PageDown", 4], ["ArrowLeft", 3], ["PageUp", 2]]) {
    await page.keyboard.press(k); await sleep(1300); keys[k] = { counter: await counter(), beat: await atBeat(), expect, ok: (await atBeat()) === expect && (await onExact()) };
  }
  await page.keyboard.press("End"); await sleep(900); keys.End = { counter: await counter(), ok: (await atBeat()) === r.beats };
  await page.keyboard.press("Home"); await sleep(900); keys.Home = { counter: await counter(), ok: (await atBeat()) === 1 };
  // rapid presses: 8 × Next within ~250 ms must end on an exact beat, at most 2 beats ahead (one queued)
  await page.evaluate(() => window.scrollTo(0, VMS.nav.positions[9])); await sleep(1200);
  for (let i = 0; i < 8; i++) { await page.keyboard.press("ArrowRight"); await sleep(30); }
  await sleep(3200);
  const rb = await atBeat();
  keys.rapid = { from: 10, landed: rb, exact: await onExact(), ok: rb >= 11 && rb <= 12 && (await onExact()) };
  // buttons
  await page.click("#btnNext"); await sleep(1300); keys.btnNext = { beat: await atBeat(), ok: (await atBeat()) === rb + 1 };
  await page.click("#btnPrev"); await sleep(1300); keys.btnPrev = { beat: await atBeat(), ok: (await atBeat()) === rb };
  // free scroll burst, then Next lands on an exact beat
  await page.mouse.move(900, 500);
  for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, 260); await sleep(25); }
  await sleep(800); await page.keyboard.press("ArrowRight"); await sleep(1600);
  keys.freeScrollThenNext = { exact: await onExact(), ok: await onExact() };
  // chapter jump via rail tick
  await page.click('.rail-ticks li[data-chapter="ch7"] button'); await sleep(1200);
  keys.chapterJump = { beat: await atBeat(), ok: (await atBeat()) === 26 };
  // notes
  await page.keyboard.press("n"); await sleep(400);
  const notesOpen = await page.evaluate(() => !document.getElementById("notes").hidden && document.getElementById("nKey").textContent.length > 10);
  await page.screenshot({ path: path.join(OUT, "shots", "notes-open.png") });
  await page.keyboard.press("n"); await sleep(300);
  keys.notes = { ok: notesOpen && (await page.evaluate(() => document.getElementById("notes").hidden)) };
  // fullscreen
  await page.click("#btnPresent"); await sleep(900);
  const fs1 = await page.evaluate(() => ({ fs: !!document.fullscreenElement, presenting: document.body.classList.contains("presenting"), controls: getComputedStyle(document.querySelector(".controls")).display }));
  await page.keyboard.press("n"); await sleep(300);
  const notesInFs = await page.evaluate(() => !document.getElementById("notes").hidden);
  await page.screenshot({ path: path.join(OUT, "shots", "presenting.png") });
  await page.evaluate(() => document.exitFullscreen()); await sleep(600);
  const fs2 = await page.evaluate(() => ({ fs: !!document.fullscreenElement, presenting: document.body.classList.contains("presenting") }));
  keys.fullscreen = { enter: fs1, notesHiddenInFs: !notesInFs, exit: fs2, ok: fs1.fs && fs1.presenting && fs1.controls === "none" && !notesInFs && !fs2.fs && !fs2.presenting };
  // stakeholder Q&A popover
  await page.evaluate(() => window.scrollTo(0, VMS.nav.positions[14])); await sleep(1400);
  await page.click('#ch4 .chip[data-i="7"]'); await sleep(300);
  const pop = await page.evaluate(() => { const p = document.getElementById("stakePop"); return !p.hidden && p.textContent.includes("Decommissioning"); });
  await page.screenshot({ path: path.join(OUT, "shots", "stakeholder-popover.png") });
  keys.stakeholderPopover = { ok: pop };
  r.keys = keys;
  r.console = log;
  r.pass = r.anim && r.beats === 37 && !r.timelineWarnings.length && Object.values(keys).every((k) => k.ok) && !log.errors.length && !log.warnings.length && !log.requests.length;
  report.phases.functional = r;
  await ctx.close();
  console.log("functional:", r.pass ? "PASS" : "FAIL", JSON.stringify(Object.fromEntries(Object.entries(keys).map(([k, v]) => [k, v.ok]))));
}

/* ---------------- VISUAL (1920×1080, every beat + scrub fractions) ---------------- */
if (want("visual")) {
  const { ctx, page, log } = await open();
  const rows = await stepAll(page, "fhd", { shots: true });
  // scrub fractions for the signature scenes
  const scrub = [];
  for (const id of ["prologue", "ch2", "ch5a", "ch6b", "ch8a", "ch8c", "finale-a"]) {
    const range = await page.evaluate((id) => { const s = document.getElementById(id); const top = s.getBoundingClientRect().top + scrollY; const vh = s.querySelector(".stage").offsetHeight; const intro = s.dataset.entry === "intro"; return { a: intro ? top : top - vh, b: top + s.offsetHeight - vh }; }, id);
    const files = [];
    for (const f of [0, 0.25, 0.5, 0.75, 1]) {
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(range.a + (range.b - range.a) * f)); await sleep(1300);
      const file = path.join(OUT, "shots", `scrub-${id}-${Math.round(f * 100)}.png`); await page.screenshot({ path: file }); files.push(file);
    }
    scrub.push(id); await sheet(files, path.join(OUT, "sheets", `scrub-${id}.png`), 5, 384);
  }
  const shots = fs.readdirSync(path.join(OUT, "shots")).filter((f) => /^fhd-b\d+\.png$/.test(f)).sort().map((f) => path.join(OUT, "shots", f));
  for (let i = 0; i < shots.length; i += 9) await sheet(shots.slice(i, i + 9), path.join(OUT, "sheets", `beats-${String(i / 9 + 1).padStart(2, "0")}.png`), 3, 640);
  const issues = rows.filter((r) => r.issues.length);
  report.phases.visual = { beats: rows.length, issues, scrub, console: log, pass: !issues.length && !log.errors.length };
  await ctx.close();
  console.log("visual:", report.phases.visual.pass ? "PASS" : "FAIL", issues.length ? JSON.stringify(issues).slice(0, 1500) : "");
}

/* ---------------- VIEWPORTS ---------------- */
if (want("viewports")) {
  const vps = [
    { name: "1366x768", viewport: { width: 1366, height: 768 } },
    { name: "1280x800", viewport: { width: 1280, height: 800 } },
    { name: "1024x768", viewport: { width: 1024, height: 768 } },
    { name: "1920x1080@125%", viewport: { width: 1536, height: 864 }, dsf: 1.25 },
    { name: "1920x1080@150%", viewport: { width: 1280, height: 720 }, dsf: 1.5 },
  ];
  const out = [];
  for (const v of vps) {
    const { ctx, page, log } = await open(v);
    const rows = await stepAll(page, v.name.replace(/[^\w]/g, "_"), { shots: false, settle: 1100 });
    const files = [];
    for (const i of [0, 1, 2, 3, 4, 6, 7, 8, 11, 16, 17, 19, 21, 25, 27, 28, 29, 30, 35]) {   // opening + all three prologue beats, From Ideation to Creation, One operational moment, Problem in numbers, representative dense beats (incl. System boundary, Given/When/Then) + both Chapter-8 evidence beats
      await page.evaluate((y) => window.scrollTo(0, y), (await page.evaluate(() => VMS.nav.positions))[i]); await sleep(1200); await introsDone(page);
      const f = path.join(OUT, "shots", `${v.name.replace(/[^\w]/g, "_")}-b${String(i + 1).padStart(2, "0")}.png`); await page.screenshot({ path: f }); files.push(f);
    }
    await sheet(files, path.join(OUT, "sheets", `viewport-${v.name.replace(/[^\w]/g, "_")}.png`), 4, 480);
    const issues = rows.filter((r) => r.issues.length);
    out.push({ name: v.name, beats: rows.length, issues, pageScroll: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors: log.errors });
    await ctx.close();
  }
  report.phases.viewports = { results: out, pass: out.every((o) => !o.issues.length && !o.pageScroll && !o.errors.length) };
  console.log("viewports:", report.phases.viewports.pass ? "PASS" : "FAIL", JSON.stringify(out.map((o) => [o.name, o.issues.length, o.issues.slice(0, 3)])).slice(0, 1500));
}

/* ---------------- OFFLINE ---------------- */
if (want("offline")) {
  const { ctx, page, log } = await open();
  await stepAll(page, "offline", { settle: 250 });
  const html = fs.readFileSync(path.join(ROOT, "dist/index.html"), "utf8");
  const ext = [...html.matchAll(/\b(?:src|href)\s*=\s*"((?:https?:)?\/\/[^"]+)"/g)].map((m) => m[1]);
  report.phases.offline = { blockedRequests: log.requests, externalRefsInHtml: ext, sizeMB: +(fs.statSync(path.join(ROOT, "dist/index.html")).size / 1048576).toFixed(2), pass: !log.requests.length && !ext.length };
  await ctx.close();
  console.log("offline:", report.phases.offline.pass ? "PASS" : "FAIL", log.requests.length, "requests");
}

/* ---------------- FAILURE MODES ---------------- */
if (want("failure")) {
  const res = {};
  // a) JavaScript disabled
  {
    const { ctx, page } = await open({ js: false });
    const vis = await page.evaluate(() => [...document.querySelectorAll(".scene")].map((s) => ({ id: s.id, visible: [...s.querySelectorAll(".title, .p-q, .fb-statement, .kf, .cap, .chip, .feat, .obj, .ac")].every((el) => getComputedStyle(el).opacity === "1"), text: s.innerText.length })));
    for (const id of ["ch1", "ch5b", "ch7", "ch8b", "ch8c"]) { await page.evaluate((id) => document.getElementById(id).scrollIntoView(), id); await sleep(200); await page.screenshot({ path: path.join(OUT, "shots", `nojs-${id}.png`) }); }
    res.noJs = { scenes: vis, ok: vis.every((v) => v.visible && v.text > 20) };
    await ctx.close();
  }
  // b) GSAP unavailable
  {
    const { ctx, page, log } = await open({ init: () => { Object.defineProperty(window, "gsap", { get: () => undefined, set: () => {}, configurable: false }); } });
    const st = await page.evaluate(() => ({ anim: document.documentElement.classList.contains("anim"), err: VMS.animError, beats: VMS.nav.count }));
    const vis = await page.evaluate(() => [...document.querySelectorAll(".title, .kf, .cap, .chip, .feat, .obj, .ac, .ch, .f-chip")].every((el) => getComputedStyle(el).opacity === "1"));
    await page.keyboard.press("ArrowRight"); await sleep(1300);
    const moved = await page.evaluate(() => scrollY > 10);
    for (const id of ["ch2", "ch6b"]) { await page.evaluate((id) => document.getElementById(id).scrollIntoView(), id); await sleep(300); await page.screenshot({ path: path.join(OUT, "shots", `nogsap-${id}.png`) }); }
    res.gsapUnavailable = { state: st, allVisible: vis, navigationWorks: moved, uncaught: log.errors, ok: !st.anim && vis && moved };
    await ctx.close();
  }
  report.phases.failure = { ...res, pass: res.noJs.ok && res.gsapUnavailable.ok };
  console.log("failure:", report.phases.failure.pass ? "PASS" : "FAIL", JSON.stringify({ noJs: res.noJs.ok, gsap: res.gsapUnavailable.ok, scrollerScriptError: res.gsapUnavailable.uncaught.length }));
}

/* ---------------- REDUCED MOTION ---------------- */
if (want("reduced")) {
  const { ctx, page, log } = await open({ reducedMotion: "reduce" });
  const rows = await stepAll(page, "reduced", { settle: 350 });
  const files = [];
  for (const i of [0, 1, 2, 3, 4, 13, 17, 23, 27, 30, 35, 36]) { await page.evaluate((y) => window.scrollTo(0, y), (await page.evaluate(() => VMS.nav.positions))[i]); await sleep(400); const f = path.join(OUT, "shots", `reduced-b${i + 1}.png`); await page.screenshot({ path: f }); files.push(f); }
  await sheet(files, path.join(OUT, "sheets", "reduced-motion.png"), 3, 640);
  const issues = rows.filter((r) => r.issues.length);
  report.phases.reduced = { beats: rows.length, issues, errors: log.errors, pass: rows.length === 37 && !issues.length && !log.errors.length };
  await ctx.close();
  console.log("reduced:", report.phases.reduced.pass ? "PASS" : "FAIL", issues.length);
}

/* ---------------- PERFORMANCE (4× CPU throttle) ---------------- */
if (want("perf")) {
  const { ctx, page, log } = await open({ viewport: { width: 1366, height: 768 } });
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.evaluate(() => { window.__ft = []; let last = performance.now(); const f = (t) => { window.__ft.push(t - last); last = t; requestAnimationFrame(f); }; requestAnimationFrame(f); });
  for (let i = 0; i < 36; i++) { await page.keyboard.press("ArrowRight"); await sleep(1250); }
  const ft = await page.evaluate(() => window.__ft.slice(5));
  ft.sort((a, b) => a - b);
  const pct = (p) => +ft[Math.floor(ft.length * p)].toFixed(1);
  const metrics = await cdp.send("Performance.getMetrics").catch(() => ({ metrics: [] }));
  report.phases.perf = { throttle: "4x CPU", frames: ft.length, p50ms: pct(0.5), p95ms: pct(0.95), p99ms: pct(0.99), maxMs: +ft[ft.length - 1].toFixed(1), approxFpsMedian: Math.round(1000 / pct(0.5)), domNodes: await page.evaluate(() => document.querySelectorAll("*").length), errors: log.errors, note: "Headless Chromium renders in software; treat as relative, not absolute." };
  report.phases.perf.pass = report.phases.perf.p95ms < 50 && !log.errors.length;
  await ctx.close();
  console.log("perf:", JSON.stringify(report.phases.perf));
}

await browser.close();
report.finished = new Date().toISOString();
const prev = fs.existsSync(path.join(OUT, "report.json")) ? JSON.parse(fs.readFileSync(path.join(OUT, "report.json"), "utf8")) : { phases: {} };
const merged = { ...prev, ...report, phases: { ...prev.phases, ...report.phases } };
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(merged, null, 2));
const lines = ["# VMS story — QA report", "", `Generated ${merged.finished}`, "", "| Phase | Result |", "|---|---|"];
for (const [k, v] of Object.entries(merged.phases)) lines.push(`| ${k} | ${v.pass ? "PASS" : "FAIL"} |`);
fs.writeFileSync(path.join(OUT, "QA-REPORT.md"), lines.join("\n") + "\n\nDetails: report.json · screenshots: shots/ · contact sheets: sheets/\n");
console.log("\n" + lines.slice(4).join("\n"));
