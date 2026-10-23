/* SRC: Stakeholder Analysis (A05) §2 scores and justifications; quadrant placement per
   the team's Power/Interest grid (Miro), quadrant table and BRD §7.1.
   Two scores do not match their placement; kept as placed, flagged in `note`. */
(function (D) {
  D.quadrants = {
    sat: { name: "Keep Satisfied", ax: "High power · low interest", strategy: "Figures first · monthly one-page memo" },
    man: { name: "Manage Closely", ax: "High power · high interest", strategy: "Consulted before decisions · weekly workshop" },
    mon: { name: "Monitor", ax: "Low power · low interest", strategy: "Contacted when their input is due" },
    inf: { name: "Keep Informed", ax: "Low power · high interest", strategy: "Group demos & quick guide · bi-weekly" },
  };
  D.stakeholders = [
    { n: "Head of Authority", q: "sat", p: 5, i: 3, role: "Final approval; releases the go-ahead. Likely Project Sponsor." },
    { n: "Finance & Admin Director", q: "sat", p: 5, i: 2, role: "Releases the budget; approval levels follow financial rules." },
    { n: "IT Director", q: "sat", p: 4, i: 4, role: "Access, security, data protection, backups; can stop a launch.", note: "Scored P4 · I4; placed in Keep Satisfied by the team." },
    { n: "Internal Audit", q: "sat", p: 4, i: 3, role: "Reviews fuel and maintenance spending; can stop payments." },
    { n: "Fleet Director", q: "man", p: 5, i: 5, role: "Runs the system daily: vehicles, trips, licenses, fuel, maintenance." },
    { n: "Maintenance Coordinator", q: "man", p: 4, i: 5, role: "Decides internal or external work; every maintenance record passes through." },
    { n: "Operations Director", q: "man", p: 4, i: 5, role: "Requests vehicles daily; reports shortages to the Head of Authority." },
    { n: "Decommissioning Committee", q: "man", p: 4, i: 2, role: "Approves or rejects decommissioning within a time limit.", note: "Scored P4 · I2; placed in Manage Closely by the team and the BRD." },
    { n: "Internal Workshop Staff", q: "mon", p: 1, i: 2, role: "Small repairs and oil changes on work orders." },
    { n: "Licensing Officer", q: "inf", p: 3, i: 5, role: "Supplies licensing data and receives alerts; does not log in." },
    { n: "Movement Dispatcher", q: "inf", p: 3, i: 5, role: "Enters trip information every day." },
    { n: "Drivers (employees)", q: "inf", p: 2, i: 5, role: "Their trips, fuel and distance are the system's basic data." },
    { n: "Stores & Procurement", q: "inf", p: 2, i: 4, role: "Maintenance starts only when oil and parts are available." },
  ];
  D.stakeholderCounts = { identified: 15, inScope: 13 };
  // TEAM-CREATED BA PERSONAS (Seif, 24 Oct 2026): analysis artifacts representing user needs and behaviour, not verified
  // employee profiles. On screen: role, short profile, 3 behaviours, 3 goals, 3 pain points, quote. Ages, education and
  // other demographic details from the persona sheets are deliberately left off the slide.
  D.personas = [
    { name: "Eng. Hesham Abdel Hamid", role: "Fleet Director", icon: "car",
      profile: "25+ years in fleet & logistics operations · runs ~550 vehicles with a small team · reports to the Head of Authority",
      behaviour: ["Tracks licenses in Excel and paper files, reviewed near the end of each week", "Follows up daily by phone / WhatsApp with dispatchers", "Prefers simple, direct information over long meetings"],
      goals: ["No vehicle stops because of an expired license", "See fleet availability, maintenance and overdue status clearly", "Understand fuel and maintenance cost per vehicle"],
      pains: ["License expiry can go unnoticed", "Data is scattered across Excel and paper", "Hard to see which vehicles are becoming expensive to operate"],
      quote: "I just want one screen that tells me what needs action today." },
    { name: "Mr. Tarek Soliman", role: "Operations Director", icon: "route",
      profile: "15+ years in field operations · field teams request vehicles daily · reports shortages and delays to leadership",
      behaviour: ["Requests vehicles in the morning by phone or WhatsApp", "Follows field teams mainly from mobile", "Thinks in terms of service impact and availability"],
      goals: ["The right vehicle is ready when requested", "Know request status and expected vehicle availability", "Resolve shortages quickly so service is not interrupted"],
      pains: ["Vehicles can arrive late or become unavailable unexpectedly", "No clear answer to “when will it arrive?”", "Replacements can be slow during peak periods"],
      quote: "When I request a vehicle in the morning, the right one has to be ready." },
  ];
})(window.VMS_DATA = window.VMS_DATA || {});
