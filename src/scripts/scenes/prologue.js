/* PROLOGUE · backgrounds arrive (intro), then converge (beat 2) */
VMS.scene("prologue", ({ sc, tl, q, qa, reduce }) => {
  const labels = qa(".p-label"), inner = qa(".p-in");
  // scattered start positions (canvas px, centre points) — different directions
  const spots = [[250, 300], [1350, 300], [300, 690], [1320, 700], [800, 800]];
  const row = q(".p-labels");
  inner.forEach((el, i) => {
    const w = labels[i];
    const cx = w.offsetLeft + w.offsetWidth / 2, cy = row.offsetTop + w.offsetHeight / 2;
    el._dx = spots[i][0] - cx; el._dy = spots[i][1] - cy;
  });
  // intro (time-based, on load): kicker, question and labels appear at their scattered spots
  VMS.intro = gsap.timeline({ paused: true })
    .from([q(".p-kicker"), q(".p-q"), q(".p-sub")], { opacity: 0, y: 24, stagger: 0.15, duration: 0.7, ease: "power2.out" })
    .from(labels, { opacity: 0, scale: 0.85, stagger: 0.12, duration: 0.6, ease: "power2.out" }, 0.5);
  // beat 2: converge
  tl.from(inner, { x: (i, el) => el._dx, y: (i, el) => el._dy, duration: 0.55, stagger: 0.03, ease: "power2.inOut" }, 0);
  tl.from(q(".p-one"), { opacity: 0, y: 26, scale: 0.94, duration: 0.45 }, 0.35);
  tl.from(q(".p-mind"), { opacity: 0, y: 16, duration: 0.4 }, 0.45);
  tl.from(q(".p-journey"), { opacity: 0, duration: 0.3 }, 0.5);
  tl.from(qa(".p-ticks i"), { scale: 0, stagger: 0.015, duration: 0.22 }, 0.52);
  tl.from(q(".p-line"), { opacity: 0, y: 14, duration: 0.3 }, 0.62);
  tl.from(q(".unlocks"), { opacity: 0, x: -14, duration: 0.3 }, 0.68);
});
