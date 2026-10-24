/* CHAPTER 6E (05 · The baseline) · how the BRD evolved: individual drafts → v1.0 → v2.0 → v3.0, then the takeaway */
VMS.scene("ch6e", ({ tl, q, qa, at }) => {
  const st = qa(".ev-st"), ar = qa(".ev-arrow");
  st.forEach((el, i) => {
    tl.from(el, { opacity: 0, y: 16, duration: 0.18 }, at(0) + 0.12 + i * 0.13);
    if (ar[i]) tl.from(ar[i], { opacity: 0, x: -8, duration: 0.1 }, at(0) + 0.22 + i * 0.13);
  });
  tl.from(q(".ev-take"), { opacity: 0, y: 12, duration: 0.2 }, at(0) + 0.66);
  tl.from([q(".src-foot"), q(".unlocks")], { opacity: 0, duration: 0.15 }, at(0) + 0.8);
});
