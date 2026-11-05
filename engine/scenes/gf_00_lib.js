/* gf_00_lib — «Бог ещё не создан» (eps/god_future_p1, eps/god_future_p2): общий словарь рисунков window.GF, v1.
 * Стиль канала («Сеть внутри сети», un_lib.js): чёрный фон, белые точки и нити, светящиеся шары UN.sphere,
 * моно Plex капсом, курсивные субтитры PT Serif. Мыслители — моно-подпись «ИМЯ · ТРУД · ГОД», без портретов.
 * Своя фишка ролика: ХАОС — тусклые точки, которые дрожат и разбредаются; ПОРЯДОК — те же точки, собранные
 * в соты (шестиугольная решётка), ярче и с нитями. «Огонь порядка» (GF.spark) — один тёплый шар: в части 1 —
 * общая история / бог над людьми, в части 2 — то, что собирают впереди. Красный #ff3030 — только опасность.
 * Все функции чистые: результат зависит только от аргументов; случайность — UN.hash. Никаких Math.random/Date.
 * Порядок загрузки: render.py грузит engine/scenes/*.js по алфавиту, gf_lib.js — раньше ts_lib.js и un_lib.js,
 * поэтому UN и TS вызываются только внутри функций (во время отрисовки).
 *
 * Время — от слов (все времена абсолютные, время ролика):
 *   GF.T(K,pid) / GF.TE(K,pid) — начало / конец фразы pid (K[pid], K[pid+'_end']).
 *   GF.w(K,pid,stem,n=0) — начало n-го слова фразы pid, которое начинается на stem (регистр и знаки не важны);
 *     GF.we(...) — его конец. Нет слова (или нет K.words) — начало фразы + n·0,4 с, без ошибки.
 *   GF.q(t,a,dur=.6) — плавный 0→1 от a; GF.qq(t,a,b) — плавный 0→1 на отрезке [a,b]; GF.out(t,a,dur) = 1−q.
 * Точки:
 *   GF.cloud(n,seed,[x0,y0,x1,y1]) → [[x,y],…] детерминированное облако в прямоугольнике;
 *   GF.lattice(cx,cy,r,cols,rows) → центры сот (r — радиус шестиугольника, «острый» верх);
 *   GF.hexPts(cx,cy,r,cols,rows) → точки на вершинах и серединах рёбер сот (для «точки собираются в соты»);
 *   GF.personPts(cx,groundY,h,n=240,seed=1) → точки силуэта человека ростом h (подошвы на groundY);
 *   GF.morph(A,B,q,t,o) → точки на пути A→B: q 0..1, у каждой точки своя задержка (o.spread=.35) и дрожь хаоса,
 *     которая гаснет к q=1 (o.amp=3); длины A и B могут отличаться (берётся по кругу);
 *   GF.jitter(P,t,amp,seed) — дрожь хаоса; GF.drift(P,t,t0,speed,seed) — точки разбредаются с t0;
 *   GF.dots(P,o) → SVG: o.r=1.1, o.op=.85, o.glow=.5 (мягкое свечение), o.t (мерцание), o.color='#fff'.
 * Рисунки:
 *   GF.hex(cx,cy,r,o) — шестиугольник (o.op, o.w=.7, o.fill, o.glow); GF.comb(cx,cy,r,cols,rows,o) — соты:
 *     o.lit(i,x,y) 0..1 яркость ячейки i, o.op, o.w;
 *   GF.spark(x,y,r,o) — огонь порядка: UN.sphere + тёплый ореол, дышит (o.t, o.op, o.warm=1);
 *   GF.mono(x,y,text,o) / GF.italic(x,y,text,o) — подписи UN (мелкие растут в безопасной зоне);
 *   GF.typed(x,y,text,t,t0,o) — моно печатается по буквам с t0 (o.cps=22, o.anchor);
 *   GF.thinker(text,t,t0,t1,o) — подпись «ИМЯ · ТРУД · ГОД» вверху (o.y=54): печатается с t0, гаснет к t1;
 *   GF.arrow(x0,y,x1,o) — горизонтальная стрелка (o.op, o.w); GF.line(o) — линия времени ПРОШЛОЕ → БУДУЩЕЕ
 *     (o.y=200, o.x0=40, o.x1=320, o.op=1, o.labels=1, o.now — доля «сейчас» или null);
 *   GF.person(cx,groundY,h,o) = TS.person (облако точек; o.t, o.opacity, o.pose);
 *   GF.wrap(svg) = UN.wrap(svg) (чёрный фон, мягкое затухание к субтитрам);
 *   GF.dissolve(a,b,q); GF.zoom(svg,cx,cy,z,tx=cx,ty=cy) — масштаб z вокруг (cx,cy), точка переезжает в (tx,ty).
 * Кадр 360×640: важное y=20..345 (story.safe ужимает сцену в .72 и ставит в зону), ниже — пусто под субтитры.
 * Проверка: python3 ~/Projects/serial-studio/tools/remote_anim.py god_future_p1 -- scene_test.py gf_style '{}' --dur 8
 *   --at 0,2,4,6,7.5 --cam '{"z0":1,"z1":1,"drift":0,"kicks":0}' --out eps/god_future_p1/qa/gf_style.jpg
 */
(() => {
  // Карточка конца части и подпись-источник (плашки story.py: .gf-card, .gf-small; .un-src — из un_parts.js).
  const css = document.createElement('style');
  css.textContent = '#root:has(#un-world) .part .gf-card{display:inline-block;border:1px solid rgba(255,255,255,.7);padding:9px 12px 7px;' +
    'line-height:1.18;letter-spacing:.5px;box-shadow:0 0 14px rgba(255,248,230,.2),inset 0 0 14px rgba(255,255,255,.08);background:rgba(0,0,0,.6)}' +
    '#root:has(#un-world) .part .gf-small{display:block;font-family:UNSerif,serif;font-style:italic;font-size:14px;color:#ddd;margin-top:8px;letter-spacing:0}' +
    '#root:has(#un-world) .part .gf-view{display:inline-block;font-family:Plex,monospace;font-weight:600;font-size:17px;letter-spacing:2px;color:#fff;' +
    'padding:5px 12px 4px;border:1px solid rgba(255,248,230,.85);border-radius:3px;background:rgba(0,0,0,.72);box-shadow:0 0 14px rgba(255,240,210,.25)}';
  document.head.appendChild(css);
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const H = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const lerp = (a, b, q) => a + (b - a) * q;
  const bare = w => String(w).toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '');

  /* ---------------- время от слов ---------------- */
  const T = (K, pid) => (K && K[pid] != null) ? K[pid] : 0;
  const TE = (K, pid) => (K && K[pid + '_end'] != null) ? K[pid + '_end'] : T(K, pid) + 3;
  function word(K, pid, stem, n = 0, end = false) {
    const ws = (K && K.words && K.words[pid]) || [];
    const s = bare(stem);
    const hit = ws.filter(w => bare(w.w).startsWith(s));
    if (hit.length > n) return end ? hit[n].t1 : hit[n].t0;
    return T(K, pid) + n * .4 + (end ? .4 : 0);
  }
  const w = (K, pid, stem, n = 0) => word(K, pid, stem, n, false);
  const we = (K, pid, stem, n = 0) => word(K, pid, stem, n, true);
  const q = (t, a, dur = .6) => ease((t - a) / Math.max(.001, dur));
  const qq = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const out = (t, a, dur = .6) => 1 - q(t, a, dur);

  /* ---------------- точки ---------------- */
  function cloud(n, seed = 1, box = [20, 30, 340, 340]) {
    const [x0, y0, x1, y1] = box, P = [];
    for (let i = 0; i < n; i++) P.push([lerp(x0, x1, H(seed * 991 + i * 7.13)), lerp(y0, y1, H(seed * 577 + i * 3.71 + 9))]);
    return P;
  }
  function lattice(cx, cy, r, cols, rows) {
    const dx = Math.sqrt(3) * r, dy = 1.5 * r, C = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++)
      C.push([cx + (i - (cols - 1) / 2) * dx + (j % 2 ? dx / 2 : 0) - dx / 4, cy + (j - (rows - 1) / 2) * dy]);
    return C;
  }
  const hexV = (cx, cy, r) => [0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k - Math.PI / 2; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  function hexPts(cx, cy, r, cols, rows) {
    const seen = new Set(), P = [];
    const add = p => { const k = Math.round(p[0] * 2) + ',' + Math.round(p[1] * 2); if (!seen.has(k)) { seen.add(k); P.push(p); } };
    for (const c of lattice(cx, cy, r, cols, rows)) {
      const V = hexV(c[0], c[1], r);
      V.forEach((v, k) => { add(v); const u = V[(k + 1) % 6]; add([(v[0] + u[0]) / 2, (v[1] + u[1]) / 2]); });
    }
    return P;
  }
  function personPts(cx, gy, h, n = 240, seed = 1) {
    // доли: голова 14 %, туловище 36 %, руки 22 %, ноги 28 %; ось y вниз, подошвы на gy
    const P = [], s = h / 100;
    for (let i = 0; i < n; i++) {
      const a = H(seed * 31 + i * 1.7), b = H(seed * 53 + i * 2.9), c = H(seed * 71 + i * 4.3);
      let x, y;
      if (i < n * .14) { const r = 7.2 * Math.sqrt(a), th = b * 6.283; x = r * Math.cos(th); y = -91 + r * 1.12 * Math.sin(th); }
      else if (i < n * .50) { y = -80 + a * 34; const wdt = 10.5 - Math.abs(y + 66) * .05; x = (b * 2 - 1) * wdt; }
      else if (i < n * .72) { const side = c < .5 ? -1 : 1, u = a; x = side * (11 + u * 6.5) + (b - .5) * 2.6; y = -78 + u * 31 + (b - .5) * 2; }
      else { const side = c < .5 ? -1 : 1, u = a; x = side * (3.2 + u * 2.6) + (b - .5) * 3.4; y = -46 + u * 46; }
      P.push([cx + x * s, gy + y * s]);
    }
    return P;
  }
  function jitter(P, t, amp = 2, seed = 3) {
    return P.map((p, i) => [p[0] + amp * Math.sin(t * (1.3 + H(i + seed) * 1.9) + i * 2.1),
                            p[1] + amp * Math.cos(t * (1.1 + H(i * 3 + seed) * 1.7) + i * 1.3)]);
  }
  function drift(P, t, t0, speed = 18, seed = 5) {
    const d = Math.max(0, t - t0);
    return P.map((p, i) => { const a = H(i * 13 + seed) * 6.283, v = speed * (.4 + H(i * 7 + seed)); return [p[0] + Math.cos(a) * v * d, p[1] + Math.sin(a) * v * d * .8]; });
  }
  function morph(A, B, qv, t = 0, o = {}) {
    const spread = o.spread ?? .35, amp = o.amp ?? 3, n = Math.max(A.length, B.length);
    const R = [];
    for (let i = 0; i < n; i++) {
      const a = A[i % A.length], b = B[i % B.length];
      const d = H(i * 17 + (o.seed ?? 2)) * spread;
      const u = ease((qv - d) / Math.max(.001, 1 - spread));
      const bend = Math.sin(u * Math.PI) * (o.bend ?? 14) * (H(i * 5 + 1) - .5);
      const ch = (1 - u) * amp;
      R.push([lerp(a[0], b[0], u) + bend + ch * Math.sin(t * 1.7 + i), lerp(a[1], b[1], u) - bend * .6 + ch * Math.cos(t * 1.3 + i * .7)]);
    }
    return R;
  }
  function dots(P, o = {}) {
    const r = o.r ?? 1.45, op = o.op ?? .92, t = o.t ?? 0, col = o.color ?? '#fff';
    if (op <= .003) return '';
    let s = '';
    for (let i = 0; i < P.length; i++) {
      const p = P[i]; if (p[0] < -10 || p[0] > 370 || p[1] < -10 || p[1] > 650) continue;
      const tw = .78 + .22 * Math.sin(t * 2.1 + i * 1.37);
      const ri = r * (o.size ? o.size(i) : 1);
      s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(ri)}" opacity="${f(op * tw * (o.alpha ? o.alpha(i) : 1))}"/>`;
    }
    const g = o.glow ?? .5;
    return `<g fill="${col}">${g > 0 ? `<g filter="url(#un-soft)" opacity="${f(g)}">${s}</g>` : ''}${s}</g>`;
  }

  /* ---------------- рисунки ---------------- */
  function hex(cx, cy, r, o = {}) {
    const V = hexV(cx, cy, r);
    const d = 'M' + V.map(v => `${f(v[0])} ${f(v[1])}`).join(' L') + ' Z';
    const op = o.op ?? .8; if (op <= .003) return '';
    return `<path d="${d}" fill="${o.fill ?? 'none'}" stroke="${o.color ?? '#fff'}" stroke-width="${o.w ?? .7}" opacity="${f(op)}" stroke-linejoin="round"${o.glow ? ' filter="url(#un-soft)"' : ''}/>`;
  }
  function comb(cx, cy, r, cols, rows, o = {}) {
    const C = lattice(cx, cy, r, cols, rows), op = o.op ?? 1;
    if (op <= .003) return '';
    let s = '';
    C.forEach((c, i) => {
      const l = o.lit ? clamp(o.lit(i, c[0], c[1])) : 1; if (l <= .003) return;
      s += hex(c[0], c[1], r * .96, { op: .18 + .62 * l, w: o.w ?? .6, fill: l > .6 ? `rgba(255,255,255,${f(.05 * (l - .6) / .4)})` : 'none' });
      if (l > .5) s += hex(c[0], c[1], r * .96, { op: .25 * (l - .5) * 2, w: 1.6, glow: true });
    });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  function spark(x, y, r, o = {}) {
    const op = o.op ?? 1; if (op <= .003) return '';
    const t = o.t ?? 0, br = 1 + .05 * Math.sin(t * 2.2), warm = o.warm ?? 1;
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 5.5 * br)}" fill="url(#gf-warm)" opacity="${f(.55 * warm)}"/>
      ${UN.sphere(x, y, r * br, { glow: 1.1 })}</g>`;
  }
  const mono = (x, y, s, o = {}) => UN.mono(x, y, s, o);
  const italic = (x, y, s, o = {}) => UN.italic(x, y, s, o);
  function typed(x, y, text, t, t0, o = {}) {
    if (t < t0) return '';
    const n = Math.min(text.length, Math.floor((t - t0) * (o.cps ?? 22)) + 1);
    const cur = n < text.length && Math.floor(t * 3) % 2 === 0 ? '▌' : '';
    return UN.mono(x, y, text.slice(0, n) + cur, { size: o.size ?? 10, anchor: o.anchor ?? 'middle', opacity: o.op ?? .92, glow: o.glow });
  }
  function thinker(text, t, t0, t1, o = {}) {
    const op = (o.op ?? 1) * (t1 != null ? out(t, t1 - .5, .5) : 1);
    if (t < t0 || op <= .003) return '';
    return `<g opacity="${f(op)}">${typed(180, o.y ?? 54, text, t, t0, { size: o.size ?? 9.5, cps: o.cps ?? 30 })}
      <line x1="${f(180 - 60 * q(t, t0, .6))}" x2="${f(180 + 60 * q(t, t0, .6))}" y1="${f((o.y ?? 54) + 7)}" y2="${f((o.y ?? 54) + 7)}" stroke="#fff" stroke-width=".4" opacity=".45"/></g>`;
  }
  function arrow(x0, y, x1, o = {}) {
    const op = o.op ?? .7; if (op <= .003) return '';
    return `<g stroke="#fff" stroke-width="${o.w ?? .8}" opacity="${f(op)}" fill="none" stroke-linecap="round">
      <line x1="${f(x0)}" y1="${f(y)}" x2="${f(x1)}" y2="${f(y)}"/><path d="M${f(x1 - 7)} ${f(y - 4)} L${f(x1)} ${f(y)} L${f(x1 - 7)} ${f(y + 4)}"/></g>`;
  }
  function line(o = {}) {
    const y = o.y ?? 200, x0 = o.x0 ?? 40, x1 = o.x1 ?? 320, op = o.op ?? 1;
    if (op <= .003) return '';
    let s = arrow(x0, y, x1, { op: .75, w: .9 });
    for (let i = 0; i <= 10; i++) { const x = lerp(x0, x1 - 10, i / 10); s += `<line x1="${f(x)}" x2="${f(x)}" y1="${f(y - 3)}" y2="${f(y + 3)}" stroke="#fff" stroke-width=".5" opacity=".45"/>`; }
    if ((o.labels ?? 1) > 0) {
      s += UN.mono(x0, y + 20, 'ПРОШЛОЕ', { size: 9, anchor: 'start', opacity: .8 * (o.labels ?? 1) });
      s += UN.mono(x1, y + 20, 'БУДУЩЕЕ', { size: 9, anchor: 'end', opacity: .8 * (o.labels ?? 1) });
    }
    if (o.now != null) { const x = lerp(x0, x1, o.now); s += `<line x1="${f(x)}" x2="${f(x)}" y1="${f(y - 12)}" y2="${f(y + 12)}" stroke="#fff" stroke-width="1" opacity=".8"/>` + UN.mono(x, y - 18, 'СЕЙЧАС', { size: 8.5, anchor: 'middle', opacity: .75 }); }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  const lx = (o, q2) => lerp(o.x0 ?? 40, o.x1 ?? 320, q2);
  const person = (cx, gy, h, o = {}) => TS.person(cx, gy, h, o);
  const defs = `<defs><radialGradient id="gf-warm"><stop stop-color="#fff6e0" stop-opacity=".55"/><stop offset=".35" stop-color="#ffe9c0" stop-opacity=".16"/><stop offset="1" stop-color="#ffe9c0" stop-opacity="0"/></radialGradient></defs>`;
  const wrap = svg => UN.wrap(defs + svg);
  const dissolve = (a, b, qv) => qv <= 0 ? a : qv >= 1 ? b : `<g opacity="${f(1 - qv)}">${a}</g><g opacity="${f(qv)}">${b}</g>`;
  const zoom = (svg, cx, cy, z, tx = cx, ty = cy) => Math.abs(z - 1) < 1e-4 && tx === cx && ty === cy ? svg :
    `<g transform="translate(${f(tx)} ${f(ty)}) scale(${(+z).toFixed(4)}) translate(${f(-cx)} ${f(-cy)})">${svg}</g>`;

  /* SCENES.имя = GF.scene('имя', body, o) — регистрирует сцену по правилу ролика (запись «SCENES.имя =» нужна engine_contracts): body(t, K, mode, p) → сырой SVG без фона;
   * SCENES[name].body = body (для наплыва следующей сцены). Вход в кадр: если прошлая сцена другая и у неё есть body —
   * наплыв o.enter=.5 с от начала кадра (t − u) из её последнего режима; иначе — из чёрного за .3 с. */
  function scene(name, body, o = {}) {
    const fn = function (u, p, d, t) {
      const t0 = t - u, K = p.K || {}, mode = p.mode;
      let own = body(t, K, mode, p);
      const prev = p.prev && p.prev !== name && SCENES[p.prev] && SCENES[p.prev].body;
      if (prev) {
        const qv = qq(t, t0, t0 + (o.enter ?? .5));
        if (qv < 1) own = dissolve(SCENES[p.prev].body(t, K, p.prev_mode, { ...p, mode: p.prev_mode }), own, qv);
      } else if (!p.prev && u < .3) own = `<g opacity="${f(1)}">${own}</g>`;
      return wrap(own);
    };
    fn.body = body;
    SCENES[name] = fn;
    return fn;
  }
  window.GF = Object.freeze({ scene, T, TE, w, we, q, qq, out, ease, clamp, lerp, hash: H, bare,
    cloud, lattice, hexPts, personPts, jitter, drift, morph, dots,
    hex, comb, spark, mono, italic, typed, thinker, arrow, line, lx, person, wrap, dissolve, zoom });

  /* Проверочный лист стиля: хаос → соты → человек → огонь порядка → линия времени. */
  SCENES.gf_style = function (u, p, d, t) {
    const A = cloud(300, 4, [30, 40, 330, 330]), B = hexPts(180, 185, 22, 6, 7), C = personPts(180, 330, 250);
    let s = '';
    if (t < 4) s += dots(morph(jitter(A, t, 3), B, qq(t, .6, 2.6), t), { op: .6 + .3 * qq(t, .6, 2.6), t }) + comb(180, 185, 22, 6, 7, { op: qq(t, 2.2, 3.2) * .9 });
    else s += dots(morph(B, C, qq(t, 4, 5.6), t), { t, op: .9 });
    s += spark(180, 60, 7, { t, op: qq(t, 5.6, 6.4) });
    s += line({ y: 300, op: qq(t, 6.4, 7.2), now: .62 });
    s += thinker('ШРЁДИНГЕР · «ЧТО ТАКОЕ ЖИЗНЬ?» · 1944', t, .3, 3.8);
    return wrap(s);
  };
})();
