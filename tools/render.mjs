// =====================================================================
// BUILD-TIME RENDERER
// Turns the data layer (src/scripts/data/*.js) into static HTML so the
// final page is complete even without JavaScript. Each export matches an
// <!--@render:name--> marker in src/index.html.
// =====================================================================

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ico = (id, cls = "") => `<svg class="ico ${cls}"><use href="#i-${id}"/></svg>`;
const raciClass = (v) => (v === "R/A" ? "ra" : v ? v.toLowerCase() : "e");

export function makeRenderers(D, ctx) {
  const R = {
    /* ---------- chrome ---------- */
    threadTracker: () => `<ol class="tt-dots">${D.thread.map((t) => `<li data-thread="${t.id}" title="${esc(t.label)}"><i></i><span>${esc(t.label)}</span></li>`).join("")}</ol>`,
    railTicks: () => `<ol class="rail-ticks">${D.chapters.map((c) => `<li data-chapter="${c.id}"><button type="button" aria-label="Go to ${esc(c.title)}" title="${esc(c.title)}"></button></li>`).join("")}</ol>`,

    /* ---------- opening · what is VMS? ---------- */
    vmsAreas: () => D.vmsAreas.map((a, i) => `<li class="o-area" data-i="${i}">${ico(a.icon)}<span>${esc(a.label)}</span></li>`).join(""),

    /* ---------- prologue ---------- */
    teamCredits: () => {
      const cols = [0, 4, 8].map((s) => D.team.members.slice(s, s + 4));
      return `<h2 class="pt-head">Meet the Team</h2>
      <div class="pt-mentor"><span class="pt-role">Team Mentor</span><b class="pt-mname">${esc(D.team.mentor)}</b></div>
      <div class="pt-members"><span class="pt-role">Team Members</span>
        <div class="pt-grid">${cols.map((c, i) => `<ul class="pt-col" data-i="${i}">${c.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`).join("")}</div></div>`;
    },
    prologueLabels: () => D.backgrounds.map((b, i) => `<span class="p-label" data-i="${i}"><span class="p-in">${esc(b)}</span></span>`).join(""),
    sessionTicks: () => Array.from({ length: 13 }, (_, i) => `<i data-i="${i}"></i>`).join(""),

    /* ---------- chapter 1 ---------- */
    domainMap: () => {
      const cx = 330, cy = 165, rx = 250, ry = 120;
      const nodes = D.domainNodes.map((n, i) => {
        const a = (-90 + i * 60) * Math.PI / 180;
        return { n, x: Math.round(cx + rx * Math.cos(a)), y: Math.round(cy + ry * Math.sin(a)) };
      });
      return `<svg class="c1-map" viewBox="0 0 660 330" role="img" aria-label="Fleet domain map: ${D.domainNodes.join(", ")}">
        ${nodes.map((p, i) => `<path class="dm-link" data-i="${i}" pathLength="1" d="M${cx} ${cy} L${p.x} ${p.y}"/>`).join("")}
        <circle class="dm-core" cx="${cx}" cy="${cy}" r="58"/><text class="dm-core-t" x="${cx}" y="${cy - 4}" text-anchor="middle">Fleet</text><text class="dm-core-t" x="${cx}" y="${cy + 20}" text-anchor="middle">domain</text>
        ${nodes.map((p, i) => `<g class="dm-node" data-i="${i}"><rect x="${p.x - 76}" y="${p.y - 22}" width="152" height="44" rx="22"/><text x="${p.x}" y="${p.y + 7}" text-anchor="middle">${esc(p.n)}</text></g>`).join("")}
      </svg>`;
    },
    kickoffFindings: () => D.kickoffFindings.map((f) => `<div class="kf"><span class="kf-i">${ico(f.icon)}</span><div><b>${esc(f.h)}</b><p>${esc(f.p)}</p></div></div>`).join(""),
    kickoffThread: () => `<div class="kf-thread"><span class="kf-num">6</span><div><b>${esc(D.kickoffThread.h)}</b><p>${esc(D.kickoffThread.p)}</p></div><span class="tag tag-gold">${esc(D.kickoffThread.tag)}</span></div>`,
    openTopics: () => D.openTopics.map((t) => `<span class="topic">${ico("circle-help")}${esc(t)}</span>`).join(""),

    /* ---------- chapter 2 ---------- */
    lifecycle: () => D.lifecycle.map((s) => `<li class="stg stg-${s.state}"><span class="stg-n">${s.n}</span><b>${esc(s.name)}</b><span class="stg-badge">${esc(D.lifecycleStates[s.state])}</span><p>${esc(s.line)}</p></li>`).join(""),
    streams: () => {
      const n = D.streams.length, top = 26, gap = 50, cy = top + gap * (n - 1) / 2;
      const ys = D.streams.map((_, i) => top + gap * i);
      const split = ys.map((y, i) => `<path class="sp" data-i="${i}" pathLength="1" d="M150 ${cy} C 220 ${cy}, 220 ${y}, 290 ${y} L 820 ${y}"/>`).join("");
      const merge = ys.map((y, i) => `<path class="mg" data-i="${i}" pathLength="1" d="M1010 ${y} L1060 ${y} C 1120 ${y}, 1120 ${cy}, 1170 ${cy}"/>`).join("");
      const labels = D.streams.map((s, i) => `<g class="sl" data-i="${i}"><rect x="300" y="${ys[i] - 17}" width="${Math.max(150, s.length * 10.6 + 28)}" height="34" rx="17"/><text x="314" y="${ys[i] + 6}">${esc(s)}</text></g>`).join("");
      const loop = D.reviewLoop.map((w, i) => `<text class="rl-w" data-i="${i}" x="915" y="${70 + i * 52}" text-anchor="middle">${esc(w.toUpperCase())}</text>`).join("");
      return `<svg class="c2-streams" viewBox="0 0 1260 360" role="img" aria-label="One team splits into seven work streams, passes through a review loop, and reconverges into one baseline">
        <g class="split">${split}</g><g class="merge">${merge}</g>
        <g class="team-node"><circle cx="90" cy="${cy}" r="62"/><text x="90" y="${cy - 4}" text-anchor="middle">ONE</text><text x="90" y="${cy + 20}" text-anchor="middle">TEAM</text></g>
        <g class="labels">${labels}</g>
        <g class="rl"><rect x="830" y="16" width="170" height="320" rx="14"/>${loop}<path class="rl-arc" d="M985 300 C 1010 250, 1010 110, 985 60" marker-end="url(#rlArw)"/></g>
        <defs><marker id="rlArw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0F766E"/></marker></defs>
        <g class="base-node"><circle cx="1196" cy="${cy}" r="62"/><text x="1196" y="${cy - 4}" text-anchor="middle">ONE</text><text x="1196" y="${cy + 20}" text-anchor="middle">BASELINE</text></g>
      </svg>`;
    },

    /* ---------- chapter 3 ---------- */
    scopeGroups: () => D.scopeGroups.map((g) => `<div class="sg sg-${g.tone}"><h4>${esc(g.name)}</h4>${g.items.map(([i, t]) => `<div class="cap">${ico(i)}<span>${esc(t)}</span></div>`).join("")}</div>`).join(""),
    exclusions: () => D.exclusions.map((e) => `<li><b>${esc(e.h)}</b><span>${esc(e.s)}</span></li>`).join(""),
    noMigration: () => `<div class="c3-nomig"><b>${ico("database")}${esc(D.noMigration.h)}</b><span>${esc(D.noMigration.s)}</span><span class="c3-link">${ico("link")}${esc(D.noMigration.link)}</span></div>`,

    /* ---------- chapter 4 ---------- */
    stakeQuads: () => ["sat", "man", "mon", "inf"].map((q) => {
      const Q = D.quadrants[q];
      const chips = D.stakeholders.map((s, i) => (s.q === q ? `<button type="button" class="chip" data-i="${i}">${esc(s.n)}</button>` : "")).join("");
      return `<div class="quad q-${q}"><h4>${esc(Q.name)}</h4><span class="ax">${esc(Q.ax)}</span><div class="chips">${chips}</div><p class="strat">${esc(Q.strategy)}</p></div>`;
    }).join(""),
    raciTable: () => `<table class="raci"><thead><tr><th class="dec">Decision</th>${D.raciRoles.map((r) => `<th>${esc(r)}</th>`).join("")}</tr></thead><tbody>${D.raciRows.map(([d, cells], r) => `<tr data-r="${r}"><td class="dec">${esc(d)}</td>${cells.map((v) => `<td class="rc rc-${raciClass(v)}">${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>`,

    /* ---------- chapter 5 ---------- */
    painRows: () => D.painToFeature.map((r, i) => `<div class="pr${r.thread ? " is-thread" : ""}" data-i="${i}">
        <div class="pain"><b>${esc(r.pain)}</b><span class="src">${esc(r.src)}</span>${r.thread ? `<span class="tag tag-gold">Golden thread</span>` : ""}</div>
        <svg class="pr-arrow" viewBox="0 0 120 40" aria-hidden="true"><path pathLength="1" d="M4 20 H108"/><path class="pr-head" d="M100 11 L112 20 L100 29"/></svg>
        <div class="feats">${r.f.map(([id, n]) => `<div class="feat"><span class="id">${esc(id)}</span><b>${esc(n)}</b><span class="must">Must</span></div>`).join("")}</div></div>`).join(""),
    featureGroups: () => {
      const max = Math.max(...D.featureGroups.map((g) => g[1]));
      return D.featureGroups.map(([n, v], i) => `<li data-i="${i}"${n === "Future enhancements" ? ' class="fut"' : ""}><span class="gn">${esc(n)}</span><span class="gb"><i style="width:${(v / max) * 100}%"></i></span><span class="gv">${v}</span></li>`).join("");
    },
    moscow: () => {
      const all = [...D.moscow, { k: "none", label: D.notPrioritized.label, v: D.notPrioritized.v, sub: D.notPrioritized.sub }];
      const max = 33;
      const bars = all.map((m, i) => `${m.k === "none" ? '<span class="mc-div" aria-hidden="true"></span>' : ""}<div class="mc-bar mc-${m.k}" data-i="${i}"><span class="mc-v" data-count="${m.v}">${m.v}</span><span class="mc-col"><i style="height:${(m.v / max) * 100}%"></i></span><span class="mc-l">${esc(m.label)}${m.sub ? `<small>${esc(m.sub)}</small>` : ""}</span></div>`).join("");
      return `<div class="mc-head"><b>MoSCoW priority</b><span>Must · Should · Could · Won't — plus features not yet prioritized (${esc(D.notPrioritized.ids)})</span></div><div class="mc-bars">${bars}</div>`;
    },
    pairs: () => `<div class="pp-head"><span>Now · core</span><span></span><span>Not now</span></div>` + D.nowVsLater.map((p, i) => `<div class="pp" data-i="${i}">
        <div class="pp-now"><span class="id">${esc(p.now[0])} · ${esc(p.now[2])}</span><b>${esc(p.now[1])}</b></div>
        <span class="pp-vs">${ico("arrow-left-right")}</span>
        <div class="pp-later"><span class="id">${esc(p.later[0])} · ${esc(p.later[2])}</span><b>${esc(p.later[1])}</b></div></div>`).join(""),

    /* ---------- chapter 6 ---------- */
    vvStages: () => D.vvStages.map((s, i) => `<li data-i="${i}">${esc(s)}</li>`).join(""),
    vvCards: () => {
      const tag = (e) => (e === "src" ? '<span class="tag tag-src">Source</span>' : e === "team" ? '<span class="tag tag-team">Team</span>' : '<span class="tag tag-open">Pending</span>');
      return `<div class="vv vv-ver"><span class="vv-k">Verification</span><h3>Have we documented it correctly and consistently?</h3><span class="vv-st st-done">${ico("circle-check")}Performed</span>
          <ul>${D.verification.map((v) => `<li>${ico("circle-check", "ok")}<span>${esc(v.t)}</span>${tag(v.e)}</li>`).join("")}</ul></div>
        <div class="vv-door" aria-hidden="true">${ico("shield-check")}</div>
        <div class="vv vv-val"><span class="vv-k">Validation</span><h3>Are these the right business needs?</h3><span class="vv-st st-part">${ico("circle-dashed")}Partially complete</span>
          <ul>${D.validation.map((v) => `<li class="${v.status}">${ico(v.status === "done" ? "circle-check" : "clock4", v.status === "done" ? "ok" : "wait")}<span>${esc(v.t)}</span>${tag(v.e)}</li>`).join("")}</ul></div>`;
    },
    brdHub: () => {
      const cx = 360, cy = 360, rx = 300, ry = 255, n = D.brdInputs.length;
      const pos = D.brdInputs.map((_, i) => { const a = (-90 + (360 / n) * i) * Math.PI / 180; return [Math.round(cx + rx * Math.cos(a)), Math.round(cy + ry * Math.sin(a))]; });
      return `<svg class="hub-lines" viewBox="0 0 720 720" aria-hidden="true">${pos.map(([x, y], i) => `<path data-i="${i}" pathLength="1" d="M${x} ${y} L${cx} ${cy}"/>`).join("")}</svg>
        <div class="hub-core"><b>BRD-VMS-003</b><span>v3.0 · consolidated</span><span class="hub-th tag tag-gold">BR-033 · BRL-04</span></div>
        ${D.brdInputs.map((t, i) => `<span class="hub-chip" data-i="${i}" style="left:${pos[i][0]}px;top:${pos[i][1]}px">${esc(t)}</span>`).join("")}`;
    },
    brdLayers: () => D.brdLayers.map((l, i) => `<li data-i="${i}"><b>${esc(l.v)}</b><span>${esc(l.l)}${l.s ? `<small>${esc(l.s)}</small>` : ""}</span></li>`).join(""),
    objectives: () => D.objectives.map((o) => `<div class="obj${o.thread ? " is-thread" : ""}"><div class="oh"><span class="id">${esc(o.id)}</span><b>${esc(o.name)}</b></div><div class="oks">${o.k.map(([v, l, t]) => `<div class="ok"><strong>${esc(v)}</strong><span>${esc(l)}</span><em>${esc(t)}</em></div>`).join("")}</div></div>`).join("") + `<p class="src obj-note">${esc(D.objectivesNote)}</p>`,

    /* ---------- chapter 8 ---------- */
    chain: () => D.chain.map((c, i) => `<li class="ch${c.kind ? " ch-" + c.kind : ""}" data-i="${i}"><span class="ch-id">${esc(c.id)}</span><span class="ch-t">${esc(c.t)}</span></li>`).join(""),
    story: () => `<div class="st-card"><div class="st-top"><span class="st-id">${esc(D.story.id)}</span><b>${esc(D.story.title)}</b></div>
        <p class="st-text"><span class="k">As a</span> <b>${esc(D.story.as)}</b>, <span class="k">I want</span> ${esc(D.story.want)}, <span class="k">so that</span> ${esc(D.story.so)}.</p>
        <span class="src">${esc(D.story.trace)} · Module 01 V.02</span></div>`,
    criteria: () => D.criteria.map((c, i) => `<div class="ac" data-i="${i}"><span class="ac-n">AC ${c.n || i + 1}<em>${esc(c.b)}</em></span>
        <p class="gwt g"><b>Given</b> ${esc(c.g)}</p><p class="gwt w"><b>When</b> ${esc(c.w)}</p><p class="gwt t"><b>Then</b> ${esc(c.t)}</p></div>`).join(""),
    quality: () => D.qualityLayers.map((q, i) => `<li data-i="${i}" class="${q.e === "open" ? "q-open" : ""}">${ico(q.icon)}<div><b>${esc(q.h)}</b><span>${esc(q.p)}</span></div></li>`).join(""),
    modules: () => {
      const max = Math.max(...D.modules.map((m) => m[1]));
      return `<div class="bk-head"><b data-count="${D.storyTotal}">${D.storyTotal}</b><span>user stories · ${D.modules.length} modules</span></div><ol class="bk">${D.modules.map(([n, v], i) => `<li data-i="${i}"><span class="bn">${esc(n)}</span><span class="bb"><i style="width:${(v / max) * 100}%"></i></span><span class="bv">${v}</span></li>`).join("")}</ol>`;
    },
    jira: () => {
      const J = D.jira, H = J.backlog.highlight;
      return `<figure class="jf jf-epics"><div class="jf-frame"><img src="@asset(${J.epics.file})" alt="${esc(J.epics.alt)}"></div>
          <figcaption><span class="jf-k">Real Jira · epics view</span><ul>${J.epics.facts.map((f) => `<li>${ico("circle-check")}${esc(f)}</li>`).join("")}</ul></figcaption></figure>
        <figure class="jf jf-backlog"><div class="jf-frame"><img src="@asset(${J.backlog.file})" alt="${esc(J.backlog.alt)}">
          <span class="jf-hl" style="top:${H.top * 100}%;height:${H.height * 100}%" aria-hidden="true"></span></div>
          <figcaption><span class="jf-k">Real Jira · backlog view <span class="jf-vis">${esc(J.backlog.visible)}</span></span>
            <div class="jf-row"><span class="jf-key">${esc(H.key)}</span><span class="jf-txt">${esc(H.text)}</span><span class="jf-meta">${esc(H.epic)} · ${esc(H.status)}</span></div>
            <span class="tag tag-gold">${esc(J.backlog.equals)}</span></figcaption></figure>`;
    },
    /* ---------- prototype reveal ---------- */
    protoThread: () => {
      const T = D.prototype.thread, phases = [];
      T.forEach((t) => { const last = phases[phases.length - 1]; if (last && last.name === t.phase) last.n++; else phases.push({ name: t.phase, n: 1 }); });
      return `<ol class="pt-phases" style="grid-template-columns:${phases.map((p) => p.n + "fr").join(" ")}">${phases.map((p, i) => `<li data-i="${i}"><span>${esc(p.name)}</span></li>`).join("")}</ol>
        <div class="pt-line" aria-hidden="true"><i></i></div>
        <ol class="pt-nodes">${T.map((t, i) => `<li class="pt-n${t.end ? " pt-end" : ""}" data-i="${i}"><b>${esc(t.id)}</b><span>${esc(t.t)}</span></li>`).join("")}</ol>`;
    },
    protoShot: (which) => {
      const P = D.prototype;
      const s = which === "hero" ? P.hero : P.support[+which];
      const img = ctx.prototypeImages[s.filename];
      const body = img
        ? `<img src="${img}" alt="${esc(s.alt)}">`
        : `<div class="ph" role="img" aria-label="${esc(s.title)}: placeholder"><span class="ph-i">${ico("pen-tool")}</span><b>${esc(D.prototypePlaceholder.line1)}</b><span>${esc(D.prototypePlaceholder.line2)}</span></div>`;
      const c = which === "hero" && img && s.callout ? `<span class="pr-callout" aria-hidden="true" style="left:${s.callout.left * 100}%;top:${s.callout.top * 100}%;width:${s.callout.width * 100}%;height:${s.callout.height * 100}%"></span>` : "";
      return `<div class="pr-frame${img ? "" : " is-ph"}" data-file="${esc(s.filename)}">${body}${c}</div>`;
    },
    protoHero: () => R.protoShot("hero"),
    protoSupport: () => D.prototype.support.filter((s) => s.enabled).map((s, i) => `<figure class="pr-sup" data-i="${i}"><figcaption>${esc(s.title)}</figcaption>${R.protoShot(String(i))}</figure>`).join(""),
    protoHeroTitle: () => esc(D.prototype.hero.title),
    protoLabel: () => esc(D.prototype.label),
    designSteps: () => D.prototype.designSteps.map((s) => `<li>${esc(s)}</li>`).join(""),

    /* ---------- finale ---------- */
    finaleHub: () => {
      const cx = 800, cy = 330, rx = 600, ry = 240, n = D.finaleChips.length;
      const pos = D.finaleChips.map((_, i) => { const a = (-90 + (360 / n) * i) * Math.PI / 180; return [Math.round(cx + rx * Math.cos(a)), Math.round(cy + ry * Math.sin(a))]; });
      return `<svg class="f-lines" viewBox="0 0 1600 660" aria-hidden="true"><ellipse class="f-orbit" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>${pos.map(([x, y], i) => `<path data-i="${i}" pathLength="1" d="M${x} ${y} L${cx} ${cy}"/>`).join("")}</svg>
        <div class="f-core"><b>VMS</b><span>Traceable product definition</span></div>
        ${D.finaleChips.map((t, i) => `<span class="f-chip" data-i="${i}" style="left:${pos[i][0]}px;top:${pos[i][1]}px">${esc(t)}</span>`).join("")}`;
    },
    finaleTeam: () => D.backgrounds.map((b, i) => `<span class="f-bg" data-i="${i}">${esc(b)}</span>`).join(""),
  };
  return R;
}
