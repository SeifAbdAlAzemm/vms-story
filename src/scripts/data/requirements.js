/* Beat 27 · User Stories & Exception Handling, shown through US-01 Add Vehicle.
   SRC: Module 01 Vehicle Management V.02, US-01 (story, required fields, criteria, duplicate / required-field / permission behaviour).
   TEAM: exception rows 3–4 (double Save, network failure) from the team's exception-handling example (Seif, 24 Oct 2026),
   not stated in US-01's own text. Wording condensed for the screen; meaning kept. */
(function (D) {
  D.usExample = {
    id: "US-01", name: "Add Vehicle", trace: "Trace: F-01 · BR-001 · BRL-13 · NFR-SEC-02",
    as: "Fleet Director",
    want: "to add a new vehicle with its master data",
    so: "every vehicle in the fleet is held in one central record",
    defined: ["Required inputs and data types", "Acceptance criteria", "Business rules and validation", "Exception and error-handling scenarios"],
    criteria: [
      { g: "I have Create permission", w: "I open Add Vehicle", t: "the form shows the required fields: Plate Number, VIN/Chassis, Model, Type, Brand" },
      { g: "all required fields are valid", w: "I click Save", t: "the vehicle is created as Active/Available with its Vehicle ID" },
      { g: "the Plate Number already exists", w: "I click Save", t: "a duplicate error appears and no record is created" },
      { g: "a required field is empty or invalid", w: "I click Save", t: "validation feedback is shown and no record is created" },
    ],
    exceptions: [
      { s: "Duplicate Plate Number or VIN/Chassis Number", b: "Inline duplicate error; no record is created" },
      { s: "Required field empty or only spaces", b: "Field highlighted, “This field is required”, entered data kept" },
      { s: "Save clicked twice rapidly", b: "Only one vehicle record is created", team: true },
      { s: "Network fails during Save", b: "“Connection error, please try again”; no partial record, retry allowed", team: true },
      { s: "User lacks Create permission", b: "Access denied and the attempt is logged" },
    ],
  };
})(window.VMS_DATA = window.VMS_DATA || {});
