/* «Что такое время» (time_states), сцена ts_minds — часы-инструмент из учебника, Вселенная, Августин,
 * Ньютон и Лейбниц (фразы t1, t2, p1, t3). Портретов и лиц нет: мыслитель — моно-подпись «ИМЯ · ТРУД · ГОД»
 * вверху (y=50, печатается по буквам) и образ его идеи. Чёрный фон, белые точки и нити, шары UN.sphere,
 * Plex Mono капсом.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, p.mode — лишь имя кадра
 * (body(t,K,mode) одинаков при любом mode), поэтому между режимами нет швов. Порядок:
 *   короткая версия: newton (t1) → universe (t2) → ts_apple/compare;
 *   полная версия:   newton (t1) → universe (t2) → augustine (p1) → leibniz (t3) → ts_apple/compare.
 * Версия — по K: есть K.p1 или K.t3 — полная, иначе короткая. Река и подпись «НЬЮТОН» рисуются ТОЛЬКО
 * если в K.words (любой фразе) есть слово «Ньютон…», события и подпись Лейбница — только при «Лейбниц…».
 *
 *  newton (t1)     вход наплывом 0,7 с из p.prev (ts_body/height или ts_earth/gps, SCENES[p.prev].body).
 *                  «Часы разошлись» — два циферблата расходятся, верхний уходит вперёд (сектор разницы,
 *                  пунктир между концами стрелок); «что … меряют?» — между ними «?» из точек;
 *                  «учебнике» — внизу раскрывается каркасная книга: слева ось-стрелка «t», справа
 *                  формула моно «v = s / t», строки текста; «время — это стрелка» — часы сходятся в одни
 *                  большие, на «стрелка» стрелка крупно со следом, ось в книге загорается; «инструмент» —
 *                  подпись «ИНСТРУМЕНТ» под часами; «мерить» — под часами линейка; «скорость» — по ней
 *                  бежит шарик «v», в формуле загорается v; «путь» — скобка «s» под пройденным, s в формуле;
 *                  «делённый на время» — на циферблате сектор времени забега «t», / и t в формуле.
 *  universe (t2)   «Описали» — формула подчёркнута; «правильно» — галочка; «инструмент» — подпись
 *                  «ИНСТРУМЕНТ» вспыхивает рамкой; «Стрелку придумали люди» — книга закрывается и гаснет,
 *                  линейка гаснет, часы уменьшаются и уезжают в левый верхний угол (64,78), под ними
 *                  печатается «ПРИДУМАЛИ ЛЮДИ»; «создала» — из глубины рождаются звёзды; «Вселенная» —
 *                  глубокое поле (~640 точек в 3D, медленный полёт вперёд, крен, дрейф точки схода,
 *                  вспышки звёзд, две вращающиеся спирали-галактики); сразу после — 300 звёзд слетаются
 *                  в большой «?» (центр 182,190); «Давайте … разобраться» — по «?» бежит волна света;
 *                  короткая: «на яблоке» — камера летит к центру (180,205): звёзды в варп-штрихи, «?»
 *                  разлетается, часы уходят за кадр, в центре свечение, сам центр пуст под ts_apple/compare
 *                  (она владеет наплывом из этого кадра); полная: на «яблоке» — только вспышка в центре.
 *  augustine (p1)  только полная: «?» из звёзд остаётся; «Августин» — подпись «АВГУСТИН · «ИСПОВЕДЬ» ·
 *                  IV–V В.» (подпись «ПРИДУМАЛИ ЛЮДИ» гаснет, часы остаются в углу); «пока» — волна
 *                  света; «знаю» — вспышка; «начну» — нить-вопрос; 2-е «не» — касание, точки рассыпаются
 *                  и гаснут, звёзды возвращаются на свои места.
 *  leibniz (t3)    только полная: «Люди отвечали» — звёзды тускнеют до фона; «Ньютону» — подпись
 *                  «НЬЮТОН · «НАЧАЛА» · 1687», река ~500 точек в 3D разливается слева, часы из угла
 *                  уезжают на берег; «течёт» — поток набирает ход; «само» — засечки, по ним бежит
 *                  огонёк в такт стрелке; «ни от чего внешнего» — вокруг падают шары, поток не меняется;
 *                  «Лейбницу» — подпись «ЛЕЙБНИЦ · ПИСЬМА КЛАРКУ · 1716», точки реки стягиваются в 5
 *                  шаров-событий на нити; «событий … времени» — события гаснут по одному, остаётся пунктир;
 *                  после «времени» камера летит в центр к яблоку (как в короткой на «на яблоке»).
 * Слова (K.words, помощник cue; нет слова — доля фразы):
 *   t1: час, разош, что, меря, учебн, время, стрелк, инструм, мерит, скорост, путь, делён, время(2-е);
 *   t2: описал, правил, инструм, стрелк, придум, люди, создал, вселен, давайте, попроб, разобр, на, яблок;
 *   p1: август, пока, знаю, начну, объясн, не(после объясн);
 *   фраза с «ньютон»: ньютон, теч, само, ровно (нет — само+0,35), ни, внешн, завис;
 *   фраза с «лейбниц»: лейбниц, без, событ, времен. Длительности — доли промежутков, наплывы 0,4–0,9 с.
 * Параметры p: mode, K (cues.json), s, prev/prev_mode (наплыв 0,7 с от K[p.s]−0,05, если prev не ts_minds:
 * SCENES[p.prev].body, иначе из чёрного). SCENES.ts_minds.body(t, K, mode) — сырой SVG без wrap.
 * Камера движка нейтральна: своя — полёт сквозь звёзды, UN.project книги и реки, наезд к яблоку.
 * Кадр ≤ ~1400 элементов (пик — звёзды + «?»).
 */
(() => {
  // ts_minds.js loads before un_lib.js (alphabetical): UN and TS are used only at draw time.
  const clamp = x => Math.max(0, Math.min(1, x)), ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const B = (t, a, b) => ease((t - a) / Math.max(.001, b - a)), lerp = (a, b, q) => a + (b - a) * q;
  const f = v => Number(v).toFixed(2);
  const H = n => UN.hash(n);
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const pulse = (t, a, up, down) => B(t, a, a + up) * (1 - B(t, a + up, a + up + down));
  // integral of B(t,a,a+D) dt from a: smooth speed-ups without jumps in position
  const IB = (t, a, D) => { if (t <= a) return 0; const u = (t - a) / D; return u >= 1 ? D * .5 + (t - a - D) : D * (u * u * u - u * u * u * u / 2); };
  const mod = (a, n) => ((a % n) + n) % n;
  const NEVER = 1e6;

  // draft phrase bounds (core version, 03.11) — only when K has nothing at all
  const DEF = { t1: [24.45, 34.367], t2: [34.617, 43.432], p1: [43.682, 50.557], t3: [50.807, 59.502] };
  const norm = w => w.toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  // the start of the first word of phrase id beginning with one of the stems (at or after `after`), else null
  const wordAt = (K, id, stems, after = -1e9) => {
    if (id == null) return null;
    for (const st of [].concat(stems)) {
      const a = (K.words?.[id] || []).find(x => x.t0 >= after - 1e-6 && norm(x.w).startsWith(st));
      if (a) return a.t0;
    }
    return null;
  };
  const cue = (K, id, stems, share, se, after) => wordAt(K, id, stems, after) ?? (se[0] + share * (se[1] - se[0]));
  // the phrase where a name is spoken (river and events exist only where their author is named)
  const phraseOf = (K, stem) => Object.keys(K.words || {}).find(id => (K.words[id] || []).some(x => norm(x.w).startsWith(stem))) ?? null;

  function cues(K) {
    const c = {};
    const span = (id, s0) => { const s = K[id] ?? s0, e = K[id + '_end'] ?? (s + DEF[id][1] - DEF[id][0]); return [s, e]; };
    const T1 = span('t1', DEF.t1[0]), T2 = span('t2', T1[1] + .35);
    c.full = K.p1 != null || K.t3 != null;
    c.hasAug = K.p1 != null;
    const P1 = c.hasAug ? span('p1', T2[1] + .35) : [T2[1], T2[1]];
    const T3 = K.t3 != null ? span('t3', P1[1] + .35) : [P1[1], P1[1]];
    c.t1 = T1[0]; c.t1e = T1[1]; c.t2 = T2[0]; c.t2e = T2[1]; c.p1 = P1[0]; c.p1e = P1[1]; c.t3s = T3[0]; c.t3e = T3[1];
    c.end = c.full ? Math.max(T2[1], P1[1], T3[1]) : T2[1];
    // t1
    c.chas = cue(K, 't1', 'час', 0, T1); c.razo = cue(K, 't1', 'разош', .05, T1); c.chto = cue(K, 't1', 'что', .12, T1);
    c.mer = cue(K, 't1', 'меря', .17, T1); c.uch = cue(K, 't1', 'учебн', .25, T1); c.vr1 = cue(K, 't1', 'время', .3, T1, c.uch);
    c.strel = cue(K, 't1', 'стрелк', .4, T1); c.instr = cue(K, 't1', 'инструм', .47, T1); c.meri = cue(K, 't1', 'мерит', .6, T1);
    c.skor = cue(K, 't1', 'скорост', .74, T1); c.put = cue(K, 't1', 'путь', .83, T1, c.skor);
    c.del = cue(K, 't1', ['делён', 'делен'], .88, T1, c.put); c.vr2 = cue(K, 't1', 'время', .96, T1, c.del);
    c.runE = Math.max(c.skor + 1.2, c.vr2 + .45);           // the ball reaches the end of the ruler
    // t2
    c.opis = cue(K, 't2', 'описал', 0, T2); c.prav = cue(K, 't2', 'правил', .06, T2); c.instr2 = cue(K, 't2', 'инструм', .22, T2);
    c.strel2 = cue(K, 't2', 'стрелк', .3, T2); c.prid = cue(K, 't2', 'придум', .36, T2); c.lyud = cue(K, 't2', 'люди', .43, T2);
    c.sozd = cue(K, 't2', 'создал', .53, T2); c.vsel = cue(K, 't2', 'вселен', .59, T2); c.dav = cue(K, 't2', 'давайте', .67, T2);
    c.pop = cue(K, 't2', 'попроб', .73, T2); c.raz = cue(K, 't2', 'разобр', .8, T2);
    c.na = cue(K, 't2', 'на', .9, T2, c.raz); c.yab = cue(K, 't2', 'яблок', .93, T2, c.raz);
    c.qIn = c.vsel + .05;                                     // stars start to gather into the «?»
    // p1 (full version only)
    c.aug = cue(K, 'p1', 'август', 0, P1); c.poka = cue(K, 'p1', 'пока', .42, P1); c.zn = cue(K, 'p1', 'знаю', .6, P1);
    c.nach = cue(K, 'p1', 'начну', .7, P1); c.obj = cue(K, 'p1', 'объясн', .78, P1, c.nach);
    c.ne = cue(K, 'p1', 'не', .9, P1, c.obj);
    c.sc = c.hasAug ? c.ne : NEVER;                           // the thread touches, the «?» scatters
    c.gs = Math.max(c.sc + .3, Math.min(c.sc + .55, c.t3s - .45));
    c.gd = Math.max(.6, Math.min(1.3, c.t3s + .35 - c.gs));
    // Newton's river: only where «Ньютон» is spoken
    const NP = phraseOf(K, 'ньютон');
    c.river = NP != null;
    c.newt = c.river ? wordAt(K, NP, 'ньютон') : NEVER;
    c.tech = wordAt(K, NP, 'теч', c.newt) ?? c.newt + .6; c.samo = wordAt(K, NP, 'само', c.newt) ?? c.tech + .4;
    c.rovno = wordAt(K, NP, 'ровно', c.samo) ?? c.samo + .35; c.ni = wordAt(K, NP, 'ни', c.samo) ?? c.samo + .5;
    c.vnesh = wordAt(K, NP, 'внешн', c.ni) ?? c.ni + .6; c.zav = wordAt(K, NP, 'завис', c.ni) ?? c.vnesh + .5;
    // Leibniz's events: only where «Лейбниц» is spoken
    const LP = phraseOf(K, 'лейбниц');
    c.leib = LP != null;
    c.lb = c.leib ? wordAt(K, LP, 'лейбниц') : NEVER;
    c.bez = wordAt(K, LP, 'без', c.lb) ?? c.lb + .5; c.sob = wordAt(K, LP, 'событ', c.lb) ?? c.bez + .3;
    c.vrem = wordAt(K, LP, 'времен', c.sob) ?? c.sob + .8;
    if (c.vrem <= c.sob) c.vrem = c.sob + .5;
    // fly-in to the apple: short — on «на яблоке»; full — after the last event goes out
    // blind view 03.11: the fly-in burst on «времени» read as an event («взрыв») against «без событий времени нет» —
    // with Leibniz the camera leaves only after the line, under the next shot's dissolve
    c.Fa = c.full ? (c.leib ? c.end + .25 : c.end - .6) : c.na - .12;
    c.Fb = Math.max(c.Fa + .9, c.end + .5);
    c.qRel = c.hasAug ? c.sc : c.full ? c.t3s - .2 : c.Fa;   // the «?» of stars leaves here
    c.s0 = c.t1 - .05;
    return c;
  }

  /* ---------- the question mark: stroke + ball terminal + period, unit height ---------- */
  let QG = null;
  function qGeo() {
    if (QG) return QG;
    const A = [[-.25, -.15], [-.245, -.30], [-.14, -.42], [.02, -.46], [.17, -.41], [.25, -.28], [.22, -.14], [.11, -.04], [.03, .05], [0, .14], [0, .25]];
    const cr = (p0, p1, p2, p3, s) => [0, 1].map(k => .5 * (2 * p1[k] + (-p0[k] + p2[k]) * s + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * s * s + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * s * s * s));
    const dense = [];
    for (let i = 0; i < A.length - 1; i++) for (let k = 0; k < 40; k++) {
      dense.push(cr(A[Math.max(0, i - 1)], A[i], A[i + 1], A[Math.min(A.length - 1, i + 2)], k / 40));
    }
    dense.push(A[A.length - 1]);
    const L = [0]; for (let i = 1; i < dense.length; i++) L.push(L[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
    const tot = L[L.length - 1];
    const at = u => { const d = u * tot; let j = 1; while (j < L.length - 1 && L[j] < d) j++; const q = (d - L[j - 1]) / Math.max(1e-9, L[j] - L[j - 1]);
      const a = dense[j - 1], b = dense[j]; return { p: [lerp(a[0], b[0], q), lerp(a[1], b[1], q)], tg: [b[0] - a[0], b[1] - a[1]] }; };
    const pts = [], NS = 236;
    const wid = u => .02 + .028 * Math.sin(Math.PI * clamp(u / .8)) * (u < .8 ? 1 : 0) + .004;
    for (let i = 0; i < NS; i++) {
      const u = (i + .5) / NS, { p, tg } = at(u), n = Math.hypot(tg[0], tg[1]) || 1;
      const off = (H(i * 3.1 + 1) * 2 - 1) * wid(u);
      pts.push({ x: p[0] - tg[1] / n * off, y: p[1] + tg[0] / n * off, z: (H(i * 5.7 + 2) - .5) * 2 * wid(u), u, h: H(i * 1.9 + 4) });
    }
    const disk = (cx, cy, r, n, seed, u) => { for (let i = 0; i < n; i++) { const a = i * 2.39996, rr = r * Math.sqrt((i + .5) / n);
      pts.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr, z: (H(i + seed) - .5) * r, u, h: H(i * 2.3 + seed) }); } };
    disk(A[0][0] + .012, A[0][1] + .02, .045, 22, 71, -.04);  // ball terminal of the hook
    disk(0, .4, .058, 42, 91, 1.08);                         // the period
    for (const q of pts) q.x -= .2 * (q.y - .0);              // italic slant
    QG = Object.freeze(pts);
    return QG;
  }
  const NQ = 300;                                           // points of the «?» (qGeo().length)
  const BALL = i => i % 23 === 5;                          // dots drawn as spheres (and threaded in the «?»)
  const qPt = (q, cx, cy, size, yaw) => {
    const X = q.x * Math.cos(yaw) + q.z * Math.sin(yaw), Z = -q.x * Math.sin(yaw) + q.z * Math.cos(yaw), k = 1 / (1 + Z * .7);
    return { x: cx + X * size * k, y: cy + q.y * size * k, z: Z };
  };
  // a smaller «?» that gathers from dust around it and blows apart outward (t1 «что они меряют?»)
  function qMark(t, cx, cy, size, tIn, tOut, seed) {
    if (t < tIn - .01 || t > tOut + 1.1) return '';
    const G = qGeo(), yaw = .25 * Math.sin(t * .6 + seed);
    let d = '', bl = '';
    const halo = B(t, tIn + .2, tIn + .8) * (1 - B(t, tOut, tOut + .5));
    for (let i = 0; i < G.length; i += 2) {
      const g = G[i], p = qPt(g, cx, cy + 1.5 * Math.sin(t * .9 + seed), size, yaw);
      const a0 = tIn + .35 * H(i + seed), a = B(t, a0, a0 + .65);
      const o0 = tOut + .3 * H(i * 1.7 + seed), o = B(t, o0, o0 + .7);
      if (a <= .003 || o >= .997) continue;
      const an = H(i * 7.7 + seed * 3) * 2 * Math.PI, rr = .45 * size + .8 * size * H(i * 4.1 + seed);
      const ox = cx + Math.cos(an) * rr, oy = cy + Math.sin(an) * rr * .8;
      let x = lerp(ox, p.x, a), y = lerp(oy, p.y, a);
      x += (p.x - cx) * 1.6 * o + Math.cos(an) * 30 * o; y += (p.y - cy) * 1.2 * o + Math.sin(an) * 22 * o;
      const op = 1.3 * (.35 + .5 * clamp(.6 - p.z * 4)) * (.6 + .4 * g.h) * (.8 + .2 * Math.sin(t * 2.4 + g.h * 30)) * Math.pow(a, .6) * (1 - o);
      if (BALL(i + 1)) bl += UN.sphere(x, y, 1.9, { glow: .5, opacity: Math.min(1, op) });
      else d += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.6 + .7 * g.h)}" opacity="${f(Math.min(1, op))}"/>`;
    }
    return (halo > .003 ? `<circle cx="${f(cx)}" cy="${f(cy + 4)}" r="${f(size * .62)}" fill="url(#un-halo)" opacity="${f(.32 * halo)}"/>` : '') + `<g fill="#fff">${d}</g>${bl}`;
  }

  /* ---------- labels ---------- */
  const CW = .6;                                            // Plex Mono advance, em
  function typed(t, text, t0, op, size = 12.5, y = 50, hi = null, cx = 180) {   // blind view A2: ≥ 12 px
    if (op <= .003 || t < t0) return '';
    const n = text.length, k = Math.min(n, Math.floor(n * clamp((t - t0) / .55) + .001));
    const x0 = cx - n * CW * size / 2;
    let s = `<text x="${f(x0)}" y="${f(y)}" fill="#fff" opacity="${f(.9 * op)}" font-family="Plex" font-weight="600" font-size="${size}">${esc(text.slice(0, k))}</text>`;
    if (k < n) s += `<rect x="${f(x0 + k * CW * size + 1)}" y="${f(y - size * .82)}" width="${f(CW * size * .8)}" height="${f(size * .95)}" fill="#fff" opacity="${f(.7 * op)}"/>`;
    const lw = n * CW * size * clamp((t - t0) / .7);
    s += UN.thread([x0, y + 8], [x0 + lw, y + 8], { opacity: .35 * op, width: .5 });
    s += UN.sphere(x0 - 9, y - size * .33, 1.7, { glow: .6, opacity: op, highlight: false });
    if (hi && hi.op > .003 && k >= hi.at + hi.text.length) {
      const hx = x0 + hi.at * CW * size;
      s += `<text x="${f(hx)}" y="${f(y)}" fill="#fff" opacity="${f(hi.op * op)}" font-family="Plex" font-weight="600" font-size="${size}" filter="url(#un-text-glow)">${esc(hi.text)}</text>`;
      s += `<rect x="${f(hx - 2.5)}" y="${f(y - size * .95)}" width="${f(hi.text.length * CW * size + 5)}" height="${f(size * 1.3)}" rx="2" fill="none" stroke="#fff" stroke-width=".6" opacity="${f(.8 * hi.op * op)}"/>`;
    }
    return s;
  }
  const mono = (x, y, s, op, size = 10) => op > .003 ? UN.mono(x, y, s, { size, anchor: 'middle', opacity: .9 * op }) : '';

  /* ---------- the clock: two faces drift apart → one big hand → a small human tool in the corner ---------- */
  const W0 = 1.55;                                           // hand speed, rad/s (one turn ≈ 4 s)
  const handA = (t, c) => .35 + W0 * (t - c.s0);
  const U0 = [176, 150], D0 = [184, 196], U1 = [96, 104], D1 = [264, 176];
  const CK = [180, 116], RCK = 54, CC = [64, 78], RCC = 20;
  function face(x, y, r, ang, op, o = {}) {
    if (op <= .003 || r < 1) return '';
    let s = TS.clock(x, y, r, ang, { opacity: op, trail: o.trail ?? 0 });
    if (o.thick) {
      const L = r * .74, tx = x + Math.sin(ang) * L, ty = y - Math.cos(ang) * L;
      s += UN.thread([x, y], [tx, ty], { width: 2.2 * o.thick, opacity: .8 * op * o.thick });
      s += `<circle cx="${f(tx)}" cy="${f(ty)}" r="${f(r * .2)}" fill="url(#un-halo)" opacity="${f(.9 * op * o.thick)}"/>`;
    }
    return s;
  }
  const sector = (x, y, L, a0, a1, fill) => {
    const span = Math.min(a1 - a0, 2 * Math.PI - .02);
    if (span <= .01) return '';
    const p0 = [x + Math.sin(a0) * L, y - Math.cos(a0) * L], p1 = [x + Math.sin(a0 + span) * L, y - Math.cos(a0 + span) * L];
    return `<path d="M${f(x)} ${f(y)} L${f(p0[0])} ${f(p0[1])} A${f(L)} ${f(L)} 0 ${span > Math.PI ? 1 : 0} 1 ${f(p1[0])} ${f(p1[1])} Z" fill="#fff" opacity="${f(fill)}"/>`;
  };
  function clocks(t, c, bank) {
    let s = '';
    const A = handA(t, c);
    const appear = B(t, c.s0 + .05, c.s0 + .7);
    const split = B(t, c.chas, c.chto + .1), merge = B(t, c.uch - .05, c.strel - .05);
    const lead = 1.15 * B(t, c.razo - .15, c.mer + .3) * (1 - merge);  // the upper clock runs ahead
    const grow = B(t, c.vr1 - .1, c.strel + .25), corner = B(t, c.strel2 - .05, c.prid + .55);
    const toBank = bank ? B(t, c.newt, c.newt + 1.1) : 0;
    const big = B(t, c.strel - .1, c.strel + .35) * (1 - corner);
    const r = lerp(lerp(lerp(34, 38, split), RCK, grow), RCC, corner);
    const P = (a, b) => [lerp(lerp(a[0], b[0], split), CK[0], merge), lerp(lerp(a[1], b[1], split), CK[1], merge)];
    const U = P(U0, U1), D = P(D0, D1);
    let X = lerp(D[0], CC[0], corner), Y = lerp(D[1], CC[1], corner), R = r;
    if (toBank > 0) { X = lerp(X, bank.x, toBank); Y = lerp(Y, bank.y, toBank); R = lerp(R, bank.r, toBank); }
    if (merge < .999) {
      const angU = A + lead;
      s += face(U[0], U[1], r, angU, appear * (1 - .35 * merge));
      if (lead > .02) {
        // the lead: a lit sector on the upper face from the lower clock's angle to its own
        s += sector(U[0], U[1], r * .6, A, angU, .16 * appear * (1 - merge));
        s += UN.thread(U, [U[0] + Math.sin(A) * r * .6, U[1] - Math.cos(A) * r * .6], { width: .6, opacity: .45 * appear * (1 - merge) });
        // a dashed tie between the two hand tips: same moment, different readings
        const tu = [U[0] + Math.sin(angU) * r * .7, U[1] - Math.cos(angU) * r * .7], td = [D[0] + Math.sin(A) * r * .7, D[1] - Math.cos(A) * r * .7];
        s += `<line x1="${f(tu[0])}" y1="${f(tu[1])}" x2="${f(td[0])}" y2="${f(td[1])}" stroke="#fff" stroke-width=".55" stroke-dasharray="2 3" opacity="${f(.4 * clamp(lead / .5) * (1 - merge))}"/>`;
      }
    }
    // «делённый на время»: the time of the run as a lit sector on the face, labelled t
    const so = B(t, c.del - .15, c.del + .25) * (1 - B(t, c.strel2 - .1, c.strel2 + .4));
    if (so > .003) {
      const a0 = handA(c.skor, c), a1 = handA(Math.min(t, c.runE), c);
      s += sector(X, Y, R * .82, a0, a1, .13 * so);
      const am = (a0 + Math.min(a1, a0 + 2 * Math.PI)) / 2, lx = X + Math.sin(am) * (R + 14), ly = Y - Math.cos(am) * (R + 14);
      if (false) s += mono(lx, ly + 4, 't', so * (.8 + .2 * pulse(t, c.vr2, .25, .6)), 13);
    }
    s += face(X, Y, R, A, appear, { trail: big, thick: big });
    return s;
  }

  /* ---------- t1: the textbook (open wireframe book) and the measured run ---------- */
  const BK = { cx: 180, cy: 290, W: 112, D: 92 };
  const FORMULA = 'v = s / t', FS = 14, FU = .17;
  function book(t, c) {
    const op = B(t, c.uch - .15, c.uch + .3) * (1 - B(t, c.prid - .1, c.prid + .6));
    if (op <= .003) return '';
    const open = B(t, c.uch - .1, c.uch + .7) * (1 - B(t, c.strel2, c.prid + .5));
    const th = (1 - open) * 1.42;                              // page angle from flat (closed ≈ upright)
    const cam = { cx: BK.cx, cy: BK.cy + 12 * (1 - B(t, c.uch - .15, c.uch + .5)), yaw: .07 * Math.sin(t * .31) - .03, pitch: .8, f: 620, distance: 620, scale: 1 };
    // the page curls up out of the gutter (u < .28), then lies almost flat
    const prof = u => -12 * Math.sin(Math.min(1, u / .28) * Math.PI / 2) + 2 * clamp((u - .28) / .72);
    // sg −1 left page, +1 right; u 0 spine → 1 edge; w −.5 near … .5 far; lift moves the point up off the page
    const pt = (sg, u, w, lift = 0) => {
      const px = sg * u * BK.W, py = prof(u) - lift, ph = -sg * th;
      return UN.project([px * Math.cos(ph) - py * Math.sin(ph), px * Math.sin(ph) + py * Math.cos(ph), w * BK.D], cam);
    };
    const path = (pts, close) => pts.map((p, i) => `${i ? 'L' : 'M'}${f(p.x)} ${f(p.y)}`).join(' ') + (close ? ' Z' : '');
    let s = '';
    for (const sg of [-1, 1]) {
      const far = [], near = [];
      for (let k = 0; k <= 12; k++) { far.push(pt(sg, k / 12, .5)); near.push(pt(sg, k / 12, -.5)); }
      const outline = [...far, pt(sg, 1, .25), pt(sg, 1, 0), pt(sg, 1, -.25), ...near.reverse()];
      s += `<path d="${path(outline, true)}" fill="#fff" fill-opacity=".04" stroke="#fff" stroke-width=".75" stroke-opacity=".8"/>`;
      // the page block under the outer edge
      for (let k = 1; k <= 3; k++) s += UN.polyline([pt(sg, .4, -.5, -k * 1.6), pt(sg, 1, -.5, -k * 1.6), pt(sg, 1, .5, -k * 1.6)], { opacity: .22, width: .45 });
      // lines of text: dashes of word lengths, skipping the formula / axis rows
      const rows = sg > 0 ? [.37, .28, -.13, -.22, -.31, -.4] : [.37, .28, -.2, -.29, -.38];
      rows.forEach((w, ri) => {
        let u = .1 + .05 * H(ri * 7 + sg * 3 + 31);
        for (let k = 0; k < 6 && u < .88; k++) {
          const len = .06 + .12 * H(ri * 13 + k * 3 + sg * 5 + 41), u1 = Math.min(.9, u + len);
          s += UN.polyline([pt(sg, u, w), pt(sg, (u + u1) / 2, w), pt(sg, u1, w)], { opacity: ri < 2 ? .5 : .3, width: ri < 2 ? .9 : .6 });
          u = u1 + .035;
        }
      });
    }
    s += UN.polyline([pt(1, 0, -.5), pt(1, 0, .5)], { opacity: .55, width: .7 });
    // left page: the textbook's time axis — an arrow labelled t (lights on «стрелка»), a point runs along it
    const lit = B(t, c.strel - .1, c.strel + .3);
    const a0 = pt(-1, .88, .06), a1 = pt(-1, .12, .06), ah1 = pt(-1, .19, .13), ah2 = pt(-1, .19, -.01);
    s += UN.thread(a0, a1, { opacity: .5 + .45 * lit, width: .9 + .5 * lit });
    if (lit > .01) s += UN.thread(a0, a1, { opacity: .3 * lit, width: 3, glow: true });
    s += UN.thread(a1, ah1, { opacity: .6 + .35 * lit, width: .9 }) + UN.thread(a1, ah2, { opacity: .6 + .35 * lit, width: .9 });
    for (let k = 1; k < 5; k++) { const q = pt(-1, .88 - .15 * k, .06), q2 = pt(-1, .88 - .15 * k, .1); s += UN.thread(q, q2, { opacity: .45, width: .6 }); }
    // blind view v2 A13: the service letters s, t, v are off
    if (lit > .01) { const p = pt(-1, .86 - .7 * mod((t - c.strel) / 1.7, 1), .06); s += UN.sphere(p.x, p.y, 2.3, { glow: .8, opacity: lit, highlight: false }); }
    // right page: the formula lying on the page (affine frame: the chord across the page, the page depth)
    const P0 = pt(1, FU, .07), Pu = pt(1, .9, .07), Pw = pt(1, FU, -.03), ku = 1 / ((.9 - FU) * BK.W), kw = 1 / (.1 * BK.D);
    const mtx = `matrix(${f((Pu.x - P0.x) * ku)} ${f((Pu.y - P0.y) * ku)} ${f((Pw.x - P0.x) * kw)} ${f((Pw.y - P0.y) * kw)} ${f(P0.x)} ${f(P0.y)})`;
    const hiOf = { 0: B(t, c.skor - .05, c.skor + .3), 4: B(t, c.put - .05, c.put + .3), 6: B(t, c.del - .05, c.del + .3), 8: B(t, c.vr2 - .05, c.vr2 + .3) };
    const flash = { 0: pulse(t, c.skor, .25, .8), 4: pulse(t, c.put, .25, .8), 6: pulse(t, c.del, .25, .8), 8: pulse(t, c.vr2, .25, .8) };
    const right = B(t, c.opis, c.opis + .4), ok = B(t, c.prav, c.prav + .35);
    let g = '';
    for (let k = 0; k < FORMULA.length; k++) {
      const ch = FORMULA[k]; if (ch === ' ') continue;
      const h = Math.max(hiOf[k] ?? 0, right), x = k * CW * FS;
      g += `<text x="${f(x)}" y="0" fill="#fff" opacity="${f(.55 + .45 * h)}" font-family="Plex" font-weight="600" font-size="${FS}"${h > .5 ? ' filter="url(#un-text-glow)"' : ''}>${esc(ch)}</text>`;
      const fl = flash[k] ?? 0;
      if (fl > .01) g += `<rect x="${f(x - 2)}" y="${f(-FS * .95)}" width="${f(CW * FS + 4)}" height="${f(FS * 1.25)}" rx="2" fill="none" stroke="#fff" stroke-width=".7" opacity="${f(.85 * fl)}"/>`;
    }
    const fw = FORMULA.length * CW * FS;
    if (right > .01) g += UN.thread([-2, 5], [-2 + (fw + 4) * right, 5], { opacity: .8 * right, width: .9 }) + UN.thread([-2, 8], [-2 + (fw + 4) * right, 8], { opacity: .4 * right, width: .6 });
    if (ok > .01) {
      const d = `M${f(fw + 3)} -4 L${f(fw + 6.5)} -.5 L${f(fw + 13)} -10`;
      g += `<path d="${d}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" opacity="${f(.3 * ok)}" filter="url(#un-soft)"/>`;
      g += `<path d="${d}" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="30" stroke-dashoffset="${f(30 * (1 - ok))}" opacity=".95"/>`;
    }
    s += `<g transform="${mtx}">${g}</g>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // the ruler under the clock: a ball runs at constant speed (v), the covered path gets a bracket (s)
  const TY = 212, TX0 = 50, TX1 = 308;
  function run(t, c) {
    const op = B(t, c.meri - .15, c.meri + .35) * (1 - B(t, c.prid - .1, c.prid + .55));
    if (op <= .003) return '';
    let s = UN.thread([TX0 - 10, TY], [TX1 + 10, TY], { opacity: .55 * op, width: .7 });
    for (let k = 0; k <= 8; k++) { const x = lerp(TX0, TX1, k / 8); s += UN.thread([x, TY - 3], [x, TY + 3], { opacity: (k % 4 ? .35 : .6) * op, width: .6 }); }
    const on = B(t, c.skor - .25, c.skor + .1);
    if (on <= .003) return s;
    const q = clamp((t - c.skor) / (c.runE - c.skor)), bx = lerp(TX0, TX1, q), moving = q > 0 && q < 1 ? 1 : 0;
    if (q > 0) {
      s += UN.thread([TX0, TY], [bx, TY], { opacity: .9 * op, width: 1.1 });
      s += UN.thread([TX0, TY], [bx, TY], { opacity: .25 * op, width: 3, glow: true });
    }
    if (moving) for (let k = 0; k < 3; k++) s += UN.thread([bx - 8 - 7 * k, TY - 7 + 3 * k], [bx - 18 - 9 * k, TY - 7 + 3 * k], { opacity: .5 * op * (1 - k * .25), width: .6 });
    const br = 4.4 * (1 + .12 * pulse(t, c.runE - .05, .2, .6));
    s += UN.sphere(bx, TY - br, br, { glow: .9, opacity: on * op });

    // «путь»: the bracket under the covered path, labelled s
    const sb = B(t, c.put - .1, c.put + .25) * op;
    if (sb > .003 && bx > TX0 + 4) {
      s += `<path d="M${f(TX0)} ${TY + 6} L${f(TX0)} ${TY + 11} L${f(bx)} ${TY + 11} L${f(bx)} ${TY + 6}" fill="none" stroke="#fff" stroke-width=".8" opacity="${f(.85 * sb)}"/>`;
      if (false) s += mono((TX0 + bx) / 2, TY + 26, 's', sb * (.8 + .2 * pulse(t, c.put, .25, .6)), 12);
    }
    return s;
  }

  /* ---------- t2: the star field — the Universe; 3D points flying slowly toward the camera ---------- */
  const NS = 1000, SD = 940, SN = 50, SF = 210;              // stars, depth range, near plane, focal
  function starCam(t, c) {
    const t0 = c.sozd - .2;
    const travel = 16 * Math.max(0, t - t0) + 22 * IB(t, c.dav, 1) + 560 * IB(t, c.Fa, .7);
    const speed = (t > t0 ? 16 : 0) + 22 * B(t, c.dav, c.dav + 1) + 560 * B(t, c.Fa, c.Fa + .7);
    const roll = .045 * (t - t0);
    return { travel, speed, vx: 180 + 16 * Math.sin(t * .13), vy: 196 + 12 * Math.sin(t * .1 + 1), cr: Math.cos(roll), sr: Math.sin(roll) };
  }
  function star(j, t, S) {
    const X = (H(j * 1.31 + 11) * 2 - 1) * 520, Y = (H(j * 2.17 + 13) * 2 - 1) * 900;
    const Z = SN + mod(H(j * 3.07 + 17) * SD - S.travel, SD);
    const x = X * S.cr - Y * S.sr, y = X * S.sr + Y * S.cr, k = SF / Z;
    const depth = 1 - (Z - SN) / SD, h = H(j * 1.9 + 4);
    const op = clamp(depth * 8) * clamp((Z - SN) / 40) * (.5 + .5 * depth) * (.6 + .4 * h) * (.8 + .2 * Math.sin(t * (1.3 + 2 * h) + j));
    return { x: S.vx + x * k, y: S.vy + y * k, Z, op, r: Math.min(2.6, .5 + 70 / Z * (.6 + .6 * h)), h };
  }
  // stars are born from the depth between «создала» and «Вселенная»
  const birth = (j, t, c) => { const b = lerp(c.sozd - .05, c.vsel + .05, H(j + 5)); return B(t, b, b + .35); };
  // the far sky: a faint band of dust across the frame (moves only with the point of view)
  function skyBand(t, c, S, fld) {
    const on = B(t, c.sozd, c.vsel + .5) * fld * (1 - B(t, c.Fa, c.Fa + .9));
    if (on <= .003) return '';
    let d = '';
    for (let i = 0; i < 170; i++) {
      const u = H(i * 1.7 + 601), g = (H(i * 2.3 + 603) + H(i * 3.1 + 607) + H(i * 4.3 + 611) - 1.5) * 52;
      const x = lerp(-30, 390, u) + g * .45 + (S.vx - 180) * .3, y = lerp(338, 52, u) + g + (S.vy - 196) * .3;
      const op = on * (.12 + .3 * H(i + 613)) * (.75 + .25 * Math.sin(t * (1 + H(i + 617)) + i)) * Math.exp(-g * g / 3000);
      if (op > .02) d += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.35 + .3 * H(i + 619))}" opacity="${f(op)}"/>`;
    }
    return `<g fill="#fff">${d}</g>`;
  }
  function galaxies(t, c, S, fld) {
    const on = B(t, c.vsel - .2, c.vsel + .7) * fld, out = B(t, c.Fa, c.Fa + 1.1);
    if (on * (1 - out) <= .003) return '';
    let s = '';
    for (const [gx, gy, R, tilt, spin, seed] of [[76, 270, 30, .5, .24, 3], [292, 84, 22, -.35, -.32, 9]]) {
      const cx = gx + (S.vx - 180) * .5 + (gx - 180) * 1.4 * out, cy = gy + (S.vy - 196) * .5 + (gy - 196) * 1.4 * out;
      const op = on * (1 - out), ct = Math.cos(tilt), st = Math.sin(tilt), sc = 1 + 1.2 * out;
      let d = '';
      for (let k = 0; k < 48; k++) {
        const u = (k + .5) / 48, th = (k % 2) * Math.PI + 4.2 * u + spin * t + (H(k + seed) - .5) * .5, rho = R * Math.pow(u, .8) * sc;
        const px = Math.cos(th) * rho, py = Math.sin(th) * rho * .42;
        d += `<circle cx="${f(cx + px * ct - py * st)}" cy="${f(cy + px * st + py * ct)}" r="${f(.4 + .6 * H(k * 3 + seed))}" opacity="${f((.25 + .6 * (1 - u)) * op * (.8 + .2 * Math.sin(t * 2 + k)))}"/>`;
      }
      s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(R * 1.15 * sc)}" ry="${f(R * .55 * sc)}" fill="url(#un-halo)" opacity="${f(.55 * op)}" transform="rotate(${f(tilt * 57.3)} ${f(cx)} ${f(cy)})"/>`;
      s += `<g fill="#fff">${d}</g>` + UN.sphere(cx, cy, 1.8 * sc, { glow: .7, opacity: op, highlight: false });
    }
    return s;
  }

  /* ---------- the big «?» of stars (t2), Augustine's «?» in the full version (p1) ---------- */
  const QC = { x: 182, y: 190, s: 200 };
  const qYaw = t => .22 * Math.sin(t * .45) + .08 * Math.sin(t * .23 + 1);
  function qWave(t, c) {
    // «Давайте попробуем разобраться» (and Augustine's «пока … знаю»): a light runs along the «?»
    const e1 = c.hasAug ? c.yab + .4 : c.Fa;
    const w1 = B(t, c.dav, c.dav + .4) * (1 - B(t, e1, e1 + .4)), p1 = mod((t - c.dav) / 1.9, 1.35) - .15;
    const w2 = c.hasAug ? B(t, c.poka, c.poka + .4) * (1 - B(t, c.nach, c.nach + .5)) : 0, p2 = mod((t - c.poka) / 2.3, 1.35) - .15;
    return w2 > w1 ? { amp: w2, pos: p2 } : { amp: w1, pos: p1 };
  }
  // dot i of the «?» (= star 2i). liveW — how much of the star is drawn as a plain star.
  function qState(i, t, c, wave) {
    const la = c.qIn + .55 * H(i + 13), a = B(t, la, la + .9);
    if (a <= 0) return { liveW: 1 };
    if (c.hasAug ? t > c.gs + c.gd + .1 : t > c.qRel + 1.2) return { liveW: 1 };
    const G = qGeo(), g = G[i], j = 2 * i;
    const S0 = star(j, la, starCam(la, c)), from = S0.op * birth(j, la, c);
    let P, rel;
    if (t < c.sc) {
      const Q = qPt(g, QC.x, QC.y + 2.2 * Math.sin(t * .7), QC.s, qYaw(t));
      P = { x: lerp(S0.x, Q.x, a), y: lerp(S0.y, Q.y, a), z: Q.z };
      const r0 = c.qRel + .12 * H(i + 31);
      rel = c.hasAug ? 0 : B(t, r0, r0 + .7);
      if (rel > 0) { P.x += (P.x - QC.x) * .9 * rel; P.y += (P.y - QC.y) * .9 * rel; }
    } else {
      // Augustine's «не знаю»: the dots burst out from the touch point and fade; the stars come back
      const Q = qPt(g, QC.x, QC.y + 2.2 * Math.sin(c.sc * .7), QC.s, qYaw(c.sc)), T = qPt(G[150], QC.x, QC.y + 2.2 * Math.sin(c.sc * .7), QC.s, 0), dt = t - c.sc;
      let dx = Q.x - T.x, dy = Q.y - T.y; const n = Math.hypot(dx, dy) || 1; dx /= n; dy /= n;
      const tw = (H(i + 211) - .5) * 1.4, ca = Math.cos(tw), sa = Math.sin(tw);
      const vx = dx * ca - dy * sa, vy = dx * sa + dy * ca, mag = 45 + 110 * H(i + 223), k = 1 - Math.exp(-2.4 * dt);
      const up = vy < 0 ? .5 * clamp((Q.y - 92) / 110) : .85;
      P = { x: Q.x + vx * mag * k, y: Q.y + vy * mag * k * up + 16 * dt, z: Q.z };
      const rb = c.gs + .3 * c.gd * H(i + 31);
      rel = B(t, rb, rb + .7 * c.gd);
    }
    const front = clamp(.6 - P.z * 4), h = g.h, breath = .8 + .2 * Math.sin(t * 2.1 + h * 40);
    const lw = wave.amp * Math.exp(-Math.pow((g.u - wave.pos) / .08, 2));
    const know = c.hasAug ? pulse(t, c.zn, .3, .7) : 0, scQ = c.hasAug ? B(t, c.sc, c.sc + .25) : 0;
    const qop = Math.min(1, 1.2 * (.34 + .55 * front) * (.55 + .45 * h) * breath * (1 + .9 * lw + .5 * know) * (1 - .25 * scQ));
    const qr = (.5 + .85 * h) * (1 + .4 * lw);
    return { x: P.x, y: P.y, op: lerp(from, qop, a) * (1 - rel), r: lerp(S0.r, qr, a), w: a * (1 - rel), u: g.u, ball: BALL(i), liveW: rel };
  }
  // the thread-question (Augustine): from lower left toward the hook, a ball at its tip, wobbling as it searches
  function askThread(t, c) {
    if (!c.hasAug) return '';
    const grow = B(t, c.nach, c.sc), op = B(t, c.nach, c.nach + .3) * (1 - B(t, c.sc + .15, c.sc + .75));
    if (op <= .003) return '';
    const fl = 2.2 * Math.sin(Math.min(t, c.sc) * .7), T = qPt(qGeo()[150], QC.x, QC.y + fl, QC.s, 0);
    const A = { x: 18, y: 318 }, C = { x: 40 + 10 * Math.sin(t * 2.3), y: 205 + 8 * Math.cos(t * 1.7) };
    const pts = [], n = 28;
    for (let j = 0; j <= n; j++) {
      const q = j / n * grow, mq = 1 - q;
      pts.push([mq * mq * A.x + 2 * mq * q * C.x + q * q * T.x, mq * mq * A.y + 2 * mq * q * C.y + q * q * T.y + 2 * Math.sin(q * 9 - t * 4) * (1 - q)]);
    }
    const tip = pts[pts.length - 1];
    let s = UN.polyline(pts, { opacity: .8 * op, width: .7 }) + UN.polyline(pts, { opacity: .25 * op, width: 2.4, glow: true });
    s += UN.sphere(tip[0], tip[1], 3.2, { glow: .9, opacity: op });
    const hit = B(t, c.sc, c.sc + .6);
    if (hit > 0 && hit < 1) s += `<circle cx="${f(T.x)}" cy="${f(T.y)}" r="${f(6 + 46 * hit)}" fill="none" stroke="#fff" stroke-width="${f(1.4 * (1 - hit) + .3)}" opacity="${f(.75 * (1 - hit))}"/>` +
      `<circle cx="${f(T.x)}" cy="${f(T.y)}" r="${f(20 + 30 * hit)}" fill="url(#un-halo)" opacity="${f(.9 * (1 - hit))}"/>`;
    return s;
  }

  /* ---------- Newton's river in 3D (only where «Ньютон» is spoken) ---------- */
  const XR = 340, RW = 112, NR = 500;
  function rcam(t, c) {
    const wob = .05 * Math.sin(t * .21) + .025 * Math.sin(t * .13 + 2);
    return { cx: 180, cy: 224, yaw: lerp(-.42, -.2, B(t, c.newt, c.newt + 4)) + wob, pitch: .66, scale: 1, f: 620, distance: 620 };
  }
  function riverState(t, c) {
    const cam = rcam(t, c);
    const F = 26 * IB(t, c.newt - .2, .7) + 52 * IB(t, c.tech, 1.0);
    const speed = 26 * B(t, c.newt - .2, c.newt + .5) + 52 * B(t, c.tech, c.tech + 1);
    const front = lerp(-XR - 60, XR + 60, B(t, c.newt - .1, c.newt + 1.3));      // the flow fills the frame from the left
    const gone = B(t, c.lb - .2, c.lb + .9);                                       // Leibniz: dots leave for the events
    return { cam, F, speed, front, gone };
  }
  function rdot(j, t, RS) {
    const lane = H(j * 2.1 + 3) * 2 - 1, z = lane * RW * .97;
    const x = -XR + mod(H(j * 1.3 + 7) * 2 * XR + RS.F * (1 + .05 * (1 - lane * lane)), 2 * XR);
    const y = 1.8 * Math.sin(x / 38 + t * 1.3 + j * .7);
    const P = UN.project([x, y, z], RS.cam);
    const edge = clamp((x + XR) / 70) * clamp((XR - x) / 70) * clamp((RS.front - x) / 60);
    const h = H(j * 1.9 + 4), depth = clamp((P.s - .55) / .55);
    const op = (.4 + .6 * h) * (.45 + .55 * depth) * (.82 + .18 * Math.sin(t * 2.1 + h * 40)) * edge;
    return { x: P.x, y: P.y, s: P.s, wx: x, wy: y, z, op, r: (.55 + .75 * h) * P.s, h };
  }
  const bankPt = (x, z, y, RS) => UN.project([x, y, z], RS.cam);
  function riverBanks(t, c, RS) {
    const show = B(t, c.newt - .1, c.newt + 1.1) * (1 - RS.gone);
    if (show <= .003) return '';
    let s = '';
    // a faint body of water between the banks
    const top = [], bot = [];
    for (let x = -XR; x <= Math.min(XR, RS.front); x += 30) { top.push(bankPt(x, RW, 0, RS)); bot.push(bankPt(x, -RW, 0, RS)); }
    if (top.length > 1) {
      const d = top.map((p, i) => `${i ? 'L' : 'M'}${f(p.x)} ${f(p.y)}`).join(' ') + ' ' + bot.reverse().map(p => `L${f(p.x)} ${f(p.y)}`).join(' ') + ' Z';
      s += `<path d="${d}" fill="#fff" opacity="${f(.035 * show)}"/>`;
    }
    for (const [z, o2] of [[-RW - 8, .7], [RW + 8, .45]]) {
      let line = '';
      for (let x = -XR - 20; x <= XR + 20; x += 15) {
        if (x > RS.front + 30) break;
        const p = bankPt(x, z, 1.2 * Math.sin(x / 29 + z), RS);
        line += (line ? ' L' : 'M') + `${f(p.x)} ${f(p.y)}`;
      }
      if (line) s += `<path d="${line}" fill="none" stroke="#fff" stroke-width=".7" opacity="${f(o2 * show)}"/>`;
    }
    // ground texture on both banks (still: only the camera moves them)
    let g = '';
    for (let i = 0; i < 70; i++) {
      const side = i % 2 ? 1 : -1, x = -XR + H(i * 3.7 + 801) * 2 * XR;
      if (x > RS.front) continue;
      const z = side * (RW + 16 + 70 * H(i * 5.1 + 803)), p = bankPt(x, z, 0, RS);
      g += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(.6 * p.s)}" opacity="${f((.18 + .2 * H(i + 805)) * show)}"/>`;
    }
    s += `<g fill="#fff">${g}</g>`;
    // current lines carried by the flow
    for (let k = 0; k < 3; k++) {
      const z = (k - 1) * RW * .55, pts = [];
      for (let x = -XR; x <= Math.min(XR, RS.front); x += 18) { const p = bankPt(x, z, 2 * Math.sin(x / 30 - RS.F / 30 + k * 2.1), RS); pts.push([p.x, p.y]); }
      if (pts.length > 1) s += UN.polyline(pts, { opacity: .12 * show * B(t, c.tech, c.tech + 1), width: .5 });
    }
    return s;
  }
  // measure marks along the near bank: a light runs over them in step with the clock hand
  function marks(t, c, RS) {
    const on = B(t, c.samo - .1, c.samo + .2), out = 1 - RS.gone;
    if (on <= .003 || out <= .003) return '';
    let s = '';
    const ph = (handA(t, c) - handA(c.rovno, c)) / (2 * Math.PI / 8);
    for (let k = 0; k < 11; k++) {
      const x = -280 + 56 * k, a = B(t, c.samo + k * .055, c.samo + k * .055 + .3) * out;
      if (a <= .003) continue;
      const b = bankPt(x, -RW - 14, 0, RS), tp = bankPt(x, -RW - 14, -24, RS);
      const d = mod(ph - k, 11), run = t > c.rovno ? Math.exp(-d * 2.2) * clamp(d / .06 + (d > 5 ? 1 : 0)) : 0;
      s += UN.thread([b.x, b.y], [tp.x, tp.y], { opacity: (.6 + .4 * run) * a, width: .9 + .7 * run });
      s += UN.sphere(tp.x, tp.y, (2.1 + 1.4 * run) * tp.s, { glow: .5 + .5 * run, opacity: a, highlight: false });
      if (run > .15) s += `<circle cx="${f(tp.x)}" cy="${f(tp.y)}" r="${f(9 * tp.s)}" fill="url(#un-halo)" opacity="${f(run * a)}"/>`;
    }
    return s;
  }
  // «ни от чего внешнего»: balls drop onto the banks and flash; the flow does not change
  function outer(t, c, RS) {
    const out = 1 - B(t, Math.min(c.lb, c.end) - .3, Math.min(c.lb, c.end) + .3);
    if (t < c.ni - .05 || out <= .003) return '';
    let s = '';
    const spots = [[-105, RW + 40], [40, -RW - 50], [165, RW + 30], [-20, RW + 75]];
    for (let k = 0; k < spots.length; k++) {
      const t0 = lerp(c.ni, c.zav, k / spots.length), q = clamp((t - t0) / .55);
      if (q <= 0) continue;
      const [x, z] = spots[k], P = bankPt(x, z, 0, RS);
      const fall = q < 1 ? q * q : 1, hgt = (1 - fall) * 110 + (q >= 1 ? 6 * Math.exp(-(t - t0 - .55) * 5) * Math.abs(Math.sin((t - t0 - .55) * 12)) : 0);
      const y = P.y - hgt * P.s - 6 * P.s;
      s += UN.weight(P.x, P.y, 9 * P.s, 2 * P.s, { opacity: .45 * out * fall });
      s += UN.sphere(P.x, y, 6 * P.s, { glow: .8, opacity: out });
      const hit = B(t, t0 + .55, t0 + 1.2);
      if (hit > 0 && hit < 1) s += `<circle cx="${f(P.x)}" cy="${f(P.y)}" r="${f((8 + 26 * hit) * P.s)}" fill="none" stroke="#fff" stroke-width=".7" opacity="${f(.6 * (1 - hit) * out)}"/>`;
    }
    return s;
  }

  /* ---------- Leibniz: events on one thread (only where «Лейбниц» is spoken) ---------- */
  const EX = k => 52 + 64 * k, EY = (k, t) => 200 + 7 * Math.pow((EX(k) - 180) / 128, 2) + 1.4 * Math.sin(t * 1.3 + k * 1.1);
  const evOn = (c, k) => c.lb + .15 + .13 * k, evOff = (c, k) => lerp(c.sob, c.vrem + .2, k / 4);
  function leibniz(t, c) {
    if (!c.leib || t < c.lb - .2) return '';
    let s = '';
    const alive = k => B(t, evOn(c, k), evOn(c, k) + .3) * (1 - B(t, evOff(c, k), evOff(c, k) + .35));
    const pos = k => ({ x: EX(k), y: EY(k, t) });
    for (let k = 1; k < 5; k++) {
      const g = B(t, evOn(c, k) - .2, evOn(c, k) + .1), a = pos(k - 1), b = pos(k);
      const life = Math.min(1 - B(t, evOff(c, k - 1), evOff(c, k - 1) + .35), 1 - B(t, evOff(c, k), evOff(c, k) + .35));
      if (g <= .003 || life <= .003) continue;
      const pts = []; for (let j = 0; j <= 10; j++) { const q = j / 10 * g; pts.push([lerp(a.x, b.x, q), lerp(a.y, b.y, q) - 3 * Math.sin(Math.PI * q)]); }
      s += UN.polyline(pts, { opacity: .75 * life, width: .7 }) + UN.polyline(pts, { opacity: .2 * life, width: 2.4, glow: true });
    }
    for (let k = 0; k < 5; k++) {
      const p = pos(k), a = alive(k), pop = B(t, evOn(c, k), evOn(c, k) + .35);
      if (a > .003) {
        const sc = .4 + .6 * pop + .18 * Math.sin(Math.PI * pop);
        s += UN.weight(p.x, p.y + 13, 11 * sc, 2.4 * sc, { opacity: .5 * a });
        s += UN.sphere(p.x, p.y, 8.5 * sc * (.6 + .4 * a), { glow: .8, opacity: a });
        s += mono(p.x, p.y + 32, String(k + 1), a, 9.6);
      }
      const fl = B(t, evOff(c, k), evOff(c, k) + .55);
      if (fl > 0 && fl < 1) s += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(9 + 22 * fl)}" fill="none" stroke="#fff" stroke-width=".8" opacity="${f(.6 * (1 - fl))}"/>`;
    }
    // blind view v2 A7: «Лейбниц спорил с Ньютоном» — two medallions with large names: НЬЮТОН with the river, ЛЕЙБНИЦ
    // with the beads of events; they stay while the beads go out
    {
      const mo = B(t, c.lb - .1, c.lb + .4) * (1 - B(t, c.end + .1, c.end + .5));
      if (mo > .003) {
        let g = '';
        for (const [x, who] of [[74, 'n'], [286, 'l']]) {
          g += `<circle cx="${x}" cy="118" r="30" fill="#000" stroke="#fff" stroke-width="1.1"/>`;
          if (who === 'n') for (let j = 0; j < 3; j++) { const pts = []; for (let q = 0; q <= 16; q++) { const xx = x - 20 + q * 2.5; pts.push([xx, 110 + j * 8 + 2 * Math.sin(xx * .3 + t * 3 + j)]); } g += UN.polyline(pts, { width: .9, opacity: .9 }); }
          else { g += UN.thread([x - 20, 120], [x + 20, 120], { width: .8, opacity: .8 }); for (let j = 0; j < 3; j++) g += UN.sphere(x - 14 + j * 14, 120, 4, { glow: .6 }); }
          const name = who === 'n' ? 'НЬЮТОН' : 'ЛЕЙБНИЦ', w = name.length * 14 * .64 + 16;
          if (who === 'l') g += `<rect x="${f(x - 38)}" y="62" width="76" height="22" rx="3" fill="#000" stroke="#fff" stroke-width=".8"/><text x="${x}" y="78" fill="#fff" font-family="Plex" font-weight="700" font-size="13" text-anchor="middle">ФИЛОСОФ</text>`;
          g += `<rect x="${f(x - w / 2)}" y="156" width="${f(w)}" height="24" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
            `<text x="${x}" y="173" fill="#fff" font-family="Plex" font-weight="700" font-size="14" text-anchor="middle">${name}</text>`;
        }
        g += UN.thread([116, 118], [244, 118], { width: 1, opacity: .7 }) + UN.polyline([[124, 112], [116, 118], [124, 124]], { width: 1, opacity: .8 }) + UN.polyline([[236, 112], [244, 118], [236, 124]], { width: 1, opacity: .8 });
        s += `<g opacity="${f(mo)}">${g}</g>`;
        // blind view v3 A7: what the dots are — СОБЫТИЯ; what Newton says — ТЕЧЁТ САМО; the conclusion on «нет»
        const pl = (x, y, text, op, size) => { if (op <= .003) return ''; const w = text.length * size * .64 + 16;
          return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - size - 4)}" width="${f(w)}" height="${f(size + 12)}" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
            `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`; };
        s += pl(74, 210, 'ТЕЧЁТ САМО', mo * B(t, c.lb + .3, c.lb + .7), 13) + pl(270, 210, 'СОБЫТИЯ', mo * B(t, c.lb + .5, c.lb + .9), 14);
        const tNo = c.end - .5;
        s += pl(180, 356, 'НЕТ СОБЫТИЙ — НЕТ ВРЕМЕНИ', B(t, tNo - .1, tNo + .3) * (1 - B(t, c.end + .1, c.end + .5)), 15);
      }
    }
    // blind view 03.11: «без событий времени нет» — a clock above the thread runs while there are events, slows as they
    // go out and stops with the last one; then only its dashed ghost stays
    {
      const e0 = evOff(c, 0), eL = Math.max(evOff(c, 4), e0 + .3), cop = B(t, c.lb + .1, c.lb + .6);
      if (cop > .003) {
        let run = Math.min(t, e0) - c.lb;
        const n = 24, u1 = Math.min(t, eL);
        for (let j = 0; j < n && u1 > e0; j++) { const u = e0 + (j + .5) * (u1 - e0) / n; run += (1 - B(u, e0, eL)) * (u1 - e0) / n; }
        const stop = B(t, eL, eL + .6), CY = 300;   // v2: below the thread, the medallions stand above
        s += `<g opacity="${f(cop * (1 - .55 * stop))}">${TS.clock(180, CY, 30, run * 2.1, { trail: .6 * (1 - stop) })}</g>`;
        if (stop > .003) s += `<circle cx="180" cy="${CY}" r="33" fill="none" stroke="#fff" stroke-width=".7" stroke-dasharray="2 3" opacity="${f(.5 * stop)}"/>`;
      }
    }
    // the empty place: a dashed ghost of the thread and the events
    const gop = .3 * B(t, c.vrem, c.vrem + .7) * (1 - B(t, c.Fa + .3, c.Fb));
    if (gop > .003) {
      let d = `M${f(EX(0))} ${f(EY(0, t))}`; for (let k = 1; k < 5; k++) d += ` L${f(EX(k))} ${f(EY(k, t))}`;
      s += `<path d="${d}" fill="none" stroke="#fff" stroke-width=".6" stroke-dasharray="2 3.5" opacity="${f(gop)}"/>`;
      for (let k = 0; k < 5; k++) s += `<circle cx="${f(EX(k))}" cy="${f(EY(k, t))}" r="7" fill="#000" stroke="#fff" stroke-width=".6" stroke-dasharray="1.6 2.4" opacity="${f(gop * 1.4)}"/>`;
    }
    return s;
  }

  // forward dust: points stream out of the centre as the camera moves in (the centre itself stays empty)
  function dust(t, c, z) {
    const on = B(t, c.Fa - .1, c.Fa + .5);
    if (on <= .003) return '';
    let s = '';
    for (let i = 0; i < 56; i++) {
      const a = H(i * 3.3 + 501) * 2 * Math.PI, rho = mod(H(i * 1.7 + 503) + .55 * Math.log(z) + .05 * (t - c.Fa), 1);
      const r = 26 * Math.exp(rho * 2.9), x = 180 + Math.cos(a) * r, y = 205 + Math.sin(a) * r * .95;
      const op = on * Math.sin(Math.PI * rho) * clamp((r - 40) / 50) * .75;
      if (op <= .01) continue;
      const L = 2 + 9 * rho;
      s += `<line x1="${f(x - Math.cos(a) * L)}" y1="${f(y - Math.sin(a) * L)}" x2="${f(x)}" y2="${f(y)}" opacity="${f(op)}"/>`;
    }
    return `<g stroke="#fff" stroke-width=".7" stroke-linecap="round">${s}</g>`;
  }

  function body(t, K, mode) {
    K = K || {};
    const c = cues(K);
    // camera of the fly-in to the apple, plus a slow breath
    const z = Math.exp(1.15 * B(t, c.Fa, c.Fb)) * (1 + .012 * Math.sin(t * .4));
    let s = UN.bokeh(t, { count: 14, opacity: .5, seed: 41 });
    let world = '';

    // ---- the Universe: stars (own 3D camera, outside the zoom) and the «?» gathered from them ----
    let qd = '', qs = '', balls = [];
    if (t > c.sozd - .2) {
      const dimAt = c.river ? Math.min(c.newt, c.t3e) - .4 : c.t3s - .1;   // full: the sky turns into a backdrop for the river
      const S = starCam(t, c), fld = c.full ? 1 - .65 * B(t, dimAt, dimAt + 1) : 1, wave = qWave(t, c);
      const warp = clamp((S.speed - 40) / 300);
      let sk = '', soft = '', sb = '', streak = '', fl = '';
      for (let j = 0; j < NS; j++) {
        let liveW = 1;
        if (j % 2 === 0 && j / 2 < NQ) {
          const q = qState(j / 2, t, c, wave);
          liveW = q.liveW;
          if (q.op > .012) {
            if (q.ball && q.w > .5) balls.push(q);
            else {
              qd += `<circle cx="${f(q.x)}" cy="${f(q.y)}" r="${f(q.r)}" opacity="${f(Math.min(1, q.op))}"/>`;
              if (j % 8 === 0) qs += `<circle cx="${f(q.x)}" cy="${f(q.y)}" r="${f(q.r * 2.3)}" opacity="${f(Math.min(1, q.op) * .45)}"/>`;
            }
          }
        }
        if (liveW <= .003) continue;
        const b = birth(j, t, c); if (b <= .003) continue;
        const st = star(j, t, S), op = Math.min(1, st.op * b * liveW * fld);
        if (op <= .015 || st.x < -12 || st.x > 372 || st.y < -12 || st.y > 420) continue;
        if (j % 23 === 9 && st.Z < 420) sb += UN.sphere(st.x, st.y, 1.1 + st.r * .6, { glow: .5, opacity: op, highlight: false });
        else sk += `<circle cx="${f(st.x)}" cy="${f(st.y)}" r="${f(st.r)}" opacity="${f(op)}"/>`;
        if (j % 4 === 1) soft += `<circle cx="${f(st.x)}" cy="${f(st.y)}" r="${f(st.r * 2.4)}" opacity="${f(op * .4)}"/>`;
        if (warp > .01) {
          const k2 = st.Z / (st.Z + S.speed * .07);
          streak += `<line x1="${f(S.vx + (st.x - S.vx) * k2)}" y1="${f(S.vy + (st.y - S.vy) * k2)}" x2="${f(st.x)}" y2="${f(st.y)}" opacity="${f(op * .7 * warp)}"/>`;
        }
        // «всё вокруг меняется»: some stars flare up now and then
        if (j % 12 === 7) {
          const P = 3.2 + 3.4 * H(j + 31), ph = mod(t + H(j + 37) * P, P), e = Math.exp(-Math.pow((ph - .5) / .22, 2)) * op;
          if (e > .03) {
            const L = 3 + 7 * e;
            fl += `<circle cx="${f(st.x)}" cy="${f(st.y)}" r="${f(5 + 8 * e)}" fill="url(#un-halo)" opacity="${f(.9 * e)}"/>`;
            fl += `<path d="M${f(st.x - L)} ${f(st.y)} L${f(st.x + L)} ${f(st.y)} M${f(st.x)} ${f(st.y - L)} L${f(st.x)} ${f(st.y + L)}" stroke="#fff" stroke-width=".5" opacity="${f(.8 * e)}"/>`;
          }
        }
      }
      s += skyBand(t, c, S, fld) + galaxies(t, c, S, fld);
      s += `<g fill="#fff"><g filter="url(#un-soft)">${soft}</g>${sk}</g>${sb}${fl}`;
      if (streak) s += `<g stroke="#fff" stroke-width=".6" stroke-linecap="round">${streak}</g>`;
    }

    // ---- Newton's river and Leibniz's events (full version, only where they are named) ----
    let RS = null, bank = null;
    if (c.river && t > c.newt - .25) {
      RS = riverState(t, c);
      const bp = UN.project([-92, -48, -RW - 40], RS.cam);
      bank = { x: bp.x, y: bp.y, r: 27 * bp.s };
      world += riverBanks(t, c, RS);
      if (RS.gone < 1) {
        let dots = '', soft = '', streak = '';
        for (let j = 0; j < NR; j++) {
          const R = rdot(j, t, RS);
          let x = R.x, y = R.y, op = R.op;
          if (RS.gone > 0) {      // Leibniz: every dot flies into its event and fades into the ball
            const k = j % 5, g0 = c.lb - .25 + .35 * H(j + 77), gq = B(t, g0, g0 + .6);
            x = lerp(x, EX(k) + (H(j + 91) - .5) * 6, gq); y = lerp(y, EY(k, t) + (H(j + 93) - .5) * 6, gq); op *= 1 - gq * gq;
          }
          if (op <= .012) continue;
          dots += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R.r)}" opacity="${f(Math.min(1, op))}"/>`;
          if (j % 4 === 0) soft += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R.r * 2.3)}" opacity="${f(Math.min(1, op) * .45)}"/>`;
          if (RS.speed > 12 && j % 2 === 0 && RS.gone < .05) {
            const P0 = UN.project([R.wx - RS.speed * .16, R.wy, R.z], RS.cam);
            streak += `<line x1="${f(P0.x)}" y1="${f(P0.y)}" x2="${f(x)}" y2="${f(y)}" opacity="${f(Math.min(1, op) * .45)}"/>`;
          }
        }
        world += `<g fill="#fff"><g filter="url(#un-soft)">${soft}</g>${dots}</g>`;
        if (streak) world += `<g stroke="#fff" stroke-width=".5" stroke-linecap="round">${streak}</g>`;
      }
      world += marks(t, c, RS) + outer(t, c, RS);
    }

    // ---- t1: textbook, ruler, the clock; t2: the clock goes to the corner ----
    world += book(t, c);
    world += run(t, c);
    const ckOut = (1 - B(t, c.lb - .2, c.lb + .5)) * (1 - B(t, c.Fa, c.Fa + .8));
    // v8 A1 (part 1, 0:34–0:38, text with «линейка»): no dotted «?» — the two clocks of the tower, larger, named
    // НАВЕРХУ / ВНИЗУ, the lit sector of their difference between them; the camera pushes in on «меряют»
    const v8 = (K.words?.t1 || []).some(x => norm(x.w).startsWith('линейк'));
    let ckS = ckOut > .003 ? `<g opacity="${f(ckOut)}">${clocks(t, c, bank)}</g>` : '';
    if (v8) {
      const lb = B(t, c.razo - .1, c.razo + .4) * (1 - B(t, c.uch - .5, c.uch)), pl = (x, y, tx) => lb <= .003 ? '' :
        `<g opacity="${f(lb)}"><rect x="${f(x - tx.length * 5.3 - 8)}" y="${f(y - 15)}" width="${f(tx.length * 10.6 + 16)}" height="21" rx="3" fill="#000" fill-opacity=".88" stroke="#fff" stroke-width=".8"/>` +
        `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="14" text-anchor="middle">${tx}</text></g>`;
      ckS += pl(U1[0], U1[1] + 60, 'НАВЕРХУ') + pl(D1[0], D1[1] + 60, 'ВНИЗУ');
      const zc = 1 + .24 * B(t, c.mer - .4, c.mer + .8);
      ckS = `<g transform="translate(180 140) scale(${zc.toFixed(4)}) translate(-180 -140)">${ckS}</g>`;
    }
    world += ckS;
    if (!v8) world += qMark(t, 180, 140, 80, c.chto - .05, c.uch + .05, 3);
    // the clock's caption: «ИНСТРУМЕНТ» under the big clock, «ПРИДУМАЛИ ЛЮДИ» under the small one in the corner
    const inOp = 1 - B(t, c.strel2 - .1, c.strel2 + .35);
    world += typed(t, 'ИНСТРУМЕНТ', c.instr, inOp, 12.5, CK[1] + RCK + 19, { text: 'ИНСТРУМЕНТ', at: 0, op: pulse(t, c.instr2, .25, .9) });
    const pdOp = (1 - B(t, c.Fa, c.Fa + .5)) * (c.hasAug ? 1 - B(t, c.aug - .2, c.aug + .4) : 1) * (1 - B(t, c.newt - .3, c.newt + .2));
    if (false) world += typed(t, 'ПРИДУМАЛИ ЛЮДИ', c.prid + .25, pdOp, 12, CC[1] + RCC + 18, null, CC[0]);

    // ---- the «?» of stars ----
    if (c.qIn < NEVER && t > c.qIn) {
      const hq = B(t, c.qIn + .4, c.qIn + 1.3) * (1 - B(t, c.qRel, c.qRel + .5)), know = c.hasAug ? pulse(t, c.zn, .3, .7) : 0;
      if (hq > .003) world += `<ellipse cx="${f(QC.x + 4)}" cy="${f(QC.y + 6)}" rx="92" ry="126" fill="url(#un-halo)" opacity="${f((.3 + .3 * know) * hq)}"/>`;
    }
    if (qd) world += `<g fill="#fff"><g filter="url(#un-soft)">${qs}</g>${qd}</g>`;
    if (balls.length) {
      const thr = (1 - B(t, Math.min(c.sc, c.qRel), Math.min(c.sc, c.qRel) + .25)) * B(t, c.qIn + 1, c.qIn + 1.8);
      const bs = balls.filter(b => b.u >= 0 && b.u <= 1).sort((a, b) => a.u - b.u);
      if (thr > .01) for (let k = 1; k < bs.length; k++) world += UN.thread(bs[k - 1], bs[k], { opacity: .38 * thr, width: .5 });
      for (const b of balls) world += UN.sphere(b.x, b.y, 2.7, { glow: .55, opacity: Math.min(1, b.op * 1.15) });
    }
    world += askThread(t, c);
    world += leibniz(t, c);

    const cx = 180, cy = 205;
    s += `<g transform="translate(${cx} ${cy}) scale(${z.toFixed(4)}) translate(${-cx} ${-cy})">${world}</g>`;
    // the empty centre the camera flies to (ts_apple puts the apple there); full: a promise flash on «яблоке»
    const tg = (c.full ? B(t, c.Fa - .2, c.end + .2) + .6 * pulse(t, c.yab, .35, .9) : B(t, c.na - .2, c.yab + .4)) * (1 - B(t, c.end + .6, c.end + 2));
    if (tg > .003) s += `<ellipse cx="180" cy="205" rx="120" ry="110" fill="url(#un-halo)" opacity="${f(.26 * Math.min(1, tg))}"/>`;
    s += dust(t, c, z);
    // labels of the thinkers (outside the camera, always readable)
    // blind view 03.11: the thinkers' captions repeated the source line at the top (story.py SOURCES) — off
    if (c.hasAug && false) s += typed(t, 'АВГУСТИН · «ИСПОВЕДЬ» · IV–V В.', c.aug, 1 - B(t, c.gs, c.gs + .6));
    if (c.river && false) s += typed(t, 'НЬЮТОН · «НАЧАЛА» · 1687', c.newt, 1 - B(t, Math.min(c.lb, c.Fa) - .5, Math.min(c.lb, c.Fa) - .05), 10, 50, { text: '1687', at: 20, op: pulse(t, c.newt + .6, .3, .8) });
    if (c.leib && false) s += typed(t, 'ЛЕЙБНИЦ · ПИСЬМА КЛАРКУ · 1716', c.lb, 1 - B(t, c.Fa, c.Fa + .6));
    return s;
  }

  /* blind view v3 A1 (part 1, 0:44–0:57): one clear picture per claim, on top of the old «lecture».
     «течёт само, как река» — a river of flowing lines, a clock face floats on it (plate НЬЮТОН in story.py);
     «Описали правильно — но как инструмент» — one big formula v = s / t with a large ✓, plate ИНСТРУМЕНТ;
     «Стрелку придумали люди» — a dotted hand draws the hand on a clock face;
     «А что создала Вселенная?» — the clock goes out; changes without numbers: a drop falls, a leaf yellows, stars drift;
     the layer fades at the end of the line so the old «?» and the apple of «на яблоке» stay. */
  function riverLayer(t, K) {
    // blind view v4 A1 (part 1, 0:37–0:57): one clear picture per claim, on top of the old «lecture»
    const w1 = K.words?.t1 || [], w2 = K.words?.t2 || [];
    const all = (ws, st) => ws.filter(x => norm(x.w).startsWith(st)).map(x => x.t0);
    const find = (ws, st, n = 0) => { const a = all(ws, st); return a.length > n ? a[n] : null; };
    const tBook = find(w1, 'учебник'), tR0 = find(w1, 'ньютон');
    if (tBook == null) return '';
    // v39/v40: Newton moved to a5 — without him here there is no river and no «Описали правильно»
    const tR = tR0 != null ? tR0 - .1 : 1e6, tArrow = find(w1, 'стрелк') ?? tBook + .8, tInstr0 = find(w1, 'инструмент') ?? tArrow + .6;
    const tSpeed = find(w1, 'скорост') ?? tInstr0 + 1.6, tPath = find(w1, 'путь') ?? tSpeed + .6, tTime2 = find(w1, 'время', 1) ?? tPath + 1;
    const tTaught = find(w1, 'учил') ?? tR + 3, tRight = find(w2, 'правильн') ?? (tR0 != null ? tTaught + 1.2 : 1e6), tInstr = find(w2, 'инструмент') ?? tRight + 1;
    const tHand = find(w2, 'стрелк') ?? (tR0 != null ? tInstr + 1.5 : (K.t2 ?? tBook + 4)), tUni = find(w2, 'вселенн') ?? tHand + 2;
    // v8 A1: the text «…как линейка: им считают скорость. … А что создала Вселенная? Может — сами перемены?»
    const v8 = find(w1, 'линейк') != null && find(w2, 'перемен') != null && tR0 == null;
    const tEnd = v8 ? 1e6 : tUni + 1.4;   // v8: the layer holds to the cut into the apple (and through its dissolve)
    const cov = B(t, tBook - .45, tBook - .05) * (1 - B(t, tEnd - .5, tEnd + .1));
    if (cov <= .003) return '';
    const plate = (x, y, text, op, size = 15) => { if (op <= .003) return ''; const w = text.length * size * .64 + 16;
      return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - size - 4)}" width="${f(w)}" height="${f(size + 12)}" rx="3" fill="#000" fill-opacity=".88" stroke="#fff" stroke-width=".9"/>` +
        `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`; };
    let s = `<rect x="-20" y="-20" width="400" height="680" fill="#000"/>`;
    // textbook as a live example: a ruler (ПУТЬ), a clock (ВРЕМЯ), a person runs along the ruler; СКОРОСТЬ = ПУТЬ / ВРЕМЯ
    const bk = B(t, tBook - .3, tBook + .2) * (1 - B(t, Math.min(tR, tHand) - .4, Math.min(tR, tHand)));
    if (bk > .003 && v8) {   // v8 A1: the ruler across 12–85 % of the width, the runner twice as tall; on «им считают
      // скорость» he runs and the clock's hand runs with him; ВРЕМЯ / ПУТЬ / СКОРОСТЬ = ПУТЬ / ВРЕМЯ larger
      const tIm = find(w1, 'им') ?? tSpeed - .6, run = B(t, tIm - .1, tSpeed + .7), px = lerp(70, 282, run);
      const tLin = find(w1, 'линейк') ?? tIm - .8, rl = B(t, tLin - .2, tLin + .3);
      let g = TS.clock(266, 112, 40, (t - tBook) * .6 + 5 * run, { trail: .3 + .6 * B(t, tIm - .1, tIm + .3) });
      g += `<g opacity="${f(.4 + .6 * rl)}">` + UN.thread([44, 300], [306, 300], { width: 3.2, opacity: .95 });
      for (let k = 0; k <= 12; k++) g += UN.thread([44 + k * 21.83, k % 2 ? 292 : 286], [44 + k * 21.83, 300], { width: 1.2, opacity: .85 });
      g += '</g>';
      g += TS.person(px, 296, 124, { t, pose: run > .02 && run < .98 ? 'walk' : undefined });
      s += `<g opacity="${f(bk)}">${g}</g>`;
      s += plate(184, 118, 'ВРЕМЯ', bk * B(t, tInstr0 - .1, tInstr0 + .3), 18) + plate(175, 336, 'ЛИНЕЙКА', bk * rl * (1 - B(t, tIm - .1, tIm + .2)), 18);
      s += plate(175, 336, 'СКОРОСТЬ = ПУТЬ / ВРЕМЯ', bk * B(t, tIm - .1, tIm + .2), 16);
    } else if (bk > .003) {
      let g = TS.clock(266, 124, 34, (t - tBook) * 1.6, { trail: .6 * B(t, tArrow - .1, tArrow + .4) });
      g += UN.thread([30, 270], [330, 270], { width: 2.4, opacity: .9 });
      for (let k = 0; k <= 10; k++) g += UN.thread([30 + k * 30, 262], [30 + k * 30, 278], { width: 1, opacity: .8 });
      const run = B(t, tSpeed - .2, tTime2 + .3), px = lerp(44, 300, run);
      g += TS.person(px, 266, 70, { t, pose: run > .02 && run < .98 ? 'walk' : undefined });
      s += `<g opacity="${f(bk)}">${g}</g>`;
      s += plate(266, 186, 'ИНСТРУМЕНТ', bk * B(t, tInstr0 - .1, tInstr0 + .3) * (1 - B(t, tTime2 - .4, tTime2)), 14);
      s += plate(266, 186, 'ВРЕМЯ', bk * B(t, tTime2 - .1, tTime2 + .3), 15) + plate(180, 312, 'ПУТЬ', bk * B(t, tPath - .1, tPath + .3), 15);
      s += plate(180, 362, 'СКОРОСТЬ = ПУТЬ / ВРЕМЯ', bk * B(t, tSpeed - .1, tSpeed + .3), 15);
    }
    // river, on «Ньютон»
    const rv = B(t, tR - .3, tR + .3) * (1 - B(t, tRight - .4, tRight));
    if (rv > .003) {
      let g = '';
      for (let j = 0; j < 7; j++) {
        const y0 = 150 + j * 24, pts = [];
        for (let k = 0; k <= 40; k++) { const x = -10 + k * 9.5; pts.push([x, y0 + 4 * Math.sin(x * .035 - t * 2.2 + j * .9) + 2 * Math.sin(x * .09 + t * 1.3)]); }
        g += UN.polyline(pts, { width: 1.1, opacity: .45 + .35 * (j % 2) });
        for (let k = 0; k < 5; k++) { const x = ((k * 77 + j * 31 + t * 55) % 380) - 10; g += `<circle cx="${f(x)}" cy="${f(y0 + 4 * Math.sin(x * .035 - t * 2.2 + j * .9))}" r="1.6" fill="#fff" opacity=".8"/>`; }
      }
      const cx = 40 + 260 * B(t, tR, tRight), cy = 222 + 6 * Math.sin(t * 1.7);
      g += `<circle cx="${f(cx)}" cy="${f(cy)}" r="30" fill="#000" stroke="#fff" stroke-width="1.2"/>` + TS.clock(cx, cy, 26, t * 1.4, { trail: .4 });
      s += `<g opacity="${f(rv)}">${g}</g>` + plate(180, 332, 'ТАК НАС УЧИЛИ', B(t, tTaught - .2, tTaught + .3) * rv, 15);
    }
    // formula with a large check mark, ИНСТРУМЕНТ under it
    const fm = B(t, tRight - .3, tRight + .2) * (1 - B(t, tHand - .4, tHand));
    if (fm > .003) {
      const ck = B(t, tRight + .1, tRight + .5);
      s += `<g opacity="${f(fm)}"><text x="150" y="214" fill="#fff" font-family="Plex" font-weight="700" font-size="40" text-anchor="middle">v = s / t</text>` +
        `<path d="M${f(282)} ${f(200)} L${f(296)} ${f(216)} L${f(296 + 30 * ck)} ${f(216 - 44 * ck)}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
      s += plate(180, 276, 'ИНСТРУМЕНТ', B(t, tInstr - .1, tInstr + .3) * fm, 17);
    }
    // «Стрелку придумали люди»: a person of dots walks up to an empty dial and puts the hand in
    const tSoz = find(w2, 'создал') ?? tUni - .4;
    const hd = B(t, Math.min(tHand, (K.t2 ?? tHand)) - .3, tHand + .2) * (v8 ? 1 - B(t, tSoz - .35, tSoz) : 1 - B(t, tUni - .3, tUni + .1));
    if (hd > .003) {
      const L = 46 * B(t, tHand + .7, tHand + 1.4), walk = B(t, tHand - .2, tHand + .7), px = lerp(60, 112, walk);
      let g = `<circle cx="226" cy="196" r="62" fill="none" stroke="#fff" stroke-width="1.4"/>`;
      for (let k = 0; k < 12; k++) { const a = k / 12 * 2 * Math.PI; g += UN.thread([226 + 54 * Math.sin(a), 196 - 54 * Math.cos(a)], [226 + 60 * Math.sin(a), 196 - 60 * Math.cos(a)], { width: 1, opacity: .8 }); }
      g += `<line x1="226" y1="196" x2="${f(226 + L * Math.sin(.8))}" y2="${f(196 - L * Math.cos(.8))}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` + UN.sphere(226, 196, 4, { glow: .6 });
      g += TS.person(px, 300, 110, { t, pose: walk > .02 && walk < .98 ? 'walk' : undefined });
      s += `<g opacity="${f(hd)}">${g}</g>` + plate(px, 336, 'ЛЮДИ', hd, 16);
    }
    // «А что создала Вселенная?» — a pair: ЛЮДИ → СТРЕЛКА | ВСЕЛЕННАЯ → ? (changes without numbers)
    if (v8) s += changes(t, w2, tSoz, tUni);
    const uv = v8 ? 0 : B(t, tUni - .3, tUni + .2);
    if (uv > .003) {
      let g = TS.clock(84, 196, 42, 1.2, { trail: .2 });
      for (let k = 0; k < 10; k++) { const x = 186 + (H(k + 3201) * 170 + (t - tUni) * 8) % 170, y = 90 + 90 * H(k + 3203); g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.8 + 1.2 * H(k + 3204))}" fill="#fff" opacity=".75"/>`; }
      const st = B(t, tUni + .2, tUni + .8);
      g += `<circle cx="306" cy="110" r="${f(3 + 5 * st)}" fill="#fff" opacity="${f(.4 + .6 * st)}"/>` + `<circle cx="306" cy="110" r="${f(10 + 12 * st)}" fill="#fff" opacity="${f(.15 * st)}"/>`;
      const yl = B(t, tUni, tUni + 1), fall = B(t, tUni + .6, tUni + 1.6), lx = 262 + 14 * Math.sin(fall * 5), ly = 170 + 110 * fall;
      g += `<path d="M${lx - 34} ${ly} Q${lx} ${ly - 40} ${lx + 34} ${ly} Q${lx} ${ly + 40} ${lx - 34} ${ly} Z" fill="rgb(255,${Math.round(lerp(255, 205, yl))},${Math.round(lerp(255, 90, yl))})" fill-opacity="${f(.2 + .55 * yl)}" stroke="#fff" stroke-width="1.2" transform="rotate(${f(-20 + 40 * fall)} ${lx} ${ly})"/>`;
      g += UN.thread([180, 80], [180, 330], { width: .8, opacity: .4 });
      s += `<g opacity="${f(uv)}">${g}</g>` + plate(84, 276, 'ЛЮДИ → СТРЕЛКА', uv, 14) + plate(272, 330, 'ВСЕЛЕННАЯ → ?', uv, 14);
    }
    return `<g opacity="${f(cov)}">${s}</g>`;
  }

  /* v8 A1 (part 1, 0:45–0:50): «А что создала Вселенная? Может — сами перемены?» — no «?»: the changes themselves,
     large. «создала» — a night sky fills with stars and a branch runs across the frame; «Вселенная» — a blossom on it
     turns into an apple; «Может» — the leaf yellows, comes off and falls; then a star lights up; «сами перемены» — the
     apple browns; plate ПЕРЕМЕНЫ. The picture holds through the dissolve into ts_apple/compare. */
  function changes(t, w2, tSoz, tUni) {
    const at = (st, fb) => { const a = w2.find(x => norm(x.w).startsWith(st)); return a ? a.t0 : fb; };
    const tMoz = at('может', tUni + 1.6), tSam = at('сами', tMoz + .8), tPer = at('перемен', tSam + .2);
    const on = B(t, tSoz - .35, tSoz + .1);
    if (on <= .003) return '';
    const P = u => [lerp(lerp(-10, 140, u), lerp(140, 300, u), u), lerp(lerp(160, 112, u), lerp(112, 134, u), u)];
    let g = '';
    // stars
    let st = '';
    for (let k = 0; k < 46; k++) {
      const x = 8 + 344 * H(k + 4101), y = 24 + 330 * H(k + 4103) ** 1.4, a0 = tSoz - .2 + .5 * H(k + 4105);
      st += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.6 + 1.1 * H(k + 4107))}" opacity="${f(B(t, a0, a0 + .4) * (.35 + .4 * H(k + 4109)) * (.7 + .3 * Math.sin(t * 2.1 + k)))}"/>`;
    }
    g += `<g fill="#fff">${st}</g>`;
    // the star that lights up (between the leaf and the apple beats)
    const tStar = tMoz + .45, ig = B(t, tStar - .1, tStar + .35), SX = 296, SY = 74;
    if (ig > .003) {
      const fl = Math.exp(-Math.pow((t - tStar - .3) / .35, 2)), L = 10 + 16 * ig + 22 * fl;
      g += `<circle cx="${SX}" cy="${SY}" r="${f(14 + 26 * ig + 20 * fl)}" fill="url(#un-halo)" opacity="${f(.5 * ig + .4 * fl)}"/>`;
      g += `<path d="M${SX - L} ${SY} L${SX + L} ${SY} M${SX} ${SY - L} L${SX} ${SY + L}" stroke="#fff" stroke-width="${f(1 + 1.4 * fl)}" opacity="${f(.9 * ig)}"/>`;
      g += UN.sphere(SX, SY, 3 + 4 * ig + 3 * fl, { glow: 1, opacity: Math.min(1, ig * 1.2) });
    }
    // the branch
    const br = B(t, tSoz - .3, tSoz + .5), pts = [];
    for (let k = 0; k <= 30; k++) pts.push(P(k / 30 * br));
    g += UN.polyline(pts, { width: 5, opacity: .25, glow: true }) + UN.polyline(pts, { width: 2.4, opacity: .95 });
    const bob = 2 * Math.sin(t * 1.3);
    // the apple: a blossom on «Вселенная», then it sets and swells; it browns on «сами перемены»
    const A0 = P(.72), AX = A0[0] + 3, grow = B(t, tUni + .25, tUni + 1.3), bl = B(t, tUni - .25, tUni + .15) * (1 - B(t, tUni + .35, tUni + .8));
    const AY = lerp(A0[1] + 24, A0[1] + 70, grow) + bob, AR = lerp(7, 48, grow);
    if (br > .7) g += UN.thread([A0[0], A0[1]], [AX, AY - AR * .95], { width: 1.4, opacity: .9 });
    if (bl > .003) {
      let fl = '';
      for (let k = 0; k < 5; k++) { const a = k / 5 * 2 * Math.PI + .3 * t, px = AX + Math.cos(a) * 11 * bl, py = A0[1] + 24 + Math.sin(a) * 11 * bl;
        fl += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(8 * bl)}" ry="${f(5 * bl)}" transform="rotate(${f(a * 57.3)} ${f(px)} ${f(py)})" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width=".8"/>`; }
      g += `<g opacity="${f(bl)}">${fl}</g>` + UN.sphere(AX, A0[1] + 24, 3.2, { glow: .8 });
    }
    if (grow > .02) g += TS.apple(AX, AY, AR, { decay: .68 * B(t, tSam - .3, tPer + .5), t, yaw: .38, opacity: Math.min(1, grow * 3) });
    // the leaf: yellows on «Может», comes off and falls swaying, lies at the bottom
    const L0 = P(.3), yl = B(t, tMoz - .1, tMoz + .55), fall = B(t, tMoz + .5, tPer + .55);
    const lx = lerp(L0[0] + 16, 120, fall) + 26 * Math.sin(fall * 7) * (1 - fall), ly = lerp(L0[1] + 38, 312, fall) + bob * (1 - fall);
    const rot = lerp(70, 160, fall) + 35 * Math.sin(fall * 7) * (1 - fall) + 3 * Math.sin(t * 1.6);
    if (br > .4) {
      if (fall < .05) g += UN.thread(L0, [L0[0] + 10, L0[1] + 12], { width: 1.2, opacity: .9 });
      const col = `rgb(${Math.round(lerp(196, 255, yl))},${Math.round(lerp(232, 196, yl))},${Math.round(lerp(196, 70, yl))})`;
      g += `<g transform="translate(${f(lx)} ${f(ly)}) rotate(${f(rot)})" opacity="${f(B(t, tSoz, tSoz + .5))}">` +
        `<path d="M-38 0 Q0 -26 38 0 Q0 26 -38 0 Z" fill="${col}" fill-opacity="${f(.22 + .5 * yl)}" stroke="#fff" stroke-width="1.2"/>` +
        `<line x1="-36" y1="0" x2="36" y2="0" stroke="#fff" stroke-width=".8" opacity=".7"/>` +
        [-18, -4, 10, 22].map(x => `<path d="M${x} 0 L${x + 9} -10 M${x} 0 L${x + 9} 10" stroke="#fff" stroke-width=".6" opacity=".55" fill="none"/>`).join('') + '</g>';
    }
    // ПЕРЕМЕНЫ: one plate on its word
    const pq = B(t, tPer - .15, tPer + .25);
    if (pq > .003) {
      const w = 8 * 20 * .64 + 16;
      g += `<g opacity="${f(pq)}"><rect x="${f(176 - w / 2)}" y="${f(336 - 24)}" width="${f(w)}" height="32" rx="3" fill="#000" fill-opacity=".88" stroke="#fff" stroke-width="1"/>` +
        `<text x="176" y="336" fill="#fff" font-family="Plex" font-weight="700" font-size="20" text-anchor="middle">ПЕРЕМЕНЫ</text></g>`;
    }
    return `<g opacity="${f(on)}">${g}</g>`;
  }

  /* blind view v3 (part 2 A9): Augustine — the name large; «прошлое — в памяти» an arrow to the left to a head (ПАМЯТЬ);
     «будущее — в ожидании» an arrow to the right to a dashed «?» (ОЖИДАНИЕ); «Есть только „сейчас“» both arrows collapse
     into one bright point (СЕЙЧАС), then the old flash of the scene goes on. */
  function augustineLayer(t, K) {
    const ws = K.words?.p1 || [], find = st => { const a = ws.find(x => norm(x.w).startsWith(st)); return a ? a.t0 : null; };
    const tA = find('августин'); if (tA == null) return '';
    const tP = find('прошлое') ?? tA + 1, tF = find('будущее') ?? tP + 2, tN = find('есть') ?? tF + 2;
    const cov = B(t, tA - .4, tA);   // v5 A9: held to the end of the shot — the old flash read as «a Big Bang»
    if (cov <= .003) return '';
    const plate = (x, y, text, op, size) => { if (op <= .003) return ''; const w = text.length * size * .64 + 16;
      return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - size - 4)}" width="${f(w)}" height="${f(size + 12)}" rx="3" fill="#000" stroke="#fff" stroke-width=".9"/>` +
        `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`; };
    let s = `<rect x="-20" y="-20" width="400" height="680" fill="#000"/>`;
    s += plate(180, 92, 'АВГУСТИН', B(t, tA - .2, tA + .3), 24);
    const col = B(t, tN - .1, tN + .5), CX = 180, CY = 230;
    const pa = B(t, tP - .1, tP + .5) * (1 - col), fa = B(t, tF - .1, tF + .5) * (1 - col);
    const xl = lerp(CX, 72, pa), xr = lerp(CX, 288, fa);
    if (pa > .003) {
      s += `<line x1="${CX}" y1="${CY}" x2="${f(xl)}" y2="${CY}" stroke="#fff" stroke-width="2.4"/>` + UN.polyline([[xl + 12, CY - 9], [xl, CY], [xl + 12, CY + 9]], { width: 2.4, opacity: 1 });
      s += `<g opacity="${f(pa)}"><circle cx="72" cy="${CY - 52}" r="24" fill="none" stroke="#fff" stroke-width="1.2"/>${UN.sphere(72, CY - 54, 5, { glow: .7 })}</g>` + plate(72, CY + 44, 'ПАМЯТЬ', pa, 15);
      s += plate(72, CY - 90, 'ПРОШЛОЕ', pa, 14);
    }
    if (fa > .003) {
      s += `<line x1="${CX}" y1="${CY}" x2="${f(xr)}" y2="${CY}" stroke="#fff" stroke-width="2.4" stroke-dasharray="6 5"/>` + UN.polyline([[xr - 12, CY - 9], [xr, CY], [xr - 12, CY + 9]], { width: 2.4, opacity: 1 });
      s += `<g opacity="${f(fa)}"><text x="288" y="${CY - 36}" fill="#fff" font-family="UNSerif" font-style="italic" font-size="44" text-anchor="middle" opacity=".9">?</text>` +
        `<circle cx="288" cy="${CY - 52}" r="26" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 4"/></g>` + plate(288, CY + 44, 'ОЖИДАНИЕ', fa, 15) + plate(278, CY - 90, 'БУДУЩЕЕ', fa, 14);
    }
    s += UN.sphere(CX, CY, 5 + 9 * col, { glow: 1 }) + plate(CX, CY + 52, 'СЕЙЧАС', col, 18);
    return `<g opacity="${f(cov)}">${s}</g>`;
  }

  SCENES.ts_minds = function (u, p = {}, d, t) {
    const K = p.K || {};
    let svg = body(t, K, p.mode);
    if (p.mode === 'newton' || p.mode === 'universe') svg += riverLayer(t, K);
    if (p.mode === 'augustine') svg += augustineLayer(t, K);
    if (p.mode === 'leibniz') {   // v40 a5: «Ньютон считал, что время течёт само, как река» — the river first, then the Leibniz scene
      const ws = K.words?.a5 || [], fd = st => { const a = ws.find(x => norm(x.w).startsWith(st)); return a ? a.t0 : null; };
      const tN = fd('ньютон'), tL = fd('философ') ?? fd('лейбниц');
      if (tN != null && tL != null && tL - tN > 1) {
        const cv = B(t, tN - .5, tN - .1) * (1 - B(t, tL - .4, tL));
        if (cv > .003) {
          let g = `<rect x="-20" y="-20" width="400" height="680" fill="#000"/>`;
          for (let j = 0; j < 7; j++) { const y0 = 150 + j * 24, pts = []; for (let k = 0; k <= 40; k++) { const x = -10 + k * 9.5; pts.push([x, y0 + 4 * Math.sin(x * .035 - t * 2.2 + j * .9) + 2 * Math.sin(x * .09 + t * 1.3)]); } g += UN.polyline(pts, { width: 1.1, opacity: .45 + .35 * (j % 2) }); }
          const cx = 40 + 260 * B(t, tN, tL), cy = 222 + 6 * Math.sin(t * 1.7);
          g += `<circle cx="${f(cx)}" cy="${f(cy)}" r="30" fill="#000" stroke="#fff" stroke-width="1.2"/>` + TS.clock(cx, cy, 26, t * 1.4, { trail: .4 });
          svg += `<g opacity="${f(cv)}">${g}</g>`;
        }
        // v6: from «Философ Лейбниц» — only two large medallions: НЬЮТОН «ТЕЧЁТ САМО» | ФИЛОСОФ ЛЕЙБНИЦ «НЕТ СОБЫТИЙ — НЕТ ВРЕМЕНИ»
        const tEv = fd('событ') ?? tL + 1.2, nets = ws.filter(x => norm(x.w).startsWith('нет')), tNo = nets.length ? nets[nets.length - 1].t0 : tEv + .8;
        const md = B(t, tL - .4, tL);
        if (md > .003) {
          const pl = (x, y, text, op, size) => { if (op <= .003) return ''; const w = text.length * size * .64 + 16;
            return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - size - 4)}" width="${f(w)}" height="${f(size + 12)}" rx="3" fill="#000" stroke="#fff" stroke-width=".9"/>` +
              `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`; };
          let g = `<rect x="-20" y="-20" width="400" height="680" fill="#000"/>`;
          g += `<circle cx="96" cy="206" r="60" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="264" cy="206" r="60" fill="none" stroke="#fff" stroke-width="1.6"/>`;
          for (let j = 0; j < 4; j++) { const pts = []; for (let q = 0; q <= 20; q++) { const xx = 56 + q * 4; pts.push([xx, 186 + j * 13 + 3 * Math.sin(xx * .25 + t * 3 + j)]); } g += UN.polyline(pts, { width: 1.3, opacity: .9 }); }
          const off = B(t, tNo - .1, tNo + .6);
          g += UN.thread([226, 206], [302, 206], { width: 1, opacity: .8 * (1 - .7 * off) });
          for (let j = 0; j < 3; j++) { const o = 1 - B(t, tEv + j * .25, tEv + j * .25 + .3); g += `<g opacity="${f(Math.max(.15, o))}">${UN.sphere(238 + j * 26, 206, 8, { glow: .8 })}</g>`; }
          svg += `<g opacity="${f(md)}">${g}</g>` + pl(96, 124, 'НЬЮТОН', md, 16) + pl(96, 300, 'ТЕЧЁТ САМО', md, 15) +
            pl(264, 104, 'ФИЛОСОФ', md, 12) + pl(264, 128, 'ЛЕЙБНИЦ', md, 16) +
            pl(264, 300, 'НЕТ СОБЫТИЙ —', B(t, tEv - .1, tEv + .3), 14) + pl(264, 328, 'НЕТ ВРЕМЕНИ', B(t, tNo - .1, tNo + .3), 14);
        }
      }
    }
    if (p.prev !== 'ts_minds') {
      const s0 = (p.s && K[p.s] != null) ? K[p.s] - .05 : t - u, q = B(t, s0, s0 + .7);
      if (q < 1) {
        let prev = '';
        try { if (p.prev && SCENES[p.prev] && typeof SCENES[p.prev].body === 'function') prev = SCENES[p.prev].body(t, K, p.prev_mode); } catch (err) { prev = ''; }
        svg = (prev ? `<g opacity="${f(1 - q)}">${prev}</g>` : '') + `<g opacity="${f(q)}">${svg}</g>`;
      }
    }
    return UN.wrap(svg);
  };
  // v8 A1: the next scene dissolves from .body — the textbook / changes layer goes with it (it covers the «?» of stars)
  // (only for the v8 text with «линейка»: older films dissolve exactly as before)
  SCENES.ts_minds.body = (t, K, mode) => body(t, K, mode) + ((mode === 'newton' || mode === 'universe') &&
    (K?.words?.t1 || []).some(x => norm(x.w).startsWith('линейк')) ? riverLayer(t, K) : '');
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_minds; SCENES.ts_minds = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
