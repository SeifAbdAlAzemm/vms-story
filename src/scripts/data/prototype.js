/* =====================================================================
   PROTOTYPE — the only place prototype images are configured.
   SRC: final team-created prototype exports (supplied 19 Oct 2026).

   Files live in src/assets/prototype/ as prototype_01.png … prototype_05.png.
   Only the outer design-review bar was cropped (originals in
   src/assets/prototype/original/). The application UI is untouched.

   To replace a screen: overwrite the file with the same name, run  npm run build.
   A missing file shows a neutral placeholder frame. Nothing else changes.

   The screens carry sample records, names and counts. They are shown as
   ILLUSTRATIVE DATA — never as business baselines or production figures.
   ===================================================================== */
(function (D) {
  D.prototype = {
    label: "Team-created prototype · illustrative data",
    hero: {
      enabled: true, filename: "prototype_03.png", title: "License Register",
      alt: "Team-created prototype, Arabic interface: the License Register screen with license summary cards, status filters and a license table showing near-expiry and under-renewal states. Illustrative data.",
      // Quiet outline on the license-status column (fractions of the image).
      // Links the screen to US-16 without writing over the Arabic UI.
      callout: { left: 0.430, top: 0.701, width: 0.095, height: 0.296 },
    },
    support: [
      { enabled: true, filename: "prototype_04.png", title: "Movement Dashboard",
        alt: "Team-created prototype, Arabic interface: the Movement Dashboard with movement summary cards and a list of overdue movements. Illustrative data." },
      { enabled: true, filename: "prototype_01.png", title: "Maintenance Dashboard",
        alt: "Team-created prototype, Arabic interface: the Maintenance Dashboard with preventive-maintenance and maintenance-order summary cards. Illustrative data." },
    ],
    // Kept in the source folder for Q&A. Not shown and not bundled.
    reserve: [
      { filename: "prototype_02.png", title: "Movement / Trip Log" },
      { filename: "prototype_05.png", title: "Drivers" },
    ],
    // The golden thread, end to end, with the phase each step belongs to
    thread: [
      { phase: "Requirements", id: "Kick-off finding", t: "Expired licenses found late" },
      { phase: "Requirements", id: "Requirement", t: "BR-033 · BRL-04" },
      { phase: "Requirements", id: "BPMN", t: "To-Be license flow" },
      { phase: "Backlog", id: "User story", t: "US-16" },
      { phase: "Backlog", id: "Jira", t: "VMS-16" },
      { phase: "Design", id: "Prototype", t: "License Register", end: true },
    ],
    designSteps: ["Analysis", "Review", "Wireframes", "Prototype"],
  };
  D.prototypePlaceholder = { line1: "Team-created prototype", line2: "image missing — run npm run build" };
})(window.VMS_DATA = window.VMS_DATA || {});
