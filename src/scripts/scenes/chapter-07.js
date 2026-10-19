/* CHAPTER 7 · As-Is (late-discovery path) → system lane → To-Be */
VMS.scene("ch7", ({ tl, q, qa, at }) => {
  const asis = q(".asis");
  tl.from(q(".asis .pool"), { opacity: 0, duration: 0.3 }, at(0));
  tl.from(qa(".asis .pool-h, .asis .pool-t, .asis .lane-sep, .asis .lane-t"), { opacity: 0, duration: 0.3 }, at(0) + 0.05);
  const seq = qa(".asis > .bp-n, .asis > .flow, .asis > .yes, .nopath > *");
  tl.from(seq, { opacity: 0, stagger: 0.035, duration: 0.25 }, at(0) + 0.1);
  tl.from(q(".c7-callout"), { opacity: 0, x: 20, duration: 0.3 }, at(0) + 0.68);
  // beat 2: the system lane enters
  tl.to(asis, { opacity: 0.45, duration: 0.35 }, at(1));
  tl.from(qa(".tobe .pool, .tobe .pool-h, .tobe .pool-t, .tobe > .lane-sep, .tobe > .lane-t"), { opacity: 0, y: 20, duration: 0.4 }, at(1));
  tl.from(q(".sys-lane"), { opacity: 0, x: -60, duration: 0.45 }, at(1) + 0.25);
  // beat 3: To-Be flow, then both states side by side
  const tobe = qa(".tobe > .bp-n, .tobe > .flow, .tobe > .yes, .tobe > .no");
  tl.from(tobe, { opacity: 0, stagger: 0.03, duration: 0.25 }, at(2));
  tl.to(asis, { opacity: 1, duration: 0.3 }, at(2) + 0.62);
  tl.from(q(".c7-also"), { opacity: 0, y: 14, duration: 0.35 }, at(2) + 0.5);
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.3 }, at(2) + 0.6);
});
