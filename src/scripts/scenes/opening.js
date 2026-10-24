/* COVER · the supplied intro slide, time-based on load (VMS.coverIntro): a slow fade-and-settle.
   HOOK · the supplied hook slide, fades in with the scroll.
   OPENING · what is VMS? One beat, time-based (VMS.intro), played when the presenter arrives from the hook:
   vehicle drives in from the right → title → definition → six lifecycle areas. No scroll choreography. */
VMS.scene("cover", ({ q }) => {
  VMS.coverIntro = gsap.timeline({ paused: true })
    .from(q(".hero-img"), { opacity: 0, scale: 1.035, transformOrigin: "50% 50%", duration: 1.6, ease: "power2.out" }, 0);
});
VMS.scene("hook", ({ tl, q, at }) => {
  tl.from(q(".hero-img"), { opacity: 0, scale: 1.03, transformOrigin: "50% 50%", duration: 0.6 }, at(0) + 0.1);
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
  // plays when the presenter arrives from the hook; a jump past it completes it; going back resets it
  const arrive = () => {
    const t = sc.getBoundingClientRect().top;
    if (t > 0.42 * innerHeight) return;
    if (t > -0.5 * innerHeight) intro.restart(); else intro.progress(1);
  };
  if (reduce) intro.progress(1);
  else ScrollTrigger.create({ trigger: sc, start: "top bottom", end: "top 40%", onEnter: arrive, onLeave: arrive, onLeaveBack: () => intro.pause(0) });
});
