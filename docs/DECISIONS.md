# VMS presentation — locked decisions

Status: **APPROVED baseline** (tag `v1.0.0`, commit 26a6b75). Everything below was decided and
approved during design, director review and the prototype revision. Treat each item as a requirement.
Change one only when Seif explicitly asks. If a request conflicts with an item, say so before changing anything.

Evidence map and known content risks: `SOURCES.md`. Technical how-to: `CLAUDE.md`.

## 1. Format
- Scroll-driven, self-contained HTML narrative. Not a website, not a slide deck.
- Single offline `index.html`: everything inlined, works from `file://`, 0 runtime requests.
- Target: Chrome / Edge, presenter-driven with keyboard or clicker. English on screen.
- Viewports that must work: 1920×1080, 1366×768, 1280×800, 1024×768, plus 125% and 150% OS scaling.

## 2. Structure — 38 beats, about 20 minutes
| Part | Beats | Scenes |
|---|---|---|
| Cover: From scattered records to clearer fleet decisions (supplied slide) | 1 | cover |
| Hook: The cost of “let me check.” (supplied slide, illustrative) | 1 | hook |
| Opening: What is VMS? (title, one-line definition, six lifecycle areas, vehicle) | 1 | opening |
| Prologue: meet the team → different backgrounds → one BA mindset | 3 | prologue |
| 1 · The world we entered (operational questions at ~550-vehicle scale → from ideation to creation → one operational moment → the problem in numbers → domain orientation → research vs elicitation → kick-off) | 7 | ch1 |
| 2 · How we worked (parallel streams → review, align, reconverge) | 2 | ch2 |
| 3 · People and ownership (power / interest → engagement → RACI → personas) | 4 | ch4, ch4p |
| 4 · Capabilities and priorities (67 features → MoSCoW) | 2 | ch5b |
| 5 · The baseline (verification & validation → how the BRD evolved → everything converges into the BRD → measurable objectives) | 4 | ch6a, ch6e, ch6b |
| 6 · How work flows | 3 | ch7 |
| 7 · From requirement to backlog (and design) (Given/When/Then → Jira → prototype) | 3 | ch8a, ch8b, ch8c |
| Finale: pains and needs → pains become features → everything converges → two stories meet → the next decision → the value of visibility → closing | 7 | ch5a, finale-a, finale-n, finale-v, finale-b |

Visible chapter numbers are continuous, 01–07 (Seif, 24 Oct 2026). Internal rail ids `ch4`…`ch8` are unchanged and display as 03…07.
Removed (24 Oct 2026, Seif): "The lifecycle we learned to think in", "The traceability chain", "Quality layers and the backlog". Don't recreate them or a replacement traceability slide.

Each scene ends with an "Unlocks →" line that hands over to the next question.

## 3. Persistent devices (do not remove)
- **13-SESSION BA JOURNEY rail**: chapters as phases. There is no session → artifact mapping.
- **Golden thread tracker = the BA journey** (top-right, Seif 24 Oct 2026), 10 milestones: Kick-off Meeting (beat 13) → Stakeholder Analysis (16, Power / Interest) → Persona (19) → Feature List (20, 67 features) → Verification & Validation (22) → BRD (23, How the BRD evolved) → BPMN (27, As-Is) → User Stories (30) → Jira (31) → Prototype (32). Each lights on its beat and stays lit. No other milestones.
  - The on-screen golden-thread content is unchanged: vehicle license expiry, shown in gold (kick-off finding, F-13 · F-42 chip, BR-033 · BRL-04, the license path in the BPMN, VMS-16, License Register).
- **Review loop** CREATE → REVIEW → ALIGN → IMPROVE → APPROVE. It ticks at chapter hand-offs.
- **Design track** on the rail from Chapter 04 (Capabilities and priorities) onward: wireframes and the prototype ran in parallel with the analysis.

## 4. Controls (locked)
- → / Space / PgDn = next beat. ← / PgUp = previous. Home = start. End = finale.
- Free scroll is always available. Rail dots jump to a chapter.
- Present = fullscreen (needs a user gesture). Esc exits. N or the Notes button toggles presenter notes.
- Notes and controls are hidden in fullscreen. URL hash `#bN` via `replaceState` only. `overscroll-behavior` is set.

## 5. Failure-safe and accessibility (locked)
- Content is visible by default. Animation is added only after GSAP initialises successfully.
- If GSAP fails, the page falls back to a static stacked narrative. With no JS, inert chrome is hidden.
- `prefers-reduced-motion` is respected (snap to beats, no transitions).
- Budgets: ≤ 30 ScrollTriggers, ≤ 3,000 DOM nodes, ≤ 6 heavy scenes.

## 6. Source precedence and evidence discipline
- Precedence: **Project Scope > BRD-VMS-003 v3.0 > Consolidated Feature List (A04) > latest module user-story document > earlier working documents.**
- Never invent requirements, KPIs, statistics, features, stories, IDs, counts, stakeholders, process steps, prototype functionality or outcomes.
- Label every on-screen claim's nature when it isn't a plain source fact:
  - source fact
  - team-provided fact
  - visual interpretation
  - open / pending decision
- Recounted figures (do not change without recounting from the source):
  - 67 features in 12 groups
  - MoSCoW 33 Must · 3 Should · 13 Could · 13 Won't + 5 not yet prioritised (F-47, F-49–F-52)
  - BRD: 3 OBJ · 42 BR (40 Must) · 16 BRL · 10 NFR · 11 KPI · 31 RAID · 7 DEP
  - 15 stakeholders identified → 13 in scope

## 7. Wording locks
- "6 vehicles had already exceeded their license validity" is a **Kick-off finding**, never an official BRD baseline (BRD ISS-05: baselines not yet supplied).
- Business Owner = "Business Owner / Mentor acting as Client Representative". Never present the Mentor as an employee of the organisation.
- "From Ideation to Creation" (Ch 1 beat 2) is **team-provided content, approved by Seif (24 Oct 2026)**: Kick-off Meeting → Stakeholder Analysis & RACI → Persona → Feature List → Verification & Validation → BRD → BPMN → User Stories & Exceptions → Jira → Prototype & Wireframes. Labels and order exactly as supplied. High-level overview only: no per-stage detail, no AI Agent, no extra stages, no session mapping.
- Verification is **performed**. Validation is **partial / pending** (BRD sign-off and As-Is confirmation, ISS-10).
- The V&V beat (beat 22) explains V&V through one worked example, F-04 Vehicle List, Search & Filter (Seif, 24 Oct 2026). "Before" = the Feature List wording, verbatim. "After" = the team's verification review, summarised and consistent with US-04. The 6 ambiguous points are shown as **marked [CONFIRM] for the stakeholder**, never as closed. The partial-validation status stays in the footnote and notes.
- Email is not stated as a finalised notification channel (ISS-06 open).
- Beat 29 "User Stories & Exception Handling" (Seif, 24 Oct 2026) uses US-01 Add Vehicle as its example, not the golden-thread story US-16. Vehicle ID is system-generated in US-01, so it is not listed as a user-entered duplicate.
- "The problem in numbers" (Ch 1 beat 4) shows **external industry and market statistics, as context only**: 79% / 63% (Vimcar survey, UK), 17.7% (Motive / Wakefield), $448–$760 per vehicle / day, average vehicle downtime cost (Element Fleet Management, citing Work Truck Magazine), ~10.4M licensed vehicles 2024 and ~USD 163M → ~229M market 2025 → 2031 (Ken Research). Figures and source labels exactly as supplied by Seif (23 Oct 2026). Never present them as the organization's, its fleet's or this project's figures, and add no further statistics. The on-screen "context only" tag and footnote stay.
- "One operational moment" (Ch 1 beat 3, presentation beat 9; Seif, 24 Oct 2026) is now **"The ignorance tax": an ILLUSTRATIVE fleet scenario**, a typical consequence of poor operational visibility, **not an incident at the VMS organization**. Monday 08:15 → truck stopped at a checkpoint → license expired 3 days ago, nobody noticed → driver stuck / delivery delayed / customer waiting / fine issued → "Human error?" crossed out → THE IGNORANCE TAX → "One bad day? The industry data says otherwise." No fine amount or other numbers, no police imagery, and never linked to the kick-off's 6 vehicles (that documented finding stays on the kick-off beat). The on-screen "Illustrative fleet scenario" tag stays.
- Jira: state only what the screenshots show (7 epics, a reporter per epic, all visible items To Do, VMS-16 = US-16 text). **Never state a total Jira story count.** Never recreate fake Jira.
- BPMN (06 · How work flows, Seif 24 Oct 2026): main process = Vehicle Assignment & Return, As-Is → VMS (System) lane inserted → To-Be; secondary = Vehicle Retirement As-Is (beats 26–27) / To-Be (beat 28). Redrawn from the team's four BPMN diagrams (recorded as team-provided process source); their labels and role names kept (Movements Officer, Driver, VMS (System)); Retirement translated from Arabic. Beat titles: As-Is: reactive by design · A system lane appears · To-Be: checked, recorded, released. Gold = the license path (no view of either license / check both licenses / refuse custody). The "6 vehicles" kick-off callout sits on the As-Is as a visual link, not a process-document fact. Blurry reference IDs in the To-Be annotations are left off rather than guessed.
- Backgrounds are shown without names: no person ↔ background mapping anywhere.
- Closing line (approved): "We did not produce a collection of documents. We turned one operational problem into a structured, **verified**, and traceable product definition."

## 6a. Opening — What is VMS? (requested by Seif, 23 Oct 2026)
- One short beat (~10–15 s) before Meet the Team, so the audience knows what VMS is first.
- Heading "VEHICLE MANAGEMENT SYSTEM"; definition "One centralized system for managing the complete vehicle lifecycle."; six areas: Vehicle · Driver · Movement · Maintenance · Fuel · Licensing. Wording is team-provided, consistent with BRD §4.2.
- It is a definition only. It must not introduce the ~550 vehicles, Excel/manual tracking, open questions, statistics, kick-off findings, the 6 expired vehicles, the golden thread (no gold on this beat) or team methodology.
- Vehicle illustration on the right drives in from the right, then title → definition → areas. Restrained; Meet the Team follows unchanged.

## 6b. Cover, Hook, The next decision, The value of visibility (Seif, 24 Oct 2026)
- Cover (beat 1) and Hook (beat 2, before What is VMS?) are the designer-handoff slides used as supplied (full-canvas images, text baked in, `src/assets/hero/`). The Hook is an **illustrative scenario, not measured client data**; its on-slide disclaimer stays. What is VMS? plays its intro when the presenter arrives from the Hook.
- The next decision (beat 36): "THE NEXT DECISION · More vehicles. Clearer decisions. A defined first step. · Proposed scope. Success measures to agree. Evidence to guide the investment." Never add the handoff's ROI / payback figures (5% improvement, EGP 150,000, 50% ROI, 8-month payback, EGP 3M).
- The value of visibility (beat 37, just before Closing) is the supplied slide: 15% / 12% from GPS fleet tracking (Verizon Connect · 2026 Fleet Technology Trends) — **external benchmark, not a VMS forecast, project result or client measurement**; GPS is outside this release. The Closing beat stays the final beat.

## 6c. Personas (Seif, 24 Oct 2026)
- Beat 19, after Who decides: RACI and before 67 features: two team-created BA personas (Fleet Director, Operations Director), dark scene `ch4p`, labelled "Team-created personas · based on discovery & analysis". They represent user needs and behaviour, not verified employee profiles. Ages, marital status, education and location stay off the slide; no new persona facts.

## 6d. The BRD section (Seif, 24 Oct 2026)
- Flow: Verification & Validation → How the BRD evolved (beat 23) → Everything converges into the BRD (24) → Measurable objectives (25).
- How the BRD evolved follows the BRD's revision history exactly: individual team BRDs (four, Ref-05) → **v1.0 consolidated baseline** → **v2.0 conflict-resolution revision** → **v3.0 refined baseline** for mentor / Sponsor review. Never describe v1 as the individual drafts.
- The standalone scope beats (The system boundary, Deliberately outside) are removed. Scope stays visible as a layer of the BRD convergence (11 areas in, 18 documented exclusions out) and as the "Scope" input.

## 7a. Team credits (locked)
- Prologue beat 1 "Meet the Team" (presentation beat 4, right after the opening) shows the confirmed final team list. It is a **team-provided fact, confirmed by Seif (23 Oct 2026)**, not a business-document fact.
- Spelling and order are locked. Change them only when Seif explicitly asks. Data: `D.team` in `src/scripts/data/project.js`.
  - Team Mentor: Sayed Helika
  - Team Members: Gehad Alkady · Mohamed Tokhy · Mohamed Abdelhay · Aya Saied · Esraa Alawadly · Mostafa ElKaramany · Soha Sayed · Sara Amrousy · Hesham Khaled · Mohamed Ghallab · Seif Abd Al-Azem · Eman Hawary
- Layout: "MEET THE TEAM" heading, the mentor above the team, 12 members as 3 columns × 4 read column by column in the order above. No photos, avatars, individual cards or decoration.
- The mentor is not presented as an employee of the organisation, and the frame does not tie the mentor to the kick-off's Business Owner role.
- Animation stays restrained: heading → mentor → member columns as groups (never name by name). Then the frame hands over to "Different disciplines arrive" within the same scene.

## 8. Prototype rules
- Only the final team-created exports (19 Oct 2026) are valid. The old temporary / inspiration UI images must never be bundled, cropped, referenced or used as evidence. The build enforces this.
- Live story uses three screens:
  - License Register `prototype_03` (hero)
  - Movement Dashboard `prototype_04`
  - Maintenance Dashboard `prototype_01`
- Q&A reserve, not bundled: Trip Log `prototype_02`, Drivers `prototype_05`.
- Label wherever the prototype is shown: "TEAM-CREATED PROTOTYPE · ILLUSTRATIVE DATA".
- Sample records and counts are never presented as business data.
- Never imply production software. Allowed framing: "Analysis and design evolved together", "requirements began taking shape in the product experience". Forbidden: "the system was built", "the solution was implemented".
- The Arabic UI stays authentic: no translation, no English annotations over the UI. One quiet outline (the license-status column, linked to US-16) is the only callout.
- Image treatment: crop outer design-review chrome only. Never retouch the UI, stretch or upscale. The "Made with Claude Design" badge in the exports is left as supplied.
- No claim that the prototype's 7 / 30 / 90-day filter implements BRL-04's 30 / 15 / 7 thresholds.

## 9. Visual identity (approved)
- Palette and tokens in `src/styles/tokens.css` (navy / teal / amber / gold; gold = golden thread). Inter typography. Dark prologue, Chapter 1 and finale; light chapters 02–07 and the Finale retrospective (pains → features).
- Fixed 1600×900 composition canvas, scaled to the viewport. Projector-safe: nothing important outside it.

## Change log
- v1.0.0 — approved baseline (32 beats, real prototype in ch8c).
- Unreleased (proposed v2.0.0, beat count changed) — Meet the Team added as Prologue beat 1; Prologue 2 → 3 beats, total 32 → 33. Confirmed team list locked (§7a).
- Unreleased — Opening "What is VMS?" added as a standalone scene before the Prologue (§6a); 15 → 16 scenes, 33 → 34 beats (≈ +15 s). Meet the Team now plays when the presenter arrives from the opening.
- Unreleased — Ch 1 opens with "Operational questions" (full-canvas layer inside ch1, hidden in the static fallback). It replaces the standalone Fleet Challenge beat: the ~550 vehicles / several departments / manual + Excel context moved into its lead line, and the ~550 block stays on the Ch 1 canvas from Domain orientation on. Total stays 34 beats. The five questions are a BA storytelling synthesis of documented problems, not kick-off quotes; the closing line is narrative framing, not a statistic.
- Unreleased — Ch 1 beat 2 "The problem in numbers" added after Operational questions, before Domain orientation (full-canvas layer, hidden in the static fallback). External industry / market context only (§7). Ch 1 4 → 5 beats; total 34 → 35 beats (≈ +30 s).
- Unreleased — Ch 1 beat 5 "One operational moment" added after Research vs elicitation, before What the kick-off revealed (full-canvas layer, hidden in the static fallback). Reconstruction of the documented pattern (§7). Ch 1 5 → 6 beats; total 35 → 36 beats (≈ +15–20 s).
- Unreleased — Storyline restructure (Seif, 24 Oct 2026; structural, proposed v2.0.0). Removed "The traceability chain" and "Quality layers and the backlog" (no hidden beats, no replacement slide). "The lifecycle we learned to think in" replaced by "From Ideation to Creation" (team-provided 11-stage journey) as Ch 1 beat 2. Order changed: One operational moment now follows the journey; System boundary + Deliberately outside moved into The baseline after Verification & validation; Pains and needs + Pains become features moved to the Finale as a retrospective. Golden-thread tracker kept (Feature lights at 67 features, with an F-13 · F-42 chip; Story + Criteria at Given / When / Then). Chapter labels renumbered to a continuous 01–07. Total 36 → 34 beats (≈ −1 min); 16 scenes unchanged.
- Unreleased — Cover (beat 1) and The next decision (beat 35) added (Seif, 24 Oct 2026, §6b). 16 → 18 scenes, 34 → 36 beats (≈ +40 s). The opening's time-based intro moved from page load to arrival from the cover.
- Unreleased — Personas beat added after RACI (§6c). 18 → 19 scenes, 36 → 37 beats (≈ +45 s).
- Unreleased — Golden thread tracker re-pointed to the BA journey: Stakeholder Analysis → Persona → Verification & Validation → BRD → User Stories (beats 15 · 18 · 21 · 24 · 29). Beat content unchanged.
- Unreleased — Cover replaced by the supplied intro slide; Hook (beat 2) and The value of visibility (beat 38) added as supplied slides (§6b). 19 → 21 scenes, 37 → 39 beats (≈ +40 s). Golden thread tracker milestones moved with their beats (16 · 19 · 22 · 25 · 30).
- Unreleased — Golden thread tracker expanded to 10 milestones (Kick-off · Stakeholders · Persona · Feature List · V&V · BRD · BPMN · User Stories · Jira · Prototype), mapped by beat title.
- Unreleased — BRD section restructured (§6d): How the BRD evolved added (beat 23); The system boundary and Deliberately outside removed; scope shown as a BRD layer. 21 scenes (ch3 → ch6e), 39 → 38 beats. Golden-thread BRD milestone moved to How the BRD evolved.
