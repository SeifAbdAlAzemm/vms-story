/* CHAPTER 1 · operational questions at scale → problem in numbers → domain map → research vs elicitation → one operational moment → kick-off findings */
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
  // beat 2: the problem in numbers — external industry / market context (not the organization's data).
  // Reveal order: 79% → 63% → 17.7% → $448–$760/day → Egypt context → closing statement.
  tl.to(q(".c1-ask"), { autoAlpha: 0, duration: 0.25 }, at(1));
  tl.from(q(".c1-pin"), { autoAlpha: 0, duration: 0.15 }, at(1) + 0.1);
  tl.from(q(".c1-pin-head"), { opacity: 0, y: 12, duration: 0.25 }, at(1) + 0.12);
  tl.from(q(".c1-pin-ops .eyebrow"), { opacity: 0, duration: 0.2 }, at(1) + 0.2);
  tl.from(qa(".c1-stat"), { opacity: 0, y: 14, stagger: 0.1, duration: 0.2 }, at(1) + 0.22);
  tl.from(q(".c1-pin-fin"), { opacity: 0, x: -24, duration: 0.25 }, at(1) + 0.52);
  tl.from(q(".c1-pin-eg"), { opacity: 0, y: 14, duration: 0.22 }, at(1) + 0.66);
  tl.from([q(".c1-pin-close"), q(".c1-pin-note")], { opacity: 0, y: 10, duration: 0.18 }, at(1) + 0.8);
  // leaving it: the layer clears and the chapter canvas arrives as the domain map builds
  tl.to(q(".c1-pin"), { autoAlpha: 0, duration: 0.25 }, at(2));
  tl.fromTo(base, { opacity: 0 }, { opacity: 1, duration: 0.35 }, at(2) + 0.05);
  // beat 3: domain orientation
  tl.from(q(".dm-core"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%", duration: 0.35 }, at(2));
  tl.from(qa(".dm-core-t"), { opacity: 0, duration: 0.3 }, at(2) + 0.1);
  draw(qa(".dm-link"), at(2) + 0.15, { duration: 0.4, stagger: 0.04 });
  tl.from(qa(".dm-node"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%", stagger: 0.06, duration: 0.35 }, at(2) + 0.3);
  tl.from(q(".c1-domain .tag"), { opacity: 0, duration: 0.3 }, at(2) + 0.6);
  // beat 4: research vs elicitation
  tl.to(q(".bg-fleet"), { opacity: 0.18, duration: 0.5 }, at(3));
  tl.from(q(".c1-divider"), { scaleY: 0, transformOrigin: "50% 0%", duration: 0.5 }, at(3));
  tl.from(q(".c1-domain .c1-colhead"), { opacity: 0, y: 14, duration: 0.4 }, at(3) + 0.1);
  tl.from(q(".c1-elic .c1-colhead"), { opacity: 0, x: 30, duration: 0.45 }, at(3) + 0.25);
  // beat 5: one operational moment — mission request → select vehicle → manual license check → EXPIRED → closing line.
  // Reconstruction of the documented pattern; no count (the 6 vehicles stay on the next beat). The research/elicitation
  // canvas steps aside for this beat and returns for the kick-off findings.
  const canvas = [q(".head"), q(".c1-scale"), q(".c1-domain"), q(".c1-divider"), q(".c1-elic")];
  tl.to(canvas, { opacity: 0, duration: 0.2 }, at(4));
  tl.from(q(".c1-moment"), { autoAlpha: 0, duration: 0.12 }, at(4) + 0.1);
  tl.from(q(".c1-mo-head"), { opacity: 0, y: 12, duration: 0.2 }, at(4) + 0.12);
  const steps = qa(".c1-mo-step"), arrows = qa(".c1-mo-arrow");
  steps.forEach((el, i) => {
    tl.from(el, { opacity: 0, y: 14, duration: 0.14 }, at(4) + 0.22 + i * 0.12);
    if (arrows[i]) tl.from(arrows[i], { opacity: 0, x: -8, duration: 0.08 }, at(4) + 0.3 + i * 0.12);
  });
  tl.from(q(".c1-mo-stamp"), { opacity: 0, scale: 1.25, transformOrigin: "0% 50%", duration: 0.1 }, at(4) + 0.64);
  tl.from(q(".c1-mo-line"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.14 }, at(4) + 0.7);
  tl.from([q(".c1-mo-was"), q(".c1-mo-dot"), q(".c1-mo-here")], { opacity: 0, duration: 0.1 }, at(4) + 0.76);
  tl.from(q(".c1-mo-close"), { opacity: 0, y: 10, duration: 0.14 }, at(4) + 0.84);
  // beat 6: kick-off findings, golden thread begins (the canvas returns; the moment clears)
  tl.to(q(".c1-moment"), { autoAlpha: 0, duration: 0.25 }, at(5));
  tl.to(canvas, { opacity: 1, duration: 0.3 }, at(5) + 0.05);
  tl.from(qa(".kf"), { opacity: 0, y: 16, stagger: 0.05, duration: 0.4 }, at(5));
  tl.from(q(".kf-thread"), { opacity: 0, scale: 0.96, duration: 0.45 }, at(5) + 0.38);
  tl.from(q(".c1-open"), { opacity: 0, duration: 0.25 }, at(5) + 0.42);
  tl.from(qa(".topic"), { opacity: 0, y: 8, stagger: 0.03, duration: 0.25 }, at(5) + 0.48);
  tl.from([q(".unlocks"), q(".src-foot")], { opacity: 0, duration: 0.3 }, at(5) + 0.62);
});
