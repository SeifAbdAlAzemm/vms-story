/* =====================================================================
   VMS STORY · PROJECT DATA
   Every value carries its evidence type:
     SRC  = source document fact        TEAM = user-provided team fact
     VIS  = visual interpretation       OPEN = open / pending decision
   ===================================================================== */
(function (D) {

  /* ---------- Chapters on the journey rail (no session-number mapping) ---------- */
  // Visible chapter numbers are continuous (01–07); ids are internal and keep their original names.
  D.chapters = [
    { id: "prologue", label: "Team", title: "Prologue" },
    { id: "ch1", label: "World", title: "01 · The world we entered" },
    { id: "ch2", label: "Ways of working", title: "02 · How we worked" },
    { id: "ch4", label: "People", title: "03 · People and ownership" },
    { id: "ch5", label: "Capabilities", title: "04 · Capabilities and priorities" },
    { id: "ch6", label: "Baseline", title: "05 · The baseline" },
    { id: "ch7", label: "Process", title: "06 · How work flows" },
    { id: "ch8", label: "Backlog", title: "07 · From requirement to backlog" },
    { id: "finale", label: "Convergence", title: "Finale" },
  ];
  D.designTrackFrom = "ch5"; // TEAM: wireframes/prototype ran in parallel with analysis

  /* ---------- Golden thread: vehicle license expiry (story order) ---------- */
  D.thread = [
    { id: "kickoff", label: "Kick-off" },
    { id: "feature", label: "Feature" },
    { id: "requirement", label: "Requirement" },
    { id: "bpmn", label: "BPMN" },
    { id: "story", label: "User story" },
    { id: "criteria", label: "Criteria" },
    { id: "jira", label: "Jira" },
    { id: "prototype", label: "Prototype" },
  ];

  /* ---------- Opening · What is VMS? ---------- */
  // TEAM wording (Seif's opening brief, 23 Oct 2026), consistent with BRD-VMS-003 §4.2 Proposed Solution:
  // "One centralized, role-based Vehicle Management System covering the vehicle lifecycle: registry, assignment,
  // movements, maintenance, fuel, license alerts…". Labels match the Ch1 domain map. Introductory definition only.
  D.vmsAreas = [
    { label: "Vehicle", icon: "car" }, { label: "Driver", icon: "id-card" }, { label: "Movement", icon: "route" },
    { label: "Maintenance", icon: "wrench" }, { label: "Fuel", icon: "fuel" }, { label: "Licensing", icon: "shield-check" },
  ];

  /* ---------- Prologue (TEAM) ---------- */
  D.backgrounds = ["UI/UX", "Business Analysis", "Software / Technical", "Marketing", "Technical & Non-Technical"];
  // TEAM: confirmed final team list (Seif, 23 Oct 2026). Spelling and order are locked (docs/DECISIONS.md §7a).
  // Not a business-document fact. Shown as 3 columns × 4, read column by column in this order.
  D.team = {
    mentor: "Sayed Helika",
    members: [
      "Gehad Alkady", "Mohamed Tokhy", "Mohamed Abdelhay", "Aya Saied",
      "Esraa Alawadly", "Mostafa ElKaramany", "Soha Sayed", "Sara Amrousy",
      "Hesham Khaled", "Mohamed Ghallab", "Seif Abd Al-Azem", "Eman Hawary",
    ],
  };

  /* ---------- Chapter 1 ---------- */
  D.fleet = { approx: "~550", note: "vehicles used daily by several departments", source: "BRD-VMS-003 §4.1 (approximately 550)" };
  D.domainNodes = ["Vehicle", "Driver", "Movement", "Maintenance", "Fuel", "Licensing"]; // VIS: domain orientation
  // SRC: VMS Kick-off Meeting · Minutes of Meeting
  D.kickoffFindings = [
    { icon: "file-spreadsheet", h: "Paper + Excel", p: "Records kept on paper and in Excel files" },
    { icon: "clipboard-list", h: "Movement orders", p: "A movement order is issued for each mission" },
    { icon: "gauge", h: "Odometer after return", p: "Reading recorded when the vehicle comes back" },
    { icon: "fuel", h: "Fuel after return", p: "Consumption recorded after the mission" },
    { icon: "receipt", h: "Treasury fuel document", p: "Driver obtains fuel from the treasury with a document" },
    { icon: "map-pin-off", h: "No actual tracking", p: "No real-time or actual movement tracking" },
    { icon: "search", h: "Fuel traceability missing", p: "No visibility of who, what, when and why" },
    { icon: "database", h: "No historical data", p: "Nothing to migrate: the system starts fresh" },
    { icon: "wrench", h: "Two maintenance paths", p: "Internal, or approved external service centers" },
  ];
  D.kickoffThread = { h: "6 vehicles had already exceeded their license validity", p: "Discovered only when the organization tried to assign them to a mission", tag: "Kick-off finding" };
  D.openTopics = ["Fleet planning", "Vehicle cost", "Driver performance", "Fleet ownership", "Vehicle prioritization", "Driver employment model", "Business priority"];
  // TEAM: "From Ideation to Creation" journey labels, provided and approved by Seif (24 Oct 2026). High-level overview of
  // the team's path, not a source-document fact and not a session/artifact mapping. Labels and order exactly as supplied.
  D.journey = ["Kick-off Meeting", "Stakeholder Analysis & RACI", "Persona", "Feature List", "Verification & Validation", "BRD",
    "BPMN", "User Stories & Exceptions", "Jira", "Prototype"];

  /* ---------- Chapter 2 ---------- */
  // SRC: Jira epics screenshot (7 epics)
  D.streams = ["Vehicle Management", "Driver Management & Assignment", "Maintenance & Repair Centers", "Movements & Fuel", "Notifications", "Roles & Permissions", "BRD & Other documents"];
  D.reviewLoop = ["Create", "Review", "Align", "Improve", "Approve"];

  /* ---------- Chapter 6 · system boundary + exclusions (scene ch3) (SRC: Project Scope §1.1–1.11, BRD §6) ---------- */
  D.scopeGroups = [
    { name: "Fleet records", tone: "navy", items: [["car", "Vehicle Management"], ["id-card", "Driver Management"], ["tag", "Vehicle Brands"], ["landmark", "Licensing Authorities"]] },
    { name: "Operations", tone: "teal", items: [["route", "Movement Log"], ["fuel", "Fuel Management"], ["wrench", "Maintenance Management"], ["warehouse", "Repair Centers"]] },
    { name: "Control & insight", tone: "steel", items: [["bell-ring", "Notifications"], ["lock-keyhole", "Roles & Permissions"], ["chart-column", "Reports"]] },
  ];
  D.exclusions = [
    { h: "GPS, route tracking & geofencing", s: "F-36 · F-67 · Phase 2 candidate" },
    { h: "Online vehicle requests & trip approval", s: "F-30 · F-31 · boundary still open (ISS-03)" },
    { h: "Vehicle reservation (advance booking)", s: "F-35" },
    { h: "Fuel request & approval flow", s: "F-41 · fuel is recorded, not requested" },
  ];
  D.noMigration = { h: "No data migration", s: "F-57 · the system starts with fresh data", link: "Kick-off: no historical vehicle data exists" };

  /* ---------- Chapter 6 ---------- */
  // Verification & validation, shown through one worked example: F-04.
  // before: SRC Consolidated Feature List (A04), F-04 description, verbatim.
  // issues / after / defined: TEAM verification review of F-04 (screenshots supplied by Seif, 24 Oct 2026), summarised.
  //   Consistent with Module 01 V.02 US-04 (search on Vehicle ID / Plate / VIN / Model; Type / Brand / Status filters;
  //   AND across filters; empty state, paging, sorting). The 6 open points went to the stakeholder marked [CONFIRM]: not closed.
  D.vvExample = {
    id: "F-04", name: "Vehicle List, Search & Filter", meta: "Must · Confirmed",
    before: "Browse and filter the vehicle list by attributes such as type, brand, status, and other key fields.",
    issues: [
      "“Search” is in the name, but no search fields are defined",
      "“Other key fields” is vague, so it can't be tested",
      "Several filters at once: AND or OR?",
      "Browse undefined: paging, sorting, empty results",
      "Archived vehicles and performance not addressed",
    ],
    more: "+ 8 more points in the verification review",
    after: "Authorized users can view, search and filter the vehicle list using defined search fields and attributes, with clear handling of empty results and large result sets.",
    defined: [
      { k: "Search", v: "Vehicle ID · Plate Number · VIN/Chassis · Model" },
      { k: "Filters", v: "Type · Brand · Status" },
      { k: "Logic", v: "Multiple filters use AND · search works with filters" },
      { k: "Baseline", v: "Empty state · Pagination · Sorting" },
      { k: "Open points", v: "6 marked [CONFIRM] for the stakeholder", open: true },
    ],
  };
  D.vvTakeaway = [
    { k: "Validation", q: "Are we solving the right need?", a: "Checked with the stakeholder", icon: "messages-square" },
    { k: "Verification", q: "Did we write it the right way?", a: "Clear, specific and testable", icon: "list-checks" },
  ];
  D.brdInputs = ["Problem", "Scope", "Stakeholders", "RACI", "Features", "Rules", "Open questions"];
  D.brdLayers = [
    { v: "3", l: "Objectives" },
    { v: "42", l: "Business requirements", s: "40 Must" },
    { v: "16", l: "Business rules" },
    { v: "10", l: "Non-functional requirements" },
    { v: "11", l: "KPIs" },
    { v: "31", l: "RAID entries", s: "10 risks · 6 assumptions · 4 constraints · 11 issues" },
    { v: "7", l: "Dependencies" },
  ];
  D.objectives = [
    { id: "OBJ-01", name: "Compliance & control", thread: true, k: [["0", "vehicles operating on an expired license", "within 3 months"], ["30·15·7", "day license alerts, 100% of vehicles & drivers", "within 3 months"]] },
    { id: "OBJ-02", name: "Vehicle availability & movement control", k: [["Same day", "every late return flagged", "from month 1"], ["−30%", "unplanned vehicle downtime", "within 12 months"]] },
    { id: "OBJ-03", name: "Maintenance & cost visibility", k: [["100%", "maintenance & oil changes notified", "within 6 months"], ["−10%", "average fuel cost per km", "within 12 months"]] },
  ];
  D.objectivesNote = "Proposed targets — confirmed by the Sponsor once baseline figures are supplied (ISS-05).";

  /* ---------- Finale ---------- */
  D.finaleChips = ["Project Overview", "Scope", "Stakeholders", "RACI", "Features", "BRD", "BPMN", "User Stories", "Acceptance Criteria", "Jira", "Prototype"];

})(window.VMS_DATA = window.VMS_DATA || {});
