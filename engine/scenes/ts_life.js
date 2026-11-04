/* «Время — это трансформация» (eps/time_states), сцена ts_life — блок z: как прожить жизнь длиннее.
 * Стиль — un_lib (чёрный фон, белый и серые, шары на нитях); фишка — плёнка состояний.
 *
 * SCENES.ts_life(u, p, d, t) → UN.wrap(body(t, p.K, p.mode, p)); SCENES.ts_life.body(t, K, mode) — сырой SVG
 * без wrap и без фона (его зовёт ts_body/ring для наплыва из режима day). Параметры p:
 *   p.mode  'week' | 'lives' | 'day';  p.K — времена фраз и слов (eps/time_states/build/cues.json);
 *   p.s     id фразы кадра (z2/z3/z4) — начало наплыва K[p.s]−0.05;
 *   p.prev, p.prev_mode — уходящая сцена: 0,7 с её body() гаснет под нашей (нет body — из чёрного).
 * Камера движка нейтральна, камера — внутри сцены (масштаб/сдвиг группы).
 *
 * Режимы и слова (время — только из K: cue(K, фраза, начало_слова | [варианты], доля_фразы_без_слов, № повтора)):
 *   week (z2): две плёнки по 7 кадров, обе одной длины. НОВЫЕ МЕСТА: в кадрах разные каркасные образы
 *     (горы, море, город, мост, лес, парус, луна) — «новое» (или «новых») загораются по очереди, на «новых» по ним
 *     бежит волна света; «вспоминается … длиннее» —
 *     плёнка растягивается. БУДНИ: семь одинаковых кадров (экран, стол, чашка); «одинаковых будней» —
 *     кадры съезжают друг на друга и сливаются в короткую стопку.
 *   lives (z3): верх — длинная плёнка ЯРКАЯ ЖИЗНЬ из 12 разных кадров («яркую» — волна света,
 *     «количеством воспоминаний» — кадры вспыхивают по очереди); низ — стопка БУДНИ. «те же годы» — под обеими
 *     одинаковые шкалы ГОДЫ с часами и общим бегунком; «длиннее» — пунктир от конца шкалы: яркая плёнка
 *     уходит дальше, будничная не дотягивает; «памяти» — подпись ПАМЯТЬ, плёнки вспыхивают.
 *   day (z4): та же яркая плёнка, один кадр пустой и тусклый (пунктир). «день» — камера наезжает на пустой кадр;
 *     «прожил» — пустой кадр мерцает и почти исчезает. Дальше ts_body/ring (он владеет наплывом).
 * Проверка: scene_test.py ts_life '{"mode":"week","s":"z2","K":…}' --dur 260 --at 228.5,…
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const between = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => UN.hash(n);
  const norm = w => String(w).toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  // Start of the n-th word of phrase id beginning with stem (or the first found of a list of stems);
  // without words — a share of the phrase.
  const cue = (K, id, stem, share = 0, n = 0) => {
    for (const st of [].concat(stem)) {
      const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(st))[n];
      if (a) return a.t0;
    }
    const s = K[id] ?? 0, e = K[id + '_end'] ?? s + 6;
    return s + share * (e - s);
  };
  const dot = (x, y, r, o) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(o)}"/>`;
  const cam = (s, sc, tx, ty) => `<g transform="translate(${f(tx)} ${f(ty)}) scale(${f(sc)})">${s}</g>`;
  const ln = (pts, o = .8, w = .55) => UN.polyline(pts, { opacity: o, width: w });

  /* плёнка с кадрами в произвольных местах (вид как у TS.strip) */
  function film(y, frames, o = {}) {
    if (!frames.length) return '';
    const id = o.id || 'El', hm = o.hmax ?? Math.max(...frames.map(q => q.h)), pad = Math.max(9, hm * .14);
    const top = y - hm / 2 - pad, bot = y + hm / 2 + pad;
    const L = o.left ?? Math.min(...frames.map(q => q.x - q.w / 2)) - 6;
    const R = o.right ?? Math.max(...frames.map(q => q.x + q.w / 2)) + 6;
    let s = `<rect x="${f(L)}" y="${f(top)}" width="${f(R - L)}" height="${f(bot - top)}" rx="3" fill="#fff" opacity=".035"/>`;
    s += UN.polyline([[L, top], [R, top]], { opacity: .55, width: .5 }) + UN.polyline([[L, bot], [R, bot]], { opacity: .55, width: .5 });
    const run = (o.t ?? 0) * 60, py1 = top + pad * .5, py2 = bot - pad * .5;
    let perf = '';
    for (let px = L + 3.75; px < R - 1; px += 7.5) {
      const sh = .45 + .35 * Math.max(0, Math.cos((px - L - run) / 40));
      perf += `<rect x="${f(px - 1.5)}" y="${f(py1 - 1.1)}" width="3" height="2.2" rx="1" opacity="${f(sh)}"/><rect x="${f(px - 1.5)}" y="${f(py2 - 1.1)}" width="3" height="2.2" rx="1" opacity="${f(sh)}"/>`;
    }
    s += `<g fill="#fff">${perf}</g>`;
    let clips = '';
    frames.forEach((q, i) => {
      const op = q.op ?? 1; if (op <= .01 || q.w < .5) return;
      const lit = clamp(q.lit ?? 1), cid = `${id}-${i}`, x0 = q.x - q.w / 2, y0 = y - q.h / 2;
      let g = '';
      if (q.fill) g += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(q.w)}" height="${f(q.h)}" rx="2.5" fill="#000" opacity="${f(q.fill)}"/>`;
      if (q.draw) {
        clips += `<clipPath id="${cid}"><rect x="${f(x0)}" y="${f(y0)}" width="${f(q.w)}" height="${f(q.h)}" rx="2.5"/></clipPath>`;
        g += `<g clip-path="url(#${cid})" opacity="${f(.22 + .78 * lit)}">${q.draw(q.x, y, q.w, q.h)}</g>`;
      }
      g += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(q.w)}" height="${f(q.h)}" rx="2.5" fill="none" stroke="#fff" stroke-width=".8" opacity="${f(.35 + .6 * lit)}"${q.dash ? ' stroke-dasharray="3 2.5"' : ''}/>`;
      if (lit > .05) g += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(q.w)}" height="${f(q.h)}" rx="2.5" fill="none" stroke="#fff" stroke-width="2" opacity="${f(.3 * lit)}" filter="url(#un-soft)"/>`;
      s += `<g opacity="${f(op)}">${g}</g>`;
    });
    return `<g opacity="${f(o.opacity ?? 1)}"><defs>${clips}</defs>${s}</g>`;
  }

  /* каркасные образы для кадров: (cx, cy, w, h, t) → SVG; координаты в долях кадра */
  const P = (cx, cy, w, h) => (a, b) => [cx + a * w, cy + b * h];
  const sun = (p, a, b, r, w, t) => { const c = p(a, b); return `<circle cx="${f(c[0])}" cy="${f(c[1])}" r="${f(r * w * (1 + .06 * Math.sin(t * 2)))}" fill="url(#un-ball)" stroke="#fff" stroke-width=".4" opacity=".95"/>`; };
  const wave = (p, b, t, ph, o = .7) => { const pts = []; for (let k = 0; k <= 10; k++) { const a = -.55 + k * .11; pts.push(p(a, b + .025 * Math.sin(k * 1.3 + t * 2 + ph))); } return ln(pts, o, .5); };
  const PLACES = [
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h); return ln([p(-.6, .32), p(-.3, -.08), p(-.12, .1), p(.12, -.3), p(.6, .32)], .9) + ln([p(.03, -.18), p(.12, -.3), p(.21, -.17)], .9, .8) + sun(p, -.28, -.3, .07, w, t); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h); return sun(p, .05, -.05, .16, w, t) + ln([p(-.6, .05), p(.6, .05)], .8) + wave(p, .16, t, 0) + wave(p, .28, t, 1.7, .55) + wave(p, .4, t, 3.1, .4); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h); let s = ''; [[-.42, -.05], [-.22, -.3], [-.02, -.12], [.18, -.38], [.36, -.02]].forEach(([a, b], k) => { s += ln([p(a, .32), p(a, b), p(a + .17, b), p(a + .17, .32)], .85); s += dot(...p(a + .085, b + .1), Math.max(.5, w * .02), .4 + .5 * Math.sin(t * 1.5 + k) ** 2); }); return `<g fill="#fff">${s}</g>` + ln([p(-.6, .32), p(.6, .32)], .7); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h); let s = ln([p(-.6, .08), p(.6, .08)], .9); const arc = []; for (let k = 0; k <= 12; k++) { const a = -.45 + k * .075; arc.push(p(a, .08 - .42 * (1 - (a / .45) ** 2))); } s += ln(arc, .9); for (let k = 1; k < 6; k++) { const a = -.45 + k * .15; s += ln([p(a, .08 - .42 * (1 - (a / .45) ** 2)), p(a, .08)], .5, .4); } return s + wave(p, .3, t, .5, .5); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h); let s = ln([p(-.6, .32), p(.6, .32)], .7); [[-.32, .34], [-.05, .44], [.25, .3], [.45, .38]].forEach(([a, ht], k) => { const sw = .02 * Math.sin(t * 1.4 + k); s += ln([p(a - .13, .32), p(a + sw, .32 - ht), p(a + .13, .32), p(a - .13, .32)], .85); }); return s; },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h), r = .02 * Math.sin(t * 1.6); return ln([p(-.32, .14 + r), p(.32, .14 - r), p(.22, .24), p(-.22, .24), p(-.32, .14 + r)], .9) + ln([p(0, .14), p(0, -.36)], .85) + ln([p(0, -.34), p(.3, .1), p(0, .1)], .9) + wave(p, .3, t, 0, .55); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h), m = p(.12, -.15); let s = `<circle cx="${f(m[0])}" cy="${f(m[1])}" r="${f(w * .18)}" fill="none" stroke="#fff" stroke-width=".7" opacity=".9"/><circle cx="${f(m[0] + w * .07)}" cy="${f(m[1] - w * .04)}" r="${f(w * .15)}" fill="#000" opacity=".9"/>`; let d = ''; for (let k = 0; k < 6; k++) d += dot(...p(-.45 + H(k + 61) * .9, -.4 + H(k + 71) * .4), Math.max(.5, w * .018), .4 + .6 * Math.sin(t * 2 + k * 1.7) ** 2); return s + `<g fill="#fff">${d}</g>` + ln([p(-.6, .3), p(-.2, .18), p(.15, .28), p(.6, .2)], .7); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h), fl = 1 + .2 * Math.sin(t * 9); return ln([p(-.35, .3), p(-.05, -.18), p(.25, .3), p(-.35, .3)], .9) + ln([p(-.05, -.18), p(-.05, .3)], .5) + `<circle cx="${f(p(.4, .26)[0])}" cy="${f(p(.4, .26)[1])}" r="${f(w * .05 * fl)}" fill="url(#un-ball)" opacity=".95"/>` + ln([p(-.6, .32), p(.6, .32)], .6); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h), dy = .03 * Math.sin(t * 1.2), c = p(0, -.14 + dy); return `<circle cx="${f(c[0])}" cy="${f(c[1])}" r="${f(w * .27)}" fill="none" stroke="#fff" stroke-width=".7" opacity=".9"/>` + ln([p(-.27, -.12 + dy), p(0, -.41 + dy), p(.27, -.12 + dy)], .35) + ln([p(-.2, .03 + dy), p(-.08, .2 + dy)], .6) + ln([p(.2, .03 + dy), p(.08, .2 + dy)], .6) + ln([p(-.08, .2 + dy), p(.08, .2 + dy), p(.08, .28 + dy), p(-.08, .28 + dy), p(-.08, .2 + dy)], .9); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h), a = t * 1.3; const L = p(0, -.3); return ln([p(-.1, .32), p(-.06, -.24), p(.06, -.24), p(.1, .32)], .9) + ln([L, [L[0] + Math.cos(a) * w * .6, L[1] + Math.sin(a) * w * .15]], .5) + ln([L, [L[0] - Math.cos(a) * w * .6, L[1] - Math.sin(a) * w * .15]], .3) + `<circle cx="${f(L[0])}" cy="${f(L[1])}" r="${f(w * .06)}" fill="url(#un-ball)"/>` + wave(p, .34, t, 2, .5); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h); return sun(p, .25, -.25, .1, w, t) + ln([p(-.6, .2), p(-.3, .1), p(0, .22), p(.3, .12), p(.6, .22)], .8) + ln([p(-.6, .34), p(-.1, .26), p(.6, .34)], .55) + ln([p(-.3, .16), p(-.3, -.12)], .9, .8) + ln([p(-.3, -.02), p(-.4, -.04), p(-.4, -.12)], .8) + ln([p(-.3, .04), p(-.2, .02), p(-.2, -.06)], .8); },
    (cx, cy, w, h, t) => { const p = P(cx, cy, w, h), sw = .03 * Math.sin(t * 1.5); const top = p(.1 + sw, -.25); let s = ln([p(-.15, .3), p(-.02, .05), top], .9); for (let k = 0; k < 5; k++) { const a = -2.6 + k * .9 + sw; s += ln([top, [top[0] + Math.cos(a) * w * .28, top[1] + Math.sin(a) * w * .14 + w * .08], [top[0] + Math.cos(a) * w * .36, top[1] + Math.sin(a) * w * .1 + w * .16]], .8); } return s + ln([p(-.45, .3), p(-.2, .24), p(.2, .26), p(.45, .3)], .7) + wave(p, .38, t, 1, .45); },
  ];
  // the same weekday every time: screen, desk, cup
  const WORK = (cx, cy, w, h) => {
    const p = P(cx, cy, w, h);
    return ln([p(-.34, -.28), p(.3, -.28), p(.3, .08), p(-.34, .08), p(-.34, -.28)], .8) + ln([p(-.02, .08), p(-.02, .2)], .6) +
      ln([p(-.6, .22), p(.6, .22)], .7) + ln([p(.36, .1), p(.36, .21), p(.5, .21), p(.5, .1)], .7) + ln([p(-.24, -.16), p(.1, -.16)], .35) + ln([p(-.24, -.06), p(.18, -.06)], .35);
  };

  const L0 = 25, TOP_Y = 140, BOT_Y = 285;

  /* ---------------- week (z2) ---------------- */
  function weekGeom(t, K) {
    const tRem = cue(K, 'z2', 'вспомина', .43), tLong = cue(K, 'z2', 'длиннее', .55);
    const tSame = cue(K, 'z2', 'одинаков', .79), tDays = cue(K, 'z2', 'будн', .91);
    const st = between(t, tRem, tLong + .45), co = between(t, tSame, tDays + .55);
    return { st, co, tw: lerp(28, 34, st), th: lerp(37, 45, st), tg: lerp(6, 12, st), step: lerp(34, 5, co) };
  }
  function week(t, K) {
    const s0 = K.z2 ?? 0, e0 = K.z2_end ?? s0 + 5.7;
    const tNew = cue(K, 'z2', ['новое', 'новых'], .17), tPlaces = cue(K, 'z2', 'новых', .4), tWeek2 = cue(K, 'z2', 'неделя', .74, 1);
    const g = weekGeom(t, K);
    let s = '';
    const top = [];
    // v6 A10: new places leave MORE frames than the routine week — 10 against 7
    const NT = 10, tw2 = g.tw * .78, tg2 = g.tg * .55;
    for (let i = 0; i < NT; i++) {
      const on = between(t, tNew + i * .1, tNew + .3 + i * .1);
      const wv = Math.exp(-Math.pow(((t - tPlaces) / .09) - i, 2) / 2) * (t > tPlaces - .5 ? 1 : 0);
      top.push({ x: L0 + tw2 / 2 + i * (tw2 + tg2), w: tw2, h: g.th * .85, lit: clamp(.25 + .75 * on * (.8 + .1 * Math.sin(t * 2.3 + i * 1.3) ** 2) + .3 * wv),
        draw: (cx, cy, w, h) => PLACES[i % PLACES.length](cx, cy, w, h, t + i) });
    }
    s += film(TOP_Y, top, { id: 'Elw1', t, hmax: g.th * .85 });
    const bot = [], bl = .45 + .2 * between(t, tWeek2, tWeek2 + .4) - .2 * g.co;
    for (let i = 6; i >= 0; i--) bot.push({ x: L0 + 14 + i * g.step, w: 28, h: 37, lit: bl, fill: .75 * g.co, draw: WORK });
    s += film(BOT_Y, bot, { id: 'Elw2', t: t * .3, hmax: 37 });
    s += UN.mono(L0 - 3, TOP_Y - g.th / 2 - 16, 'НОВЫЕ МЕСТА', { size: 10.4, opacity: .55 + .4 * between(t, tNew, tNew + .4) });
    s += UN.mono(L0 - 3, BOT_Y - 18.5 - 16, 'БУДНИ', { size: 10.4, opacity: .55 + .4 * between(t, tWeek2, tWeek2 + .4) });
    // week length under each film: 7 day ticks that follow the frames
    const tick = (y, xs, op) => { let r = ''; xs.forEach(x => { r += UN.thread([x, y - 3], [x, y + 3], { width: .6, opacity: op }); }); return r + ln([[xs[0], y], [xs[xs.length - 1], y]], op * .7, .5); };
    s += tick(TOP_Y + g.th / 2 + 22, top.map(q => q.x), .55);
    s += tick(BOT_Y + 18.5 + 22, bot.map(q => q.x).reverse(), .45);
    s += UN.bokeh(t, { count: 9, opacity: .4, seed: 53 });
    const z = 1 + .03 * between(t, s0, e0 + 1);
    return cam(s, z, 180 - 180 * z, 200 - 200 * z);
  }

  /* ---------------- lives (z3) ---------------- */
  const LW = 21, LH = 28, LS = 26.5;
  const lx = i => L0 + LW / 2 + i * LS;
  function brightFilm(t, o = {}) {
    const fr = [];
    for (let i = 0; i < 12; i++) {
      const empty = o.empty === i;
      fr.push({ x: lx(i), w: LW, h: LH, lit: empty ? o.emptyLit : o.lit(i), dash: empty && o.dash, op: empty ? o.emptyOp ?? 1 : 1,
        draw: empty ? (o.emptyDraw ? o.emptyDraw : null) : (cx, cy, w, h) => PLACES[(i * 5 + 2) % 12](cx, cy, w, h, t + i * .7) });
    }
    return film(TOP_Y, fr, { id: o.id || 'Ell1', t, hmax: LH });
  }
  function workStack(t, lit, id) {
    const bot = [];
    for (let i = 6; i >= 0; i--) bot.push({ x: L0 + 14 + i * 5, w: 28, h: 37, lit, fill: .75, draw: WORK });
    return film(BOT_Y, bot, { id, t: t * .3, hmax: 37 });
  }
  function lives(t, K) {
    const s0 = K.z3 ?? 0, e0 = K.z3_end ?? s0 + 7.2;
    const tBright = cue(K, 'z3', 'яркую', .08), tMany = cue(K, 'z3', 'количеств', .25);
    const tSame = cue(K, 'z3', 'те', .7), tLong = cue(K, 'z3', 'длиннее', .79), tMem = cue(K, 'z3', 'памяти', .95);
    const wave = between(t, tBright - .1, tBright + 1.2);
    const memPulse = between(t, tMem - .1, tMem + .3) * (1 - .5 * between(t, tMem + .8, tMem + 1.6));
    let s = '';
    s += brightFilm(t, { id: 'Ell1', lit: i => {
      const w0 = Math.exp(-Math.pow((wave * 15 - 1.5 - i) / 1.6, 2));
      const flash = between(t, tMany + i * .13, tMany + .2 + i * .13) * (1 - .4 * between(t, tMany + .5 + i * .13, tMany + 1 + i * .13));
      return clamp(.55 + .45 * w0 + .35 * flash + .3 * memPulse + .08 * Math.sin(t * 2 + i));
    } });
    s += workStack(t, .3 + .15 * memPulse, 'Ell2');
    s += UN.mono(L0 - 3, TOP_Y - LH / 2 - 16, 'ЯРКАЯ ЖИЗНЬ', { size: 10.4, opacity: .7 + .25 * wave });
    s += UN.mono(L0 - 3, BOT_Y - 18.5 - 16, 'БУДНИ', { size: 10.4, opacity: .7 });
    s += UN.mono(338, TOP_Y - LH / 2 - 16, 'ПАМЯТЬ', { size: 10.4, anchor: 'end', opacity: .9 * between(t, tMem - .05, tMem + .35) });
    // the same scale of years under both films
    const ru = between(t, tSame - .1, tSame + .5);
    if (ru > 0) {
      const RL = 200, run = clamp((t - tSame) / Math.max(1, (e0 + .8) - tSame));
      const ruler = (y, id) => {
        let r = ln([[L0, y], [L0 + RL * ru, y]], .75, .6);
        for (let k = 0; k <= 10; k++) { const x = L0 + RL * k / 10; if (x <= L0 + RL * ru + .1) r += UN.thread([x, y - (k % 5 ? 3 : 5)], [x, y + (k % 5 ? 3 : 5)], { width: .6, opacity: .7 }); }
        r += UN.sphere(L0 + RL * run * ru, y, 2.6, { glow: .8, highlight: false });
        r += TS.clock(L0 + RL + 16, y, 9, (t - tSame) * 2.4, { opacity: ru, ticks: false });
        r += UN.mono(L0 + RL + 31, y + 3.5, 'ГОДЫ', { size: 9.4, opacity: .8 * ru });
        return r;
      };
      s += ruler(TOP_Y + LH / 2 + 26, 'a') + ruler(BOT_Y + 18.5 + 26, 'b');
      // "длиннее": dashed line from the end of the scale; the bright film goes further, the weekday one falls short
      const dl = between(t, tLong - .1, tLong + .4);
      if (dl > 0) {
        let d = '';
        const xe = L0 + RL, y1 = TOP_Y - LH / 2 - 22, y2 = BOT_Y + 18.5 + 32;
        for (let y = y1; y < y2; y += 7) d += UN.thread([xe, y], [xe, Math.min(y2, y + 3.5)], { width: .7, opacity: .7 * dl });
        s += d;
        s += `<rect x="${f(xe)}" y="${f(TOP_Y - LH / 2 - 9)}" width="${f(lx(11) + LW / 2 + 6 - xe)}" height="${f(LH + 18)}" fill="#fff" opacity="${f(.06 * dl)}"/>`;
        s += `<rect x="${f(L0 + 68)}" y="${f(BOT_Y - 18.5 - 9)}" width="${f(xe - (L0 + 68))}" height="${f(37 + 18)}" fill="none" stroke="#fff" stroke-width=".6" stroke-dasharray="3 3" opacity="${f(.45 * dl)}"/>`;
      }
    }
    s += UN.bokeh(t, { count: 9, opacity: .4, seed: 57 });
    const z = 1 + .025 * between(t, s0, e0 + 1);
    return cam(s, z, 180 - 180 * z, 200 - 200 * z);
  }

  /* ---------------- day (z4) ---------------- */
  function day(t, K) {
    const s0 = K.z4 ?? 0, e0 = K.z4_end ?? s0 + 4;
    const tDay = cue(K, 'z4', 'день', .05), tForgot = cue(K, 'z4', 'запомнил', .38), tLived = cue(K, 'z4', 'прожил', .88);
    // blind view v2 A1 (part 2 hook «Докажи, что вчера вообще было»): the film is big from the first frame, the empty frame
    // in the middle; on «вчера» the camera goes into it, its frame pulses, a «?» and the plate ВЧЕРА come
    const hook = (K.words?.z4 || []).some(x => norm(x.w).startsWith('докажи')), tV = hook ? cue(K, 'z4', 'вчера', .3) : 0;
    const E = 5, zq = hook ? lerp(.8, 1, between(t, tV - .15, tV + .6)) : between(t, tDay - .15, tForgot + .45), z = lerp(1, 3.1, zq) * (1 + .015 * Math.sin(t * .7) * zq);
    const fx = lx(E), fy = TOP_Y, X = lerp(fx, 180 + 3 * Math.sin(t * .5), zq), Y = lerp(fy, 200, zq);
    const flick = t < tLived ? 1 : (H(Math.floor(t * 14) + 991) > .45 ? 1 : .25) * (1 - .9 * between(t, tLived, tLived + 1.1));
    const vanish = 1 - .88 * between(t, tLived + .1, tLived + 1.3);
    const emptyOp = clamp(lerp(1, flick, between(t, tLived - .05, tLived + .1)) * vanish);
    // v8 p2 A11: «Проверь её: вспомни вчера. А позавчера?» — the film is big from the first frame; on «вчера» the frame
    // right of the empty one lights up (ВЧЕРА), on «позавчера» the light steps one frame left: that day is pale and goes
    // to a dashed outline (ПОЗАВЧЕРА); on «День без единой отметки» the camera goes into it, as before
    const v8 = !hook && (K.words?.z4 || []).some(x => norm(x.w).startsWith('позавчер'));
    if (v8) {
      const tY = cue(K, 'z4', 'вчера', .3), tP = cue(K, 'z4', 'позавчер', .45), zq2 = between(t, tDay - .15, tDay + .6);
      const fade = between(t, tP - .05, tP + .9), yl = between(t, tY - .1, tY + .3), pl = between(t, tP - .1, tP + .25);
      const pale = (cx, cy, w, h) => `<g opacity="${f(.75 * (1 - fade))}">${PLACES[(E * 5 + 2) % 12](cx, cy, w, h, t + E * .7)}</g>` +
        `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${f(w)}" height="${f(h)}" fill="#fff" opacity="${f(.025 + .015 * Math.sin(t * 3))}"/>`;
      let g = brightFilm(t, { id: 'Eld', lit: i => i === E + 1 ? clamp(.45 + .55 * yl * (1 - .35 * pl)) : clamp(.42 + .12 * Math.sin(t * 1.6 + i * .9)) * (1 - .3 * yl),
        empty: E, emptyLit: lerp(.35, .08, fade), dash: t > tP + .3, emptyOp, emptyDraw: pale });
      // the light: a bright outline on the remembered frame, it steps left on «позавчера»
      const hx = lerp(lx(E + 1), lx(E), pl), ho = yl * (1 - .55 * zq2);
      if (ho > .01) g += `<rect x="${f(hx - LW / 2 - 2.5)}" y="${f(TOP_Y - LH / 2 - 2.5)}" width="${LW + 5}" height="${LH + 5}" rx="3" fill="none" stroke="#fff" stroke-width="1.3" opacity="${f(.95 * ho)}"/>` +
        `<rect x="${f(hx - LW / 2 - 2.5)}" y="${f(TOP_Y - LH / 2 - 2.5)}" width="${LW + 5}" height="${LH + 5}" rx="3" fill="none" stroke="#fff" stroke-width="3.5" opacity="${f(.35 * ho)}" filter="url(#un-soft)"/>`;
      const zz = lerp(2.4, 3.1, zq2) * (1 + .015 * Math.sin(t * .7)), piv = lerp((lx(E) + lx(E + 1)) / 2, lx(E), zq2), X2 = 180 + 3 * Math.sin(t * .5);
      const sx = i => X2 + (lx(i) - piv) * zz, tag = (x, y, text, op) => { if (op <= .01) return ''; const w = text.length * 17 * .64 + 16;
        return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - 21)}" width="${f(w)}" height="28" rx="3" fill="#000" fill-opacity=".88" stroke="#fff" stroke-width=".9"/>` +
          `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="17" text-anchor="middle">${text}</text></g>`; };
      const out = 1 - between(t, tDay - .3, tDay + .2);
      const over2 = tag(sx(E + 1), 200 - 23 * zz - 12, 'ВЧЕРА', yl * (1 - .4 * pl) * out) + tag(sx(E), 200 + 23 * zz + 34, 'ПОЗАВЧЕРА', pl * out);
      return cam(g, zz, X2 - piv * zz, 200 - fy * zz) + over2 + UN.bokeh(t, { count: 8, opacity: .35, seed: 59 });
    }
    let s = brightFilm(t, { id: 'Eld', lit: i => clamp(.7 + .2 * Math.sin(t * 1.6 + i * .9)), empty: E, emptyLit: .08, dash: true, emptyOp,
      emptyDraw: (cx, cy, w, h) => `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${f(w)}" height="${f(h)}" fill="#fff" opacity="${f(.025 + .015 * Math.sin(t * 3))}"/>` });
    let over = '';
    if (hook) {
      const q = between(t, tV - .1, tV + .4), pulse = 1 + .06 * Math.sin(Math.max(0, t - tV) * 6) * (1 - between(t, tV + 1.2, tV + 2));
      over += UN.italic(X, Y + 16, '?', { size: 44 * pulse, anchor: 'middle', opacity: .95 * q });
      const w = 5 * 18 * .64 + 16;
      over += `<g opacity="${f(q)}"><rect x="${f(X - w / 2)}" y="${f(Y + 70)}" width="${f(w)}" height="28" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
        `<text x="${f(X)}" y="${f(Y + 90)}" fill="#fff" font-family="Plex" font-weight="700" font-size="18" text-anchor="middle">ВЧЕРА</text></g>`;
    }
    return cam(s, z, X - fx * z, Y - fy * z) + over + UN.bokeh(t, { count: 8, opacity: .35, seed: 59 });
  }

  const MODES = { week, lives, day };
  function body(t, K = {}, mode = 'week', p) {
    const draw = MODES[mode] || week;
    const own = draw(t, K);
    if (!p || !p.s) return own;
    const t0 = (K[p.s] ?? t) - .05, q = between(t, t0, t0 + .7);
    if (q >= 1) return own;
    const prev = p.prev && typeof SCENES[p.prev]?.body === 'function' ? SCENES[p.prev].body(t, K, p.prev_mode) : '';
    return (prev ? `<g opacity="${f(1 - q)}">${prev}</g>` : '') + `<g opacity="${f(q)}">${own}</g>`;
  }
  SCENES.ts_life = function (u, p = {}, d, t) { return UN.wrap(body(t, p.K || {}, p.mode, p)); };
  SCENES.ts_life.body = (t, K, mode) => body(t, K || {}, mode);
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_life; SCENES.ts_life = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
