/* «Время — это трансформация» (eps/time_states), сцена ts_earth — Земля, спутник и относительный темп.
 * Стиль «Сеть внутри сети»: чёрный фон, белые каркасы, светящиеся шары на нитях; красного и брендов нет.
 * SCENES.ts_earth(u,p,d,t) → UN.wrap(...); SCENES.ts_earth.body(t,K,mode) → сырой SVG без wrap и без фона.
 * SCENES.ts_earth.films(t,K,o) — три плёнки режима relative; ts_egg/break сливает их в одну стрелу
 *   (o.merge 0..1, o.toY — общая высота, o.vC — общая скорость, o.mA/o.mB — окно выравнивания скоростей,
 *   o.fade 0..1 — гасит содержимое кадров, o.idp — префикс id плёнок).
 * p: s — id фразы кадра, mode, K — абсолютные времена (K[id], K[id+'_end'], K.words[id] со словами),
 *   prev/prev_mode — сцена, из которой входим. Секунд руками нет: всё от слов через cue().
 * Наплыв: входящая сцена владеет 0,7 с от K[p.s]-0.05 (SCENES[prev].body, иначе из чёрного).
 * Камера движка нейтральна; движение камеры — внутри режимов (подъём Земли, отъезд к телефону).
 * Режимы:
 *   gravity  (c1b, вход из ts_strip/cold): яблоко в инее и холодное кольцо только вокруг него
 *            («холод», «одно»); кольцо гаснет, снизу поднимается каркасная Земля («есть»…«всё»);
 *            яблоко садится на поверхность («яблоко»), рядом часы («часы») и маленький человек
 *            («тебя»); у всех одно замедленное время (общий медленный пульс); на «гравитация» —
 *            кольца поля сходятся к Земле, моно ГРАВИТАЦИЯ. Дальше ts_body/height (он владеет наплывом).
 *   gps      (c3, вход из ts_body/height): Земля, орбита-кольцо, каркасный спутник с часами и часы на
 *            Земле; часы спутника спешат, на «поправляют» стрелку подкручивают назад (ПОПРАВКА);
 *            на «иначе» камера отъезжает, появляется контур телефона с картой-сеткой; с «день»
 *            бегут сутки, точка уползает от верного места, на «километры» — скоба и моно КИЛОМЕТРЫ.
 *   relative (c4, прежний текст; в раскадровке заменён на blackhole, не удалять): три плёнки бегут с разной
 *            скоростью — ЯБЛОКО В ХОЛОДЕ (медленно), ЧАСЫ У ГОЛОВЫ (быстро), ЧАСЫ У НОГ (медленнее); на «разной» —
 *            шевроны темпа; на «поэтому» — общая линия «сейчас» через три плёнки; на «относительное» — ОТНОСИТЕЛЬНО.
 *   blackhole (c4, вход из ts_earth/gps): Земля, орбита и спутник остаются из gps (телефон растворяется наплывом),
 *            камера подходит к Земле, под ней вмятина в решётке точек-пространства; на «Эйнштейна» — моно
 *            ЭЙНШТЕЙН · ОТО · 1915; на «чёрных дыр» Земля улетает, в центре чёрный диск с фотонным кольцом,
 *            дугой линзы и кольцом аккреции из вращающихся точек (без красного), решётка стягивается к нему;
 *            часы РЯДОМ (у диска) и ВДАЛИ идут одинаково, на «замедляется» стрелка у диска почти замирает
 *            (и её пульс, и вращение кольца), вдали идёт как шла; на «почему» — точечный «?»; на «Гравитация» —
 *            линии поля сходятся к диску, по ним падают точки-процессы и тормозят у диска; на «вот» дыра
 *            уходит, на «скорость» въезжают три плёнки relative (шевроны на «разной»), на «относительное» —
 *            ОТНОСИТЕЛЬНО; на 2-м «процесс» и «молекул» частицы в кадрах смещаются (каждая плёнка со своей
 *            скоростью), на «пространства» — частицы пустоты в кадрах и вся решётка пространства.
 *            Конец — те же плёнки, что в relative (ts_egg/break сливает их без скачка).
 * gps(t,K,{phone:false}) — без телефона (для blackhole). films: o.at — время появления плёнок (иначе от K.c4),
 *   o.mol / o.molSp 0..1 — частицы объекта / пустоты в кадрах; без этих полей рисует ровно как раньше.
 * Детерминизм: только t и K; случайность — UN.hash; кэшей состояния нет.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const btw = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => UN.hash(n);
  const norm = w => String(w).toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  // time of the n-th word of phrase id starting with stem; falls back to the phrase start
  const cue = (K, id, stem, fb, n = 0) => {
    const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(stem))[n];
    return a ? a.t0 : (K[id] ?? fb ?? 0);
  };
  // ∫ smoothstep from a to t (seconds): lets a speed change smoothly without a jump in position
  const rampInt = (t, a, b) => {
    if (t <= a) return 0;
    const L = Math.max(.001, b - a), x = clamp((t - a) / L);
    return L * (x * x * x - x * x * x * x / 2) + Math.max(0, t - b);
  };
  const dot = (x, y, r, o) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(o)}"/>`;
  const G = (op, s) => (op <= .003 || !s) ? '' : (op >= .997 ? s : `<g opacity="${f(op)}">${s}</g>`);
  // mono caption; o.back puts a dark plate under it so wires behind do not cross the letters
  const label = (x, y, text, op, o = {}) => {
    if (op <= .01) return '';
    const sz = o.size ?? 9.4, w = String(text).length * sz * .62 + 6, an = o.anchor ?? 'middle';
    const x0 = an === 'end' ? x - w + 3 : an === 'start' ? x - 3 : x - w / 2;
    return (o.back ? `<rect x="${f(x0)}" y="${f(y - sz - 1)}" width="${f(w)}" height="${f(sz + 5)}" rx="2" fill="#000" opacity="${f(.8 * op)}"/>` : '') +
      UN.mono(x, y, text, { size: sz, anchor: an, opacity: .9 * op, glow: o.glow });
  };

  /* film: endless TS.strip scrolled by s pixels; frame(k,…) gets the absolute frame index k,
     the frame under x (the "now" playhead) is lit. */
  function film(x, y, s, o) {
    const w = o.w ?? 44, h = o.h ?? 58, gap = o.gap ?? 10, P = w + gap, N = o.n ?? 9, half = (N - 1) / 2;
    const base = Math.floor(s / P), frac = s - base * P;
    return TS.strip(x, y, {
      n: N, w, h, gap, offset: -frac, view: o.view ?? 150, id: o.id, t: o.t, opacity: o.opacity ?? 1,
      frame: (i, cx, cy, ww, hh) => o.frame(base + i - half, cx, cy, ww, hh),
      lit: i => { const d = Math.abs(-frac + (i - half) * P) / P; return Math.max(o.dim ?? .3, 1 - d); },
    });
  }

  /* small apple for film frames (TS.apple is ~900 elements, too heavy for a strip) */
  function miniApple(cx, cy, r, o = {}) {
    const cold = o.cold ?? 0, t = o.t ?? 0, seed = o.seed ?? 0;
    const pts = [];
    for (let k = 0; k <= 36; k++) {
      const a = k / 36 * 2 * Math.PI, s = Math.sin(a), c = Math.cos(a);
      let x = s * r * (1 + .07 * c), y = -c * r * .92;
      if (c > 0) y += r * .24 * Math.exp(-s * s / .03) * c; else y += r * .07 * Math.exp(-s * s / .04) * c;
      pts.push([cx + x, cy + y]);
    }
    let s = UN.polyline(pts, { opacity: .22, width: 1.8, glow: true }) + UN.polyline(pts, { opacity: .8, width: .6 });
    s += UN.thread([cx, cy - r * .7], [cx + r * .14, cy - r * 1.18], { width: .8, opacity: .8 });
    s += `<ellipse cx="${f(cx + r * .36)}" cy="${f(cy - r * 1.02)}" rx="${f(r * .26)}" ry="${f(r * .1)}" transform="rotate(-24 ${f(cx + r * .36)} ${f(cy - r * 1.02)})" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-width=".5" opacity=".8"/>`;
    let ds = '';
    for (let i = 0; i < 14; i++) {
      const a = i * 2.39996 + seed, q = Math.sqrt((i + .5) / 14) * .78, j = .5 * (1 - cold) * Math.sin(t * 4 + i * 1.7);
      ds += dot(cx + Math.cos(a) * q * r + j, cy + Math.sin(a) * q * r * .9 + .05 * r, Math.max(.5, r * .07), .45 + .4 * H(i + 31));
    }
    s += `<g fill="#fff">${ds}</g>`;
    if (cold > 0) {
      let fr = '';
      for (let i = 0; i < 18; i++) {
        const p = pts[Math.floor(H(i + 71) * 36)], dx = p[0] - cx, dy = p[1] - cy, n = Math.hypot(dx, dy) || 1, out = 1.5 + H(i + 91) * 3.5;
        fr += dot(p[0] + dx / n * out, p[1] + dy / n * out, .4 + .5 * H(i + 111), cold * (.4 + .5 * H(i + 131)) * (.8 + .2 * Math.sin(t * 1.5 + i)));
      }
      s += `<g fill="#fff">${fr}</g>`;
    }
    return G(o.opacity ?? 1, s);
  }

  /* wireframe Earth: meridians and parallels on a tilted rotating sphere, back side dim,
     glowing limb, twinkling surface dots; o.fill hides what is behind the globe */
  function earth(cx, cy, R, o = {}) {
    const rot = o.rot ?? 0, tilt = o.tilt ?? .38, t = o.t ?? 0;
    const ct = Math.cos(tilt), st = Math.sin(tilt), cr = Math.cos(rot), sr = Math.sin(rot);
    const P = (la, lo) => {
      let x = Math.cos(la) * Math.cos(lo), y = -Math.sin(la), z = Math.cos(la) * Math.sin(lo);
      [x, z] = [x * cr + z * sr, -x * sr + z * cr];
      [y, z] = [y * ct - z * st, y * st + z * ct];
      return { x: cx + x * R, y: cy + y * R, z };
    };
    let front = '', back = '';
    const line = pts => {
      let seg = [], side = null;
      const flush = () => { if (seg.length > 1) { const d = 'M' + seg.map(p => `${f(p.x)} ${f(p.y)}`).join(' L'); if (side) front += `<path d="${d}"/>`; else back += `<path d="${d}"/>`; } };
      for (const p of pts) {
        const s = p.z < 0;
        if (side !== null && s !== side) { seg.push(p); flush(); seg = [p]; side = s; continue; }
        side = s; seg.push(p);
      }
      flush();
    };
    for (let k = 0; k < 12; k++) { const lo = k * Math.PI / 6, pts = []; for (let j = 0; j <= 24; j++) pts.push(P(-1.48 + 2.96 * j / 24, lo)); line(pts); }
    for (const deg of [-60, -30, 0, 30, 60]) { const la = deg * Math.PI / 180, pts = []; for (let j = 0; j <= 48; j++) pts.push(P(la, j / 48 * 2 * Math.PI)); line(pts); }
    let s = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 1.3)}" fill="url(#un-halo)" opacity=".4"/>`;
    if (o.fill) s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" fill="#000" opacity=".88"/>`;
    s += `<g fill="none" stroke="#fff" stroke-width=".45" opacity=".13">${back}</g>`;
    s += `<g fill="none" stroke="#fff" stroke-width=".55" opacity=".5">${front}</g>`;
    let ds = '';
    for (let i = 0; i < 70; i++) {
      const y = 1 - 2 * (i + .5) / 70, la = Math.asin(y), lo = i * 2.39996, p = P(la, lo);
      if (p.z < 0) ds += dot(p.x, p.y, Math.max(.5, R * .006) * (1 + H(i + 7)), (.3 + .6 * H(i + 17)) * (.6 + .4 * Math.sin(t * 1.7 + i * 2.1)) * clamp(-p.z * 2));
    }
    s += `<g fill="#fff">${ds}</g>`;
    s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" fill="none" stroke="#fff" stroke-width="2.4" opacity=".28" filter="url(#un-soft)"/>`;
    s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" fill="none" stroke="#fff" stroke-width=".8" opacity=".75"/>`;
    return G(o.opacity ?? 1, s);
  }

  /* simplified little person: dotted stick figure (TS.person is 4.5k points) */
  function miniPerson(x, gy, h, t, op = 1) {
    const sw = Math.sin(t * .9) * .04;
    const head = [x, gy - h * .9], neck = [x, gy - h * .8], hip = [x, gy - h * .47];
    const shL = [x - h * .11, gy - h * .77], shR = [x + h * .11, gy - h * .77];
    const elL = [x - h * .15, gy - h * .61], elR = [x + h * .15, gy - h * .61];
    const hL = [x - h * (.16 + sw), gy - h * .45], hR = [x + h * (.16 - sw), gy - h * .45];
    const pL = [x - h * .06, hip[1]], pR = [x + h * .06, hip[1]];
    const kL = [x - h * .075, gy - h * .23], kR = [x + h * .075, gy - h * .23], fL = [x - h * .085, gy], fR = [x + h * .085, gy];
    const lines = [[neck, hip], [shL, shR], [shL, elL], [elL, hL], [shR, elR], [elR, hR], [pL, pR], [pL, kL], [kL, fL], [pR, kR], [kR, fR]];
    let s = lines.map(([a, b]) => UN.thread(a, b, { width: .7, opacity: .55 })).join('');
    let ds = '';
    lines.forEach(([a, b], k) => { for (let j = 0; j <= 4; j++) { const q = j / 4; ds += dot(lerp(a[0], b[0], q), lerp(a[1], b[1], q), 1, .65 + .3 * Math.sin(t * 1.1 + k + j)); } });
    for (let i = 0; i < 16; i++) { const a = i / 16 * 2 * Math.PI; ds += dot(head[0] + Math.cos(a) * h * .075, head[1] + Math.sin(a) * h * .09, .75, .85); }
    s += `<ellipse cx="${f(head[0])}" cy="${f(head[1])}" rx="${f(h * .14)}" ry="${f(h * .15)}" fill="url(#un-halo)" opacity=".7"/>`;
    s += `<g fill="#fff">${ds}</g>`;
    return G(op, s);
  }

  /* plain wireframe satellite: body box, two panels with cells, antenna (no brand marks) */
  function satellite(x, y, sc, deg, op = 1) {
    let p = '';
    for (const sg of [-1, 1]) {
      const x0 = sg < 0 ? -26 : 9;
      p += `<rect x="${x0}" y="-3.5" width="17" height="7" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-width=".6"/>`;
      for (let k = 1; k < 4; k++) p += `<line x1="${f(x0 + k * 17 / 4)}" y1="-3.5" x2="${f(x0 + k * 17 / 4)}" y2="3.5" stroke="#fff" stroke-width=".35" opacity=".7"/>`;
      p += `<line x1="${sg * 5}" y1="0" x2="${sg * 9}" y2="0" stroke="#fff" stroke-width=".6"/>`;
    }
    p += `<rect x="-5" y="-4.5" width="10" height="9" rx="1.2" fill="#000" stroke="#fff" stroke-width=".8"/>`;
    p += `<line x1="0" y1="-4.5" x2="0" y2="-9" stroke="#fff" stroke-width=".6"/><circle cx="0" cy="-10" r="1.3" fill="#fff"/>`;
    return `<g opacity="${f(op)}" transform="translate(${f(x)} ${f(y)}) rotate(${f(deg)}) scale(${f(sc)})">` +
      `<circle r="14" fill="url(#un-halo)" opacity=".6"/>${p}</g>`;
  }

  /* ---------------- gravity (c1b) ---------------- */
  const EC = 180, EYF = 488, ER = 228; // Earth when risen: centre (180,488), top of the globe y=260
  function gravity(t, K) {
    const id = 'c1b', t0 = (K[id] ?? 0) - .05;
    const cHol = cue(K, id, 'холод'), cOdno = cue(K, id, 'одно'), cEst = cue(K, id, 'есть'), cVse = cue(K, id, 'всё'),
      cYab = cue(K, id, 'яблоко', null, 1), cCh = cue(K, id, 'часы'), cTeb = cue(K, id, 'тебя'), cGr = cue(K, id, 'гравитац');
    // v8 A5 (part 1, 1:40): «А гравитация тормозит всё сразу» has no «есть» / second «яблоко» — cue() fell back to the
    // line start and the frame was black for a second. Without «есть» the frame is full from the cut: the Earth is up,
    // the apple, the clock and the person stand on it; on «тормозит всё сразу» one common field ring takes all three
    // and each gets the same grey sector of lag (the hand, the rot and the step slow down together).
    const full = !(K.words?.[id] || []).some(x => norm(x.w).startsWith('есть'));
    const cTor = cue(K, id, 'тормоз'), cSra = cue(K, id, 'сразу', cVse + .3);
    const rise = full ? 1 : btw(t, cEst - .1, cVse + .3), down = full ? 1 : btw(t, cEst + .3, cYab + .3);
    const ecy = full ? EYF + 26 * (1 - btw(t, t0, t0 + 1.6)) : lerp(830, EYF, rise);
    // one slowed time for everything near the Earth
    const slowA = full ? cTor - .1 : cVse - .2, slowB = full ? cSra + .3 : cVse + .6;
    const tt = t - .6 * rampInt(t, slowA, slowB);
    const surf = a => [EC + ER * Math.sin(a), ecy - ER * Math.cos(a)];
    let s = '';
    // gravity field: rings shrink onto the Earth, dots fall in
    const fld = btw(t, cGr - .15, cGr + .5);
    if (fld > .01) {
      let rings = '';
      for (let k = 0; k < 6; k++) {
        const ph = ((k * 36 - (t - cGr) * 24) % 216 + 216) % 216, rr = ER + 14 + ph;
        rings += `<circle cx="${EC}" cy="${f(ecy)}" r="${f(rr)}" opacity="${f((.42 * (1 - ph / 216)) * ease(ph / 30))}"/>`;
      }
      s += G(fld, `<g fill="none" stroke="#fff" stroke-width=".6">${rings}</g>`);
      let fall = '';
      for (let j = 0; j < 11; j++) {
        const a = -.75 + j * .15, q = ((t - cGr) * .32 + H(j + 801)) % 1, rr = ER + 205 * (1 - q * q);
        fall += dot(EC + rr * Math.sin(a), ecy - rr * Math.cos(a), 1.2, .8 * Math.sin(Math.PI * q));
      }
      s += G(fld, `<g fill="#fff">${fall}</g>`);
      s += plate(180, 74, 'ГРАВИТАЦИЯ', fld, 15);   // v3 A5: below the top 10 %
    }
    // Earth rises from below
    if (rise > .001) s += earth(EC, ecy, ER, { rot: .07 * tt, tilt: .42, t, fill: true, opacity: ease(rise * 1.4) });
    // common slow pulse: the same beat for apple, clock and person
    const beat = ((tt * .55) % 1 + 1) % 1, pulseOn = full ? btw(t, cTor, cTor + .5) : btw(t, cVse, cVse + .5);
    const pulse = (x, y, r0, op) => op * pulseOn > .01 ? `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r0 + 16 * beat)}" fill="none" stroke="#fff" stroke-width=".6" opacity="${f(.5 * (1 - beat) * op * pulseOn)}"/>` : '';
    // apple: big in frost at first, then sits on the surface
    const sa = surf(-.4), ar = lerp(46, 27, down);
    const ax = lerp(180, sa[0], down), ay = lerp(168, sa[1] - 25, down);
    const cold = lerp(1, .15, btw(t, cEst, cEst + 1.1));
    // cold ring only around the apple
    // v7 A3: the line has no «холод» (v40+) — no cold apple at the start: only ГРАВИТАЦИЯ and its rings, the apple comes with the figures
    const noHol = !(K.words?.[id] || []).some(x => norm(x.w).startsWith('холод')), apOp = full ? 1 : noHol ? Math.max(down, btw(t, cVse - .3, cVse + .2)) : 1;
    const ringOp = noHol ? 0 : (.65 + .35 * btw(t, cHol - .1, cHol + .3)) * (1 - btw(t, cEst - .1, cEst + .8));
    if (ringOp > .01) {
      const tight = btw(t, cOdno - .1, cOdno + .4), rr = ar * (1.95 - .3 * tight);
      let fr = '';
      for (let i = 0; i < 64; i++) {
        const a = i / 64 * 2 * Math.PI + t * .08, j = 1 + .06 * (H(i + 401) - .5);
        fr += dot(ax + Math.cos(a) * rr * j, ay + Math.sin(a) * rr * j * .98, .5 + .6 * H(i + 451), (.35 + .55 * H(i + 501)) * (.7 + .3 * Math.sin(t * 2 + i)));
      }
      let flakes = '';
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * 2 * Math.PI + .2 - t * .05, x = ax + Math.cos(a) * rr, y = ay + Math.sin(a) * rr, L = 2.6;
        for (let k = 0; k < 3; k++) { const b = k * Math.PI / 3; flakes += UN.thread([x - Math.cos(b) * L, y - Math.sin(b) * L], [x + Math.cos(b) * L, y + Math.sin(b) * L], { width: .45, opacity: .8 }); }
      }
      const ring = `<circle cx="${f(ax)}" cy="${f(ay)}" r="${f(rr)}" fill="none" stroke="#fff" stroke-width="2.4" opacity="${f(.12 + .2 * tight)}" filter="url(#un-soft)"/>` +
        `<circle cx="${f(ax)}" cy="${f(ay)}" r="${f(rr)}" fill="none" stroke="#fff" stroke-width=".5" stroke-dasharray="1.5 3" opacity=".55"/>` +
        `<g fill="#fff">${fr}</g>${flakes}`;
      s += G(ringOp, ring);
      s += label(ax, ay + rr + 16, 'ХОЛОД', ringOp);
    }
    const hl = full ? 0 : btw(t, cYab - .1, cYab + .3) * (1 - btw(t, cYab + .9, cYab + 1.6));
    if (hl > .01) s += `<circle cx="${f(ax)}" cy="${f(ay)}" r="${f(ar * 1.5)}" fill="none" stroke="#fff" stroke-width=".7" opacity="${f(.6 * hl)}"/>`;
    s += pulse(ax, ay, ar * 1.2, down);
    // v8 A5: the apple browns with the slowed time (its rot stands still on «всё сразу»)
    s += G(apOp, TS.apple(ax, ay, ar, full ? { decay: .12 + .1 * clamp((tt - t0) / 3), t: tt, yaw: .35 } : { cold, t: tt, yaw: .35 }));
    // clock on the top of the globe
    // blind view v3 A5: on «всё» the apple, the clock and the person come together, about one size; a flash on «часы» and
    // on «тебя»; the clock's hand visibly slows (tt)
    const flash = (x, y, r, tc) => { const q = clamp((t - tc) / .8); return q > 0 && q < 1 ? `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r + 22 * q)}" fill="none" stroke="#fff" stroke-width="1.6" opacity="${f(.9 * (1 - q))}"/>` : ''; };
    const cop = full ? 1 : btw(t, cVse - .15, cVse + .35);
    if (cop > .01) {
      const sc = surf(0), cy = sc[1] - 34 - 10 * (1 - cop);
      s += pulse(sc[0], cy, 26, cop) + flash(sc[0], cy, 26, cCh);
      s += TS.clock(sc[0], cy, 26, .8 + tt * .9, { opacity: cop, trail: .5 });
    }
    // the little person
    const pop = full ? 1 : btw(t, cVse - .15, cVse + .35);
    if (pop > .01) {
      const sp = surf(.4);
      s += pulse(sp[0], sp[1] - 42, 30, pop) + flash(sp[0], sp[1] - 42, 30, cTeb);
      s += miniPerson(sp[0], sp[1] - 2, 84, tt, pop);
    }
    // v8 A5: «тормозит всё сразу» — one common ring of the field around all three, and the same grey lag sector at
    // each (how far the slowed time fell behind the free one); the ring tightens on «сразу»
    if (full) {
      const ring = btw(t, cTor - .15, cTor + .4), lag = Math.min(2.2, .9 * (t - tt) * 2.2);
      if (ring > .01) {
        const tight = btw(t, cSra - .1, cSra + .5), rx = lerp(178, 150, tight), ry = lerp(92, 78, tight), cy0 = ecy - ER + 2;
        s += `<ellipse cx="${EC}" cy="${f(cy0)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#fff" stroke-width="3" opacity="${f(.22 * ring)}" filter="url(#un-soft)"/>`;
        s += `<ellipse cx="${EC}" cy="${f(cy0)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#fff" stroke-width="1.1" stroke-dasharray="5 4" stroke-dashoffset="${f(-t * 12)}" opacity="${f(.85 * ring)}"/>`;
      }
      if (lag > .02) {
        const sector = (x, y, r, a0, a1) => {
          const p = a => [x + Math.sin(a) * r, y - Math.cos(a) * r], A = p(a0), Bp = p(a1);
          return `<path d="M${f(x)} ${f(y)} L${f(A[0])} ${f(A[1])} A${f(r)} ${f(r)} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${f(Bp[0])} ${f(Bp[1])} Z" fill="#9a9a9a" fill-opacity=".55" stroke="#d0d0d0" stroke-width=".7"/>`;
        };
        const sc = surf(0), ccy = sc[1] - 34, a = .8 + tt * .9;
        s += sector(sc[0], ccy, 26 * .62, a, a + lag);   // on the clock: from the slowed hand to where the free one would be
        const dial = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="13" fill="#000" fill-opacity=".8" stroke="#fff" stroke-width=".9"/>` + sector(x, y, 10.5, 0, lag) +
          UN.thread([x, y], [x + Math.sin(lag) * 10, y - Math.cos(lag) * 10], { width: 1, opacity: .7 }) + UN.thread([x, y], [x, y - 11], { width: 1.2, opacity: .95 });
        const sp = surf(.4);
        s += G(btw(t, cTor, cTor + .4), dial(ax - ar - 4, ay - ar - 2) + dial(sp[0] + 30, sp[1] - 92));
      }
    }
    return s;
  }

  /* ---------------- gps (c3) ---------------- */
  function phone(cx, cy, w, h, o) {
    const t = o.t, x0 = cx - w / 2, y0 = cy - h / 2, sx = x0 + 7, sy = y0 + 22, sw = w - 14, sh = h - 40;
    let m = '';
    const pan = ((t * 2.4) % 18 + 18) % 18;
    for (let gx = sx - 18 - pan; gx < sx + sw + 18; gx += 18) m += UN.thread([gx, sy], [gx + 7, sy + sh], { width: .4, opacity: .3 });
    for (let gy = sy - 18 + pan * .4; gy < sy + sh + 18; gy += 18) m += UN.thread([sx, gy], [sx + sw, gy - 5], { width: .4, opacity: .3 });
    m += UN.thread([sx, sy + sh * .28], [sx + sw, sy + sh * .6], { width: 1.3, opacity: .45 });
    m += UN.thread([sx + sw * .7, sy], [sx + sw * .25, sy + sh], { width: 1.1, opacity: .4 });
    const T = [cx, cy + 14];
    const dpos = q => [T[0] + 36 * q + 6 * Math.sin(q * 3.4), T[1] - 70 * q + 5 * Math.sin(q * 5.1)];
    const D = dpos(o.drift);
    m += `<circle cx="${f(T[0])}" cy="${f(T[1])}" r="7" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="2 2" opacity=".85"/>`;
    m += `<circle cx="${f(T[0])}" cy="${f(T[1])}" r="1.4" fill="#fff" opacity=".85"/>`;
    if (o.drift > .01) {
      const tr = []; for (let k = 0; k <= 20; k++) tr.push(dpos(o.drift * k / 20));
      m += `<path d="M${tr.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')}" fill="none" stroke="#fff" stroke-width=".7" stroke-dasharray="1.5 2.5" opacity=".7"/>`;
    }
    if (o.km > .01) {
      const dx = D[0] - T[0], dy = D[1] - T[1], n = Math.hypot(dx, dy) || 1, nx = -dy / n * 12, ny = dx / n * 12;
      const a = [T[0] - nx, T[1] - ny], b = [D[0] - nx, D[1] - ny];
      let br = UN.thread(a, b, { width: .8, opacity: .9 });
      br += UN.thread([a[0] - nx * .3, a[1] - ny * .3], [a[0] + nx * .3, a[1] + ny * .3], { width: .8, opacity: .9 });
      br += UN.thread([b[0] - nx * .3, b[1] - ny * .3], [b[0] + nx * .3, b[1] + ny * .3], { width: .8, opacity: .9 });
      m += G(o.km, br);
    }
    m += UN.sphere(D[0], D[1], 3.8, { glow: .9 });
    let s = `<defs><clipPath id="tse-phone"><rect x="${f(sx)}" y="${f(sy)}" width="${f(sw)}" height="${f(sh)}" rx="3"/></clipPath></defs>`;
    s += `<rect x="${f(sx)}" y="${f(sy)}" width="${f(sw)}" height="${f(sh)}" rx="3" fill="#000" opacity=".9"/>`;
    s += `<g clip-path="url(#tse-phone)">${m}</g>`;
    if (o.km > .01) {
      s += `<rect x="${f(cx - 34)}" y="${f(sy + sh - 22)}" width="68" height="15" rx="2" fill="#000" opacity="${f(.85 * o.km)}"/>`;
      s += label(cx, sy + sh - 11, 'КИЛОМЕТРЫ', o.km, { size: 10, glow: true });
    }
    s += `<rect x="${f(sx)}" y="${f(sy)}" width="${f(sw)}" height="${f(sh)}" rx="3" fill="none" stroke="#fff" stroke-width=".4" opacity=".4"/>`;
    s += `<rect x="${f(x0)}" y="${f(y0)}" width="${w}" height="${h}" rx="16" fill="none" stroke="#fff" stroke-width="2.4" opacity=".25" filter="url(#un-soft)"/>`;
    s += `<rect x="${f(x0)}" y="${f(y0)}" width="${w}" height="${h}" rx="16" fill="none" stroke="#fff" stroke-width=".9" opacity=".9"/>`;
    s += UN.thread([cx - 12, y0 + 9], [cx + 12, y0 + 9], { width: 1.6, opacity: .6 });
    s += UN.thread([cx - 18, y0 + h - 9], [cx + 18, y0 + h - 9], { width: 1.2, opacity: .5 });
    // status bar: a day runs on a tiny dial
    s += TS.clock(x0 + w - 17, y0 + 12, 6.5, o.day * Math.PI * 4, { ticks: false, opacity: .45 + .55 * clamp(o.day * 8) });
    return G(o.opacity, s);
  }
  function gps(t, K, o = {}) {
    const id = 'c3', t0 = (K[id] ?? 0) - .05;
    // c3b carries the correction words when the phrase is split (short version); fall back to c3.
    const idB = (K.words && K.words.c3b) ? 'c3b' : id;
    const cSp = cue(K, id, 'спутник'), cPop = cue(K, idB, 'поправля'), cIn = cue(K, idB, 'иначе'), cDen = cue(K, idB, 'день'), cKm = cue(K, idB, 'завёл', cue(K, idB, 'километр'));
    const q2 = btw(t, cIn - .1, cIn + .8);
    const ex = lerp(180, 86, q2), ey = lerp(208, 92, q2), R = lerp(78, 38, q2), orx = lerp(142, 70, q2), ory = lerp(40, 20, q2);
    const ca = Math.cos(-.24), sa = Math.sin(-.24);
    const orb = a => { const x = Math.cos(a) * orx, y = Math.sin(a) * ory; return [ex + x * ca - y * sa, ey + x * sa + y * ca]; };
    const th = .35 + .4 * (t - t0), S = orb(th), front = Math.sin(th) > 0;   // blind view: in front on «Спутник» (was behind 1.5 s)
    const half = (a0, a1) => { const p = []; for (let k = 0; k <= 40; k++) p.push(orb(lerp(a0, a1, k / 40))); return p; };
    const backArc = half(Math.PI, 2 * Math.PI), frontArc = half(0, Math.PI);
    const satHl = 1 + .5 * btw(t, cSp - .1, cSp + .3) * (1 - btw(t, cSp + .8, cSp + 1.4));
    const sat = satellite(S[0], S[1], lerp(1, .62, q2) * satHl ** .3, -14 + 8 * Math.sin(t * .6), 1);
    let s = '';
    s += UN.polyline(backArc, { opacity: .2, width: .6 });
    if (!front) s += sat;
    s += earth(ex, ey, R, { rot: .18 * t, tilt: .4, t, fill: true });
    s += UN.polyline(frontArc, { opacity: .2, width: 2.2, glow: true }) + UN.polyline(frontArc, { opacity: .65, width: .7 });
    if (front) s += sat;
    // clocks: the satellite one runs ahead until it is corrected
    const aG = 1.5 * (t - t0), drift = .8 * (t - t0) * (1 - btw(t, cPop, cPop + 1)), aS = aG + drift;
    const cr = lerp(14, 9, q2), scx = S[0], scy = S[1] - lerp(25, 17, q2);
    const fix = btw(t, cPop - .1, cPop + .3) * (1 - btw(t, cPop + 1.5, cPop + 2.1));
    s += TS.clock(scx, scy, cr, aS, { trail: .3 + .7 * fix, ticks: cr > 11 });
    if (fix > .01) {
      const arc = []; for (let k = 0; k <= 16; k++) { const a = lerp(.9, -1.5, k / 16); arc.push([scx + Math.sin(a) * (cr + 6), scy - Math.cos(a) * (cr + 6)]); }
      const e = arc[16], a = -1.5;
      let ar = UN.polyline(arc, { opacity: .9, width: .9 });
      ar += UN.polyline([[e[0] + Math.cos(a) * 3.5 + Math.sin(a) * 1, e[1] + Math.sin(a) * 3.5 - Math.cos(a) * 1], e, [e[0] - Math.cos(a) * 3.5 + Math.sin(a) * 1, e[1] - Math.sin(a) * 3.5 - Math.cos(a) * 1]], { opacity: .9, width: .9 });
      s += G(fix, ar);
      s += label(scx - cr - 10, scy + 3, 'ПОПРАВКА', fix * (1 - q2), { anchor: 'end', back: true });
    }
    const gOp = 1 - btw(t, cIn - .1, cIn + .5);
    if (gOp > .01) {
      const gx = ex - .62 * R, gy = ey - 1.03 * R;
      s += TS.clock(gx, gy, 14, aG, { opacity: gOp });
      s += label(gx - 20, gy + 4, 'НА ЗЕМЛЕ', gOp, { anchor: 'end', back: true });
      s += label(S[0], S[1] + 22, 'СПУТНИК', gOp * (front ? 1 : .6), { back: true });
    }
    // phone with the map
    const ph = o.phone === false ? 0 : btw(t, cIn - .05, cIn + .7);
    if (ph > .01) {
      const pcx = 224 + 30 * (1 - ph), pcy = 236;
      const day = btw(t, cDen - .15, cKm + .6), drift2 = day + .06 * Math.max(0, t - cKm - .6);
      s += `<path d="M${f(S[0])} ${f(S[1])} L${f(pcx)} ${f(pcy - 102)}" stroke="#fff" stroke-width=".5" stroke-dasharray="2 4" stroke-dashoffset="${f(-t * 14)}" opacity="${f(.45 * ph)}"/>`;
      s += phone(pcx, pcy, 124, 204, { t, drift: Math.min(1.25, drift2), day, km: btw(t, cKm - .1, cKm + .4), opacity: ph });
    }
    return s;
  }

  /* ---------------- relative (c4) and the films ---------------- */
  // blind view 03.11: three strips of small frames did not read on a phone — two strips of big frames, one slow, one fast
  const REL = [
    { y: 116, v: 8, kind: 'apple', text: 'ЯБЛОКО В ХОЛОДЕ', chev: 1 },
    { y: 290, v: 70, kind: 'warm', text: 'ЯБЛОКО В ТЕПЛЕ', chev: 3 },   // blind view v2 A5: no «ЧАСЫ У ГОЛОВЫ"
  ];
  const FW = 64, FH = 84;
  /* particles of one film frame: 8 on the object (o.mol), 5 in the empty space around it (o.molSp);
     they shift with the film's own speed of change v, so the slow film's particles barely move */
  function mols(k, cx, cy, i, v, t, m, mSp) {
    if (m <= .01 && mSp <= .01) return '';
    const tau = t * v / 20;
    let ds = '';
    for (let j = 0; j < 13; j++) {
      const sp = j >= 8, a = sp ? 0 : 1, h1 = H(k * 13.7 + j * 7.1 + i * 101), h2 = H(k * 5.3 + j * 11.9 + i * 211);
      const q = sp ? mSp : m;
      if (q <= .01) continue;
      let bx, by;
      if (!sp) { const r = 12.5 * Math.sqrt(h1), b = h2 * 2 * Math.PI; bx = Math.cos(b) * r; by = Math.sin(b) * r * 1.15; }
      else { const c = Math.floor(h1 * 4); bx = (c % 2 ? 1 : -1) * (16 + 3 * h2); by = (c < 2 ? -1 : 1) * (19 + 6 * H(j + k * 3.3)); }
      const A = (sp ? 3.2 : 4.2) * q, ph = H(j * 3.1 + k + i * 17) * 6.28;
      const x = cx + bx + A * Math.sin(tau * 1.7 + ph), y = cy + by + A * Math.cos(tau * 1.3 + ph * 1.4);
      ds += dot(x, y, sp ? .9 : 1.15, (.55 + .35 * a) * q);
      ds += dot(x, y, 2.6, .12 * q);
    }
    return `<g fill="#fff">${ds}</g>`;
  }
  function films(t, K, o = {}) {
    const tR = (K.c4 ?? 0) - .05, mg = ease(o.merge ?? 0), fade = o.fade ?? 0, vC = o.vC ?? 30;
    const cRaz = cue(K, 'c4', 'разн');
    let s = '';
    REL.forEach((L, i) => {
      const ap = o.merge != null ? 1 : o.at != null ? btw(t, o.at + i * .2, o.at + .6 + i * .2) : btw(t, tR - .6 + i * .2, tR + i * .2);
      const y = lerp(L.y, o.toY ?? L.y, mg);
      const sp = L.v * (t - tR + 6) + (o.mA != null ? (vC - L.v) * rampInt(t, o.mA, o.mB) : 0);
      const pm = (o.mol ?? 0) * (1 - fade), ps = (o.molSp ?? 0) * (1 - fade);
      const frame = (k, cx, cy) => {
        if (fade >= .99) return '';
        if (L.kind === 'apple') return miniApple(cx, cy + 7, 21, { cold: 1, t: t * .15, seed: k * .02, opacity: 1 - fade }) + mols(k, cx, cy + 3, i, L.v, t, pm, ps);
        if (L.kind === 'warm') return miniApple(cx, cy + 7, 21 * (1 - .18 * (((k % 4) + 4) % 4) / 3), { cold: 0, t, seed: k * .02, opacity: (1 - fade) * (1 - .45 * (((k % 4) + 4) % 4) / 3) }) +
          `<circle cx="${f(cx + 5)}" cy="${f(cy + 10)}" r="${f(2.5 * (((k % 4) + 4) % 4))}" fill="#000" stroke="#fff" stroke-width=".4" opacity="${f(.9 * (1 - fade))}"/>` + mols(k, cx, cy + 3, i, L.v, t, pm, ps);
        return TS.clock(cx, cy, 23, k * .55 + i * .4, { opacity: 1 - fade }) + mols(k, cx, cy, i, L.v, t, pm, ps);
      };
      s += G(ap * (o.opacity ?? 1), film(180, y, sp, { id: (o.idp ?? 'er') + i, w: FW, h: FH, gap: 12, n: 7, view: 160, t, frame, dim: .3 }));
      const lab = ap * (1 - clamp(mg * 2.5)) * (o.opacity ?? 1);
      if (lab > .01) {
        s += plate(110, y - FH / 2 - 18, L.text, lab, 14);
        const ch = btw(t, cRaz - .2, cRaz + .3) * lab;
        if (ch > .01) for (let c = 0; c < L.chev; c++) {
          const x = 336 - (L.chev - 1 - c) * 8, op = .45 + .55 * (.5 + .5 * Math.sin(t * L.v * .14 - c * 1.3));
          s += UN.polyline([[x - 3, y - FH / 2 - 25], [x + 1.5, y - FH / 2 - 20.5], [x - 3, y - FH / 2 - 16]], { opacity: .9 * ch * op, width: 1 });
        }
      }
    });
    return s;
  }
  function relative(t, K) {
    const id = 'c4', cPo = cue(K, id, 'поэтому'), cOt = cue(K, id, 'относит');
    let s = films(t, K, { idp: 'er' });
    const ph = btw(t, cPo - .1, cPo + .5);
    if (ph > .01) {
      s += `<line x1="180" y1="${f(lerp(150, 34, ph))}" x2="180" y2="${f(lerp(190, 306, ph))}" stroke="#fff" stroke-width=".6" stroke-dasharray="2 3" opacity="${f(.55 * ph)}"/>`;
      s += UN.sphere(180, lerp(150, 34, ph), 2.6, { glow: .8, opacity: ph }) + UN.sphere(180, lerp(190, 306, ph), 2.6, { glow: .8, opacity: ph });
    }
    s += label(180, 330, 'ОТНОСИТЕЛЬНО', btw(t, cOt - .1, cOt + .4), { size: 13, glow: true });
    return s;
  }

  /* ---------------- blackhole (c4) ---------------- */
  const BX = 180, BY = 210, BR = 31, ARX = 86, ARY = 17, ATL = -.15; // black hole: disc, accretion ring, ring tilt
  const NEAR = [244, 140], FAR = [70, 92];   // blind view v2 A8: bigger and closer to the centre                            // clock by the hole, clock far away
  const cueAny = (K, id, stems, n = 0) => {
    for (const st of stems) { const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(st))[n]; if (a) return a.t0; }
    return K[id] ?? 0;
  };
  const cueLast = (K, id, stem) => { const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(stem)); return a.length ? a[a.length - 1].t0 : (K[id] ?? 0); };
  // space: a lattice of faint dots pulled in by a mass at o.c (strength o.S, reach o.L); o.wave ripples it,
  // o.bands dims it under the films
  function spaceDots(t, o) {
    let ds = '';
    for (let r = 0; r < 16; r++) for (let c = 0; c < 15; c++) {
      let x = 12 + c * 24 + (r % 2) * 12, y = 10 + r * 23.4;
      if (o.wave > .01) { x += o.wave * 3.4 * Math.sin(y / 27 - t * 2.3 + c * .45); y += o.wave * 2.6 * Math.cos(x / 31 - t * 1.7 + r * .5); }
      let op = .16 + .07 * Math.sin(t * .9 + r * 1.3 + c * 2.1);
      if (o.S > .001) {
        const dx = x - o.c[0], dy = y - o.c[1], d = Math.hypot(dx, dy) || 1, e = Math.exp(-d / o.L), k = 1 - o.S * e;
        x = o.c[0] + dx * k; y = o.c[1] + dy * k; op *= 1 + 1.2 * o.S * e;
      }
      if (o.bands > .01 && REL.some(L => Math.abs(y - L.y) < 38)) op *= 1 - .45 * o.bands;
      ds += dot(x, y, .75 + .5 * o.wave, Math.min(.55, op * (1 + 1.3 * o.wave)));
    }
    return `<g fill="#fff">${ds}</g>`;
  }
  // dotted «?»: Catmull–Rom through the same outline as ts_minds, gathers from scattered dots
  const QA = [[-.25, -.15], [-.245, -.30], [-.14, -.42], [.02, -.46], [.17, -.41], [.25, -.28], [.22, -.14], [.11, -.04], [.03, .05], [0, .14], [0, .25]];
  const crm = (p0, p1, p2, p3, s) => [0, 1].map(k => .5 * (2 * p1[k] + (-p0[k] + p2[k]) * s + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * s * s + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * s * s * s));
  function qmark(cx, cy, size, t, op) {
    if (op <= .01) return '';
    const P = [];
    for (let i = 0; i < QA.length - 1; i++) for (let k = 0; k < 5; k++) P.push(crm(QA[Math.max(0, i - 1)], QA[i], QA[i + 1], QA[Math.min(QA.length - 1, i + 2)], k / 5));
    P.push(QA[QA.length - 1]);
    const sw = .12 * Math.sin(t * 1.1), ca = Math.cos(sw), sa = Math.sin(sw);
    const map = (p, j) => {
      const x = (p[0] - .12 * p[1]) * size, y = p[1] * size, sc = (1 - op) * 26;
      return [cx + x * ca - y * sa + sc * (H(j + 901) - .5), cy + x * sa + y * ca + sc * (H(j + 951) - .5)];
    };
    const M = P.map(map);
    let s = UN.polyline(M, { opacity: .25 * op, width: 2.4, glow: true }) + UN.polyline(M, { opacity: .5 * op, width: .6 });
    let ds = '';
    M.forEach((p, j) => { ds += dot(p[0], p[1], 1.3 + .4 * H(j + 977), (.55 + .4 * Math.sin(t * 2.2 + j * .7)) * op); });
    s += `<g fill="#fff">${ds}</g>`;
    const pd = map([0, .41], 99);
    s += UN.sphere(pd[0], pd[1], 3.4, { glow: .9, opacity: op });
    return s;
  }
  // black disc, photon ring, lensed arc over the top and the accretion ring of rotating dots (no red)
  function hole(t, rot, op) {
    const ca = Math.cos(ATL), sa = Math.sin(ATL);
    const E = (a, rx = ARX, ry = ARY) => { const x = Math.cos(a) * rx, y = Math.sin(a) * ry; return [BX + x * ca - y * sa, BY + x * sa + y * ca]; };
    let back = '', front = '';
    for (let i = 0; i < 120; i++) {
      const a = i / 120 * 2 * Math.PI + rot, j = 1 + .07 * (H(i + 601) - .5), p = E(a, ARX * j, ARY * j);
      const beam = .6 + .4 * Math.cos(a + .3), o = (.35 + .55 * H(i + 651)) * beam * (.75 + .25 * Math.sin(t * 2.4 + i * 1.7));
      const d = dot(p[0], p[1], .55 + .6 * H(i + 701), o);
      if (Math.sin(a) > 0) front += d; else back += d;
    }
    const arc = (a0, a1, rx, ry) => { const p = []; for (let k = 0; k <= 48; k++) p.push(E(lerp(a0, a1, k / 48), rx, ry)); return p; };
    let s = `<circle cx="${BX}" cy="${BY}" r="${f(BR * 3.4)}" fill="url(#un-halo)" opacity=".55"/>`;
    s += UN.polyline(arc(Math.PI, 2 * Math.PI, ARX, ARY), { opacity: .3, width: .55 });
    s += `<g fill="#fff">${back}</g>`;
    // the far side of the ring, bent over the top of the hole by gravity
    const lens = []; for (let k = 0; k <= 40; k++) { const a = lerp(-Math.PI * .95, -Math.PI * .05, k / 40); lens.push([BX + Math.cos(a) * BR * 1.62, BY - 2 + Math.sin(a) * BR * 1.34]); }
    s += UN.polyline(lens, { opacity: .2, width: 2.6, glow: true }) + UN.polyline(lens, { opacity: .5, width: .5 });
    s += `<circle cx="${BX}" cy="${BY}" r="${BR}" fill="#000"/>`;
    s += `<circle cx="${BX}" cy="${BY}" r="${f(BR + 1.2)}" fill="none" stroke="#fff" stroke-width="3.2" opacity=".35" filter="url(#un-soft)"/>`;
    s += `<circle cx="${BX}" cy="${BY}" r="${f(BR + 1.2)}" fill="none" stroke="#fff" stroke-width=".7" opacity=".9"/>`;
    const fa = arc(0, Math.PI, ARX, ARY);
    s += UN.polyline(fa, { opacity: .3, width: 2.4, glow: true }) + UN.polyline(fa, { opacity: .7, width: .6 });
    s += `<g fill="#fff">${front}</g>`;
    return G(op, s);
  }
  // field lines converge onto the disc; process dots fall along them and slow down near it
  function field(t, cGr, op) {
    if (op <= .01) return '';
    const R1 = 172, n = 16;
    let ln = '', ds = '';
    for (let k = 0; k < n; k++) {
      const th = k / n * 2 * Math.PI + .1;
      const P = r => { const a = th + .55 * (1 - r / R1) ** 2; return [BX + Math.cos(a) * r, BY + Math.sin(a) * r * .86]; };
      for (let g = 0; g < 4; g++) {
        const pts = []; for (let j = 0; j <= 8; j++) pts.push(P(lerp(BR + 3 + g * (R1 - BR) / 4, BR + 3 + (g + 1) * (R1 - BR) / 4, j / 8)));
        ln += UN.polyline(pts, { opacity: (.42 - .09 * g) * .12, width: .5 });   // blind view v2 A8: rays read as an explosion — barely there
      }
      for (let j = 0; j < 2; j++) {
        const q = ((t - cGr) * .26 + H(k * 7 + j * 3 + 1)) % 1, rq = u => BR + 3 + (R1 - BR - 3) * (1 - u) ** 3;
        const vis = Math.sin(Math.PI * clamp(q)) ** .5 * (1 - .6 * clamp((q - .7) / .3));
        for (let g = 0; g < 4; g++) { const p = P(rq(Math.max(0, q - g * .018))); ds += dot(p[0], p[1], 1.5 - g * .25, vis * (1 - g * .24)); }
      }
    }
    return G(op, ln + `<g fill="#fff">${ds}</g>`);
  }
  // a plate for labels that carry meaning (blind view v2: bold white in a frame)
  function plate(x, y, text, op, size = 15) {
    if (op <= .01) return '';
    const w = text.length * size * .64 + 16, h = size + 10;
    return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2 - size * .32)}" width="${f(w)}" height="${f(h)}" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
      `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`;
  }
  function blackhole(t, K) {
    const id = 'c4', t0 = (K[id] ?? 0) - .05;
    const cEi = cue(K, id, 'эйнштейн'), cCh = cueAny(K, id, ['чёрн', 'черн']), cZa = cueAny(K, id, ['замедляетс', 'замедля']),
      cPq = cue(K, id, 'почему'), cGr = cue(K, id, 'гравитац'), cVo = cue(K, id, 'вот'), cSk = cue(K, id, 'скорост'),
      cOt = cueLast(K, id, 'относит'), cPr2 = cue(K, id, 'процесс', null, 1), cMo = cue(K, id, 'молекул'), cSp = cue(K, id, 'пространств');
    // v43: «Вот как я это вижу: время — это процесс изменения. Меняются молекулы — яблоко гниёт. Меняется пространство —
    // искривляется у чёрной дыры. | А скорость изменений бывает разной…» — the hole stays through c4_4; on «Меняются молекулы»
    // the frame splits «яблоко | дыра» (an apple rots on the left), on «Меняется пространство» the funnel sinks; the pair on «скорость»
    const v43 = (K.words?.[id] || []).some(x => norm(x.w).startsWith('меняются'));
    const cMol43 = v43 ? cue(K, id, 'меняются') : 1e6, cSpc43 = v43 ? cue(K, id, 'меняется') : 1e6;
    // v7 A6: one thing per line — «Вот как я это вижу…» the hole leaves (the story's plate stands alone); «Меняются молекулы» —
    // one big apple rots in the middle; «Меняется пространство» — the hole with its funnel comes back over the whole frame,
    // the funnel sinks on «искривляется»; no clocks ВДАЛИ / У ДЫРЫ here
    const eo = btw(t, cCh - .15, cCh + .6), bIn = btw(t, cCh - .1, cCh + .6), bOut = btw(t, cVo - .05, v43 ? cVo + .5 : cSk + .4);
    // v8 A2: on «Вот как я это вижу» the hole shrinks to a point and the film of 1:16 (СВЕЖЕЕ → ПОТЕМНЕЛО → СГНИЛО)
    // unfolds from it under the story's plate; on «Меняются» the fresh frame grows into the big apple
    const split43 = v43 ? btw(t, cMol43 - .4, cMol43 - .15) * (1 - btw(t, cSpc43 - .25, cSpc43 + .15)) : 0;
    const back43 = v43 ? btw(t, cSpc43 - .1, cSpc43 + .5) * (1 - btw(t, cSk - .4, cSk)) : 0, cIsk2 = v43 ? cueLast(K, id, 'искривля') : 1e6;
    const fIn = btw(t, cSk - .35, cSk + .9);
    const wave = btw(t, cSp - .1, cSp + .5);
    let s = '';
    // space lattice: a shallow dent under the Earth slides into a deep well at the hole
    const cm0 = btw(t, t0 + .5, cEi + .5);
    // blind view v4 A3: the hole and its funnel come on the FIRST «пространства» («…или самого пространства»), ~6 s before the end
    // v40: c4_3 says «искривляет само пространство» too — the hole comes on the LAST two «пространств» (c4_5)
    const spAll = (K.words?.[id] || []).filter(x => norm(x.w).startsWith('пространств')).map(x => x.t0);
    const cSpA = spAll.length >= 2 ? spAll[spAll.length - 2] : cSp, cSp2 = spAll.length >= 2 ? spAll[spAll.length - 1] : cSp;
    const back = v43 ? back43 : (cSp2 > cSpA + .5 ? btw(t, cSpA - .1, cSpA + .6) : 0);
    const dent = btw(t, cEi + .3, cCh - .2), cIsk = cueAny(K, id, ['искривля'], 0), bend = cIsk > (K[id] ?? 0) ? btw(t, cIsk - .1, cIsk + .6) * (1 - btw(t, cVo - .2, cVo + .3)) : 0;   // v40: «искривляет пространство»   // blind view: the globe does not stand — space bends under it while «ты понял?»
    s += spaceDots(t, { c: [lerp(lerp(86, 150, cm0), BX, bIn), lerp(lerp(92, 150, cm0), BY, bIn)], S: ((.3 + .4 * dent) * (1 - eo) + .55 * bIn + 1.1 * bend) * (1 - bOut) + .9 * back,   /* v3 A3: on «Пространства — чёрная дыра» the space bends into the hole */ L: lerp(lerp(48, 66, cm0), 80, bIn), wave, bands: fIn });
    // the Earth, its orbit and the satellite stay from gps (the phone dissolves), then shrink away
    // after the dissolve the camera comes closer to the Earth (curved space under it), then the Earth flies off
    const bookOn = btw(t, cue(K, id, 'теори') - .2, cue(K, id, 'теори') + .3) * (1 - btw(t, cCh - .5, cCh));   // v3 A12: the globe gives way to the book
    const bookSeen = btw(t, cue(K, id, 'теори') - .2, cue(K, id, 'теори') + .3);   // v6: once the book came, the globe never returns
    if (eo < .99 && bookSeen < .99) {
      const cm = btw(t, t0 + .5, cEi + .5), sc = lerp(1, 1.45, cm) * lerp(1, .3, eo);
      const cx = lerp(86, 150, cm) - 120 * eo, cy = lerp(92, 150, cm) - 130 * eo;
      s += `<g opacity="${f((1 - eo) * (1 - bookSeen))}" transform="translate(${f(cx - 86 * sc)} ${f(cy - 92 * sc)}) scale(${f(sc)})">${gps(t, K, { phone: false })}</g>`;
    }
    // blind view v2 A16: «теорию относительности Эйнштейна ты понял? Честно — я не с первого раза» — a thick book ОТО 1915
    // opens and its pages flicker; on «не с первого» it shuts and opens again from the first page; it goes on «чёрных»
    {
      const cNe = (K.words?.[id] || []).some(x => norm(x.w).startsWith('перв')) ? cue(K, id, 'перв') : 1e6, bk = bookOn, BXk = 180, BYk = 196;
      if (bk > .01) {
        const shut = btw(t, cNe - .4, cNe - .1) * (1 - btw(t, cNe + .2, cNe + .6)), open = btw(t, cEi, cEi + .5) * (1 - shut);
        const wpg = 62 * open;
        let g = `<rect x="${f(BXk - 4)}" y="${f(BYk - 44)}" width="8" height="88" fill="#fff" fill-opacity=".2" stroke="#fff" stroke-width=".9"/>`;
        g += `<path d="M${f(BXk)} ${f(BYk - 44)} L${f(BXk - wpg - 8)} ${f(BYk - 40)} L${f(BXk - wpg - 8)} ${f(BYk + 46)} L${f(BXk)} ${f(BYk + 44)} Z" fill="#000" stroke="#fff" stroke-width="1"/>`;
        g += `<path d="M${f(BXk)} ${f(BYk - 44)} L${f(BXk + 62 + 8)} ${f(BYk - 40)} L${f(BXk + 62 + 8)} ${f(BYk + 46)} L${f(BXk)} ${f(BYk + 44)} Z" fill="#000" stroke="#fff" stroke-width="1"/>`;
        for (let j = 0; j < 6; j++) g += UN.thread([BXk + 12, BYk - 30 + j * 11], [BXk + 58, BYk - 29 + j * 11], { width: .6, opacity: .5 });
        for (let j = 0; j < 6 && open > .5; j++) g += UN.thread([BXk - 12, BYk - 30 + j * 11], [BXk - wpg + 4, BYk - 29 + j * 11], { width: .6, opacity: .5 * open });
        const fl = ((t - cEi) * 2.4) % 1;   // a page flips over
        if (open > .5 && fl > 0) g += `<path d="M${f(BXk)} ${f(BYk - 44)} L${f(BXk + 62 * Math.cos(Math.PI * fl))} ${f(BYk - 42)} L${f(BXk + 62 * Math.cos(Math.PI * fl))} ${f(BYk + 45)} L${f(BXk)} ${f(BYk + 44)} Z" fill="#000" stroke="#fff" stroke-width=".7" opacity=".8"/>`;
        s += `<g opacity="${f(bk)}" transform="translate(${BXk} ${BYk}) scale(1.45) translate(${-BXk} ${-BYk})">${g}</g>` + plate(BXk, BYk + 92, 'ТЕОРИЯ ОТНОСИТЕЛЬНОСТИ', bk, 15) + plate(BXk, BYk + 118, '1915', bk, 15);   // v4 A6: full words
      }
    }
    // the hole: grows in on «чёрных», drifts closer, recedes on «вот как я это вижу»
    // blind view 03.11: on the last «Пространства — чёрная дыра» the hole comes back over the films
    const hOp = bIn * Math.max(1 - bOut, back);
    const hx = 78 * back;   // v5: when the hole comes back it stands on the right half, the apples on the left
    const backR = v43 ? 0 : back, hsc = 1 - .3 * backR, htx = lerp(BX, 262, backR) - BX * hsc, hty = BY - BY * hsc;   // v7: v43 — the hole in the middle
    s += `<g transform="translate(${f(htx)} ${f(hty)}) scale(${f(hsc)})">`;
    if (hOp > .01) {
      const sc = lerp(.35, 1, bIn) * (1 + .07 * btw(t, cCh + .5, cVo)) * lerp(1, v43 ? .02 : .45, bOut) * lerp(1, 1.9, back);
      const rot = .38 * (t - t0) - .26 * rampInt(t, cZa - .1, cZa + .7);
      s += `<g transform="translate(${f(BX * (1 - sc))} ${f(BY * (1 - sc))}) scale(${f(sc)})">` +
        field(t, cGr, btw(t, cGr - .1, cGr + .6) * hOp) + hole(t, rot, hOp) + '</g>';
    }
    if (back > .01) {   // blind view v2 A5: the hole comes back with its two big clocks — far away they run, by the hole they nearly stand
      // v4 A3: space as lines — a funnel of ellipses sinking into the hole, at least a quarter of the frame deep
      let fn = '';
      const deep = back * (1 + .6 * (v43 ? btw(t, cIsk2 - .1, cIsk2 + .6) : btw(t, cSp2 - .1, cSp2 + .6)));   // v5: on «Пространства — чёрная дыра» the funnel sinks deeper
      for (let k = 0; k < 7; k++) { const q = k / 6, rx = 150 - 108 * q, ry = 34 - 20 * q, cy = BY - 40 + 120 * q * q * deep; fn += `<ellipse cx="${BX}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#fff" stroke-width="${f(.9 - .3 * q)}" opacity="${f(.6 * back)}"/>`; }
      for (let k = 0; k < 10; k++) { const a = k / 10 * 2 * Math.PI, pts = []; for (let j = 0; j <= 6; j++) { const q = j / 6; pts.push([BX + Math.cos(a) * (150 - 108 * q), BY - 40 + 120 * q * q * deep + Math.sin(a) * (34 - 20 * q)]); } fn += UN.polyline(pts, { width: .6, opacity: .45 * back }); }
      s += fn;
      if (!v43) s += TS.clock(78, 104, 26, .3 + 2.2 * (t - t0), { trail: .7, opacity: back }) + plate(78, 152, 'ВДАЛИ', back, 14) +
        TS.clock(282, 120, 26, .6 + .15 * (t - t0), { trail: .1, opacity: back }) + plate(282, 168, 'У ДЫРЫ', back, 14);
    }
    // v6: «замедляет в нём все процессы» — small clocks (processes) fall toward the hole and their hands slow down near it
    const prc = btw(t, cZa - .3, cZa + .3) * (1 - btw(t, cVo - .3, cVo + .2)) * (1 - split43);
    if (prc > .01) {
      let g = '';
      for (let k = 0; k < 6; k++) {
        const q = ((t - cZa) * .18 + k / 6) % 1, rr = lerp(165, BR + 14, q * q), a = k * 1.05 + .4;
        const x = BX + Math.cos(a) * rr, y = BY + Math.sin(a) * rr * .8, sp = lerp(3.2, .15, q);
        g += TS.clock(x, y, 10, (t - cZa) * sp + k, { trail: .4, opacity: (1 - .4 * q) });
      }
      s += G(prc, g);
    }
    s += '</g>';
    const fm43 = v43 ? btw(t, cVo + .15, cVo + .85) * (1 - btw(t, cMol43 - .35, cMol43 + .1)) : 0;
    const FX = 180, FY = 262, FWW = 84, FHH = 112, FG = 12;
    if (fm43 > .01) {
      const DEC = [0, .5, 1], YAW = [.35, .62, .9], CAP = ['СВЕЖЕЕ', 'ПОТЕМНЕЛО', 'СГНИЛО'];
      const pos = 2 * clamp((t - cVo - .6) / Math.max(.5, cMol43 - .5 - cVo - .6)), unf = btw(t, cVo + .15, cVo + .85);
      const strip = TS.strip(FX, FY, {
        n: 3, w: FWW, h: FHH, gap: FG, id: 'e43', t: t * .3, capSize: 12,
        frame: (i, cx, cy, w) => TS.apple(cx, cy + FHH * .06, w * .37, { decay: DEC[i], t: t + i * .7, yaw: YAW[i], seed: i + 1 }),
        lit: i => Math.max(.22, 1 - 1.2 * Math.abs(i - pos)), caption: i => CAP[i],
      });
      s += `<g opacity="${f(fm43)}" transform="translate(${FX} ${FY}) scale(${f(lerp(.04, 1, unf))} 1) translate(${-FX} ${-FY})">${strip}</g>`;
    }
    if (v43 && split43 > .01) {   // v7 A6: «Меняются молекулы — яблоко гниёт» — one big apple in the middle, МОЛЕКУЛЫ above it
      const dA = clamp((t - cMol43) / 2.2), gq = btw(t, cMol43 - .4, cMol43 + .35);   // v8 A2: grows out of the frame СВЕЖЕЕ
      const ax = lerp(FX - FWW - FG, 180, gq), ay = lerp(FY + FHH * .06, 222, gq), ar = lerp(FWW * .37, 76, gq);
      s += G(split43, TS.apple(ax, ay, ar, { decay: .02 + .95 * dA, t, yaw: .4 })) +
        plate(180, 112, 'МОЛЕКУЛ', btw(t, cMol43 - .1, cMol43 + .25) * (1 - btw(t, cSpc43 - .25, cSpc43 + .15)), 18);
    }
    if (v43 && back > .01) s += plate(180, 80, 'ИЛИ ПРОСТРАНСТВА', back, 18);   // v7 A6: the hole's own line
    // two clocks: by the hole the hand nearly stops on «замедляется», far away it keeps going
    const ck = btw(t, cCh + .1, cCh + .6) * (1 - bOut) * (1 - split43) * (cIsk > (K[id] ?? 0) ? 1 - btw(t, cIsk - .4, cIsk) : 1);   // v7: one thing per line   // v43: the split frame has its own clocks
    if (ck > .01) {
      const tN = (t - t0) - .95 * rampInt(t, cZa - .1, cZa + .7), tF = t - t0, w = 1.7, slow = btw(t, cZa - .1, cZa + .7);
      const pulse = (x, y, r, b, op) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r + 13 * b)}" fill="none" stroke="#fff" stroke-width=".6" opacity="${f(.5 * (1 - b) * op)}"/>`;
      const fr = x => ((x % 1) + 1) % 1;
      s += pulse(NEAR[0], NEAR[1], 16, fr(tN * .8), ck) + pulse(FAR[0], FAR[1], 16, fr(tF * .8), ck);
      s += `<line x1="${f(NEAR[0] - 11)}" y1="${f(NEAR[1] + 12)}" x2="${f(BX + BR * .9)}" y2="${f(BY - BR * .9)}" stroke="#fff" stroke-width=".5" stroke-dasharray="1.5 3" opacity="${f(.35 * ck * (1 - .5 * bOut))}"/>`;
      s += TS.clock(NEAR[0], NEAR[1], 22, .6 + w * tN, { trail: lerp(.7, .12, slow), opacity: ck });
      s += TS.clock(FAR[0], FAR[1], 22, .3 + w * tF, { trail: .7, opacity: ck });
      s += plate(NEAR[0], NEAR[1] - 34, 'У ДЫРЫ', ck, 14);
      s += plate(FAR[0], FAR[1] + 40, 'ВДАЛИ', ck, 14);
      // blind view 03.11: «Как холод — яблоко, только всё сразу» — an apple by each clock; by the hole it freezes
      // together with its clock (no shimmer), far away it keeps its shimmer
      const hasCo = (K.words?.[id] || []).some(x => norm(x.w).startsWith('холод')), cCo = hasCo ? cueAny(K, id, ['холод'], 0) : 1e6, ap = btw(t, cCo - .1, cCo + .4) * ck;   // v43: no «холод» — no apples
      if (ap > .01) {
        s += TS.apple(NEAR[0] + 46, NEAR[1] + 4, 21, { cold: slow, t: t0 + (t - t0) * (1 - slow), yaw: .4, opacity: ap });
        s += TS.apple(FAR[0] + 48, FAR[1] + 2, 21, { cold: 0, t, yaw: .4, opacity: ap });
      }
    }
    // y 52, not 32: the story's top source line (y 12, up to two lines) must not touch it
    if (false) s += label(180, 52, 'ЭЙНШТЕЙН · ОТО · 1915',   // blind view: the source line «Эйнштейн, ОТО, 1915» says it
       btw(t, cEi - .1, cEi + .35) * (1 - btw(t, cVo - .1, cVo + .5)), { size: 10.5, glow: true });
    s += qmark(304, 84, 52, t, btw(t, cPq - .2, cPq + .3) * (1 - btw(t, cGr + .3, cGr + .9)));
    // the films: three speeds of change; particles of the object on «изменения»/«молекул», of space on «пространства»
    if (fIn > .01) {
      const mol = Math.max(.5 * btw(t, cPr2 - .1, cPr2 + .5), btw(t, cMo - .1, cMo + .45));
      // blind view v3 A2: no third film strip — one large pair as in 1:44 (understood by all): the cold apple stays fresh,
      // the warm one runs from fresh to rotten, one common clock above; ОТНОСИТЕЛЬНО between; for a moment the clocks
      // ВДАЛИ / У ДЫРЫ under the pair with the same difference; on «молекул» the warm apple comes closer
      // v4 A3: when the hole comes, the pair moves to the lower left, small; it lights up again on «Молекул — яблоко»
      const cMo2 = cueAny(K, id, ['молекул'], 1), side = back, hiP = 1 - .55 * side + .55 * side * btw(t, cMo2 - .1, cMo2 + .3) * (1 - btw(t, cSp2 - .2, cSp2 + .2));
      const pr = btw(t, cSk - .35, cSk + .3) * hiP, zoomW = btw(t, cMo - .1, cMo + .5) * (1 - btw(t, cSp - .3, cSp + .2));
      if (pr > .01) {
        const dW = clamp((t - cSk) / 3.5), rW = 44 * (1 + .25 * zoomW);   // v5: the warm apple rots once and stays rotten
        let g = TS.apple(98, 200, 46, { cold: 1, decay: .02, t: t * .15, yaw: .4 }) + TS.apple(264 - 10 * zoomW, 204, rW, { decay: dW, t, yaw: .4 });
        // v5: each apple has its own clock — the cold one barely moves, the warm one runs
        g += TS.clock(98, 108, 24, 1 + (t - cSk) * .25, { trail: .2 }) + TS.clock(264, 108, 24, 1 + (t - cSk) * 2.4, { trail: .6 });
        const tr = `translate(${f(lerp(0, -18, side))} ${f(lerp(0, 80, side))}) scale(${f(lerp(1, .6, side))})`;   // v5: «яблоко | дыра» — the pair on the left half
        s += `<g transform="${tr}">` + G(pr, g) + plate(98, 274, 'В ХОЛОДЕ', pr, 15) + plate(264, 274, 'В ТЕПЛЕ', pr, 15) + '</g>';
        s += plate(181, 316, 'ОТНОСИТЕЛЬНО', btw(t, cOt - .1, cOt + .4) * pr * (1 - side), 18);
        // v8 A3: the pale clocks ВДАЛИ / У ДЫРЫ under the apples are gone — under the warm (fast) apple they read as
        // «тепло = у дыры», the opposite of the claim
      }
      if (false) s += films(t, K, { idp: 'eb', at: cSk - .35, mol, molSp: wave, opacity: 1 - back });
    }
    return s;
  }

  const body = (t, K, mode) => {
    K = K || {};
    if (mode === 'gps') return gps(t, K);
    if (mode === 'relative') return relative(t, K);
    if (mode === 'blackhole') return blackhole(t, K);
    return gravity(t, K);
  };
  SCENES.ts_earth = function (u, p, d, t) {
    // blind view v3 A9: into the satellite the old scene (with its labels) leaves in .3 s, not .7
    const K = p.K || {}, t0 = (K[p.s] ?? (t - u + .05)) - .05, q = btw(t, t0, t0 + (p.mode === 'gravity' ? .04 : p.mode === 'gps' ? .3 : .7));   // v7 A3: into gravity a straight cut in the pause
    let s = G(q, body(t, K, p.mode));
    if (q < 1 && p.prev && SCENES[p.prev] && typeof SCENES[p.prev].body === 'function') s = G(1 - q, SCENES[p.prev].body(t, K, p.prev_mode)) + s;
    return UN.wrap(s);
  };
  SCENES.ts_earth.body = body;
  SCENES.ts_earth.films = films;
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_earth; SCENES.ts_earth = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
