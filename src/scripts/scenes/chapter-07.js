/* CHAPTER 7 (06 · How work flows) · Vehicle Assignment & Return: As-Is → a VMS lane is inserted → To-Be.
   Secondary: Vehicle Retirement As-Is, swapped for its To-Be on beat 3. */
VMS.scene("ch7", ({ tl, q, qa, at }) => {
  const svg = q(".c7-main"), ret = q(".c7-ret"), asis = q(".asis-n");
  // beat 1 · As-Is: two lanes, manual hand-over, the license blind spot (gold)
  tl.from(q(".m-frame-asis"), { opacity: 0, duration: 0.25 }, at(0));
  tl.from(q(".m-lanes"), { opacity: 0, duration: 0.25 }, at(0) + 0.05);
  tl.from(Array.from(asis.children), { opacity: 0, stagger: { amount: 0.4 }, duration: 0.2 }, at(0) + 0.1);
  tl.from(q(".c7-callout"), { opacity: 0, x: 20, duration: 0.25 }, at(0) + 0.66);
  tl.from(ret, { opacity: 0, duration: 0.25 }, at(0) + 0.6);
  // beat 2 · the VMS lane is inserted on top: diagram and retirement panel move down to make room
  tl.from([svg, ret], { y: -180, duration: 0.45, ease: "power2.inOut" }, at(1));
  tl.to(asis, { opacity: 0.22, duration: 0.3 }, at(1));
  tl.to(q(".c7-callout"), { opacity: 0, duration: 0.25 }, at(1));
  tl.to(q(".m-frame-asis"), { opacity: 0, duration: 0.3 }, at(1) + 0.1);
  tl.from(q(".m-frame-tobe"), { opacity: 0, duration: 0.3 }, at(1) + 0.1);
  tl.from(q(".sys-lane"), { opacity: 0, scaleY: 0, transformOrigin: "50% 0%", duration: 0.4 }, at(1) + 0.3);
  // beat 3 · To-Be flow; Vehicle Retirement switches to its To-Be
  tl.to(asis, { opacity: 0, duration: 0.2 }, at(2));
  tl.from(Array.from(q(".tobe-n").children), { opacity: 0, stagger: { amount: 0.5 }, duration: 0.2 }, at(2) + 0.1);
  tl.to([q(".ret-asis"), q(".ret-tag-asis")], { opacity: 0, duration: 0.2 }, at(2) + 0.45);
  tl.from([q(".ret-tobe"), q(".ret-tag-tobe")], { opacity: 0, duration: 0.25 }, at(2) + 0.55);
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.25 }, at(2) + 0.7);
});
