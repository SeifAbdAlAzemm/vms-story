/* scene ch3, now in CHAPTER 6 (after verification & validation) · boundary → exclusions (no data migration ← kick-off) */
VMS.scene("ch3", ({ tl, q, qa, at }) => {
  tl.from(q(".c3-boundary"), { opacity: 0, scale: 0.97, duration: 0.5 }, at(0) + 0.05);
  tl.from(qa(".c3-groups .cap"), { opacity: 0, y: 14, stagger: 0.04, duration: 0.35 }, at(0) + 0.2);
  tl.from(q(".c3-base"), { opacity: 0, duration: 0.3 }, at(0) + 0.6);
  // beat 2: what stays outside
  tl.from(q(".c3-out h3"), { opacity: 0, x: 20, duration: 0.4 }, at(1));
  tl.from(qa(".c3-ex li"), { opacity: 0, x: 24, stagger: 0.07, duration: 0.4 }, at(1) + 0.1);
  tl.from(q(".c3-nomig"), { opacity: 0, scale: 0.95, duration: 0.4 }, at(1) + 0.45);
  tl.from([q(".c3-out .src"), q(".unlocks")], { opacity: 0, duration: 0.3 }, at(1) + 0.62);
});
