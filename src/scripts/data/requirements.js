/* SRC: BRD-VMS-003 v3.0 (OBJ-01, BR-033, BRL-04), Feature List (F-13, F-42),
   Module 01 Vehicle Management V.02 (US-16), final module backlogs (story counts). */
(function (D) {
  D.chain = [
    { id: "Kick-off finding", t: "6 vehicles found with expired licenses", kind: "kickoff" },
    { id: "OBJ-01", t: "Compliance & control: no vehicle on an expired license" },
    { id: "BR-033 · BRL-04", t: "Notify as a license approaches or reaches expiry — at 30, 15 and 7 days" },
    { id: "F-13 · F-42", t: "License tracking · license expiry notifications" },
    { id: "US-16", t: "Vehicle License Status and Expiry Notifications", kind: "story" },
  ];
  D.story = {
    id: "US-16",
    title: "Vehicle License Status and Expiry Notifications",
    trace: "Trace: F-13 · BR-033 · BRL-04 · BR-016 · ASM-03 · A-09 · A-16",
    as: "Fleet Director",
    want: "the system to calculate each license's status and warn me 30, 15 and 7 days before expiry and on the day it expires",
    so: "no vehicle works on an expired license without us knowing",
  };
  // 3 of the 6 source criteria (source numbering kept). Chosen because they do not depend on the unresolved notification channel (ISS-06)
  D.criteria = [
    { g: "a license has 30, 15 or 7 days left", w: "the daily check runs", t: "one notification is sent for that threshold", b: "BRL-04", n: 1 },
    { g: "a license expires today or has expired", w: "the daily check runs", t: "its status becomes Expired and one “License expired” notification is sent", b: "BR-033", n: 2 },
    { g: "a license is renewed before the next threshold", w: "the renewal is saved", t: "pending notifications are cancelled and the status is recalculated", b: "US-16", n: 4 },
  ];
  D.qualityLayers = [
    { icon: "table", h: "Field specification", p: "4 fields with type, limits and validation", e: "src" },
    { icon: "triangle-alert", h: "Edge cases", p: "8 exception scenarios, e.g. duplicates, archived vehicles", e: "src" },
    { icon: "scale", h: "Business rules", p: "BRL-04 thresholds · BR-016 warns on movements, no auto-block", e: "src" },
    { icon: "link", h: "Dependency", p: "DEP-03: initial license data from the Fleet Director's team", e: "src" },
    { icon: "circle-help", h: "Assumption · open question", p: "ASM-03 alerts without an account · ISS-06 channels open", e: "open" },
  ];
  // Counted from the final version of each module document
  D.modules = [
    ["Vehicle Management", 19], ["Driver Management & Assignment", 12], ["Maintenance & Repair Centers", 14],
    ["Movements & Fuel", 7], ["Notifications", 15], ["Roles & Permissions", 19],
  ];
  D.storyTotal = 86;
})(window.VMS_DATA = window.VMS_DATA || {});
