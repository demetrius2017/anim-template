/* gfc_tea — «Бог ещё не создан», альтернативная версия «Цветная инфографика» (eps/god_future_color_p1), фразы a01 (hook)
 * и a02 (cool). v2, 05.11: перенос второго прохода основной версии engine/scenes/gf_tea.js v3 (слепой просмотр v1,
 * eps/god_future/qa/blind_view_v1/summary.md — Л1 к1–2, к4–8): коробки-комнаты и шкалы справа нет, вместо них крупное
 * слово БЕСПОРЯДОК → ЭНТРОПИЯ ↑; событие на каждом слове; люди и костёр крупнее; огонь порядка с длинными лучами — тот же,
 * что gfc_body ставит над головой на «Ответ» (рифма). Словарь — gfc_00_lib.js (window.GFC). Лиц, портретов, богов нет;
 * красного нет. На телефоне сцена ужата в .72 (story.safe), поэтому всё крупно: слова 24–27, градусник 21.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (hook и cool рисует одно
 * и то же тело), поэтому между режимами шва нет. Все события — от слов: GFC.w(K, id, основа); секунд нет. Нет слова в
 * озвучке — запасное время от соседнего слова (а не начало фразы).
 *
 *  hook (a01)  ПЕРВЫЙ КАДР РОЛИКА (t=0, без наплыва): ночное небо словаря; на площадке круг из 7 плоских людей
 *              (GFC.person, рост 96…146, 4 цвета; дальние освещены костром, у ближних — тёплый ободок со стороны огня)
 *              у большого костра (поленья, три языка пламени, искры, тёплый свет на земле), над ними огонь порядка
 *              с лучами (fire(): GFC.spark + 12 длинных лучей, 180,54, r 14), от него тёплые дуги к голове каждого
 *              (GFC.beam). Передний справа (бирюзовый) держит в ладонях розовую чашку, над ней пар. Основы: «бог» —
 *              огонь вспыхивает, лучи вытягиваются, по дугам сбегает огонёк; «начн» — медленный наезд (×1,22);
 *              «странн» — огоньки поднимаются к огню, чашка обводится светящимся кольцом; «чашк» — быстрый наезд в чашку
 *              (за 0,9 с), дуги гаснут, огонь уходит вверх, люди и костёр гаснут; остаются чашка крупно и две ладони.
 *  cool (a02)  Чашка крупно (180,212, ширина 116), пар — три тёплые струйки, чай тёплый; слева градусник 80° → 22°
 *              (к «беспоряд», там гаснет). Частицы тепла — 676 точек тумана: летят из чашки крупными тёплыми и на лету
 *              остывают (золото → коралл → бирюза, небо, сирень), садятся мельче; первыми — к краям. «остыва» — первые
 *              частицы, чай и пар начинают остывать; «тепло» — от чашки расходится тёплое кольцо; «расход» — залп частиц
 *              к краям; «комнат» — отъезд: чашка меньше (180,252, ширина 74) встаёт на блюдце на столик, ладони
 *              отпускают; «назад» — рывок: все частицы на миг летят назад к чашке со следами, к чашке сжимается кольцо;
 *              «собер» — и тут же разлетаются обратно; «беспоряд» — над частицами крупное слово БЕСПОРЯДОК (24): буквы
 *              слетаются из облака и стоят вразброс; «рассеива» — второй залп, буквы расходятся сильнее; «перемеш» —
 *              вихрь: облако закручивается вокруг середины кадра (остаётся), буквы кружат; «физик» — буквы встают ровно
 *              в плашку-термин; «энтроп» — буквы по одной переворачиваются в ЭНТРОПИЯ (27, золотом), вспышка; «сам»
 *              (2-е, «Сам собой») — справа золотая стрелка ↑, чашка тускнеет, третий залп заполняет пустоту вокруг
 *              чашки; «растет» — частицы заполняют весь кадр, стрелка вырастает.
 *  Выход: туман и ЭНТРОПИЯ ↑ стоят. Туман — SCENES.gfc_tea.fog: pts(t, K) — те же 676 точек в тех же местах (с вихрем),
 *  color(i), alpha(i) — мягкие края; его берёт gfc_body (a03) и собирает из него человека, поэтому наплыв без скачка.
 *  Огонь с лучами — SCENES.gfc_tea.fire(x, y, r, t, op, boost) (его же рисует gfc_body).
 * Слова: a01 — бог, начн, странн, чашк; a02 — остыва, тепло, расход, комнат, назад, собер, беспоряд, рассеива,
 *   перемеш, физик, энтроп, сам (n=1: «Сам собой», не «само назад»), только, растет. Все есть в K.words озвучки v14
 *   (текст a01–a02 в v15 тот же; сверено 05.11).
 * Кадр: всё важное в y=20..340. Пик ≈ 2,5 тыс. элементов (туман со свечением).
 * Проверка: eps/god_future_color_p1/qa/gfc_tea_v2*.jpg (станция tesla, render.py --at … --sheet).
 * Параметры p: s, mode, K (cues.json), prev/prev_mode — их разбирает GFC.scene.
 */
(() => {
  const TAU = Math.PI * 2;
  const f = v => Number(v).toFixed(2);
  const H = n => GFC.hash(n);
  const frac = x => x - Math.floor(x);
  const lerp = (a, b, k) => a + (b - a) * k;
  const clamp = x => Math.max(0, Math.min(1, x));
  const pulse = (t, a, up, down) => GFC.qq(t, a, a + up) * (1 - GFC.qq(t, a + up, a + up + down));
  const bez = (a, b, c, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * b[0] + u * u * c[0], v * v * a[1] + 2 * v * u * b[1] + u * u * c[1]]; };
  const INK = GFC.INK, PAL = GFC.PAL, ACC = GFC.ACC, SUN = GFC.SUN;
  const FF = 'GFCMont, Mont, sans-serif';
  const WARM = '#ffb347';
  const cache = {};

  // свои заливки (id с приставкой gfct-, чтобы не пересечься с соседними сценами в наплыве)
  const DEFS = `<defs>
    <linearGradient id="gfct-flO" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff7a3d"/><stop offset="1" stop-color="#ffa23d"/></linearGradient>
    <linearGradient id="gfct-flM" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffb03d"/><stop offset="1" stop-color="#ffd85a"/></linearGradient>
    <linearGradient id="gfct-steam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <radialGradient id="gfct-tea" cx=".45" cy=".4"><stop offset="0" stop-color="#e8964a"/><stop offset="1" stop-color="#9a4d22"/></radialGradient>
    <radialGradient id="gfct-teaC" cx=".45" cy=".4"><stop offset="0" stop-color="#9c6440"/><stop offset="1" stop-color="#5a2e1e"/></radialGradient>
    <linearGradient id="gfct-saucer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3eeff"/><stop offset="1" stop-color="#b3a9e6"/></linearGradient>
    <linearGradient id="gfct-table" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5ad8"/><stop offset="1" stop-color="#4b33a8"/></linearGradient>
    <radialGradient id="gfct-glow"><stop offset="0" stop-color="#ffbe6a" stop-opacity=".55"/><stop offset=".45" stop-color="#ff9e45" stop-opacity=".2"/><stop offset="1" stop-color="#ff9e45" stop-opacity="0"/></radialGradient>
    <clipPath id="gfct-cupclip"><path d="M-52 -39 C-52 -5 -44 23 -28 33 C-14 39 14 39 28 33 C44 23 52 -5 52 -39 Z"/></clipPath>
  </defs>`;

  /* ---------------- слова ---------------- */
  // есть ли слово в озвучке: GFC.w без слова даёт начало фразы, здесь вместо этого — запасное время от соседнего слова
  const has = (K, id, s, n = 0) => ((K && K.words && K.words[id]) || []).filter(w => GFC.bare(w.w).startsWith(GFC.bare(s))).length > n;
  const wd = (K, id, s, n, alt) => has(K, id, s, n) ? GFC.w(K, id, s, n) : alt;
  function cues(K) {
    const c = { K, a1: GFC.T(K, 'a01'), a1e: GFC.TE(K, 'a01'), a2: GFC.T(K, 'a02'), a2e: GFC.TE(K, 'a02') };
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

  /* ---------------- огонь порядка с лучами (общий с gfc_body: рифма первого кадра и «Ответ… к богам») ---------------- */
  function fire(x, y, r, t, op = 1, boost = 0) {
    if (op <= .003) return '';
    const n = 12, rot = t * .12 + Math.PI / 14;
    let tri = '';
    for (let k = 0; k < n; k++) {
      const a = rot + k / n * TAU, lg = k % 2 ? .6 : 1, ca = Math.cos(a), sa = Math.sin(a);
      const L = r * (1.0 + 1.9 * lg) * (1 + .08 * Math.sin(t * 2.3 + k * 1.7)) * (1 + .45 * boost);
      const r0 = r * 1.3, w = r * (.12 + .06 * lg);
      const b = [x + ca * r0, y + sa * r0], e = [x + ca * (r0 + L), y + sa * (r0 + L)];
      tri += `M${f(b[0] - sa * w)} ${f(b[1] + ca * w)}L${f(e[0])} ${f(e[1])}L${f(b[0] + sa * w)} ${f(b[1] - ca * w)}Z`;
    }
    return `<g opacity="${f(op)}"><path d="${tri}" fill="${SUN}" opacity="${f(Math.min(1, .4 + .3 * boost))}" filter="url(#gfc-soft)"/>` +
      `<path d="${tri}" fill="#ffe9a0" opacity=".82"/></g>` + GFC.spark(x, y, r * (1 + .15 * boost), { t, op });
  }

  /* ---------------- мир a01: круг у костра ---------------- */
  // 7 человек по кругу (углы — чтобы плоские фигуры почти не закрывали друг друга), задний центральный — за костром;
  // HOLDER — передний справа, держит чашку. Цвета: соседи разные; держатель бирюзовый (к розовой чашке).
  // v2: люди крупнее (рост 96…146), костёр большой — слепой просмотр v1: «костёр на к1–2 не виден»
  const RING = { cx: 180, cy: 256, rx: 134, ry: 64 }, FIRE = [180, 262], SPARK = [180, 54], SPARK_R = 14, HOLDER = 6;
  const ANG = [270, 226, 314, 168, 12, 117, 63], COL = [3, 2, 0, 1, 2, 0, 1];
  function people() {
    if (cache.people) return cache.people;
    const L = [];
    for (let k = 0; k < ANG.length; k++) {
      const a = ANG[k] * Math.PI / 180, sn = Math.sin(a), d = (sn + 1) / 2;
      const x = RING.cx + RING.rx * Math.cos(a), gy = RING.cy + RING.ry * sn, h = 96 + 50 * d;
      L.push({ k, x, gy, h, d, front: gy > FIRE[1], col: COL[k], top: [x, gy - h] });
    }
    L.sort((p, q) => p.gy - q.gy);
    return (cache.people = L);
  }
  // чашка в руках держателя (мир a01): центр тела чашки и ширина; рука — от плеча к ладони у бока чашки
  const CUPU = { y: -42, w: 20 };             // в единицах фигуры GFC.person (макушка −95,5, подошвы 0)
  function cupWorld() {
    if (cache.cupW) return cache.cupW;
    const p = people().find(q => q.k === HOLDER), s = p.h / 95.5;
    return (cache.cupW = { x: p.x, y: p.gy + CUPU.y * s, w: CUPU.w * s });
  }

  // держатель: та же плоская фигура, что GFC.person (туника, голова-круг), но руки согнуты и держат чашку перед собой
  const TUNIC = 'M-15 -58 C-15 -67 -9 -71 0 -71 C9 -71 15 -67 15 -58 L19 -5 C19 -2 17 0 14 0 L-14 0 C-17 0 -19 -2 -19 -5 Z';
  function holderSvg(p, t, look) {
    const s = p.h / 95.5, br = 1 + .014 * Math.sin(t * 2.3 + 7 * 1.7), pal = PAL[p.col];
    const hx = 60 / 104 * CUPU.w, hy = CUPU.y + .4;     // ладонь у бока чашки
    const arms = [-1, 1].map(sd => `M${12.5 * sd} -61 Q${f(25 * sd)} -53 ${f(hx * sd)} ${f(hy)}`).join(' ');
    const body = (fill) => `<path d="${TUNIC}" fill="${fill}"/><circle cx="0" cy="-84" r="11.5" fill="${fill}"/>`;
    const arm = (c) => `<path d="${arms}" fill="none" stroke="${c}" stroke-width="7.5" stroke-linecap="round"/>`;
    let b = body(`url(#gfc-p${p.col})`) + `<path d="${TUNIC}" fill="url(#gfc-shade)"/>`;
    if (look.shade > .003) b += `<g opacity="${f(.42 * look.shade)}">${body(INK)}</g>`;
    if (look.lit > .003) b += `<g opacity="${f(.24 * look.lit)}">${body('#ffb46a')}</g>`;
    const sd = Math.sign(look.rim || 0);
    if (sd) b += `<path d="M${15 * sd} -58 L${19 * sd} -6" fill="none" stroke="#ffc27a" stroke-width="3" stroke-linecap="round" opacity=".55"/>` +
      `<path d="M${f(4 * sd)} -95 A11.5 11.5 0 0 ${sd > 0 ? 1 : 0} ${f(11 * sd)} -80" fill="none" stroke="#ffc27a" stroke-width="2.6" stroke-linecap="round" opacity=".55"/>`;
    b += arm(pal[1]) + `<g opacity="${f(.3 * look.shade)}">${arm(INK)}</g>`;
    b += `<ellipse cx="-4.4" cy="-88.8" rx="3.45" ry="2.3" fill="#fff" opacity=".2"/>`;
    const sh = `<ellipse cx="${f(p.x)}" cy="${f(p.gy + .4)}" rx="${f(p.h * .27)}" ry="${f(p.h * .06)}" fill="url(#gfc-shadow)"/>`;
    return sh + `<g transform="translate(${f(p.x)} ${f(p.gy)}) scale(${s.toFixed(4)} ${(s * br).toFixed(4)})">${b}</g>`;
  }

  // костёр (как в пробе gfx_flatcolor, крупнее ×1,8): два полена крест-накрест, камни, три языка пламени, искры
  function campfire(x, y, t, sc) {
    const n = GFC.noise;
    const fl = k => 1 + .15 * n(t * 8 + k * 3) + .06 * n(t * 21 + k);
    const flame = (w, h, k, fill) => {
      const hh = h * fl(k), sw = 2.4 * n(t * 5 + k * 7);
      return `<path d="M${f(-w)} 0 C${f(-w)} ${f(-hh * .45)} ${f(-w * .25 + sw)} ${f(-hh * .7)} ${f(sw)} ${f(-hh)} C${f(w * .25 + sw)} ${f(-hh * .7)} ${f(w)} ${f(-hh * .45)} ${f(w)} 0 C${f(w)} ${f(w * .55)} ${f(-w)} ${f(w * .55)} ${f(-w)} 0 Z" fill="${fill}"/>`;
    };
    let s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc)})">`;
    for (let i = 0; i < 9; i++) { const a = Math.PI * (.05 + .9 * i / 8); s += `<ellipse cx="${f(21 * Math.cos(a))}" cy="${f(2 + 5 * Math.sin(a))}" rx="4.2" ry="3" fill="#6d5aa8"/>`; }
    s += `<g transform="rotate(13)"><rect x="-17" y="-3.2" width="34" height="6.4" rx="3.2" fill="#7b3f2c"/></g>` +
      `<g transform="rotate(-13)"><rect x="-17" y="-3.2" width="34" height="6.4" rx="3.2" fill="#5e2e22"/></g>`;
    s += `<g transform="translate(0 -4)"><g filter="url(#gfc-soft)" opacity=".7">${flame(13, 32, 1, '#ff9a3d')}</g>${flame(12, 30, 1, 'url(#gfct-flO)')}` +
      `${flame(8, 22, 2, 'url(#gfct-flM)')}${flame(4.5, 13, 3, '#fff1a8')}</g>`;
    for (let i = 0; i < 10; i++) {
      const u = frac(t * .6 + H(i * 3.1));
      const a = clamp(u / .12) * (1 - u);
      if (a > .01) s += `<circle cx="${f(11 * n(i * 5 + t * 1.3))}" cy="${f(-20 - u * 46)}" r="${f(1.4 * (1 - u) + .3)}" fill="#ffd36b" opacity="${f(a)}"/>`;
    }
    return s + '</g>';
  }

  function fireWorld(t, c, C) {
    const L = people(), Z = C.Z;
    // наезд на чашку: остальные люди и костёр гаснут первыми, держатель — позже (к концу наезда — только чашка и ладони)
    const oth = 1 - clamp((C.E - .06) / .34), hop = 1 - clamp((C.E - .34) / .3);
    // свет костра на людях и земле; большое тёплое пятно гаснет в начале наезда (не упирается в края сцены)
    const fl = .82 + .18 * Math.sin(t * 9.1) * Math.sin(t * 5.3 + 1);
    const gop = fl * (1 - clamp((Z - 1.25) / .5));
    let s = GFC.ground(RING.cx, RING.cy + 10, 176, 70, { op: .95 * oth, warm: .55 * gop });
    if (gop * oth > .003) s += `<ellipse cx="${FIRE[0]}" cy="${FIRE[1] + 6}" rx="112" ry="38" fill="url(#gfct-glow)" opacity="${f(.95 * gop * oth)}"/>`;
    const look = p => ({ shade: .6 * p.d, lit: .9 * (1 - p.d) * fl, rim: p.x < FIRE[0] - 3 ? 1 : p.x > FIRE[0] + 3 ? -1 : 0 });
    const draw = p => p.k === HOLDER ? (hop > .003 ? `<g opacity="${f(hop)}">${holderSvg(p, t, look(p))}</g>` : '') :
      GFC.person(p.x, p.gy, p.h, { color: p.col, t, seed: p.k + 1, ...look(p), opacity: oth });
    L.filter(p => !p.front).forEach(p => { s += draw(p); });
    if (gop * oth > .003) s += `<circle cx="${FIRE[0]}" cy="${FIRE[1] - 30}" r="92" fill="url(#gfc-halo)" opacity="${f(gop * oth)}"/>`;
    if (oth > .003) s += `<g opacity="${f(oth)}">${campfire(FIRE[0], FIRE[1], t, 1.8)}</g>`;
    L.filter(p => p.front).forEach(p => { s += draw(p); });
    // «странно» — чашка в руках держателя обводится светящимся кольцом
    const ring = pulse(t, c.strann - .05, .3, 1.2) * hop;
    if (ring > .01) {
      const cw = cupWorld(), y = cw.y - cw.w * .25, r = cw.w * 1.3;
      s += `<circle cx="${f(cw.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${ACC}" stroke-width="4.5" opacity="${f(.4 * ring)}" filter="url(#gfc-soft)"/>` +
        `<circle cx="${f(cw.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff6d0" stroke-width="1.8" opacity="${f(.95 * ring)}"/>`;
    }

    // огонь порядка и дуги к людям
    const rise = GFC.qq(t, c.up, c.up + 1.2), sop = 1 - GFC.qq(t, c.up + .25, c.up + 1.1);
    const sp = [SPARK[0], SPARK[1] - 160 * rise * rise];
    const thr = 1 - GFC.qq(t, c.up, c.up + .45);
    if (thr > .003) {
      // «боги» — огонёк сбегает по дугам к людям; «странно» — поднимается от людей к огню
      const kb = GFC.qq(t, c.bogi, c.bogi + .75), ku = 1 - GFC.qq(t, c.strann, c.strann + .75);
      const hb = Math.max(Math.sin(Math.PI * kb), Math.sin(Math.PI * ku)), kk = ku < 1 && ku > 0 ? ku : kb;
      const hot = [];
      L.forEach(p => {
        const a = [sp[0], sp[1] + 12], b = [p.top[0], p.top[1] - 2];
        s += GFC.beam(a, b, t, { op: thr * Math.min(1, (1 + .6 * hb) * .9), phase: p.k * .37, w: 1.3 });
        if (hb > .01) { const cc = [lerp(a[0], b[0], .5) + (b[0] - a[0]) * .25, lerp(a[1], b[1], .25)]; hot.push(bez(a, cc, b, kk)); }
      });
      if (hot.length) {
        s += hot.map(p => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="11" fill="url(#gfc-halo)" opacity="${f(hb * thr)}"/>`).join('');
        s += GFC.dots(hot, { r: 3.2, op: .95 * hb * thr, t, glow: 1.2, color: '#fff6d0' });
      }
    }
    if (sop > .003) s += fire(sp[0], sp[1], SPARK_R, t, sop, .8 * pulse(t, c.bogi, .2, .8) + .5 * pulse(t, c.strann + .6, .2, .7));
    return s;
  }

  /* ---------------- камера: наезд на чашку на «чашки» (a01), отъезд на «комнате» (a02) ---------------- */
  const CUP0 = { x: 180, y: 212, w: 116 }, CUP1 = { x: 180, y: 252, w: 74 };
  function cam(t, c) {
    const cw = cupWorld();
    const zIn = Math.log(1.22) * GFC.qq(t, c.nach, c.chash);
    const z0 = c.chash - .1, z1 = c.chash + .8;
    const E = GFC.ease((t - z0) / (z1 - z0));
    const lz = zIn + (Math.log(CUP0.w / cw.w) - zIn) * E, Z = Math.exp(lz);
    const tx = lerp(cw.x, CUP0.x, E), ty = lerp(cw.y, CUP0.y, E);
    return { Z, lz, E, tx, ty, cw, P: p => [tx + (p[0] - cw.x) * Z, ty + (p[1] - cw.y) * Z] };
  }
  function cupAt(t, c, C) {
    const cw = C.cw, p = C.P([cw.x, cw.y]);
    let x = p[0], y = p[1], wd2 = cw.w * C.Z;
    const b = GFC.qq(t, c.komn - .1, c.komn + 1.2);
    if (b > 0) { x = lerp(x, CUP1.x, b); y = lerp(y, CUP1.y, b); wd2 = wd2 * Math.pow(CUP1.w / wd2, b); }
    return { x, y, w: wd2 };
  }

  /* ---------------- чашка, пар, ладони, столик (местные единицы пробы: ширина чашки 104, центр тела чашки) ---------------- */
  const CUPD = 'M-52 -39 C-52 -5 -44 23 -28 33 C-14 39 14 39 28 33 C44 23 52 -5 52 -39 Z';
  function cupSvg(cu, t, heat, op, sauc) {
    if (op <= .003) return '';
    let s = '';
    if (sauc > .003) s += `<g opacity="${f(sauc)}"><ellipse cx="4" cy="45" rx="84" ry="13" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>` +
      `<ellipse cx="0" cy="37" rx="80" ry="14" fill="url(#gfct-saucer)"/><ellipse cx="0" cy="36" rx="50" ry="8" fill="#9b90d8" opacity=".55"/></g>`;
    s += `<path d="M51 -25 C82 -31 88 7 56 17" fill="none" stroke="#e8505b" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M51 -25 C78 -29 82 3 56 13" fill="none" stroke="#ff9d8f" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`;
    s += `<path d="${CUPD}" fill="url(#gfc-p0)"/>`;
    s += `<g clip-path="url(#gfct-cupclip)"><rect x="-58" y="-19" width="120" height="10" fill="#ffe7e0" opacity=".9"/>` +
      `<rect x="-58" y="-4" width="120" height="3" fill="#ffe7e0" opacity=".55"/>` +
      `<path d="M22 -39 C28 -5 24 23 12 39 L62 39 L62 -39 Z" fill="${INK}" opacity=".16"/></g>`;
    s += `<path d="M-41 -29 C-39 -5 -34 15 -25 26" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/>`;
    s += `<ellipse cx="0" cy="-39" rx="52" ry="10" fill="#ffd3ca"/>`;
    s += `<ellipse cx="0" cy="-38" rx="46" ry="7.4" fill="url(#gfct-teaC)"/>`;
    if (heat > .01) s += `<ellipse cx="0" cy="-38" rx="46" ry="7.4" fill="url(#gfct-tea)" opacity="${f(heat)}"/>` +
      `<ellipse cx="0" cy="-38" rx="40" ry="6" fill="#ffc98a" opacity="${f(.45 * heat)}" filter="url(#gfc-soft)"/>`;
    s += `<ellipse cx="${f(-2 + 10 * Math.sin(t * 1.6))}" cy="-39" rx="14" ry="2.2" fill="#fff" opacity="${f(.12 + .16 * heat)}"/>`;
    // пар: три струйки, слабеют вместе с теплом
    if (heat > .01) for (let i = 0; i < 3; i++) {
      const x0 = -22 + i * 22;
      let d = '';
      for (let k = 0; k <= 14; k++) {
        const yy = -46 - k * 7.6, xx = x0 + 7 * Math.sin(k * .55 - t * 3.2 + i * 2) * (.35 + k / 14);
        d += (k ? ' L' : 'M') + f(xx) + ' ' + f(yy);
      }
      s += `<path d="${d}" fill="none" stroke="url(#gfct-steam)" stroke-width="${f(5.2 - i * .6)}" stroke-linecap="round" stroke-linejoin="round" opacity="${f(heat)}"/>`;
    }
    return `<g opacity="${f(op)}" transform="translate(${f(cu.x)} ${f(cu.y)}) scale(${(cu.w / 104).toFixed(4)})">${s}</g>`;
  }
  // ладони держателя: овал у бока чашки и четыре пальца-капсулы на её переде (бирюза, светотень)
  const FINGERS = [[-17, 27], [-6, 31], [5, 30], [16, 25]];
  function handsSvg(cu, t, op) {
    if (op <= .003) return '';
    const col = `url(#gfc-p${COL[HOLDER]})`, dark = PAL[COL[HOLDER]][1];
    let s = '';
    for (const sd of [-1, 1]) {
      s += `<ellipse cx="${60 * sd}" cy="2" rx="14" ry="30" fill="${col}"/><ellipse cx="${60 * sd}" cy="2" rx="14" ry="30" fill="url(#gfc-shade)"/>`;
      FINGERS.forEach(([y, len]) => {
        const x0 = sd < 0 ? -64 : 64 - len;
        const a = `x="${x0}" y="${y - 5}" width="${len}" height="10" rx="5"`;
        s += `<rect ${a} fill="${col}"/><rect ${a} fill="url(#gfc-shade)"/><rect ${a} fill="none" stroke="${dark}" stroke-width="1.3" opacity=".55"/>`;
      });
      s += `<path d="M${54 * sd} -26 Q${66 * sd} -30 ${72 * sd} -18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".3"/>`;
    }
    return `<g opacity="${f(op)}" transform="translate(${f(cu.x)} ${f(cu.y)}) scale(${(cu.w / 104).toFixed(4)})">${s}</g>`;
  }
  // столик под чашкой после отъезда (вместо коробки-комнаты): столешница и две ножки, масштаб — от ширины чашки
  function table(t, c, cu) {
    const op = GFC.qq(t, c.komn + .3, c.komn + 1.2);
    if (op <= .003) return '';
    const k = cu.w / 74, ty = cu.y + .356 * cu.w + 6 * k;
    return `<g opacity="${f(op)}" transform="translate(${f(cu.x)} ${f(ty)}) scale(${k.toFixed(4)})">` +
      `<ellipse cx="4" cy="42" rx="70" ry="8" fill="${INK}" opacity=".45" filter="url(#gfc-blur)"/>` +
      `<rect x="-46" y="4" width="10" height="38" rx="4" fill="#3c2890"/><rect x="36" y="4" width="10" height="38" rx="4" fill="#3c2890"/>` +
      `<rect x="-84" y="-1" width="168" height="11" rx="5.5" fill="#4b33a8"/>` +
      `<ellipse cx="0" cy="-1" rx="84" ry="9" fill="url(#gfct-table)"/></g>`;
  }

  /* ---------------- туман: 676 цветных точек тепла по всему кадру (общие с gfc_body) ---------------- */
  const FOG = { cols: 26, rows: 26, box: [4, 14, 356, 356], amp: 1.8, op: .92, r: 1.9, glow: .55 };
  FOG.n = FOG.cols * FOG.rows;
  const COOL = ['#b3dcff', '#f2c4ff', '#9ff0e2', '#d6daff'];   // светлые холодные: на фиолетовом фоне видны
  const STAGES = 5;
  // цвет точки по ходу остывания: 0 — горячая (золото), STAGES−1 — её холодный цвет в тумане
  const STAGE = COOL.map(cc => Array.from({ length: STAGES }, (_, k) => k === 0 ? '#ffe9a0' :
    k === STAGES - 1 ? cc : GFC.mixC(k < 2 ? '#ffb547' : '#ff9d8f', cc, (k - 1) / (STAGES - 2))));
  const fogCol = i => Math.floor(H(i * 7 + 1200) * COOL.length) % COOL.length;
  // вихрь только в середине кадра: края тумана не перекашиваются
  const SWIRL = { c: [180, 190], a: 1.3, r: 100 };
  function fogBase() {
    if (cache.fog) return cache.fog;
    const [x0, y0, x1, y1] = FOG.box, cw = (x1 - x0) / FOG.cols, ch = (y1 - y0) / FOG.rows, P = [];
    for (let j = 0; j < FOG.rows; j++) for (let i = 0; i < FOG.cols; i++) {
      const k = j * FOG.cols + i;
      P.push([x0 + (i + .1 + .8 * H(k * 3 + 1100)) * cw, y0 + (j + .1 + .8 * H(k * 5 + 1101)) * ch]);
    }
    return (cache.fog = P);
  }
  // мягкие края тумана: к краю сцены точки тускнеют (ровный прямоугольник читался бы той же коробкой-комнатой)
  const fogAlpha = () => cache.fogA || (cache.fogA = fogBase().map(([x, y], i) => {
    const e = Math.min(x, 360 - x, (y - 8) * 1.2, 358 - y);
    return Math.pow(clamp(e / 46), .85) * (.75 + .25 * H(i * 31 + 1200));
  }));
  // «перемешивается» — вихрь: поворот убывает с расстоянием от центра (туман остаётся ровным)
  function fogPts(t, K) {
    let P = fogBase();
    if (has(K, 'a02', 'перемеш')) {
      const m = GFC.w(K, 'a02', 'перемеш'), q = GFC.qq(t, m - .05, m + 1.7);
      if (q > 0) P = P.map(p => {
        const dx = p[0] - SWIRL.c[0], dy = p[1] - SWIRL.c[1], a = SWIRL.a * q * Math.exp(-((dx * dx + dy * dy) / (SWIRL.r * SWIRL.r)));
        const ca = Math.cos(a), sa = Math.sin(a);
        return [SWIRL.c[0] + dx * ca - dy * sa, SWIRL.c[1] + dx * sa + dy * ca];
      });
    }
    return GFC.jitter(P, t, FOG.amp, 7);
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
      S0[i] = [cu.x + (H(i * 13 + 6) - .5) * .6 * cu.w, cu.y - (.4 + .1 * H(i * 17 + 8)) * cu.w];
      E[i] = e; D[i] = d;
    });
    return (cache.plan = { key, E, D, S0 });
  }
  function vapor(t, c) {
    if (t < c.ost - .05) return { land: '', fly: '' };
    const F = fogPts(t, c.K), PL = plan(c), n = F.length, VA = fogAlpha();
    const rw = pulse(t, c.nazad - .02, .22, .55);       // «назад» — рывок к чашке
    const L = [], LA = [], LC = [], FL = [], FA = [], FS = [], FC = [];
    let streak = '';
    for (let i = 0; i < n; i++) {
      const e = PL.E[i]; if (t < e) continue;
      const x = clamp((t - e) / PL.D[i]), s0 = PL.S0[i], ci = fogCol(i);
      const ctrl = [lerp(s0[0], F[i][0], .3), Math.max(12, Math.min(s0[1], F[i][1]) - 18 - 40 * H(i * 19 + 2))];
      const ue = (1 - Math.pow(1 - x, 2.2)) * (1 - .5 * rw);
      const p = ue >= 1 ? F[i] : bez(s0, ctrl, F[i], ue);
      if (x >= 1) { L.push(p); LA.push(VA[i]); LC.push(COOL[ci]); }
      else {
        FL.push(p); FS.push(lerp(2.0, 1.05, Math.pow(x, .7))); FA.push(lerp(1.5, VA[i], x));
        FC.push(STAGE[ci][Math.min(STAGES - 1, Math.floor(x * (STAGES - .01)))]);
      }
      if (rw > .04) { const q2 = bez(s0, ctrl, F[i], Math.min(1, ue + .28 * rw)); streak += `M${f(p[0])} ${f(p[1])}L${f(q2[0])} ${f(q2[1])}`; }
    }
    let fly = GFC.dots(FL, { r: FOG.r, op: .8, t, glow: 1, alpha: i => FA[i], size: i => FS[i], color: i => FC[i] });
    if (streak) fly += `<path d="${streak}" stroke="#fff6e0" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="${f(.55 * rw)}"/>`;
    return { land: GFC.dots(L, { r: FOG.r, op: FOG.op, t, glow: FOG.glow, alpha: i => LA[i], color: i => LC[i] }), fly };
  }

  /* ---------------- кольца: тепло расходится («тепло»), всё тянется назад («назад») ---------------- */
  function rings(t, c, cu) {
    let s = '';
    const qw = GFC.qq(t, c.teplo - .05, c.teplo + 1.3), ow = GFC.q(t, c.teplo - .05, .15) * (1 - qw);
    if (ow > .01) {
      const r = lerp(cu.w * .5, 240, qw), y = cu.y - .3 * cu.w;
      s += `<ellipse cx="${f(cu.x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r * .8)}" fill="none" stroke="${WARM}" stroke-width="6" opacity="${f(.45 * ow)}" filter="url(#gfc-soft)"/>` +
        `<ellipse cx="${f(cu.x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r * .8)}" fill="none" stroke="${WARM}" stroke-width="2.4" opacity="${f(.9 * ow)}"/>`;
    }
    const qb = GFC.qq(t, c.nazad - .05, c.nazad + .32), ob = pulse(t, c.nazad - .05, .08, .45);
    if (ob > .01) {
      const r = lerp(200, cu.w * .7, qb), y = cu.y - .3 * cu.w;
      s += `<circle cx="${f(cu.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff6e0" stroke-width="5" opacity="${f(.4 * ob)}" filter="url(#gfc-soft)"/>` +
        `<circle cx="${f(cu.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff6e0" stroke-width="2" opacity="${f(.85 * ob)}"/>`;
    }
    return s;
  }

  /* ---------------- слово: БЕСПОРЯДОК вразброс → ровно в плашке → ЭНТРОПИЯ ↑ ---------------- */
  const W1 = 'БЕСПОРЯДОК', W2 = 'ЭНТРОПИЯ', WC = [180, 92], S1 = 24, S2 = 27, GAP = 2.4;
  // середины букв от центра слова (Montserrat 700, ширина — по таблице GFC.textW)
  function slotsOf(w, size) {
    const A = [...w].map(ch => GFC.textW(ch, size) + GAP), T = A.reduce((a, b) => a + b, 0);
    let x = -T / 2;
    return { T, X: A.map(a => { const m = x + a / 2; x += a; return m; }) };
  }
  function glyph(x, y, ch, size, rot, sy, op, glow, color) {
    if (op <= .003 || sy <= .003) return '';
    const tx = `<text x="0" y="${f(size * .36)}" font-family="${FF}" font-weight="700" font-size="${f(size)}" text-anchor="middle"`;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(1 ${sy.toFixed(3)})" opacity="${f(op)}">` +
      (glow > .01 ? `${tx} fill="${color}" opacity="${f(Math.min(1, glow))}" filter="url(#gfc-tglow)">${ch}</text>` : '') +
      `${tx} fill="${color}" stroke="${INK}" stroke-width="3.6" stroke-linejoin="round" paint-order="stroke">${ch}</text></g>`;
  }
  function word(t, c) {
    if (t < c.bespor - .1) return '';
    const n1 = W1.length, n2 = W2.length, B = fogBase();
    const J = (1 + .6 * GFC.qq(t, c.rasse, c.rasse + .9)) * (1 - GFC.qq(t, c.fiz - .05, c.fiz + .55));
    const spread = 1 + .14 * GFC.qq(t, c.rasse, c.rasse + .9) * (1 - GFC.qq(t, c.fiz - .05, c.fiz + .55));
    const ph = TAU * GFC.qq(t, c.mix, c.mix + 1.5);
    const sw = GFC.qq(t, c.entr, c.entr + .45), grow = GFC.qq(t, c.rast - .1, c.rast + .7), S2g = S2 * (1 + .08 * grow);
    const flash = pulse(t, c.entr + .3, .2, .9);
    const L1 = slotsOf(W1, S1), L2 = slotsOf(W2, S2g);
    const wN = lerp(L1.T * spread, L2.T, sw) + 28, hN = S2 + 20;
    const app = GFC.q(t, c.bespor - .1, .5), box = GFC.qq(t, c.fiz + .1, c.fiz + .6);
    const rx = WC[0] - wN / 2, ry = WC[1] - hN / 2;
    let s = `<rect x="${f(rx - 6)}" y="${f(ry - 2)}" width="${f(wN + 12)}" height="${f(hN + 12)}" rx="16" fill="${INK}" opacity="${f(.5 * app)}" filter="url(#gfc-blur)"/>`;
    s += `<rect x="${f(rx)}" y="${f(ry)}" width="${f(wN)}" height="${f(hN)}" rx="12" fill="${INK}" opacity="${f(.5 * app + .3 * box)}"/>`;
    if (box > .003) {
      const a = `x="${f(rx)}" y="${f(ry)}" width="${f(wN)}" height="${f(hN)}" rx="12" fill="none" stroke="${GFC.mixC('#ffffff', ACC, sw)}"`;
      s += `<rect ${a} stroke-width="5" opacity="${f((.25 + .5 * flash) * box)}" filter="url(#gfc-soft)"/><rect ${a} stroke-width="2" opacity="${f(.9 * box)}"/>`;
    }
    for (let k = 0; k < n1; k++) {
      const st = c.bespor - .15 + k * .03, a = GFC.qq(t, st, st + .35);
      if (a <= 0) continue;
      const slot = [WC[0] + L1.X[k] * spread, WC[1]];
      // вразброс, но читается: буквы скачут по высоте и наклонены; «перемешивается» — каждая описывает свой кружок
      const jx = 3 * Math.sin(ph + k * 2.1) * J, jy = ((k % 2 ? 1 : -1) * 6 + (H(k * 5 + 2) - .5) * 6) * J + 5 * Math.cos(ph + k * 2.1) * J * Math.sign(ph);
      const src = B[(k * 89 + 31) % B.length];
      const x = lerp(src[0], slot[0] + jx, a), y = lerp(src[1], slot[1] + jy, a);
      const out = 1 - GFC.qq(t, c.entr - .05 + k * .03, c.entr + .13 + k * .03);
      s += glyph(x, y, W1[k], S1 * (.4 + .6 * a), (H(k * 7 + 3) - .5) * 36 * J * a, out, Math.min(1, a * 1.4), .45 + .55 * pulse(t, st + .3, .1, .4), '#ffffff');
    }
    if (t > c.entr) for (let k = 0; k < n2; k++) {
      const sy = GFC.qq(t, c.entr + .1 + k * .04, c.entr + .3 + k * .04);
      s += glyph(WC[0] + L2.X[k], WC[1], W2[k], S2g, 0, sy, 1, .6 + .8 * flash, ACC);
    }
    // «Сам собой» — справа золотая стрелка вверх; «растёт» — она вырастает
    const ar = GFC.q(t, c.sam - .05, .5);
    if (ar > .003) {
      const x = WC[0] + wN / 2 + 17, yb = WC[1] + 15, yt = yb - 20 - 24 * grow;
      const d = `M${f(x)} ${f(yb)}L${f(x)} ${f(yt)}M${f(x - 8)} ${f(yt + 9)}L${f(x)} ${f(yt)}L${f(x + 8)} ${f(yt + 9)}`;
      s += `<g opacity="${f(ar)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="${INK}" stroke-width="7.5" opacity=".8"/>` +
        `<path d="${d}" stroke="${ACC}" stroke-width="6" opacity="${f(.35 + .3 * grow)}" filter="url(#gfc-soft)"/><path d="${d}" stroke="${ACC}" stroke-width="3"/></g>`;
    }
    return s;
  }

  // градусник-плашка: тепло уходит, градусы падают с «остывает» до «беспорядок»; там гаснет (дальше — слово)
  function chip(t, c) {
    const op = GFC.q(t, c.ost - .1, .4) * GFC.out(t, c.bespor - .15, .45);
    if (op <= .003) return '';
    const cool = GFC.qq(t, c.ost, c.bespor), deg = Math.round(lerp(80, 22, cool));
    const col = GFC.mixC('#ff8a4a', '#4c8dff', cool), w = 64, h = 26;
    let s = `<rect x="0" y="2.5" width="${w}" height="${h}" rx="13" fill="${INK}" opacity=".45"/>` +
      `<rect x="0" y="0" width="${w}" height="${h}" rx="13" fill="#fff" opacity=".96"/>`;
    s += `<line x1="14" y1="6" x2="14" y2="16" stroke="#ddd7f2" stroke-width="4.4" stroke-linecap="round"/>` +
      `<circle cx="14" cy="17.5" r="4.2" fill="${col}"/>` +
      `<line x1="14" y1="${f(lerp(6.5, 13.5, cool))}" x2="14" y2="17" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`;
    s += GFC.mono(42, 18.5, `${deg}°`, { size: 15, anchor: 'middle', color: col, shadow: 0, ls: 0, opacity: 1, grow: false });
    return `<g opacity="${f(op)}" transform="translate(16 94) scale(1.4)">${s}</g>`;
  }

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), C = cam(t, c), cu = cupAt(t, c, C);
    const heat = 1 - GFC.qq(t, c.ost, c.rasse);
    const crowd = 1 - clamp((C.E - .7) / .25);
    const hands = 1 - GFC.qq(t, c.komn, c.komn + 1);
    const cop = 1 - .5 * GFC.qq(t, c.sam, c.rast + .5);
    const sauc = GFC.qq(t, c.komn + .2, c.komn + 1.1);
    const V = vapor(t, c);
    let s = DEFS;
    if (crowd > .003) s += `<g opacity="${f(crowd)}">${GFC.zoom(fireWorld(t, c, C), C.cw.x, C.cw.y, C.Z, C.tx, C.ty)}</g>`;
    s += rings(t, c, cu) + V.land + table(t, c, cu);
    s += cupSvg(cu, t, heat, cop, sauc) + handsSvg(cu, t, hands);
    s += V.fly + word(t, c) + chip(t, c);
    return s;
  }
  SCENES.gfc_tea = GFC.scene('gfc_tea', (t, K, mode, p) => body(t, K));
  // туман конца a02 для gfc_body (a03): те же точки (с вихрем «перемешивается»), те же цвета, та же яркость
  SCENES.gfc_tea.fog = Object.freeze({ n: FOG.n, op: FOG.op, r: FOG.r, glow: FOG.glow, pts: fogPts,
    color: i => COOL[fogCol(i)], alpha: i => fogAlpha()[i] });
  // огонь порядка с лучами — его же ставит gfc_body над головой на «Ответ… к богам» (рифма с первым кадром)
  SCENES.gfc_tea.fire = fire;
})();
