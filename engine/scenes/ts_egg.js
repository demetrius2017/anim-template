/* «Время — это трансформация» (eps/time_states), сцена ts_egg — стрела времени: яйцо, атомы, беспорядок.
 * Стиль «Сеть внутри сети»: чёрный фон, белые точки, шары на нитях, плёнка состояний; красного нет.
 * SCENES.ts_egg(u,p,d,t) → UN.wrap(...); SCENES.ts_egg.body(t,K,mode) → сырой SVG без wrap и без фона.
 * p: s — id фразы кадра, mode, K — абсолютные времена (K[id], K[id+'_end'], K.words[id]),
 *   prev/prev_mode — сцена, из которой входим. Секунд руками нет: всё от слов через cue().
 * Наплыв: входящая сцена владеет 0,7 с от K[p.s]-0.05 (SCENES[prev].body, иначе из чёрного).
 * Плёнка яйца (break/reverse): кадр k хранит состояние broken=(k−kA)/4, кадр под центром светится,
 *   поэтому плёнка идёт вперёд, пока яйцо бьётся, и назад, пока оно собирается.
 * Режимы:
 *   break    (d1, вход из ts_earth/relative): три плёнки relative съезжаются в одну («направление»),
 *            у неё наконечник → и моно ВПЕРЁД («вперёд»); на «разбей» появляется большое яйцо, на «яйцо» —
 *            трещина, на «осколки» — разлёт (TS.egg broken 0→1); кадры плёнки записывают это;
 *            на «естественно» — моно ЕСТЕСТВЕННО. Слияние берёт SCENES.ts_earth.films (если нет — одна плёнка).
 *   reverse  (d2): на «прокрути» плёнка бежит назад, яйцо собирается (broken 1→0) до «ты»; на «назад» —
 *            наконечник ◂ слева, значок ◂◂ и НАЗАД; на «подделку» — кадры перечёркнуты и помечены
 *            перечёркнутым ◂◂, моно НЕ БЫВАЕТ.
 *   atoms    (d3): два атома сталкиваются и разлетаются (запись «вперёд» от «столкновение» до «назад»),
 *            затем та же запись назад (от «назад» до «заметишь»); две плёнки ВПЕРЁД и НАЗАД заполняются
 *            кадрами, обе без пометки подделки; на «подмены» между ними знак «=».
 *   disorder (d4 + d5 в одном кадре): два атома качаются, двойная стрелка и НАПРАВЛЕНИЯ НЕТ («направление»);
 *            на «яйце» атомы растворяются в облаке точек яйца, точек всё больше до «множество»;
 *            на «разлететься» — веер многих траекторий РАЗЛЕТЕТЬСЯ; на «собраться» — одна узкая тропа
 *            СОБРАТЬСЯ, гаснет на «никак»; на «видим» веер ярче; на «привычным» внизу плёнка разбитых яиц;
 *            на «естественный» веер и облако складываются в одну стрелу вдоль плёнки, камера поднимается;
 *            моно САМЫЙ ВЕРОЯТНЫЙ («самый»), затем ПРИВЫЧНЫЙ ХОД («привычный»). Дальше ts_save (его наплыв).
 * Детерминизм: только t и K; случайность — UN.hash; облако точек — неизменяемый кэш геометрии.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const btw = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const lerp = (a, b, q) => a + (b - a) * q;
  const lerp2 = (a, b, q) => [lerp(a[0], b[0], q), lerp(a[1], b[1], q)];
  const H = n => UN.hash(n);
  const norm = w => String(w).toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  const cue = (K, id, stem, fb, n = 0) => {
    const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(stem))[n];
    return a ? a.t0 : (K[id] ?? fb ?? 0);
  };
  const rampInt = (t, a, b) => {
    if (t <= a) return 0;
    const L = Math.max(.001, b - a), x = clamp((t - a) / L);
    return L * (x * x * x - x * x * x * x / 2) + Math.max(0, t - b);
  };
  const dot = (x, y, r, o) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(o)}"/>`;
  const G = (op, s) => (op <= .003 || !s) ? '' : (op >= .997 ? s : `<g opacity="${f(op)}">${s}</g>`);
  const label = (x, y, text, op, o = {}) => op <= .01 ? '' :
    UN.mono(x, y, text, { size: o.size ?? 9.4, anchor: o.anchor ?? 'middle', opacity: .9 * op, glow: o.glow });
  const back = (x, y, w, h, op) => op <= .01 ? '' : `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="2" fill="#000" opacity="${f(.8 * op)}"/>`;

  function film(x, y, s, o) {
    const w = o.w ?? 40, h = o.h ?? 52, gap = o.gap ?? 10, P = w + gap, N = o.n ?? 9, half = (N - 1) / 2;
    const base = Math.floor(s / P), frac = s - base * P;
    return TS.strip(x, y, {
      n: N, w, h, gap, offset: -frac, view: o.view ?? 150, id: o.id, t: o.t, opacity: o.opacity ?? 1,
      frame: (i, cx, cy, ww, hh) => o.frame(base + i - half, cx, cy, ww, hh),
      lit: i => { const d = Math.abs(-frac + (i - half) * P) / P; return Math.max(o.dim ?? .3, 1 - d); },
    });
  }
  // icons: ▸ forward, ◂◂ rewind, crossed ◂◂ (fake)
  const fwdIcon = (x, y, op, k = 1) => `<path d="M${f(x)} ${f(y - 5 * k)} L${f(x + 8 * k)} ${f(y)} L${f(x)} ${f(y + 5 * k)} Z" fill="#fff" opacity="${f(op)}"/>`;
  const rewIcon = (x, y, op, k = 1) => `<path d="M${f(x + 8 * k)} ${f(y - 5 * k)} L${f(x)} ${f(y)} L${f(x + 8 * k)} ${f(y + 5 * k)} Z M${f(x + 16 * k)} ${f(y - 5 * k)} L${f(x + 8 * k)} ${f(y)} L${f(x + 16 * k)} ${f(y + 5 * k)} Z" fill="#fff" opacity="${f(op)}"/>`;
  const fakeIcon = (x, y, op, k = 1) => op <= .01 ? '' : rewIcon(x - 8 * k, y, op, k) +
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(10 * k)}" fill="none" stroke="#fff" stroke-width="${f(.9 * k)}" opacity="${f(op)}"/>` +
    `<line x1="${f(x - 7 * k)}" y1="${f(y + 7 * k)}" x2="${f(x + 7 * k)}" y2="${f(y - 7 * k)}" stroke="#fff" stroke-width="${f(1.1 * k)}" opacity="${f(op)}"/>`;

  /* small egg for film frames: contour, crack, shards, puddle and yolk (TS.egg is ~550 elements) */
  function miniEgg(cx, cy, r, b, op = 1) {
    if (op <= .01) return '';
    const fly = ease((b - .12) / .88), crack = ease(b / .05) * (1 - ease((b - .14) / .08));
    const ep = a => [Math.sin(a) * .76 * r * (1 - .1 * Math.cos(a)), -Math.cos(a) * r];
    let s = '';
    if (fly > 0) {
      const py = cy + .95 * r, rx = r * (.45 + 1.3 * fly), ry = r * (.08 + .1 * fly);
      s += `<ellipse cx="${f(cx)}" cy="${f(py)}" rx="${f(rx)}" ry="${f(ry)}" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-width=".5" opacity="${f(.8 * ease(fly / .3))}"/>`;
      s += `<circle cx="${f(cx)}" cy="${f(lerp(cy + .2 * r, py - .12 * r, ease(fly / .6)))}" r="${f(r * .2)}" fill="#fff" opacity=".85"/>`;
      for (let k = 0; k < 6; k++) {
        const a0 = k / 6 * 2 * Math.PI, a1 = (k + 1) / 6 * 2 * Math.PI, am = (a0 + a1) / 2;
        const dx = Math.sin(am) * (.5 + .5 * H(k + 61)) * r * 1.1 * fly, dy = (-Math.cos(am) * .4 - .8) * r * fly + 1.3 * r * fly * fly;
        const pts = []; for (let j = 0; j <= 6; j++) { const p = ep(lerp(a0, a1, j / 6)); pts.push([cx + p[0] * .9 + dx, cy + p[1] * .9 + dy]); }
        s += UN.polyline(pts, { opacity: .85, width: .7 });
      }
    } else {
      const pts = []; for (let j = 0; j <= 32; j++) pts.push((p => [cx + p[0], cy + p[1]])(ep(j / 32 * 2 * Math.PI)));
      s += UN.polyline(pts, { opacity: .25, width: 1.8, glow: true }) + UN.polyline(pts, { opacity: .85, width: .7 });
      let d = '';
      for (let i = 0; i < 12; i++) { const a = i * 2.39996, q = Math.sqrt((i + .5) / 12) * .7; d += dot(cx + Math.cos(a) * q * .7 * r, cy + Math.sin(a) * q * r, .6, .55); }
      s += `<g fill="#fff">${d}</g>`;
      if (crack > 0) {
        const c = []; for (let k = 0; k <= 6; k++) c.push([cx + (-.55 + 1.1 * k / 6) * .76 * r, cy + (k % 2 ? .1 : -.08) * r]);
        s += UN.polyline(c, { opacity: .95 * crack, width: .8 });
      }
    }
    return G(op, s);
  }
  // a frame marked as fake: strike line and crossed rewind sign
  const fakeMark = (cx, cy, w, h, op) => op <= .01 ? '' :
    `<line x1="${f(cx - w / 2 + 3)}" y1="${f(cy + h / 2 - 3)}" x2="${f(cx + w / 2 - 3)}" y2="${f(cy - h / 2 + 3)}" stroke="#fff" stroke-width=".9" opacity="${f(.75 * op)}"/>` +
    fakeIcon(cx, cy - h / 2 + 9, op, .45);

  /* ---------------- shared timeline of the egg film ---------------- */
  const EX = 180, EY = 136, ER = 56;                     // big egg
  const FY = 282, FW = 40, FH = 52, FG = 10, FP = FW + FG, FM = 4, VC = 30;
  function eggTimes(K) {
    const tB = (K.d1 ?? 0) - .05, e0 = cue(K, 'd1', 'разбей'), e1 = e0 + .7;
    const sFinal = VC * ((e1 - tB) - (e1 - e0) * .5);
    return { tB, e0, e1, sFinal, kA: sFinal / FP };
  }
  const sDrift = (t, T) => VC * ((t - T.tB) - rampInt(t, T.e0, T.e1));
  function brokenAt(t, K) {
    const cY = cue(K, 'd1', 'яйцо'), cO = cue(K, 'd1', 'осколки'), cV = cue(K, 'd1', 'выглядит');
    if (t < cO) return .12 * btw(t, cY, cO);
    return .12 + .88 * clamp((t - cO) / Math.max(.5, cV + .3 - cO));
  }
  function eggFilm(t, K, s, o = {}) {
    const T = eggTimes(K);
    return film(180, FY, s, {
      id: o.id, w: FW, h: FH, gap: FG, n: 9, view: 142, t, opacity: o.opacity ?? 1, dim: .3,
      frame: (k, cx, cy) => miniEgg(cx, cy + 1, 17, clamp((k - T.kA) / FM), o.in ?? 1) + fakeMark(cx, cy, FW, FH, o.fake ?? 0),
    });
  }
  const headR = op => op <= .01 ? '' : `<path d="M330 ${FY - 17} L347 ${FY} L330 ${FY + 17}" fill="none" stroke="#fff" stroke-width="1.1" opacity="${f(op)}"/>` +
    `<path d="M330 ${FY - 17} L347 ${FY} L330 ${FY + 17}" fill="none" stroke="#fff" stroke-width="3" opacity="${f(.3 * op)}" filter="url(#un-soft)"/>`;
  const headL = op => op <= .01 ? '' : `<path d="M30 ${FY - 17} L13 ${FY} L30 ${FY + 17}" fill="none" stroke="#fff" stroke-width="1.1" opacity="${f(op)}"/>` +
    `<path d="M30 ${FY - 17} L13 ${FY} L30 ${FY + 17}" fill="none" stroke="#fff" stroke-width="3" opacity="${f(.3 * op)}" filter="url(#un-soft)"/>`;
  // dashed tie from the big egg to the lit frame: the film records the egg
  const tie = op => op <= .01 ? '' : `<line x1="${EX}" y1="${EY + ER + 14}" x2="${EX}" y2="${FY - FH / 2 - 10}" stroke="#fff" stroke-width=".5" stroke-dasharray="1.5 3" opacity="${f(.4 * op)}"/>`;

  /* ---------------- break (d1) ---------------- */
  function brk(t, K) {
    const id = 'd1';
    const cNap = cue(K, id, 'направлен'), cVp = cue(K, id, 'вперёд'), cRaz = cue(K, id, 'разбей'), cEs = cue(K, id, 'естествен');
    const T = eggTimes(K), mg = btw(t, cNap - .1, cVp + .2);
    let s = '';
    const ef = SCENES.ts_earth && typeof SCENES.ts_earth.films === 'function';
    const oneIn = ef ? btw(t, cVp - .35, cVp + .25) : 1;
    if (ef && oneIn < .999) s += G((1 - oneIn) * (1 - .45 * mg), SCENES.ts_earth.films(t, K, { merge: mg, toY: FY, vC: VC, mA: cNap - .1, mB: cVp + .2, fade: mg, idp: 'em' }));
    const b = brokenAt(t, K), sNow = sDrift(t, T) + FP * FM * b;
    const eggIn = btw(t, cRaz - .25, cRaz + .35);
    s += eggFilm(t, K, sNow, { id: 'eb', opacity: oneIn, in: .35 * oneIn + .65 * eggIn });
    s += headR(btw(t, cNap + .2, cVp + .1));
    const vp = btw(t, cVp - .1, cVp + .35);
    s += label(320, FY - 40, 'ВПЕРЁД', vp, { anchor: 'end', size: 10 }) + fwdIcon(326, FY - 43.5, .9 * vp);
    s += label(20, FY - 40, 'ЕСТЕСТВЕННО', btw(t, cEs - .1, cEs + .4), { anchor: 'start' });
    if (eggIn > .01) {
      s += tie(eggIn);
      s += TS.egg(EX, EY - 18 * (1 - eggIn), ER, { broken: b, t, opacity: eggIn });
    }
    return s;
  }

  /* ---------------- reverse (d2) ---------------- */
  function rev(t, K) {
    const id = 'd2';
    const cPr = cue(K, id, 'прокрути'), cNa = cue(K, id, 'назад'), cTy = cue(K, id, 'ты'), cPd = cue(K, id, 'подделк');
    const T = eggTimes(K), b = 1 - btw(t, cPr + .1, Math.max(cPr + 1.2, cTy));
    const rv = btw(t, cNa - .25, cNa + .3), fk = btw(t, cPd - .15, cPd + .35);
    let s = '';
    s += eggFilm(t, K, T.sFinal + FP * FM * b, { id: 'ev', fake: fk });
    s += headR(1 - rv) + headL(rv);
    s += label(320, FY - 40, 'ВПЕРЁД', 1 - rv, { anchor: 'end', size: 10 }) + fwdIcon(326, FY - 43.5, .9 * (1 - rv));
    s += rewIcon(20, FY - 43.5, .9 * rv) + label(42, FY - 40, 'НАЗАД', rv, { anchor: 'start', size: 10 });
    s += tie(1 - fk);
    const bob = 1.2 * Math.sin(t * 2.1) * (1 - b);
    s += TS.egg(EX, EY + bob, ER, { broken: b, t });
    if (fk > .01) {
      s += back(118, 216, 124, 20, fk) + label(188, 231, 'НЕ БЫВАЕТ', fk, { size: 12, glow: true }) + fakeIcon(130, 226, fk, .62);
    }
    return s;
  }

  /* ---------------- atoms (d3) ---------------- */
  const A0 = [[56, 66], [164, 120], [60, 186]], B0 = [[304, 174], [196, 120], [300, 54]];
  const posAt = (P, tau) => tau < .5 ? lerp2(P[0], P[1], tau / .5) : lerp2(P[1], P[2], (tau - .5) / .5);
  function miniAtom(x, y, ph, tilt) {
    const ca = Math.cos(tilt * Math.PI / 180), sa = Math.sin(tilt * Math.PI / 180), ex = Math.cos(ph) * 6.5, ey = Math.sin(ph) * 2.1;
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="6.5" ry="2.1" transform="rotate(${tilt} ${f(x)} ${f(y)})" fill="none" stroke="#fff" stroke-width=".45" opacity=".75"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="2.3" fill="url(#un-ball)" stroke="#fff" stroke-width=".4"/>` +
      `<circle cx="${f(x + ex * ca - ey * sa)}" cy="${f(y + ex * sa + ey * ca)}" r=".9" fill="#fff"/>`;
  }
  function atomsAt(tau, t, map, big) {
    const pa = posAt(A0, tau), pb = posAt(B0, tau), ph = 9 * tau;
    if (!big) { const a = map(pa), c = map(pb); return miniAtom(a[0], a[1], ph + 1, 28) + miniAtom(c[0], c[1], -ph + 2.5, -22); }
    let s = '';
    const flash = Math.exp(-Math.pow((tau - .5) / .06, 2));
    if (flash > .02) s += `<circle cx="180" cy="120" r="${f(30 + 20 * flash)}" fill="url(#un-halo)" opacity="${f(.9 * flash)}"/>`;
    s += TS.atom(pa[0], pa[1], 24, { phase: ph + 1, tilt: 28 });
    s += TS.atom(pb[0], pb[1], 24, { phase: -ph + 2.5, tilt: -22 });
    return s;
  }
  function atomStrip(y, id, reverse, playPos, t, cap, capOp) {
    // 5 frames of the same recording; reverse strip shows it from the end; frames fill as the playhead passes
    const n = 5, w = 46, h = 36, gap = 8, x = 214;
    const map = (cx, cy) => p => [cx + (p[0] - 180) * .15, cy + (p[1] - 120) * .19];
    let s = TS.strip(x, y, {
      n, w, h, gap, id, t,
      frame: (i, cx, cy) => { const seen = clamp((playPos - i) * 2 + 1); return G(seen, atomsAt(reverse ? 1 - i / 4 : i / 4, t, map(cx, cy), false)); },
      lit: i => .25 + .75 * clamp(1 - Math.abs(playPos - i)),
    });
    s += label(16, y + 4, cap, capOp, { anchor: 'start' });
    return s;
  }
  function atoms(t, K) {
    const id = 'd3';
    const cSt = cue(K, id, 'столкнов'), cNa = cue(K, id, 'назад'), cPo = cue(K, id, 'подмен'), cZa = cue(K, id, 'заметишь');
    const fwd = clamp((t - cSt) / Math.max(.8, cNa - cSt)), bwd = clamp((t - cNa) / Math.max(.8, cZa + .45 - cNa));
    const tau = t < cNa ? fwd : 1 - bwd, rv = btw(t, cNa - .15, cNa + .25);
    let s = atomsAt(tau, t, null, true);
    // big-view label: ▸ ВПЕРЁД, then ◂◂ НАЗАД — neither is marked as fake
    s += fwdIcon(18, 26.5, .9 * (1 - rv)) + label(32, 30, 'ВПЕРЁД', 1 - rv, { anchor: 'start', size: 10 });
    s += rewIcon(16, 26.5, .9 * rv) + label(38, 30, 'НАЗАД', rv, { anchor: 'start', size: 10 });
    s += atomStrip(246, 'ea1', false, t < cSt ? -1 : fwd * 4, t, 'ВПЕРЁД', 1);
    s += atomStrip(304, 'ea2', true, t < cNa ? -1 : bwd * 4, t, 'НАЗАД', .4 + .6 * btw(t, cNa - .2, cNa + .3));
    const eq = btw(t, cPo - .1, cPo + .35);
    if (eq > .01) s += G(eq, UN.thread([18, 272], [36, 272], { width: 1.2, opacity: .95 }) + UN.thread([18, 278], [36, 278], { width: 1.2, opacity: .95 }));
    return s;
  }

  /* ---------------- disorder (d4 + d5) ---------------- */
  let cloud = null; // immutable geometry cache (built once from UN.hash)
  function cloudPts() {
    if (cloud) return cloud;
    const N = 560, pts = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - 2 * (i + .5) / N, rr = Math.sqrt(1 - y * y), a = i * 2.39996;
      const k = i % 4 === 3 ? Math.cbrt(UN.hash(i + 900)) * .85 : 1, w = .76 * (1 + .1 * y);
      pts.push([rr * Math.cos(a) * w * k, y * k, rr * Math.sin(a) * w * k, UN.hash(i + 950)]);
    }
    return (cloud = Object.freeze(pts));
  }
  const FAN = 60;
  function disorder(t, K) {
    const id = 'd4', fb5 = K.d4_end ?? K.d4;
    const c = s => cue(K, id, s), c5 = s => cue(K, 'd5', s, fb5);
    const tD = (K[id] ?? 0) - .05;
    const cNap = c('направлен'), cYa = c('яйце'), cMn = c('множеств'), cRz = c('разлететь'), cSp = c('способ'),
      cSb = c('собрать'), cNi = c('никак'), cVi = c5('видим'), cPv = c5('привычным'), cEs = c5('естествен'),
      cVr = c5('времени'), cSa = c5('самый'), cPy = c5('привычный');
    const AY = 232, SY = 284;
    const lift = btw(t, cVr + .2, cSa + .1), ty = -90 * lift;
    let s = '';
    // two atoms swing; then they melt into the egg cloud
    const aOut = btw(t, cYa - .3, cYa + .6);
    if (aOut < .99) {
      const mvIn = btw(t, tD, tD + 1.2), sep = 30 + 30 * Math.abs(Math.sin(1.15 * (t - tD) + .9));
      const A = lerp2(lerp2(A0[0], [180 - sep, 140], mvIn), [180, 150], aOut), B = lerp2(lerp2(B0[0], [180 + sep, 140], mvIn), [180, 150], aOut);
      const r = lerp(24, 4, aOut);
      s += G(1 - aOut, TS.atom(A[0], A[1], r, { phase: t * 2.4, tilt: 28 }) + TS.atom(B[0], B[1], r, { phase: -t * 2.4 + 1, tilt: -22 }));
      const ar = btw(t, cNap - .1, cNap + .4) * (1 - aOut);
      if (ar > .01) {
        let a = UN.thread([112, 204], [248, 204], { width: .9, opacity: .9 });
        a += UN.polyline([[120, 199], [112, 204], [120, 209]], { width: .9, opacity: .9 }) + UN.polyline([[240, 199], [248, 204], [240, 209]], { width: .9, opacity: .9 });
        s += G(ar, a) + label(180, 226, 'НАПРАВЛЕНИЯ НЕТ', ar);
      }
    }
    // egg cloud: more and more particles; moves aside for the fan; folds into the arrow
    const mv = btw(t, cRz - .3, cRz + .6), fd = btw(t, cEs - .05, cVr + .5);
    const ecx = lerp(180, 80, mv), ecy = lerp(150, 182, mv), eR = lerp(72, 46, mv);
    const flow = 46 * rampInt(t, cVr, cVr + 1.2);
    let fan = '', fanDots = '', cd = '';
    const pts = cloudPts(), nVis = lerp(40, pts.length, btw(t, cYa - .1, cMn + .6)), cIn = btw(t, cYa - .2, cYa + .4);
    if (cIn > .01) {
      const yaw = .25 * t, cy_ = Math.cos(yaw), sy_ = Math.sin(yaw);
      for (let i = 0; i < pts.length; i++) {
        const [x, y, z, h] = pts[i], X = x * cy_ + z * sy_, Z = -x * sy_ + z * cy_;
        const j = .7 * Math.sin(t * 5 + h * 40);
        let px = ecx + X * eR + j, py = ecy + y * eR + .7 * Math.cos(t * 4.3 + h * 50);
        let a = (.25 + .55 * clamp(.5 - Z)) * clamp(nVis - (i % 7 === 0 ? i * .1 : H(i + 1234) * pts.length));
        if (fd > 0) {
          const xs = 30 + ((H(i + 3001) * 300 + flow) % 300);
          px = lerp(px, xs, fd); py = lerp(py, AY + (H(i + 3101) - .5) * 5, fd);
          a *= lerp(1, .9 * clamp((xs - 30) / 20) * clamp((330 - xs) / 20), fd);
        }
        cd += dot(px, py, .55 + .5 * h, a);
      }
    }
    // fan of escape paths and one narrow path back
    const fanOp = btw(t, cRz - .15, cRz + .3);
    if (fanOp > .01) {
      const g = btw(t, cRz - .1, cSp + .4), bright = 1 + .7 * btw(t, cVi - .1, cVi + .6);
      for (let i = 0; i < FAN; i++) {
        const ang = (lerp(-31, 8, i / (FAN - 1)) + (H(i + 300) - .5) * 2.5) * Math.PI / 180, L = 190 + 45 * H(i + 400);
        const gi = clamp(g * 1.35 - H(i + 500) * .35);
        if (gi <= .01) continue;
        const P = sv => {
          let x = ecx + Math.cos(ang) * (eR * .5 + L * sv), y = ecy + Math.sin(ang) * (eR * .5 + L * sv) + 18 * sv * sv;
          if (fd > 0) { x = lerp(x, lerp(40, 328, sv), fd); y = lerp(y, AY + (i % 3 - 1) * 1.2, fd); }
          return [x, y];
        };
        const line = []; for (let k = 0; k <= 10; k++) line.push(P(gi * k / 10));
        fan += `<path d="M${line.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')}"/>`;
        const sv = (((t * .3 + H(i + 600)) % 1) + 1) % 1 * gi, p = P(sv);
        fanDots += dot(p[0], p[1], .9 + .5 * H(i + 700), Math.min(1, .55 * bright) * (1 - .6 * sv));
      }
      s += G(fanOp * (1 - .4 * fd), `<g fill="none" stroke="#fff" stroke-width=".45" opacity="${f(Math.min(.5, .2 * bright))}">${fan}</g>`);
      s += G(fanOp * (1 - fd), `<g fill="#fff">${fanDots}</g>`);
      const lt = fanOp * (1 - fd);
      s += back(270, 30, 76, 14, lt) + label(342, 40, 'РАЗЛЕТЕТЬСЯ', lt, { anchor: 'end' });
    }
    s += `<g fill="#fff">${cd}</g>`;
    const pathOp = btw(t, cSb - .1, cSb + .4) * (1 - .6 * btw(t, cNi - .1, cNi + .5)) * (1 - btw(t, cPv - .2, cPv + .4));
    if (pathOp > .01) {
      const P0 = [336, 314], C = [210, 332], P1 = [ecx + 8, ecy + eR * .95];
      const qb = q => [(1 - q) * (1 - q) * P0[0] + 2 * q * (1 - q) * C[0] + q * q * P1[0], (1 - q) * (1 - q) * P0[1] + 2 * q * (1 - q) * C[1] + q * q * P1[1]];
      const ln = []; for (let k = 0; k <= 24; k++) ln.push(qb(k / 24));
      let p = UN.polyline(ln, { opacity: .85, width: .7 }) + UN.polyline(ln, { opacity: .3, width: 2.2, glow: true });
      for (const q of [.25, .5, .75]) {
        const a = qb(q), b2 = qb(q + .02), dx = b2[0] - a[0], dy = b2[1] - a[1], n = Math.hypot(dx, dy) || 1, ux = dx / n, uy = dy / n;
        p += UN.polyline([[a[0] - ux * 4 - uy * 3, a[1] - uy * 4 + ux * 3], [a[0], a[1]], [a[0] - ux * 4 + uy * 3, a[1] - uy * 4 - ux * 3]], { opacity: .9, width: .8 });
      }
      const m = qb(((t * .22) % 1 + 1) % 1);
      p += UN.sphere(m[0], m[1], 2.2, { glow: .7, highlight: false });
      s += G(pathOp, p) + back(282, 290, 58, 14, pathOp) + label(336, 300, 'СОБРАТЬСЯ', pathOp, { anchor: 'end' });
    }
    // habit: the film of breaking eggs runs forward; the fan folds into one arrow along it
    const stOp = btw(t, cPv - .1, cPv + .5);
    if (stOp > .01) {
      const cyc = [0, .1, .45, .75, 1];
      s += film(180, SY, 34 * (t - cPv) + 7, { id: 'ed', w: FW, h: FH, gap: FG, n: 9, view: 160, t, opacity: stOp, dim: .3,
        frame: (k, cx, cy) => miniEgg(cx, cy + 1, 17, cyc[((k % 5) + 5) % 5], 1) });
    }
    if (fd > .01) {
      let ar = UN.polyline([[30, AY], [332, AY]], { opacity: .9 * fd, width: .9 }) + UN.polyline([[30, AY], [332, AY]], { opacity: .35 * fd, width: 3, glow: true });
      ar += `<path d="M320 ${AY - 10} L340 ${AY} L320 ${AY + 10}" fill="none" stroke="#fff" stroke-width="1.1" opacity="${f(fd)}"/>`;
      s += ar;
    }
    let out = ty ? `<g transform="translate(0 ${f(ty)})">${s}</g>` : s;
    const vOp = btw(t, cSa - .1, cSa + .4) * (1 - btw(t, cPy - .2, cPy + .2)), pOp = btw(t, cPy - .1, cPy + .4);
    out += label(180, AY - 90 - 26, 'САМЫЙ ВЕРОЯТНЫЙ', vOp, { size: 11 }) + label(180, AY - 90 - 26, 'ПРИВЫЧНЫЙ ХОД', pOp, { size: 11, glow: true });
    return out;
  }

  const body = (t, K, mode) => {
    K = K || {};
    if (mode === 'reverse') return rev(t, K);
    if (mode === 'atoms') return atoms(t, K);
    if (mode === 'disorder') return disorder(t, K);
    return brk(t, K);
  };
  SCENES.ts_egg = function (u, p, d, t) {
    const K = p.K || {}, t0 = (K[p.s] ?? (t - u + .05)) - .05, q = btw(t, t0, t0 + .7);
    let s = G(q, body(t, K, p.mode));
    if (q < 1 && p.prev && SCENES[p.prev] && typeof SCENES[p.prev].body === 'function') s = G(1 - q, SCENES[p.prev].body(t, K, p.prev_mode)) + s;
    return UN.wrap(s);
  };
  SCENES.ts_egg.body = body;
})();
