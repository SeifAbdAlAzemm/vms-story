/* CHAPTER 6 · verification / validation gate ; artifacts converge into the BRD */
VMS.scene("ch6a", ({ tl, q, qa, at }) => {
  tl.from(qa(".c6-stages li"), { opacity: 0, x: -14, stagger: 0.08, duration: 0.3 }, at(0) + 0.05);
  tl.from(q(".vv-ver"), { opacity: 0, x: -30, duration: 0.5 }, at(0) + 0.15);
  tl.from(q(".vv-door"), { opacity: 0, scale: 0.7, duration: 0.4 }, at(0) + 0.35);
  tl.from(q(".vv-val"), { opacity: 0, x: 30, duration: 0.5 }, at(0) + 0.4);
  tl.from(qa(".vv li"), { opacity: 0, y: 8, stagger: 0.03, duration: 0.3 }, at(0) + 0.45);
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
