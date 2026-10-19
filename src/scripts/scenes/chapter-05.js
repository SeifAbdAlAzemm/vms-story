/* CHAPTER 5 · pains → features ; 67 features → MoSCoW → now vs not now */
VMS.scene("ch5a", ({ tl, q, qa, at, draw }) => {
  tl.from(q(".c5-cols"), { opacity: 0, duration: 0.35 }, at(0) + 0.05);
  tl.from(qa(".pain"), { opacity: 0, x: -24, stagger: 0.08, duration: 0.45 }, at(0) + 0.1);
  // beat 2: features
  draw(qa(".pr-arrow path:first-child"), at(1), { duration: 0.35, stagger: 0.06 });
  tl.from(qa(".pr-head"), { opacity: 0, stagger: 0.06, duration: 0.2 }, at(1) + 0.25);
  tl.from(qa(".feat"), { opacity: 0, x: 24, stagger: 0.05, duration: 0.4 }, at(1) + 0.15);
  tl.from(q(".src-foot"), { opacity: 0, duration: 0.3 }, at(1) + 0.5);
});
VMS.scene("ch5b", ({ tl, q, qa, at, count }) => {
  count(q(".c5-big span"), 67, at(0) + 0.05, 0.6);
  tl.from(q(".c5-big"), { opacity: 0, y: 20, duration: 0.4 }, at(0) + 0.05);
  tl.from(q(".c5-cap"), { opacity: 0, duration: 0.3 }, at(0) + 0.2);
  tl.from(qa(".c5-groups li"), { opacity: 0, stagger: 0.025, duration: 0.3 }, at(0) + 0.25);
  tl.from(qa(".gb i"), { scaleX: 0, stagger: 0.025, duration: 0.35 }, at(0) + 0.25);
  // beat 2: MoSCoW + now vs not now
  tl.from(q(".mc-head"), { opacity: 0, duration: 0.3 }, at(1));
  tl.from(qa(".mc-col i"), { scaleY: 0, stagger: 0.06, duration: 0.45 }, at(1) + 0.05);
  tl.from(qa(".mc-v"), { opacity: 0, duration: 0.2, stagger: 0.06 }, at(1) + 0.05);
  qa(".mc-v").forEach((el, i) => count(el, +el.dataset.count, at(1) + 0.05 + i * 0.06, 0.45));
  tl.from([...qa(".mc-l"), q(".mc-div")], { opacity: 0, duration: 0.3 }, at(1) + 0.1);
  tl.from(q(".pp-head"), { opacity: 0, duration: 0.3 }, at(1) + 0.3);
  tl.from(qa(".pp"), { opacity: 0, y: 16, stagger: 0.08, duration: 0.35 }, at(1) + 0.35);
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.3 }, at(1) + 0.62);
});
