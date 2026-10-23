/* CHAPTER 4 · power/interest → engagement strategies → simple RACI */
VMS.scene("ch4", ({ tl, q, qa, at }) => {
  tl.from(qa(".quad"), { opacity: 0, scale: 0.96, stagger: 0.08, duration: 0.45 }, at(0) + 0.1);
  tl.from(qa(".chip"), { opacity: 0, y: 8, stagger: 0.02, duration: 0.35 }, at(0) + 0.3);
  tl.from([q(".c4-yaxis"), q(".c4-xaxis"), q(".c4-count")], { opacity: 0, duration: 0.4 }, at(0) + 0.5);
  // beat 2: engagement strategies, Manage Closely emphasised
  const others = qa(".quad:not(.q-man)");
  tl.from(qa(".strat"), { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, at(1) + 0.05);
  tl.to(others, { opacity: 0.5, duration: 0.35 }, at(1) + 0.1);
  tl.fromTo(q(".q-man"), { scale: 1 }, { scale: 1.03, duration: 0.4, transformOrigin: "0% 100%" }, at(1) + 0.1);
  // beat 3: who decides
  tl.to(others, { opacity: 1, duration: 0.3 }, at(2));
  tl.to(q(".q-man"), { scale: 1, duration: 0.3 }, at(2));
  tl.from(q(".c4-raci"), { opacity: 0, x: 30, duration: 0.45 }, at(2));
  tl.from(qa(".raci tbody tr"), { opacity: 0, stagger: 0.03, duration: 0.3 }, at(2) + 0.1);
  tl.from(qa(".rc-a, .rc-ra"), { scale: 0.55, opacity: 0.25, stagger: 0.035, duration: 0.25 }, at(2) + 0.35);
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.3 }, at(2) + 0.62);
});
VMS.scene("ch4p", ({ tl, q, qa, at }) => {
  // one beat: label → the two personas (header, quote, then behaviour / goals / pains) → hand-off to features
  tl.from(q(".ps-tag"), { opacity: 0, duration: 0.2 }, at(0) + 0.08);
  qa(".ps").forEach((p, i) => {
    tl.from(p, { opacity: 0, x: i ? 30 : -30, duration: 0.3 }, at(0) + 0.12 + i * 0.1);
    tl.from(p.querySelectorAll(".ps-q, .ps-sec"), { opacity: 0, y: 10, stagger: 0.06, duration: 0.18 }, at(0) + 0.35 + i * 0.1);
  });
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.2 }, at(0) + 0.75);
});

