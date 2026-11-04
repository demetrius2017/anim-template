/* «Время — это трансформация» (eps/time_states), сцена ts_apple: яблоко, часы, атом.
 * Одна непрерывная картина по абсолютному t (события — на своих словах из K.words); режим
 * задаёт только нижнюю границу времени, чтобы первый кадр режима читался и в отдельной
 * проверке. Камера — внутри сцены (медленное дыхание масштаба).
 *
 * Режимы (кадры из eps/time_states/build/scene_handoff.json; сверено со script.json 12:27,
 * где порядок a1, a2 → a3 → a4; если a2 переедет после a3, «1 МИН» и сравнение сами уйдут
 * в relative, нить тогда яблоко ↔ атом — флаг T.late):
 *   compare  (a1, a2) слева яблоко из молекул (TS.apple), справа часы (TS.clock).
 *            На входе детали часов из ts_body/promise тихо догорают фоном (свой рисунок, гаснут
 *            к «часы»); «положи» — место яблока на полу, «рядом» — место часов; «яблоко» —
 *            яблоко проявляется на своём слове и садится на место; «часы» — часы проявляются;
 *            «сдвинулась» — стрелка делает шаг; «изменилось» — молекулы яблока смещаются
 *            (поворот + гаснущий след прежней расстановки); «прошла минута» — стрелка делает
 *            полный оборот, моно «1 МИН»; «сравниваем» — нить между яблоком и часами,
 *            «одно» — метка Δ у яблока, «другим» — Δ у часов.
 *   cesium   (a3) с начала фразы — наезд в часы: кольцо циферблата (60 рисок) во весь кадр,
 *            внутри атом (TS.atom); «вместо стрелки» — стрелка гаснет; «колебания» — бежит
 *            волна и счётчик колебаний, кольцо заполняется дугой; «излучения» — волна ярче;
 *            «атома» — импульс от ядра; «цезия» — подпись «ЦЕЗИЙ-133»; «миллиардов» (конец
 *            слова) — счётчик доходит до 9 192 631 770; «секунду» — «= 1 С».
 *   relative (a4) с начала фразы — отъезд: часы уменьшаются вправо вверх, атом выходит
 *            вправо вниз, яблоко возвращается слева, вокруг мелкие частицы; «трансформации» —
 *            всё понемногу дрейфует (стрелка идёт), «пространства» — каркас пространства,
 *            «всё» — частицы ярче, «сдвигается» — дрейф сильнее; «изменение» — нить
 *            связывает яблоко и атом; «одного» — засечки на нити и моно «СЧЁТ ПЕРЕМЕН NN»;
 *            «относительно» — у концов нити отрезки-дельты (где был конец секунду назад).
 *
 * Короткая версия (в K нет ключа a3; 03.11: ts_minds/universe → a1 → a4): всё про цезий — наезд,
 *   кольцо, атом, волна, счётчик 9 192 631 770, «ЦЕЗИЙ-133», «= 1 С» — рисуется только при K.a3.
 *   Без a3 relative — отъезд к яблоку и часам (AP_S, CL_S) среди мелких частиц и каркаса; нить
 *   сравнения из compare гаснет на отъезде, на «изменение» новая нить связывает яблоко и часы,
 *   дальше засечки, «СЧЁТ ПЕРЕМЕН», дельты у концов — как у атома в полной версии.
 * Текст a1 без «положи» (03.11: «Стрелка сдвинулась — яблоко изменилось. «Прошла минута» — ты сравнил
 *   два изменения.»): мест на полу нет, яблоко и часы встают вместе на наплыве (вместо догорающих
 *   деталей часов — звёздная пыль, разлетается к краям), яблоко загорается на «яблоко»; без фразы a2
 *   «прошла / минута / сравнил / два / изменения» берутся из a1 («два» — Δ у яблока, «изменения» — у часов).
 * p: {s, mode, K, prev, prev_mode}. K — cues.json: K[id], K[id+'_end'], K.words[id].
 * Слова: a1 положи, рядом, яблоко, часы, сдвинулась, изменилось; a2 прошла, минута, сравниваем, одно,
 * другим; a3 часы, вместо, стрелки, колебания, излучения, атома, цезия, миллиардов, секунду;
 * a4 трансформации|перемены, пространства|вокруг, всё|всего, сдвигается|вокруг, изменение, одного,
 * относительно. Нет слова — берётся начало фразы (K[id]).
 * Вход: compare владеет наплывом 0,6 с от начала кадра K[p.s]-0.05 из p.prev/p.prev_mode
 *   (ts_minds/universe, ts_minds/leibniz, раньше ts_body/promise; SCENES[p.prev].body, если есть);
 *   дальше prev не вызывается.
 * Выход: ts_strip/slices сам наплывает из SCENES.ts_apple.body(t, K, 'relative').
 * Проверка: scene_test.py ts_apple '{"mode":"compare","K":<cues.json>,"prev":"ts_body",
 *   "prev_mode":"promise"}' --dur 45 --at 13,14,15,... --cam '{"z0":1,"z1":1}'
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, q) => a + (b - a) * q;
  const B = (t, a, b) => TS.between(t, a, b);
  const norm = w => w.toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  // first word of phrase id that starts with one of the stems (n-th match); fallback: phrase start
  const word = (K, id, stems, n = 0) => {
    for (const st of [].concat(stems)) { const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(st))[n]; if (a) return a; }
    return null;
  };
  const cue = (K, id, st, n = 0) => { const a = word(K, id, st, n); return a ? a.t0 : (K[id] ?? 0); };
  const cueE = (K, id, st, n = 0) => { const a = word(K, id, st, n); return a ? a.t1 : (K[id] ?? 0) + .5; };
  const N_CS = 9192631770;
  const group3 = v => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  // Layout (scene coordinates).
  const AP = { x: 98, y: 200, r: 60 }, CL = { x: 268, y: 196, r: 50 };      // compare
  const CLZ = { x: 180, y: 180, r: 142 }, ATZ = { x: 180, y: 140, r: 64 };   // cesium
  const AP_R = { x: 94, y: 196, r: 50 }, CL_R = { x: 284, y: 108, r: 34 }, AT_R = { x: 262, y: 284, r: 42 }; // relative
  const AP_S = { x: 88, y: 208, r: 46 }, CL_S = { x: 274, y: 176, r: 38 };   // relative without a3 (no atom)

  const aplate = (x, y, text, op, size = 14) => { if (op <= .01) return ''; const w = text.length * size * .64 + 16;
    return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - size - 4)}" width="${f(w)}" height="${f(size + 12)}" rx="3" fill="#000" fill-opacity=".88" stroke="#fff" stroke-width=".9"/>` +
      `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`; };
  const times = K => {
    const cs3 = K.a3 != null;                    // the cesium phrase exists (full version)
    const mid = K.a2 != null ? 'a2' : 'a1';      // «прошла минута … сравнил»: own phrase a2 or the tail of a1
    const T = {
      // blind view 03.11: the apple comes on «яблоке» of «Давай проверим — на яблоке» (story.py START_AT, K['t2_2@'])
      start: K['t2_2@'] ?? (K.a1 ?? 0) - .05, cs3, setup: !!word(K, 'a1', 'положи'),
      pol: cue(K, 'a1', 'положи'), rj0: cue(K, 'a1', 'рядом'), rjE: cueE(K, 'a1', 'рядом'),
      yab0: K['t2_2@'] != null ? K['t2_2@'] + .3 : cue(K, 'a1', 'яблоко'), yabE: cueE(K, 'a1', 'яблоко'), chasy: cue(K, 'a1', 'часы'),
      shift: cue(K, 'a1', 'сдвинул'), chg: cue(K, 'a1', 'изменил'),
      ces: (K.a3 ?? 0) - .05, atom: K.a3 ?? 0, chasy3: cueE(K, 'a3', 'часы'),
      instead: cue(K, 'a3', 'вместо'), handE: cueE(K, 'a3', 'стрелк'), osc: cue(K, 'a3', 'колебан'),
      rad: cue(K, 'a3', 'излучен'), atm: cue(K, 'a3', 'атома'), cs: cue(K, 'a3', 'цези'),
      bil: cueE(K, 'a3', 'миллиард'), sec: cue(K, 'a3', 'секунд'),
      late: cs3 && K.a2 != null && K.a2 > K.a3,   // a2 after a3: «1 МИН» and the comparison move to «relative»
      min0: cue(K, mid, 'прошла'), minw: cue(K, mid, 'минута'), min1: cueE(K, mid, 'минута'),
      cmp: cue(K, mid, ['сравнива', 'сравнил']), one: cue(K, mid, ['одно', 'два']), other: cue(K, mid, ['другим', 'изменени']),
      trans: cue(K, 'a4', ['трансформац', 'перемен']), space: cue(K, 'a4', ['пространств', 'вокруг']), all: cue(K, 'a4', ['всё', 'все']),
      shove: cue(K, 'a4', ['сдвига', 'вокруг']), chg4: cue(K, 'a4', 'изменени'), one4: cue(K, 'a4', 'одного'), rel: cue(K, 'a4', 'относительн'),
    };
    const rid = T.late ? 'a2' : 'a4';
    T.rel0 = (K[rid] ?? 0) - .05; T.out0 = K[rid] ?? 0; T.out1 = Math.min(T.out0 + 1.25, K[rid + '_end'] ?? 1e9);
    T.thr = T.late ? T.cmp : T.chg4;   // the apple–atom thread appears here
    if (T.bil <= T.osc + .5) T.bil = T.osc + 2;
    if (T.rjE <= T.pol) T.rjE = T.pol + .6;
    // the apple shows on its own word: a short fade sized by the word itself (0.35..0.6 s)
    T.yabIn = T.yab0 + Math.max(.35, Math.min(.6, T.yabE - T.yab0 + .15));
    return T;
  };

  // small outlined Δ (drawn, not a glyph)
  const delta = (x, y, s, op) => {
    if (op <= .01) return '';
    const d = `M${f(x)} ${f(y - s * .55)} L${f(x + s * .55)} ${f(y + s * .42)} L${f(x - s * .55)} ${f(y + s * .42)} Z`;
    return `<g opacity="${f(op)}"><path d="${d}" fill="none" stroke="#fff" stroke-width="2.2" opacity=".3" filter="url(#un-soft)"/>` +
      `<path d="${d}" fill="none" stroke="#fff" stroke-width=".95" stroke-linejoin="round"/></g>`;
  };
  const bez = (a, c, b, q) => [lerp(lerp(a[0], c[0], q), lerp(c[0], b[0], q), q), lerp(lerp(a[1], c[1], q), lerp(c[1], b[1], q), q)];

  // Big ring of the clock seen from inside: 60 second ticks, a fading hand and a progress arc.
  function ring(x, y, r, pr, op, t, hand) {
    if (op <= .01) return '';
    let s = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#un-halo)" opacity="${f(.1 + .03 * Math.sin(t * 1.3))}"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="3" opacity=".25" filter="url(#un-soft)"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff" stroke-width=".9" opacity=".85"/>`;
    for (let k = 0; k < 60; k++) {
      const a = k * Math.PI / 30, big = k % 5 === 0, lit = k / 60 < pr - 1e-6 ? 1 : 0;
      const r1 = r * (big ? .88 : .935), r2 = r * .975;
      s += UN.thread([x + Math.sin(a) * r1, y - Math.cos(a) * r1], [x + Math.sin(a) * r2, y - Math.cos(a) * r2],
        { width: big ? 1.1 : .55, opacity: (big ? .55 : .25) + .45 * lit });
    }
    if (hand.op > .01) {
      const L = r * .7, tx = x + Math.sin(hand.a) * L, ty = y - Math.cos(hand.a) * L;
      s += `<g opacity="${f(hand.op)}">${UN.thread([x, y], [tx, ty], { width: 1.6, opacity: .9 })}${UN.thread([x, y], [tx, ty], { width: 5, opacity: .2, glow: true })}${UN.sphere(tx, ty, 6, { glow: .9 })}</g>`;
    }
    if (pr > .002) {
      const pts = [], n = Math.max(2, Math.ceil(90 * pr)), R = r + 6;
      for (let k = 0; k <= n; k++) { const a = k / n * pr * 2 * Math.PI; pts.push([x + Math.sin(a) * R, y - Math.cos(a) * R]); }
      s += UN.polyline(pts, { opacity: .35, width: 3.2, glow: true });
      s += UN.polyline(pts, { opacity: .95, width: 1.1 });
      const e = pts[pts.length - 1];
      s += UN.sphere(e[0], e[1], 3.2, { glow: .9 });
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  // radiation wave running outward from the centre x0
  function wave(x0, y0, half, cycles, t, op, glow) {
    if (op <= .01) return '';
    const pts = [], n = 120, k = cycles * 2 * Math.PI / half;
    for (let i = 0; i <= n; i++) {
      const x = x0 - half + 2 * half * i / n, d = Math.abs(x - x0);
      const env = Math.pow(Math.sin(Math.PI * i / n), .8);
      pts.push([x, y0 + 7.5 * env * Math.sin(k * d - t * 11)]);
    }
    return `<g opacity="${f(op)}">${UN.polyline(pts, { opacity: .35 + .4 * glow, width: 2.6 + 2 * glow, glow: true })}${UN.polyline(pts, { opacity: .9, width: .8 })}</g>`;
  }

  // apple state (yaw, decay) as a function of time only
  const appleState = (t, T) => ({
    yaw: .35 + .34 * B(t, T.chg, T.chg + .6) + .3 * B(t, T.min0, T.min1) + .25 * Math.sin(Math.max(0, t - T.trans) * .45) * B(t, T.trans, T.trans + 1),
    // blind view 03.11: «яблоко чуть изменилось» must be seen — each step of change is a visible step of decay
    decay: .16 * B(t, T.chg, T.chg + .6) + .12 * B(t, T.min0, T.min1) + .08 * B(t, T.trans, T.rel + 1.5),
  });

  // «положи рядом»: two soft places on a faint floor where the apple and the clock will stand
  const FLOOR = 266;
  const place = (x, rx, op, t, k) => {
    if (op <= .01) return '';
    const r = rx * (1 + .04 * Math.sin(t * 2.2 + k)), e = `cx="${f(x)}" cy="${FLOOR}" rx="${f(r)}" ry="${f(r * .2)}"`;
    return `<g opacity="${f(op)}"><ellipse ${e} fill="url(#un-halo)" opacity="${f(.8 + .2 * Math.sin(t * 1.7 + k))}"/>` +
      `<ellipse ${e} fill="none" stroke="#fff" stroke-width="2.4" opacity=".22" filter="url(#un-soft)"/>` +
      `<ellipse ${e} fill="none" stroke="#fff" stroke-width=".8" opacity=".7"/>` +
      `${UN.sphere(x, FLOOR - r * .2, 2.2, { glow: .7, highlight: false, opacity: .8 })}</g>`;
  };
  function spots(t, T) {
    const pa = B(t, T.pol, T.pol + .45) * (1 - B(t, T.yabIn, T.yabIn + .6));
    const pc = B(t, T.rj0, T.rjE) * (1 - B(t, T.chasy + .55, T.chasy + 1.15));
    const ln = B(t, T.pol + .1, T.rjE) * (1 - B(t, T.chasy, T.chasy + 1.15));
    let s = '';
    if (ln > .01) s += UN.thread([AP.x - 40, FLOOR], [CL.x + 40, FLOOR], { width: .6, opacity: .2 * ln });
    return s + place(AP.x, AP.r * .82, pa, t, 0) + place(CL.x, CL.r * .9, pc, t, 2);
  }

  // the clock details of ts_body/promise quietly burn out in the background (own drawing, no prev call);
  // a1 without «положи»: star dust flying apart to the edges as the camera comes in from the starfield
  function embers(t, T) {
    const op = T.setup ? 1 - B(t, T.yab0, T.chasy + .6) : 1 - B(t, T.start + .15, T.start + 1.1);
    if (op <= .01) return '';
    const age = Math.max(0, t - T.start);
    let dots = '', bits = '', balls = '';
    for (let i = 0; i < 32; i++) {
      const h1 = UN.hash(i + 701), h2 = UN.hash(i + 733), h3 = UN.hash(i + 769);
      const a = h1 * 2 * Math.PI, d = 18 + 80 * h2 + (8 + 14 * h3) * age;
      const x = 180 + Math.cos(a) * d * 1.15, y = 188 + Math.sin(a) * d * .9 + 5 * age;
      const o = op * (.3 + .45 * h2) * (.6 + .4 * Math.sin(t * (2 + 2 * h3) + i));
      if (i % 6 === 1) balls += UN.sphere(x, y, 1.6 + 1.2 * h3, { opacity: o, glow: .6, highlight: false });
      else if (i % 4 === 0 && T.setup) {
        const L = 3 + 3.5 * h3, sp = a + age * (.8 + h1);
        bits += UN.thread([x - Math.cos(sp) * L, y - Math.sin(sp) * L], [x + Math.cos(sp) * L, y + Math.sin(sp) * L], { width: .7, opacity: o });
      } else dots += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.6 + .9 * h3)}" opacity="${f(o)}"/>`;
    }
    return `<g fill="#fff">${dots}</g>${bits}${balls}`;
  }

  // slow drift of an object in «relative» (grows on «трансформации», more on «сдвигается»)
  const drift = (t, T, k, amp) => {
    const m = B(t, T.trans, T.space + .4) * (.7 + .3 * B(t, T.shove, T.shove + .8) + .35 * B(t, T.rel - .4, T.rel + .4)), u = t - T.trans;
    return [amp * m * Math.sin(u * (.5 + .1 * k) + k * 1.7), amp * .8 * m * Math.sin(u * (.42 + .08 * k) + k * 2.9 + 1.2)];
  };

  function body(t, K, mode, p = {}) {
    const T = times(K);
    const lo = mode === 'cesium' ? T.ces : mode === 'relative' ? T.rel0 : T.start;
    const tt = Math.max(t, lo);
    const zi = T.cs3 ? B(tt, T.atom, T.chasy3 + .45) : 0;   // dolly into the clock (only with the cesium phrase a3)
    const APr = T.cs3 ? AP_R : AP_S, CLr = T.cs3 ? CL_R : CL_S;   // where «relative» puts the apple and the clock
    const zo = B(tt, T.out0, T.out1 + .3);               // pull back to the field
    const keep = 1 - zi + zi * zo;                       // things outside the clock
    let s = '';

    s += UN.bokeh(tt, { count: 12, opacity: .45, seed: 23 });

    // space wireframe and particles («relative»)
    if (zo > .01) {
      const sp = B(tt, T.space, T.space + .9), bright = .5 + .5 * B(tt, T.all, T.all + .6);
      if (sp > .01) s += `<g opacity="${f(sp * zo)}">${UN.surface((x, z) => 7 * Math.sin(x / 48 + tt * .7) * Math.cos(z / 55 - tt * .45),
        { span: 420, steps: 14, opacity: .13 }, { cy: 300, pitch: 1.05, yaw: -.22 })}</g>`;
      let dots = '', balls = '';
      for (let i = 0; i < 40; i++) {
        const h1 = UN.hash(i + 401), h2 = UN.hash(i + 451), h3 = UN.hash(i + 503);
        const [dx, dy] = drift(tt, T, i % 7 + h3, 14 + 10 * h3);
        const x = 18 + h1 * 324 + dx, y = 26 + h2 * 320 + dy, tw = .75 + .25 * Math.sin(tt * 1.7 + i);
        if (i % 5 === 0) balls += UN.sphere(x, y, 1.6 + 1.4 * h3, { opacity: .7 * bright * tw, glow: .5, highlight: false });
        else dots += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.6 + .7 * h3)}" opacity="${f((.3 + .4 * h3) * bright * tw)}"/>`;
      }
      s += `<g opacity="${f(zo)}"><g fill="#fff">${dots}</g>${balls}</g>`;
    }

    // ---------- compare entrance: embers of the previous scene, then the two places ----------
    if (zi < .99 && tt < T.chasy + 1.2) s += `<g opacity="${f(1 - zi)}">${embers(tt, T)}${T.setup ? spots(tt, T) : ''}</g>`;

    // ---------- apple (shows on the word «яблоко» and settles onto its place; a1 without «положи»:
    // stands from the dissolve at half light and lights up on «яблоко») ----------
    const appear = T.setup ? B(tt, T.yab0, T.yabIn) : B(tt, T.start, T.start + .6);
    const lit = T.setup ? 1 : .5 + .5 * B(tt, T.yab0, T.yab0 + .4);
    const apOff = drift(tt, T, 1, 13);
    const ap = {
      x: lerp(lerp(AP.x, -95, zi), APr.x, zo) + apOff[0],
      y: lerp(AP.y, APr.y, zo) + apOff[1] - 16 * (1 - appear),
      r: lerp(lerp(AP.r, AP.r * 1.2, zi), APr.r, zo),
    };
    // blind view v4 A2: during «пока чайник кипел — прочитал страницу» the kettle and the page take the places of the apple and the clock
    const wK0 = word(K, 'a1', 'чайник'), wO0 = word(K, 'a1', ['одну', 'перемен']), wP0 = word(K, 'a1', 'прочитал');
    const kSwap = wK0 ? B(tt, wK0.t0 - .3, wK0.t0 + .1) * (1 - B(tt, (wO0 ? wO0.t0 : wK0.t0 + 3) + .8, (wO0 ? wO0.t0 : wK0.t0 + 3) + 1.3)) : 0;
    const apOp = appear * lit * keep * (1 - kSwap);
    if (!T.setup) {
      const pq = clamp((tt - T.yab0) / .8);
      if (pq > 0 && pq < 1) s += `<circle cx="${f(ap.x)}" cy="${f(ap.y)}" r="${f(ap.r * (.95 + .5 * pq))}" fill="none" stroke="#fff" stroke-width="1.2" opacity="${f(.5 * (1 - pq) * keep)}" filter="url(#un-soft)"/>`;
    }
    if (apOp > .01) {
      const st = appleState(tt, T), st0 = appleState(tt - .45, T);
      const moving = clamp(Math.abs(st.yaw - st0.yaw) / .12) * (1 - B(tt, T.trans, T.trans + .5));
      if (moving > .02) s += TS.apple(ap.x, ap.y, ap.r, { yaw: st0.yaw, decay: st0.decay, t: tt - .45, opacity: .32 * moving * apOp });
      s += TS.apple(ap.x, ap.y, ap.r, { yaw: st.yaw, decay: st.decay, t: tt, opacity: apOp });
    }

    // ---------- clock ----------
    const clOff = drift(tt, T, 3, 9);
    const cl = {
      x: lerp(lerp(CL.x, CLZ.x, zi), CLr.x, zo) + clOff[0],
      y: lerp(lerp(CL.y, CLZ.y, zi), CLr.y, zo) + clOff[1],
      r: lerp(lerp(CL.r, CLZ.r, zi), CLr.r, zo),
    };
    const clIn = B(tt, T.chasy, T.chasy + .55);
    const stepQ = B(tt, T.shift, T.shift + .16), bounce = .12 * Math.sin(Math.PI * clamp((tt - T.shift - .12) / .3)) * stepQ;
    const ang = -Math.PI / 6 + Math.PI / 6 * (stepQ + bounce) + 2 * Math.PI * B(tt, T.min0, T.min1) + .8 * Math.max(0, tt - T.trans);
    const sweep = clamp((tt - T.min0) / .4) * (1 - clamp((tt - T.min1) / .4));
    const cq = clamp((tt - T.osc) / Math.max(.3, T.bil - T.osc));   // count of oscillations, 0..1
    if (clIn * keep > .01) {
      s += `<circle cx="${f(cl.x)}" cy="${f(cl.y)}" r="${f(cl.r * (1.09 + .03 * Math.sin(tt * 1.6)))}" fill="none" stroke="#fff" stroke-width=".5" opacity="${f(.18 * clIn * keep)}"/>`;
      s += TS.clock(cl.x, cl.y, cl.r, ang, { opacity: clIn * keep * (1 - kSwap), trail: .35 + .65 * sweep });
    }
    s += ring(cl.x, cl.y, cl.r, cq, zi * (1 - zo), tt, { a: ang, op: 1 - B(tt, T.instead, T.handE + .2) });
    const mn = B(tt, T.minw, T.minw + .35) * (T.late ? zo : (1 - zi) * (1 - zo)) * (1 - B(tt, T.trans, T.trans + .6));
    if (mn * (1 - kSwap) > .01) s += UN.mono(cl.x, cl.y - cl.r - 14, '1 МИН', { size: 14, anchor: 'middle', opacity: .95 * mn * (1 - kSwap), glow: true });

    // ---------- compare: thread apple ↔ clock with Δ marks (when a2 comes before a3); without a3 it
    // fades on the pull-back of «relative» ----------
    const gc = T.late ? 0 : B(tt, T.cmp, T.cmp + .75) * (1 - zi) * (1 - zo);
    if (gc > .01) {
      const a = [ap.x + .72 * ap.r, ap.y + .62 * ap.r], b = [cl.x - .74 * cl.r, cl.y + .66 * cl.r];
      const c = [(a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 46], gg = B(tt, T.cmp, T.cmp + .75), fade = (1 - zi) * (1 - zo) * (1 - kSwap);   // v4: hidden while the kettle and the page stand in
      const pts = []; for (let k = 0; k <= 28; k++) pts.push(bez(a, c, b, k / 28 * gg));
      s += `<g opacity="${f(fade)}">${UN.polyline(pts, { opacity: .3, width: 2.6, glow: true })}${UN.polyline(pts, { opacity: .85, width: .7 })}`;
      s += UN.sphere(a[0], a[1], 2.4, { glow: .6, highlight: false });
      if (gg > .98) {
        s += UN.sphere(b[0], b[1], 2.4, { glow: .6, highlight: false });
        const q = .5 + .5 * Math.sin((tt - T.cmp) * 2.4 - Math.PI / 2), m = bez(a, c, b, q);
        s += UN.sphere(m[0], m[1], 3.3, { glow: 1 });
      }
      // blind view v4 A2: no Δ — the ends of the thread are named on their words: ЯБЛОКО and СТРЕЛКА
      const wS = word(K, 'a1', 'стрелк', 1) || word(K, 'a1', 'стрелк'), wA = word(K, 'a1', 'яблок', 1) || word(K, 'a1', 'яблок');
      if (wS) s += aplate(b[0], b[1] + 34, 'СТРЕЛКА', B(tt, wS.t0 - .1, wS.t0 + .3), 14);
      if (wA) s += aplate(a[0], a[1] + 34, 'ЯБЛОКО', B(tt, wA.t0 - .1, wA.t0 + .3), 14);
      s += '</g>';
    }

    // ---------- atom ----------
    const atOff = drift(tt, T, 5, 12);
    const atp = { x: lerp(ATZ.x, AT_R.x, zo) + atOff[0], y: lerp(ATZ.y, AT_R.y, zo) + atOff[1], r: lerp(ATZ.r, AT_R.r, zo) };
    const atOp = T.cs3 ? B(tt, T.atom + .1, T.chasy3 + .6) : 0;
    if (atOp > .01) {
      s += TS.atom(atp.x, atp.y, atp.r * (.55 + .45 * zi), { phase: tt * 2.6, rings: 2, opacity: atOp });
      const pulse = clamp((tt - T.atm) / .9);
      if (pulse > 0 && pulse < 1) s += `<circle cx="${f(atp.x)}" cy="${f(atp.y)}" r="${f(12 + 70 * pulse)}" fill="none" stroke="#fff" stroke-width="1.4" opacity="${f(.6 * (1 - pulse))}" filter="url(#un-soft)"/>`;
    }

    // ---------- cesium read-outs inside the ring ----------
    const inside = zi * (1 - zo), txt = zi * clamp(1 - zo * 2.5);
    if (txt > .01) {
      const k = cl.r / CLZ.r, wy = cl.y + 46 * k, half = Math.sqrt(Math.max(0, cl.r * cl.r - (wy - cl.y) ** 2)) * .82;
      s += `<g opacity="${f(txt)}">`;
      s += wave(cl.x, wy, half, 3 + 15 * cq, tt, .9 * B(tt, T.osc, T.osc + .5), B(tt, T.rad, T.rad + .4));
      const cOp = B(tt, T.osc, T.osc + .35);
      if (cOp > .01) {
        const v = cq >= 1 ? N_CS : Math.floor(N_CS * (Math.exp(7 * cq) - 1) / (Math.exp(7) - 1));
        s += UN.mono(cl.x, wy + 22, 'КОЛЕБАНИЯ', { size: 9.4, anchor: 'middle', opacity: .6 * cOp });
        s += UN.mono(cl.x, wy + 44, group3(v), { size: 16, anchor: 'middle', opacity: cOp, glow: cq >= 1 });
      }
      const csOp = B(tt, T.cs, T.cs + .4);
      if (csOp > .01) s += UN.mono(cl.x, cl.y - cl.r * .64, 'ЦЕЗИЙ-133', { size: 10.5, anchor: 'middle', opacity: .9 * csOp });
      const secOp = B(tt, T.sec, T.sec + .4);
      if (secOp > .01) s += UN.mono(cl.x, wy + 70, '= 1 С', { size: 15, anchor: 'middle', opacity: secOp, glow: true });
      s += '</g>';
    }

    // ---------- relative: thread apple ↔ atom (without a3: apple ↔ clock), Δ marks, tally, delta segments ----------
    const g = B(tt, T.thr, T.thr + .75) * zo;
    if (g > .01) {
      // far end of the thread: [point, its drift now, drift seed k, drift amplitude]
      const [b, bOff, bk, bamp] = T.cs3 ? [[atp.x - .55 * atp.r, atp.y - .05 * atp.r], atOff, 5, 12]
        : [[cl.x - 1.02 * cl.r, cl.y + .32 * cl.r], clOff, 3, 9];
      const a = [ap.x + .9 * ap.r, ap.y + .2 * ap.r];
      const c = [(a[0] + b[0]) / 2 - 12, (a[1] + b[1]) / 2 + 26];
      const pts = []; for (let k = 0; k <= 28; k++) pts.push(bez(a, c, b, k / 28 * g));
      s += UN.polyline(pts, { opacity: .3, width: 2.6, glow: true }) + UN.polyline(pts, { opacity: .85, width: .7 });
      s += UN.sphere(a[0], a[1], 2.4, { glow: .6, highlight: false });
      if (g > .98) {
        s += UN.sphere(b[0], b[1], 2.4, { glow: .6, highlight: false });
        const q = .5 + .5 * Math.sin((tt - T.thr) * 2.2 - Math.PI / 2), m = bez(a, c, b, q);
        s += UN.sphere(m[0], m[1], 3.2, { glow: 1, opacity: 1 - B(tt, T.one4, T.one4 + .4) });
      }
      const dq = B(tt, T.rel, T.rel + .5);
      if (T.late) {
        s += delta(a[0] - 4, a[1] + 20, 12, B(tt, T.one, T.one + .35) * (1 - dq));
        s += delta(b[0] - 4, b[1] + 22, 12, B(tt, T.other, T.other + .35) * (1 - dq));
      }
      // tally: one notch per counted change
      if (g > .98 && tt > T.one4) {
        const n = Math.max(0, Math.floor((tt - T.one4 - .3) / .3) + 1), MAXN = 15;
        for (let j = 0; j < Math.min(n, MAXN); j++) {
          const q = (j + 1) / (MAXN + 1), m = bez(a, c, b, q), m2 = bez(a, c, b, q + .01);
          const L = Math.hypot(m2[0] - m[0], m2[1] - m[1]) || 1, nx = -(m2[1] - m[1]) / L, ny = (m2[0] - m[0]) / L;
          const fresh = clamp((tt - (T.one4 + .3 + j * .3)) / .25);
          s += UN.thread([m[0] - nx * 5, m[1] - ny * 5], [m[0] + nx * 5, m[1] + ny * 5], { width: .85, opacity: .4 + .55 * fresh });
        }
        const lab = B(tt, T.one4 + .2, T.one4 + .6);
        if (false) s += UN.mono(APr.x + 10, APr.y + 92, 'СЧЁТ ПЕРЕМЕН ' + String(Math.min(n, 99)).padStart(2, '0'), { size: 10, anchor: 'middle', opacity: .85 * lab });
      }
      // delta segments: where both ends were a second ago
      if (dq > .01) {
        const back = tt - 1.1, ao = drift(back, T, 1, 13), bo = drift(back, T, bk, bamp);
        const a0 = [a[0] - apOff[0] + ao[0], a[1] - apOff[1] + ao[1]], b0 = [b[0] - bOff[0] + bo[0], b[1] - bOff[1] + bo[1]];
        for (const [p0, p1, side] of [[a0, a, -1], [b0, b, 1]]) {
          s += `<g opacity="${f(dq)}"><circle cx="${f(p0[0])}" cy="${f(p0[1])}" r="2.6" fill="none" stroke="#fff" stroke-width=".6" opacity=".7"/>`;
          s += `<path d="M${f(p0[0])} ${f(p0[1])} L${f(p1[0])} ${f(p1[1])}" stroke="#fff" stroke-width=".9" stroke-dasharray="1.6 1.6" opacity=".9" fill="none"/></g>`;
          s += delta(p0[0] + side * 4, p0[1] + 18, 10, dq * .9);
        }
      }
    }

    // blind view v2 A10: «яблоко чуть изменилось» — a spot on the apple's side darkens and is ringed at the same moment
    // as the hand's step; it stays marked through «два изменения»
    if (mode === 'compare') {
      const mk = B(tt, T.chg - .25, T.chg + .1) * (1 - B(tt, T.out0 - .6, T.out0 - .1));
      if (mk > .01) {
        const sx = ap.x + ap.r * .38, sy = ap.y + ap.r * .16, pr = clamp((tt - T.chg) / .9);   // v3: larger, on the word
        s += `<circle cx="${f(sx)}" cy="${f(sy)}" r="${f(ap.r * .3)}" fill="#000" opacity="${f(.85 * mk)}"/>`;
        for (let k = 0; k < 7; k++) { const a = k * 2.4; s += `<circle cx="${f(sx + ap.r * .2 * Math.cos(a) + 3 * mk)}" cy="${f(sy + ap.r * .2 * Math.sin(a) + 2 * mk)}" r="2.2" fill="#777" opacity="${f(mk)}"/>`; }
        s += `<circle cx="${f(sx)}" cy="${f(sy)}" r="${f(ap.r * .42)}" fill="none" stroke="#fff" stroke-width="2" opacity="${f(.95 * mk)}"/>`;
        if (pr > 0 && pr < 1) s += `<circle cx="${f(sx)}" cy="${f(sy)}" r="${f(ap.r * (.3 + .4 * pr))}" fill="none" stroke="#fff" stroke-width="1" opacity="${f(.6 * (1 - pr))}"/>`;
      }
    }
    // blind view 03.11 (1:08): «пока чайник кипел — прочитал страницу» — a kettle under the apple, a page under the clock;
    // steam rises from «кипел», a reading mark runs down the page from «прочитал»; both leave on «одну перемену»
    const wK = word(K, 'a1', 'чайник'), wP = word(K, 'a1', 'прочитал'), wO = word(K, 'a1', ['одну', 'перемен']);
    if (wK && wP) {
      const tk = wK.t0, tp = wP.t0, tO = wO ? wO.t0 : tp + 2.5, op = B(tt, tk - .3, tk + .2) * (1 - B(tt, tO + .8, tO + 1.4));
      if (op > .01) {
        const KX = 98, KY = 210, boil = B(tt, tk + .3, tk + 1.2);   // v4: in the apple's place
        let k = `<path d="M${KX - 26} ${KY + 22} Q${KX - 30} ${KY - 14} ${KX} ${KY - 18} Q${KX + 30} ${KY - 14} ${KX + 26} ${KY + 22} Z" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-width="1" opacity=".9"/>`;
        k += `<path d="M${KX + 24} ${KY} L${KX + 42} ${KY - 14}" stroke="#fff" stroke-width="1.6" opacity=".9"/>`;
        k += `<path d="M${KX - 25} ${KY - 4} Q${KX - 44} ${KY + 2} ${KX - 25} ${KY + 14}" fill="none" stroke="#fff" stroke-width="1" opacity=".8"/>`;
        k += `<line x1="${KX - 12}" y1="${KY - 18}" x2="${KX + 12}" y2="${KY - 18}" stroke="#fff" stroke-width="1" opacity=".8"/>` + UN.sphere(KX, KY - 22, 2.2, { glow: .6 });
        for (let j = 0; j < 3; j++) {
          const pts = [];
          for (let q = 0; q <= 12; q++) { const y = KY - 20 - q * 4.2; pts.push([KX + 44 + j * 6 + 3.5 * Math.sin(q * .8 + tt * 3 + j * 2), y]); }
          k += UN.polyline(pts, { opacity: .45 * boil * (.7 + .3 * Math.sin(tt * 2 + j)), width: .9 });
        }
        const PX = 268, PY = 206, rd = clamp((tt - tp) / Math.max(1, tO - tp + .6));   // v4: in the clock's place
        let pg = `<rect x="${PX - 28}" y="${PY - 36}" width="56" height="72" rx="3" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-width="1" opacity=".9"/>`;
        for (let j = 0; j < 7; j++) { const y = PY - 26 + j * 9, done = clamp(rd * 7 - j); pg += UN.thread([PX - 20, y], [PX + 20, y], { opacity: .3, width: .7 }); if (done > 0) pg += UN.thread([PX - 20, y], [PX - 20 + 40 * done, y], { opacity: .95, width: 1.1 }); }
        s += `<g opacity="${f(op)}"><g transform="translate(${KX} ${KY}) scale(1.8) translate(${-KX} ${-KY})">${k}</g><g transform="translate(${PX} ${PY}) scale(1.6) translate(${-PX} ${-PY})">${pg}</g></g>` +
          aplate(KX, KY + 78, 'ЧАЙНИК', op, 14) + aplate(PX, PY + 84, 'СТРАНИЦА', op * B(tt, tp - .2, tp + .3), 14);
      }
    }

    // in-scene camera: slow breathing push
    const z = 1 + .03 * Math.sin((tt - T.start) * .23) * (1 - inside) + .02 * inside;
    s = `<g transform="translate(180 200) scale(${z.toFixed(4)}) translate(-180 -200)">${s}</g>`;

    // entrance from ts_body/promise (compare only)
    if (mode === 'compare') {
      const t0 = (K[p.s] ?? K.a1 ?? 0) - .05, q = B(t, t0, t0 + .6);
      if (q < 1) {
        const prev = p.prev && typeof SCENES[p.prev]?.body === 'function' ? SCENES[p.prev].body(t, K, p.prev_mode) : '';
        return `<g opacity="${f(1 - q)}">${prev}</g><g opacity="${f(q)}">${s}</g>`;
      }
    }
    return s;
  }

  SCENES.ts_apple = function (u, p, d, t) {
    p = p || {};
    return UN.wrap(body(t, p.K || {}, p.mode, p));
  };
  SCENES.ts_apple.body = (t, K, mode) => body(t, K || {}, mode, {});
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_apple; SCENES.ts_apple = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
