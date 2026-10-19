/* =====================================================================
   ENGINE
   - fits the 1600×900 composition-safe canvas into the viewport
   - keeps the persistent chrome (theme, rail, thread, counter) in sync
   - registry for scene choreography (window.VMS.scene)
   Does not depend on GSAP: the static story works without it.
   ===================================================================== */
window.VMS = (function () {
  const D = window.VMS_DATA || {};
  const root = document.documentElement;
  root.classList.add("js");
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const builders = {};
  const state = { notesH: 0, presenting: false, lastChapter: null };

  /* ---------- canvas fit ---------- */
  function px(name) { return parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0; }
  function layout() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const topH = px("--top-h"), railH = px("--rail-h"), notesH = state.notesH;
    const padX = Math.max(16, vw * 0.025), padY = Math.max(8, vh * 0.012);
    const W = vw - padX * 2;
    const H = vh - topH - railH - notesH - padY * 2;
    const s = Math.max(0.2, Math.min(W / 1600, H / 900));
    root.style.setProperty("--s", s.toFixed(4));
    root.style.setProperty("--tx", ((vw - 1600 * s) / 2).toFixed(1) + "px");
    root.style.setProperty("--ty", (topH + padY + (H - 900 * s) / 2).toFixed(1) + "px");
    root.style.setProperty("--notes-h", notesH + "px");
  }

  /* ---------- chapter / beat bookkeeping for the chrome ---------- */
  const chapterIds = (D.chapters || []).map((c) => c.id);
  function chapterOfBeat(i) { const b = (D.beats || [])[i]; return b ? b.chapter : null; }
  function firstBeatOfChapter(id) { return (D.beats || []).findIndex((b) => b.chapter === id); }
  function threadLitAt(i) {
    const lit = new Set();
    (D.beats || []).forEach((b, j) => { if (j <= i && b.thread) lit.add(b.thread); });
    return lit;
  }

  function placeRail() {
    const n = (D.beats || []).length;
    if (!n) return;
    document.querySelectorAll(".rail-ticks li").forEach((li) => {
      const f = firstBeatOfChapter(li.dataset.chapter);
      li.style.left = (f / (n - 1)) * 100 + "%";
    });
    const dt = document.getElementById("designTrack");
    const f = firstBeatOfChapter(D.designTrackFrom || "ch5");
    if (dt && f >= 0) { dt.style.left = (f / (n - 1)) * 100 + "%"; dt.querySelector("i").style.width = "100%"; }
  }

  /* called by navigation whenever the current beat (or scene in view) changes */
  function update(info) {
    const n = (D.beats || []).length;
    const i = info.beat, total = info.total;
    const counter = document.getElementById("beatCounter");
    if (counter) counter.textContent = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    if (info.scene) document.body.dataset.theme = info.scene.dataset.theme || "light";

    // in static mode beats map to scenes; translate to the first beat of that scene
    const bi = info.dataBeat;
    const ch = info.scene ? info.scene.dataset.chapter : chapterOfBeat(bi);
    const chIndex = chapterIds.indexOf(ch);
    const fill = document.getElementById("railFill");
    if (fill && n > 1) fill.style.width = (Math.max(0, bi) / (n - 1)) * 100 + "%";
    document.querySelectorAll(".rail-ticks li").forEach((li) => {
      const k = chapterIds.indexOf(li.dataset.chapter);
      li.classList.toggle("done", k <= chIndex);
      li.classList.toggle("now", k === chIndex);
    });
    const chap = (D.chapters || [])[chIndex];
    const label = document.getElementById("railChapter");
    if (label && chap) label.textContent = chap.title;
    const dt = document.getElementById("designTrack");
    if (dt) dt.classList.toggle("on", chIndex >= chapterIds.indexOf(D.designTrackFrom || "ch5"));

    // golden thread
    const lit = threadLitAt(bi);
    let last = null;
    (D.thread || []).forEach((t) => { if (lit.has(t.id)) last = t.id; });
    document.querySelectorAll(".tt-dots li").forEach((li) => {
      li.classList.toggle("on", lit.has(li.dataset.thread));
      li.classList.toggle("now", li.dataset.thread === last);
    });

    // review loop glyph ticks once at each hand-off between chapters
    if (state.lastChapter !== null && state.lastChapter !== ch) {
      const g = document.getElementById("reviewGlyph");
      if (g) { g.classList.remove("tick"); void g.offsetWidth; g.classList.add("tick"); }
    }
    state.lastChapter = ch;
    if (window.VMS.presenter) window.VMS.presenter.render(bi, i, total);
  }

  return {
    D, root, scenes, state, builders,
    layout, placeRail, update, firstBeatOfChapter,
    scene(id, fn) { builders[id] = fn; },
  };
})();
