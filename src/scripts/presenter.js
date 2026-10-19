/* =====================================================================
   PRESENTER: notes panel (outside fullscreen only) + presentation mode
   ===================================================================== */
window.VMS.presenter = (function () {
  const V = window.VMS;
  const NOTES_H = 210;
  let open = false, idleTimer = 0;
  const $ = (id) => document.getElementById(id);
  const isFs = () => !!(document.fullscreenElement || document.webkitFullscreenElement);

  function render(dataBeat, i, total) {
    const b = (V.D.beats || [])[dataBeat];
    if (!b || !$("nTitle")) return;
    $("nBeat").textContent = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    $("nTitle").textContent = b.title;
    $("nKey").textContent = b.notes.key; $("nWhy").textContent = b.notes.why;
    $("nValue").textContent = b.notes.value; $("nNext").textContent = b.notes.next;
  }

  function setNotes(on) {
    open = on && !isFs();
    $("notes").hidden = !open;
    $("btnNotes").setAttribute("aria-pressed", String(open));
    V.state.notesH = open ? NOTES_H : 0;
    V.layout();
    try { localStorage.setItem("vms-notes", open ? "1" : "0"); } catch (_) { /* storage may be unavailable */ }
  }

  function present() {
    if (isFs()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) Promise.resolve(req.call(el)).catch(() => {});
  }
  function onFs() {
    const fs = isFs();
    V.state.presenting = fs;
    document.body.classList.toggle("presenting", fs);
    $("btnPresent").querySelector("span").textContent = fs ? "Exit" : "Present";
    if (fs) { V.state.notesH = 0; $("notes").hidden = true; }
    else if (open) { V.state.notesH = NOTES_H; $("notes").hidden = false; }
    V.layout();
  }
  function wake() {
    document.body.classList.remove("idle");
    clearTimeout(idleTimer);
    if (V.state.presenting) idleTimer = setTimeout(() => document.body.classList.add("idle"), 2000);
  }

  /* chapter 4: optional Q&A detail for a stakeholder chip */
  function stakeholderPop() {
    const pop = $("stakePop");
    if (!pop) return;
    const safe = pop.parentElement;
    document.querySelectorAll("#ch4 .chip").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        const s = V.D.stakeholders[+chip.dataset.i], Q = V.D.quadrants[s.q];
        const already = chip.classList.contains("sel");
        document.querySelectorAll("#ch4 .chip.sel").forEach((c) => c.classList.remove("sel"));
        if (already) { pop.hidden = true; return; }
        chip.classList.add("sel");
        pop.innerHTML = `<h5>${s.n}</h5><div class="sc">${Q.name} · Power ${s.p}/5 · Interest ${s.i}/5</div><p>${s.role}</p><p>${Q.strategy}</p>${s.note ? `<p class="nt">${s.note}</p>` : ""}`;
        // position inside the unscaled canvas coordinates
        let x = 0, y = 0, el = chip;
        while (el && el !== safe) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
        pop.style.left = Math.min(1600 - 380, x) + "px";
        pop.style.top = (y + chip.offsetHeight + 8) + "px";
        pop.hidden = false;
      });
    });
    document.addEventListener("click", () => { pop.hidden = true; document.querySelectorAll("#ch4 .chip.sel").forEach((c) => c.classList.remove("sel")); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") pop.hidden = true; });
  }

  function init() {
    $("btnNotes").addEventListener("click", () => setNotes(!open));
    $("btnPresent").addEventListener("click", present);
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    document.addEventListener("mousemove", wake, { passive: true });
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "n" || e.key === "N") setNotes(!open);
    });
    // clicked buttons must not keep focus (Space would re-trigger them)
    document.querySelectorAll("button").forEach((b) => b.addEventListener("mouseup", () => b.blur()));
    let saved = false;
    try { saved = localStorage.getItem("vms-notes") === "1"; } catch (_) { /* ignore */ }
    if (saved) setNotes(true);
    stakeholderPop();
  }

  return { init, render, setNotes, present };
})();
