/* gf_tea — «Бог ещё не создан», часть 1 (eps/god_future_p1): фразы a01 (hook) и a02 (cool). v3, 05.11 (озвучка v14,
 * текст v15; второй проход по слепому просмотру v1: eps/god_future/qa/blind_view_v1/summary.md — Л1 к1–2, к4–8).
 * Раскадровка — eps/god_future/source/storyboard.md; словарь — gf_00_lib.js (window.GF); человек из точек — свой
 * figure() по пропорциям GF.personPts (руки могут держать чашку). Лиц, портретов, богов нет. Красного нет.
 * На телефоне сцена ужата в .72 (story.safe), поэтому всё крупно: линии ≥ 1,1, точки ≥ 1, слова моно 24–27.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (hook и cool рисует одно
 * и то же тело), поэтому между режимами шва нет. Все события — от слов: GF.w(K, id, основа); секунд нет. Нет слова в
 * озвучке — запасное время от соседнего слова (а не начало фразы).
 *
 *  hook (a01)  ПЕРВЫЙ КАДР РОЛИКА (t=0, без наплыва): ночь, звёзды; круг из 7 людей из точек (рост 96…146) у большого
 *              костра (поленья, три языка пламени в три слоя, тёплый свет на земле, искры), над ними огонь порядка
 *              с лучами (fire(): GF.spark + 12 лучей; тот же огонь gf_body ставит над головой на «Ответ» — рифма),
 *              от него нити к голове каждого, по нитям бегут огоньки. Текст: «Зачем людям боги? Начнём, как ни
 *              странно, с чашки чая.» Основы: «бог» — огонь вспыхивает, лучи вытягиваются, по нитям сбегает огонёк;
 *              «начн» — медленный наезд (×1,22); «странн» — огоньки поднимаются к огню, чашка в руках переднего справа
 *              обводится светящимся кольцом; «чашк» — быстрый наезд в чашку (за 0,9 с), огонь уходит вверх,
 *              люди и костёр уходят за кадр, остаются чашка крупно и две ладони.
 *  cool (a02)  Чашка крупно (180,212, ширина 116), пар и тёплый чай. Коробки-комнаты и шкалы нет. Частицы тепла —
 *              900 точек тумана: летят из чашки крупными тёплыми (r ≈ 3) и садятся белыми (r 1,45); первыми — к краям.
 *              «остыва» — первые частицы, чай и пар начинают остывать; «тепло» — от чашки расходится тёплое кольцо;
 *              «расход» — залп частиц к краям; «комнат» — отъезд: чашка меньше (180,252, ширина 74), ладони отпускают,
 *              под ней еле видная линия стола; «назад» — рывок: все частицы на миг летят назад к чашке со следами,
 *              к чашке сжимается кольцо; «собер» — и тут же разлетаются обратно; «беспоряд» — над частицами крупное
 *              слово БЕСПОРЯДОК (моно 24): буквы слетаются из облака и стоят вразброс; «рассеива» — второй залп,
 *              буквы расходятся сильнее; «перемеш» — вихрь: облако закручивается вокруг центра (поворот до 1,15 рад,
 *              остаётся), буквы кружат; «физик» — буквы встают ровно в рамку-термин; «энтроп» — буквы по одной
 *              переворачиваются в ЭНТРОПИЯ (моно 27), вспышка; «сам» (2-е, «Сам собой») — справа стрелка ↑, чашка
 *              тускнеет; третий залп заполняет пустоту вокруг чашки; «растет» — частицы заполняют весь кадр,
 *              стрелка вырастает.
 *  Выход: туман и ЭНТРОПИЯ ↑ стоят. Туман — SCENES.gf_tea.fog.pts(t, K): те же 900 точек в тех же местах (с вихрем)
 *  берёт gf_body (a03) и собирает из них человека, поэтому наплыв в gf_body без скачка. Огонь с лучами —
 *  SCENES.gf_tea.fire(x, y, r, t, op, boost) (его же рисует gf_body).
 * Слова: a01 — бог, начн, странн, чашк; a02 — остыва, тепло, расход, комнат, назад, собер, беспоряд, рассеива,
 *   перемеш, физик, энтроп, сам (n=1: «Сам собой», не «само назад»), только, растет. Все есть в K.words озвучки v14
 *   (текст a02 в v15 тот же; сверено 05.11).
 * Кадр: всё важное в y=20..352. Пик ≈ 5 тыс. элементов (люди у костра; туман со свечением).
 * Проверка: eps/god_future_p1/qa/gf_tea_v3*.jpg (станция tesla, render.py --at … --sheet).
 * Параметры p: s, mode, K (cues.json), prev/prev_mode — их разбирает GF.scene.
 */
(() => {
  const TAU = Math.PI * 2;
  const f = v => Number(v).toFixed(2);
  const H = n => GF.hash(n);
  const frac = x => x - Math.floor(x);
  const pulse = (t, a, up, down) => GF.qq(t, a, a + up) * (1 - GF.qq(t, a + up, a + up + down));
  const bez = (a, b, c, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * b[0] + u * u * c[0], v * v * a[1] + 2 * v * u * b[1] + u * u * c[1]]; };
  const cache = {};
  const WARM = '#ffb35c';
  const DEFS = `<defs><radialGradient id="gft-glow"><stop stop-color="#ffbe6a" stop-opacity=".62"/><stop offset=".4" stop-color="#ff9e45" stop-opacity=".22"/><stop offset="1" stop-color="#ff9e45" stop-opacity="0"/></radialGradient></defs>`;

  /* ---------------- слова ---------------- */
  // есть ли слово в озвучке: GF.w без слова даёт начало фразы, здесь вместо этого — запасное время от соседнего слова
  const has = (K, id, s, n = 0) => ((K && K.words && K.words[id]) || []).filter(w => GF.bare(w.w).startsWith(GF.bare(s))).length > n;
  const wd = (K, id, s, n, alt) => has(K, id, s, n) ? GF.w(K, id, s, n) : alt;
  function cues(K) {
    const c = { K, a1: GF.T(K, 'a01'), a1e: GF.TE(K, 'a01'), a2: GF.T(K, 'a02'), a2e: GF.TE(K, 'a02') };
    const A = (s, alt, n = 0) => wd(K, 'a01', s, n, alt), B = (s, alt, n = 0) => wd(K, 'a02', s, n, alt);
    // a01: «Зачем людям боги? Начнём, как ни странно, с чашки чая.»
    c.bogi = A('бог', c.a1 + .6); c.nach = A('начн', c.bogi + .8); c.strann = A('странн', c.nach + .8); c.chash = A('чашк', c.strann + .6);
    c.up = c.chash - .12;                       // огонь уходит вверх вместе с наездом на чашку
    // a02 (v14/v15): «Чай остывает: тепло расходится по комнате и само назад не соберётся. Это и есть беспорядок —
    //   всё рассеивается и перемешивается. Физики называют его энтропией. Сам собой он только растёт.»
    c.ost = B('остыва', c.a2 + .25); c.teplo = B('тепло', c.ost + .8); c.rash = B('расход', c.teplo + .45);
    c.komn = B('комнат', c.rash + .6); c.nazad = B('назад', c.komn + .8); c.sober = B('собер', c.nazad + .45);
    c.bespor = B('беспоряд', c.sober + 1.4); c.rasse = B('рассеива', c.bespor + .95); c.mix = B('перемеш', c.rasse + .85);
    c.fiz = B('физик', c.mix + 1.0); c.entr = B('энтроп', c.fiz + .95); c.sam = B('сам', c.entr + .9, 1);
    c.tolko = B('только', c.sam + .9); c.rast = B('растет', c.tolko + .3);
    return c;
  }

  /* ---------------- огонь порядка с лучами (общий с gf_body: рифма первого кадра и «Ответ… к богам») ---------------- */
  function fire(x, y, r, t, op = 1, boost = 0, ymin = -1e9) {
    if (op <= .003) return '';
    const n = 12, rot = t * .12;
    let tri = '';
    for (let k = 0; k < n; k++) {
      const a = rot + k / n * TAU, lg = k % 2 ? .6 : 1, ca = Math.cos(a), sa = Math.sin(a);
      const r0 = r * 1.22, w = r * (.11 + .06 * lg);
      let L = r * (1.0 + 1.9 * lg) * (1 + .08 * Math.sin(t * 2.3 + k * 1.7)) * (1 + .45 * boost);
      if (sa < -.05) L = Math.max(r * .5, Math.min(L, (y - ymin) / -sa - r0));
      const b = [x + ca * r0, y + sa * r0], e = [x + ca * (r0 + L), y + sa * (r0 + L)];
      tri += `M${f(b[0] - sa * w)} ${f(b[1] + ca * w)}L${f(e[0])} ${f(e[1])}L${f(b[0] + sa * w)} ${f(b[1] - ca * w)}Z`;
    }
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 3.4 * (1 + .3 * boost))}" fill="url(#gf-warm)" opacity=".95"/>` +
      `<path d="${tri}" fill="#fff1d2" opacity="${f(.45 + .3 * boost)}" filter="url(#un-soft)"/><path d="${tri}" fill="#fff8ea" opacity=".85"/></g>` +
      GF.spark(x, y, r * (1 + .15 * boost), { t, op });
  }

  /* ---------------- человек из точек (как GF.personPts; hold 0..1 — руки держат чашку у пояса) ---------------- */
  function figure(cx, gy, h, n, seed, hold = 0) {
    const P = [], s = h / 100;
    for (let i = 0; i < n; i++) {
      const a = H(seed * 31 + i * 1.7), b = H(seed * 53 + i * 2.9), c = H(seed * 71 + i * 4.3);
      let x, y;
      if (i < n * .14) { const r = 7.2 * Math.sqrt(a), th = b * TAU; x = r * Math.cos(th); y = -91 + r * 1.12 * Math.sin(th); }
      else if (i < n * .5) { y = -80 + a * 34; const wd2 = 10.5 - Math.abs(y + 66) * .05; x = (b * 2 - 1) * wd2; }
      else if (i < n * .72) {
        const side = c < .5 ? -1 : 1, u = a;
        const xh = side * (11 + u * 6.5) + (b - .5) * 2.6, yh = -78 + u * 31 + (b - .5) * 2;
        let xb, yb;
        if (u < .5) { const v = u / .5; xb = side * (11.5 + 3.5 * v); yb = -78 + 15 * v; }
        else { const v = (u - .5) / .5; xb = side * (15 - 10.5 * v); yb = -63 + 3 * v; }
        xb += (b - .5) * 2.4; yb += (b - .5) * 2.2;
        x = GF.lerp(xh, xb, hold); y = GF.lerp(yh, yb, hold);
      } else { const side = c < .5 ? -1 : 1, u = a; x = side * (3.2 + u * 2.6) + (b - .5) * 3.4; y = -46 + u * 46; }
      P.push([cx + x * s, gy + y * s]);
    }
    return P;
  }

  /* ---------------- мир a01: круг у костра ---------------- */
  // 7 человек по кругу (углы подобраны: никто никого не закрывает), задний центральный — за костром; HOLDER — передний справа
  // v3: люди крупнее и ярче (рост 96…146), костёр большой — слепой просмотр v1: «костёр на к1–2 не виден»
  // v22 (слепой просмотр части 1: «первый кадр тёмный и мелкий»): круг чуть площе и уже, весь мир крупнее (PRE ×1,15),
  // огонь порядка — в кадре на y≈50 (мир 78), лучи не выходят за верх сцены
  const RING = { cx: 180, cy: 256, rx: 128, ry: 58 }, FIRE = [180, 260], SPARK = [180, 78], SPARK_R = 12, HOLDER = 6;
  const PRE = { z: 1.15, x: 180, y: 266 };
  const ANG = [270, 235, 305, 170, 10, 120, 60];
  function people() {
    if (cache.people) return cache.people;
    const L = [];
    for (let k = 0; k < ANG.length; k++) {
      const a = ANG[k] * Math.PI / 180, sn = Math.sin(a), d = (sn + 1) / 2;
      const x = RING.cx + RING.rx * Math.cos(a), gy = RING.cy + RING.ry * sn, h = 96 + 50 * d;
      L.push({ k, x, gy, h, front: gy > FIRE[1], head: [x, gy - .99 * h],
        pts: figure(x, gy, h, Math.round(240 + 170 * d), 3 + k, k === HOLDER ? 1 : 0) });
    }
    L.sort((p, q) => p.gy - q.gy);
    return (cache.people = L);
  }
  // чашка в руках держателя: центр тела чашки и ширина (мир a01)
  function cupWorld() {
    if (cache.cupW) return cache.cupW;
    const p = people().find(q => q.k === HOLDER), s = p.h / 100;
    return (cache.cupW = { x: p.x, y: p.gy - 60 * s, w: 9 * s });
  }
  const stars = () => cache.stars || (cache.stars = Array.from({ length: 52 }, (_, i) => [8 + 344 * H(i * 3 + 900), 12 + 150 * Math.pow(H(i * 7 + 901), 1.3)]));
  const ringPts = () => cache.ring || (cache.ring = Array.from({ length: 120 }, (_, i) => {
    const a = i / 120 * TAU + H(i + 950) * .05, k = .55 + .5 * Math.sqrt(H(i + 951));
    return [RING.cx + RING.rx * k * Math.cos(a), RING.cy + 4 + RING.ry * k * Math.sin(a)];
  }));

  /* ---------------- камера: наезд на чашку на «чашки» (a01), отъезд на «комнате» (a02) ---------------- */
  const CUP0 = { x: 180, y: 212, w: 116 }, CUP1 = { x: 180, y: 252, w: 74 };
  // v22: с первого кадра мир ×PRE.z вокруг (PRE.x, PRE.y); медленный наезд «начн» — ещё ×1,1 (было ×1,22 от ×1)
  function cam(t, c) {
    const cw = cupWorld(), cx0 = PRE.x + (cw.x - PRE.x) * PRE.z, cy0 = PRE.y + (cw.y - PRE.y) * PRE.z;
    const zIn = Math.log(PRE.z) + Math.log(1.1) * GF.qq(t, c.nach, c.chash);
    const z0 = c.chash - .1, z1 = c.chash + .8;
    const E = GF.ease((t - z0) / (z1 - z0));
    const lz = zIn + (Math.log(CUP0.w / cw.w) - zIn) * E, Z = Math.exp(lz);
    const tx = GF.lerp(cx0, CUP0.x, E), ty = GF.lerp(cy0, CUP0.y, E);
    return { Z, lz, E, P: p => [tx + (p[0] - cw.x) * Z, ty + (p[1] - cw.y) * Z] };
  }
  function cupAt(t, c, C) {
    const cw = cupWorld(), p = C.P([cw.x, cw.y]);
    let x = p[0], y = p[1], wd2 = cw.w * C.Z;
    const b = GF.qq(t, c.komn - .1, c.komn + 1.2);
    if (b > 0) { x = GF.lerp(x, CUP1.x, b); y = GF.lerp(y, CUP1.y, b); wd2 = wd2 * Math.pow(CUP1.w / wd2, b); }
    return { x, y, w: wd2 };
  }

  /* ---------------- костёр: поленья, камни, три языка пламени в три слоя, искры ---------------- */
  const LOGS = [[[152, 270], [208, 258]], [[154, 258], [206, 270]], [[166, 273], [196, 255]]];
  const TONGUES = [[0, 1, 1], [-10, .62, .78], [10, .7, .82], [-4, .42, .55], [6, .48, .6]];
  const LAYERS = [['#ff9a3c', .62, 1], ['#ffc46a', .85, .68], ['#fff2cc', .95, .36]];
  function campfire(t, P, Z, zr, op, gop) {
    if (op <= .003) return '';
    const fl = .86 + .14 * Math.sin(t * 9.1) * Math.sin(t * 5.3 + 1), fp = P(FIRE);
    let s = '';
    if (gop > .003) s += `<ellipse cx="${f(fp[0])}" cy="${f(fp[1] + 6 * Z)}" rx="${f(130 * Z)}" ry="${f(44 * Z)}" fill="url(#gft-glow)" opacity="${f(fl * gop)}"/>` +
      `<circle cx="${f(fp[0])}" cy="${f(fp[1] - 26 * Z)}" r="${f(84 * Z)}" fill="url(#gft-glow)" opacity="${f(.9 * fl * gop)}"/>`;
    // камни очага
    const st = Array.from({ length: 14 }, (_, i) => { const a = i / 14 * TAU; return P([FIRE[0] + 31 * Math.cos(a), FIRE[1] + 6 + 8 * Math.sin(a)]); });
    s += GF.dots(st, { r: 1.9 * zr, op: .75 * op, t, glow: .3, color: '#f3e2c6' });
    for (const [a, b] of LOGS) {
      const pa = P(a), pb = P(b);
      s += `<line x1="${f(pa[0])}" y1="${f(pa[1])}" x2="${f(pb[0])}" y2="${f(pb[1])}" stroke="#e8c9a0" stroke-width="${f(6 * zr)}" stroke-linecap="round" opacity="${f(.3 * op)}" filter="url(#un-soft)"/>`;
      s += `<line x1="${f(pa[0])}" y1="${f(pa[1])}" x2="${f(pb[0])}" y2="${f(pb[1])}" stroke="#e8c9a0" stroke-width="${f(3.2 * zr)}" stroke-linecap="round" opacity="${f(.9 * op)}"/>`;
    }
    // языки пламени: капля из двух кривых, кончик качается; три слоя — оранжевый, жёлтый, светлое ядро
    let glow = '', core = '';
    TONGUES.forEach(([dx, hs, ws], k) => {
      const h0 = 70 * hs * (.84 + .16 * Math.sin(t * (8 + k) + k * 1.7)), w0 = 34 * ws, sway = 5 * hs * Math.sin(t * 6.3 + k * 2.1);
      const bx = FIRE[0] + dx, by = FIRE[1] + 1;
      LAYERS.forEach(([col, o, sc], li) => {
        const w = w0 * sc, h = h0 * (.5 + .5 * sc);
        const pts = [[bx - w / 2, by], [bx - w * .62, by - h * .42], [bx + sway * .5 - w * .18, by - h * .78], [bx + sway, by - h],
          [bx + sway * .5 + w * .18, by - h * .78], [bx + w * .62, by - h * .42], [bx + w / 2, by]].map(P);
        const d = `M${f(pts[0][0])} ${f(pts[0][1])}C${pts.slice(1, 4).map(p => `${f(p[0])} ${f(p[1])}`).join(' ')}C${pts.slice(4, 7).map(p => `${f(p[0])} ${f(p[1])}`).join(' ')}Z`;
        if (li === 0) glow += `<path d="${d}" fill="${col}" opacity="${f(.55 * op * fl)}" filter="url(#un-soft)"/>`;
        core += `<path d="${d}" fill="${col}" opacity="${f(o * op * (li ? 1 : fl))}"/>`;
      });
    });
    s += glow + core;
    // искры поднимаются над огнём
    const E = [], EA = [];
    for (let i = 0; i < 40; i++) {
      const a = frac(t * (.7 + .4 * H(i + 70)) + H(i * 3 + 71));
      E.push(P([FIRE[0] + (H(i * 5 + 72) - .5) * 24 + 7 * Math.sin(t * 3 + i) * a, FIRE[1] - 10 - a * 84]));
      EA.push(Math.sin(Math.PI * a) * (1 - .4 * a));
    }
    s += GF.dots(E, { r: 1.5 * zr, op: .95 * op, t, glow: 1, color: '#ffd28e', alpha: i => EA[i] });
    return s;
  }

  function fireWorld(t, c, C, op) {
    const P = C.P, Z = C.Z, zr = Math.pow(Z, .3);
    // v22: светлее — тёплый свет костра на весь круг людей
    const wash = op * (1 - GF.clamp((C.lz - Math.log(1.3)) / Math.log(1.8))), fpw = P(FIRE);
    let s = wash > .003 ? `<ellipse cx="${f(fpw[0])}" cy="${f(fpw[1] - 30 * Z)}" rx="${f(175 * Z)}" ry="${f(130 * Z)}" fill="url(#gft-glow)" opacity="${f(.5 * wash)}"/>` : '';
    s += GF.dots(stars().map(P), { r: 1.1 * zr, op: .85 * op, t: t * .7, glow: .6 });
    // огонь порядка и нити к людям
    const rise = GF.qq(t, c.up, c.up + 1.2), sop = op * (1 - GF.qq(t, c.up + .25, c.up + 1.1));
    const sp = P([SPARK[0], SPARK[1] - 160 * rise * rise]);
    const thr = .55 * op * (1 - GF.qq(t, c.up, c.up + .45));
    const L = people();
    if (thr > .003) {
      let th = '', run = [], hot = [];
      // «боги» — огонёк сбегает по нитям к людям; «странно» — поднимается от людей к огню
      const kb = GF.qq(t, c.bogi, c.bogi + .75), ku = 1 - GF.qq(t, c.strann, c.strann + .75);
      const hb = Math.max(Math.sin(Math.PI * kb), Math.sin(Math.PI * ku)), kk = ku < 1 && ku > 0 ? ku : kb;
      L.forEach((p, j) => {
        const hd = P(p.head);
        th += UN.thread(sp, hd, { opacity: thr * (1 + .7 * hb), width: 1.1 }) + UN.thread(sp, hd, { opacity: thr * .35, width: 3, glow: true });
        for (let m = 0; m < 2; m++) { const k = frac(t / 2.6 + H(j * 5 + m * 17 + 3)); run.push([GF.lerp(sp[0], hd[0], k), GF.lerp(sp[1], hd[1], k)]); }
        if (hb > .01) hot.push([GF.lerp(sp[0], hd[0], kk), GF.lerp(sp[1], hd[1], kk)]);
      });
      s += th + GF.dots(run, { r: 1.3 * zr, op: Math.min(1, thr * 1.8), t, glow: .9, color: '#fff3dc' });
      if (hot.length) s += GF.dots(hot, { r: 2.3 * zr, op: .95 * hb * thr / .55, t, glow: 1.2, color: '#fff6e4' });
    }
    s += GF.dots(ringPts().map(P), { r: 1 * zr, op: .6 * op, t, glow: .2, alpha: i => .5 + .5 * H(i + 960) });
    const drawPeople = front => L.filter(p => p.front === front).map(p =>
      GF.dots(GF.jitter(p.pts, t, .35, p.k).map(P), { r: 1.22 * zr, op: op, t: t + p.k, glow: .8 })).join('');
    s += drawPeople(false);
    // большой костёр; его свечение гаснет с наездом, чтобы не упиралось в край сцены
    const gop = op * (1 - GF.clamp((C.lz - Math.log(1.3)) / Math.log(1.6)));
    s += campfire(t, P, Z, zr, op, gop);
    s += drawPeople(true);
    // «странно» — чашка в руках переднего справа обводится светящимся кольцом
    const ring = pulse(t, c.strann - .05, .3, 1.2) * op;
    if (ring > .01) {
      const cw = cupWorld(), p = P([cw.x, cw.y - cw.w * .3]);
      s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(cw.w * 1.25 * Z)}" fill="none" stroke="#fff3dc" stroke-width="1.6" opacity="${f(.85 * ring)}"/>` +
        `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(cw.w * 1.25 * Z)}" fill="none" stroke="#fff3dc" stroke-width="4" opacity="${f(.35 * ring)}" filter="url(#un-soft)"/>`;
    }
    // v22: огонь порядка ярче с первого кадра (лучи длиннее), лучи — не выше края сцены
    if (sop > .003) s += fire(sp[0], sp[1], SPARK_R * Z, t, sop, .3 * (1 - GF.qq(t, c.up - .3, c.up + .3)) + .8 * pulse(t, c.bogi, .2, .8) + .5 * pulse(t, c.strann + .6, .2, .7), 3);
    return s;
  }

  /* ---------------- чашка, пар, ладони (локальные единицы: ширина чашки = 1, центр тела чашки) ---------------- */
  function cupLocal() {
    if (cache.cup) return cache.cup;
    const P = [];
    for (let k = 0; k < 46; k++) { const a = k / 46 * TAU; P.push([.5 * Math.cos(a), -.42 + .11 * Math.sin(a), .95]); }
    for (let k = 0; k <= 16; k++) { const v = k / 16; P.push([-.5 + .1 * v, -.42 + .84 * v, .9], [.5 - .1 * v, -.42 + .84 * v, .7]); }
    for (let k = 1; k < 20; k++) { const a = k / 20 * Math.PI; P.push([.4 * Math.cos(a), .42 + .09 * Math.sin(a), .8]); }
    for (let k = 0; k <= 16; k++) { const a = -Math.PI / 2 + k / 16 * Math.PI; P.push([.5 + .25 * Math.cos(a), -.02 + .23 * Math.sin(a), .75]); }
    for (let i = 0; i < 90; i++) {
      const v = H(i * 3 + 400), th = (.08 + .84 * H(i * 7 + 401)) * Math.PI, r = .5 - .1 * v;
      const lit = Math.pow((1 - Math.cos(th)) / 2, 1.3);
      P.push([r * Math.cos(th), -.42 + .84 * v + (.11 - .02 * v) * Math.sin(th), .15 + .55 * lit]);
    }
    return (cache.cup = P);
  }
  const teaLocal = () => cache.tea || (cache.tea = Array.from({ length: 44 }, (_, i) => {
    const r = Math.sqrt(H(i + 600)), a = H(i * 3 + 601) * TAU; return [.42 * r * Math.cos(a), -.42 + .085 * r * Math.sin(a)];
  }));
  // ладони: снаружи у боков чашки — овал, на её переде — пять коротких пальцев-капсул (чёрная заливка закрывает чашку)
  const FINGERS = [[-.31, .1, .17], [-.18, .105, .21], [-.055, .105, .25], [.07, .105, .24], [.195, .1, .2]];
  function handsSvg(cu, t, op) {
    if (op <= .003) return '';
    const W = cu.w, X = x => cu.x + x * W, Y = y => cu.y + y * W, lw = Math.max(.9, W * .01);
    const edge = `stroke="#fff" stroke-width="${f(lw)}" stroke-opacity=".75"`, halo = `stroke="#fff" stroke-width="${f(lw * 3.5)}" stroke-opacity=".18" filter="url(#un-soft)"`;
    let s = '', pts = [];
    for (const side of [-1, 1]) {
      const px = X(side * .61), py = Y(.04), rx = .13 * W, ry = .31 * W;
      s += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" ${halo}/>`;
      s += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(rx)}" ry="${f(ry)}" fill="#000" fill-opacity=".92" ${edge}/>`;
      for (let i = 0; i < 26; i++) { const r = Math.sqrt(H(i * 5 + 700 + side)), a = H(i * 7 + 701 + side) * TAU; pts.push([px + .8 * rx * r * Math.cos(a), py + .85 * ry * r * Math.sin(a)]); }
      FINGERS.forEach(([yc, h, len], k) => {
        const x0 = side < 0 ? X(-.56) : X(.56 - len), y0 = Y(yc - h / 2);
        const a = `x="${f(x0)}" y="${f(y0)}" width="${f(len * W)}" height="${f(h * W)}" rx="${f(h * W / 2)}"`;
        s += `<rect ${a} fill="none" ${halo}/><rect ${a} fill="#000" fill-opacity=".92" ${edge}/>`;
        for (let i = 0; i < 6; i++) pts.push([x0 + (.15 + .7 * H(i * 3 + k * 17 + side)) * len * W, y0 + (.3 + .4 * H(i * 5 + k * 13 + side)) * h * W]);
      });
    }
    const rr = Math.min(1.6, .5 + W * .011);
    return `<g opacity="${f(op)}">${s}${GF.dots(pts, { r: rr * .8, op: .7, t, glow: .4 })}</g>`;
  }
  function cupSvg(cu, t, heat, op) {
    if (op <= .003) return '';
    const L = ([x, y]) => [cu.x + x * cu.w, cu.y + y * cu.w];
    const ell = (cx, cy, rx, ry, a0, a1, n) => Array.from({ length: n + 1 }, (_, k) => { const a = a0 + (a1 - a0) * k / n; return L([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); });
    const lw = Math.max(.8, Math.min(1.8, cu.w * .016)), rr = Math.min(2, .55 + cu.w * .013);
    // чёрное тело чашки: туман за ней не просвечивает, силуэт читается
    const body = [L([-.5, -.42]), L([-.4, .42]), ...ell(0, .42, .4, .09, Math.PI, 0, 16), L([.5, -.42]), ...ell(0, -.42, .5, .11, 0, -Math.PI, 20)];
    let s = `<path d="M${body.map(p => `${f(p[0])} ${f(p[1])}`).join('L')}Z" fill="#000" opacity="${f(.85 * op)}"/>`;
    // поверхность чая: тёплая, пока горячий
    const tc = L([0, -.42]);
    s += `<ellipse cx="${f(tc[0])}" cy="${f(tc[1])}" rx="${f(.44 * cu.w)}" ry="${f(.085 * cu.w)}" fill="#fff" opacity="${f(.06 * op)}"/>`;
    if (heat > .01) s += `<ellipse cx="${f(tc[0])}" cy="${f(tc[1])}" rx="${f(.44 * cu.w)}" ry="${f(.085 * cu.w)}" fill="#ffc98a" opacity="${f(.5 * heat * op)}" filter="url(#un-soft)"/>`;
    for (const P of [ell(0, -.42, .5, .11, 0, TAU, 48), [L([-.5, -.42]), L([-.4, .42])], [L([.5, -.42]), L([.4, .42])],
      ell(0, .42, .4, .09, 0, Math.PI, 24), ell(.5, -.02, .25, .23, -Math.PI / 2, Math.PI / 2, 20), ell(.5, -.02, .15, .13, -Math.PI / 2, Math.PI / 2, 16)])
      s += UN.polyline(P, { opacity: .2 * op, width: lw * 3.2, glow: true }) + UN.polyline(P, { opacity: .75 * op, width: lw });
    const CL = cupLocal();
    s += GF.dots(CL.map(L), { r: rr, op: .95 * op, t, glow: .5, alpha: i => CL[i][2] });
    const tcol = heat > .5 ? '#ffd9a8' : '#ffffff';
    s += GF.dots(teaLocal().map(L), { r: rr * .85, op: (.25 + .55 * heat) * op, t, glow: .6 * heat, color: tcol });
    // пар: петли из точек над чашкой, слабеет и уходит вместе с теплом
    if (heat > .01) {
      const P = [], A = [];
      for (let i = 0; i < 80; i++) {
        const per = 1.6 + .9 * H(i * 3 + 1), a = frac(t / per + H(i * 7 + 2)), x0 = (H(i * 11 + 5) - .5) * .7;
        P.push(L([x0 * (1 + .9 * a) + .13 * a * Math.sin(a * 5 + i * 1.3 + t * .8), -.48 - a * 1.35]));
        A.push(Math.sin(Math.PI * a) * (1 - .35 * a));
      }
      s += GF.dots(P, { r: rr * 1.1, op: .85 * heat * op, t, glow: .9, color: '#fff4e2', alpha: i => A[i] });
    }
    return s;
  }

  /* ---------------- туман: 900 точек тепла по всему кадру (общие с gf_body) ---------------- */
  const FOG = { cols: 30, rows: 30, box: [4, 14, 356, 356], amp: 1.8, op: .66, r: 1.6, glow: .45 };
  FOG.n = FOG.cols * FOG.rows;
  // вихрь только в середине кадра: края тумана не перекашиваются (v3a: прямоугольник тумана перекосился в ромб)
  const SWIRL = { c: [180, 190], a: 1.3, r: 100 };
  // мягкие края тумана: к краю сцены точки тускнеют (v3a: ровный прямоугольник читался как та же коробка-комната)
  const fogAlpha = () => cache.fogA || (cache.fogA = fogBase().map(([x, y], i) => {
    const e = Math.min(x, 360 - x, (y - 8) * 1.2, 358 - y);
    return Math.pow(GF.clamp(e / 46), .85) * (.75 + .25 * H(i * 31 + 1200));
  }));
  function fogBase() {
    if (cache.fog) return cache.fog;
    const [x0, y0, x1, y1] = FOG.box, cw = (x1 - x0) / FOG.cols, ch = (y1 - y0) / FOG.rows, P = [];
    for (let j = 0; j < FOG.rows; j++) for (let i = 0; i < FOG.cols; i++) {
      const k = j * FOG.cols + i;
      P.push([x0 + (i + .1 + .8 * H(k * 3 + 1100)) * cw, y0 + (j + .1 + .8 * H(k * 5 + 1101)) * ch]);
    }
    return (cache.fog = P);
  }
  // «перемешивается» — вихрь: поворот убывает с расстоянием от центра (площадь не меняется, туман остаётся ровным)
  function fogPts(t, K) {
    let P = fogBase();
    if (has(K, 'a02', 'перемеш')) {
      const m = GF.w(K, 'a02', 'перемеш'), q = GF.qq(t, m - .05, m + 1.7);
      if (q > 0) P = P.map(p => {
        const dx = p[0] - SWIRL.c[0], dy = p[1] - SWIRL.c[1], a = SWIRL.a * q * Math.exp(-((dx * dx + dy * dy) / (SWIRL.r * SWIRL.r)));
        const ca = Math.cos(a), sa = Math.sin(a);
        return [SWIRL.c[0] + dx * ca - dy * sa, SWIRL.c[1] + dx * sa + dy * ca];
      });
    }
    return GF.jitter(P, t, FOG.amp, 7);
  }
  // когда и откуда летит каждая точка: первыми — дальние (к краям), последний залп («Сам собой… растёт») — ближние
  function plan(c) {
    const key = [c.ost, c.teplo, c.rash, c.komn, c.rasse, c.mix, c.sam, c.tolko].join(',');
    if (cache.plan && cache.plan.key === key) return cache.plan;
    const B = fogBase(), n = B.length, ox = CUP1.x, oy = CUP1.y - 30;
    const kf = i => Math.hypot(B[i][0] - ox, B[i][1] - oy) * (.5 + 1.0 * H(i * 29 + 5));
    const ids = B.map((p, i) => i).sort((a, b) => kf(b) - kf(a));
    const E = new Array(n), D = new Array(n), S0 = new Array(n);
    ids.forEach((i, j) => {
      const r = j / n, h = H(i * 23 + 7), g = H(i * 9 + 4);
      let e, d;
      if (r < .12) { e = c.ost + (c.teplo + .15 - c.ost) * (r / .12) + .1 * h; d = 1.5 + .6 * g; }
      else if (r < .42) { e = c.rash - .05 + .85 * ((r - .12) / .3) + .08 * h; d = 1.0 + .5 * g; }
      else if (r < .66) { e = c.rasse - .1 + (c.mix + .15 - c.rasse) * ((r - .42) / .24) + .06 * h; d = 1.0 + .4 * g; }
      else { e = c.sam - .05 + (c.tolko - c.sam + .1) * ((r - .66) / .34) + .05 * h; d = .75 + .2 * g; }
      const cu = cupAt(e, c, cam(e, c));
      S0[i] = [cu.x + (H(i * 13 + 6) - .5) * .6 * cu.w, cu.y - (.5 + .1 * H(i * 17 + 8)) * cu.w];
      E[i] = e; D[i] = d;
    });
    return (cache.plan = { key, E, D, S0 });
  }
  function vapor(t, c) {
    if (t < c.ost - .05) return { land: '', fly: '' };
    const F = fogPts(t, c.K), PL = plan(c), n = F.length;
    const rw = pulse(t, c.nazad - .02, .22, .55);       // «назад» — рывок к чашке
    const L = [], LA = [], FL = [], FA = [], FS = [], VA = fogAlpha();
    let streak = '';
    for (let i = 0; i < n; i++) {
      const e = PL.E[i]; if (t < e) continue;
      const x = GF.clamp((t - e) / PL.D[i]), s0 = PL.S0[i];
      const ctrl = [GF.lerp(s0[0], F[i][0], .3), Math.max(12, Math.min(s0[1], F[i][1]) - 18 - 40 * H(i * 19 + 2))];
      const ue = (1 - Math.pow(1 - x, 2.2)) * (1 - .5 * rw);
      const p = ue >= 1 ? F[i] : bez(s0, ctrl, F[i], ue);
      if (x >= 1) { L.push(p); LA.push(VA[i]); }
      else { FL.push(p); FS.push(GF.lerp(2.0, 1.05, Math.pow(x, .7))); FA.push(GF.lerp(1.5, VA[i], x)); }
      if (rw > .04) { const q2 = bez(s0, ctrl, F[i], Math.min(1, ue + .28 * rw)); streak += `M${f(p[0])} ${f(p[1])}L${f(q2[0])} ${f(q2[1])}`; }
    }
    let fly = GF.dots(FL, { r: FOG.r, op: .66, t, glow: 1, color: '#ffe6c4', alpha: i => FA[i], size: i => FS[i] });
    if (streak) fly += `<path d="${streak}" stroke="#fff" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="${f(.5 * rw)}"/>`;
    return { land: GF.dots(L, { r: FOG.r, op: FOG.op, t, glow: FOG.glow, alpha: i => LA[i] }), fly };
  }

  /* ---------------- кольца: тепло расходится («тепло»), всё тянется назад («назад») ---------------- */
  function rings(t, c, cu) {
    let s = '';
    const qw = GF.qq(t, c.teplo - .05, c.teplo + 1.3), ow = GF.q(t, c.teplo - .05, .15) * (1 - qw);
    if (ow > .01) {
      const r = GF.lerp(cu.w * .5, 240, qw), y = cu.y - .42 * cu.w;
      s += `<ellipse cx="${f(cu.x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r * .8)}" fill="none" stroke="${WARM}" stroke-width="5" opacity="${f(.4 * ow)}" filter="url(#un-soft)"/>` +
        `<ellipse cx="${f(cu.x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r * .8)}" fill="none" stroke="${WARM}" stroke-width="1.8" opacity="${f(.85 * ow)}"/>`;
    }
    const qb = GF.qq(t, c.nazad - .05, c.nazad + .32), ob = pulse(t, c.nazad - .05, .08, .45);
    if (ob > .01) {
      const r = GF.lerp(200, cu.w * .7, qb), y = cu.y - .3 * cu.w;
      s += `<circle cx="${f(cu.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="4.5" opacity="${f(.35 * ob)}" filter="url(#un-soft)"/>` +
        `<circle cx="${f(cu.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="1.6" opacity="${f(.8 * ob)}"/>`;
    }
    return s;
  }

  /* ---------------- слово: БЕСПОРЯДОК вразброс → ровно в рамке → ЭНТРОПИЯ ↑ ---------------- */
  const W1 = 'БЕСПОРЯДОК', W2 = 'ЭНТРОПИЯ', WC = [180, 92], S1 = 24, S2 = 27;
  const adv = s => .6 * s + 2.2;
  function glyph(x, y, ch, size, rot, sy, op, glow) {
    if (op <= .003 || sy <= .003) return '';
    const tx = `<text x="0" y="${f(size * .36)}" font-family="Plex" font-weight="600" font-size="${f(size)}" text-anchor="middle"`;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(1 ${sy.toFixed(3)})" opacity="${f(op)}">` +
      (glow > .01 ? `${tx} fill="#fff" opacity="${f(Math.min(1, glow))}" filter="url(#un-text-glow)">${ch}</text>` : '') +
      `${tx} fill="#fff" stroke="#000" stroke-width="3.4" stroke-linejoin="round" paint-order="stroke">${ch}</text></g>`;
  }
  function word(t, c) {
    if (t < c.bespor - .1) return '';
    const n1 = W1.length, n2 = W2.length, B = fogBase();
    const J = (1 + .6 * GF.qq(t, c.rasse, c.rasse + .9)) * (1 - GF.qq(t, c.fiz - .05, c.fiz + .55));
    const spread = 1 + .14 * GF.qq(t, c.rasse, c.rasse + .9) * (1 - GF.qq(t, c.fiz - .05, c.fiz + .55));
    const ph = TAU * GF.qq(t, c.mix, c.mix + 1.5);
    const sw = GF.qq(t, c.entr, c.entr + .45), grow = GF.qq(t, c.rast - .1, c.rast + .7), S2g = S2 * (1 + .08 * grow);
    const flash = pulse(t, c.entr + .3, .2, .9);
    const wN = GF.lerp(n1 * adv(S1) * spread, n2 * adv(S2g), sw) + 26, hN = S2 + 18;
    const app = GF.q(t, c.bespor - .1, .5), box = GF.qq(t, c.fiz + .1, c.fiz + .6);
    let s = `<rect x="${f(WC[0] - wN / 2 - 8)}" y="${f(WC[1] - hN / 2 - 8)}" width="${f(wN + 16)}" height="${f(hN + 16)}" rx="14" fill="#000" opacity="${f(.55 * app)}" filter="url(#un-soft)"/>`;
    s += `<rect x="${f(WC[0] - wN / 2)}" y="${f(WC[1] - hN / 2)}" width="${f(wN)}" height="${f(hN)}" rx="6" fill="#000" opacity="${f(.6 * app + .25 * box)}"/>`;
    if (box > .003) {
      const a = `x="${f(WC[0] - wN / 2)}" y="${f(WC[1] - hN / 2)}" width="${f(wN)}" height="${f(hN)}" rx="6" fill="none" stroke="#fff"`;
      s += `<rect ${a} stroke-width="4" opacity="${f((.25 + .5 * flash) * box)}" filter="url(#un-soft)"/><rect ${a} stroke-width="1.3" opacity="${f(.85 * box)}"/>`;
    }
    for (let k = 0; k < n1; k++) {
      const st = c.bespor - .15 + k * .03, a = GF.qq(t, st, st + .35);
      if (a <= 0) continue;
      const slot = [WC[0] + (k - (n1 - 1) / 2) * adv(S1) * spread, WC[1]];
      // вразброс, но читается: буквы скачут по высоте и наклонены; «перемешивается» — каждая описывает свой кружок
      const jx = 3 * Math.sin(ph + k * 2.1) * J, jy = ((k % 2 ? 1 : -1) * 6 + (H(k * 5 + 2) - .5) * 6) * J + 5 * Math.cos(ph + k * 2.1) * J * Math.sign(ph);
      const src = B[(k * 89 + 31) % B.length];
      const x = GF.lerp(src[0], slot[0] + jx, a), y = GF.lerp(src[1], slot[1] + jy, a);
      const out = 1 - GF.qq(t, c.entr - .05 + k * .03, c.entr + .13 + k * .03);
      s += glyph(x, y, W1[k], S1 * (.4 + .6 * a), (H(k * 7 + 3) - .5) * 36 * J * a, out, Math.min(1, a * 1.4), .45 + .55 * pulse(t, st + .3, .1, .4));
    }
    if (t > c.entr) for (let k = 0; k < n2; k++) {
      const sy = GF.qq(t, c.entr + .1 + k * .04, c.entr + .3 + k * .04);
      s += glyph(WC[0] + (k - (n2 - 1) / 2) * adv(S2g), WC[1], W2[k], S2g, 0, sy, 1, .6 + .8 * flash);
    }
    // «Сам собой» — справа стрелка вверх; «растёт» — она вырастает
    const ar = GF.q(t, c.sam - .05, .5);
    if (ar > .003) {
      const x = WC[0] + wN / 2 + 16, yb = WC[1] + 14, yt = yb - 20 - 22 * grow;
      const d = `M${f(x)} ${f(yb)}L${f(x)} ${f(yt)}M${f(x - 7)} ${f(yt + 8)}L${f(x)} ${f(yt)}L${f(x + 7)} ${f(yt + 8)}`;
      s += `<g opacity="${f(ar)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="#000" stroke-width="6.5"/>` +
        `<path d="${d}" stroke="#fff" stroke-width="5" opacity="${f(.35 + .3 * grow)}" filter="url(#un-soft)"/><path d="${d}" stroke="#fff" stroke-width="2.4"/></g>`;
    }
    return s;
  }

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), C = cam(t, c), cu = cupAt(t, c, C);
    const heat = 1 - GF.qq(t, c.ost, c.rasse);
    const crowd = 1 - GF.clamp((C.lz - Math.log(3.2)) / (Math.log(8.5) - Math.log(3.2)));
    const hands = GF.clamp((C.lz - Math.log(2.6)) / (Math.log(6.5) - Math.log(2.6))) * (1 - GF.qq(t, c.komn, c.komn + 1));
    const cop = 1 - .6 * GF.qq(t, c.sam, c.rast + .5);
    const V = vapor(t, c);
    let s = DEFS;
    if (crowd > .003) s += fireWorld(t, c, C, crowd);
    s += rings(t, c, cu) + V.land;
    // еле видная линия стола под чашкой после отъезда (вместо коробки-комнаты)
    const tb = .32 * GF.qq(t, c.komn + .3, c.komn + 1.2);
    if (tb > .003) {
      const y = cu.y + .44 * cu.w;
      s += UN.polyline([[cu.x - 1.3 * cu.w, y], [cu.x + 1.3 * cu.w, y]], { opacity: tb, width: 1.1 }) +
        `<ellipse cx="${f(cu.x)}" cy="${f(y)}" rx="${f(.5 * cu.w)}" ry="4" fill="#fff" opacity="${f(tb * .3)}" filter="url(#un-soft)"/>`;
    }
    s += cupSvg(cu, t, heat, cop) + handsSvg(cu, t, hands);
    s += V.fly + word(t, c);
    return s;
  }
  SCENES.gf_tea = GF.scene('gf_tea', (t, K, mode, p) => body(t, K));
  // туман конца a02 для gf_body (a03): те же точки (с вихрем «перемешивается»), та же яркость
  SCENES.gf_tea.fog = Object.freeze({ n: FOG.n, op: FOG.op, r: FOG.r, glow: FOG.glow, pts: fogPts, alpha: i => fogAlpha()[i] });
  // огонь порядка с лучами — его же ставит gf_body над головой на «Ответ… к богам» (рифма с первым кадром)
  SCENES.gf_tea.fire = fire;
})();
