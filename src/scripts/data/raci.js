/* SRC: "VMS — Simple RACI (key decisions only, one A per row)", embedded in the
   Stakeholder Analysis (A05). Transcribed cell by cell and proofed against the image.
   "" = no involvement. R/A shown as R/A. */
(function (D) {
  D.raciRoles = ["Head", "Fleet Dir.", "Ops Dir.", "Finance", "IT", "Maint. Coord.", "Committee", "Audit"];
  D.raciRows = [
    ["Scope freeze (Must / Won't)", ["I", "R/A", "C", "C", "C", "I", "", ""]],
    ["Budget release", ["I", "C", "I", "R/A", "", "I", "", "I"]],
    ["Vehicle allocation rules", ["A", "R", "C", "I", "", "I", "", ""]],
    ["Go-live approval", ["A", "R", "C", "I", "C", "I", "", ""]],
    ["Roles and access model", ["I", "A", "I", "", "R", "", "", ""]],
    ["Reports sign-off", ["I", "R/A", "C", "I", "C", "", "", ""]],
    ["External repair over limit", ["", "C", "", "A", "", "R", "", "I"]],
    ["Decommission decision", ["", "C", "", "C", "", "R", "A", "I"]],
    ["Loan approval", ["I", "R/A", "C", "I", "", "", "", ""]],
    ["Audit fixes", ["I", "A", "", "I", "", "R", "", "C"]],
  ];
  D.raciFull = { activities: 63, modules: 12, roles: 13, note: "Full RACI workbook: 63 activities, exactly one Accountable each" };
})(window.VMS_DATA = window.VMS_DATA || {});
