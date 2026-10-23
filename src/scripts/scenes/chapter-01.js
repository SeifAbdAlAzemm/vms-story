/* CHAPTER 1 · operational questions at scale → domain map → research vs elicitation → kick-off findings */
VMS.scene("ch1", ({ tl, q, qa, at, draw }) => {
  tl.from(q(".bg-fleet"), { opacity: 0, duration: 0.8 }, at(0));
  // beat 1: operational questions at real scale — lead (~550 context), Vehicle X + five questions, then the framing line.
  // The chapter canvas (head + ~550 block) stays hidden until Domain orientation; the static fallback shows it as before.
  const base = [q(".head"), q(".c1-scale")];
  tl.from(q(".c1-ask"), { autoAlpha: 0, duration: 0.2 }, at(0) + 0.05);
  tl.from(q(".c1-ask-lead"), { opacity: 0, y: 12, duration: 0.3 }, at(0) + 0.08);
  tl.from(q(".c1-vx"), { opacity: 0, scale: 0.92, transformOrigin: "50% 50%", duration: 0.3 }, at(0) + 0.28);
  tl.from(q(".c1-ask-links"), { opacity: 0, duration: 0.3 }, at(0) + 0.38);   // dashed links keep their dashes (no stroke draw)
  tl.from(qa(".c1-q"), { opacity: 0, y: 10, stagger: 0.06, duration: 0.25 }, at(0) + 0.4);
  tl.from(q(".c1-ask-close"), { opacity: 0, y: 12, duration: 0.22 }, at(0) + 0.76);
  // leaving it: the layer clears and the chapter canvas arrives as the domain map builds
  tl.to(q(".c1-ask"), { autoAlpha: 0, duration: 0.25 }, at(1));
  tl.fromTo(base, { opacity: 0 }, { opacity: 1, duration: 0.35 }, at(1) + 0.05);
  // beat 2: domain orientation
  tl.from(q(".dm-core"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%", duration: 0.35 }, at(1));
  tl.from(qa(".dm-core-t"), { opacity: 0, duration: 0.3 }, at(1) + 0.1);
  draw(qa(".dm-link"), at(1) + 0.15, { duration: 0.4, stagger: 0.04 });
  tl.from(qa(".dm-node"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%", stagger: 0.06, duration: 0.35 }, at(1) + 0.3);
  tl.from(q(".c1-domain .tag"), { opacity: 0, duration: 0.3 }, at(1) + 0.6);
  // beat 3: research vs elicitation
  tl.to(q(".bg-fleet"), { opacity: 0.18, duration: 0.5 }, at(2));
  tl.from(q(".c1-divider"), { scaleY: 0, transformOrigin: "50% 0%", duration: 0.5 }, at(2));
  tl.from(q(".c1-domain .c1-colhead"), { opacity: 0, y: 14, duration: 0.4 }, at(2) + 0.1);
  tl.from(q(".c1-elic .c1-colhead"), { opacity: 0, x: 30, duration: 0.45 }, at(2) + 0.25);
  // beat 4: kick-off findings, golden thread begins
  tl.from(qa(".kf"), { opacity: 0, y: 16, stagger: 0.05, duration: 0.4 }, at(3));
  tl.from(q(".kf-thread"), { opacity: 0, scale: 0.96, duration: 0.45 }, at(3) + 0.38);
  tl.from(q(".c1-open"), { opacity: 0, duration: 0.25 }, at(3) + 0.42);
  tl.from(qa(".topic"), { opacity: 0, y: 8, stagger: 0.03, duration: 0.25 }, at(3) + 0.48);
  tl.from([q(".unlocks"), q(".src-foot")], { opacity: 0, duration: 0.3 }, at(3) + 0.62);
});
