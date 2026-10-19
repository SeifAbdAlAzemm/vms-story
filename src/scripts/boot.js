/* =====================================================================
   BOOT
   1. fit the canvas  2. try to build every scene timeline inside a
   gsap.context  3. only on success add html.anim  4. on any failure
   revert everything and keep the readable static story.
   ===================================================================== */
(function () {
  const V = window.VMS;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  V.warnings = [];
  V.layout();
  V.placeRail();
  V.scenes.forEach((sc) => sc.style.setProperty("--beats", sc.dataset.beats || 1));

  /* shared helpers handed to every scene builder */
  function helpers(sc, tl) {
    const intro = sc.dataset.entry === "intro";
    return {
      sc, tl, reduce,
      q: (s) => sc.querySelector(s),
      qa: (s) => Array.from(sc.querySelectorAll(s)),
      at: (k) => (intro ? k - 1 : k),          // timeline time where the move INTO beat k starts
      draw: (els, pos, opt = {}) => tl.fromTo(els, { strokeDasharray: 1, strokeDashoffset: 1 }, Object.assign({ strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" }, opt), pos),
      count: (el, to, pos, dur = 0.6) => { const o = { v: 0 }; tl.fromTo(o, { v: 0 }, { v: to, duration: dur, ease: "power1.out", onUpdate: () => { el.textContent = Math.round(o.v); } }, pos); },
    };
  }

  function buildScene(sc) {
    const beats = +sc.dataset.beats || 1;
    const intro = sc.dataset.entry === "intro";
    const total = intro ? beats - 1 : beats;
    const tl = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: "power2.out" } });
    const h = helpers(sc, tl);
    if (!intro) {                       // every scene: header settles in during entry
      const head = sc.querySelectorAll(".head > *");
      if (head.length) tl.from(head, { opacity: 0, y: 18, stagger: 0.07, duration: 0.42 }, 0.02);
    }
    const build = V.builders[sc.id];
    if (build) build(h);
    if (tl.duration() > total + 0.001) V.warnings.push(`${sc.id}: timeline ${tl.duration().toFixed(2)} > ${total}`);
    tl.set({}, {}, total);              // pad: duration must equal the number of time units
    ScrollTrigger.create({
      trigger: sc,
      start: intro ? "top top" : "top bottom",
      end: "bottom bottom",
      animation: reduce ? undefined : tl,
      scrub: reduce ? false : 0.6,
      onUpdate: reduce ? (self) => tl.time(Math.round(self.progress * total)) : undefined,
      onRefresh: reduce ? (self) => tl.time(Math.round(self.progress * total)) : undefined,
    });
    sc._tl = tl;
  }

  let ctx = null;
  try {
    if (!window.gsap || !window.ScrollTrigger) throw new Error("GSAP / ScrollTrigger not available");
    gsap.registerPlugin(ScrollTrigger);
    ctx = gsap.context(() => { V.scenes.forEach(buildScene); });
    V.root.classList.add("anim");
    ScrollTrigger.refresh();
    if (V.intro && !reduce && window.scrollY < 4 && !location.hash) V.intro.play(0);
    else if (V.intro) V.intro.progress(1);
  } catch (err) {
    try { if (ctx) ctx.revert(); } catch (_) { /* nothing left to revert */ }
    try { if (window.ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill()); } catch (_) { /* ignore */ }
    V.root.classList.remove("anim");
    V.animError = String(err && err.message || err);
  }

  V.nav.init();
  V.presenter.init();

  let rt = 0;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => { V.layout(); if (V.root.classList.contains("anim")) ScrollTrigger.refresh(); V.nav.compute(); }, 150);
  });
  window.addEventListener("load", () => { if (V.root.classList.contains("anim")) ScrollTrigger.refresh(); V.nav.compute(); });
})();
