# VMS interactive narrative — final QA report (prototype revision)

**BUILD STATUS:** PASS

**WHAT CHANGED IN THIS PASS**
- Chapter 8 beat 28 (Jira): epics + backlog + the VMS-16 highlight are now one beat. The real screenshots are unchanged. Message kept: "Documentation became actionable work."
- Chapter 8 beat 29: a new prototype reveal.
  - The REQUIREMENTS → BACKLOG → DESIGN strip runs the golden thread end to end: Kick-off finding → BR-033 · BRL-04 → To-Be BPMN → US-16 → VMS-16 → License Register.
  - The hero screen is the License Register at 1280 of 1600 canvas px. The Movement and Maintenance dashboards are supporting screens.
  - The parallel-design-track text now sits here.
  - Label: "TEAM-CREATED PROTOTYPE · ILLUSTRATIVE DATA".
- Golden-thread tracker: a final node, "Prototype", lights on beat 29.
- Placeholders removed. Nothing else redesigned. The closing line "structured, verified, and traceable" is kept as approved.
- QA hardening: the audit now also checks every image for aspect ratio, clipping, staying inside the canvas, decoding and upscaling. The layout audit catches text overlap in mixed-content elements.

**FINAL FILES**
- index.html — the presentation (single self-contained file)
- README.txt — opening, controls, prototype screens, presentation-day checklist
- VMS_story_source.zip — source project (no node_modules). Rebuild with `npm install && npm run build`.
- VMS_QA_contact_sheets.zip — screenshots and sheets:
  - every beat at 1920×1080
  - entry-scrub frames for 7 scenes, including the prototype reveal
  - 5 viewport sheets, each including beats 28 and 29
  - reduced motion
  - no-JS and no-GSAP fallbacks
  - notes, fullscreen, popover
- FINAL-QA-REPORT.md (this file) · SOURCES.md

**HTML SIZE:** 0.67 MB. Everything is inlined: GSAP 3.15 + ScrollTrigger, Inter, icons, 2 Jira screenshots, 3 BPMN thumbnails, 3 prototype screens.

**BEAT COUNT:** 32, across 15 scenes. Prologue 2 · Ch1 4 · Ch2 3 · Ch3 2 · Ch4 3 · Ch5 4 · Ch6 3 · Ch7 3 · Ch8 5 · Finale 3.

**ESTIMATED PRESENTATION TIME:** 18–19 minutes (unchanged).

**REAL ASSETS USED**
- 2 Jira screenshots (cropped only)
- 3 BPMN thumbnails, plus the License As-Is / To-Be diagram redrawn with the document's own role labels
- **Prototype: 3/3 real images found.** All are team-created prototype assets, with only the outer design-review bar cropped:
  - License Register (prototype_03.png, hero, native 1905 px)
  - Movement Dashboard (prototype_04.png)
  - Maintenance Dashboard (prototype_01.png)

**PLACEHOLDERS USED:** none. Trip Log (prototype_02) and Drivers (prototype_05) are kept in the source for Q&A and not bundled. No temporary or inspiration images are bundled or referenced.

**VIEWPORTS TESTED:** 1920×1080 (all 32 beats), 1366×768, 1280×800, 1024×768, and 1920×1080 at 125% and 150%.
- 0 layout issues: no text overlaps, no image clipped or distorted, nothing outside the canvas.
- At 1366×768 the hero renders about 930 px wide. The title, summary cards, tabs and the near-expiry and under-renewal status pills are clearly recognisable.
- Jira stays readable at every size.

**OFFLINE TEST:** PASS. file://, 0 runtime requests.

**REDUCED MOTION TEST:** PASS. Every beat snaps to its final state, with 0 layout issues.

**FAILURE TEST:** PASS. Without JS, the static narrative includes the prototype reveal. Without GSAP, the page falls back to static content and navigation still works.

**CONSOLE STATUS:** 0 errors, 0 warnings, 0 timeline overruns.

**FUNCTIONAL:** PASS. All keys, rapid presses, buttons, free scroll then Next, rail jump, notes, fullscreen and Esc, stakeholder popover.

**PERFORMANCE:** 15 ScrollTriggers (budget 30) · 1,745 DOM nodes (budget 3,000) · under 4× CPU throttle: median 16.7 ms/frame, p95 33 ms.

**KNOWN NON-BLOCKING CONTENT RISKS:** 12, listed in SOURCES.md. New in this pass:
- The prototype's sample counts differ from the ~550-vehicle fleet. They are labelled illustrative and never discussed as figures.
- The prototype's expiry filter (7 / 30 / 90 days) is not the same as BRL-04's 30 / 15 / 7, so no such link is claimed.
- The supplied exports carry a "Made with Claude Design" badge. It was left untouched rather than altered.

**PROTOTYPE REPLACEMENT INSTRUCTIONS**
1. Overwrite `src/assets/prototype/prototype_03.png` (License Register), `prototype_04.png` (Movement Dashboard) or `prototype_01.png` (Maintenance Dashboard). Keep the same names and crop only the outer design chrome.
2. Run `npm install` (first time only), then `npm run build`. The build prints `Prototype: X/3 real images found (…)`.
3. Use the new `dist/index.html`. If you change the hero screen, re-check the status-column outline in `src/scripts/data/prototype.js` (`hero.callout`).
