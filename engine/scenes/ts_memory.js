/* «Время — это трансформация» (time_states), сцена ts_memory — память как хранилище нарезок.
 * Вход из ts_save/jump: режим memory сам дорисовывает загруженный кадр (SCENES.ts_save.body(t,K,'jump',{ask}))
 * и гасит «?», поэтому наплыва там нет; на остальных границах — наплыв 0,6–0,9 с. Дальше ts_fall (он владеет
 * наплывом), поэтому body(t,K,'none') живёт и после конца фразы f3.
 *
 * Режимы p.mode:
 *   memory (f1) — «Вряд ли»: «?» гаснет; «копию… снять» — свет кадра рассыпается на точки; «хранилище» —
 *     точки собираются в голову в профиль (облако ≈ 650 точек, только голова, лицом вправо); «нарезок» —
 *     кадры плёнки влетают внутрь, к светящемуся ядру; «память» — подпись ПАМЯТЬ и нити ядра; «не вернёт
 *     в прошлое» — стрелка НАЗАД из затылка гаснет; «почувствовать прожитое» — за затылком вытягивается
 *     плёнка прожитого; «ощущение» — она светлеет; «запомнить предыдущие» — кадры загораются от головы
 *     назад и тянут нити к ядру.
 *   diary (f2) — страница дневника (без лица, силуэта и имени): строки «время моно + цитата курсивом»;
 *     цитата берётся из K.words.f2 (слова в «…»), запасной текст «Я только что проснулся».
 *     Начало: 14:10 зачёркнута; на «музыкант» пишется 14:14. «удерживал» — под страницей лента; «полминуты» (или «последние»)
 *     — светится только её правый кусочек: новые кадры приходят справа, уходя влево, гаснут. «годами, снова
 *     и снова, писал» — строки 14:35…15:15 появляются, прежняя зачёркивается; на «…» цитаты пишется 15:40;
 *     на «зачёркивал» медленно зачёркивается предыдущая.
 *   none (f3) — лента вырастает к центру и останавливается; на «нет … памяти» гаснут все кадры, кроме
 *     последнего; на «ощущения» тускнеет и он; остаётся только мерцание перфорации.
 * Слова: f1 — вряд, копи, снять, хранилищ, нарезок, память, вернёт, прошл, почувств, прожит, ощущени, запомн;
 *   f2 — удержива, полминут|последн|секунд, годами, снова(1, 2), писал, «…», зачёркив; f3 — нет, памяти, ощущени.
 * p: s, mode, K, prev/prev_mode. Камера движка нейтральна; лёгкий дрейф внутри сцены.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const lerp = (a, b, q) => a + (b - a) * q;
  const win = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const norm = w => String(w).toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  // first word starting with any of the stems; otherwise a fraction of the phrase
  const cue = (K, id, stems, frac = 0, nth = 0) => {
    for (const st of [].concat(stems)) {
      const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(st))[nth];
      if (a) return a.t0;
    }
    const a = K[id] ?? 0, b = K[id + '_end'] ?? a + 4;
    return a + frac * (b - a);
  };
  const H = n => UN.hash(n);
  const dot = (x, y, r, o) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(o)}"/>`;

  /* ---------- tiny state glyphs for memory frames: apple, egg, clock, atom ---------- */
  function glyph(id, x, y, s, op = 1) {
    const k = ((id % 4) + 4) % 4, st = `fill="none" stroke="#fff" stroke-width="${f(.7)}"`;
    let g = '';
    if (k === 0) g = `<circle cx="${f(x)}" cy="${f(y + s)}" r="${f(6 * s)}" ${st}/>` + UN.thread([x, y - 5 * s], [x + 2 * s, y - 8 * s], { opacity: .9, width: .7 });
    else if (k === 1) g = `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(4.6 * s)}" ry="${f(6.2 * s)}" ${st}/>`;
    else if (k === 2) g = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(6 * s)}" ${st}/>` + UN.thread([x, y], [x + 3 * s, y - 3.5 * s], { opacity: .9, width: .7 });
    else g = `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(7 * s)}" ry="${f(2.4 * s)}" ${st} transform="rotate(-25 ${f(x)} ${f(y)})"/>` + `<circle cx="${f(x)}" cy="${f(y)}" r="${f(1.6 * s)}" fill="#fff"/>`;
    return `<g opacity="${f(op)}">${g}</g>`;
  }

  /* ---------- memory tape: like TS.strip, but its right end (the newest frame) is fixed ----------
   * o.x,o.y — right end on screen, o.sc — scale, o.ph — phase in frames (frames slide left as it grows),
   * o.n — frames, o.lit(k,kk) 0..1, o.fop(k,kk) frame opacity, o.len 0..1 visible band length, o.t, o.op. */
  function tape(o) {
    const n = o.n ?? 12, ph = o.ph ?? 0, fr = ph - Math.floor(ph), base = Math.floor(ph), t = o.t ?? 0;
    const W = 22, Hh = 30, SP = 28, pad = 9, L = (n * SP + 6) * (o.len ?? 1);
    let s = '';
    s += `<rect x="${f(6 - L)}" y="${-Hh / 2 - pad}" width="${f(L)}" height="${Hh + 2 * pad}" rx="3" fill="#fff" opacity=".035"/>`;
    s += UN.polyline([[6 - L, -Hh / 2 - pad], [6, -Hh / 2 - pad]], { opacity: .5, width: .5 });
    s += UN.polyline([[6 - L, Hh / 2 + pad], [6, Hh / 2 + pad]], { opacity: .5, width: .5 });
    let perf = '';
    for (let j = 0; j < n * 4 + 1; j++) {
      const px = 3 - (j + fr * 4) * 7; if (px < 6 - L) break;
      const shine = .4 + .35 * Math.max(0, Math.cos((px + t * 40) / 30));
      perf += `<rect x="${f(px - 1.5)}" y="${f(-Hh / 2 - pad / 2 - 1.1)}" width="3" height="2.2" rx="1" opacity="${f(shine)}"/>`;
      perf += `<rect x="${f(px - 1.5)}" y="${f(Hh / 2 + pad / 2 - 1.1)}" width="3" height="2.2" rx="1" opacity="${f(shine)}"/>`;
    }
    s += `<g fill="#fff">${perf}</g>`;
    for (let k = 0; k < n; k++) {
      const kk = k + fr, cx = -14 - kk * SP; if (cx - W / 2 < 6 - L) break;
      const fo = o.fop ? o.fop(k, kk) : (k === 0 ? ease(fr / .35) : 1);
      if (fo <= .01) continue;
      const lit = clamp(o.lit ? o.lit(k, kk) : 1);
      // v8 p2 A6: o.blank — no pictures at all (the diary's memory keeps nothing): only empty frames, the newest one glows
      let g = o.blank ? '' : glyph(base - k, cx, 0, 1.15, o.emptyZero ? .9 * lit : .2 + .8 * lit);   // v7 A6: empty means empty
      g += `<rect x="${f(cx - W / 2)}" y="${-Hh / 2}" width="${W}" height="${Hh}" rx="2" fill="none" stroke="#fff" stroke-width=".7" opacity="${f(.25 + .7 * lit)}"/>`;
      if (lit > .05) g += `<rect x="${f(cx - W / 2)}" y="${-Hh / 2}" width="${W}" height="${Hh}" rx="2" fill="#fff" fill-opacity="${f(.1 * lit)}" stroke="#fff" stroke-width="2" opacity="${f(.45 * lit)}" filter="url(#un-soft)"/>`;
      s += `<g opacity="${f(fo)}">${g}</g>`;
    }
    return `<g opacity="${f(o.op ?? 1)}" transform="translate(${f(o.x)} ${f(o.y)}) scale(${f(o.sc ?? 1)})">${s}</g>`;
  }
  const tapeX = (o, kk) => o.x + (-14 - kk * 28) * (o.sc ?? 1);

  /* ---------- head in profile from dots (facing right) ---------- */
  const PROF = [[0, -110], [40, -98], [60, -72], [68, -40], [63, -28], [66, -18], [84, 4], [68, 12], [70, 22], [64, 29], [68, 35], [62, 44],
    [66, 56], [52, 66], [30, 72], [26, 92], [26, 122], [-48, 122], [-46, 84], [-52, 58], [-70, 40], [-82, 14], [-88, -18], [-84, -52], [-68, -84], [-40, -104]];
  const inside = (x, y) => {
    let c = false;
    for (let i = 0, j = PROF.length - 1; i < PROF.length; j = i++) {
      const [xi, yi] = PROF[i], [xj, yj] = PROF[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  let headG = null;
  function headGeo() {
    if (headG) return headG;
    const pts = [];
    for (let i = 0; pts.length < 480 && i < 5000; i++) {
      const x = -90 + 176 * H(i * 2 + 7001), y = -112 + 236 * H(i * 2 + 7002);
      if (!inside(x, y)) continue;
      const nx = (x + 4) / 90, ny = (y + 22) / 96, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      pts.push({ x, y, a: .22 + .5 * (1 - nz) + .15 * H(i + 7301), h: H(i + 7401), e: 0 });
    }
    const segs = [];
    let tot = 0;
    for (let i = 0; i < PROF.length; i++) { const a = PROF[i], b = PROF[(i + 1) % PROF.length], d = Math.hypot(b[0] - a[0], b[1] - a[1]); segs.push(d); tot += d; }
    for (let k = 0; k < 170; k++) {
      let s = k / 170 * tot, i = 0;
      while (s > segs[i]) { s -= segs[i]; i++; }
      const a = PROF[i], b = PROF[(i + 1) % PROF.length], q = s / segs[i];
      pts.push({ x: lerp(a[0], b[0], q), y: lerp(a[1], b[1], q), a: .85, h: H(k + 7501), e: 1 });
    }
    pts.forEach((p, i) => { p.a *= 1 - .9 * ease((p.y - 66) / 52); p.ox = H(i + 8001); p.oy = H(i + 8101); });
    return (headG = pts);
  }
  const HX = 214, HY = 186;
  const CORE = [HX + 6, HY - 40];

  /* ---------- memory (f1) ---------- */
  function memory(t, K) {
    const c = (st, fr) => cue(K, 'f1', st, fr);
    let V = c('вряд', 0), COPY = c(['копи', 'мира'], .1), SNAP = c('снять', .15), STORE = c(['хранилищ', 'маленьк', 'машина'], .2);
    let NAR = c(['машина', 'нарезок'], .24), MEM = c('память', .35), KEEPS = c(['хранит', 'вернёт'], .42), SPIN = c(['прокручива', 'прошл'], .48);
    let RET = cue(K, 'f1', 'вернёт', -1), PAST = c('прошл', .45), FEEL = c(['чувству', 'почувств'], .55), FELT = c(['время', 'прожит'], .6);
    let SENSE = c('ощущени', .7), REM = c('запомн', .85);
    // part 1 ending (q1, blind view 03.11): «Без памяти время… исчезает, а с яркими воспоминаниями — растягивается» —
    // the head with its memory is there from the first word; the film of the lived grows on «яркими», lights on «растягивается»
    if ((K.words?.f1 || []).some(x => norm(x.w).startsWith('носител')) && !(K.words?.f1 || []).some(x => norm(x.w).startsWith('вряд'))) {
      const z = K.f1 ?? 0;   // blind view v3 A4: «Твой носитель — память» — the head is built at once, no cloud of dots
      V = z - .4; COPY = z - .35; SNAP = z - .3; STORE = z - .25; NAR = z + .3;
    }
    if ((K.words?.f1 || []).some(x => norm(x.w).startsWith('воспоминани'))) {
      const z = K.f1 ?? 0, w = (st, d) => cue(K, 'f1', st, 0) + d;
      V = z; COPY = z + .05; SNAP = z + .1; STORE = z + .15; NAR = z + .45; MEM = w('памят', 0); KEEPS = MEM + .4; SPIN = MEM + .6;
      PAST = SPIN; FEEL = w('ярк', -.1); FELT = FEEL + .3; SENSE = w('растягива', 0); REM = SENSE + .5;
    }
    let s = UN.bokeh(t, { count: 10, opacity: .4, seed: 61 });
    // the loaded frame from ts_save/jump: the question fades, then the frame goes out
    // only when f1 really follows the time-machine jump («Вряд ли: точную копию мира…»); otherwise no loaded frame
    const fromJump = (K.words?.f1 || []).some(x => /^(вряд|копи)/.test(String(x.w).toLowerCase()));
    const jp = fromJump ? 1 - win(t, COPY - .05, COPY + .75) : 0;
    if (jp > .01 && SCENES.ts_save && typeof SCENES.ts_save.body === 'function')
      s += `<g opacity="${f(jp)}">${SCENES.ts_save.body(t, K, 'jump', { ask: 1 - win(t, V, V + .7) })}</g>`;
    const drift = 1.5 * Math.sin(t * .45);
    // tape of the lived, behind the head
    const TP = { x: 150, y: 238, sc: 1.2, n: 6, t, ph: 0, len: win(t, FEEL - .1, FELT + .5),
      fop: k => win(t, FEEL + k * .17, FEEL + .35 + k * .17),
      lit: k => .3 + .25 * win(t, SENSE, SENSE + .6) + .5 * win(t, REM + k * .2, REM + .35 + k * .2) };
    if (TP.len > .01) {
      s += tape(TP);
      for (let k = 0; k < 6; k++) {
        const q = win(t, REM + k * .2, REM + .35 + k * .2);
        if (q > .01) s += UN.thread([tapeX(TP, k), TP.y - 18 * TP.sc], CORE, { opacity: .28 * q * (.8 + .2 * Math.sin(t * 3 + k)), width: .5 });
      }
    }
    // dots: frame light -> scattered -> head
    const appear = win(t, COPY - .1, COPY + .45), spread = win(t, COPY, STORE + .3), dim = win(t, SNAP, SNAP + .5);
    if (appear > .01) {
      let a = '', soft = '';
      headGeo().forEach((p, i) => {
        const formed = ease((t - STORE - .6 * p.h) / 1.1);
        const ox = 87.6 + 160.8 * p.ox, oy = 73 + 246 * p.oy;
        const dx = ox + (ox - 180) * .16 * spread + 3 * Math.sin(t * .9 + p.h * 20) * spread;
        const dy = oy + (oy - 196) * .12 * spread + 3 * Math.cos(t * .7 + p.h * 17) * spread;
        const hx = HX + p.x * (1 + .006 * Math.sin(t * 1.3)), hy = HY + p.y + drift;
        const x = lerp(dx, hx, formed), y = lerp(dy, hy, formed);
        const tw = .8 + .2 * Math.sin(t * 2.2 + p.h * 40);
        const al = lerp(.55 * appear * (1 - .5 * dim), p.a * tw, formed);
        if (al < .01) return;
        const r = lerp(.7, p.e ? .75 : .5 + .32 * p.h, formed);
        a += dot(x, y, r, al);
        if (i % 6 === 0) soft += dot(x, y, r * 1.6, al * .5);
      });
      s += `<g fill="#fff"><g filter="url(#un-soft)">${soft}</g>${a}</g>`;
    }
    // memory core, its threads and the label
    const core = win(t, NAR + .3, MEM + .3), cy = CORE[1] + drift;
    if (core > .01) {
      const G = headGeo();
      for (let k = 0; k < 12; k++) {
        const p = G[(k * 41 + 7) % 480];
        s += UN.thread([CORE[0], cy], [HX + p.x, HY + p.y + drift], { opacity: .14 * win(t, MEM, MEM + .6) * (.6 + .4 * Math.sin(t * 2 + k * 1.7)), width: .45 });
      }
      s += UN.sphere(CORE[0], cy, 4.6 + .7 * Math.sin(t * 2.4), { glow: 1, opacity: core });
      const lo = win(t, MEM - .15, MEM + .35);
      s += UN.thread([HX + 4, 70], [CORE[0], cy - 9], { opacity: .25 * lo, width: .45 });
      s += UN.mono(HX + 4, 62, 'ПАМЯТЬ', { size: 9.4, anchor: 'middle', opacity: .85 * lo });
    }
    // stored slices circle the core: "хранит нарезки и прокручивает их в голове"
    const orb = win(t, KEEPS - .2, KEEPS + .5) * (1 - win(t, FEEL, FEEL + .8));
    if (orb > .01) {
      const spin = .6 * (t - KEEPS) + 2.2 * Math.max(0, t - SPIN) - 1.1 * Math.max(0, t - SPIN - 1.4);
      let fr = '';
      for (let k = 0; k < 5; k++) {
        const a = spin + k * 2 * Math.PI / 5, x = CORE[0] + Math.cos(a) * 44, y = cy + Math.sin(a) * 20, z = Math.sin(a);
        const sz = .75 + .25 * z, w = 15 * sz, h = 20 * sz;
        fr += `<g opacity="${f(orb * (.45 + .55 * (z + 1) / 2))}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="1.5" fill="#000" fill-opacity=".5" stroke="#fff" stroke-width=".7"/>${glyph(k + 2, x, y, .7 * sz, .9)}</g>`;
      }
      s += UN.weight(CORE[0], cy, 44, 20, { opacity: .35 * orb }) + fr;
    }
    // frames fly into the head
    for (let k = 0; k < 6; k++) {
      const st = NAR - .15 + k * .3, q = clamp((t - st) / 1.0);
      if (q <= 0 || q >= 1) continue;
      const e = ease(q), x = lerp(372, CORE[0], e), y = lerp(60 + k * 44, cy, e) - 22 * Math.sin(Math.PI * q);
      const w = lerp(24, 4, e), h = lerp(32, 5.3, e), op = Math.min(1, q * 5) * (1 - ease((q - .72) / .28));
      s += `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="2" fill="#000" fill-opacity=".6" stroke="#fff" stroke-width=".8"/>` +
        `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="2" fill="none" stroke="#fff" stroke-width="2" opacity=".35" filter="url(#un-soft)"/>` +
        glyph(k, x, y, w / 22 * 1.15, .9) + '</g>';
    }
    // "it won't return you to the past": an arrow back from the nape dims out
    const gr = win(t, RET - .3, RET + .45), gone = win(t, PAST + .15, PAST + .8);
    if (RET > (K.f1 ?? 0) && gr > .01 && gone < 1) {
      const y = HY - 16 + drift, x0 = HX - 92, x1 = x0 - 82 * gr;
      let g = UN.thread([x0, y], [x1, y], { opacity: .7, width: .8 });
      for (let k = 0; k < 4; k++) { const x = x0 - 12 - k * 20; if (x > x1 + 4) g += UN.polyline([[x + 3.5, y - 3.5], [x, y], [x + 3.5, y + 3.5]], { opacity: .7, width: .8 }); }
      g += UN.sphere(x1, y, 3, { glow: .8 });
      g += UN.mono(x1, y + 18, 'НАЗАД', { size: 9.4, anchor: 'start', opacity: .8 });
      const sk = win(t, PAST, PAST + .3);
      if (sk > 0) g += UN.thread([x1 - 2, y + 14.5], [x1 - 2 + 36 * sk, y + 14.5], { opacity: .85, width: .9 });
      s += `<g opacity="${f(gr * (1 - gone))}">${g}</g>`;
    }
    return s;
  }

  /* ---------- diary (f2) ---------- */
  const TIMES = ['14:10', '14:14', '14:35', '14:46', '15:02', '15:15', '15:40'];
  function quote(K) {
    const ws = K.words?.f2 || [], i = ws.findIndex(w => w.w.includes('«')), j = ws.findIndex((w, n) => n >= i && w.w.includes('»'));
    if (i < 0 || j < 0) return { text: 'Теперь я по-настоящему проснулся', t0: null, t1: null };   // blind view v2 B4: as the voice says
    const text = ws.slice(i, j + 1).map(w => w.w).join(' ').replace(/[«»]/g, '').replace(/[.,!?…]+$/, '');
    return { text, t0: ws[i].t0, t1: ws[j].t1 };
  }
  const DTAPE = { x: 334, y: 320, sc: 1, n: 12 };
  const dLit = (kk, amp) => .1 + .9 * amp * ease(1 - (kk - .3) / 1.4);
  function diary(t, K) {
    const c = (st, fr, nth) => cue(K, 'f2', st, fr, nth);
    const HOLD = c('удержива', .2), LAST = c(['полминут', 'последн', 'секунд'], .3), YEARS = c('годами', .42);
    const AG1 = c('снова', .47, 0), AG2 = c('снова', .52, 1), WROTE = c('писал', .57), Q = quote(K);
    const QS = Q.t0 ?? c('проснул', .7) - .6, QE = Q.t1 ?? QS + 1.2, CROSS = c('зачёркив', .88);
    const MUS = c(['музыкант', 'британск'], .05);   // the 14:14 line is written while the musician is introduced
    const appear = [-1e9, MUS, YEARS, AG1, AG2, WROTE, QS];
    const wdur = [1, .9, .45, .45, .45, .45, Math.max(.7, QE - QS)];
    const strike = [-1e9, YEARS + .3, AG1 + .3, AG2 + .3, WROTE + .3, CROSS, 1e9];
    const sdur = [.3, .35, .35, .35, .35, .75, 1];
    const size = Math.min(15, 226 / (Q.text.length * .52));   // PT Serif Italic ≈ .51·size per char
    // v8 p2 A6 (text with «Отметок не оставалось»): the memory tape under the diary is empty from the first line — on the
    // paper there are lines, in memory nothing stays; only the frame of the newest line glows, then goes out
    const v8 = (K.words?.f2 || []).some(x => norm(x.w).startsWith('оставал'));
    let s = UN.bokeh(t, { count: 10, opacity: .35, seed: 62 });
    // page
    const rot = -1.6 + .5 * Math.sin(t * .3), dy = 1.5 * Math.sin(t * .4);
    let pg = `<rect x="30" y="44" width="300" height="242" rx="3" fill="#fff" opacity=".035"/>`;
    pg += `<rect x="30" y="44" width="300" height="242" rx="3" fill="none" stroke="#fff" stroke-width=".7" opacity=".55"/>`;
    pg += `<rect x="30" y="44" width="300" height="242" rx="3" fill="none" stroke="#fff" stroke-width="2" opacity=".15" filter="url(#un-soft)"/>`;
    pg += UN.thread([86, 50], [86, 280], { opacity: .22, width: .5 });
    pg += UN.mono(44, 68, 'ДНЕВНИК', { size: 9.4, opacity: .5 });
    for (let i = 0; i < 7; i++) pg += UN.thread([38, 105 + i * 27], [322, 105 + i * 27], { opacity: .12, width: .45 });
    let clips = '';
    for (let i = 0; i < 7; i++) {
      const y = 98 + i * 27, wp = clamp((t - appear[i]) / wdur[i]);
      if (wp <= 0) continue;
      const sp = clamp((t - strike[i]) / sdur[i]), struck = ease(sp), last = i === 6 || (t < appear[i + 1]);
      const flash = i < 6 ? .25 * Math.exp(-Math.pow((t - CROSS - .9) / .35, 2)) : 0;
      const op = (last ? 1 : .8) * (1 - (v8 ? .68 : .55) * struck) + flash;   // v8 p2 A6: a struck line goes down to ≈ 25 %
      clips += `<clipPath id="tsm-ln-${i}"><rect x="36" y="${y - 20}" width="${f(290 * ease(wp))}" height="28"/></clipPath>`;
      let ln = UN.mono(44, y, TIMES[i], { size: 10, opacity: .85 });
      ln += UN.italic(94, y, Q.text, { size, opacity: .95, glow: last && struck < .01 });
      pg += `<g opacity="${f(op)}" clip-path="url(#tsm-ln-${i})">${ln}</g>`;
      if (wp < 1) pg += UN.sphere(36 + 290 * ease(wp), y - 4, 2.2, { glow: .8, highlight: false });
      if (sp > 0) {
        const x0 = 40, x1 = lerp(x0, 98 + Q.text.length * size * .51, ease(sp));
        pg += UN.polyline([[x0, y - 4.5], [lerp(x0, x1, .5), y - 3.5], [x1, y - 5]], { opacity: .85, width: i === 5 ? 1.2 : 1 });
        if (i === 5 && sp < 1) pg += UN.sphere(x1, y - 5, 2.2, { glow: .9, highlight: false });
      }
    }
    // a blinking pen dot after the freshest line while nothing is written
    const fresh = appear.filter(a => a <= t).length - 1, fy = 98 + fresh * 27;
    const writing = appear.some((a, i) => t > a && t < a + wdur[i]);
    if (!writing) pg += UN.sphere(100 + Q.text.length * size * .51, fy - 4, 1.8, { glow: .6, opacity: .35 + .65 * (Math.sin(t * 5) > 0 ? 1 : .2), highlight: false });
    // blind view v3 A5–A6 (part 2): the tape ПАМЯТЬ becomes the hero. «Отметок не оставалось» — the page fades, the tape comes
    // to the middle and its frames go out one by one; «А если отметок много — время тянется» — the frames fill bright one by
    // one and the tape stretches past the edge (the plate ВРЕМЯ ТЯНЕТСЯ comes above it from story.py)
    const g2w = K.words?.g2 || [], fw = st => { const a = g2w.find(x => norm(x.w).startsWith(st)); return a ? a.t0 : 1e6; };
    const tNone = c('отметок', .9), tMany = fw('много'), hero = win(t, tNone - .2, tNone + .6), grow = win(t, tMany, tMany + 1.6);
    s += `<g opacity="${f(1 - hero)}" transform="translate(0 ${f(dy)}) rotate(${f(rot)} 180 165)"><defs>${clips}</defs>${pg}</g>`;
    const amp = .35 + .65 * win(t, LAST - .1, LAST + .6);
    const T0 = { x: lerp(DTAPE.x, 332, hero), y: lerp(DTAPE.y, 236, hero), sc: lerp(1, 1.4, hero) * lerp(1, 1.3, grow), n: 12 };
    const lit = (k, kk) => t >= tMany - .1 ? win(t, tMany + .09 * k, tMany + .09 * k + .2) : dLit(kk, amp) * (1 - win(t, tNone + .14 * k, tNone + .14 * k + .3));
    s += tape({ ...T0, emptyZero: hero > .3, blank: v8 && t < tMany - .1, t, ph: hero > .5 && t < tMany ? (tNone - .2) * .5 + (t - tNone + .2) * .35 : t * .5, op: win(t, HOLD - .1, HOLD + .6), lit });   // v6 qa: the empty tape keeps creeping (no still frame)
    s += plate(180, T0.y - 36 * T0.sc, 'ПАМЯТЬ', win(t, HOLD - .2, HOLD + .3) * (1 - win(t, tMany + 1.2, tMany + 1.6)), 14 + 2 * hero);   // v2 B5 / v3: named, follows the tape
    return s;
  }

  /* ---------- none (f3) ---------- */
  function none(t, K) {
    const T0 = (K.f3 ?? 0) - .05, c = (st, fr, nth) => cue(K, 'f3', st, fr, nth);
    const NO = c('нет', 0), MEM = c(['памяти', 'воспомин'], .3), FEEL = c('ощущени', .65);
    const g = win(t, T0, T0 + .9);
    // the tape slows down and stops
    let ph = T0 * .5;
    const end = Math.max(T0, Math.min(t, T0 + 1.6)), dt = .02;
    for (let x = T0; x < end; x += dt) { const st = Math.min(dt, end - x); ph += .5 * (1 - win(x + st / 2, T0, T0 + 1.4)) * st; }
    if (t < T0) ph = t * .5;
    const out = win(t, NO - .05, MEM + .35), last = 1 - .85 * win(t, FEEL, FEEL + .7);
    const o = { x: lerp(DTAPE.x, 318, g), y: lerp(DTAPE.y, 200, g), sc: lerp(1, 2.2, g), n: 12, t, ph,
      fop: (k, kk) => k === 0 ? Math.max(ease((kk % 1) / .35), g) : 1,
      lit: (k, kk) => k === 0 ? Math.max(dLit(kk, 1) * (1 - out), last) : dLit(kk, 1) * (1 - out) };
    let s = UN.bokeh(t, { count: 8, opacity: .3, seed: 63 });
    // the last frame breathes while it lasts; after "ощущения" only a faint residue
    const lx = tapeX(o, ph - Math.floor(ph));
    s += `<circle cx="${f(lx)}" cy="${f(o.y)}" r="${f(40 * o.sc / 2.2)}" fill="url(#un-halo)" opacity="${f((.5 + .1 * Math.sin(t * 2.5)) * last * g)}"/>`;
    s += tape(o);
    return s;
  }

  // a plate for labels that carry meaning (blind view v2: bold white in a frame)
  function plate(x, y, text, op, size = 15) {
    if (op <= .01) return '';
    const w = text.length * size * .64 + 16, h = size + 10;
    return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2 - size * .32)}" width="${f(w)}" height="${f(h)}" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
      `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`;
  }

  /* ---------- ending (part 1, q1; blind view v2 A4): «Без памяти время для тебя исчезает, а с яркими воспоминаниями —
     растягивается». The apple film of 2:26 flies into the head (the bridge); «Без памяти» — the head is empty, the film
     behind it shrinks to one window, on «исчезает» that one goes out too; «с яркими воспоминаниями» — bright cards light
     up in the head: apple, tower, satellite, black hole; «растягивается» — the film stretches out of the back of the
     head across the frame, its windows spread. ---------- */
  function ending(t, K) {
    const z = K.f1 ?? 0, c = (st, fr) => cue(K, 'f1', st, fr);
    // v35 text: «Говорят, без памяти времени нет. О чём это? | Память хранит нарезки состояний — как та плёнка с яблоком.
    // Нет кадров — нет и ощущения времени. Больше кадров — и время тянется.»
    const v35 = (K.words?.f1 || []).some(x => norm(x.w).startsWith('плёнк') || norm(x.w).startsWith('пленк'));
    const tMem = c('памят', .05), tGone = c(['исчеза', 'кадров'], .2), tBright = v35 ? 1e6 : c('ярк', .35), tStr = c(v35 ? ['больше'] : ['растягива', 'больше'], .5);   // v38: «растягивает» of the next line must not steal the cue
    const tFilm = v35 ? c(['плёнк', 'пленк'], .3) : null, tPull = v35 ? c(['тянет'], .6) : null;
    const EX = 236, EY = 182, ES = .95;
    let s = UN.bokeh(t, { count: 8, opacity: .3, seed: 64 });
    // the head
    let d = '';
    for (const p of headGeo()) d += dot(EX + p.x * ES, EY + p.y * ES, p.e ? .9 : .7, (p.e ? .8 : .22) * p.a * win(t, z - .1, z + .5));
    s += `<g fill="#fff">${d}</g>`;
    s += plate(EX, 332, 'ПАМЯТЬ', v35 ? win(t, tMem - .1, tMem + .4) : win(t, z, z + .5), v35 ? 17 : 15);
    if (v35) {
      const glow = win(t, tMem - .1, tMem + .5), pul = .5 + .5 * Math.sin((t - tMem) * 4);
      s += `<circle cx="${f(EX + 6)}" cy="${f(EY - 40)}" r="${f(16 + 6 * glow + 4 * pul * glow)}" fill="#fff" opacity="${f((.18 + .12 * pul) * glow)}"/>` + UN.sphere(EX + 6, EY - 40, 5 * glow, { glow: 1, opacity: glow });
      // final qa (still frame > 3 s at «Философы говорят… О чём это они?»): small memory frames light up one by one
      // in the head and drift to the core, the core pulses; they go when the apple film comes in
      // v6: «Нет кадров» — the frames in the head go out one by one (they stay through «как та плёнка»)
      for (let k = 0; k < 8; k++) {
        const t0 = z + .4 + k * .45, a = Math.max(win(t, t0, t0 + .3) * (1 - win(t, tGone - .2 + k * .03, tGone + .1 + k * .03)), win(t, tStr - .1 + k * .12, tStr + .2 + k * .12));   // v7
        if (a <= .01) continue;
        const ang = k * 2.4, rr = 52 - 10 * win(t, t0 + .3, t0 + 2.2);
        const x = EX + 6 + rr * Math.cos(ang), y = EY - 40 + rr * .75 * Math.sin(ang);
        s += `<g opacity="${f(a)}"><rect x="${f(x - 8)}" y="${f(y - 10)}" width="16" height="20" rx="2" fill="#fff" fill-opacity=".15" stroke="#fff" stroke-width=".9"/>${glyph(k, x, y, .9, 1)}</g>`;
      }
    }
    // the bridge: a short apple film flies into the head (v35: the strip СВЕЖЕЕ / ПОТЕМНЕЛО / СГНИЛО on «как та плёнка с яблоком»)
    const f0 = v35 ? tFilm - .2 : z, fly = win(t, f0, f0 + 1.1);
    if (fly < .99 && t > f0 - .4) {
      let g = '';
      if (v35) for (let k = 0; k < 3; k++) {   // the same three states as in 1:25: fresh, darker, rotten
        const sc = 1.4 - .25 * (k === 2 ? 1 : 0), op = k === 1 ? .6 : k === 2 ? .45 : 1;
        g += `<rect x="${f(-46 + k * 32)}" y="-18" width="28" height="36" rx="2" fill="none" stroke="#fff" stroke-width=".9"/>` + glyph(0, -32 + k * 32, 0, sc, op);
        if (k > 0) g += `<circle cx="${f(-30 + k * 32)}" cy="3" r="${f(2.5 * k)}" fill="#fff" opacity=".5"/>`;
      }
      else for (let k = 0; k < 4; k++) g += `<rect x="${f(-46 + k * 24)}" y="-14" width="20" height="28" rx="2" fill="none" stroke="#fff" stroke-width=".8"/>` + glyph(0, -36 + k * 24, 0, 1.1, 1);
      s += `<g opacity="${f(1 - fly)}" transform="translate(${f(lerp(110, EX, fly))} ${f(lerp(250, EY - 30, fly))}) scale(${f(lerp(2.4, .4, fly))})">${g}</g>`;   // v3 A8: large
    }
    // the film behind the head: shrinks to one window by «исчезает», goes out on it; stretches on «растягивается»
    const shrink = v35 ? win(t, tGone - .1, tGone + .5) : win(t, tMem, tGone), gone = v35 ? win(t, tGone + .5, tGone + 1) : win(t, tGone, tGone + .5), grow = win(t, tStr - .1, tStr + 1.1);
    const n = grow > 0 ? Math.max(1, Math.round(1 + 7 * grow)) : Math.max(1, Math.round(5 - 4 * shrink));
    // v6: the film does not come in before «Нет кадров» — it only stretches out on «Больше кадров»
    const fop = grow > 0 ? grow : (v35 ? 0 : (1 - gone) * win(t, z + .6, z + 1));
    s += tape({ x: EX - 82 * ES, y: EY - 10, sc: 1.05, n, t, ph: 0, len: 1, op: fop,
      lit: () => grow > 0 ? .9 : .5 * (1 - shrink) + .2, fop: () => 1 });
    // v3 A8: «исчезает» — a clock by the head stops and goes out
    const ckO = win(t, z + .2, z + .6) * (1 - win(t, tGone + .2, tGone + .8));
    if (ckO > .01) s += `<g opacity="${f(ckO)}">${TS.clock(62, 104, 22, 1 + 2.4 * (Math.min(t, tGone) - z), { trail: .5 * (t < tGone ? 1 : 0) })}</g>`;
    // v3 A8: «растягивается» — a bracket over the film shows its length growing
    if (grow > .01) {
      const L = 28 * 1.05 * n, xR = EX - 82 * ES + 6, xL = xR - L, yb = EY - 10 - 34;
      s += `<g opacity="${f(grow)}">${UN.polyline([[xL, yb + 6], [xL, yb], [xR, yb], [xR, yb + 6]], { width: 1.2, opacity: .95 })}</g>`;
      s += plate(Math.max(90, (xL + xR) / 2), yb - 14, v35 ? 'ВРЕМЯ ТЯНЕТСЯ' : 'ДЛИННЕЕ', v35 ? grow * win(t, tPull - .2, tPull + .3) : grow, 15);
    }
    // bright cards in the head
    const cards = [['apple', -34, -62], ['tower', 6, -70], ['sat', -38, -22], ['hole', 4, -26]];
    cards.forEach(([kind, dx, dy], i) => {
      const a = win(t, tBright + i * .25, tBright + i * .25 + .3);
      if (a <= .01) return;
      const x = EX + dx * ES, y = EY + dy * ES, w = 30, h = 34;
      let g = `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${w}" height="${h}" rx="3" fill="#fff" fill-opacity=".12" stroke="#fff" stroke-width="1.1"/>`;
      if (kind === 'apple') g += glyph(0, x, y - 3, 1.5, 1);
      else if (kind === 'tower') {   // v3 A8: a lattice tower with its two clocks, as in 0:06
        g += UN.polyline([[x - 6, y + 13], [x - 2, y - 12], [x + 2, y - 12], [x + 6, y + 13]], { width: 1, opacity: 1 });
        for (let k = 0; k < 4; k++) { const yy = y + 10 - k * 6; g += UN.thread([x - 5 + k, yy], [x + 5 - k, yy - 6], { width: .5, opacity: .7 }); }
        g += `<circle cx="${f(x + 10)}" cy="${f(y - 10)}" r="3" fill="none" stroke="#fff" stroke-width=".7"/>`;
      } else if (kind === 'sat') g += `<circle cx="${f(x + 6)}" cy="${f(y + 6)}" r="7" fill="none" stroke="#fff" stroke-width=".8"/>` +
        `<rect x="${f(x - 3)}" y="${f(y - 7)}" width="6" height="6" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width=".7"/>` +
        `<rect x="${f(x - 13)}" y="${f(y - 6)}" width="8" height="4" fill="none" stroke="#fff" stroke-width=".6"/><rect x="${f(x + 5)}" y="${f(y - 6)}" width="8" height="4" fill="none" stroke="#fff" stroke-width=".6"/>`;
      else g += `<circle cx="${f(x)}" cy="${f(y)}" r="7" fill="#000" stroke="#fff" stroke-width="1.4"/>` + `<ellipse cx="${f(x)}" cy="${f(y)}" rx="13" ry="3.5" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/>`;
      s += `<g opacity="${f(a)}">${g}</g>`;
    });
    if (v35) { const zz = 1 + .05 * win(t, z, tFilm); s = `<g transform="translate(${f(EX * (1 - zz))} ${f(EY * (1 - zz))}) scale(${f(zz)})">${s}</g>`; }   // a slow push-in
    return s;
  }

  /* ---------- question (part 1, q0, v35): «Так что же такое время — и как мы его ощущаем?» — the heroes of the film
     (clocks, an apple, the black hole, the tower) fly onto the line of a large «?»; on «ощущаем» a person stands next to it ---------- */
  function question(t, K) {
    const z = K.f1 ?? 0, tFeel = cue(K, 'f1', 'ощуща', .7);
    let s = UN.bokeh(t, { count: 10, opacity: .35, seed: 66 });
    const pts = [];
    for (let k = 0; k <= 9; k++) { const a = Math.PI + (Math.PI + .9) * k / 9; pts.push([150 + 56 * Math.cos(a), 150 + 56 * Math.sin(a)]); }
    pts.push([168, 232], [150, 262]);
    s += UN.polyline(pts.slice(0, 11), { width: 1, opacity: .35 * win(t, z + .6, z + 1.4) });
    pts.forEach(([x, y], i) => {
      const q = win(t, z + .1 + i * .09, z + .7 + i * .09), sx = 180 + 160 * Math.cos(i * 2.3), sy = 200 + 220 * Math.sin(i * 1.7);
      const X = lerp(sx, x, q), Y = lerp(sy, y, q), k = i % 4;
      let g = '';
      if (i === pts.length - 1) g = UN.sphere(X, Y + 12, 7, { glow: 1 });
      else if (k === 0) g = TS.clock(X, Y, 13, t * 1.3 + i, { trail: .3 });
      else if (k === 1) g = glyph(0, X, Y, 1.6, 1);
      else if (k === 2) g = `<circle cx="${f(X)}" cy="${f(Y)}" r="9" fill="#000" stroke="#fff" stroke-width="1.4"/><ellipse cx="${f(X)}" cy="${f(Y)}" rx="16" ry="4" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/>`;
      else g = UN.polyline([[X - 6, Y + 12], [X - 2, Y - 12], [X + 2, Y - 12], [X + 6, Y + 12]], { width: 1, opacity: 1 });
      s += `<g opacity="${f(q)}">${g}</g>`;
    });
    const pp = win(t, tFeel - .3, tFeel + .3);
    if (pp > .01) s += `<g opacity="${f(pp)}">${TS.person(278, 330, 150, { t })}</g>`;
    return s;
  }

  const BODY = { memory, diary, none, ending, question };
  const body = (t, K, mode) => {
    K = K || {};
    // v6: drawn as the previous scene of another shot (its K has no f1): take the part-1 ending's own line q1
    if ((mode === 'ending' || mode === 'question') && K.f1 == null && K[mode === 'ending' ? 'q1' : 'q0'] != null) {
      const id = mode === 'ending' ? 'q1' : 'q0';
      K = { ...K, f1: K[id], f1_end: K[id + '_end'], words: { ...(K.words || {}), f1: (K.words || {})[id] || [] } };
    }
    return (BODY[mode] || memory)(t, K);
  };
  SCENES.ts_memory = function (u, p, d, t) {
    const K = p.K || {}, t0 = (K[p.s] ?? (t - u)) - .05;
    // memory draws the loaded frame of ts_save/jump itself, so that boundary needs no dissolve
    const own = p.mode === 'memory' && p.prev === 'ts_save' && SCENES.ts_save;
    const D = p.mode === 'diary' ? .9 : .6, q = own ? 1 : win(t, t0, t0 + D);
    let s = body(t, K, p.mode);
    if (q < 1) {
      const pb = p.prev && SCENES[p.prev] && typeof SCENES[p.prev].body === 'function' ? SCENES[p.prev].body(t, K, p.prev_mode) : '';
      s = (pb ? `<g opacity="${f(1 - q)}">${pb}</g>` : '') + `<g opacity="${f(q)}">${s}</g>`;
    }
    return UN.wrap(s);
  };
  SCENES.ts_memory.body = body;
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_memory; SCENES.ts_memory = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
