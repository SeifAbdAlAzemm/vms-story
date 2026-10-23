/* =====================================================================
   PRESENTER BEATS — 33 narrative states, ~19 minutes.
   scene  : id of the <section class="scene"> the beat belongs to (beats are
            ordered; the build checks the count per scene matches data-beats)
   thread : golden-thread step that lights up at this beat (optional)
   notes  : key = key message, why = why it matters, value = value added,
            next = transition. Notes never appear in presentation mode.
   ===================================================================== */
(function (D) {
  D.beats = [
    // ---------------- PROLOGUE (~1:10) ----------------
    { scene: "prologue", chapter: "prologue", title: "Meet the team",
      notes: { key: "This is our team: our mentor, Sayed Helika, and twelve team members.", why: "The audience meets the actual people before the project.", value: "Names first, then where we came from, then the mindset we built together: one continuous opening.", next: "Who are we beyond our names? We came from different backgrounds." } },
    { scene: "prologue", chapter: "prologue", title: "Different disciplines arrive",
      notes: { key: "We came from different backgrounds.", why: "The audience should see the team before the project: UI/UX, BA, technical, marketing, technical and non-technical people.", value: "Diversity is the reason review mattered later.", next: "Pause, then show how those backgrounds became one way of thinking." } },
    { scene: "prologue", chapter: "prologue", title: "One team, one BA mindset",
      notes: { key: "Over a 13-session bootcamp we learned to approach problems through one shared BA mindset.", why: "Every session we learned a BA concept and applied it to the same project.", value: "One mindset meant one standard of evidence across very different people.", next: "Then we were handed a real problem." } },

    // ---------------- CHAPTER 1 (~2:30) ----------------
    { scene: "ch1", chapter: "ch1", title: "The fleet challenge",
      notes: { key: "Roughly 550 vehicles, used every day by several departments, tracked by hand and in separate Excel files.", why: "Scale turns small manual gaps into fines, stoppages and unexplained costs.", value: "Sets the stakes before any solution is mentioned.", next: "Before designing a system, we had to understand the world it operates in." } },
    { scene: "ch1", chapter: "ch1", title: "Domain orientation",
      notes: { key: "We first researched how fleet management usually works: vehicles, drivers, movements, maintenance, fuel, licensing.", why: "Without domain vocabulary you cannot ask the client good questions.", value: "Gave us a map to structure the kick-off.", next: "But research only tells you how the domain usually works." } },
    { scene: "ch1", chapter: "ch1", title: "Research vs elicitation",
      notes: { key: "Research: how does fleet management usually work? Elicitation: how does THIS organization actually work?", why: "The kick-off's Business Owner role was played by our BA Bootcamp Mentor, acting as the client representative.", value: "Moves us from generic assumptions to organization-specific facts.", next: "Here is what the kick-off actually told us." } },
    { scene: "ch1", chapter: "ch1", title: "What the kick-off revealed", thread: "kickoff",
      notes: { key: "Paper and Excel, movement orders, odometer and fuel recorded after return, no fuel traceability, no historical data — and six vehicles already past their license validity.", why: "The six vehicles were discovered only when someone tried to assign them. That is a kick-off finding, not an official BRD baseline.", value: "This one finding becomes our golden thread; watch it travel through every artifact. Seven topics were still unanswered.", next: "Too much uncertainty to guess. Too much work for one stream." } },

    // ---------------- CHAPTER 2 (~1:45) ----------------
    { scene: "ch2", chapter: "ch2", title: "The lifecycle we learned to think in",
      notes: { key: "We learned the full BA lifecycle and applied the stages that fit a bootcamp project.", why: "Discovery and Analysis were applied; Planning and Design & Build partially; Test, Deploy and Operate were not executed.", value: "For the later stages we prepared what they need: testable criteria, a cut-over plan, defined KPIs.", next: "Then we organized the work." } },
    { scene: "ch2", chapter: "ch2", title: "One team, parallel streams",
      notes: { key: "We split into balanced sub-teams, one per module plus a BRD stream.", why: "Seven streams in parallel is the only way to cover the scope in thirteen sessions.", value: "Each stream had a clear owner — later visible as one reporter per Jira epic.", next: "But splitting work is risky unless it comes back together." } },
    { scene: "ch2", chapter: "ch2", title: "Review, align, reconverge",
      notes: { key: "We divided the work — not the understanding. Review was not a phase; it was our operating rhythm.", why: "Create, review, align, improve, approve — after every deliverable, not only at the end.", value: "Four individual BRDs became one; the v2.0 revision resolved the contradictions we found.", next: "First, we needed one shared boundary." } },

    // ---------------- CHAPTER 3 (~1:15) ----------------
    { scene: "ch3", chapter: "ch3", title: "The system boundary",
      notes: { key: "The Project Overview and Scope turned a fuzzy problem into an agreed boundary: eleven areas inside VMS.", why: "Research and elicitation produced many possible needs; scope chose which belong.", value: "Every later artifact measures itself against this one baseline. Where the Feature List differed, the Scope won.", next: "Just as important is what stays outside." } },
    { scene: "ch3", chapter: "ch3", title: "Deliberately outside",
      notes: { key: "GPS, online requests and trip approval, reservations and fuel approval stay out of this release — and there is no data migration.", why: "The kick-off told us there is no historical vehicle data, so the system starts fresh.", value: "Writing exclusions down prevents scope creep; any change needs a Sponsor-approved change request.", next: "Now that the boundary was clear: who matters inside it?" } },

    // ---------------- CHAPTER 4 (~1:45) ----------------
    { scene: "ch4", chapter: "ch4", title: "Power / Interest",
      notes: { key: "Fifteen parties identified, thirteen in scope, each scored for power and interest with a written justification.", why: "Two external parties do not use the system and were kept out.", value: "Shows who can stop the project and who lives with it every day.", next: "Each quadrant needed a different strategy." } },
    { scene: "ch4", chapter: "ch4", title: "Engagement strategies",
      notes: { key: "Manage Closely are consulted before decisions in a weekly workshop; Keep Satisfied get figures first; Keep Informed get demos.", why: "Placement note: the Decommissioning Committee and IT Director placements differ from their raw scores; we kept the team's agreed grid.", value: "Engagement effort goes where it changes outcomes.", next: "Knowing who matters was not enough." } },
    { scene: "ch4", chapter: "ch4", title: "Who decides: RACI",
      notes: { key: "Our Simple RACI: ten key decisions, exactly one Accountable each.", why: "The full workbook covers 63 activities with one Accountable each; it refines some assignments, for example roles and access.", value: "Removes ambiguity about who signs off — before requirements are written.", next: "With ownership clear, needs could become capabilities." } },

    // ---------------- CHAPTER 5 (~2:30) ----------------
    { scene: "ch5a", chapter: "ch5", title: "Pains and needs",
      notes: { key: "We started from real pains: expired licenses found too late, late returns, no fuel traceability, maintenance by hand.", why: "Features that do not trace to a pain are wish-list items.", value: "Keeps the feature list anchored to evidence.", next: "Each pain became concrete capabilities." } },
    { scene: "ch5a", chapter: "ch5", title: "Pains become features", thread: "feature",
      notes: { key: "Pain, capability, feature: license expiry became F-13 and F-42; late returns F-32 and F-45; fuel F-37 and F-38; maintenance F-22 and F-23.", why: "Every feature has a stable ID we reuse down to the user stories and Jira.", value: "The golden thread now has a feature ID.", next: "Across the whole scope that gave us a lot of capability." } },
    { scene: "ch5b", chapter: "ch5", title: "67 features, 12 groups",
      notes: { key: "The four team lists consolidated into 67 features in twelve capability groups.", why: "Grouping lets stakeholders review a module at a time.", value: "One consolidated, numbered list instead of four overlapping drafts.", next: "But not every useful idea belongs in this release." } },
    { scene: "ch5b", chapter: "ch5", title: "MoSCoW: now vs not now",
      notes: { key: "Good analysis is also deciding what NOT to build: 33 Must, 3 Should, 13 Could, 13 Won't — and 5 still in discussion, which are not a MoSCoW category.", why: "We log every movement but not GPS; we record fuel but don't approve it; one dashboard now, advanced analytics later.", value: "Protects the release boundary and focuses effort on required business value.", next: "Before formalizing these decisions, we checked them." } },

    // ---------------- CHAPTER 6 (~2:00) ----------------
    { scene: "ch6a", chapter: "ch6", title: "Verification and validation",
      notes: { key: "Verification — have we documented it correctly? — was performed. Validation — are these the right needs? — is partially complete.", why: "Processes are documented as approved; BRD sign-off by the Sponsor and the Fleet Director's As-Is confirmation are still pending.", value: "We catch problems before they become expensive requirements, and we say honestly what is still open.", next: "Then everything came together." } },
    { scene: "ch6b", chapter: "ch6", title: "Everything converges into the BRD", thread: "requirement",
      notes: { key: "Until this point the analysis lived across several artifacts. BRD-VMS-003 brought the business into one coherent baseline.", why: "Objectives, 42 requirements, 16 rules, 10 NFRs, 11 KPIs, RAID and dependencies in one place.", value: "Our thread becomes BR-033 and business rule BRL-04: alerts at 30, 15 and 7 days.", next: "And the BRD made success measurable." } },
    { scene: "ch6b", chapter: "ch6", title: "Measurable objectives",
      notes: { key: "Three objectives: compliance and control, availability and movement control, maintenance and cost visibility.", why: "Targets like zero vehicles on an expired license are proposed by the BA team; the Sponsor confirms them once baseline figures arrive.", value: "Turns 'better management' into numbers someone can check.", next: "Requirements told us WHAT. Now we needed to understand HOW work moves." } },

    // ---------------- CHAPTER 7 (~2:15) ----------------
    { scene: "ch7", chapter: "ch7", title: "As-Is: reactive by design", thread: "bpmn",
      notes: { key: "Today one Fleet Coordinator maintains licenses manually and notices expiry reactively.", why: "Follow the No path at the gateway: the expired license is discovered when the vehicle is requested — exactly the six vehicles from the kick-off.", value: "BPMN makes the hand-offs and the failure point visible. Role labels are the process document's own; 'Fleet Coordinator' covers the coordinator/administrator role.", next: "Now watch what changes." } },
    { scene: "ch7", chapter: "ch7", title: "A system lane appears",
      notes: { key: "The To-Be adds a second lane: the Fleet Management System.", why: "Monitoring moves from a person's memory to a system responsibility.", value: "Manual, reactive control becomes structured.", next: "Here is the future flow." } },
    { scene: "ch7", chapter: "ch7", title: "To-Be: monitored, reminded, flagged",
      notes: { key: "Store and monitor the expiry date, generate reminders, check renewal, flag and notify — the coordinator acts on alerts.", why: "This is the team's approved To-Be MVP; renewal itself stays outside the system.", value: "Expired licenses stop going unnoticed. We also modelled vehicle missions and preventive maintenance.", next: "Now the business was understood. But how does a delivery team build it?" } },

    // ---------------- CHAPTER 8 (~2:45) ----------------
    { scene: "ch8a", chapter: "ch8", title: "The traceability chain", thread: "story",
      notes: { key: "Kick-off problem, OBJ-01, BR-033 and BRL-04, features F-13 and F-42, user story US-16.", why: "Every layer can be traced back to the business need.", value: "Nobody has to wonder why a story exists.", next: "Now make it testable." } },
    { scene: "ch8a", chapter: "ch8", title: "Given, when, then", thread: "criteria",
      notes: { key: "US-16 in the Fleet Director's words, then acceptance criteria in Given / When / Then.", why: "3 of the story's 6 criteria are shown (source numbering AC 1, 2, 4) — the ones that do not depend on the notification channel, which is still open (ISS-06).", value: "Requirements became behavior that can actually be tested.", next: "And each story carries more than criteria." } },
    { scene: "ch8a", chapter: "ch8", title: "Quality layers and the backlog",
      notes: { key: "Field specifications, edge cases, rules, dependencies, assumptions and open questions surround the story — across 86 stories in six modules.", why: "Final QA also found one controlled gap: the Roles & Permissions stories do not yet carry trace IDs to BR-038/BR-039.", value: "A delivery team gets testable, bounded units of work.", next: "Then documentation had to become actionable." } },
    { scene: "ch8b", chapter: "ch8", title: "Jira: epics, backlog, VMS-16", thread: "jira",
      notes: { key: "Seven epics: the six modules plus BRD & Other documents, each with a different reporter, all To Do. In the backlog, VMS-16 carries the same story as US-16: calculate each license's status and warn at 30, 15 and 7 days.", why: "From a sentence in the kick-off to a backlog item a developer can pick up.", value: "Documentation became actionable work. We don't claim a total Jira count — only what the screenshots show.", next: "Meanwhile, design was giving the requirements a shape." } },
    { scene: "ch8c", chapter: "ch8", title: "The prototype: requirements take shape", thread: "prototype",
      notes: { key: "Requirements → backlog → design. The team-created prototype's License Register shows license records, expiry status and renewal states — where our golden thread lands in the product experience. The outlined column is license status, the thing US-16 asks the system to calculate.", why: "Design ran as a parallel track — analysis, review, wireframes, prototype — and became concrete as modules were approved. The Movement and Maintenance dashboards show the same thinking for two more modules.", value: "Analysis and design evolved together. This is a prototype with illustrative data: not production software, and its records and counts are not business baselines.", next: "Step back. What did all of this become?" } },

    // ---------------- FINALE (~1:00) ----------------
    { scene: "finale-a", chapter: "finale", title: "Everything converges",
      notes: { key: "Overview, scope, stakeholders, RACI, features, BRD, BPMN, stories, criteria, Jira, prototype — all converge into one VMS definition.", why: "Each artifact answered a different question.", value: "Together they reduced uncertainty and unlocked the next decision.", next: "And the team changed too." } },
    { scene: "finale-a", chapter: "finale", title: "Two stories meet",
      notes: { key: "The backgrounds we started with converge again: team transformation and project transformation are the same story.", why: "Different perspectives made the review loop valuable.", value: "One mindset, one baseline, one product definition.", next: "Close." } },
    { scene: "finale-b", chapter: "finale", title: "Closing",
      notes: { key: "We did not produce a collection of documents. We turned one operational problem into a structured, verified and traceable product definition.", why: "Each artifact answered a different question, reduced uncertainty and unlocked the next decision.", value: "Thank the panel.", next: "Open for questions — free scroll or Home to revisit any chapter." } },
  ];
})(window.VMS_DATA = window.VMS_DATA || {});
