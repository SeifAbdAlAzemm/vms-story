/* OPENING · what is VMS? One beat, time-based on load (VMS.intro):
   vehicle drives in from the right → title → definition → six lifecycle areas. No scroll choreography. */
VMS.scene("opening", ({ q, qa }) => {
  VMS.intro = gsap.timeline({ paused: true })
    .from(q(".o-car-move"), { x: 760, duration: 1.15, ease: "power3.out" }, 0)
    .from(qa(".o-rim"), { rotation: 760, transformOrigin: "50% 50%", duration: 1.15, ease: "power3.out" }, 0)
    .fromTo(q(".o-speed"), { opacity: 0.55 }, { opacity: 0, duration: 0.5, ease: "power1.in" }, 0.6)
    .from([q(".o-kicker"), ...qa(".o-title span")], { opacity: 0, y: 26, stagger: 0.1, duration: 0.6, ease: "power2.out" }, 0.45)
    .from(q(".o-rule"), { scaleX: 0, transformOrigin: "0 50%", duration: 0.45, ease: "power2.out" }, 0.95)
    .from(q(".o-def"), { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, 1.0)
    .from(qa(".o-area"), { opacity: 0, y: 14, stagger: 0.06, duration: 0.4, ease: "power2.out" }, 1.3)
    .from([q(".o-src"), q(".unlocks")], { opacity: 0, duration: 0.4 }, 1.75);
});
