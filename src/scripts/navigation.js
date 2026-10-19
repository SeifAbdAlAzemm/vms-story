/* =====================================================================
   BEAT NAVIGATION
   A beat is a stable scroll position. Animation mode: a scene with N beats
   offers N positions, one viewport apart. Static mode: one per scene.
   Next / previous tween the native scroll position (~900 ms) with a
   one-step queue, so rapid presses never strand a scene halfway.
   Free scrolling (wheel, trackpad, scrollbar) is never blocked.
   ===================================================================== */
window.VMS.nav = (function () {
  const V = window.VMS;
  let positions = [];   // scroll Y for each beat
  let owners = [];      // scene element for each beat
  let dataIndex = [];   // index into VMS_DATA.beats for each beat
  let tween = null;     // { target, cancel }
  let queued = null;
  let hashTimer = 0, rafPending = false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DUR = 900;

  function compute() {
    positions = []; owners = []; dataIndex = [];
    const anim = V.root.classList.contains("anim");
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let di = 0;
    V.scenes.forEach((sc) => {
      const top = sc.getBoundingClientRect().top + window.scrollY;
      const stageH = sc.querySelector(".stage").offsetHeight;
      const b = +sc.dataset.beats || 1;
      const count = anim ? b : 1;
      for (let k = 0; k < count; k++) {
        positions.push(Math.min(maxY, Math.round(top + k * stageH)));
        owners.push(sc);
        dataIndex.push(di + k);
      }
      di += b;
    });
  }

  function indexAt(y) {
    let i = 0;
    for (let j = 0; j < positions.length; j++) if (positions[j] <= y + 4) i = j;
    return i;
  }
  const current = () => (tween ? tween.target : indexAt(window.scrollY));

  function ease(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }

  function animateTo(i, done) {
    const y0 = window.scrollY, y1 = positions[i], dy = y1 - y0;
    if (Math.abs(dy) < 1 || reduce) { window.scrollTo(0, y1); done && done(); return; }
    const dur = Math.min(1100, Math.max(650, DUR * Math.min(1.2, Math.abs(dy) / window.innerHeight)));
    const t0 = performance.now();
    const job = { target: i, cancelled: false };
    tween = job;
    function step(t) {
      if (job.cancelled) return;
      const p = Math.min(1, (t - t0) / dur);
      window.scrollTo(0, y0 + dy * ease(p));
      if (p < 1) requestAnimationFrame(step);
      else { tween = null; done && done(); }
    }
    requestAnimationFrame(step);
  }

  function settleThenQueue() {
    if (queued === null) return;
    const q = queued; queued = null;
    setTimeout(() => go(q), 90);
  }

  /* go to beat i. jump=true: instant with a short veil (Home/End/rail ticks) */
  function go(i, opts = {}) {
    if (!positions.length) compute();
    i = Math.max(0, Math.min(positions.length - 1, i));
    if (opts.jump) {
      cancel();
      const veil = document.getElementById("veil");
      if (reduce || !veil) { window.scrollTo(0, positions[i]); return; }
      veil.classList.add("on");
      setTimeout(() => { window.scrollTo(0, positions[i]); requestAnimationFrame(() => setTimeout(() => veil.classList.remove("on"), 60)); }, 220);
      return;
    }
    if (tween) {             // one-step queue beyond the running target
      const dir = Math.sign(i - tween.target);
      queued = Math.max(0, Math.min(positions.length - 1, tween.target + dir));
      return;
    }
    animateTo(i, settleThenQueue);
  }
  function cancel() { if (tween) { tween.cancelled = true; tween = null; } queued = null; }
  const next = () => go(current() + 1);
  const prev = () => go(current() - 1);

  function onKey(e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    switch (e.key) {
      case "ArrowRight": case "PageDown": e.preventDefault(); next(); break;
      case " ": case "Spacebar": e.preventDefault(); (e.shiftKey ? prev : next)(); break;
      case "ArrowLeft": case "PageUp": e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); go(0, { jump: true }); break;
      case "End": e.preventDefault(); go(positions.length - 1, { jump: true }); break;
      case "ArrowDown": case "ArrowUp": cancel(); break; // native scrolling stays available
      default: break;
    }
  }

  function report() {
    rafPending = false;
    const i = indexAt(window.scrollY);
    const mid = window.scrollY + window.innerHeight * 0.5;
    const inView = V.scenes.find((sc) => { const r = sc.getBoundingClientRect(); const top = r.top + window.scrollY; return mid >= top && mid < top + r.height; }) || owners[i];
    V.update({ beat: i, total: positions.length, dataBeat: dataIndex[i] || 0, scene: inView });
    clearTimeout(hashTimer);
    hashTimer = setTimeout(() => { try { history.replaceState(null, "", "#b" + (i + 1)); } catch (_) { /* file:// may refuse */ } }, 250);
  }
  function onScroll() { if (!rafPending) { rafPending = true; requestAnimationFrame(report); } }

  function init() {
    compute();
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    ["wheel", "touchstart"].forEach((ev) => window.addEventListener(ev, cancel, { passive: true }));
    document.getElementById("btnNext")?.addEventListener("click", next);
    document.getElementById("btnPrev")?.addEventListener("click", prev);
    document.querySelectorAll(".rail-ticks li").forEach((li) => {
      li.querySelector("button").addEventListener("click", () => {
        const f = V.firstBeatOfChapter(li.dataset.chapter);
        const j = dataIndex.findIndex((d) => d >= f);
        go(j < 0 ? 0 : j, { jump: true });
      });
    });
    const m = /^#b(\d+)$/.exec(location.hash);
    if (m) { const i = +m[1] - 1; requestAnimationFrame(() => { window.scrollTo(0, positions[Math.max(0, Math.min(positions.length - 1, i))] || 0); report(); }); }
    else report();
  }

  return { init, compute, go, next, prev, current, get positions() { return positions.slice(); }, get count() { return positions.length; } };
})();
