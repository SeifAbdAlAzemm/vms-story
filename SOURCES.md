# VMS story — source & evidence usage

Precedence applied: Project Scope > BRD-VMS-003 v3.0 > Consolidated Feature List (A04) > latest module story documents > earlier working documents.

## Real assets embedded (cropped only, never edited)
| Asset | Source | Used in |
|---|---|---|
| jira-epics.png | Jira list view screenshot (team-supplied) | Ch 8 · beat 28 |
| jira-backlog.png | Jira backlog screenshot, rows VMS-16 – VMS-23 | Ch 8 · beat 28 |
| prototype_03.png · **License Register** (hero) | Final team-created prototype export | Ch 8 · beat 29 |
| prototype_04.png · **Movement Dashboard** | Final team-created prototype export | Ch 8 · beat 29 |
| prototype_01.png · **Maintenance Dashboard** | Final team-created prototype export | Ch 8 · beat 29 |
| mission-tobe / maintenance-tobe / license-tobe thumbnails | VMS Business Process Documentation (BPMN SVGs) | Ch 7 "Also modelled" strip |
| License As-Is / To-Be BPMN | Redrawn from the same document; the document's own role labels kept | Ch 7 · beats 22–24 |
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
| Prologue | 5 backgrounds, 13-session journey | Team brief (locked answers) |
| 1 · World | ~550 vehicles | BRD §4.1 |
| 1 · World | 9 kick-off findings, 7 open topics, "6 vehicles had already exceeded their license validity" (labelled **Kick-off finding**, not a BRD baseline) | Kick-off MOM |
| 2 · How we worked | Lifecycle states (Applied / Partially applied / Prepared for); 7 Jira epics; 4 team BRDs merged (BRD Ref-05) | Locked answers · Jira screenshot · BRD |
| 3 · Boundary | 11 scope areas; 5 of 18 documented exclusions shown; F-57 no migration | Project Scope · BRD §6.2 · Feature List |
| 4 · People | 15 identified → 13 in scope; quadrants; 10-row Simple RACI | Stakeholder Analysis (A05) |
| 5 · Capabilities | 67 features / 12 groups; MoSCoW 33 Must · 3 Should · 13 Could · 13 Won't · 5 not yet prioritised (F-47, F-49–F-52) | Feature List — recounted from the table |
| 6 · Baseline | 3 OBJ · 42 BR (40 Must) · 16 BRL · 10 NFR · 11 KPI · 31 RAID (10 R · 6 A · 4 C · 11 I) · 7 DEP; objective targets | BRD-VMS-003 v3.0 — recounted |
| 7 · Process | License As-Is / To-Be | Business Process Documentation |
| 8 · Backlog | US-16 text, trace, 4 fields, 8 edge cases, AC 1/2/4 of 6; 86 stories (19/12/14/7/15/19) | Module 01 V.02 and final module backlogs — recounted |
| 8 · Jira | Only what is visible: 7 epics, a reporter per epic, all visible items To Do, VMS-16 text = US-16 | Screenshots |
| 8 · Prototype | Golden thread end to end: kick-off finding → BR-033 · BRL-04 → To-Be BPMN → US-16 → VMS-16 → License Register. Framed as "analysis and design evolved together" — never as built or implemented software | Prototype exports · traceability above |

## Known content risks (non-blocking, disclosed in notes)
1. "6 vehicles" exists only in the kick-off MOM; the BRD lists baseline figures as not yet supplied (ISS-05).
2. BPMN role labels ("Fleet Coordinator") differ from BRD role names; the mapping is in presenter notes.
3. The Simple RACI image (A05) differs from the full RACI workbook on some decisions (e.g. roles & access).
4. License stories exist twice: US-16 (Module 01) and US-01/02 (Module 05 Notifications).
5. Notification channels are still open (ISS-06); no channel is presented as final.
6. Validation is partial: BRD sign-off and As-Is confirmation pending (ISS-10).
7. Team list unconfirmed — no credits shown; Jira reporter names appear only because they are in the real screenshot.
8. Jira total story count not verifiable from the screenshots and is not claimed.
9. Closing line reads "structured, **verified**, and traceable" (approved in director review).
10. Roles & Permissions stories (RP-01–RP-19) carry no F / BR / BRL trace IDs, unlike the other modules.
11. The prototype screens contain sample counts (e.g. 90 vehicle licenses, 49 near expiry) that differ from the ~550-vehicle fleet; they are labelled illustrative and not discussed as figures.
12. The prototype's expiry filter offers 7 / 30 / 90 days, while BRL-04 notifies at 30 / 15 / 7 days. The presentation does not claim the filter implements BRL-04.
