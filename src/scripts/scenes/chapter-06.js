/* CHAPTER 6 (05 · The baseline) · V&V worked example (F-04) ; artifacts converge into the BRD */
VMS.scene("ch6a", ({ tl, q, qa, at }) => {
  // one beat: the example → before (vague wording + issues) → after (refined wording + what became defined) → takeaway
  tl.from(q(".vx-ex"), { opacity: 0, y: 10, duration: 0.2 }, at(0) + 0.1);
  tl.from(q(".vx-before"), { opacity: 0, x: -24, duration: 0.25 }, at(0) + 0.16);
  tl.from(qa(".vx-issues li"), { opacity: 0, x: -10, stagger: 0.04, duration: 0.15 }, at(0) + 0.26);
  tl.from(q(".vx-arrow"), { opacity: 0, x: -10, duration: 0.15 }, at(0) + 0.46);
  tl.from(q(".vx-after"), { opacity: 0, x: 24, duration: 0.25 }, at(0) + 0.5);
  tl.from(qa(".vx-def li"), { opacity: 0, x: 10, stagger: 0.04, duration: 0.15 }, at(0) + 0.58);
  tl.from(qa(".vx-t"), { opacity: 0, y: 12, stagger: 0.06, duration: 0.18 }, at(0) + 0.74);
  tl.from(q(".src-foot"), { opacity: 0, duration: 0.15 }, at(0) + 0.8);
});
VMS.scene("ch6b", ({ tl, q, qa, at, draw }) => {
  const chips = qa(".hub-chip");
  // signature: inputs converge from far outside onto the BRD
  tl.from(q(".hub-core"), { opacity: 0, scale: 0.7, duration: 0.5 }, at(0));
  tl.from(chips, {
    x: (i, el) => (parseFloat(el.style.left) - 360) * 0.9,
    y: (i, el) => (parseFloat(el.style.top) - 360) * 0.9,
    opacity: 0, stagger: 0.04, duration: 0.55, ease: "power2.inOut",
  }, at(0) + 0.05);
  draw(qa(".hub-lines path"), at(0) + 0.4, { duration: 0.35, stagger: 0.03 });
  tl.from(qa(".c6-layers li"), { opacity: 0, x: -16, stagger: 0.03, duration: 0.3 }, at(0) + 0.45);
  tl.from(q(".hub-th"), { opacity: 0, scale: 0.8, duration: 0.25 }, at(0) + 0.7);
  // beat 2: measurable objectives
  tl.from(qa(".obj"), { opacity: 0, x: 30, stagger: 0.1, duration: 0.45 }, at(1));
  tl.from(q(".obj-note"), { opacity: 0, duration: 0.3 }, at(1) + 0.5);
  tl.from(q(".unlocks"), { opacity: 0, duration: 0.3 }, at(1) + 0.62);
});
