# VMS story — source & evidence usage

Precedence applied: Project Scope > BRD-VMS-003 v3.0 > Consolidated Feature List (A04) > latest module story documents > earlier working documents.

## Real assets embedded (cropped only, never edited)
| Asset | Source | Used in |
|---|---|---|
| jira-epics.png | Jira list view screenshot (team-supplied) | Ch 07 · beat 28 |
| jira-backlog.png | Jira backlog screenshot, rows VMS-16 – VMS-23 | Ch 07 · beat 28 |
| prototype_03.png · **License Register** (hero) | Final team-created prototype export | Ch 07 · beat 29 |
| prototype_04.png · **Movement Dashboard** | Final team-created prototype export | Ch 07 · beat 29 |
| prototype_01.png · **Maintenance Dashboard** | Final team-created prototype export | Ch 07 · beat 29 |
| mission-tobe / maintenance-tobe / license-tobe thumbnails | VMS Business Process Documentation (BPMN SVGs) | Ch 06 "Also modelled" strip |
| License As-Is / To-Be BPMN | Redrawn from the same document; the document's own role labels kept | Ch 06 · beats 24–26 |
| Inter variable font (OFL) | rsms/inter | Whole page |
| Lucide icons (ISC) | lucide.dev | Whole page |

**Not used anywhere:** the temporary / inspiration UI images (old GPS / route-tracking images). They are not bundled, cropped, referenced or used as evidence. The build fails if their file IDs or tell-tale strings appear in the output.

**Prototype:** 3/3 real images found — License Register, Movement Dashboard, Maintenance Dashboard (final team-created exports, supplied 19 Oct 2026; they supersede every earlier prototype or inspiration image).
- Treatment: only the outer design-review bar (top 54 px: reviewer role picker, viewport toggles, session controls) was cropped. The Arabic application UI is untouched — not translated, retouched or stretched; aspect ratio preserved (checked by QA). The "Made with Claude Design" badge is part of the supplied export and was left in place rather than painted out. Originals: `src/assets/prototype/original/`.
- The hero is embedded at native width (1905 px) so the Arabic text stays sharp; the supporting screens are embedded at 1200 px.
- On-screen label: "TEAM-CREATED PROTOTYPE · ILLUSTRATIVE DATA". Sample records, names and counts in the screens are never presented as business baselines.
- One quiet gold outline marks the License Register's license-status column, tied in the caption to US-16 (the story asks the system to calculate each license's status). No English text is placed over the UI.
- Not shown, kept in the source folder for Q&A: prototype_02.png (Movement / Trip Log), prototype_05.png (Drivers). Not bundled in index.html.

## Facts by chapter → source
| Chapter | Facts | Source |
|---|---|---|
| Opening | "Vehicle Management System" · definition "One centralized system for managing the complete vehicle lifecycle" · six areas (Vehicle, Driver, Movement, Maintenance, Fuel, Licensing) — beat 1 | **Team-provided wording** (Seif, 23 Oct 2026), consistent with BRD-VMS-003 §4.2 Proposed Solution ("one centralized, role-based VMS covering the vehicle lifecycle: registry, assignment, movements, maintenance, fuel, license alerts…"). Area labels match the Ch 1 domain map. Vehicle drawing = **visual interpretation** (illustration, not a real vehicle or the prototype) |
| Prologue | Team Mentor + 12 team members (names, spelling, order) — beat 2 (prologue beat 1) | **Team-provided fact — confirmed by Seif** (23 Oct 2026). Not a business-document fact |
| Prologue | 5 backgrounds, 13-session journey | Team brief (locked answers) |
| 1 · World | ~550 vehicles, several departments, tracked by hand and in separate Excel files (beat 5 lead line; ~550 block from beat 9) | BRD §4.1 |
| 1 · World | Beat 5 "Vehicle X" + five operational questions + "you have a visibility problem" | **BA storytelling synthesis / narrative framing** — not kick-off quotes, not a statistic. Each question maps to a documented problem: Paper + Excel records, license expiry found at assignment (Kick-off MOM · As-Is BPMN), no fuel traceability, no actual movement tracking (Kick-off MOM), cost visibility (BRD objective; "Vehicle cost" open topic), "Fleet ownership" open topic. "Vehicle X" is illustrative |
| 1 · World | Beat 6 "From Ideation to Creation": Kick-off Meeting → Stakeholder Analysis & RACI → Persona → Feature List → Verification & Validation → BRD → User Story Mapping → User Stories & Exceptions → Jira → BPMN → Wireframes | **Team-provided presentation content** (Seif, 24 Oct 2026), labels and order exactly as supplied; high-level journey overview, not a source-document fact or session mapping |
| 1 · World | Beat 8 "The problem in numbers": 79% of SME fleet managers use more than five spreadsheets · 63% admit to missing deadlines (Vimcar survey, UK) · 17.7% unmonitored operational overspending (Motive / Wakefield) · $448–$760 per vehicle / day, average vehicle downtime cost (Element Fleet Management, citing Work Truck Magazine — corrected by Seif, 23 Oct 2026) · ~10.4M licensed vehicles in Egypt 2024 · Egypt fleet management solutions market ~USD 163M (2025) → ~USD 229M (2031, projected) (Ken Research). Headline and closing line | **Team-provided external statistics** (Seif, 23 Oct 2026), figures and source labels exactly as supplied; **not** from the project documents and not checked against them. Labelled on screen "External industry data · context only" + footnote: they do not describe the VMS organization. Headline and closing line = **narrative framing** |
| 1 · World | Beat 7 "One operational moment": Mission request → Select vehicle → Manual license check → Expired; "Nobody was careless…"; "discovered at the moment of use — not before it" | **Storytelling reconstruction of the documented pattern** — not an incident report. Kick-off MOM: paper + Excel (§1, §5); a mission triggers a movement order and the person responsible selects the vehicle (§1, §5); expiry discovered only when the organization attempted to assign/use the vehicle for a mission and a gap in proactive monitoring (§2). "Manual license check" = **visual interpretation** of the paper/Excel process. Closing lines = **narrative framing**. No count shown (6 vehicles stays on beat 11) |
| 1 · World | 9 kick-off findings, 7 open topics, "6 vehicles had already exceeded their license validity" (labelled **Kick-off finding**, not a BRD baseline) | Kick-off MOM |
| 2 · How we worked | 7 Jira epics; 4 team BRDs merged (BRD Ref-05) | Jira screenshot · BRD |
| 05 · Baseline (V&V, beat 19) | F-04 worked example: before = F-04 description, verbatim; issues, after-wording, search fields (Vehicle ID, Plate Number, VIN/Chassis, Model), filter fields (Type, Brand, Status), AND logic, baseline (empty state, pagination, sorting), "+8 more points", "6 marked [CONFIRM]" | Feature List (A04) · **team verification review of F-04** (screenshots, Seif, 24 Oct 2026), summarised; consistent with Module 01 V.02 US-04 |
| 05 · Baseline (boundary, beats 20–21) | 11 scope areas; 5 of 18 documented exclusions shown; F-57 no migration | Project Scope · BRD §6.2 · Feature List |
| 03 · People | 15 identified → 13 in scope; quadrants; 10-row Simple RACI | Stakeholder Analysis (A05) |
| 04 · Capabilities | 67 features / 12 groups; golden-thread chip F-13 · F-42 (both in the consolidated list); MoSCoW 33 Must · 3 Should · 13 Could · 13 Won't · 5 not yet prioritised (F-47, F-49–F-52) | Feature List — recounted from the table |
| Finale · retrospective | Pains → capability → features (F-13 · F-42, F-32 · F-45, F-37 · F-38, F-22 · F-23), all Must — beats 30–31 | Feature List (A04) · Kick-off MOM · BRD §4.2 / §8.1 |
| 05 · Baseline | 3 OBJ · 42 BR (40 Must) · 16 BRL · 10 NFR · 11 KPI · 31 RAID (10 R · 6 A · 4 C · 11 I) · 7 DEP; objective targets | BRD-VMS-003 v3.0 — recounted |
| 06 · Process | License As-Is / To-Be | Business Process Documentation |
| 07 · Backlog (beat 27) | User Stories & Exception Handling, example US-01 Add Vehicle: story, trace, required fields, 4 criteria (condensed), exception rows 1, 2, 5 | Module 01 V.02, US-01 |
| 07 · Backlog (beat 27) | Exception rows 3–4: double Save → one record; network failure → "Connection error, please try again", no partial record, retry | **Team exception-handling scenarios** (Seif, 24 Oct 2026), not in US-01's own text |
| 07 · Jira | Only what is visible: 7 epics, a reporter per epic, all visible items To Do, VMS-16 text = US-16 | Screenshots |
| 07 · Prototype | Golden thread end to end: kick-off finding → BR-033 · BRL-04 → To-Be BPMN → US-16 → VMS-16 → License Register. Framed as "analysis and design evolved together" — never as built or implemented software | Prototype exports · traceability above |

## Known content risks (non-blocking, disclosed in notes)
1. "6 vehicles" exists only in the kick-off MOM; the BRD lists baseline figures as not yet supplied (ISS-05).
2. BPMN role labels ("Fleet Coordinator") differ from BRD role names; the mapping is in presenter notes.
3. The Simple RACI image (A05) differs from the full RACI workbook on some decisions (e.g. roles & access).
4. License stories exist twice: US-16 (Module 01) and US-01/02 (Module 05 Notifications).
5. Notification channels are still open (ISS-06); no channel is presented as final.
6. Validation is partial: BRD sign-off and As-Is confirmation pending (ISS-10).
7. Team list confirmed by Seif (23 Oct 2026) and shown in beat 2 (Prologue beat 1, Meet the Team) as a team-provided fact (spelling and order locked, DECISIONS §7a). Backgrounds are still not mapped to names. Jira reporter names appear only because they are in the real screenshot.
8. Jira total story count not verifiable from the screenshots and is not claimed.
9. Closing line reads "structured, **verified**, and traceable" (approved in director review).
10. Roles & Permissions stories (RP-01–RP-19) carry no F / BR / BRL trace IDs, unlike the other modules.
11. The prototype screens contain sample counts (e.g. 90 vehicle licenses, 49 near expiry) that differ from the ~550-vehicle fleet; they are labelled illustrative and not discussed as figures.
12. The prototype's expiry filter offers 7 / 30 / 90 days, while BRL-04 notifies at 30 / 15 / 7 days. The presentation does not claim the filter implements BRL-04.
13. The opening definition paraphrases BRD §4.2 ("complete vehicle lifecycle"); BRD §4.2 also lists decommissioning and reporting, which the six opening areas do not show. The opening is an introduction, not a scope statement (the System boundary beat in 05 · The baseline holds the 11 scope areas).
14. Beat 8 statistics are external and were supplied by the team, not drawn from the project documents; the presenter must not apply them to the organization. Be ready in Q&A for the attribution of the ~10.4M licensed-vehicles figure to Ken Research (as supplied).
