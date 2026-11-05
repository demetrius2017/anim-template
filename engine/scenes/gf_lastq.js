/* gf_lastq — «Бог ещё не создан», часть 2 (eps/god_future_p2), фразы b04–b05: рассказ Азимова «Последний вопрос», v3.
 * Текст v15 (eps/god_future/source/text_v15.md): b04 «Как Бог может появиться в конце, показал фантаст Айзек Азимов —
 * в рассказе «Последний вопрос» 1956 года. Триллионы лет люди спрашивают компьютер: можно ли обратить вспять энтропию —
 * то, что мир остывает и рассыпается?»; b05 «Гаснут звёзды, исчезают люди. А в самом конце компьютер, который когда-то
 * собрали люди, находит ответ и сам становится Творцом: «Да будет свет».» Вторую половину b05 (со слов «А в самом конце»)
 * storybase отдаёт как синтетический K.b06 / K.b06_end / K.words.b06 — у неё свой кадр creator. Словарь — gf_00_lib.js.
 * v3 — по слепому просмотру v1 (eps/god_future/qa/blind_view_v1/summary.md, p2 Л1 к17–25; на телефоне сцена ужата в .72):
 *   текст на экране и счётчик были мелкими (3 из 3) → экран на всю ширину сцены (300×156), вопрос моно 19 и ответ моно 21,
 *   каждое слово вопроса печатается на своём слове речи; «ГОД 1956» принимали за год в рассказе (2 из 3) → счётчик
 *   начинается с 2061 (первый вопрос у Азимова), 1956 — только в шапке-источнике; на «А в самом конце» снова были два
 *   человечка (3 из 3) → после «исчезают люди» людей нет, экран компьютера растворяется в соты (переход к шару gf_globe).
 * В кадре: звёзды; в центре — каркасный старый компьютер (местные координаты: рамка 16..344 × 72..252, экран 30..330 ×
 * 84..240, центр экрана 180,162), верх корпуса, ножка, клавиатура с клавишами, лампочки под экраном; по бокам внизу —
 * четыре человека из точек (без лиц). Вверху — шапка «АЙЗЕК АЗИМОВ / «ПОСЛЕДНИЙ ВОПРОС» · 1956», потом на её месте —
 * крупный счётчик лет. Камера: вход z .78 → «показал»…«рассказе» наезд до 1 → «мир»…«гаснут» отъезд до .64 (центр
 * экрана уходит в 180,152) → b06 «А»…«компьютер» снова наезд до .92. Звёзды, шапка, счётчик, соты и огонь — в координатах
 * кадра, вне наезда.
 *
 * Режимы ask (b04) → light (b05, «Гаснут звёзды, исчезают люди.») → creator (b06 = b05 с «А в самом конце»);
 * body(t, K, mode) от mode не зависит — одна непрерывная линия от t и K, поэтому между режимами нет швов.
 * Слова (основы для GF.w; нет слова — начало фразы, без ошибки):
 *  ask (b04)    начало — наплыв из gf_omega/tree (GF.scene): огонь порядка стоит там же, где в вершине древа (180,111.3)
 *               r 11, звёзды, компьютер выключен (блик на тёмном экране); «бог» → «конце» — огонь опускается в экран и
 *               меркнет, на «конце» волна; «показал» — экран включается (полоса ЭЛТ, развёртка), лампочки мигают, наезд;
 *               «айзек» — шапка «АЙЗЕК АЗИМОВ» (моно 18); «рассказе» — на экране строка за строкой штрихи-слова (рукопись);
 *               «последний» — вторая строка шапки «ПОСЛЕДНИЙ ВОПРОС»; «вопрос» — рукопись стирается, крупный «?»;
 *               «тысяча» — в шапке допечатывается «· 1956» (вспышка); «триллионы» — шапка и «?» гаснут, на месте шапки
 *               крупно «ГОД 2061» (моно 20), счётчик бежит (≈ 10¹³ к «гаснут»); «люди» — по бокам собираются
 *               четыре человека; «спрашивают» — от людей к экрану нити, по ним бегут огоньки, на экране «>»;
 *               «можно», «ли», «обратить», «вспять», «энтропию» — каждое слово печатается на своём слове
 *               («МОЖНО ЛИ ОБРАТИТЬ / ВСПЯТЬ ЭНТРОПИЮ?», порядок речи); конец «энтропию» — экран вспыхивает, ответ
 *               «НЕДОСТАТОЧНО ДАННЫХ»; «мир» — камера отъезжает, открывая звёзды; «остывает» — звёзды тускнеют;
 *               «рассыпается» — звёзды разлетаются от центра со следами.
 *  light (b05)  «гаснут» — звёзды гаснут по одной (каждая вспыхивает напоследок) до «конце» (b06); «исчезают» → «люди» —
 *               люди тают: точки поднимаются и расходятся, нити гаснут. Дальше людей в кадре нет.
 *  creator (b06) начало («А») — корпус тускнеет, светится только экран, камера снова наезжает (до .92); «конце» — последние звёзды гаснут, счётчик и текст
 *               на экране стираются; «компьютер» — экран «думает» (бегут квадраты, лампочки мигают); «когда» — части
 *               корпуса расходятся (вид в разобранном виде), «собрали» — сходятся обратно со вспышкой на стыках;
 *               «находит» — квадраты бегут быстрее; «ответ» — квадраты вспыхивают разом, экран вспыхивает, волна;
 *               «сам» — корпус гаснет; «становится» → конец «Творцом» — экран растворяется в соты: сначала ячейки внутри
 *               экрана, потом волна наружу до радиуса 100, рамка экрана сжимается до бледного контура 106×62, в центре
 *               разгорается огонь порядка GF.spark(180,152, r 11); «творцом» — соты вспыхивают; «да» — вверху печатается
 *               «ДА БУДЕТ СВЕТ» (моно 20); «свет» — от огня тёплый свет (радиус до ≈145) и разлетаются новые звёзды.
 * Выход: поза держится — огонь порядка в (180,152) r 11, бледный контур экрана 106×62 (x 127, y 121, op .34), плоские соты
 * r 14 в круге 100, новые звёзды, тёплый свет, «ДА БУДЕТ СВЕТ»; из неё наплывает gf_globe/mind.
 * Важное — y = 26..340 (кадр), подписи моно ≥ 12, текст экрана ≥ 19 (при z 1).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lin = (t, a, b) => clamp((t - a) / Math.max(.001, b - a));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => GF.hash(n);
  const easeOut = x => 1 - Math.pow(1 - clamp(x), 2.2);
  const LX = 180, LY = 162;                                     // центр экрана в местных координатах = центр наезда
  const SCR = { x: 30, y: 84, w: 300, h: 156, r: 10 };          // экран (местные)
  const BEZ = { x: 16, y: 72, w: 328, h: 180, r: 14 };          // рамка (местные)
  const FIN = { x: 127, y: 121, w: 106, h: 62, r: 6 };          // поза выхода (кадр): бледный контур экрана — его ждёт gf_globe
  const FX = 180, FY = 152, FR = 11;                            // огонь порядка в позе выхода (кадр)
  const OMX = 180, OMY = 111.3, OMR = 11;                       // огонь в вершине древа gf_omega (кадр)
  const Z0 = .78, Z2 = .64, Z3 = .92;                           // наезд: вход .78 → 1 → отъезд .64 → снова .92 (b06)
  const PEOPLE = [[30, 50, 3], [62, 44, 5], [298, 46, 7], [330, 52, 11]];   // [x, рост, зерно], подошвы на FEET (местные)
  const FEET = 334;
  const head = k => [PEOPLE[k][0], FEET - PEOPLE[k][1] * .9];
  const CORNER = k => k < 2 ? [SCR.x + 10, SCR.y + SCR.h - 6] : [SCR.x + SCR.w - 10, SCR.y + SCR.h - 6];
  const ADV = .6;                                               // моно Plex SemiBold: ширина знака .6 em

  const rrect = (b, o = {}) => `<rect x="${f(b.x)}" y="${f(b.y)}" width="${f(b.w)}" height="${f(b.h)}" rx="${f(b.r)}" fill="${o.fill ?? 'none'}" stroke="#fff" stroke-width="${o.w ?? .7}" opacity="${f(o.op ?? .6)}"${o.glow ? ' filter="url(#un-soft)"' : ''}/>`;
  const boxAt = (b, z, ty) => ({ x: LX + (b.x - LX) * z, y: ty + (b.y - LY) * z, w: b.w * z, h: b.h * z, r: b.r * z });
  const lerpBox = (a, b, k) => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), w: lerp(a.w, b.w, k), h: lerp(a.h, b.h, k), r: lerp(a.r, b.r, k) });
  const grow = (b, k) => ({ x: b.x + b.w / 2 * (1 - k), y: b.y + b.h / 2 * (1 - k), w: b.w * k, h: b.h * k, r: b.r * k });
  const pline = (P, op, w = 1.2) => op <= .003 ? '' : UN.polyline(P, { opacity: op, width: w });
  const glowAt = (x, y, r, op) => op <= .003 ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#gf-warm)" opacity="${f(op)}"/>`;

  let C = null;                                                // неизменяемый кеш точек (строится при первой отрисовке)
  function cache() {
    if (C) return C;
    const text = (x, y) => y > 22 && y < 64 && x > 40 && x < 320;   // полоса шапки и счётчика
    const stars = GF.cloud(330, 21, [6, 18, 354, 340]).filter(p => !text(p[0], p[1]));
    const born = GF.cloud(150, 33, [6, 22, 354, 330]).filter(p => !text(p[0], p[1]));
    const people = PEOPLE.map(([x, h, s]) => GF.personPts(x, FEET, h, 170, s));
    const dust = PEOPLE.map(([x, h, s]) => GF.cloud(170, s + 40, [x - 28, FEET - h - 28, x + 28, FEET + 6]));
    const combPts = GF.hexPts(FX, FY, 14, 12, 12).filter(p => Math.hypot(p[0] - FX, p[1] - FY) < 100);
    const keys = [];
    for (let r = 0; r < 3; r++) for (let i = 0; i < 18; i++) {
      const u = (i + .5) / 18, y = 273 + r * 6, sl = (y - 268) / 22;
      keys.push([lerp(lerp(96, 80, sl) + 6, lerp(264, 280, sl) - 6, u), y, H(r * 31 + i * 7 + 1) - .5, H(r * 17 + i * 3 + 5) - .5]);
    }
    C = Object.freeze({ stars, born, people, dust, combPts, keys });
    return C;
  }

  /* корпус (местные координаты): ex 0..1 — части расходятся («когда-то»), snap 0..1 — вспышка на стыках («собрали») */
  function computer(t, op, on, lamps, ex, snap) {
    if (op <= .003) return '';
    const up = -16 * ex, st = 12 * ex, dn = 24 * ex, br = .6 * snap;
    let s = rrect(BEZ, { op: 1, w: 0, fill: '#000' }) + rrect(grow(BEZ, 1 + .03 * ex), { op: .75 + br, w: 1.4 }) + rrect(BEZ, { op: .2 + br, w: 3, glow: true });
    s += pline([[24, 72 + up], [40, 66 + up], [320, 66 + up], [336, 72 + up]], .55 + br);                     // верх корпуса
    s += pline([[166, 252 + st], [160, 262 + st]], .6 + br, 1.4) + pline([[194, 252 + st], [200, 262 + st]], .6 + br, 1.4) +
      pline([[138, 263 + st], [222, 263 + st]], .65 + br, 1.6);                                                // ножка
    s += pline([[96, 268 + dn], [264, 268 + dn], [280, 290 + dn], [80, 290 + dn], [96, 268 + dn]], .6 + br);   // клавиатура
    let keys = '';
    for (const [x, y, a, b] of C.keys) keys += `<rect x="${f(x - 3.5 + 12 * a * ex)}" y="${f(y - 1.6 + dn + 10 * b * ex)}" width="7" height="3.2" rx=".8" opacity="${f(.45 + br)}"/>`;
    s += `<g fill="#fff">${keys}</g>`;
    let lm = '';
    for (let i = 0; i < 9; i++) {
      const v = on * lamps * (H(i * 13 + Math.floor(t * 3.3 + i * .37)) > .45 ? 1 : 0);
      lm += `<circle cx="${f(144 + i * 9)}" cy="246" r="2" opacity="${f(.25 + .7 * v)}"/>`;
    }
    s += `<g fill="#fff">${lm}</g>`;
    if (snap > .003) s += glowAt(180, 252, 40, snap) + glowAt(180, 266, 40, snap) + glowAt(24, 72, 32, snap) + glowAt(336, 72, 32, snap) + glowAt(88, 279, 30, snap) + glowAt(272, 279, 30, snap);
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // слова строки печатаются каждое со своего слова речи: list [[слово, t0], …]; слово, за которым уже началось
  // следующее, — целиком
  function words(x, y, list, t, o = {}) {
    let s = '', typing = false;
    for (let i = 0; i < list.length; i++) {
      const [wd, t0] = list[i];
      if (t < t0) break;
      const next = i + 1 < list.length && t >= list[i + 1][1];
      const n = next ? wd.length : Math.min(wd.length, Math.floor((t - t0) * (o.cps ?? 26)) + 1);
      s += (i ? ' ' : '') + wd.slice(0, n);
      typing = n < wd.length;
    }
    if (!s) return '';
    return GF.mono(x, y, s + (typing && Math.floor(t * 3) % 2 === 0 ? '▌' : ''), { size: o.size ?? 19, anchor: 'start', opacity: o.op ?? .95, glow: o.glow });
  }

  function body(t, K) {
    const W = (id, stem, n = 0) => GF.w(K, id, stem, n), WE = (id, stem, n = 0) => GF.we(K, id, stem, n);
    const a = 'b04', b = 'b05', c = 'b06';                       // ask, light, creator (story.py: b06 — часть b05 с «А»)
    const T4 = GF.T(K, a), E4 = GF.TE(K, a), T6 = GF.T(K, c);
    // b04
    const tKon4 = W(a, 'конце'), tShow = W(a, 'показал'), tAj = W(a, 'айзек'), tRas = W(a, 'рассказ'), tPos = W(a, 'последн');
    const tVop = W(a, 'вопрос'), tYear = W(a, 'тысяч'), tTr = W(a, 'трилл'), tPpl = W(a, 'люди'), tAsk = W(a, 'спрашив');
    const tMoz = W(a, 'можно'), tLi = W(a, 'ли'), tObr = W(a, 'обратит'), tVsp = W(a, 'вспять'), tEnt = W(a, 'энтроп');
    const tAns = WE(a, 'энтроп') + .05, tMir = W(a, 'мир'), tCool = W(a, 'остыв'), tRsp = W(a, 'рассып');
    // b05 (первая половина: «Гаснут звёзды, исчезают люди.»)
    const tOut = W(b, 'гаснут'), tIs = W(b, 'исчеза'), tLy5 = WE(b, 'люди');
    // b06 («А в самом конце компьютер, который когда-то собрали люди, находит ответ и сам становится Творцом: «Да будет свет».»)
    const tKon6 = W(c, 'конце'), tKomp = W(c, 'компьют'), tKog = W(c, 'когда'), tSob = W(c, 'собрал'), tNah = W(c, 'находит');
    const tAnsw = W(c, 'ответ'), tSam = W(c, 'сам', 1), tSt = W(c, 'станов'), tTv = W(c, 'творц'), tTvE = WE(c, 'творц');
    const tDa = W(c, 'да'), tLight = W(c, 'свет'), tLightE = WE(c, 'свет');   // 'сам', 1: первое на «сам» — «самом»
    const P = cache();
    let s = '';

    // --- камера: вход .78; «показал» → «рассказе» — наезд до 1; «мир» → «гаснут» — отъезд до .64, центр экрана 162 → 152;
    // b06 «А» → «компьютер» — снова наезд до .92 (в тёмном мире крупно один компьютер)
    const zOut = GF.qq(t, tMir, tOut + 1.0);
    const z = lerp(Z0, 1, GF.qq(t, tShow, tRas + .4)) * lerp(1, Z2, zOut) * lerp(1, Z3 / Z2, GF.qq(t, T6, tKomp + .4)), ty = lerp(LY, FY, zOut);

    // --- звёзды (кадр): мерцают; «остывает» — тускнеют; «рассыпается» — разлетаются; «гаснут» → b06 «конце» — гаснут по одной
    const spr = u => 1 + .3 * GF.qq(u, tRsp - .2, E4 + .6) + .06 * GF.qq(u, GF.T(K, b), tKon6 + .5);
    const cool = GF.qq(t, tCool, tRsp + .3), spread = spr(t), back = spr(t - .3);
    const SP = [], SA = [], SR = [];
    let strails = '';
    P.stars.forEach((p, i) => {
      const big = H(i * 3 + 1) > .85, td = tOut + .1 + H(i * 7 + 3) * Math.max(.5, tKon6 - tOut - .2);
      const life = GF.out(t, td, .35);
      if (life <= .003) return;
      const flare = GF.q(t, td - .25, .25) * life;              // каждая вспыхивает напоследок, крупные — ярче
      const dx = p[0] - FX, dy = p[1] - 157;
      SP.push([FX + dx * spread + (cool > 0 ? 3 * cool * Math.sin(t * 1.4 + i) : 0), 157 + dy * spread + (cool > 0 ? 2.4 * cool * Math.cos(t * 1.2 + i * .7) : 0)]);
      SA.push((big ? 1 : .45 + .45 * H(i * 5 + 2)) * (1 - .35 * cool) * life + (big ? .5 : .35) * flare);
      if (spread - back > .02) strails += pline([[FX + dx * back, 157 + dy * back], SP[SP.length - 1]], Math.min(.5, 6 * (spread - back)) * SA[SA.length - 1], .7);
      SR.push((big ? 2.1 : .8 + .6 * H(i * 11 + 4)) * (1 - .2 * cool) * (1 + (big ? 1.4 : .9) * flare));
    });
    s += strails + GF.dots(SP, { r: 1, op: GF.q(t, T4 - .4, .5), glow: .6, t, alpha: i => SA[i], size: i => SR[i] });

    // --- новые звёзды рождаются из света (b06 «свет»), со следами
    const NB = [], NA = [];
    let trails = '';
    P.born.forEach((p, i) => {
      const tb = tLight - .05 + H(i * 5 + 2) * .9, u = GF.q(t, tb, 1.4);
      if (u <= .002) return;
      const e = easeOut(u), e0 = easeOut(Math.max(0, u - .12));
      const x = lerp(FX, p[0], e), y = lerp(FY, p[1], e);
      NB.push([x, y]); NA.push(.4 + .6 * u);
      if (u < .98) trails += pline([[lerp(FX, p[0], e0), lerp(FY, p[1], e0)], [x, y]], .4 * (1 - u), .7);
    });
    s += trails + GF.dots(NB, { r: 1, op: 1, glow: .6, t, alpha: i => NA[i], size: i => .9 + .8 * H(i * 9 + 1) });

    // --- мягкий тёплый свет от огня (b06 «свет»)
    const qL = GF.qq(t, tLight - .1, tLightE + .4);
    if (qL > .003) s += `<circle cx="${FX}" cy="${FY}" r="${f(20 + 125 * qL)}" fill="url(#gf-warm)" opacity="${f(.95 * qL)}"/>`;

    // --- корпус и люди (местные координаты, под наездом)
    const on = GF.q(t, tShow + .2, .35);
    const rate = 9 * (1 + GF.q(t, tNah, .3));                                   // «находит» — квадраты быстрее
    const think = GF.q(t, tKomp, .3) * GF.out(t, tAnsw, .2);
    const found = GF.q(t, tAnsw, .1) * GF.out(t, tAnsw + .25, .45);
    const memo = GF.q(t, tKog - .1, .3) * (1 - GF.q(t, tSob + .5, .6));       // «когда-то собрали» — корпус снова виден
    const ex = GF.q(t, tKog, .3) * (1 - GF.q(t, tSob, .25));
    const snap = GF.q(t, tSob + .2, .1) * (1 - GF.q(t, tSob + .3, .5));
    const frameOp = (1 - .55 * GF.q(t, T6, .8) * (1 - memo)) * GF.out(t, tSam, Math.max(.4, tSt - tSam + .2));
    let loc = computer(t, frameOp, on, Math.min(1, 1 - .7 * GF.q(t, T6, .6) + .7 * think + found), ex, snap);
    // люди: собираются из точек («люди»), нити к экрану («спрашивают»), тают («исчезают» → «люди»); дальше их нет
    const melt = GF.qq(t, tIs, tLy5 + .5), gather = GF.qq(t, tPpl - .1, tPpl + .7);
    if (gather > .003 && melt < .997) {
      const ask = GF.q(t, tAsk, .4) * (1 - melt);
      PEOPLE.forEach((pp, k) => {
        let Q = GF.morph(P.dust[k], P.people[k], gather, t, { amp: 3, seed: k + 2 });
        if (melt > 0) Q = Q.map((q, i) => [q[0] + (H(i * 3 + k) - .5) * 30 * melt, q[1] - (10 + 34 * H(i * 7 + k)) * melt]);
        loc += GF.dots(Q, { r: 1.25, op: (.45 + .5 * gather) * (1 - melt), glow: .5, t });
        if (ask > .003) {
          const h = head(k), to = CORNER(k);
          loc += pline([h, to], .55 * ask, 1.1);
          const u = ((t - tAsk) * .9 + k * .27) % 1;
          if (t > tAsk) loc += `<circle cx="${f(lerp(h[0], to[0], u))}" cy="${f(lerp(h[1], to[1], u))}" r="3.2" fill="#fff" opacity="${f(.8 * ask)}" filter="url(#un-soft)"/><circle cx="${f(lerp(h[0], to[0], u))}" cy="${f(lerp(h[1], to[1], u))}" r="1.8" fill="#fff" opacity="${f(ask)}"/>`;
        }
      });
    }
    s += GF.zoom(loc, LX, LY, z, LX, ty);

    // --- экран (кадр): рамка экрана под наездом; «становится» → конец «Творцом» — сжимается до бледного контура FIN
    const zb = boxAt(SCR, z, ty), shrink = GF.qq(t, tSt, tTvE), box = lerpBox(zb, FIN, shrink);
    const ansFl = GF.q(t, tAns, .08) * (1 - GF.q(t, tAns + .12, .5));
    const glowOn = GF.q(t, tAnsw, .3) * (1 - GF.q(t, tSt, .8));                     // найденный ответ — экран светится
    const fillA = .07 * on * (1 - shrink) + .55 * found + .14 * glowOn + .2 * ansFl;
    if (fillA > .003) s += rrect(box, { op: 1, w: 0, fill: `rgba(255,246,228,${f(fillA)})` });
    s += rrect(box, { op: lerp(.8, .34, shrink), w: lerp(1.4, .8, shrink) }) + rrect(box, { op: .25 * (1 - shrink), w: 3, glow: true });
    const wv = GF.qq(t, tAnsw, tAnsw + 1.1);                                          // «ответ» — волна от рамки
    if (wv > .003 && wv < 1) s += rrect(grow(box, 1 + .45 * wv), { op: .6 * (1 - wv), w: 1.2 });
    // содержимое экрана — в местных координатах экрана (SCR), масштаб по ширине рамки
    let scr = '';
    if (on < .02) scr += pline([[SCR.x + 30, SCR.y + 120], [SCR.x + 110, SCR.y + 24]], .16, 2) + pline([[SCR.x + 56, SCR.y + 130], [SCR.x + 126, SCR.y + 44]], .09, 1.4);
    const p1 = GF.q(t, tShow, .22), p2 = GF.q(t, tShow + .18, .3);                  // включение ЭЛТ: полоса раскрывается
    if (p1 > .003 && p2 < .997) {
      const hw = 146 * p1, hh = 1.5 + 76 * p2;
      scr += `<rect x="${f(LX - hw)}" y="${f(LY - hh)}" width="${f(2 * hw)}" height="${f(2 * hh)}" fill="#fff" opacity="${f(.65 * (1 - p2) + .05)}"/>`;
    }
    const live = on * (1 - GF.q(t, tSt, .6));
    if (live > .003) {
      let sl = '';
      for (let y = SCR.y + 5; y < SCR.y + SCR.h - 3; y += 5) sl += `<line x1="${SCR.x + 6}" x2="${SCR.x + SCR.w - 6}" y1="${y}" y2="${y}"/>`;
      const by = SCR.y + 3 + ((t * 40) % (SCR.h - 14));
      scr += `<g stroke="#fff" stroke-width=".6" opacity="${f(.07 * live)}">${sl}</g>`;
      scr += `<rect x="${SCR.x + 4}" y="${f(by)}" width="${SCR.w - 8}" height="9" fill="#fff" opacity="${f(.05 * live)}"/>`;
    }
    const clr = GF.out(t, tKon6, .5);                                                  // b06 «конце» — экран стирается
    const cur = (x, y, op) => op <= .003 || Math.floor(t * 2.6) % 2 ? '' : `<rect x="${f(x)}" y="${f(y - 16)}" width="11" height="18" fill="#fff" opacity="${f(op)}"/>`;
    // «рассказе» — строки рукописи (штрихи-слова), стираются к «вопрос»
    const ms = GF.q(t, tRas, .25) * GF.out(t, tVop - .1, .3);
    if (ms > .003) {
      let r = '';
      for (let j = 0; j < 5; j++) {
        const y = SCR.y + 28 + j * 24, len = [252, 262, 238, 256, 140][j], u = lin(t, tRas + j * .15, tRas + j * .15 + .3);
        for (let x = 0, n = 0; x < len * u; n++) {
          const wd = Math.min(12 + 24 * H(j * 31 + n * 7 + 1), len * u - x);
          r += `<rect x="${f(SCR.x + 18 + x)}" y="${f(y - 2.2)}" width="${f(wd)}" height="4.4" rx="1.6"/>`;
          x += wd + 8;
        }
      }
      scr += `<g fill="#fff" opacity="${f(.65 * ms)}">${r}</g>`;
    }
    const qMark = GF.q(t, tVop, .35) * GF.out(t, tTr, .45);
    if (qMark > .003) scr += `<g opacity="${f(qMark)}">${GF.mono(LX, LY + 32, '?', { size: 96, anchor: 'middle', opacity: .95, glow: true })}</g>`;
    // «спрашивают» — приглашение «>»; вопрос — по словам речи; ответ — крупно, со вспышкой экрана
    const QX = SCR.x + 44, Q1 = SCR.y + 42, Q2 = SCR.y + 70;
    if (on > .5 && t > tTr && t < tAsk && clr > .003) scr += cur(SCR.x + 16, Q1, .8);
    if (t >= tAsk && clr > .003) {
      scr += `<g opacity="${f(clr)}">` + GF.mono(SCR.x + 16, Q1, '>', { size: 19, anchor: 'start', opacity: .95 }) + (t < tMoz ? cur(QX, Q1, .85) : '') +
        words(QX, Q1, [['МОЖНО', tMoz], ['ЛИ', tLi], ['ОБРАТИТЬ', tObr]], t, { size: 19 }) +
        (t >= tVsp ? words(QX, Q2, [['ВСПЯТЬ', tVsp], ['ЭНТРОПИЮ?', tEnt]], t, { size: 19 }) : '') +
        GF.typed(LX - 19 * 21 * ADV / 2, SCR.y + 124, 'НЕДОСТАТОЧНО ДАННЫХ', t, tAns, { size: 21, cps: 32, anchor: 'start', glow: true, op: .88 + .12 * Math.sin(t * 6) }) + '</g>';
    }
    // b06 «компьютер» — экран «думает»: бегут квадраты; «ответ» — вспыхивают разом
    const sqOp = Math.max(think, found);
    if (sqOp > .003) {
      let sq = '';
      const kq = Math.floor((t - tKomp) * rate) % 14;
      for (let i = 0; i < 13; i++) sq += `<rect x="${f(LX - 126 + i * 20)}" y="${LY - 6}" width="12" height="12" rx="1.5" opacity="${f(Math.max((i === kq || i === (kq + 13) % 14 ? .95 : .22) * think, .95 * found))}"/>`;
      scr += `<g fill="#fff">${sq}</g>` + cur(SCR.x + 16, Q1, .7 * think);
    }
    if (scr) s += GF.zoom(scr, LX, LY, box.w / SCR.w, box.x + box.w / 2, box.y + box.h / 2);

    // --- начало b04: огонь из вершины древа gf_omega опускается в тёмный экран и меркнет
    const dive = GF.qq(t, T4 + .15, tKon4);
    const fOp = (1 - .55 * dive) * GF.out(t, tShow, .3);
    if (fOp > .003) s += GF.spark(LX, lerp(OMY, ty, dive), OMR * (1 - .5 * dive), { t, op: fOp });
    const w4 = GF.qq(t, tKon4, tKon4 + 1);
    if (w4 > .003 && w4 < 1 && t < tShow + .3) s += `<circle cx="${LX}" cy="${f(ty)}" r="${f(10 + 50 * w4)}" fill="none" stroke="#fff" stroke-width="1.2" opacity="${f(.65 * (1 - w4))}"/>`;

    // --- экран растворяется в соты («становится»): сначала ячейки внутри экрана, потом волна наружу до радиуса 100
    const flash = GF.q(t, tTv, .35) * (1 - .6 * GF.q(t, tTv + .4, .8));
    const zb0 = boxAt(SCR, Z3, FY);
    const outside = (x, y) => Math.hypot(Math.max(0, Math.abs(x - FX) - zb0.w / 2), Math.max(0, Math.abs(y - FY) - zb0.h / 2));
    const litC = (x, y) => {
      const d = Math.hypot(x - FX, y - FY);
      if (d > 100) return 0;
      const t0 = tSt - .05 + H(Math.round(x * 3 + y * 7)) * .25 + clamp(outside(x, y) / 50) * .7;
      return GF.q(t, t0, .4) * (1 - .4 * d / 100) * (.85 + .15 * Math.sin(t * 2 + d * .1)) + .35 * flash * (1 - d / 100);
    };
    if (t > tSt - .1) {
      s += GF.comb(FX, FY, 14, 12, 12, { lit: (i, x, y) => litC(x, y), w: .8 });
      const CA = P.combPts.map(p => litC(p[0], p[1]));
      s += GF.dots(P.combPts, { r: 1.1, op: 1, glow: .5, t, alpha: i => CA[i] });
    }
    // --- огонь порядка в центре экрана (b06 «становится»)
    const fire = GF.q(t, tSt + .1, .7);
    s += GF.spark(FX, FY, FR * (.3 + .7 * fire) * (1 + .12 * flash), { t, op: fire });

    // --- вверху (кадр): шапка-источник → счётчик лет → «ДА БУДЕТ СВЕТ»
    const hOp = GF.out(t, tTr, .45);
    if (t >= tAj && hOp > .003) {
      const NAME = 'АЙЗЕК АЗИМОВ', L2A = '«ПОСЛЕДНИЙ ВОПРОС»', L2B = ' · 1956', s2 = 12 * 1.15 * ADV;   // моно 12 растёт в зоне до 13,8
      const x2 = LX - (L2A.length + L2B.length) * s2 / 2, yf = GF.q(t, tYear, .15) * (1 - GF.q(t, tYear + .3, .8));
      const u = GF.q(t, tAj, .7);
      s += `<g opacity="${f(hOp)}">` + GF.typed(LX - NAME.length * 18 * ADV / 2, 38, NAME, t, tAj, { size: 18, cps: 24, anchor: 'start', glow: true }) +
        `<line x1="${f(LX - 84 * u)}" x2="${f(LX + 84 * u)}" y1="45" y2="45" stroke="#fff" stroke-width=".8" opacity=".5"/>` +
        GF.typed(x2, 58, L2A, t, tPos, { size: 12, cps: 34, anchor: 'start', op: .88 }) +
        GF.typed(x2 + L2A.length * s2, 58, L2B, t, tYear, { size: 12, cps: 20, anchor: 'start', op: .88 + .12 * yf, glow: yf > .2 }) +
        glowAt(x2 + (L2A.length + 4.5) * s2, 54, 26, .8 * yf) + '</g>';
    }
    // счётчик: «триллионы» — ГОД 2061 (первый вопрос у Азимова), бежит до ≈ 10¹³ к «гаснут» и дальше; гаснет на b06 «конце»
    const cOp = GF.q(t, tTr + .15, .35) * GF.out(t, tKon6, .6);
    if (cOp > .003) {
      const k = 13 * Math.pow(lin(t, tTr + .15, tOut), 1.4) + 1.2 * lin(t, tOut, tKon6);
      const v = 2060 + Math.floor(Math.pow(10, k) + 1e-6), n = v < 1e4 ? String(v) : v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      s += GF.mono(LX, 46, 'ГОД ' + n, { size: 20, anchor: 'middle', opacity: .95 * cOp, glow: true });
    }
    const da = GF.q(t, tDa - .05, .2);
    if (da > .003) s += GF.typed(LX - 13 * 20 * ADV / 2, 46, 'ДА БУДЕТ СВЕТ', t, tDa, { size: 20, cps: 16, anchor: 'start', glow: true });
    return s;
  }

  SCENES.gf_lastq = GF.scene('gf_lastq', (t, K, mode, p) => body(t, K, mode, p));
})();
