# CLAUDE.md — vms-story

Technical guide for this repo. Locked narrative/evidence decisions: `docs/DECISIONS.md`. Fact → source map: `SOURCES.md`.

## What this is
An offline, scroll-driven HTML narrative for the VMS Business Analysis final project:
39 presenter beats (about 20½ min). It is **not** a website and **not** a slide deck.
GitHub Pages serves root `index.html` from `master`.

## Default mode: fast iteration
This is a presentation under active design. Optimise for fast, cheap iteration, not release-grade validation.
Heavy validation belongs to final approval / release only.

**Workflow for every normal change** (content, wording, layout, visual, animation):

> Understand → Edit → Build → Inspect affected beat → Screenshot → Stop

1. **Read only what the change touches**: usually the scene's `<section>` in `src/index.html`, its `styles/scenes/<x>.css`,
   its `scripts/scenes/<chapter>.js`, and the relevant `scripts/data/*.js`. Don't survey the repo or re-read all business documents.
   Open `docs/DECISIONS.md`, `SOURCES.md` or the Project's source documents only when the change touches a business fact,
   wording with business meaning, or a locked decision.
2. **Make the smallest coherent change.**
3. **`npm run build`**
4. **If visual:** open the affected beat at 1920×1080, take one screenshot, check for obvious clipping/overlap (see *Screenshot of one beat*).
5. **Report briefly and stop.**

**Report** (short; no execution logs, no theory):
- what changed
- build: ok / failed
- screenshot (when visual)
- files changed
- anything that needs Seif's decision

Don't mention Git, branches, versions, tags or releases unless Seif asked about them.

**Not by default.** Unless Seif explicitly asks, do not:
- run the QA suite or any of its phases (functional, visual, viewports, offline, failure, reduced, perf)
- test every beat or every viewport
- generate contact sheets or do performance profiling
- do baseline / byte comparisons
- create isolated Linux mirrors or copies, or reinstall dependencies in another environment
- troubleshoot Windows-vs-Linux or Playwright/browser version differences
- inspect Git history, suggest branches, discuss versions or tags
- prepare releases or update release docs
- write long technical reports

**Tooling trouble:** if a build or screenshot is blocked by the environment, try **one** simple alternative.
If that fails too, report the limitation in one or two lines and stop. Don't repair the environment.
- `sharp` is platform-specific. If it can't load (for example Windows `node_modules` in a Linux shell), the build skips image
  optimisation and still produces a working page. That is fine for iteration: say so in one line and carry on.

## Golden rules (always apply)
1. Edit `src/`, `tools/` and `vendor/` only. Never hand-edit root `index.html` or `dist/`: both are generated.
2. The repository source is the implementation truth. Don't rely on memory of earlier conversations.
3. Smallest coherent change. No unrelated changes, refactors, re-layouts or restyles. Preserve the visual identity
   (colour system, typography, motion language) unless asked.
4. Never invent business facts, requirements, KPIs, IDs, stakeholders, counts, process steps, features, stories or prototype
   functionality. Confirmed facts stay grounded in the provided sources. Keep apart: source fact · team-provided fact ·
   visual interpretation · open/pending decision. If a fact is missing, ask.
5. Preserve the locked decisions in `docs/DECISIONS.md` unless Seif explicitly changes them. If a request conflicts with one,
   say so and wait.
6. No git writes or deploys: no commit, push, tag, branch, merge, reset, stash, release or deploy unless Seif explicitly asks.

## Documentation discipline
- Update `docs/DECISIONS.md` or `SOURCES.md` only when a change introduces or changes a locked decision, a confirmed fact,
  a source, or a structural rule. A pure design/wording iteration updates neither.
- Don't add per-change implementation notes to this file.
- Don't document temporary environment problems unless they permanently change how the project is maintained.

## Layout
```
index.html                 GENERATED: deployed copy of dist/index.html (GitHub Pages serves this)
SOURCES.md                 evidence map: every fact → source document; known content risks
package.json               npm run build | npm run qa | npm run release   (devDeps: sharp, playwright)
src/
  index.html               page template: chrome + 16 <section class="scene"> blocks + build markers
  styles/
    tokens.css             palette, font-face, spacing tokens (approved colour system: don't change)
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
    hero/                  3 supplied slide images (cover, hook, value of visibility)
    jira/                  2 real Jira crops             process/          old BPMN thumbnails (unused since 24 Oct 2026)
    prototype/             prototype_01…05.png (top design-review bar cropped); original/ = untouched exports
tools/
  build.mjs                assembles dist/index.html (single file, everything inlined) + verification
  render.mjs               HTML renderers for <!--@render:name--> markers (build time, from data files)
  qa.mjs                   Playwright QA suite → qa/ (full QA only)
  release.mjs              build + copy dist/index.html → root index.html + verify
  README.dist.txt          copied to dist/README.txt
vendor/gsap/               GSAP 3.15 + ScrollTrigger (pinned, licence headers kept). No CDN, ever.
dist/                      GENERATED, gitignored
qa/                        GENERATED output; qa/shots/ and qa/sheets/ are gitignored
```

## Scene model (read before touching a scene)
- Each scene is `<section class="scene" id data-beats data-chapter data-theme>` → sticky `.stage` (100vh) → `.safe`, a 1600×900 canvas scaled by `engine.layout()`.
  Everything inside `.safe` is positioned in canvas px. Keep content inside 1600×900, and keep the `.unlocks` line at the bottom.
- Scenes, in order (beats): cover 1 · hook 1 · opening 1 · prologue 3 · ch1 7 · ch2 2 · ch4 3 · ch4p 1 · ch5b 2 · ch6a 1 · ch3 2 · ch6b 2 · ch7 3 · ch8a 1 · ch8b 1 · ch8c 1 · ch5a 2 · finale-a 2 · finale-n 1 · finale-v 1 · finale-b 1 = **39**.
  Scene ids are not chapter numbers: `ch3` (system boundary, deliberately outside) sits in chapter 05 · The baseline (rail id `ch6`) after `ch6a`, and `ch5a` (pains → features) opens the Finale.
  Visible chapter numbers run 01–07 continuously; rail ids `ch4`…`ch8` show as 03…07.
  Their CSS/JS stay in `chapter-03.*` / `chapter-05.*`. The rail and kickers follow `data-chapter`, not the id.
- Timeline: one paused GSAP timeline per scene, duration = beats, scrubbed by ScrollTrigger (`top bottom` → `bottom bottom`, scrub 0.6).
  `at(k)` is the start of the move into beat k. Beat 0 animates during the scene's entry `[0,1)`, and beat k animates in `[k, k+1)`.
  **Never let a scene's tweens run past `beats`.** `boot.js` records overruns in `VMS.warnings` (visible in the console).
- The cover (beat 1) and hook (beat 2) are supplied slide images (`src/assets/hero/*.jpg`, 1672×941, `.hero-img` full canvas; the build keeps
  `hero/` at native width). The cover uses `data-entry="intro"`: its `VMS.coverIntro` fade plays on load. The hook and `finale-v` fade in with the scroll.
- The opening ("What is VMS?") is the same kind of scene. Its time-based `VMS.intro` (vehicle drives in → title → definition → six areas) plays when the
  presenter arrives from the hook (ScrollTrigger, like the prologue's team intro), completes on a jump past it, and resets when going back.
- The prologue uses `data-entry="intro"` too (pinned at `top top`, plus a time-based team intro). Its timeline is 2 units for 3 beats:
  prologue beat 1 Meet the Team = the time-based `VMS.teamIntro` (heading → mentor → 3 member columns), played by a ScrollTrigger
  when the prologue arrives (`top 40%`), completed instantly on a jump past it, reset when the presenter goes back to the opening; `[0,1)` the `.p-team` frame fades out and
  the question + background labels appear; `[1,2)` converge. `.p-team` is `display:none` without `html.anim`, so the static /
  no-GSAP fallback shows the prologue's final (converged) state like every other scene, without the team frame.
- Ch 1 beat 3 (presentation beat 7, "The ignorance tax") is scrubbed in like any beat, but its story is the time-based `VMS.taxIntro` (~11 s):
  it plays when the presenter lands on the beat, is completed when they return from a later beat, and resets when they go back before it.
- Helpers passed to builders: `tl, q, qa, at, draw(els,pos,opt)` (SVG stroke draw), `count(el,to,pos,dur)`, `reduce`.
- Content is visible by default. `html.anim` is added only after every timeline builds, so animations use `tl.from(...)`.
  If a builder throws, the whole page reverts to the static stacked narrative. Keep that property.
- Theme: `data-theme` per scene drives chrome colours. Scope dark overrides to `.scene[data-theme="dark"]`, never `body[...]`.
- Reduced motion: timelines snap to whole beats, and CSS transitions are off. New animation must still work in both modes (by construction; not tested by default).

## Content/data rules (technical side)
- Copy, IDs, counts and notes live in `src/scripts/data/*.js` (IIFE writing `window.VMS_DATA`), and in short literal strings in `src/index.html`.
  The same data runs at build time (node vm) and at runtime.
- Presenter notes per beat: `src/scripts/data/beats.js` → `{scene, chapter, title, thread?, notes:{key,why,value,next}}`.
  `thread` (string or array) lights the golden-thread tracker, cumulatively: stakeholders → persona → vv → brd → stories (`D.thread` in project.js).
- Changing an on-screen business fact: change its data file, verify it against the source, and update `SOURCES.md` only if the source or risk entry changes.
- Banned in output (the build fails if present): the old inspiration/temporary UI images and their strings. Never add them back.

## Build
```
npm run build     # → dist/index.html + dist/README.txt, about 10 s
npm ci            # only if node_modules is missing
```
The build fails on: unresolved `@render/@include` markers · scene `data-beats` total ≠ `beats.js` length or a beat in the wrong scene ·
any external `src`/`href`/`url()` · banned strings · prototype filenames outside `prototype_0[1-5].(png|jpg|jpeg|webp)`.

Expected summary: 21 scenes · 39 beats · Jira 2 · process 0 (Ch 06 BPMN is inline SVG) · `Prototype: 3/3` · ≈0.68 MB · 0 external requests.
Mention the summary only if something differs from this.

## Screenshot of one beat
- `dist/index.html#bN` deep-links to beat N (1-based, order of `beats.js`). Wait ~2–3 s for the scroll tween and any intro to settle.
- Default viewport 1920×1080. Add 1366×768 only if Seif asks or the 1920 view shows content tight against an edge.
- Use whatever is readily available: the built-in browser pane, or a short inline Playwright script. Don't add script files to the repo for this.
  ```
  node -e "const{chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto('file://'+process.cwd()+'/dist/index.html#b12');await p.waitForTimeout(3000);await p.screenshot({path:'qa/shots/b12.png'});await b.close()})()"
  ```
- Save screenshots under `qa/shots/` (gitignored). The check is visual and quick: requested change present, no obvious clipping/overlap, console clean if visible.

## Common tasks
**Wording/data change:** edit the data file or the `src/index.html` string → build → screenshot the affected beat.

**Prototype image:**
- Overwrite `src/assets/prototype/prototype_03.png` (hero License Register), `_04` (Movement Dashboard) or `_01` (Maintenance Dashboard).
- Crop only the outer design-review chrome, keep the aspect ratio, and put the untouched original in `original/`.
- If the hero changes, re-measure `hero.callout` (fractions of the image) in `src/scripts/data/prototype.js`.
- Build, check the printed `Prototype: 3/3`, screenshot the prototype beat.
- `_02` (Trip Log) and `_05` (Drivers) are Q&A reserve only and are not bundled.

**Add or remove a beat** (Seif approves; restate total presentation time):
1. `data-beats` on the section.
2. Entry in `beats.js` at the right position, with notes.
3. Choreography in `scenes/<chapter>.js` for the new `at(k)`.
4. The beat count (now 39) in the `beats.js` header, `src/index.html` counters, this file's scene list and `SOURCES.md` beat numbers.
5. Keep the hard-coded references below correct, but **don't run the QA suite** for this alone.
6. Build (it checks the scene/beat mapping), then screenshot the new/affected beats.

Hard-coded beat references (all in `tools/qa.mjs` unless noted): `beats === 39` (functional) and `rows.length === 39` (reduced);
the rail chapter-jump target (ch7 → beat 27); the stakeholder popover beat (`positions[15]`, first ch4 beat); the viewport sample
indices `[0,1,2,3,4,5,7,8,9,12,17,18,20,22,26,28,29,30,31,36,37]`; the reduced-motion sample indices `[0,1,2,3,4,5,14,18,24,28,31,36,37,38]`; the perf phase's 38 Next presses;
the scrub scene list; `tools/README.dist.txt` (prototype beat number).

**New scene:**
1. Section in `src/index.html`.
2. `scenes/<x>.css` + `VMS.scene("<id>")` in the chapter JS.
3. Beats entries.
4. Add it to the `qa.mjs` scrub/no-JS lists if it is a signature scene.

**Budgets** (reference, not checked by default): ≤ 30 ScrollTriggers (now 17), ≤ 3,000 DOM nodes (now ≈1,745), ≤ 6 heavy scenes, HTML under ~1 MB.

## Full QA — only on request
Run only when Seif:
- says "Run full QA"
- says this is the final approved version
- asks to prepare for release/deployment

Or when a major change to navigation or the presentation engine (`navigation.js`, `boot.js`, `engine.js`) genuinely needs broader testing.
In that case, say so in one line first: it takes 15–20 min.

A beat-count change alone does not trigger full QA.

```
npm run qa                                                        # all phases, ≈ 15–20 min
node tools/qa.mjs --only=functional,visual                        # ≈ 5–10 min
node tools/qa.mjs --only=viewports,offline,failure,reduced,perf   # ≈ 5–10 min
```
- Needs Playwright Chromium. Claude's cloud workspace has it preinstalled (`/opt/pw-browsers`).
- Phases:
  - functional: keys, buttons, scroll, rail jump, notes, fullscreen, popover
  - visual: all beats at 1920×1080 + entry scrubs
  - viewports: 1366×768, 1280×800, 1024×768, 125%, 150%
  - offline: 0 requests
  - failure: no-JS / no-GSAP fallbacks
  - reduced: reduced motion
  - perf: 4× CPU throttle, DOM count
- The audit fails on: canvas outside the chrome · text outside the canvas, clipped or overlapping · distorted, clipped, upscaled
  or undecoded images · any console error or warning · any timeline overrun.
- QA waits for the time-based intros (`VMS.intro`, `VMS.teamIntro`) before auditing a beat.
- Output: `qa/report.json`, `qa/QA-REPORT.md`, `qa/shots/`, `qa/sheets/`. Look at the contact sheets: the audit doesn't judge balance.
- A local shell with a short per-command limit can't hold a full run. Run phases separately, or use an environment with long-running commands.

## Release — only on request
Pages serves root `index.html` from `master`. `npm run release` (`tools/release.mjs`):
- builds
- copies `dist/index.html` → root `index.html`
- verifies both are identical (bytes + SHA-256), exit 1 on mismatch; nothing is copied if the build fails

The final release runs from Seif's Windows terminal in the local repo (run `npm ci` there first if dependencies are stale).
Committing, merging and pushing are Seif's. Pushing `master` deploys immediately.

Release checklist (final approval only):
- [ ] full QA passes; console clean; no timeline warnings
- [ ] contact sheets inspected
- [ ] keyboard navigation lands on exact beats; notes and Present work
- [ ] build summary as expected (39 beats, 0 external requests, Prototype 3/3)
- [ ] `SOURCES.md` / `docs/DECISIONS.md` reflect any changed fact, source or locked decision
