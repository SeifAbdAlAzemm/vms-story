/* SRC: two real Jira screenshots supplied by the team (cropped only, never edited).
   Only facts visible in the screenshots are stated. No total story count is claimed. */
(function (D) {
  D.jira = {
    epics: {
      file: "jira/jira-epics.png",
      alt: "Jira list view of the VMS project showing seven epics, each with a reporter and status To Do",
      facts: ["7 epics: six modules + BRD & Other documents", "A different reporter on each epic", "All visible items: To Do — prepared for delivery"],
    },
    backlog: {
      file: "jira/jira-backlog.png",
      alt: "Jira backlog rows VMS-16 to VMS-23 with story titles, epic labels and status To Do",
      highlight: { key: "VMS-16", text: "As a Fleet Director, I want the system to calculate each license's status and warn me 30, 15 and 7 …", epic: "Vehicle Management", status: "To Do", top: 0.0, height: 0.128 },
      visible: "Visible in this crop: VMS-16 – VMS-23",
      equals: "Same story text as US-16",
    },
  };
})(window.VMS_DATA = window.VMS_DATA || {});
