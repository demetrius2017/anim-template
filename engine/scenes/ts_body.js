/* «Время — это трансформация» (time_states), сцена ts_body — человек и двое часов. Главная сцена:
 * её первый кадр (hook, t=0) — первый кадр ролика, её последний кадр (ring, t=K.end) — последний,
 * и он совпадает с первым: ролик зацикливается.
 *
 * Общая композиция «человек и часы»: человек из светящихся точек в рост (TS.person) по центру-слева
 * (x=168, подошвы y=350, рост 262), справа столбик: моно-часы у макушки (284,102) и у ступней (284,322),
 * нити от головы и ступней к часам, под часами головы и над часами ног бегущие цифры «СС.ммм мкс нс»
 * (последние 6 знаков меняются каждый кадр, через UN.hash от номера кадра), подписи ГОЛОВА / НОГИ.
 * Всё бегущее (цифры, стрелки, дыхание человека, боке) идёт от tau: в hook/promise/height/answer tau=t,
 * в ring tau=t−K.end, поэтому при t=K.end кадр ring равен кадру hook при t=0, и движение продолжается
 * без шва. Стрелка: угол A0+W·tau (оборот за 3 с).
 *
 * Режимы p.mode (слова — по K.words через wq(): первое слово с основой не раньше заданного момента;
 * нет слова — доля фразы; нет фразы — событие не наступает; ни одной секунды руками):
 *  hook (h, с t=0)   «Твоя голова старше твоих ног». t=0 — человек и часы, ничего не подсвечено (этот кадр
 *                    не меняется: с ним сходится ring). «голова» — подсветка головы и верхних часов;
 *                    «старше» — след стрелок, рамка у последних знаков головы (там цифры впереди на 1 нс);
 *                    «ног» — подсветка ног и нижних часов, рамка у их знаков, затем нить между цифрами.
 *                    Камера медленно подходит к цифрам.
 *  promise (h2)      «Измерили — часами». Продолжение hook без шва. «Измерили» — оба циферблата и линия разницы
 *                    вспыхивают, между цифрами «+0,000000001 С», цифры бегут, рамки остаются; «часами» — след
 *                    стрелок. Дальше кадр готовит башню: камера возвращается к 1 и чуть уводит человека вправо.
 *  height (h3+h4)    вход из своего promise (или hook) без наплыва: человек чуть сдвигается вправо и гаснет,
 *                    цифры и подписи гаснут; его часы уходят к подножию башни: верхние вниз по правому краю,
 *                    нижние влево по земле («атомные» — вспышка). Слева на
 *                    дуге Земли растёт каркасная телебашня («Токио»). «подняли» — одни часы едут к площадке
 *                    (пунктир, мерка слева, «четыреста» — «450 М», «метров» — НАВЕРХУ); «вторые — внизу» —
 *                    нижние подсвечены, ВНИЗУ; «Верхние … обгонять» — цифры, у верхних последние знаки уходят
 *                    на 4 нс вперёд, рамки; «четыре» — «+4 НС / СУТКИ». h4: «Внизу … медленнее» — шары кружат
 *                    у часов, внизу медленнее; «наверху» — верхние ярче; «всего» — Земля светлеет; «Голова» —
 *                    башня уезжает вправо и сужается, слева проявляется человек с часами (x=214); «верхние»/
 *                    «нижние» — нити от часов башни к часам головы и ног; «старше» — у головы рамка; «меньше» —
 *                    нить между цифрами; «микросекунду» — «< 1 МКС ЗА ЖИЗНЬ». Конец — устойчивая картина
 *                    (башня + человек): наплыв делает входящая сцена.
 *  answer (z1)       вход наплывом из любого p.prev. Человек и часы, камера медленно подходит. «время» — след
 *                    стрелок; «Выходит» — рамки у последних знаков; «отметки» — риски циферблатов загораются
 *                    по кругу; «носителе» — кольца ярче; «часов»/«стрелка» — часы подсвечены, стрелки светятся
 *                    со следом; «тебя» — часы тише, свет у головы; «память» — над головой короткая плёнка из
 *                    5 кадров-отметок на нити от макушки, кадры загораются по одному.
 *  ring (z5)         вход наплывом из любого p.prev. Человек и часы, камера медленно отъезжает к кадру hook;
 *                    «длина» — вокруг человека по кругу тусклые кадры плёнки-памяти; «стрелкой» — стрелки
 *                    вспыхивают и гаснут; «пережитым … опытом» — кадры загораются по одному; к «Хотя» кадры
 *                    гаснут, стрелки возвращаются, камера = 1: на «Хотя по часам —» композиция = hook при t=0,
 *                    бегут только стрелки и цифры, а при t=K.end кадр ровно равен hook при t=0.
 *                    Подпись «ПЕРЕШЛИ ТОМУ…» рисует story.py, не сцена.
 * Параметры p: mode, K (cues.json), s (id фразы), prev/prev_mode — наплыв на входе 0,7 с от начала кадра:
 * SCENES[p.prev].body, иначе из чёрного. Без наплыва только hook с t=0 и стыки своей непрерывной линии
 * hook→promise→height (и hook→height, если promise выпал). SCENES.ts_body.body(t, K, mode) — сырой SVG без
 * wrap для наплыва соседней сцены. Камера движка нейтральна.
 */
(() => {
  // ts_body.js loads before ts_lib.js and un_lib.js (alphabetical): TS and UN are used only at draw time.
  const clamp = x => Math.max(0, Math.min(1, x)), ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const B = (t, a, b) => ease((t - a) / Math.max(.001, b - a)), lerp = (a, b, q) => a + (b - a) * q;
  const f = v => Number(v).toFixed(2);
  const f4 = v => Number(v).toFixed(4);
  const H = n => UN.hash(n);
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const NEVER = 1e6;
  const stemOf = w => w.toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  // first word of phrase id with this stem said at or after `after`; no word — a share of the phrase; no phrase — never
  const wq = (K, id, stem, share, after = -1e9) => {
    const a = (K.words?.[id] || []).find(x => x.t0 >= after - 1e-6 && stemOf(x.w).startsWith(stem));
    if (a) return a.t0;
    if (K[id] == null) return NEVER;
    const a0 = K[id], a1 = K[id + '_end'] ?? a0 + 3;
    return Math.max(after, a0 + share * (a1 - a0));
  };
  const pulse = (t, a, b, up = .3, down = .5) => B(t, a, a + up) * (1 - B(t, b, b + down));
  const W = 2 * Math.PI / 3, A0 = .55;                  // hand speed (1 turn / 3 s) and phase at tau=0
  const PX = 168, PG = 350, PH = 262;                   // person: x, soles, height
  const CX = 284, R = 26, HC = { x: CX, y: 102 }, FC = { x: CX, y: 322 };   // blind view v2 A12: the hook clocks larger (19 → 26)
  const SZ = 10.5, CW = .6 * SZ;                        // digit size, Plex Mono advance
  const BASE = 27312459870;                             // 27.312459870 s at tau=0 (ns)

  const txt = (x, y, s, size, op, anchor = 'start', glow = false) =>
    `<text x="${f(x)}" y="${f(y)}" fill="#fff" opacity="${f(op)}" font-family="Plex" font-weight="600" font-size="${size}" text-anchor="${anchor}"${glow ? ' filter="url(#un-text-glow)"' : ''}>${esc(s)}</text>`;
  const halo = (x, y, r, op) => op > .003 ? `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#un-halo)" opacity="${f(op)}"/>` : '';

  // clock reading "SS.mmm uuu nnn"; head = feet + lead (ns)
  function reading(tau, lead = 0) {
    const fr = Math.round(tau * 30), ms = Math.floor((BASE + tau * 1e9) / 1e6);
    const ns = ms * 1e6 + Math.floor(H(fr * 1.731 + 9) * 1e6) + Math.round(lead);
    const sec = Math.floor(ns / 1e9) % 60, fr9 = String(ns % 1e9).padStart(9, '0');
    return `${String(sec).padStart(2, '0')}.${fr9.slice(0, 3)} ${fr9.slice(3, 6)} ${fr9.slice(6)}`;
  }
  function digitLine(x, y, str, o = {}) {
    // blind view 03.11 (A2): the 12-digit readings read as dust on a phone; the labels +4 НС / СУТКИ and
    // < 1 МКС ЗА ЖИЗНЬ carry the difference — the readings are off
    if (!o.keep) return '';
    const op = o.op ?? 1; if (op <= .003) return '';
    const n = str.length, x0 = x - n * CW / 2;
    let s = txt(x0, y, str, SZ, .8);
    const hi = o.hi ?? 0;
    if (hi > .003) {
      const xl = x0 + (n - 3) * CW;
      s += txt(xl, y, str.slice(n - 3), SZ, hi, 'start', true);
      s += `<rect x="${f(xl - 2)}" y="${f(y - SZ * .92)}" width="${f(3 * CW + 4)}" height="${f(SZ * 1.25)}" rx="2" fill="none" stroke="#fff" stroke-width=".6" opacity="${f(.8 * hi)}"/>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  // dial like TS.clock, plus hand opacity, highlight, hand trail and tick marks lighting up around (o.tick 0..1)
  function dial(x, y, r, ang, o = {}) {
    const op = o.op ?? 1; if (op <= .003) return '';
    const g = Math.min(1, o.glow ?? 0), hand = o.hand ?? 1, tk = o.tick ?? 0;
    let s = halo(x, y, r * (1 + .3 * g), .18 + .45 * g);
    const ell = (rr, sw, o2, soft) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rr)}" ry="${f(rr)}" fill="none" stroke="#fff" stroke-width="${f(sw)}" opacity="${f(o2)}"${soft ? ' filter="url(#un-soft)"' : ''}/>`;
    s += ell(r * .86, .4, .16, false);
    s += ell(r, Math.max(1.2, r * .05) * (1 + g), .35 + .45 * g, true);
    s += ell(r, Math.max(.6, r * .012), .92, false);
    let marks = '';
    for (let k = 0; k < 12; k++) {
      const a = k * Math.PI / 6, big = k % 3 === 0, r1 = r * (big ? .74 : .8), r2 = r * .92;
      const p1 = [x + Math.sin(a) * r1, y - Math.cos(a) * r1], p2 = [x + Math.sin(a) * r2, y - Math.cos(a) * r2];
      const lit = tk > .003 ? tk * clamp(tk * 13 - k) : 0;
      s += UN.thread(p1, p2, { width: big ? Math.max(.9, r * .022) : .55, opacity: lit > 0 ? Math.min(1, (big ? .85 : .55) + .45 * lit) : big ? .85 : .55 });
      if (lit > .003) marks += UN.sphere(p2[0], p2[1], 1.3, { glow: .8, opacity: lit, highlight: false });
    }
    s += marks;
    const L = r * .7, c0 = [x, y], tip = [x + Math.sin(ang) * L, y - Math.cos(ang) * L];
    if (hand > .003) {
      let hs = '';
      if (o.trail > .01) {
        let tr = '';
        for (let k = 1; k <= 12; k++) { const a = ang - k * .07; tr += `<circle cx="${f(x + Math.sin(a) * L)}" cy="${f(y - Math.cos(a) * L)}" r="${f(Math.max(.6, r * .024))}" opacity="${f(o.trail * (1 - k / 13) * .55)}"/>`; }
        hs += `<g fill="#fff">${tr}</g>`;
      }
      hs += UN.thread(c0, tip, { width: Math.max(.8, r * .018), opacity: .95 });
      hs += UN.thread(c0, tip, { width: Math.max(2, r * .05), opacity: .25 + .3 * g, glow: true });
      hs += UN.sphere(tip[0], tip[1], Math.max(2.2, r * .075), { glow: .9 });
      s += `<g opacity="${f(hand)}">${hs}</g>`;
    }
    s += UN.sphere(x, y, Math.max(1.6, r * .05), { glow: .6, highlight: false });
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  // tiny pictures for the memory frames (a few elements each)
  function icon(i, x, y, w, op = 1) {
    const k = w / 30, P = pts => pts.map(([a, b]) => [x + a * k, y + b * k]);
    const line = (pts, o2 = .8, wd = .6) => UN.polyline(P(pts), { opacity: op * o2, width: wd });
    const ring = (a, b, rr, o2 = .8) => `<circle cx="${f(x + a * k)}" cy="${f(y + b * k)}" r="${f(rr * k)}" fill="none" stroke="#fff" stroke-width=".6" opacity="${f(op * o2)}"/>`;
    switch (i % 8) {
      case 0: return UN.sphere(x - 3 * k, y - 3 * k, 3.4 * k, { glow: .5, opacity: op, highlight: false }) + line([[-12, 7], [12, 7]]);
      case 1: return line([[-12, 9], [-5, -3], [-1, 3], [5, -8], [12, 9]]) + line([[3, -5], [5, -8], [7, -5]], .5);
      case 2: { const a = [], b = []; for (let j = 0; j <= 12; j++) { const u = -12 + j * 2; a.push([u, -2 + 2.4 * Math.sin(j * .9)]); b.push([u, 5 + 2.4 * Math.sin(j * .9 + 1.4)]); } return line(a) + line(b, .5); }
      case 3: return ring(-5, -6, 2.6) + line([[-5, -3], [-5, 9]]) + ring(5, -5, 2.6) + line([[5, -2], [5, 9]]) + line([[-5, 2], [5, 3]], .55);
      case 4: return ring(0, 2, 7.5) + line([[0, -5], [1.5, -10]]) + line([[1, -7], [6, -9], [2, -6]], .6);
      case 5: return line([[-9, 9], [-9, 0], [0, -8], [9, 0], [9, 9], [-9, 9]]) + line([[-3, 9], [-3, 3], [3, 3], [3, 9]], .55);
      case 6: return UN.weight(x, y, 11 * k, 3.6 * k, { opacity: .75 * op, angle: 24 }) + UN.sphere(x, y, 2.4 * k, { glow: .5, opacity: op, highlight: false });
      default: return line([[0, 10], [0, -2]]) + ring(0, -5, 5.5) + line([[-8, 10], [8, 10]], .5);
    }
  }

  // memory frames on a tilted orbit around the person (ring)
  function memFrames(t, K, op, lit, front) {
    if (op <= .003) return '';
    const N = 9, ph = (t - (K.end ?? 0)) * .22;
    let s = '';
    for (let i = 0; i < N; i++) {
      const a = ph + i * 2 * Math.PI / N, dz = Math.sin(a);
      if ((dz >= 0) !== front) continue;
      const k = .74 + .3 * (dz + 1) / 2, w = 34 * k, h = 45 * k;
      const x = PX + 136 * Math.cos(a), y = 214 + 50 * dz + 5 * Math.sin(t * .9 + i * 1.7);
      const L = lit(i), o = op * (front ? 1 : .6) * (.3 + .7 * L);
      if (o <= .003) continue;
      let g = `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="2" fill="#000" fill-opacity=".7" stroke="#fff" stroke-width=".8" opacity=".9"/>`;
      if (L > .02) g += `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="2" fill="none" stroke="#fff" stroke-width="2" opacity="${f(.35 * L)}" filter="url(#un-soft)"/>`;
      let perf = '';
      for (let j = 0; j < 4; j++) {
        const px = x - w * .36 + j * w * .24;
        perf += `<rect x="${f(px - 1.2)}" y="${f(y - h / 2 - 4)}" width="2.4" height="1.8" rx=".8"/><rect x="${f(px - 1.2)}" y="${f(y + h / 2 + 2.2)}" width="2.4" height="1.8" rx=".8"/>`;
      }
      g += `<g fill="#fff" opacity=".6">${perf}</g>`;
      g += icon(i, x, y, w, .4 + .6 * L);
      s += `<g opacity="${f(o)}">${g}</g>`;
      if (L > .02) s += UN.thread([x, y - h / 2], [PX, 114], { opacity: .14 * L * op, width: .4 });
    }
    return s;
  }

  // answer, «у тебя — память»: a short film of 5 marked frames over the head on a thread from the crown;
  // it unfolds from the middle, frames light up one by one
  function headFilm(t, op, open, lit) {
    if (op <= .003) return '';
    const cx = 168, cy = 50, n = 5, w = 20, h = 26, gap = 6, total = n * w + (n - 1) * gap, cw = lerp(8, total + 16, open);
    const st = TS.strip(cx, cy, { id: 'tsbMem', n, w, h, gap, t, frame: (i, x, y, ww) => icon(i + 2, x, y, ww), lit });
    let s = UN.thread([cx, 84], [cx, cy + h / 2 + 10], { opacity: .45 * op, width: .6 });
    s += UN.sphere(cx, 84, 1.8, { glow: .7, opacity: op, highlight: false });
    s += `<defs><clipPath id="tsb-mem-clip"><rect x="${f(cx - cw / 2)}" y="0" width="${f(cw)}" height="100"/></clipPath></defs>`;
    s += `<g clip-path="url(#tsb-mem-clip)" opacity="${f(op)}">${st}</g>`;
    return s;
  }

  // wireframe Earth: top cap of a sphere, orthographic, pole tilted to the viewer
  function earth(t, op, glow = 0) {
    if (op <= .003) return '';
    const cx = 180, Rr = 420, cy = 340 + Rr, al = .42, ca = Math.cos(al), sa = Math.sin(al), rot = t * .03;
    const P = (phi, lam) => { const x = Rr * Math.cos(phi) * Math.cos(lam), y = -Rr * Math.sin(phi), z = Rr * Math.cos(phi) * Math.sin(lam); return [cx + x, cy + y * ca - z * sa, y * sa + z * ca]; };
    let s = `<circle cx="${cx}" cy="${cy}" r="${Rr + 5}" fill="none" stroke="#fff" stroke-width="9" opacity="${f(.07 + .12 * glow)}" filter="url(#un-soft)"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${Rr}" fill="#000" stroke="#fff" stroke-width="${f(.9 + .6 * glow)}" stroke-opacity="${f(.75 + .25 * glow)}"/>`;
    const seg = pts => { let out = '', run = []; for (const p of pts) { if (p[2] < 0 && p[1] < 420) run.push(p); else { if (run.length > 1) out += UN.polyline(run, { opacity: .3 + .25 * glow, width: .5 }); run = []; } } if (run.length > 1) out += UN.polyline(run, { opacity: .3 + .25 * glow, width: .5 }); return out; };
    for (let la = 10; la <= 80; la += 10) { const pts = []; for (let j = 0; j <= 72; j++) pts.push(P(la * Math.PI / 180, j / 72 * 2 * Math.PI + rot)); s += seg(pts); }
    for (let lo = 0; lo < 18; lo++) { const pts = []; for (let j = 0; j <= 24; j++) pts.push(P(j / 24 * Math.PI / 2, lo * Math.PI / 9 + rot)); s += seg(pts); }
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  const base = () => ({ tau: 0, cam: null, pX: PX, pG: PG, pOp: 1, hPos: HC, fPos: FC, clk: 1, hand: 1, hAng: null, fAng: null,
    hGlow: 0, fGlow: 0, trail: 0, dig: 1, lead: 1, hBox: 0, fBox: 0, link: 0, diff: '', diffOp: 0, diffGlow: 0,
    lab: 1, thr: 1, ground: 1, under: '', over: '', dials: 1, tick: 0, layer: 1 });

  function camWrap(c, s) {
    if (!c || (Math.abs(c.s - 1) < 1e-9 && Math.abs(c.px - c.qx) < 1e-9 && Math.abs(c.py - c.qy) < 1e-9)) return s;
    return `<g transform="translate(${f4(c.qx)} ${f4(c.qy)}) scale(${f4(c.s)}) translate(${f4(-c.px)} ${f4(-c.py)})">${s}</g>`;
  }
  // where a local point lands on screen under camera c, and back
  const toScreen = (c, P) => c ? { x: c.qx + c.s * (P.x - c.px), y: c.qy + c.s * (P.y - c.py) } : { x: P.x, y: P.y };
  const toLocal = (c, P) => c ? { x: c.px + (P.x - c.qx) / c.s, y: c.py + (P.y - c.qy) / c.s } : { x: P.x, y: P.y };

  function stage(S, noBokeh = false) {
    const tau = S.tau, hA = S.hAng ?? (A0 + W * tau), fA = S.fAng ?? (A0 + W * tau);
    const A = TS.personAnchors(S.pX, S.pG, PH);
    let s = S.under;
    if (S.ground > .003) s += UN.weight(S.pX, S.pG + 1, 48, 6.5, { opacity: .4 * S.ground * S.pOp });
    const th = .32 * S.thr * S.clk * S.pOp;
    if (th > .003) {
      s += UN.thread([A.head.x + 13, A.head.y + 12], [S.hPos.x - R - 5, S.hPos.y], { opacity: th, width: .5 });
      s += UN.thread([A.feet.x + 17, A.feet.y - 5], [S.fPos.x - R - 5, S.fPos.y], { opacity: th, width: .5 });
    }
    s += halo(A.head.x, A.head.y + 24, 40, .55 * S.hGlow * S.pOp) + halo(A.feet.x, A.feet.y - 8, 40, .55 * S.fGlow * S.pOp);
    s += TS.person(S.pX, S.pG, PH, { t: S.pT ?? tau, opacity: S.pOp });
    if ((S.bright ?? 0) > .003) s += `<g opacity="${f(.3 * S.bright * S.pOp)}">${TS.person(S.pX, S.pG, PH, { t: S.pT ?? tau })}</g>`;   // v4 A9: +25–30 % brighter
    s += dial(S.hPos.x, S.hPos.y, R, hA, { op: S.clk * S.dials, hand: S.hand, glow: S.hGlow, trail: S.trail, tick: S.tick });
    s += dial(S.fPos.x, S.fPos.y, R, fA, { op: S.clk * S.dials, hand: S.hand, glow: S.fGlow, trail: S.trail * .7, tick: S.tick });
    if ((S.spesh ?? 0) > .003) {
      const w = 6 * 14 * .64 + 16;
      s += `<g opacity="${f(S.spesh)}"><rect x="${f(S.hPos.x - R - 14 - w)}" y="${f(S.hPos.y - 15)}" width="${f(w)}" height="24" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
        `<text x="${f(S.hPos.x - R - 14 - w / 2)}" y="${f(S.hPos.y + 2)}" fill="#fff" font-family="Plex" font-weight="700" font-size="14" text-anchor="middle">СПЕШАТ</text></g>`;
    }
    if (S.lab * S.clk > .003) {
      s += UN.mono(S.hPos.x, S.hPos.y - R - 9, 'ГОЛОВА', { size: 14, anchor: 'middle', opacity: .95 * S.lab * S.clk });
      s += UN.mono(S.fPos.x, S.fPos.y - R - 9, 'НОГИ', { size: 14, anchor: 'middle', opacity: .95 * S.lab * S.clk });   // v3 A10: above the clock, above the horizon
    }
    const dh = S.hPos.y + R + 19, df = S.fPos.y - R - 9;
    s += digitLine(S.hPos.x, dh, reading(tau, S.lead), { op: S.dig * S.clk, hi: S.hBox });
    s += digitLine(S.fPos.x, df, reading(tau, 0), { op: S.dig * S.clk, hi: S.fBox });
    const xl = S.hPos.x + (14 / 2 - 1.5) * CW, lk = S.link * S.dig * S.clk;
    if (lk > .003) {
      s += UN.thread([xl, dh + 5], [xl, df - 13], { opacity: .55 * lk, width: .6 });
      s += UN.thread([xl - 3, dh + 5], [xl + 3, dh + 5], { opacity: .55 * lk, width: .6 }) + UN.thread([xl - 3, df - 13], [xl + 3, df - 13], { opacity: .55 * lk, width: .6 });
    }
    const dOp = S.diffOp * S.clk;
    if (dOp > .003 && S.diff) {
      // blind view v4 A6: full words, in two lines (« < 1 МИКРОСЕКУНДЫ / ЗА ЖИЗНЬ »)
      const ln = S.diff.split('|'), my = (dh + df) / 2 + 3 - 8 * (ln.length - 1), wd = Math.max(...ln.map(x => x.length)) * 8.6 + 14, cx = Math.min(S.hPos.x, 220);
      s += `<rect x="${f(cx - wd / 2)}" y="${f(my - 13)}" width="${f(wd)}" height="${f(18 * ln.length + 4)}" rx="3" fill="#000" stroke="#fff" stroke-width=".7" opacity="${f(.9 * dOp)}"/>`;
      ln.forEach((x, i) => { s += txt(cx, my + i * 18, x, 14, .97 * dOp, 'middle', S.diffGlow > .25); });
    }
    s += S.over;
    s = camWrap(S.cam, s);
    if (S.layer < .999) s = S.layer > .003 ? `<g opacity="${f(S.layer)}">${s}</g>` : '';
    return (noBokeh ? '' : UN.bokeh(tau, { count: 16, opacity: .55, seed: 23 })) + s;
  }

  /* ---------- hook + promise: one continuous timeline (also the person leaving at the start of height) ---------- */
  function openingState(t, K) {
    const S = base(); S.tau = t;
    const h3 = K.h3 ?? NEVER;
    const c = { gol: wq(K, 'h', 'голов', .17), star: wq(K, 'h', 'стар', .4), nog: wq(K, 'h', 'ног', .85),
      izm: wq(K, 'h2', 'измер', 0), chas: wq(K, 'h2', 'час', .65) };
    S.hAng = A0 + W * t + .9 * B(t, c.star - .1, c.star + .5); S.bright = 1;   // blind view v3 B2: on «старше» the head clock runs ahead
    S.lead = 1;
    // «старше» — the hands leave a trail; «часами» — once more, short (gone before height takes the clocks)
    S.trail = .8 * pulse(t, c.star, c.nog, .4, .6) + .9 * pulse(t, c.chas, c.chas + .2, .2, .3);
    // «Измерили»: both dials and the difference line flash, the difference label comes and stays
    const meas = pulse(t, c.izm, c.chas + .2, .25, .7);
    S.hGlow = pulse(t, c.gol, c.nog, .3, .6) + .9 * meas;
    S.fGlow = pulse(t, c.nog, c.izm + .2, .3, .6) + .9 * meas;
    S.hBox = B(t, c.star + .1, c.star + .5);
    S.fBox = B(t, c.nog + .1, c.nog + .5);
    S.link = B(t, c.nog + .3, c.nog + .8);
    S.diff = '';   // blind view v2 A9: no «+1 НС» — the first number of the film is +4 НС / СУТКИ on the tower
    S.diffOp = 0;
    S.diffGlow = meas;
    // the tower is coming: after «часами» the camera eases back to 1 and the person drifts right;
    // in height the readings, labels and threads fade (the clocks themselves go to the tower)
    const exS = Math.min(c.chas + .1, h3 - .6), fade = B(t, h3 - .05, h3 + .35);
    const go = 16 * B(t, exS, h3 + .3) + 25 * B(t, h3 + .25, h3 + 1.4); // px: the readings stay inside the frame
    S.lab = S.dig = S.thr = 1 - fade;
    S.diffOp *= 1 - fade;
    const lg = pulse(t, c.izm, c.chas + .1, .25, .6) * (1 - fade);
    let ov = '';
    if (lg > .003) { // the difference line between the readings flashes (same place as the link in stage)
      const xl = HC.x + (14 / 2 - 1.5) * CW, dh = HC.y + R + 19, df = FC.y - R - 9;
      ov += UN.thread([xl, dh + 5], [xl, df - 13], { opacity: .8 * lg, width: 3, glow: true });
      ov += halo(HC.x, (dh + df) / 2, 56, .45 * lg);
    }
    S.over = ov;
    // camera: a slow push toward the readings through hook and promise, back to 1 before height
    const push = B(t, c.gol, c.izm + .6), back = B(t, exS, h3 - .05);
    S.cam = { s: 1 + .05 * push * (1 - back), px: 236, py: 214, qx: 236 + go, qy: 214 };
    return S;
  }

  /* ---------- height: the Tokyo tower experiment, then the person ---------- */
  const TGB = 340, TDY = 104, TMT = 50;                 // tower: base, observation deck, mast top
  // generic lattice tower (no real silhouette): four tapered legs, X-bracing, one deck, thin mast with a
  // blinking ball. cx — axis, sx — horizontal squeeze, build 0..1 — grows from the ground up.
  function tower(t, cx, sx, build, op) {
    if (op <= .003 || build <= .003) return '';
    const top = TGB - build * (TGB - TMT), X = u => cx + u * sx;
    const hw = y => 11 + 41 * Math.pow(clamp((y - TDY) / (TGB - TDY)), 1.15);
    const N = 9, lv = []; for (let i = 0; i <= N; i++) lv.push(TGB - (TGB - TDY) * i / N);
    const vis = lv.filter(y => y >= top - .01);
    const legTop = Math.max(top, TDY);
    let s = '';
    const leg = (k, o2, w2) => { const pts = []; for (let y = TGB; y >= legTop - .01; y -= 8) pts.push([X(k * hw(y)), y]); pts.push([X(k * hw(legTop)), legTop]); return UN.polyline(pts, { opacity: o2, width: w2 }); };
    s += leg(-.48, .22, .45) + leg(.48, .22, .45);       // back legs
    for (let i = 0; i + 1 < vis.length; i++) {           // back bracing, faint
      const a = vis[i], b = vis[i + 1];
      s += UN.thread([X(-.48 * hw(a)), a], [X(.48 * hw(b)), b], { opacity: .12, width: .35 });
    }
    for (let i = 0; i < vis.length; i++) {
      const a = vis[i];
      s += UN.thread([X(-hw(a)), a], [X(hw(a)), a], { opacity: .3, width: .45 });
      if (i + 1 < vis.length) {
        const b = vis[i + 1];
        s += UN.thread([X(-hw(a)), a], [X(hw(b)), b], { opacity: .34, width: .45 }) + UN.thread([X(hw(a)), a], [X(-hw(b)), b], { opacity: .34, width: .45 });
      }
    }
    if (top < TGB - 2) { // a partial level at the growing tip
      const a = vis[vis.length - 1];
      if (a > legTop + .5) s += UN.thread([X(-hw(a)), a], [X(hw(legTop)), legTop], { opacity: .34, width: .45 }) + UN.thread([X(hw(a)), a], [X(-hw(legTop)), legTop], { opacity: .34, width: .45 });
    }
    s += leg(-1, .78, .8) + leg(1, .78, .8);              // front legs
    // light running up the legs: node balls brighten in a wave
    const wave = ((t * .35) % 1.3) - .15;
    let nodes = '';
    vis.forEach((y, i) => {
      const q = i / N, lit = Math.max(0, 1 - Math.abs(q - wave) / .18);
      for (const k of [-1, 1]) nodes += UN.sphere(X(k * hw(y)), y, 1.15 + .5 * lit, { glow: .35 + .6 * lit, highlight: false });
    });
    s += nodes;
    if (top <= TDY + 1) { // deck
      const dq = clamp((TDY - top) / 14);
      const dw = 21 * sx, cw = 13 * sx;
      s += `<ellipse cx="${f(cx)}" cy="${f(TDY)}" rx="${f(dw)}" ry="${f(4.5 * (.5 + .5 * sx))}" fill="#000" fill-opacity=".6" stroke="#fff" stroke-width=".8" opacity="${f(.85 * dq)}"/>`;
      s += `<path d="M${f(cx - cw)} ${f(TDY - 1)} L${f(cx - cw)} ${f(TDY - 12)} L${f(cx + cw)} ${f(TDY - 12)} L${f(cx + cw)} ${f(TDY - 1)}" fill="none" stroke="#fff" stroke-width=".6" opacity="${f(.6 * dq)}"/>`;
      s += `<ellipse cx="${f(cx)}" cy="${f(TDY - 12)}" rx="${f(cw)}" ry="${f(3 * (.5 + .5 * sx))}" fill="none" stroke="#fff" stroke-width=".6" opacity="${f(.6 * dq)}"/>`;
      for (let j = -2; j <= 2; j++) s += UN.thread([cx + j * cw / 2.5, TDY - 3], [cx + j * cw / 2.5, TDY - 10], { opacity: .25 * dq, width: .4 });
      const mt = Math.max(top, TMT);
      if (mt < TDY - 13) {
        s += UN.thread([cx, TDY - 12], [cx, mt], { opacity: .7, width: .7 });
        for (let y = TDY - 22; y > mt + 4; y -= 10) s += UN.thread([cx - 3 * sx, y], [cx + 3 * sx, y], { opacity: .35, width: .4 });
        if (top <= TMT + .5) s += UN.sphere(cx, TMT, 2, { glow: .3 + .7 * (.5 + .5 * Math.sin(t * 3.1)), highlight: false });
      }
    }
    s += UN.weight(cx, TGB + 1, 64 * sx + 6, 6, { opacity: .35 });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // balls circling a clock: «внизу время идёт медленнее … для всего» — below they circle a bit slower
  function orbit(x, y, ang, op) {
    if (op <= .003) return '';
    let s = '';
    for (let k = 0; k < 3; k++) for (let j = 0; j < 4; j++) {
      const a = ang + k * 2 * Math.PI / 3 - j * .16, px = x + 33 * Math.cos(a), py = y + 9 * Math.sin(a);
      s += j ? `<circle cx="${f(px)}" cy="${f(py)}" r="${f(1.3 - .22 * j)}" fill="#fff" opacity="${f(op * .5 * (1 - j / 4))}"/>` : UN.sphere(px, py, 2, { glow: .6, opacity: op, highlight: false });
    }
    return s;
  }
  // a clock of the tower; bg — black disc behind it (fades in as the clock leaves the person)
  function towerClock(x, y, r, ang, op, glow, trail, bg) {
    if (op <= .003) return '';
    return (bg > .003 ? `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r + 1.5)}" fill="#000" opacity="${f(.9 * op * bg)}"/>` : '') + dial(x, y, r, ang, { op, glow, trail });
  }

  function heightState(t, K) {
    const t0 = K.h3 ?? 4, e0 = K.h4_end ?? t0 + 21.6, ts0 = t0 - .05;
    const w3 = (stem, share, after) => wq(K, 'h3', stem, share, after), w4 = (stem, share, after) => wq(K, 'h4', stem, share, after);
    const c = { tok: w3('токио', .02), atm: w3('атомн', .05), podn: w3('подня', .13), chet: w3('четырест', .27),
      metr: w3('метр', .39), vtor: w3('втор', .44), vniz: w3('внизу', .51), verh: w3('верхн', .55), obg: w3('обгоня', .63) };
    c.ch4 = w3('четыре', .75, c.obg + .01); c.sut = w3('сутк', .96, c.ch4);
    c.vniz2 = w4('внизу', 0); c.med = w4('медлен', .1, c.vniz2); c.nav = w4('наверх', .21, c.med); c.vse = w4('всего', .33, c.nav);
    c.sbo = w4('сбо', .06); c.chs = w4('час', .34, c.vse); c.klt = w4('клет', .355, c.chs); c.teb = w4('теб', .37, c.klt);
    c.gol = w4('голов', .38, c.vse); c.verh2 = w4('верхн', .45, c.gol); c.nog = w4('ног', .55, c.verh2); c.nizh2 = w4('нижн', .61, c.nog);
    c.star = w4('стар', .71, c.nizh2); c.men = w4('меньш', .77, c.star); c.mik = w4('микро', .89, c.men); c.zh = w4('жизн', .97, c.mik);
    const tau = t, ang = A0 + W * tau;
    // the person of hook/promise keeps drifting right and fades; its clocks are taken over here
    const So = openingState(t, K);
    So.dials = 0; So.layer = 1 - B(t, t0 + .05, t0 + 1);
    // tower layer camera: 1 at the seam, a slow push over the whole shot
    const cam = { s: 1 + .04 * B(t, ts0, e0 + .6), px: 180, py: 220, qx: 180, qy: 220 };
    // tower grows on «Токио»; at «Голова» it slides right and narrows, the person appears on the left
    const build = B(t, c.tok - .35, c.tok + .45), slide = B(t, c.gol, c.gol + 1.1);   // blind view v2 A15: the tower on «Токио»
    const tx = lerp(128, 306, slide), sx = lerp(1, .42, slide);
    // clocks: A (lifted, it was the head clock) and B (below, it was the feet clock). A goes down the right side,
    // B slides left along the ground; both stand at the foot by «атомные»; «подняли» — A rides up to the deck
    const mv = B(t, ts0, c.atm + .45);
    const A0p = toLocal(cam, toScreen(So.cam, HC)), B0p = toLocal(cam, toScreen(So.cam, FC)), sc0 = So.cam.s;
    const up = B(t, c.podn, c.metr + .2), side = B(t, c.podn + .55 * (c.metr - c.podn), c.metr + .35);
    const ar = lerp(lerp(R * sc0, 19, mv), 14, slide);
    const At = { x: lerp(lerp(278, 250, side), tx, slide), y: lerp(320, TDY, up) };
    const Bt = { x: lerp(lerp(214, 250, up), tx, slide), y: lerp(320, 318, slide) };
    const Ap = { x: lerp(A0p.x, At.x, mv), y: lerp(A0p.y, At.y, mv) }, Bp = { x: lerp(B0p.x, Bt.x, mv), y: lerp(B0p.y, Bt.y, mv) };
    const atomF = pulse(t, c.atm, c.podn, .3, .6);
    const aGlow = So.hGlow * (1 - mv) + .8 * atomF + .7 * pulse(t, c.podn, c.metr + .3, .3, .6) + .6 * pulse(t, c.obg, c.ch4 + .4, .3, .6) +
      .7 * pulse(t, c.nav, c.vse, .3, .6) + pulse(t, c.gol, c.verh2 + .8, .3, .6) + .5 * B(t, c.star, c.star + .3);
    const bGlow = So.fGlow * (1 - mv) + .8 * atomF + pulse(t, c.vtor, c.verh, .3, .6) + .6 * pulse(t, c.vniz2, c.med + .4, .3, .6) + pulse(t, c.nog, c.nizh2 + .8, .3, .6);
    // «Верхние стали обгонять»: readings appear, the top one runs ahead; «четыре» — +4 НС / СУТКИ
    const out = 1 - B(t, c.gol - .1, c.gol + .4), dg = B(t, c.verh, c.verh + .45) * out, lead = 4 * B(t, c.obg, c.ch4);
    const box = B(t, c.obg + .2, c.obg + .6);
    let un = earth(t, B(t, ts0, ts0 + .9), .8 * pulse(t, c.vse, c.gol + .3, .3, .6));
    un += tower(t, tx, sx, build, 1);
    // measure: grows with the lifted clock, «четыреста пятьдесят метров» — 450 М
    const mo = B(t, c.podn, c.podn + .4) * out, mx = 40;
    if (mo > .003) {
      const my = Ap.y;
      un += UN.thread([mx, TGB], [mx, my], { opacity: .5 * mo, width: .6 });
      un += UN.thread([mx - 4, TGB], [mx + 4, TGB], { opacity: .5 * mo, width: .6 }) + UN.thread([mx - 4, my], [mx + 4, my], { opacity: .5 * mo, width: .6 });
      un += UN.thread([mx + 6, my], [lerp(tx - 30, tx - 14, up), my], { opacity: .18 * mo, width: .4 });
      const lo = mo * B(t, c.chet, c.chet + .4), ly = (TGB + TDY) / 2;
      if (lo > .003) {
        un += `<rect x="${f(mx - 19)}" y="${f(ly - 10)}" width="38" height="15" rx="2" fill="#000" opacity="${f(.9 * lo)}"/>`;
        un += txt(mx, ly + 1.5, '450 М', 10, .92 * lo, 'middle', pulse(t, c.chet, c.vtor, .3, .6) > .3);
      }
    }
    // the lift path and the thread from the deck to the top clock
    const pathOp = pulse(t, c.podn, c.metr + .4, .3, .8) * .3;
    if (pathOp > .003) un += `<path d="M${f(278)} ${f(320)} L${f(278)} ${f(TDY)}" stroke="#fff" stroke-width=".5" stroke-dasharray="2 4" opacity="${f(pathOp)}"/>`;
    const deckTh = B(t, c.metr - .2, c.metr + .4);
    if (deckTh > .003) un += UN.thread([tx + 21 * sx, TDY], [Ap.x - ar - 4, Ap.y], { opacity: .4 * deckTh * (1 - slide), width: .55 });
    const oOp = B(t, c.vniz2, c.vniz2 + .5) * (1 - slide);
    const oA = 2.3 * (t - c.vniz2);
    un += orbit(Ap.x, Ap.y, oA, oOp) + orbit(Bp.x, Bp.y, .74 * oA + 1.1, oOp);
    const tr = So.trail * (1 - mv);
    const lead3 = .55 * B(t, c.obg - .1, c.obg + .3);   // blind view v3 B1: «обгонять» — the upper hand steps ahead
    // blind view v4 A9: «Внизу время идёт медленнее» — the lower hand lags visibly, a bright sector of the lag stays
    const lagB = .9 * B(t, c.med - .1, c.med + .7);
    un += towerClock(Ap.x, Ap.y, ar, ang + lead3, 1, aGlow + .8 * pulse(t, c.obg - .1, c.obg + .8, .2, .5), tr, mv) + towerClock(Bp.x, Bp.y, ar, ang - lagB, 1, bGlow, tr * .7, mv);
    if (lagB > .02) {
      const a0 = ang - lagB, a1 = ang + lead3, L = ar * .78;
      un += `<path d="M${f(Bp.x)} ${f(Bp.y)} L${f(Bp.x + Math.sin(a0) * L)} ${f(Bp.y - Math.cos(a0) * L)} A${f(L)} ${f(L)} 0 0 1 ${f(Bp.x + Math.sin(a1) * L)} ${f(Bp.y - Math.cos(a1) * L)} Z" fill="#fff" opacity="${f(.32 * B(t, c.med, c.med + .5))}"/>`;
    }
    // labels НАВЕРХУ / ВНИЗУ
    const la = B(t, c.metr - .1, c.metr + .4) * out, lb = B(t, c.vniz - .1, c.vniz + .35) * out;
    // blind view v3 A10: 14 px, bright; ВНИЗУ sits beside its clock above the horizon line
    if (la > .003) un += UN.mono(Ap.x, Ap.y - ar - 9, 'НАВЕРХУ', { size: 14, anchor: 'middle', opacity: .95 * la });
    if (lb > .003) un += UN.mono(Bp.x - ar - 8, Bp.y + 5, 'ВНИЗУ', { size: 14, anchor: 'end', opacity: .95 * lb });
    // blind view v2 A11: «Нет, это не часы сбоят» — СБОЙ? at the top clock, crossed out; «Внизу время идёт медленнее» —
    // the plate ВНИЗУ МЕДЛЕННЕЕ; «для часов, для клеток, для тебя» — three large things, each on its word
    const plateB = (x, y, text, op, size = 15) => {
      if (op <= .003) return '';
      const w = text.length * size * .64 + 16, h = size + 10;
      return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2 - size * .32)}" width="${f(w)}" height="${f(h)}" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
        `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`;
    };
    const sb = B(t, c.sbo - .25, c.sbo + .1) * (1 - B(t, c.vniz2 - .1, c.vniz2 + .3)), sxx = B(t, c.sbo + .35, c.sbo + .65);
    if (sb > .003) {
      un += plateB(Ap.x - 70, Ap.y + 6, 'СБОЙ?', sb, 16);
      if (sxx > .003) un += `<g opacity="${f(sb)}"><line x1="${f(Ap.x - 104)}" y1="${f(Ap.y - 12)}" x2="${f(Ap.x - 104 + 68 * sxx)}" y2="${f(Ap.y - 12 + 24 * sxx)}" stroke="#fff" stroke-width="2.6"/>` +
        `<line x1="${f(Ap.x - 36)}" y1="${f(Ap.y - 12)}" x2="${f(Ap.x - 36 - 68 * sxx)}" y2="${f(Ap.y - 12 + 24 * sxx)}" stroke="#fff" stroke-width="2.6"/></g>`;
    }
    const slowP = B(t, c.med - .1, c.med + .3) * (1 - B(t, c.chs - .5, c.chs - .1));
    if (slowP > .003) un += plateB(Bp.x - 66, Bp.y - 40, 'ВНИЗУ МЕДЛЕННЕЕ', slowP, 15);
    const icoOut = 1 - B(t, c.gol - .3, c.gol + .3), IX = 196, LX = 262;
    const iC = B(t, c.chs - .1, c.chs + .3) * icoOut, iK = B(t, c.klt - .1, c.klt + .3) * icoOut, iT = B(t, c.teb - .1, c.teb + .3) * icoOut;
    if (iC > .003) un += `<g opacity="${f(iC)}">${TS.clock(IX, 132, 24, ang * .5, { trail: .5 })}</g>` + plateB(LX, 137, 'ЧАСЫ', iC, 15);
    if (iK > .003) {
      let k = `<circle cx="${IX}" cy="206" r="24" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-width="1.1" opacity=".95"/>`;
      k += UN.sphere(IX + 3 * Math.sin(t * .7), 205, 8, { glow: .7 });
      for (let j = 0; j < 12; j++) { const a = j * 2.4 + t * .25, r = 13 + 6 * H(j + 77); k += `<circle cx="${f(IX + r * Math.cos(a))}" cy="${f(206 + r * Math.sin(a))}" r="1.3" fill="#fff" opacity=".7"/>`; }
      un += `<g opacity="${f(iK)}">${k}</g>` + plateB(LX, 211, 'КЛЕТКИ', iK, 15);
    }
    if (iT > .003) un += `<g opacity="${f(iT)}">${TS.person(IX, 300, 62, { t })}</g>` + plateB(LX, 278, 'ТЫ', iT, 15);
    const dh = Ap.y + ar + 19, df = Bp.y - ar - 9;
    un += digitLine(Ap.x, dh, reading(tau, lead), { op: dg, hi: box });
    un += digitLine(Bp.x, df, reading(tau, 0), { op: dg, hi: box * .6 });
    const dOp = B(t, c.ch4, c.ch4 + .4) * out * (1 - B(t, c.chs - .5, c.chs - .1));   // makes room for ЧАСЫ/КЛЕТКИ/ТЫ
    if (dOp > .003) {
      // blind view v4 A6: «+4 НАНОСЕКУНДЫ / В СУТКИ» in full words, two lines, inside the safe width
      const my = (dh + df) / 2 - 6, cx = Math.min(Ap.x, 226), wd = 14 * 8.6 + 14;
      un += `<path d="M${f(Ap.x + 50)} ${f(dh - 4)} L${f(Ap.x + 50)} ${f(df - 10)}" stroke="#fff" stroke-width=".5" stroke-dasharray="2 3" opacity="${f(.35 * dOp)}"/>`;
      un += `<rect x="${f(cx - wd / 2)}" y="${f(my - 13)}" width="${f(wd)}" height="40" rx="3" fill="#000" stroke="#fff" stroke-width=".7" opacity="${f(.9 * dOp)}"/>`;
      un += txt(cx, my, '+4 НАНОСЕКУНДЫ', 14, .97 * dOp, 'middle', pulse(t, c.ch4, c.sut + .3, .3, .6) > .25) + txt(cx, my + 18, 'В СУТКИ', 14, .97 * dOp, 'middle', false);
    }
    // «Голова — верхние часы, ноги — нижние»: the person with head and feet clocks; threads to the tower clocks;
    // «старше» — the head is ahead; «меньше … микросекунду за жизнь» — < 1 МКС ЗА ЖИЗНЬ between the readings
    const S = base();
    S.tau = tau;
    const pin = B(t, c.gol + .35, c.gol + 1.2);
    S.pX = 112; S.pG = TGB; S.pOp = pin; S.clk = pin; S.dig = pin; S.lab = pin;
    S.hPos = { x: 214, y: 102 }; S.fPos = { x: 214, y: 322 };
    S.lead = 1;
    S.hGlow = pulse(t, c.gol, c.nog, .3, .6) + .9 * pulse(t, c.star, c.men + .2, .35, .6) + .5 * pulse(t, c.mik, c.zh + .5, .3, .8);
    S.fGlow = pulse(t, c.nog, c.star, .3, .6) + .5 * pulse(t, c.mik, c.zh + .5, .3, .8);
    S.hBox = B(t, c.star, c.star + .4); S.fBox = .6 * B(t, c.men, c.men + .4);
    S.link = B(t, c.men, c.men + .45);
    S.diff = '< 1 МИКРОСЕКУНДЫ|ЗА ЖИЗНЬ'; S.diffOp = B(t, c.mik, c.mik + .4); S.diffGlow = pulse(t, c.mik, c.zh + .6, .3, .6);
    let ov = '';
    const lnk = (a, b, q) => { if (q <= .003) return ''; const e = [lerp(a[0], b[0], q), lerp(a[1], b[1], q)]; return UN.thread(a, e, { opacity: .55, width: .6 }) + UN.thread(a, e, { opacity: .25, width: 1.8, glow: true }) + UN.sphere(e[0], e[1], 1.6, { glow: .7, opacity: q < 1 ? 1 : .6, highlight: false }); };
    ov += lnk([Ap.x - ar - 4, Ap.y], [S.hPos.x + R + 4, S.hPos.y], B(t, c.verh2, c.verh2 + .6) * pin);
    ov += lnk([Bp.x - ar - 4, Bp.y], [S.fPos.x + R + 4, S.fPos.y], B(t, c.nizh2, c.nizh2 + .6) * pin);
    S.under = un; S.over = ov;
    S.cam = cam;
    return { S, So };
  }

  /* ---------- answer: marks on a carrier — the hand for the clock, memory for you ---------- */
  function answerState(t, K) {
    const S = base(), z = K.z1 ?? NEVER, e1 = K.z1_end ?? z + 7.4;
    const c = { vr: wq(K, 'z1', 'врем', .12), vyh: wq(K, 'z1', 'выход', .31), otm: wq(K, 'z1', 'отметк', .42), nos: wq(K, 'z1', 'носител', .51),
      chas: wq(K, 'z1', 'часов', .64), str: wq(K, 'z1', 'стрелк', .73), teb: wq(K, 'z1', 'тебя', .85), pam: wq(K, 'z1', 'памят', .94) };
    S.tau = t;
    S.trail = .5 * pulse(t, c.vr, c.vyh, .3, .5) + B(t, c.str, c.str + .3) * (1 - .7 * B(t, c.teb, c.pam));
    S.hBox = S.fBox = B(t, c.vyh, c.vyh + .4) * (1 - B(t, c.chas, c.chas + .5));
    S.tick = B(t, c.otm, c.otm + .9) * (1 - .7 * B(t, c.str, c.teb + .3));
    const clockLit = .6 * pulse(t, c.nos, c.chas, .3, .5) + pulse(t, c.chas, c.teb, .3, .6);
    S.hGlow = S.fGlow = clockLit;
    const you = B(t, c.teb, c.teb + .5);
    S.clk = 1 - .45 * you;
    S.lab = 1 - you;
    let ov = halo(PX, 112, 52, .5 * you * (1 - .3 * B(t, c.pam, c.pam + .5)));
    const d = Math.max(.08, (e1 - c.pam) / 5);
    ov += headFilm(t, B(t, c.pam - .1, c.pam + .35), B(t, c.pam - .1, c.pam + .5), i => .2 + .8 * B(t, c.pam + .15 + i * d, c.pam + .4 + i * d));
    S.over = ov;
    S.cam = { s: 1 + .04 * B(t, z - .05, e1 + .3), px: 200, py: 205, qx: 200, qy: 205 };
    return S;
  }

  /* ---------- ring: memory frames, then back to the very first frame by «Хотя» ---------- */
  function ringState(t, K) {
    const z = K.z5 ?? NEVER, end = K.end ?? (K.z5_end ?? z + 6) + 2.9;
    const S = openingState(0, K);
    S.tau = t - end;
    S.hAng = A0 + W * S.tau;
    const c = { dl: wq(K, 'z5', 'длин', .06), str: wq(K, 'z5', 'стрелк', .35), chas: wq(K, 'z5', 'часах', .48),
      per: wq(K, 'z5', 'пережит', .62), op: wq(K, 'z5', 'опыт', .72) };
    // v34: «И ещё: твоя голова стареет быстрее ног» (z5_2, after z3) brings back the first frame from its first word
    c.hot = K.z5_2 != null ? Math.max(c.op + .3, K.z5_2 + .15) : Math.max(c.op + .3, wq(K, 'z5', 'хотя', .81, c.op));
    const back = B(t, c.op + .05, c.hot), off = B(t, c.str + .2, c.str + .8);
    S.hand = 1 - off * (1 - back);
    const fl = .7 * pulse(t, c.str - .05, c.chas, .25, .6);
    S.hGlow += fl; S.fGlow += fl;
    const l0 = c.per - .25, ring = B(t, c.dl, c.dl + .6) * (1 - back), d = Math.max(.04, (c.op - .1 - l0) / 9);
    const lit = i => B(t, l0 + i * d, l0 + i * d + .25);
    S.clk = 1 - .5 * ring; S.dig = 1 - .6 * ring; S.lab *= 1 - ring; S.thr *= 1 - ring;
    if (K.z5_2 != null) { const on = B(t, K.z5_2 + .2, K.z5_2 + .8); S.clk *= on; S.dig *= on; S.lab *= on; S.thr *= on;   // blind view v2 B7
      // blind view v3 A13: «И ещё» — both hands at 12; «стареет быстрее ног» — the head's hand runs ahead, the feet's lags
      const tz = K.z5_2, tb = wq(K, 'z5', 'быстр', .4, tz), run = Math.max(0, t - tz - .3) * 1.1;
      S.fAng = run; S.hAng = run + 2.4 * B(t, tb - .3, tb + 1.4); S.hGlow += .8 * pulse(t, tb - .2, tb + 1.6, .3, .6);
      S.spesh = B(t, tb, tb + .4); }
    S.under = halo(PX, 214, 150, .2 * ring) + memFrames(t, K, ring, lit, false);
    S.over = memFrames(t, K, ring, lit, true);
    const q = B(t, z - .05, c.hot);
    S.cam = { s: 1 + .08 * (1 - q), px: PX, py: 214, qx: PX, qy: 214 };
    return S;
  }

  function body(t, K, mode) {
    K = K || {};
    if (mode === 'height') { const { S, So } = heightState(t, K); return stage(S) + stage(So, true); }
    if (mode === 'tower2') {   // v7 A2: «У подножия башни она сильнее — поэтому там время и медленнее»
      const med = wq(K, 'h4', 'медлен', .1, wq(K, 'h4', 'внизу', 0)), st = K['c1b~@'] ?? t, tf = med + .9 + Math.max(0, t - st) * .4;
      const { S, So } = heightState(tf, K); return stage(S) + stage(So, true);
    }
    const S = mode === 'answer' ? answerState(t, K) : mode === 'ring' ? ringState(t, K) : openingState(t, K);
    return stage(S);
  }

  // seams of the one continuous line hook → promise → height: no dissolve there
  const SEAM = { 'hook>promise': 1, 'promise>height': 1, 'hook>height': 1 };
  SCENES.ts_body = function (u, p = {}, d, t) {
    const K = p.K || {}, mode = p.mode || 'hook';
    let svg = body(t, K, mode);
    const own = (mode === 'hook' && !p.prev) || (p.prev === 'ts_body' && SEAM[`${p.prev_mode}>${mode}`]);
    if (!own) {
      const s0 = t - u, q = B(t, s0, s0 + (mode === 'tower2' ? .12 : .7));   // v7 A2: no ГРАВИТАЦИЯ through the tower
      if (q < 1) {
        let prev = '';
        try { if (p.prev && SCENES[p.prev] && typeof SCENES[p.prev].body === 'function') prev = SCENES[p.prev].body(t, K, p.prev_mode); } catch (err) { prev = ''; }
        svg = (prev ? `<g opacity="${f(1 - q)}">${prev}</g>` : '') + `<g opacity="${f(q)}">${svg}</g>`;
      }
    }
    return UN.wrap(svg);
  };
  SCENES.ts_body.body = body;
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_body; SCENES.ts_body = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
