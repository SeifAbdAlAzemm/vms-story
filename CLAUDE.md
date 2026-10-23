# CLAUDE.md — vms-story

Technical guide for working inside this repository. Narrative and evidence rules live in
`docs/DECISIONS.md`. Read both before changing anything.

## What this is
An offline, scroll-driven HTML narrative for the VMS Business Analysis final project:
32 presenter beats (about 18–19 min). It is **not** a website and **not** a slide deck.
The approved build is deployed with GitHub Pages from `index.html` at the repo root on `master`.

## Golden rules
1. Edit `src/`, `tools/` and `vendor/` only. Never hand-edit `index.html` (root) or `dist/`. Both are generated.
2. After any change that affects output, run `npm run build`. Root `index.html` changes only in the release step (below).
3. Smallest coherent change. Do not refactor, re-layout or restyle anything that wasn't asked for.
4. Never invent content. Every fact on screen comes from `src/scripts/data/*.js` and is traceable to a source (see `SOURCES.md`).
5. No git writes (commit, branch, checkout, merge, push, tag, reset, stash) unless Seif explicitly asks. Read-only git is fine. Prefer `git --no-optional-locks status`.

## Layout
```
index.html                 GENERATED — deployed copy of dist/index.html (GitHub Pages serves this)
SOURCES.md                 evidence map: every fact → source document; known content risks
package.json               npm run build | npm run qa   (devDeps: sharp, playwright)
src/
  index.html               page template: chrome + 15 <section class="scene"> blocks + build markers
  styles/
    tokens.css             palette, font-face, spacing tokens (colour system is approved: don't change)
    base.css               persistent chrome: topbar, golden-thread tracker, journey rail, controls, notes, veil
    layout.css             scene/stage/safe canvas, shared typography (.kicker .title .src .unlocks), reduced motion
    scenes/<scene>.css     one file per chapter, absolute coordinates on the 1600×900 canvas
  scripts/
    data/*.js              ALL content: project, stakeholders, raci, features, requirements, jira, prototype, beats
    engine.js              canvas fit, theme, rail, thread tracker, beat counter (works without GSAP)
    navigation.js          beat positions, keys, scroll tween, #bN hash (replaceState)
    presenter.js           notes panel, Present/fullscreen, idle cursor, stakeholder popover
    boot.js                builds one GSAP timeline + ScrollTrigger per scene; static fallback on any failure
    scenes/<chapter>.js    VMS.scene("<id>", helpers => …) choreography per scene
  assets/
    fonts/                 Inter variable (OFL)          icons/sprite.svg  Lucide symbols (tools/make-sprite.cjs)
    jira/                  2 real Jira crops             process/          BPMN thumbnails + source SVGs
    prototype/             prototype_01…05.png (top design-review bar cropped); original/ = untouched exports
tools/
  build.mjs                assembles dist/index.html (single file, everything inlined) + verification
  render.mjs               HTML renderers for <!--@render:name--> markers (build time, from data files)
  qa.mjs                   Playwright QA → qa/
  README.dist.txt          copied to dist/README.txt
vendor/gsap/               GSAP 3.15 + ScrollTrigger (pinned, licence headers kept). No CDN, ever.
dist/                      GENERATED, gitignored
qa/                        GENERATED QA output (shots/, sheets/, report.json, QA-REPORT.md). Do not commit shots/sheets.
```

## Scene model (read before touching any scene)
- Each scene is `<section class="scene" id data-beats data-chapter data-theme>` → sticky `.stage` (100vh) → `.safe`, a 1600×900 canvas scaled by `engine.layout()`.
  Everything inside `.safe` is positioned in canvas px. Keep content inside 1600×900, and keep the `.unlocks` line at the bottom.
- Scenes, in order (beats): prologue 2 · ch1 4 · ch2 3 · ch3 2 · ch4 3 · ch5a 2 · ch5b 2 · ch6a 1 · ch6b 2 · ch7 3 · ch8a 3 · ch8b 1 · ch8c 1 · finale-a 2 · finale-b 1 = **32**.
- Timeline: one paused GSAP timeline per scene, duration = beats, scrubbed by ScrollTrigger (`top bottom` → `bottom bottom`, scrub 0.6).
  `at(k)` is the start of the move into beat k. Beat 0 animates during the scene's entry `[0,1)`, and beat k animates in `[k, k+1)`.
  **Never let a scene's tweens run past `beats`.** `boot.js` records overruns in `VMS.warnings`, and QA fails on any.
- The prologue uses `data-entry="intro"` (pinned at `top top`, plus a time-based intro).
- Helpers passed to builders: `tl, q, qa, at, draw(els,pos,opt)` (SVG stroke draw), `count(el,to,pos,dur)`, `reduce`.
- Content is visible by default. `html.anim` is added only after every timeline builds, so animations use `tl.from(...)`.
  If a builder throws, the whole page reverts to the static stacked narrative. Keep that property.
- Theme: `data-theme` per scene drives chrome colours. Scope dark overrides to `.scene[data-theme="dark"]`, never `body[...]`.
- Reduced motion: timelines snap to whole beats, and CSS transitions are off. New animation must survive both modes.

## Content/data rules (technical side)
- Copy, IDs, counts and notes live in `src/scripts/data/*.js` (IIFE writing `window.VMS_DATA`), and in short literal strings in `src/index.html`.
  The same data runs at build time (node vm) and at runtime.
- Presenter notes per beat: `src/scripts/data/beats.js` → `{scene, chapter, title, thread?, notes:{key,why,value,next}}`.
  `thread` lights the golden-thread tracker: kickoff → feature → requirement → bpmn → story → criteria → jira → prototype.
- Changing a fact means changing its data file **and** checking `SOURCES.md`, and updating it if the source or the risk changes.
- Banned in output (the build fails if present): the old inspiration/temporary UI images and their strings. Never add them back.

## Build
```
npm ci            # first time, or after switching OS (sharp ships per-platform binaries)
npm run build     # → dist/index.html + dist/README.txt, about 10 s
```
The build fails on:
- unresolved `@render/@include` markers
- scene `data-beats` total ≠ `beats.js` length, or a beat assigned to the wrong scene
- any external `src`/`href`/`url()`
- banned strings
- prototype filenames outside `prototype_0[1-5].(png|jpg|jpeg|webp)`

The build prints: scenes/beats · Jira assets · process thumbnails · `Prototype: X/3 real images found (…)` · HTML size · external requests (must be 0).
Expected today: 15 scenes · 32 beats · 2 · 3 · 3/3 · ≈0.67 MB · 0.

**Environments:**
- Cowork may use an isolated Linux/cloud environment for build and QA verification.
- Do not reuse the Windows `node_modules` from Cowork's Linux shell: `sharp` is platform-specific. Without a working `sharp`, the build skips image optimisation and the output differs.
- The final `npm run release` before deployment runs from Seif's Windows terminal in the local repo.
- If dependencies are missing or stale on Windows, run `npm ci` first.

## QA
```
node tools/qa.mjs --only=functional,visual        # ≈ 5–10 min
node tools/qa.mjs --only=viewports,offline,failure,reduced,perf   # ≈ 5–10 min
npm run qa                                        # all phases, ≈ 15–20 min
```
- Needs Playwright Chromium (`npx playwright install chromium`). In Claude's cloud workspace Chromium is preinstalled (`/opt/pw-browsers`, Playwright 1.56).
- Phases:
  - functional: keys, rapid presses, buttons, free scroll, rail jump, notes, fullscreen, popover
  - visual: all beats at 1920×1080, plus entry scrub at 0/25/50/75/100% for 7 scenes
  - viewports: 1366×768, 1280×800, 1024×768, 125%, 150%
  - offline: 0 requests
  - failure: no-JS and no-GSAP fallbacks
  - reduced: reduced motion
  - perf: 4× CPU throttle, DOM count
- The layout audit fails on:
  - canvas outside the chrome
  - text outside the canvas, clipped or overlapping
  - images distorted, clipped, upscaled or not decoded
  - any console error or warning
  - any timeline overrun
- Output: `qa/report.json` (merged across runs), `qa/QA-REPORT.md`, `qa/shots/`, `qa/sheets/` (contact sheets). **Look at the sheets** for anything visual. The audit does not judge balance.
- **QA tiers** (pick by what the change touches):
  - **Tier 0 · wording/data:** build + `--only=visual`, then inspect the touched beats at 1920 and 1366. If a fact changed, check its source and SOURCES.md.
  - **Tier 1 · one scene's layout/animation/image:** Tier 0 + `functional,viewports,reduced`. Check the scrub frames if entry animation changed.
  - **Tier 2 · beat count, navigation, chrome, build tooling, performance, several chapters:** a short plan first, then full `npm run qa` and every contact sheet.
- Long runs: a local shell with a short per-command limit can't hold a full QA run. Run phases separately, or run QA in an environment with long-running commands and Chromium preinstalled.
- Hard-coded expectations to update if the beat count changes: `beats === 32` in qa.mjs (functional and reduced phases), the viewport sample indices `[1,5,13,17,21,23,26,27,28]`, and the scrub scene list.

## Release (GitHub Pages)
Pages serves root `index.html` from `master`. Release = copy the verified build to the root:
```
npm run release
```
`tools/release.mjs`:
- runs the production build (`tools/build.mjs`)
- copies `dist/index.html` to root `index.html`
- verifies both files are identical (bytes and SHA-256)
- fails (exit 1) if verification fails. If the build fails, nothing is copied.

Run the final `npm run release` before deployment from Seif's Windows terminal in the local repo (see Environments).
Committing, merging to `master` and pushing are Seif's decisions. Pushing `master` deploys immediately.

## Common tasks
**Wording change:** edit the data file or `src/index.html` string → build → visual QA → view the affected beat(s) at 1920 and 1366.

**Prototype image:**
- Overwrite `src/assets/prototype/prototype_03.png` (hero License Register), `_04` (Movement Dashboard) or `_01` (Maintenance Dashboard).
- Crop only the outer design-review chrome, keep the aspect ratio, and put the untouched original in `original/`.
- If the hero changes, re-measure `hero.callout` (fractions of the image) in `src/scripts/data/prototype.js`.
- Build, then check the printed `Prototype: 3/3`.
- `_02` (Trip Log) and `_05` (Drivers) are Q&A reserve only and are not bundled.

**Add or remove a beat** (needs Seif's approval; total presentation time must be restated):
1. `data-beats` on the section.
2. Entry in `beats.js` at the right position, with notes.
3. Choreography in `scenes/<chapter>.js` for the new `at(k)`.
4. QA hard-codes (above).
5. "32" in `beats.js` header, `src/index.html` counters, README and `SOURCES.md`.
6. Build (it checks the scene/beat mapping), then full QA.

**New scene:**
1. Section in `src/index.html`.
2. `scenes/<x>.css` + `VMS.scene("<id>")` in the chapter JS.
3. Beats entries.
4. Add it to the qa.mjs scrub/no-JS lists if it is a signature scene.

**Performance budget:** ≤ 30 ScrollTriggers (now 15), ≤ 3,000 DOM nodes (now ≈1,745), ≤ 6 heavy scenes, HTML ≈ under 1 MB.

## Verification checklist (every change)
- [ ] build passes with expected summary (32 beats, 0 external requests, Prototype 3/3)
- [ ] relevant QA phases pass; console clean; no timeline warnings
- [ ] contact sheets / screenshots of the touched beats inspected at 1920×1080 and 1366×768
- [ ] keyboard navigation still lands on exact beats; notes and Present still work
- [ ] no unrelated diff (`git --no-optional-locks diff --stat`)
- [ ] `SOURCES.md` / `docs/DECISIONS.md` updated if a fact, source or locked decision changed
