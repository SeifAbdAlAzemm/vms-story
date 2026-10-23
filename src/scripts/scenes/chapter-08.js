/* CHAPTER 8 · story + Given/When/Then ; Jira evidence ; prototype reveal */
VMS.scene("ch8a", ({ tl, q, qa, at }) => {
  // one beat: the US-16 story card, then three channel-independent criteria in Given / When / Then
  tl.from(q(".st-card"), { opacity: 0, y: 20, duration: 0.4 }, at(0) + 0.1);
  qa(".ac").forEach((ac, i) => {
    tl.from(ac, { opacity: 0, duration: 0.2 }, at(0) + 0.35 + i * 0.15);
    tl.from(ac.querySelectorAll(".gwt"), { opacity: 0, x: 14, stagger: 0.05, duration: 0.2 }, at(0) + 0.38 + i * 0.15);
  });
});
VMS.scene("ch8b", ({ tl, q, qa, at }) => {
  // one beat: epics, then backlog, then the golden thread lands on VMS-16
  tl.from(q(".jf-epics"), { opacity: 0, y: 30, duration: 0.4 }, at(0) + 0.05);
  tl.from(qa(".jf-epics li"), { opacity: 0, x: 12, stagger: 0.06, duration: 0.25 }, at(0) + 0.3);
  tl.from(q(".jf-backlog"), { opacity: 0, x: 40, duration: 0.4 }, at(0) + 0.3);
  tl.from(q(".jf-hl"), { opacity: 0, scale: 1.08, duration: 0.25 }, at(0) + 0.6);
  tl.from(q(".jf-row"), { opacity: 0, y: 10, duration: 0.25 }, at(0) + 0.65);
  tl.from(q(".jf-backlog .tag"), { opacity: 0, duration: 0.2 }, at(0) + 0.75);
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.2 }, at(0) + 0.78);
});
VMS.scene("ch8c", ({ tl, q, qa, at }) => {
  // requirements → backlog → design, then the hero screen, then the supporting screens
  tl.from(qa(".pt-phases li"), { opacity: 0, y: 8, stagger: 0.06, duration: 0.2 }, at(0) + 0.02);
  tl.from(qa(".pt-n"), { opacity: 0, y: 10, stagger: 0.04, duration: 0.2 }, at(0) + 0.08);
  tl.from(q(".pt-line i"), { scaleX: 0, duration: 0.3, ease: "none" }, at(0) + 0.1);
  tl.from(q(".pr-hero .pr-frame"), { opacity: 0, y: 24, duration: 0.35 }, at(0) + 0.35);
  tl.from(q(".pr-hero figcaption"), { opacity: 0, duration: 0.2 }, at(0) + 0.55);
  tl.from(q(".pr-label"), { opacity: 0, duration: 0.2 }, at(0) + 0.55);
  tl.from(qa(".pr-sup"), { opacity: 0, x: 24, stagger: 0.08, duration: 0.25 }, at(0) + 0.58);
  tl.from(q(".pr-track"), { opacity: 0, duration: 0.2 }, at(0) + 0.74);
  tl.from(q(".pr-callout"), { opacity: 0, duration: 0.2 }, at(0) + 0.72);
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.2 }, at(0) + 0.78);
});
