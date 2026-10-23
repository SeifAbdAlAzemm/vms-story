/* SRC: BRD-VMS-003 v3.0 (BR-033, BRL-04), Module 01 Vehicle Management V.02 (US-16 story, trace, criteria). */
(function (D) {
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
})(window.VMS_DATA = window.VMS_DATA || {});
