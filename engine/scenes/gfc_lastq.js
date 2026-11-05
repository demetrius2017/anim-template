/* gfc_lastq — «Бог ещё не создан», альтернативная версия «Цветная инфографика», часть 2 (eps/god_future_color_p2),
 * фразы b04–b05: рассказ Азимова «Последний вопрос», v2. Перенос gf_lastq.js v3 основной версии (те же события на тех же
 * словах, та же геометрия и камера), словарь — gfc_00_lib.js (window.GFC), образец стиля — eps/god_future/qa/style_flatcolor.jpg.
 * Текст v15 (eps/god_future/source/text_v15.md): b04 «Как Бог может появиться в конце, показал фантаст Айзек Азимов —
 * в рассказе «Последний вопрос» 1956 года. Триллионы лет люди спрашивают компьютер: можно ли обратить вспять энтропию —
 * то, что мир остывает и рассыпается?»; b05 «Гаснут звёзды, исчезают люди. А в самом конце компьютер, который когда-то
 * собрали люди, находит ответ и сам становится Творцом: «Да будет свет».» Вторую половину b05 (со слов «А в самом конце»)
 * storybase отдаёт как синтетический K.b06 / K.b06_end / K.words.b06 — у неё свой кадр creator.
 * v2 — по слепому просмотру v1 (eps/god_future/qa/blind_view_v1/summary.md, p2 Л1 к17–25; на телефоне сцена ужата в .72):
 *   текст на экране и счётчик были мелкими (3 из 3) → экран на всю ширину сцены (300×156), вопрос 18 (каждое слово
 *   печатается на своём слове речи), ответ 24 в две строки; «ГОД 1956» принимали за год в рассказе (2 из 3) → крупный
 *   счётчик вверху начинается с 2061 (первый вопрос у Азимова), 1956 — только в шапке-источнике; на «А в самом конце»
 *   снова были человечки (3 из 3) → после «исчезают люди» людей нет, экран компьютера растворяется в соты (переход к шару).
 * В кадре: фон словаря; цветные звёзды сцены (белые, золотистые, голубые, сиреневые точки, крупные — четырёхлучевые
 * искры); в центре — плоский цветной старый компьютер (местные координаты, как у gf_lastq: рамка 16..344 × 72..252,
 * стекло 30..330 × 84..240, центр экрана 180,162): сиреневый корпус со светотенью, верх кинескопа, ножка, клавиатура
 * со светлыми клавишами, ряд цветных лампочек под стеклом, мягкая тень. Стекло — тёмно-синее с бирюзовым свечением, текст
 * экрана — бирюзой («фосфор»), «?», ответ и счётчик — золотом. По бокам внизу — четыре плоских человека GFC.person
 * (бирюза, коралл, фиалка, небо; без лиц). Вверху — шапка «АЙЗЕК АЗИМОВ / «ПОСЛЕДНИЙ ВОПРОС» · 1956», потом на её месте
 * крупный счётчик лет на тёмной плашке. Камера (как gf_lastq): вход z .78 → «показал»…«рассказе» наезд до 1 →
 * «мир»…«гаснут» отъезд до .64 (центр экрана уходит в 180,152) → b06 «А»…«компьютер» снова наезд до .92. Звёзды, шапка,
 * счётчик, соты и огонь — в координатах кадра, вне наезда. Красного нет.
 *
 * Режимы ask (b04) → light (b05, «Гаснут звёзды, исчезают люди.») → creator (b06 = b05 с «А в самом конце»);
 * body(t, K, mode) от mode не зависит — одна непрерывная линия от t и K, поэтому между режимами нет швов.
 * Слова (основы для GFC.w — те же, что в gf_lastq; нет слова — начало фразы, без ошибки):
 *  ask (b04)    начало — наплыв из gfc_omega/tree (GFC.scene): огонь порядка стоит там же, где в вершине древа (180,111.3)
 *               r 11, звёзды, компьютер выключен (блик на тёмном стекле); «бог» → «конце» — огонь опускается в экран и
 *               меркнет, на «конце» золотая волна; «показал» — экран включается (полоса ЭЛТ, развёртка, бирюзовое
 *               свечение), лампочки мигают, наезд; «айзек» — шапка «АЙЗЕК АЗИМОВ» (18); «рассказе» — на экране строка за
 *               строкой штрихи-слова (рукопись); «последний» — вторая строка шапки «ПОСЛЕДНИЙ ВОПРОС»; «вопрос» —
 *               рукопись стирается, крупный золотой «?»; «тысяча» — в шапке допечатывается «· 1956» (вспышка);
 *               «триллионы» — шапка и «?» гаснут, на месте шапки крупно «ГОД 2061» (20) на тёмной плашке, счётчик бежит
 *               (≈ 10¹³ к «гаснут»); «люди» — по бокам из цветных точек собираются четыре человека; «спрашивают» — от
 *               людей к экрану нити, по ним бегут огоньки, на экране «>»; «можно», «ли», «обратить», «вспять»,
 *               «энтропию» — каждое слово печатается на своём слове («МОЖНО ЛИ ОБРАТИТЬ / ВСПЯТЬ ЭНТРОПИЮ?», порядок
 *               речи); конец «энтропию» — экран вспыхивает, ответ золотом «НЕДОСТАТОЧНО / ДАННЫХ»; «мир» — камера
 *               отъезжает, открывая звёзды; «остывает» — звёзды голубеют и тускнеют; «рассыпается» — разлетаются от
 *               центра со следами.
 *  light (b05)  «гаснут» — звёзды гаснут по одной (каждая вспыхивает напоследок) до «конце» (b06), на фон ложится тьма;
 *               «исчезают» → «люди» — люди тают: фигуры рассыпаются в цветные точки, точки поднимаются и расходятся,
 *               нити гаснут. Дальше людей в кадре нет.
 *  creator (b06) начало («А») — корпус тускнеет, светится только экран, камера снова наезжает (до .92); «конце» —
 *               последние звёзды гаснут, счётчик и текст на экране стираются; «компьютер» — экран «думает» (бегут
 *               квадраты, лампочки мигают); «когда» — части корпуса расходятся (вид в разобранном виде), «собрали» —
 *               сходятся обратно со вспышкой на стыках; «находит» — квадраты бегут быстрее; «ответ» — квадраты
 *               вспыхивают золотом разом, экран вспыхивает, золотая волна; «сам» — корпус гаснет; «становится» → конец
 *               «Творцом» — экран растворяется в цветные соты: сначала ячейки внутри экрана, потом волна наружу до
 *               радиуса 100, стекло сжимается до бледной рамки 106×62, в центре разгорается огонь порядка
 *               GFC.spark(180,152, r 11); «творцом» — соты вспыхивают (тёплый ореол); «да» — вверху на тёмной плашке
 *               печатается золотом «ДА БУДЕТ СВЕТ» (20); «свет» — от огня тёплый свет (радиус до ≈145), тьма уходит,
 *               разлетаются новые тёплые звёзды.
 * Выход: поза держится — огонь порядка в (180,152) r 11, бледная рамка экрана 106×62 (x 127, y 121, #f1ecff, op .4),
 * цветные соты r 14 в круге 100, новые звёзды, тёплый свет, «ДА БУДЕТ СВЕТ»; из неё наплывает gfc_globe/mind.
 * Важное — y = 23..340 (кадр), подписи ≥ 12, текст экрана ≥ 18 (при z 1). Детерминизм: только t и K (случайность — GFC.hash).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lin = (t, a, b) => clamp((t - a) / Math.max(.001, b - a));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => GFC.hash(n);
  const easeOut = x => 1 - Math.pow(1 - clamp(x), 2.2);
  const LX = 180, LY = 162;                                     // центр экрана в местных координатах = центр наезда
  const SCR = { x: 30, y: 84, w: 300, h: 156, r: 10 };          // стекло (местные)
  const BEZ = { x: 16, y: 72, w: 328, h: 180, r: 14 };          // рамка (местные)
  const FIN = { x: 127, y: 121, w: 106, h: 62, r: 6 };          // поза выхода (кадр): бледная рамка экрана — её ждёт gfc_globe
  const FX = 180, FY = 152, FR = 11;                            // огонь порядка в позе выхода (кадр)
  const OMX = 180, OMY = 111.3, OMR = 11;                       // огонь в вершине древа gfc_omega (кадр)
  const Z0 = .78, Z2 = .64, Z3 = .92;                           // наезд: вход .78 → 1 → отъезд .64 → снова .92 (b06)
  const PEOPLE = [[30, 50, 3, 1], [62, 44, 5, 0], [298, 46, 7, 3], [330, 52, 11, 2]];   // [x, рост, зерно, цвет], подошвы на FEET (местные)
  const FEET = 334;
  const head = k => GFC.anchors(PEOPLE[k][0], FEET, PEOPLE[k][1]).head;
  const CORNER = k => k < 2 ? [SCR.x + 10, SCR.y + SCR.h - 6] : [SCR.x + SCR.w - 10, SCR.y + SCR.h - 6];
  const PH = '#7ff0de', TEAL = '#63e6d2', SKY = '#8ccbff', GOLD = '#ffd166', WARM = '#ffe6a8';   // фосфор экрана, цвета
  const LAMPC = [TEAL, GOLD, SKY, '#eba2ff', '#ff9d8f'];
  const STARC = ['#ffffff', '#fff1c4', '#cfe6ff', '#f3d6ff', '#c9fff4'];
  const BORNC = ['#fff6d0', '#ffe27a', '#ffb547', '#ff9d8f', '#eba2ff', '#8ccbff'];
  const QS = 18, QLS = .03, AS = 24;                            // кегль вопроса и ответа на экране (Montserrat шире Plex)

  const rrect = (b, o = {}) => `<rect x="${f(b.x)}" y="${f(b.y)}" width="${f(b.w)}" height="${f(b.h)}" rx="${f(b.r)}" fill="${o.fill ?? 'none'}"` +
    `${o.stroke ? ` stroke="${o.stroke}" stroke-width="${f(o.w ?? 1)}"` : ''} opacity="${f(o.op ?? 1)}"${o.glow ? ' filter="url(#gfc-soft)"' : ''}/>`;
  const boxAt = (b, z, ty) => ({ x: LX + (b.x - LX) * z, y: ty + (b.y - LY) * z, w: b.w * z, h: b.h * z, r: b.r * z });
  const lerpBox = (a, b, k) => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), w: lerp(a.w, b.w, k), h: lerp(a.h, b.h, k), r: lerp(a.r, b.r, k) });
  const grow = (b, k) => ({ x: b.x + b.w / 2 * (1 - k), y: b.y + b.h / 2 * (1 - k), w: b.w * k, h: b.h * k, r: b.r * k });
  const poly = (P, fill, extra = '') => `<path d="M${P.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')} Z" fill="${fill}"${extra}/>`;
  const pline = (P, op, w = .6, col = '#fff') => op <= .003 ? '' : GFC.polyline(P, { opacity: op, width: w, color: col });
  const glowAt = (x, y, r, op) => op <= .003 ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#gfc-halo)" opacity="${f(op)}"/>`;
  const pill = (w, op) => op <= .003 ? '' :
    `<rect x="${f(LX - w / 2 + 1)}" y="25.5" width="${f(w)}" height="32" rx="16" fill="${GFC.INK}" opacity="${f(.5 * op)}" filter="url(#gfc-soft)"/>` +
    `<rect x="${f(LX - w / 2)}" y="23" width="${f(w)}" height="32" rx="16" fill="#1a0e4a" opacity="${f(.86 * op)}"/>` +
    `<rect x="${f(LX - w / 2)}" y="23" width="${f(w)}" height="32" rx="16" fill="none" stroke="${GOLD}" stroke-width=".9" opacity="${f(.5 * op)}"/>`;
  const SPARK4 = 'M0 -6 Q.9 -.9 6 0 Q.9 .9 0 6 Q-.9 .9 -6 0 Q-.9 -.9 0 -6 Z';   // четырёхлучевая звезда (как блики фона)
  const DEFS = '<defs>' +
    '<linearGradient id="gfcq-body" x1="0" y1="0" x2=".55" y2="1"><stop offset="0" stop-color="#b9b2f4"/><stop offset="1" stop-color="#6458cc"/></linearGradient>' +
    '<linearGradient id="gfcq-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f86e4"/><stop offset="1" stop-color="#5247b0"/></linearGradient>' +
    '<linearGradient id="gfcq-key" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#a49cf0"/><stop offset="1" stop-color="#5d52c2"/></linearGradient>' +
    '<radialGradient id="gfcq-glass" cx=".45" cy=".4" r=".75"><stop offset="0" stop-color="#14205a"/><stop offset="1" stop-color="#060824"/></radialGradient>' +
    '<radialGradient id="gfcq-dark"><stop offset="0" stop-color="#03021a" stop-opacity=".82"/><stop offset=".6" stop-color="#03021a" stop-opacity=".6"/><stop offset="1" stop-color="#03021a" stop-opacity="0"/></radialGradient>' +
    '</defs>';

  let C = null;                                                // неизменяемый кеш точек (строится при первой отрисовке)
  function cache() {
    if (C) return C;
    const text = (x, y) => y > 20 && y < 62 && x > 36 && x < 324;   // полоса шапки и счётчика
    const stars = GFC.cloud(300, 21, [6, 18, 354, 340]).filter(p => !text(p[0], p[1]));
    const born = GFC.cloud(150, 33, [6, 22, 354, 330]).filter(p => !text(p[0], p[1]));
    const people = PEOPLE.map(([x, h, s]) => GFC.personPts(x, FEET, h, 120, s));
    const dust = PEOPLE.map(([x, h, s]) => GFC.cloud(120, s + 40, [x - 28, FEET - h - 28, x + 28, FEET + 6]));
    const combPts = GFC.hexPts(FX, FY, 14, 12, 12).filter(p => Math.hypot(p[0] - FX, p[1] - FY) < 100);
    const keys = [];
    for (let r = 0; r < 3; r++) for (let i = 0; i < 18; i++) {
      const u = (i + .5) / 18, y = 273 + r * 6, sl = (y - 268) / 22;
      keys.push([lerp(lerp(96, 80, sl) + 6, lerp(264, 280, sl) - 6, u), y, H(r * 31 + i * 7 + 1) - .5, H(r * 17 + i * 3 + 5) - .5]);
    }
    C = Object.freeze({ stars, born, people, dust, combPts, keys });
    return C;
  }

  /* плоский цветной компьютер (местные координаты, стекло — отдельно): ex 0..1 — части расходятся («когда-то»),
   * snap 0..1 — вспышка на стыках («собрали») */
  function computer(t, op, on, lamps, ex, snap) {
    if (op <= .003) return '';
    const up = -16 * ex, st = 12 * ex, dn = 24 * ex;
    let s = `<ellipse cx="180" cy="${f(298 + dn)}" rx="150" ry="10" fill="url(#gfc-shadow)"/>`;
    // верх кинескопа
    const top = [[24, 72], [44, 64], [316, 64], [336, 72]];
    s += `<g transform="translate(0 ${f(up)})">` + poly(top, 'url(#gfcq-top)') + poly(top, 'url(#gfc-shade)') + pline([[44, 64.6], [316, 64.6]], .32, .9) + '</g>';
    // корпус со светотенью, посадочная рамка стекла, лампочки
    const bz = grow(BEZ, 1 + .03 * ex);
    s += rrect({ ...bz, x: bz.x + 1.5, y: bz.y + 3.5 }, { fill: GFC.INK, op: .45 });
    s += rrect(bz, { fill: 'url(#gfcq-body)' }) + rrect(bz, { fill: 'url(#gfc-shade)' }) + rrect(bz, { stroke: '#fff', w: .9, op: .3 + .5 * snap });
    s += rrect({ x: SCR.x - 4, y: SCR.y - 4, w: SCR.w + 8, h: SCR.h + 8, r: SCR.r + 3 }, { fill: '#4a3fa6', op: .9 });
    let lm = '';
    for (let i = 0; i < 9; i++) {
      const v = on * lamps * (H(i * 13 + Math.floor(t * 3.3 + i * .37)) > .45 ? 1 : 0), x = 144 + i * 9, c = LAMPC[i % LAMPC.length];
      lm += `<circle cx="${f(x)}" cy="248" r="1.9" fill="#2c2380"/>`;
      if (v > .003) lm += `<circle cx="${f(x)}" cy="248" r="3.8" fill="${c}" opacity="${f(.35 * v)}"/><circle cx="${f(x)}" cy="248" r="1.8" fill="${c}" opacity="${f(v)}"/>`;
    }
    s += lm;
    // ножка
    s += `<g transform="translate(0 ${f(st)})">` + poly([[164, 252], [196, 252], [203, 263], [157, 263]], '#5247b0') +
      rrect({ x: 136, y: 261.5, w: 88, h: 5, r: 2.5 }, { fill: '#7a70d8' }) + '</g>';
    // клавиатура (клавиши в разобранном виде разлетаются)
    const kb = [[96, 268], [264, 268], [280, 290], [80, 290]];
    let keys = '';
    for (const [x, y, a, b] of C.keys) keys += `<rect x="${f(x - 3.5 + 12 * a * ex)}" y="${f(y - 1.6 + 10 * b * ex)}" width="7" height="3.2" rx=".9"/>`;
    s += `<g transform="translate(0 ${f(dn)})">` + poly(kb.map(([x, y]) => [x + 1.5, y + 3]), GFC.INK, ' opacity=".4"') +
      poly(kb, 'url(#gfcq-key)') + poly(kb, 'url(#gfc-shade)') + `<g fill="#e6e2ff" opacity=".66">${keys}</g></g>`;
    if (snap > .003) s += glowAt(180, 252, 40, snap) + glowAt(180, 266, 40, snap) + glowAt(24, 72, 32, snap) + glowAt(336, 72, 32, snap) + glowAt(88, 279, 30, snap) + glowAt(272, 279, 30, snap);
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // слова строки печатаются каждое со своего слова речи: list [[слово, t0], …]; слово, за которым уже началось
  // следующее, — целиком; курсор — после последней буквы
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
    let r = GFC.mono(x, y, s, { size: QS, ls: QLS, anchor: 'start', opacity: .97, color: PH, glow: o.glow });
    if (typing && Math.floor(t * 3) % 2 === 0) r += `<rect x="${f(x + GFC.textW(s, QS, QS * QLS) + 2)}" y="${f(y - 14)}" width="9" height="16" rx="1.5" fill="${PH}" opacity=".9"/>`;
    return r;
  }

  function body(t, K) {
    const W = (id, stem, n = 0) => GFC.w(K, id, stem, n), WE = (id, stem, n = 0) => GFC.we(K, id, stem, n);
    const a = 'b04', b = 'b05', c = 'b06';                       // ask, light, creator (story.py: b06 — часть b05 с «А»)
    const T4 = GFC.T(K, a), E4 = GFC.TE(K, a), T6 = GFC.T(K, c);
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
    let s = DEFS;

    // --- камера: вход .78; «показал» → «рассказе» — наезд до 1; «мир» → «гаснут» — отъезд до .64, центр экрана 162 → 152;
    // b06 «А» → «компьютер» — снова наезд до .92 (в тёмном мире крупно один компьютер)
    const zOut = GFC.qq(t, tMir, tOut + 1.0);
    const z = lerp(Z0, 1, GFC.qq(t, tShow, tRas + .4)) * lerp(1, Z2, zOut) * lerp(1, Z3 / Z2, GFC.qq(t, T6, tKomp + .4)), ty = lerp(LY, FY, zOut);

    // --- звёзды (кадр): мерцают; «остывает» — голубеют и тускнеют; «рассыпается» — разлетаются; «гаснут» → b06 «конце» — гаснут по одной
    const spr = u => 1 + .3 * GFC.qq(u, tRsp - .2, E4 + .6) + .06 * GFC.qq(u, GFC.T(K, b), tKon6 + .5);
    const cool = GFC.qq(t, tCool, tRsp + .3), spread = spr(t), back = spr(t - .3);
    const SP = [], SA = [], SR = [], SC = [];
    let strails = '', big = '';
    const sOp = GFC.q(t, T4 - .4, .5);
    P.stars.forEach((p, i) => {
      const isBig = H(i * 3 + 1) > .86, td = tOut + .1 + H(i * 7 + 3) * Math.max(.5, tKon6 - tOut - .2);
      const life = GFC.out(t, td, .35);
      if (life <= .003) return;
      const flare = GFC.q(t, td - .25, .25) * life;              // каждая вспыхивает напоследок, крупные — ярче
      const dx = p[0] - FX, dy = p[1] - 157;
      const x = FX + dx * spread + (cool > 0 ? 3 * cool * Math.sin(t * 1.4 + i) : 0), y = 157 + dy * spread + (cool > 0 ? 2.4 * cool * Math.cos(t * 1.2 + i * .7) : 0);
      const al = (isBig ? 1 : .5 + .45 * H(i * 5 + 2)) * (1 - .35 * cool) * life + (isBig ? .5 : .4) * flare;
      const base = STARC[Math.floor(H(i * 7.31 + 2) * STARC.length) % STARC.length], col = cool > .01 ? GFC.mixC(base, '#7f9cff', .8 * cool) : base;
      const sz = (isBig ? 1.8 : .8 + .7 * H(i * 11 + 4)) * (1 - .15 * cool) * (1 + (isBig ? 1.4 : 1.1) * flare);
      if (spread - back > .02) strails += pline([[FX + dx * back, 157 + dy * back], [x, y]], Math.min(.6, 7 * (spread - back)) * al, .8, '#9fc0ff');
      if (isBig) {
        const tw = .75 + .25 * Math.sin(t * 1.9 + i * 2.3);
        big += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(3.8 * sz)}" fill="${col}" opacity="${f(.24 * al * sOp)}"/>` +
          `<path d="${SPARK4}" fill="${col}" transform="translate(${f(x)} ${f(y)}) scale(${f(.85 * sz * tw)})" opacity="${f(Math.min(1, al) * sOp)}"/>`;
      } else { SP.push([x, y]); SA.push(al); SR.push(sz); SC.push(col); }
    });
    s += strails + GFC.dots(SP, { r: 1.4, op: sOp, glow: .55, t, alpha: i => SA[i], size: i => SR[i], color: i => SC[i] }) + big;

    // --- новые звёзды рождаются из света (b06 «свет»), со следами, тёплые
    const NB = [], NA = [], NC = [];
    let trails = '';
    P.born.forEach((p, i) => {
      const tb = tLight - .05 + H(i * 5 + 2) * .9, u = GFC.q(t, tb, 1.4);
      if (u <= .002) return;
      const e = easeOut(u), e0 = easeOut(Math.max(0, u - .12));
      const x = lerp(FX, p[0], e), y = lerp(FY, p[1], e), col = BORNC[Math.floor(H(i * 3.7 + 5) * BORNC.length) % BORNC.length];
      NB.push([x, y]); NA.push(.4 + .6 * u); NC.push(col);
      if (u < .98) trails += pline([[lerp(FX, p[0], e0), lerp(FY, p[1], e0)], [x, y]], .45 * (1 - u), .7, col);
    });
    s += trails + GFC.dots(NB, { r: 1.2, op: 1, glow: .6, t, alpha: i => NA[i], size: i => .7 + .8 * H(i * 9 + 1), color: i => NC[i] });

    // --- мягкий тёплый свет от огня (b06 «свет»)
    const qL = GFC.qq(t, tLight - .1, tLightE + .4);
    if (qL > .003) s += `<circle cx="${FX}" cy="${FY}" r="${f(20 + 125 * qL)}" fill="url(#gfc-halo)" opacity="${f(.95 * qL)}"/>`;

    // --- корпус и люди (местные координаты, под наездом)
    const on = GFC.q(t, tShow + .2, .35);
    const rate = 9 * (1 + GFC.q(t, tNah, .3));                                   // «находит» — квадраты быстрее
    const think = GFC.q(t, tKomp, .3) * GFC.out(t, tAnsw, .2);
    const found = GFC.q(t, tAnsw, .1) * GFC.out(t, tAnsw + .25, .45);
    const memo = GFC.q(t, tKog - .1, .3) * (1 - GFC.q(t, tSob + .5, .6));       // «когда-то собрали» — корпус снова виден
    const ex = GFC.q(t, tKog, .3) * (1 - GFC.q(t, tSob, .25));
    const snap = GFC.q(t, tSob + .2, .1) * (1 - GFC.q(t, tSob + .3, .5));
    const frameOp = (1 - .55 * GFC.q(t, T6, .8) * (1 - memo)) * GFC.out(t, tSam, Math.max(.4, tSt - tSam + .2));
    let loc = computer(t, frameOp, on, Math.min(1, 1 - .7 * GFC.q(t, T6, .6) + .7 * think + found), ex, snap);
    // люди: собираются из цветных точек («люди»), нити к экрану («спрашивают»), тают («исчезают» → «люди»); дальше их нет
    const melt = GFC.qq(t, tIs, tLy5 + .5), gather = GFC.qq(t, tPpl - .1, tPpl + .8);
    const solid = GFC.q(t, tPpl + .35, .55) * GFC.out(t, tIs, .45);
    if (gather > .003 && melt < .997) {
      const ask = GFC.q(t, tAsk, .4) * (1 - melt);
      PEOPLE.forEach(([x, h, sd, col], k) => {
        const pal = GFC.PAL[col];
        loc += GFC.person(x, FEET, h, { color: col, t, seed: k + 1, opacity: solid });
        const dotOp = Math.max((.5 + .45 * gather) * (1 - GFC.q(t, tPpl + .35, .55)), .95 * GFC.q(t, tIs, .25)) * (1 - melt);
        if (dotOp > .003) {
          let Q = GFC.morph(P.dust[k], P.people[k], gather, t, { amp: 3, seed: k + 2 });
          if (melt > 0) Q = Q.map((q, i) => [q[0] + (H(i * 3 + k) - .5) * 30 * melt, q[1] - (10 + 34 * H(i * 7 + k)) * melt]);
          loc += GFC.dots(Q, { r: 1.25, op: dotOp, glow: .5, t, color: [pal[0], pal[1], pal[0]] });
        }
        if (ask > .003) {
          const hd = head(k), to = CORNER(k);
          loc += pline([hd, to], .6 * ask, 1.2, SKY);
          const u = ((t - tAsk) * .9 + k * .27) % 1;
          if (t > tAsk) {
            const x2 = lerp(hd[0], to[0], u), y2 = lerp(hd[1], to[1], u);
            loc += `<circle cx="${f(x2)}" cy="${f(y2)}" r="4.6" fill="${SKY}" opacity="${f(.4 * ask)}"/><circle cx="${f(x2)}" cy="${f(y2)}" r="1.9" fill="#fff" opacity="${f(ask)}"/>`;
          }
        }
      });
    }
    s += GFC.zoom(loc, LX, LY, z, LX, ty);

    // --- стекло (кадр): под наездом; «становится» → конец «Творцом» — сжимается до бледной рамки FIN и растворяется в соты
    const zb = boxAt(SCR, z, ty), shrink = GFC.qq(t, tSt, tTvE), box = lerpBox(zb, FIN, shrink);
    const scrOp = 1 - .6 * shrink, inScr = GFC.q(t, tSt, .7);
    const edge = shrink > .003 ? GFC.mixC(TEAL, '#f1ecff', shrink) : TEAL;
    s += rrect(box, { fill: 'url(#gfcq-glass)', op: .97 * (1 - inScr) });
    s += rrect(box, { stroke: edge, w: 3.4, op: (.1 + .3 * on) * scrOp, glow: true }) + rrect(box, { stroke: edge, w: lerp(1.4, .9, shrink), op: (.45 + .55 * on) * scrOp });
    const ansFl = GFC.q(t, tAns, .08) * (1 - GFC.q(t, tAns + .12, .5));
    const glowOn = GFC.q(t, tAnsw, .3) * (1 - GFC.q(t, tSt, .8));                     // найденный ответ — экран светится
    const fillA = .06 * on * (1 - shrink) + .55 * found + .14 * glowOn + .22 * ansFl;
    if (fillA > .003) s += rrect(box, { fill: `rgba(214,255,246,${f(fillA)})` });
    const wv = GFC.qq(t, tAnsw, tAnsw + 1.1);                                          // «ответ» — золотая волна от рамки
    if (wv > .003 && wv < 1) s += rrect(grow(box, 1 + .45 * wv), { stroke: GOLD, w: 1.4, op: .65 * (1 - wv) });
    // содержимое экрана — в местных координатах стекла (SCR), масштаб по ширине рамки
    let scr = '';
    if (on < .02) scr += pline([[SCR.x + 30, SCR.y + 120], [SCR.x + 110, SCR.y + 24]], .16, 2) + pline([[SCR.x + 56, SCR.y + 130], [SCR.x + 126, SCR.y + 44]], .09, 1.4);
    const p1 = GFC.q(t, tShow, .22), p2 = GFC.q(t, tShow + .18, .3);                  // включение ЭЛТ: полоса раскрывается
    if (p1 > .003 && p2 < .997) {
      const hw = 146 * p1, hh = 1.5 + 76 * p2;
      scr += `<rect x="${f(LX - hw)}" y="${f(LY - hh)}" width="${f(2 * hw)}" height="${f(2 * hh)}" rx="${f(Math.min(10, hh))}" fill="#e6fff9" opacity="${f(.7 * (1 - p2) + .05)}"/>`;
    }
    const live = on * (1 - GFC.q(t, tSt, .6));
    if (live > .003) {
      let sl = '';
      for (let y = SCR.y + 5; y < SCR.y + SCR.h - 3; y += 5) sl += `<line x1="${SCR.x + 6}" x2="${SCR.x + SCR.w - 6}" y1="${y}" y2="${y}"/>`;
      const by = SCR.y + 3 + ((t * 40) % (SCR.h - 14));
      scr += `<g stroke="${PH}" stroke-width=".55" opacity="${f(.08 * live)}">${sl}</g>`;
      scr += `<rect x="${SCR.x + 4}" y="${f(by)}" width="${SCR.w - 8}" height="9" fill="${PH}" opacity="${f(.06 * live)}"/>`;
    }
    const clr = GFC.out(t, tKon6, .5);                                                  // b06 «конце» — экран стирается
    const cur = (x, y, op) => op <= .003 || Math.floor(t * 2.6) % 2 ? '' : `<rect x="${f(x)}" y="${f(y - 14)}" width="9" height="16" rx="1.5" fill="${PH}" opacity="${f(op)}"/>`;
    // «рассказе» — строки рукописи (штрихи-слова), стираются к «вопрос»
    const ms = GFC.q(t, tRas, .25) * GFC.out(t, tVop - .1, .3);
    if (ms > .003) {
      let r = '';
      for (let j = 0; j < 5; j++) {
        const y = SCR.y + 28 + j * 24, len = [252, 262, 238, 256, 140][j], u = lin(t, tRas + j * .15, tRas + j * .15 + .3);
        for (let x = 0, n = 0; x < len * u; n++) {
          const wd = Math.min(12 + 24 * H(j * 31 + n * 7 + 1), len * u - x);
          r += `<rect x="${f(SCR.x + 18 + x)}" y="${f(y - 2.3)}" width="${f(wd)}" height="4.6" rx="2.3"/>`;
          x += wd + 8;
        }
      }
      scr += `<g fill="${PH}" opacity="${f(.75 * ms)}">${r}</g>`;
    }
    const qMark = GFC.q(t, tVop, .35) * GFC.out(t, tTr, .45);
    if (qMark > .003) scr += `<g opacity="${f(qMark)}">${GFC.mono(LX, LY + 34, '?', { size: 96, anchor: 'middle', opacity: 1, glow: true, color: GOLD, ls: 0 })}</g>`;
    // «спрашивают» — приглашение «>»; вопрос — по словам речи; ответ — крупно золотом, со вспышкой экрана
    const QX = SCR.x + 40, Q1 = SCR.y + 40, Q2 = SCR.y + 66;
    if (on > .5 && t > tTr && t < tAsk && clr > .003) scr += cur(SCR.x + 14, Q1, .85);
    if (t >= tAsk && clr > .003) {
      scr += `<g opacity="${f(clr)}">` + GFC.mono(SCR.x + 14, Q1, '>', { size: QS, ls: 0, anchor: 'start', opacity: .97, color: PH }) + (t < tMoz ? cur(QX, Q1, .85) : '') +
        words(QX, Q1, [['МОЖНО', tMoz], ['ЛИ', tLi], ['ОБРАТИТЬ', tObr]], t) +
        (t >= tVsp ? words(QX, Q2, [['ВСПЯТЬ', tVsp], ['ЭНТРОПИЮ?', tEnt]], t) : '');
      const ao = .9 + .1 * Math.sin(t * 6), A1 = 'НЕДОСТАТОЧНО', A2 = 'ДАННЫХ';
      scr += GFC.typed(LX, SCR.y + 108, A1, t, tAns, { size: AS, cps: 32, glow: true, op: ao, color: GOLD, ls: .03 }) +
        GFC.typed(LX, SCR.y + 136, A2, t, tAns + A1.length / 32 + .05, { size: AS, cps: 32, glow: true, op: ao, color: GOLD, ls: .03 }) + '</g>';
    }
    // b06 «компьютер» — экран «думает»: бегут квадраты; «ответ» — вспыхивают золотом разом
    const sqOp = Math.max(think, found);
    if (sqOp > .003) {
      let sq = '';
      const kq = Math.floor((t - tKomp) * rate) % 14;
      for (let i = 0; i < 13; i++) {
        const v = Math.max((i === kq || i === (kq + 13) % 14 ? .95 : .22) * think, .95 * found);
        sq += `<rect x="${f(LX - 126 + i * 20)}" y="${LY - 6}" width="12" height="12" rx="2" fill="${found > think ? GOLD : PH}" opacity="${f(v)}"/>`;
      }
      scr += sq + cur(SCR.x + 14, Q1, .7 * think);
    }
    if (scr) s += GFC.zoom(scr, LX, LY, box.w / SCR.w, box.x + box.w / 2, box.y + box.h / 2);

    // --- начало b04: огонь из вершины древа gfc_omega опускается в тёмный экран и меркнет
    const dive = GFC.qq(t, T4 + .15, tKon4);
    const fOp = (1 - .55 * dive) * GFC.out(t, tShow, .3);
    if (fOp > .003) s += GFC.spark(LX, lerp(OMY, ty, dive), OMR * (1 - .5 * dive), { t, op: fOp });
    const w4 = GFC.qq(t, tKon4, tKon4 + 1);
    if (w4 > .003 && w4 < 1 && t < tShow + .3) s += `<circle cx="${LX}" cy="${f(ty)}" r="${f(10 + 50 * w4)}" fill="none" stroke="${GOLD}" stroke-width="1.3" opacity="${f(.7 * (1 - w4))}"/>`;

    // --- экран растворяется в соты («становится»): сначала ячейки внутри экрана, потом волна наружу до радиуса 100
    const flash = GFC.q(t, tTv, .35) * (1 - .6 * GFC.q(t, tTv + .4, .8));
    const zb0 = boxAt(SCR, Z3, FY);
    const outside = (x, y) => Math.hypot(Math.max(0, Math.abs(x - FX) - zb0.w / 2), Math.max(0, Math.abs(y - FY) - zb0.h / 2));
    const litC = (x, y) => {
      const d = Math.hypot(x - FX, y - FY);
      if (d > 100) return 0;
      const t0 = tSt - .05 + H(Math.round(x * 3 + y * 7)) * .25 + clamp(outside(x, y) / 50) * .7;
      return GFC.q(t, t0, .4) * (1 - .4 * d / 100) * (.85 + .15 * Math.sin(t * 2 + d * .1)) + .35 * flash * (1 - d / 100);
    };
    if (t > tSt - .1) {
      if (flash > .003) s += `<circle cx="${FX}" cy="${FY}" r="118" fill="url(#gfc-halo)" opacity="${f(.85 * flash)}"/>`;
      s += GFC.comb(FX, FY, 14, 12, 12, { lit: (i, x, y) => litC(x, y), w: .55, grid: .2 + .3 * flash });
      const CA = P.combPts.map(p => litC(p[0], p[1]));
      s += GFC.dots(P.combPts, { r: .9, op: .7 + .3 * flash, glow: .5, t, alpha: i => CA[i], color: '#fff3c4' });
    }
    // сжимающаяся бледная рамка экрана — поверх сот (как screen() у gfc_globe/mind поверх его сот)
    if (shrink > .003) s += rrect(box, { stroke: edge, w: lerp(1.4, .9, shrink), op: (.45 + .55 * on) * scrOp * shrink });
    // --- огонь порядка в центре экрана (b06 «становится»)
    const fire = GFC.q(t, tSt + .1, .7);
    s += GFC.spark(FX, FY, FR * (.3 + .7 * fire) * (1 + .12 * flash), { t, op: fire });

    // --- тьма (b05 «гаснут» → b06, светится только экран) — мягкая виньетка гасит и звёзды фона; уходит со «свет»
    // (эллипс гаснет к краям сцены: в безопасной зоне вокруг сцены виден фон словаря — шва быть не должно)
    const dark = Math.min(1, .55 * GFC.qq(t, tOut, tKon6) + .45 * GFC.q(t, T6, .8)) * (1 - GFC.qq(t, tLight - .1, tLightE + .4));
    let out = dark > .003 ? `<ellipse cx="180" cy="185" rx="180" ry="205" fill="url(#gfcq-dark)" opacity="${f(dark)}"/>` : '';
    out += s;

    // --- вверху (кадр): шапка-источник → счётчик лет → «ДА БУДЕТ СВЕТ»
    const hOp = GFC.out(t, tTr, .45);
    if (t >= tAj && hOp > .003) {
      const u = GFC.q(t, tAj, .7), yf = GFC.q(t, tYear, .15) * (1 - GFC.q(t, tYear + .3, .8));
      const L2A = '«ПОСЛЕДНИЙ ВОПРОС»', L2B = ' · 1956', s2 = GFC.fs(12), l2 = s2 * .04;
      const wA = GFC.textW(L2A, s2, l2), x2 = LX - (wA + GFC.textW(L2B, s2, l2)) / 2;
      out += `<g opacity="${f(hOp)}">` + GFC.typed(LX, 38, 'АЙЗЕК АЗИМОВ', t, tAj, { size: 18, cps: 24, glow: true, ls: .04 }) +
        `<rect x="${f(LX - 92 * u)}" y="43.6" width="${f(184 * u)}" height="1.4" rx=".7" fill="url(#gfc-uline)"/>` +
        GFC.typed(x2, 58, L2A, t, tPos, { size: 12, cps: 34, anchor: 'start', op: .95, color: WARM, ls: .04 }) +
        GFC.typed(x2 + wA, 58, L2B, t, tYear, { size: 12, cps: 20, anchor: 'start', op: .95, color: yf > .2 ? GOLD : WARM, glow: yf > .2, ls: .04 }) +
        glowAt(x2 + wA + 22, 53, 28, .85 * yf) + '</g>';
    }
    // счётчик: «триллионы» — ГОД 2061 (первый вопрос у Азимова), бежит до ≈ 10¹³ к «гаснут» и дальше; гаснет на b06 «конце»
    const cOp = GFC.q(t, tTr + .15, .35) * GFC.out(t, tKon6, .6);
    if (cOp > .003) {
      const k = 13 * Math.pow(lin(t, tTr + .15, tOut), 1.4) + 1.2 * lin(t, tOut, tKon6);
      const v = 2060 + Math.floor(Math.pow(10, k) + 1e-6), n = v < 1e4 ? String(v) : v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      const str = 'ГОД ' + n;
      out += pill(GFC.textW(str, 20, 20 * .04) + 30, cOp) + GFC.mono(LX, 46, str, { size: 20, ls: .04, anchor: 'middle', opacity: cOp, glow: true, color: GOLD });
    }
    const da = GFC.q(t, tDa - .05, .2);
    if (da > .003) out += pill(GFC.textW('ДА БУДЕТ СВЕТ', 20, 20 * .08) + 34, da) + GFC.typed(LX, 46, 'ДА БУДЕТ СВЕТ', t, tDa, { size: 20, cps: 16, glow: true, color: GOLD, ls: .08 });
    return out;
  }

  SCENES.gfc_lastq = GFC.scene('gfc_lastq', (t, K, mode, p) => body(t, K, mode, p));
})();
