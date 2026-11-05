/* gf_body — «Бог ещё не создан», часть 1 (eps/god_future_p1): фразы a03 (gather) и a04 (pay). v4, 05.11 (текст v21 —
 * source/text_v21.md, слова — build/words.json; второй проход по слепому просмотру v1: eps/god_future/qa/blind_view_v1/summary.md — Л1 к11–17).
 * Раскадровка — eps/god_future/source/storyboard.md; словарь — gf_00_lib.js (window.GF), яблоко — TS.apple (+ свой
 * толстый контур того же силуэта). Лиц, портретов нет. Красного нет.
 * Человек — 900 точек GF.personPts (раскладка: подошвы 180,330, рост 258; это точки тумана gf_tea) + второй слой
 * (голова, руки, ноги, ≈740 точек; проявляется, когда туман собрался); в груди соты-клетки (GF.lattice, r=6,6; точки
 * груди садятся на их вершины). На экран его ставит своя камера: обычный план — ×1,22, подошвы на y=344 (рост ≈ 312,
 * макушка y≈32) — на телефоне сцена ужата в .72, поэтому человек на всю высоту.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (gather и pay рисует одно
 * тело), шва между режимами нет. Все события — от слов: GF.w(K, id, основа); секунд нет. Нет слова — запасное время.
 *
 *  gather (a03) Вход наплывом 0,5 с из gf_tea/cool (GF.scene). Начало — тот же туман из 900 точек, что в конце
 *               gf_tea (SCENES.gf_tea.fog.pts(t, K)), поэтому наплыв без скачка. С начала фразы туман собирается в
 *               человека (GF.morph, к «клеток»). «клеток» — наезд на грудь (×1,9, макушка в кадре), проступают соты;
 *               «точн» — точки груди садятся на соты; «порядк» — соты светятся; «почему» — обратно к человеку целиком;
 *               «рассыпаеш» — края силуэта осыпаются и возвращаются; «ответ» — отъезд (×0,84), над головой
 *               вспыхивает тот же огонь с лучами, что в первом кадре (SCENES.gf_tea.fire, 180,62, r 14);
 *               «приведет» — от макушки к огню растёт нить; «богам» — огонь вспыхивает, лучи вытягиваются, по нити
 *               бегут огоньки.
 *  pay (a04)    «Ты ешь. Еда — вещество, собранное в порядке: из неё ты чинишь себя, а беспорядок отдаёшь — тем самым
 *               теплом. Физик Эрвин Шрёдингер писал: организм питается «отрицательной энтропией», проще говоря — порядком.»
 *               Два потока сразу: слева яблоко → яркие белые точки в живот; справа от тела — рыжее тепло наружу.
 *               «ешь» — огонь гаснет, камера снова к человеку крупно, слева крупное яблоко (r 44, контур толстый);
 *               «еда» — яблоко вспыхивает; «собранн» — вокруг яблока прорисовывается крупная сота (знак порядка);
 *               «порядке» — сота и яблоко вспыхивают, под ними ПОРЯДОК (моно 16); «из» — яблоко с сотой подаётся к телу;
 *               «чинишь» — яблоко тает струёй белых точек в живот (струя идёт до наезда), к «себя» соты груди вспыхивают;
 *               «беспоряд» — от тела (с правого бока и плеч) вылетают первые рыжие точки, справа БЕСПОРЯДОК;
 *               «отдаеш»/«тем» — рыжих точек вдвое, потом втрое, они уходят к правому краю и вверх; «тепл» —
 *               рыжий ореол вокруг тела, справа рыжее ТЕПЛО; «физик»/«эрвин»/«шредингер»/«писал» — слева вверху
 *               по строкам ЭРВИН · ШРЁДИНГЕР · 1944; «организ» — по телу снизу вверх бежит волна света;
 *               «пита» — СМЕНА ПЛАНА на середине цитаты: наезд на соты груди (×2,8), слева в каждую соту по очереди
 *               влетают точки и она вспыхивает (кормится); ПОРЯДОК/БЕСПОРЯДОК/ТЕПЛО и яблоко гаснут; «отрицат» — справа
 *               вверху −ЭНТРОПИЯ (моно 18); «прощ» — под ней = ПОРЯДОК; «порядком» — все соты вспыхивают и остаются
 *               светлыми, подписи и тепло гаснут, отъезд к раскладке (×1, подошвы 180,330) к началу a05.
 *  Выход: к началу a05 камера ×1 — человек ровно как ждёт gf_crowd (подошвы 180,330, рост 258). Сам человек (соты
 *  груди + точки тела + второй слой) — SCENES.gf_body.man.svg(t, K): его рисует gf_crowd на входе.
 * Слова (сверены с eps/god_future_p1/build/words.json, текст v21, 05.11): a03 — клеток, точн, порядк, почему, рассыпаеш,
 *   ответ, приведет, богам; a04 — ешь, еда, собранн, порядке (не «порядок»: эта основа ловит «порядком» в конце фразы),
 *   из, чинишь, себя, беспоряд, отдаеш, тем, тепл, физик, эрвин, шредингер, писал, организ, пита, отрицат, прощ, порядком.
 * Кадр: всё важное в y=24..350, подписи моно ≥ 16. Пик ≈ 6 тыс. элементов.
 * Проверка: eps/god_future_p1/qa/v21_body*.jpg (станция tesla, render.py --at … --sheet).
 * Параметры p: s, mode, K (cues.json), prev/prev_mode — их разбирает GF.scene.
 */
(() => {
  const TAU = Math.PI * 2;
  const f = v => Number(v).toFixed(2);
  const H = n => GF.hash(n);
  const lerp = GF.lerp;
  const frac = x => x - Math.floor(x);
  const pulse = (t, a, up, down) => GF.qq(t, a, a + up) * (1 - GF.qq(t, a + up, a + up + down));
  const bez = (a, b, c, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * b[0] + u * u * c[0], v * v * a[1] + 2 * v * u * b[1] + u * u * c[1]]; };
  const cache = {};
  const PCX = 180, GY = 330, PHT = 258, CR = 6.6, XN = 1150;
  const WARM = '#ffa850', APPLE = { x: 62, y: 188, r: 44 }, FIRE = [180, 62], FIRE_R = 14;
  const DEFS = `<defs><radialGradient id="gfb-heat"><stop stop-color="#ffb060" stop-opacity=".42"/><stop offset=".5" stop-color="#ff9e45" stop-opacity=".14"/><stop offset="1" stop-color="#ff9e45" stop-opacity="0"/></radialGradient></defs>`;
  // камера: точка f раскладки встаёт в точку t кадра, масштаб Z
  const CAM = {
    base: { Z: 1.22, f: [PCX, GY], t: [PCX, 344] },     // человек на всю высоту: макушка y≈32, подошвы y=344
    chest: { Z: 1.9, f: [PCX, 167], t: [PCX, 200] },    // «клеток»: грудь крупно, макушка y≈24
    far: { Z: .84, f: [PCX, GY], t: [PCX, 354] },       // «Ответ»: место над головой для огня (макушка y≈139)
    cells: { Z: 2.8, f: [PCX, 167], t: [PCX, 207] },    // «питается»: соты груди на весь кадр, плечи ниже подписей
    end: { Z: 1, f: [PCX, GY], t: [PCX, GY] },          // к началу a05 — раскладка, как ждёт gf_crowd
  };

  /* туман из gf_tea (конец a02); без gf_tea — та же раскладка здесь (без вихря) */
  function fog() {
    const g = SCENES.gf_tea && SCENES.gf_tea.fog;
    if (g) return g;
    if (!cache.fogFb) {
      const P = [], cw = 352 / 30, ch = 342 / 30;
      for (let j = 0; j < 30; j++) for (let i = 0; i < 30; i++) { const k = j * 30 + i; P.push([4 + (i + .1 + .8 * H(k * 3 + 1100)) * cw, 14 + (j + .1 + .8 * H(k * 5 + 1101)) * ch]); }
      cache.fogFb = { n: 900, op: .66, r: 1.6, glow: .45, pts: t => GF.jitter(P, t, 1.8, 7), alpha: () => 1 };
    }
    return cache.fogFb;
  }
  const fire = (x, y, r, t, op, boost) => SCENES.gf_tea && SCENES.gf_tea.fire ? SCENES.gf_tea.fire(x, y, r, t, op, boost) : GF.spark(x, y, r, { t, op });

  /* ---------------- слова ---------------- */
  const has = (K, id, s, n = 0) => ((K && K.words && K.words[id]) || []).filter(w => GF.bare(w.w).startsWith(GF.bare(s))).length > n;
  const wd = (K, id, s, n, alt) => has(K, id, s, n) ? GF.w(K, id, s, n) : alt;
  function cues(K) {
    const c = { K, a3: GF.T(K, 'a03'), a3e: GF.TE(K, 'a03'), a4: GF.T(K, 'a04'), a4e: GF.TE(K, 'a04') };
    const A = (s, alt) => wd(K, 'a03', s, 0, alt), B = (s, alt) => wd(K, 'a04', s, 0, alt);
    // a03: «А ты — триллионы клеток в точном порядке. Почему ты не рассыпаешься? Ответ и приведёт к богам.»
    c.klet = A('клеток', c.a3 + 1.1); c.tochn = A('точн', c.klet + .55); c.por3 = A('порядк', c.tochn + .35);
    c.poch = A('почему', c.por3 + .6); c.ras = A('рассыпаеш', c.poch + .65); c.zap = A('ответ', c.ras + .9);
    c.priv = A('приведет', c.zap + .8); c.bogam = A('богам', c.priv + .5);
    // a04 (v21): «Ты ешь. Еда — вещество, собранное в порядке: из неё ты чинишь себя, а беспорядок отдаёшь — тем самым
    //   теплом. Физик Эрвин Шрёдингер писал: организм питается «отрицательной энтропией», проще говоря — порядком.»
    // «порядке», а не «порядок»: основа «порядок» ловит только «порядком» в конце фразы
    c.plat = B('ешь', c.a4 + .15); c.eda = B('еда', c.plat + .6); c.sobr = B('собранн', c.eda + 1.6); c.por = B('порядке', c.sobr + .5);
    c.ber = B('из', c.por + .7); c.edy = B('чинишь', c.ber + .6); c.sebya = B('себя', c.edy + .35);
    c.bes = B('беспоряд', c.sebya + .55); c.otd = B('отдаеш', c.bes + .5); c.nar = B('тем', c.otd + .6); c.tepl = B('тепл', c.nar + .6);
    c.erv = B('физик', c.tepl + .6); c.erv2 = B('эрвин', c.erv + .5); c.shr = B('шредингер', c.erv2 + .3); c.tak = B('писал', c.shr + .5);
    c.org = B('организ', c.tak + .6); c.pit = B('пита', c.org + .6); c.otr = B('отрицат', c.pit + .5); c.pros = B('прощ', c.otr + 1.6);
    c.pkom = B('порядком', c.pros + .8);
    c.end = Math.max(c.pkom + .5, K && K.a05 != null ? K.a05 - .12 : c.a4e + .3);
    return c;
  }

  /* ---------------- человек и соты в груди (статичная раскладка) ---------------- */
  function base() {
    if (cache.base) return cache.base;
    const n = fog().n, s = PHT / 100, pts = GF.personPts(PCX, GY, PHT, n, 5);
    const torso = i => i >= n * .14 && i < n * .5;
    const y0 = GY - 80 * s, y1 = GY - 46 * s, hw = y => (10.5 - Math.abs((y - GY) / s + 66) * .05) * s;
    const cells = GF.lattice(PCX, (y0 + y1) / 2, CR, 6, 11)
      .filter(([x, y]) => y > y0 + CR * .5 && y < y1 - CR * .5 && Math.abs(x - PCX) < hw(y) - CR * .45);
    // вершины и середины рёбер сот — места, куда садятся точки груди
    const seen = new Set(), T = [];
    const add = p => { const k = Math.round(p[0] * 2) + ',' + Math.round(p[1] * 2); if (!seen.has(k)) { seen.add(k); T.push(p); } };
    for (const [cx, cy] of cells) {
      const V = [0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k - Math.PI / 2; return [cx + CR * .96 * Math.cos(a), cy + CR * .96 * Math.sin(a)]; });
      V.forEach((v, k) => { add(v); const u = V[(k + 1) % 6]; add([(v[0] + u[0]) / 2, (v[1] + u[1]) / 2]); });
    }
    const snap = new Array(n).fill(null), used = new Array(T.length).fill(false);
    const ids = []; for (let i = 0; i < n; i++) if (torso(i)) ids.push(i);
    ids.sort((a, b) => pts[a][1] - pts[b][1]);
    for (const i of ids) {
      let best = -1, bd = 1e9, any = -1, ad = 1e9;
      T.forEach((p, k) => { const d = (p[0] - pts[i][0]) ** 2 + (p[1] - pts[i][1]) ** 2; if (!used[k] && d < bd) { bd = d; best = k; } if (d < ad) { ad = d; any = k; } });
      const k = best >= 0 ? best : any; used[k] = true; snap[i] = T[k];
    }
    // края силуэта, которые осыпаются на «рассыпаешься» (не грудь)
    const crumb = pts.map((p, i) => !torso(i) && H(i * 7 + 3) < .7);
    // второй слой гуще: голова, руки, ноги (грудь — соты); проявляется, когда туман собрался
    const xp = GF.personPts(PCX, GY, PHT, XN, 9).filter((p, i) => !(i >= XN * .14 && i < XN * .5));
    // откуда уходит тепло: правый бок (вправо) и плечи с головой (вверх)
    const right = [], top = [];
    pts.forEach((p, i) => { if (p[0] > PCX + 4 && p[1] > GY - 82 * s && p[1] < GY - 30 * s) right.push(i); if (p[1] < GY - 76 * s) top.push(i); });
    // в каком порядке кормятся соты на «питается»
    const feed = cells.map((p, i) => H(i * 41 + 17));
    return (cache.base = { n, s, pts, snap, cells, crumb, torso, xp, right, top, feed, headTop: GY - 99 * s });
  }

  const blend = (a, b, k) => k <= 0 ? a : k >= 1 ? b : { Z: Math.exp(lerp(Math.log(a.Z), Math.log(b.Z), k)),
    f: [lerp(a.f[0], b.f[0], k), lerp(a.f[1], b.f[1], k)], t: [lerp(a.t[0], b.t[0], k), lerp(a.t[1], b.t[1], k)] };
  function camera(t, c) {
    let s = CAM.base;
    s = blend(s, CAM.chest, GF.qq(t, c.klet - .05, c.klet + .8));
    s = blend(s, CAM.base, GF.qq(t, c.poch - .1, c.poch + .7));
    s = blend(s, CAM.far, GF.qq(t, c.zap - .1, c.zap + .75));
    s = blend(s, CAM.base, GF.qq(t, c.plat, c.plat + .9));
    s = blend(s, CAM.cells, GF.qq(t, c.pit - .1, c.pit + .75));
    s = blend(s, CAM.end, GF.qq(t, c.pkom + .05, c.end));
    const Z = s.Z, F = s.f, T0 = s.t;
    return { Z, P: p => [T0[0] + (p[0] - F[0]) * Z, T0[1] + (p[1] - F[1]) * Z] };
  }

  function bodyPts(t, c) {
    const B = base(), sn = GF.qq(t, c.tochn, c.tochn + .55), br = 1 + .012 * Math.sin(t * 1.7);
    const A = 46 * pulse(t, c.ras + .05, .42, .75);
    return B.pts.map((p, i) => {
      let x = p[0], y = p[1];
      if (B.snap[i]) { x = lerp(x, B.snap[i][0], sn); y = lerp(y, B.snap[i][1], sn); }
      else { x += .55 * Math.sin(t * (1.2 + H(i) * 1.6) + i); y += .55 * Math.cos(t * (1.1 + H(i * 3) * 1.4) + i * 1.3); }
      if (A > .01 && B.crumb[i]) {
        const a = Math.atan2((y - 205) * .35, x - PCX + (H(i * 11) - .5) * 8) + (H(i * 13) - .5) * 1.1, m = A * (.5 + .9 * H(i * 17));
        x += Math.cos(a) * m; y += Math.sin(a) * m * .6 + m * .55 * H(i * 19);
      }
      return [PCX + (x - PCX) * br, y];
    });
  }

  function extraPts(t, c) {
    const B = base(), br = 1 + .012 * Math.sin(t * 1.7), A = 46 * pulse(t, c.ras + .05, .42, .75);
    return B.xp.map((p, i) => {
      let x = p[0] + .55 * Math.sin(t * (1.3 + H(i + 50) * 1.5) + i), y = p[1] + .55 * Math.cos(t * (1.2 + H(i * 3 + 50) * 1.3) + i * 1.3);
      if (A > .01 && H(i * 7 + 53) < .7) {
        const a = Math.atan2((y - 205) * .35, x - PCX + (H(i * 11 + 5) - .5) * 8) + (H(i * 13 + 5) - .5) * 1.1, m = A * (.5 + .9 * H(i * 17 + 5));
        x += Math.cos(a) * m; y += Math.sin(a) * m * .6 + m * .55 * H(i * 19 + 5);
      }
      return [PCX + (x - PCX) * br, y];
    });
  }

  // когда сота i кормится k-й раз на «питается» (по очереди, каждые 1,5 с)
  const fedAt = (c, B, i, k) => c.pit + .35 + B.feed[i] * 1.5 + k * 1.5;
  function combSvg(t, c, C) {
    const B = base();
    const appear = GF.qq(t, c.klet, c.klet + .8), glow = GF.qq(t, c.por3, c.por3 + .5);
    const settle = GF.qq(t, c.poch, c.poch + .8);
    const flash = .45 * pulse(t, c.sebya + .3, .3, 1.3);
    const bright = GF.qq(t, c.pkom, c.pkom + .6), burst = pulse(t, c.pkom, .25, 1.1);
    const wz = Math.pow(C.Z, .4);
    let s = '';
    B.cells.forEach(([x, y], i) => {
      const d = Math.hypot(x - PCX, (y - 175) * .6) / 32;
      const a = GF.qq(t, c.klet + d * .5, c.klet + d * .5 + .4);
      let fed = 0;
      for (let k = 0; k < 3; k++) { const ft = fedAt(c, B, i, k); if (ft < c.pkom + .2) fed = Math.max(fed, .8 * pulse(t, ft, .1, .7) + .3 * GF.q(t, ft, .3)); }
      let l = .5 * a + .45 * glow * (1 - .45 * settle) + .2 * glow * Math.max(0, Math.sin(t * 2.4 - d * 3)) * (1 - settle * .5) + flash + fed + .55 * bright;
      l = Math.min(1, l) * appear;
      if (l <= .01) return;
      const p = C.P([x, y]), r = CR * .96 * C.Z;
      s += GF.hex(p[0], p[1], r, { op: .25 + .65 * l, w: 1.25 * wz, fill: l > .55 ? `rgba(255,255,255,${f(.1 * (l - .55) / .45)})` : 'none' });
      if (l > .45) s += GF.hex(p[0], p[1], r, { op: (.3 + .5 * burst) * (l - .45) / .55, w: (2.6 + 1.6 * burst) * wz, glow: true });
    });
    // «порядком» — соты вспыхивают и остаются светлыми: мягкий свет поверх груди
    if (bright > .003) {
      const p = C.P([PCX, 175]);
      s += `<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="${f(34 * C.Z)}" ry="${f(50 * C.Z)}" fill="url(#un-halo)" opacity="${f(.5 * bright + .6 * burst)}"/>`;
    }
    return s;
  }

  /* струя белых точек: из яблока (кадр) в живот (раскладка → камера), по кругу с периодом per до stop */
  function stream(t, C, t0, stop, m, seed, src, per) {
    const P = [], A = [];
    for (let j = 0; j < m; j++) {
      const st = t0 + per * H(j * 3 + seed), dur = .8 + .25 * H(j * 5 + seed);
      if (t < st) continue;
      const cs = st + Math.floor((t - st) / per) * per;
      if (cs > stop) continue;
      const v = (t - cs) / dur;
      if (v >= 1) continue;
      const a = [src[0] + (H(j * 7 + seed) - .5) * src[2], src[1] + (H(j * 11 + seed) - .5) * src[2]];
      const b = C.P([PCX + (H(j * 13 + seed) - .5) * 30, 176 + 44 * H(j * 17 + seed)]);
      const ctl = [lerp(a[0], b[0], .45), Math.min(a[1], b[1]) - 26 - 22 * H(j * 19 + seed)];
      const u = GF.ease(v);
      for (let k = 0; k < 3; k++) { const uk = Math.max(0, u - k * .05); P.push(bez(a, ctl, b, uk)); A.push((1 - k * .33) * Math.sin(Math.PI * Math.min(1, v * 1.15)) ** .5); }
    }
    return P.length ? GF.dots(P, { r: 1.7, op: 1, t, glow: 1, alpha: i => A[i] }) : '';
  }
  /* «питается»: в каждую соту по очереди слева влетают точки */
  function feedStream(t, c, C) {
    if (t < c.pit) return '';
    const B = base(), P = [], A = [];
    B.cells.forEach((cell, i) => {
      for (let k = 0; k < 3; k++) {
        const ft = fedAt(c, B, i, k); if (ft > c.pkom + .2) break;
        const dur = .7, v = (t - (ft - dur)) / dur;
        if (v <= 0 || v >= 1) continue;
        const b = C.P(cell);
        for (let m = 0; m < 3; m++) {
          const a = [-8, 110 + 220 * H(i * 7 + k * 13 + m * 3)], ctl = [lerp(a[0], b[0], .5), Math.min(a[1], b[1]) - 30 * H(i + m)];
          const u = GF.ease(Math.max(0, v - m * .08) / (1 - m * .08));
          P.push(bez(a, ctl, b, u)); A.push(1 - m * .25);
        }
      }
    });
    return P.length ? GF.dots(P, { r: 2.2, op: 1, t, glow: 1.1, alpha: i => A[i] }) : '';
  }

  /* тепло наружу: рыжие точки от тела — с правого бока вправо, с плеч и головы вверх */
  function heat(t, c, C) {
    if (t < c.bes) return '';
    const B = base(), P = [], A = [], PD = 2.4;
    const boost = 1 + .4 * GF.qq(t, c.tepl, c.tepl + .8), dim = (1 - .45 * GF.qq(t, c.pit, c.pit + .8)) * (1 - GF.qq(t, c.pkom, c.end));
    for (let j = 0; j < 270; j++) {
      const t0 = j < 70 ? c.bes + .08 : j < 160 ? c.otd : c.nar;
      const st = t0 + PD * H(j * 5 + 2) * (j < 70 ? .45 : 1);
      if (t < st) continue;
      const age = (t - st) % PD, up = H(j * 3 + 9) < .3;
      const list = up ? B.top : B.right, o = B.pts[list[(j * 37) % list.length]];
      const ang = up ? -Math.PI / 2 + (H(j * 7 + 1) - .5) * 1.3 : -.6 + 1.0 * H(j * 7 + 1);
      const d = 4 + age * (42 + 34 * H(j * 11 + 3)), s0 = C.P(o);
      const x = s0[0] + Math.cos(ang) * d, y = s0[1] + Math.sin(ang) * d - age * 6;
      if (y > 352 || x > 372 || y < -8) continue;
      P.push([x, y]); A.push((1 - age / PD) * Math.min(1, age * 4) * boost * dim);
    }
    return GF.dots(P, { r: 1.8, op: .95, t, glow: 1, color: WARM, alpha: i => A[i] });
  }

  /* человек: соты груди + точки тела + второй слой. Его же рисует gf_crowd на входе a05 (SCENES.gf_body.man):
   * к началу a05 камера ×1 — силуэт ровно на раскладке (подошвы 180,330, рост 258). */
  function manSvg(t, c) {
    const B = base(), C = camera(t, c), FG = fog(), zr = Math.pow(C.Z, .3);
    const qm = GF.qq(t, c.a3 - .35, c.klet);
    let P = bodyPts(t, c).map(C.P);
    if (qm < 1) P = GF.morph(FG.pts(t, c.K), P, qm, t, { spread: .4, amp: 3, bend: 16, seed: 4 });
    // волна света по телу на «организм»
    const wv = GF.qq(t, c.org, c.org + .95), won = wv > 0 && wv < 1;
    const wy = C.P([PCX, lerp(GY + 10, B.headTop - 10, wv)])[1], ww = 14 * C.Z;
    const crumbDim = pulse(t, c.ras + .05, .42, .75);
    const fa = FG.alpha || (() => 1);
    const alpha = i => {
      let a = qm < 1 ? lerp(fa(i), 1, qm) : 1;
      if (crumbDim > .01 && B.crumb[i]) a -= .4 * crumbDim;
      if (won) a += 1.1 * Math.exp(-(((P[i][1] - wy) / ww) ** 2));
      return a;
    };
    let s = combSvg(t, c, C);
    s += GF.dots(P, { r: lerp(FG.r, 1.3, qm) * zr, op: lerp(FG.op, .95, qm), t, glow: lerp(FG.glow, .55, qm), alpha });
    const xo = GF.qq(qm, .6, 1);
    if (xo > .003) {
      const X = extraPts(t, c).map(C.P);
      s += GF.dots(X, { r: 1.15 * zr, op: .8 * xo * (1 - .35 * crumbDim), t: t + 3, glow: .45,
        alpha: won ? i => 1 + 1.1 * Math.exp(-(((X[i][1] - wy) / ww) ** 2)) : undefined });
    }
    return s;
  }

  /* тёмная плашка под подписями (v22, слепой просмотр части 1: мелкие подписи на телефоне не читались) */
  function plate(x, y, w, h, op) {
    if (op <= .003) return '';
    return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="4" fill="#000" opacity="${f(.84 * op)}"/>` +
      `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="4" fill="none" stroke="#fff" stroke-width="1.1" opacity="${f(.55 * op)}"/>`;
  }
  const monoW = (text, size) => text.length * (.6 * size + 1);   // ширина моно Plex с letter-spacing 1
  /* подпись моно с чёрной обводкой (читается поверх точек), печатается по буквам с t0 */
  function label(x, y, text, t, t0, o = {}) {
    if (t < t0) return '';
    const op = o.op ?? 1; if (op <= .003) return '';
    const n = Math.min(text.length, Math.floor((t - t0) * (o.cps ?? 22)) + 1), str = text.slice(0, n);
    const tx = `<text x="${f(x)}" y="${f(y)}" font-family="Plex" font-weight="600" font-size="${o.size ?? 16}" text-anchor="${o.anchor ?? 'middle'}" letter-spacing="1"`;
    return `<g opacity="${f(op)}">${tx} fill="${o.color ?? '#fff'}" opacity=".7" filter="url(#un-text-glow)">${str}</text>` +
      `${tx} fill="${o.color ?? '#fff'}" stroke="#000" stroke-width="3.2" stroke-linejoin="round" paint-order="stroke">${str}</text></g>`;
  }
  // толстый контур яблока — тот же силуэт, что у TS.apple (свежее, decay 0)
  function appleOutline(cx, cy, r, op) {
    const P = [];
    for (let k = 0; k <= 72; k++) {
      const th = k / 72 * TAU, side = th <= Math.PI ? 1 : -1, tt = th <= Math.PI ? th : TAU - th;
      const R = 1 - .2 * Math.exp(-tt * tt / .05) - .07 * Math.exp(-((tt - Math.PI) ** 2) / .06);
      const Y = -Math.cos(tt) * R * .97, hr = Math.sin(tt) * R * (1.02 - .07 * Y) * (1 + .05 * Math.exp(-((tt - .8) ** 2) / .12));
      P.push([cx + side * hr * r, cy + Y * r]);
    }
    const d = 'M' + P.map(p => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z';
    return `<path d="${d}" fill="#fff" opacity="${f(.06 * op)}"/><path d="${d}" fill="none" stroke="#fff" stroke-width="4" opacity="${f(.3 * op)}" filter="url(#un-soft)"/>` +
      `<path d="${d}" fill="none" stroke="#fff" stroke-width="1.5" opacity="${f(.85 * op)}"/>`;
  }

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), B = base(), C = camera(t, c);
    let s = DEFS;
    // рыжий ореол вокруг тела («теплом»)
    const halo = .9 * GF.q(t, c.tepl, .8) * (1 - .5 * GF.qq(t, c.pit, c.pit + .8)) * (1 - GF.qq(t, c.pkom, c.end));
    if (halo > .003) {
      const p = C.P([PCX, 205]);
      s += `<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="${f(80 * C.Z)}" ry="${f(150 * C.Z)}" fill="url(#gfb-heat)" opacity="${f(halo * (.9 + .1 * Math.sin(t * 2)))}"/>`;
    }
    s += heat(t, c, C);
    s += manSvg(t, c);
    // «Ответ» — над головой тот же огонь с лучами, что в первом кадре; «приведёт» — нить от макушки; «богам» — вспышка
    const sop = GF.q(t, c.zap - .05, .45) * GF.out(t, c.plat, .8);
    if (sop > .003) {
      const top = C.P([PCX, B.headTop - 4]), g = GF.qq(t, c.priv, c.bogam + .1), bot = [FIRE[0], FIRE[1] + FIRE_R + 3];
      if (g > .003 && top[1] > bot[1] + 2) {
        const end = [PCX, lerp(top[1], bot[1], g)];
        s += UN.thread(top, end, { opacity: .85 * sop, width: 1.3 }) + UN.thread(top, end, { opacity: .35 * sop, width: 4, glow: true });
        if (g < 1) s += GF.dots([end], { r: 2.2, op: sop, t, glow: 1, color: '#fff3dc' });
        else {
          const R = [];
          for (let m = 0; m < 3; m++) { const k = frac((t - c.bogam) / 1.1 + m / 3); R.push([PCX, lerp(bot[1], top[1], k)]); }
          s += GF.dots(R, { r: 2.2, op: sop, t, glow: 1, color: '#fff3dc' });
        }
      }
      s += fire(FIRE[0], FIRE[1], FIRE_R, t, sop, .7 * pulse(t, c.zap, .15, .9) + 1.0 * pulse(t, c.bogam, .15, .9));
    }
    // a04: крупное яблоко слева — вспыхивает на «еда»; «собранное» — вокруг прорисовывается крупная сота (знак порядка);
    // «порядке» — сота и яблоко вспыхивают; «из (неё)» — подаётся к телу; «чинишь» — тает струёй в живот
    const aop = GF.q(t, c.plat, .5) * GF.out(t, c.pit - .1, .6);
    if (aop > .003) {
      const sc = (.7 + .3 * GF.q(t, c.plat, .5)) * (1 - .4 * GF.qq(t, c.edy, c.org));
      const ax = APPLE.x + 10 * GF.qq(t, c.ber, c.ber + .5), ay = APPLE.y + 2 * Math.sin(t * 1.3), r = APPLE.r * sc;
      const fl = Math.max(pulse(t, c.eda, .15, .8), pulse(t, c.por, .15, .8));
      if (fl > .01) s += `<circle cx="${f(ax)}" cy="${f(ay)}" r="${f(r * 2)}" fill="url(#un-halo)" opacity="${f(fl)}"/>`;
      const hq = GF.qq(t, c.sobr - .05, c.sobr + .5), hf = pulse(t, c.por, .15, 1);
      if (hq > .003) {
        const V = [0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k - Math.PI / 2, R = r * 1.3; return [ax + R * Math.cos(a), ay + 1 + R * Math.sin(a)]; });
        const d = 'M' + V.map(v => `${f(v[0])} ${f(v[1])}`).join(' L') + ' Z';
        s += `<g opacity="${f(aop)}"><path d="${d}" fill="none" stroke="#fff6e0" stroke-width="${f(4.5 + 3 * hf)}" opacity="${f(.3 + .4 * hf)}" filter="url(#un-soft)" pathLength="1" stroke-dasharray="${f(hq)} 2"/>` +
          `<path d="${d}" fill="${hf > .05 ? `rgba(255,255,255,${f(.08 * hf)})` : 'none'}" stroke="#fff" stroke-width="1.8" opacity=".95" stroke-linejoin="round" pathLength="1" stroke-dasharray="${f(hq)} 2"/></g>`;
      }
      s += `<g opacity="${f(aop)}">${appleOutline(ax, ay, r, 1)}</g>`;
      s += TS.apple(ax, ay, r, { t, opacity: aop, yaw: .35 + .25 * Math.sin(t * .6) });
    }
    if (t > c.edy) s += stream(t, C, c.edy + .05, c.org + .3, 110, 21, [APPLE.x + 10, APPLE.y, 30], 1.4);
    s += feedStream(t, c, C);
    // подписи: гаснут на наезд «питается» (соты на весь кадр); мыслитель и −ЭНТРОПИЯ = ПОРЯДОК — до «порядком»
    const side = GF.out(t, c.pit - .05, .5), fin = GF.out(t, c.pkom + .25, .5);
    s += label(APPLE.x + 6, 268, 'ПОРЯДОК', t, c.por, { op: side });
    s += label(292, 296, 'БЕСПОРЯДОК', t, c.bes, { op: side });
    s += label(292, 318, 'ТЕПЛО', t, c.tepl, { op: side, color: WARM });
    // v22: мыслитель и −ЭНТРОПИЯ = ПОРЯДОК — моно 22–24 (было 15–18) на тёмных плашках
    const LS = 22, lp = GF.q(t, c.erv2 - .1, .25) * fin;
    s += plate(6, 25, monoW('ШРЁДИНГЕР', LS) + 16, 84, lp);
    s += label(14, 48, 'ЭРВИН', t, c.erv2 - .05, { anchor: 'start', op: fin, size: LS });
    s += label(14, 74, 'ШРЁДИНГЕР', t, c.shr - .05, { anchor: 'start', op: fin, size: LS });
    s += label(14, 100, '1944', t, c.tak - .1, { anchor: 'start', op: fin, size: LS });
    const ES = 24, ew = monoW('−ЭНТРОПИЯ', ES) + 16, ex = 354 - ew / 2;
    s += plate(ex - ew / 2, 25, ew, 66, GF.q(t, c.otr - .05, .25) * fin);
    s += label(ex, 51, '−ЭНТРОПИЯ', t, c.otr, { size: ES, op: fin });
    s += label(ex, 80, '= ПОРЯДОК', t, c.pros, { size: ES, op: fin });
    return s;
  }
  SCENES.gf_body = GF.scene('gf_body', (t, K, mode, p) => body(t, K));
  // шов с gf_crowd (a05): человек к началу a05 — подошвы (180,330), рост 258, соты в груди; рисуется в координатах кадра
  SCENES.gf_body.man = Object.freeze({ svg: (t, K) => manSvg(t, cues(K)), foot: [PCX, GY], h: PHT });
})();
