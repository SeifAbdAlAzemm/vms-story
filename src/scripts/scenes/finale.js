/* FINALE · every artifact converges into VMS ; the team converges ; closing frame */
VMS.scene("finale-a", ({ tl, q, qa, at, draw }) => {
  tl.from(q(".f-core"), { opacity: 0, scale: 0.6, duration: 0.5 }, at(0) + 0.05);
  tl.from(q(".f-orbit"), { opacity: 0, duration: 0.5 }, at(0));
  tl.from(qa(".f-chip"), {
    x: (i, el) => (parseFloat(el.style.left) - 800) * 0.55,
    y: (i, el) => (parseFloat(el.style.top) - 330) * 0.9,
    opacity: 0, stagger: 0.03, duration: 0.5, ease: "power2.inOut",
  }, at(0) + 0.1);
  draw(qa(".f-lines path"), at(0) + 0.45, { duration: 0.3, stagger: 0.018 });
  // beat 2: the two stories meet
  tl.from(qa(".f-bg"), { opacity: 0, x: (i) => (i - 2) * 160, stagger: 0.06, duration: 0.5 }, at(1) + 0.05);
  tl.from(q(".f-merge"), { opacity: 0, y: 12, duration: 0.4 }, at(1) + 0.5);
});
VMS.scene("finale-n", ({ tl, q, qa, at }) => {
  // one beat: title (header entry) → progression → the three decision anchors
  tl.from(qa(".nd-steps li"), { opacity: 0, y: 14, stagger: 0.08, duration: 0.25 }, at(0) + 0.25);
  tl.from(qa(".nd-anchors li"), { opacity: 0, y: 18, stagger: 0.08, duration: 0.3 }, at(0) + 0.5);
});
VMS.scene("finale-b", ({ tl, q, at }) => {
  tl.from(q(".fb-from"), { opacity: 0, x: -30, duration: 0.5 }, at(0) + 0.05);
  tl.from(q(".fb-arrow"), { opacity: 0, duration: 0.4 }, at(0) + 0.2);
  tl.from(q(".fb-to"), { opacity: 0, x: 30, duration: 0.5 }, at(0) + 0.25);
  tl.from(q(".fb-brand"), { opacity: 0, duration: 0.35 }, at(0) + 0.45);
  tl.from(q(".fb-statement"), { opacity: 0, y: 16, duration: 0.4 }, at(0) + 0.55);
  tl.from(q(".fb-support"), { opacity: 0, duration: 0.3 }, at(0) + 0.7);
  tl.from(q(".fb-thanks"), { opacity: 0, duration: 0.25 }, at(0) + 0.75);
});
