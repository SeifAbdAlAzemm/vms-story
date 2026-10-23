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

## 2. Structure — 32 beats, about 18–19 minutes
| Part | Beats | Scenes |
|---|---|---|
| Prologue: different backgrounds → one BA mindset | 2 | prologue |
| 1 · The world we entered | 4 | ch1 |
| 2 · How we worked | 3 | ch2 |
| 3 · The boundary | 2 | ch3 |
| 4 · People and ownership | 3 | ch4 |
| 5 · Capabilities and priorities | 4 | ch5a, ch5b |
| 6 · The baseline | 3 | ch6a, ch6b |
| 7 · How work flows | 3 | ch7 |
| 8 · From requirement to backlog (and design) | 5 | ch8a (3), ch8b Jira (1), ch8c prototype reveal (1) |
| Finale: convergence + closing frame | 3 | finale-a, finale-b |

Each scene ends with an "Unlocks →" line that hands over to the next question.

## 3. Persistent devices (do not remove)
- **13-SESSION BA JOURNEY rail**: chapters as phases. There is no session → artifact mapping.
- **Golden thread = vehicle license expiry.** Tracker nodes: Kick-off → Feature → Requirement → BPMN → User story → Criteria → Jira → Prototype.
  - On screen: kick-off finding → F-13 · F-42 → BR-033 · BRL-04 → To-Be BPMN → US-16 → VMS-16 → License Register.
- **Review loop** CREATE → REVIEW → ALIGN → IMPROVE → APPROVE. It ticks at chapter hand-offs.
- **Design track** on the rail from Chapter 5 onward: wireframes and the prototype ran in parallel with the analysis.

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
  - 86 stories (19 / 12 / 14 / 7 / 15 / 19)
  - BRD: 3 OBJ · 42 BR (40 Must) · 16 BRL · 10 NFR · 11 KPI · 31 RAID · 7 DEP
  - 15 stakeholders identified → 13 in scope
  - US-16: 4 fields, 8 edge cases, criteria AC 1 / 2 / 4 of 6 (source numbering)

## 7. Wording locks
- "6 vehicles had already exceeded their license validity" is a **Kick-off finding**, never an official BRD baseline (BRD ISS-05: baselines not yet supplied).
- Business Owner = "Business Owner / Mentor acting as Client Representative". Never present the Mentor as an employee of the organisation.
- Lifecycle states:
  - **Applied:** Discovery, Analysis
  - **Partially applied:** Planning, Design & Build
  - **Prepared for:** Test & UAT, Deploy & Transition, Operate & Evaluate
- Verification is **performed**. Validation is **partial / pending** (BRD sign-off and As-Is confirmation, ISS-10).
- Email is not stated as a finalised notification channel (ISS-06 open). The acceptance criteria shown are channel-independent.
- Jira: state only what the screenshots show (7 epics, a reporter per epic, all visible items To Do, VMS-16 = US-16 text). **Never state a total Jira story count.** Never recreate fake Jira.
- BPMN: keep the process document's own role labels. Role mapping goes in presenter notes. Movement and Maintenance BPMN appear as thumbnails only.
- Backgrounds are shown without names. No team credits unless a confirmed team list exists.
- Closing line (approved): "We did not produce a collection of documents. We turned one operational problem into a structured, **verified**, and traceable product definition."

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
- Palette and tokens in `src/styles/tokens.css` (navy / teal / amber / gold; gold = golden thread). Inter typography. Dark prologue, Chapter 1 and finale; light chapters 2–8.
- Fixed 1600×900 composition canvas, scaled to the viewport. Projector-safe: nothing important outside it.

## Change log
- v1.0.0 — approved baseline (32 beats, real prototype in ch8c).
