/* SRC: Consolidated Feature List (A04), F-01 – F-67. Counts computed from the table. */
(function (D) {
  D.painToFeature = [
    { thread: true, pain: "Expired licenses found too late", src: "Kick-off · BRD §4.2", f: [["F-13", "Vehicle License / Document Tracking"], ["F-42", "Vehicle License Expiry Notifications"]] },
    { pain: "Late returns noticed late", src: "BRD §4.2 · §8.1", f: [["F-32", "Trip / Movement Status Tracking"], ["F-45", "Overdue/Expiry Return Notifications"]] },
    { pain: "No fuel traceability", src: "Kick-off · BRD §4.2", f: [["F-37", "Record Fuel Transaction"], ["F-38", "Fuel Transaction Traceability & Analysis"]] },
    { pain: "Maintenance tracked by hand", src: "Kick-off · BRD §8.1", f: [["F-22", "Create & Classify Maintenance Record"], ["F-23", "Preventive Maintenance Scheduling & Due Reminders"]] },
  ];
  D.featureTotal = 67;
  D.featureGroups = [
    ["Vehicle Management", 14], ["Movements / Trips", 8], ["Notifications", 7], ["Driver Management", 5], ["Fuel", 5],
    ["Maintenance", 4], ["Roles & Permissions", 4], ["Repair Centers", 3], ["Reports & Dashboard", 3],
    ["Vehicle Assignment", 2], ["Platform decisions", 2], ["Future enhancements", 10],
  ];
  // MoSCoW (Must/Should/Could/Won't) + features with no priority yet ("In Discussion")
  D.moscow = [
    { k: "must", label: "Must", v: 33 },
    { k: "should", label: "Should", v: 3 },
    { k: "could", label: "Could", v: 13 },
    { k: "wont", label: "Won't", v: 13 },
  ];
  D.notPrioritized = { label: "Not yet prioritized", sub: "In Discussion", v: 5, ids: "F-47 · F-49 – F-52" };
  D.nowVsLater = [
    { now: ["F-29", "Create Trip / Movement Request", "Must"], later: ["F-36", "GPS Tracking, Route Tracking & Geofencing", "Won't"] },
    { now: ["F-37", "Record Fuel Transaction", "Must"], later: ["F-41", "Fuel Request & Approval Flow", "Won't"] },
    { now: ["F-53", "Integrated Fleet Dashboard", "Must"], later: ["F-63", "Advanced Analytics Dashboard", "Could · future"] },
  ];
})(window.VMS_DATA = window.VMS_DATA || {});
