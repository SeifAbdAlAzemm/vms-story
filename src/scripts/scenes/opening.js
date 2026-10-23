/* COVER · time-based on load (VMS.coverIntro): kicker → statement → record fragments settle into order → proposal line.
   OPENING · what is VMS? One beat, time-based (VMS.intro), played when the presenter arrives from the cover:
   vehicle drives in from the right → title → definition → six lifecycle areas. No scroll choreography. */
VMS.scene("cover", ({ q, qa }) => {
  const recs = qa(".rec");
  VMS.coverIntro = gsap.timeline({ paused: true })
    .from(q(".cv-kicker"), { opacity: 0, y: 14, duration: 0.5, ease: "power2.out" }, 0)
    .from(recs, { opacity: 0, duration: 0.5, stagger: 0.03, ease: "power1.out" }, 0.1)
    .from(recs, { x: (i, el) => +el.dataset.dx, y: (i, el) => +el.dataset.dy, rotation: (i, el) => +el.dataset.rot, svgOrigin: "295 225",
      duration: 1.3, stagger: 0.04, ease: "power3.inOut" }, 0.9)
    .from(qa(".cv-title span"), { opacity: 0, y: 26, stagger: 0.22, duration: 0.6, ease: "power2.out" }, 0.3)
    .from(q(".cv-rule"), { scaleX: 0, transformOrigin: "0 50%", duration: 0.45, ease: "power2.out" }, 1.6)
    .from(q(".cv-sub"), { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, 1.8)
    .from(qa(".rec-hl rect, .rec-hl path"), { opacity: 0.3, duration: 0.5 }, 2.4);   // one record comes into focus
});
VMS.scene("opening", ({ sc, q, qa, reduce }) => {
  const intro = VMS.intro = gsap.timeline({ paused: true })
    .from(q(".o-car-move"), { x: 760, duration: 1.15, ease: "power3.out" }, 0)
    .from(qa(".o-rim"), { rotation: 760, transformOrigin: "50% 50%", duration: 1.15, ease: "power3.out" }, 0)
    .fromTo(q(".o-speed"), { opacity: 0.55 }, { opacity: 0, duration: 0.5, ease: "power1.in" }, 0.6)
    .from([q(".o-kicker"), ...qa(".o-title span")], { opacity: 0, y: 26, stagger: 0.1, duration: 0.6, ease: "power2.out" }, 0.45)
    .from(q(".o-rule"), { scaleX: 0, transformOrigin: "0 50%", duration: 0.45, ease: "power2.out" }, 0.95)
    .from(q(".o-def"), { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, 1.0)
    .from(qa(".o-area"), { opacity: 0, y: 14, stagger: 0.06, duration: 0.4, ease: "power2.out" }, 1.3)
    .from([q(".o-src"), q(".unlocks")], { opacity: 0, duration: 0.4 }, 1.75);
  // plays when the presenter arrives from the cover; a jump past it completes it; going back to the cover resets it
  const arrive = () => {
    const t = sc.getBoundingClientRect().top;
    if (t > 0.42 * innerHeight) return;
    if (t > -0.5 * innerHeight) intro.restart(); else intro.progress(1);
  };
  if (reduce) intro.progress(1);
  else ScrollTrigger.create({ trigger: sc, start: "top bottom", end: "top 40%", onEnter: arrive, onLeave: arrive, onLeaveBack: () => intro.pause(0) });
});
