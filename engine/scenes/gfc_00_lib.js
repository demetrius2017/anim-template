/* gfc_00_lib — «Бог ещё не создан», альтернативная версия в дизайне «Цветная инфографика» (выбор владельца 05.11 по пробе
 * engine/scenes/gfx_flatcolor.js → eps/god_future/qa/style_flatcolor.jpg): общий словарь рисунков window.GFC, v2 (GFC.version).
 * Ролики: eps/god_future_color_p1, eps/god_future_color_p2 (сцены gfc_* = сцены gf_* основной версии, перерисованные).
 *
 * v2 (06.11, владелец о цветной части 1: «графика всё же не как на предложенной картинке, цветов мало») — ближе к образцу:
 *   крупный заголовок сверху, разноцветные люди и значки, холмы под сценой, фон теплее вверху. Всё v1 обратно совместимо
 *   (сигнатуры прежние; прежние сцены рисуются как раньше, кроме фона: верх кадра насыщеннее и теплее — розово-фиолетовый).
 *   GFC.headline(text, t, t0, t1=null, o) — заголовок, как «ЗАЧЕМ ЛЮДЯМ / БОГИ?» в образце: строки через «/», *слово* — акцент
 *     (золото GFC.GOLD #ffc94a, в o.big=1.5 раза крупнее, тёплое свечение). Montserrat 800 капсом, белый, мягкая тень.
 *     o.y=70 — базовая линия первой строки (выше 50 не ставится: верх кадра закрывает интерфейс Reels), o.size=26, o.big=1.5,
 *     o.maxW=300 (строка шире ужимается целиком), o.x=180, o.gap=.5 (межстрочный зазор в кеглях), o.ls=.02, o.color='#fff',
 *     o.accent, o.glow=1, o.op, o.caps=true. Появляется с t0: подъём на 8 и проявление за o.dur=.3 с, строки — через
 *     o.stagger=.1 с; гаснет к t1 (за .35 с; null — не гаснет).
 *       s += GFC.headline('Зачем людям / *боги?*', t, GFC.T(K, 'p1'), GFC.TE(K, 'p1'));
 *       s += GFC.headline('Чай *остывает*', t, 3, 6, { y: 64, size: 24 });
 *   GFC.headBox(text, o) → {y0, y1, lines:[{y, size, w, segs}]} — где встанет заголовок (y0 — верх букв, y1 — низ):
 *     ставить крупный объект сразу под ним, без пустоты: GFC.headBox('Зачем людям / *боги?*').y1 ≈ 120.
 *   GFC.ground(o) / GFC.hills(o) — фиолетовые холмы и горизонт под сценой (дальние и средние гребни со светлым кантом, тёмная
 *     земля до маски субтитров, по бокам мягко гаснут): o.y=300 — линия горизонта, o.op=1, o.glow=1 — мягкий свет над
 *     горизонтом, o.warm — тёплый отсвет огня на земле, o.far=1 / o.mid=1 — дальние / средние гребни (0 — без них), o.seed.
 *     Прежний вызов GFC.ground(cx, y, rx, ry, o) — площадка под людьми, как в v1. Ставить первым (под людьми):
 *       let s = GFC.ground({ y: 262, warm: .5 }); s += GFC.person(180, 300, 90, { seed: 3 });
 *   GFC.node(x, y, r, icon, o) — цветной кружок со значком (как клетка/рыба/человек на ветвях образца): градиент цвета,
 *     светлая обводка, блик, мягкое свечение и тень. icon — имя из GFC.ICONS: book, heart, scales, star, leaf, drop, plus,
 *     question, flame, human, cell, fish, eye; свой SVG (строка с «<», поле ±10 при r=16); короткий текст ('150', '1', '?').
 *     o.color (номер или имя PAL, или цвет-строка; без него — по o.seed, как у людей), o.seed=1, o.op, o.scale=1 (появление —
 *     0→1), o.glow=1, o.shadow=1, o.ring=1, o.ink='#fff' (цвет значка).
 *       s += GFC.node(120, 200, 17, 'heart', { color: 'pink', scale: GFC.q(t, t0, .35) });
 *   Палитра: GFC.PAL — [светлый, тёмный] × 7: 0 коралл, 1 бирюза, 2 небо, 3 фиалка, 4 золото (как v1), 5 розовый, 6 зелёный;
 *     имена — GFC.NAME ('coral' … 'pink', 'green'), готовые заливки url(#gfc-p0)…url(#gfc-p6). GFC.pick(seed) → номер цвета
 *     для людей и значков по кругу GFC.CROWD (коралл, бирюза, небо, розовый, зелёный, фиалка; без золота — оно для «того
 *     самого»): соседние целые seed — разные цвета.
 *   GFC.person без o.color — цвет GFC.pick(o.seed): группа с seed 1..n — разноцветная (seed 0 — коралл, как было).
 *   GFC.dots без o.color — светлые тона всех 7 цветов палитры (GFC.DOT).
 *   Фильтры v2: url(#gfc-glow3) — мягкое свечение (3,4), url(#gfc-hblur) — тень заголовка (2,4).
 *   Проверочная сцена gfc_style — три момента образца на v2 (заголовок, холмы, люди, значки) и прежние функции v1.
 * Стиль: тёплый градиентный фон (глубокий фиолетовый → тёмно-синий) со звёздами-точками; плоские люди без лиц (круг-голова,
 * скруглённое тело; v1 — 4 цвета: коралл, бирюза, небо, фиалка — и золото для «того самого», v2 — ещё розовый и зелёный); огонь порядка — тёплый
 * жёлто-оранжевый шар с лучами; подписи — Montserrat 700 капсом с мягкой тенью; мягкие тени под фигурами и плитками.
 * Хаос и порядок — как в GF: цветные точки дрожат и разбредаются; порядок — те же точки в сотах, соты — цветные плитки.
 * Все функции чистые: результат зависит только от аргументов; случайность — GFC.hash. Никаких Math.random/Date.
 * UN и TS не нужны: файл грузится раньше остальных gfc_*.js (render.py — engine/scenes/*.js по алфавиту).
 *
 * API — как у GF (gf_00_lib.js), сигнатуры те же; сцену gf_* можно перенести заменой «GF.» на «GFC.»:
 *   время: GFC.T, GFC.TE, GFC.w, GFC.we, GFC.q, GFC.qq, GFC.out, GFC.ease, GFC.clamp, GFC.lerp, GFC.hash, GFC.bare;
 *   точки: GFC.cloud, GFC.lattice, GFC.hexPts, GFC.personPts, GFC.jitter, GFC.drift, GFC.morph — те же формулы, что в GF;
 *   GFC.dots(P,o) — цветные частицы: o.r=1.2, o.op=.85, o.glow=.5, o.t, o.size(i), o.alpha(i), o.color — цвет-строка,
 *     массив цветов (по hash точки) или функция i → цвет; без o.color — светлые тона палитры GFC.DOT (o.seed);
 *   GFC.hex(cx,cy,r,o) — шестиугольник: o.op=.85, o.w=.9, o.color (обводка, '#fff'; 'none' — без), o.fill ('none'),
 *     o.shadow (0..1, плоская тень), o.glow; у залитого — светотень GFC.shade;
 *   GFC.comb(cx,cy,r,cols,rows,o) — цветные соты: тонкая сетка + плитки; o.lit(i,x,y) 0..1 — плитка растёт и проявляется,
 *     o.op, o.w, o.grid=.24 (яркость сетки), o.gap=.84 (размер плитки), o.color(i,x,y) — цвет плитки (по умолчанию —
 *     переход бирюза → небо → фиалка → коралл → золото по диагонали сот);
 *   GFC.spark(x,y,r,o) — огонь порядка: шар с лучами, дышит, лучи медленно вращаются (o.t, o.op, o.warm=1 — ореол,
 *     o.rays=14, 0 — без лучей);
 *   GFC.mono(x,y,text,o) — мелкая подпись Montserrat 700 капсом (o.size=9, o.anchor='start', o.opacity=.9, o.color,
 *     o.ls — разрядка в долях кегля, o.maxW — ужать кегль под ширину, o.caps=false — без капса, o.shadow=1, o.glow);
 *     мелкие (< 16) растут в безопасной зоне, как UN.fs; GFC.label(x,y,text,o) — заголовок (22, по центру, капс);
 *     GFC.italic(x,y,text,o) — строчный текст Montserrat 600 (20) вместо курсива PT Serif основной версии;
 *   GFC.typed(x,y,text,t,t0,o) — печатается по буквам с t0 (o.cps=22, o.anchor='middle'), золотой курсор;
 *   GFC.thinker(text,t,t0,t1,o) — «ИМЯ · ТРУД · ГОД» вверху (o.y=54, кегль ужимается до o.maxW=300): печатается с t0,
 *     под ним растёт золотая черта, гаснет к t1;
 *   GFC.arrow(x0,y,x1,o) — горизонтальная стрелка (o.op, o.w=1.6, o.color); GFC.line(o) — линия времени ПРОШЛОЕ → БУДУЩЕЕ:
 *     цветная полоса (o.y=200, o.x0=40, o.x1=320, o.op=1, o.labels=1, o.now — доля «сейчас» с плашкой СЕЙЧАС или null);
 *     GFC.lx(o,q) — x доли q на линии;
 *   GFC.person(cx,groundY,h,o) — плоский человек ростом h (макушка на groundY−h, подошвы на groundY): o.color (0..4 или
 *     'coral'|'teal'|'sky'|'violet'|'gold', или цвет-строка), o.pose 'stand'|'raise'|'walk', o.opacity, o.t (дыхание, шаг);
 *     плавно: o.up 0..1 (руки вверх), o.walk 0..1 (шаг), o.dir ±1 (куда идёт), o.phase, o.speed=7 (рад/с шага),
 *     o.head=1 (размер головы, ребёнок — 1.25), o.shade 0..1 (в тени), o.lit 0..1 (тёплый свет), o.rim ±1 (тёплый ободок
 *     со стороны огня), o.shadow=1 (тень на земле), o.seed;
 *   GFC.wrap(svg,t=0) — фон (градиент и звёзды с запасом за краями кадра: x −400..760, y −640..1280) + сцена под мягкой
 *     маской (края 0..360 и низ y 340→405 гаснут под субтитры); мир помечен id="gfc-world";
 *   GFC.dissolve(a,b,q); GFC.zoom(svg,cx,cy,z,tx=cx,ty=cy) — как в GF;
 *   GFC.scene(name, body, o) — та же логика, что GF.scene: SCENES.имя = GFC.scene('имя', (t, K, mode, p) => svg).
 * Сверх GF (для переноса сцен без UN/TS): GFC.thread(a,b,o) и GFC.polyline(P,o) — нити (o.opacity=.4, o.width=.55,
 *   o.color, o.glow, o.close); GFC.beam(a,b,t,o) — нить-дуга с бегущей искрой (огонь → человек; o.bend=.25, o.speed=.42,
 *   o.phase, o.color, o.run=false — без искры); GFC.ground(cx,y,rx,ry,o) — мягкая площадка под людьми (o.op, o.warm —
 *   тёплый отсвет огня); GFC.anchors(cx,groundY,h,o) → {head, top, hands, feet, s} человека; GFC.fs(v) — кегль в зоне;
 *   GFC.textW(text,size,ls) — ширина строки Montserrat 700 (таблица знаков); GFC.mixC(a,b,k), GFC.ramp(u) — цвета;
 *   палитра GFC.PAL ([светлый, тёмный] × 7, v2), GFC.DOT, GFC.RAMP, GFC.INK, GFC.SUN, GFC.ACC.
 * Готовые заливки и фильтры (внутри GFC.wrap): url(#gfc-p0)…url(#gfc-p6) — градиенты палитры, url(#gfc-shade) — светотень
 *   поверх любой заливки, url(#gfc-halo) — тёплый ореол огня, url(#gfc-glowP) — розово-фиолетовое свечение,
 *   url(#gfc-ball) — шар огня, url(#gfc-shadow) — тень на земле, url(#gfc-ground) — площадка, url(#gfc-time) — полоса
 *   линии времени; фильтры url(#gfc-soft) (свечение 1,25), url(#gfc-blur) (тень 2,2), url(#gfc-tglow) (свечение текста).
 * Отличия от GF: wrap(svg,t) — второй аргумент t (мерцание звёзд; без него звёзды стоят); mono/typed/thinker — Montserrat
 *   капсом (не Plex), длинные строки ужимаются под o.maxW; person — плоская фигура, а не облако точек (облако — personPts);
 *   comb.lit проявляет плитку (а не яркость обводки); dots/hex/arrow/line принимают o.color; нет UN.sphere — огонь только
 *   spark; красный опасности — '#ff5a5f' (GFC.RED).
 * Субтитры и плашки движка — только при #gfc-world (CSS ниже): субтитры Montserrat 700 18/24 белые с мягкой тенью (кегль
 *   подобран так, что любая страница storybase — она меряет PT Serif Italic 24 — встаёт в 2 строки ширины cap); подпись-
 *   источник .part .un-src — плашка-таблетка; карточка конца .part .gf-card / .gf-small — цветная карточка с золотой точкой.
 *   В безопасной зоне (story.safe) у #stage снята маска краёв движка и открыт overflow: фон сцены заходит за края кадра,
 *   по краям экрана нет чёрных полос; края самой сцены гаснут маской GFC.wrap. runtime.js и storylib не меняются.
 * Кадр 360×640: важное y=20..345 (story.safe ужимает сцену в .72 и ставит в зону), ниже — фон под субтитры.
 * Проверка (станция tesla): ANIM_TEMPLATE=$HOME/Projects/anim-template-god python3 <serial-studio>/tools/remote_anim.py
 *   god_future_color_p1 -- scene_test.py gfc_style '{}' --dur 9 --at 1.5,4.5,8 --cam '{"z0":1,"z1":1,"drift":0,"kicks":0}'
 *   --out eps/god_future_color_p1/qa/gfc_style.jpg (без безопасной зоны); в зоне Reels — render.py --story с одним кадром
 *   gfc_style и safe/frame из build/story.json ролика: лист v2 — eps/god_future_color_p1/qa/lib_v2_style.jpg
 */
(() => {
  const WORLD = 'gfc-world';
  const FF = 'GFCMont, Mont, sans-serif';
  const css = document.createElement('style');
  const W = `#root:has(#${WORLD})`;
  css.textContent = `
    @font-face{font-family:GFCMont;src:url('../fonts/Montserrat[wght].ttf');font-weight:100 900}
    ${W}{background:#070a24}
    ${W} #grain{display:none}
    ${W} #vig{opacity:.22}
    ${W} #stage{overflow:visible}
    #root.safe:has(#${WORLD}) #stage{-webkit-mask-image:none;mask-image:none}
    ${W} #cap{font-family:GFCMont,Mont,sans-serif;font-weight:700;font-size:18px;line-height:24px;letter-spacing:0;text-transform:none}
    ${W} #cap .w,${W} #cap .w.on{color:#fff;margin:0 2.5px;text-shadow:0 1.5px 0 rgba(12,7,46,.85),0 0 5px rgba(9,6,38,.9),0 0 14px rgba(9,6,38,.75)}
    ${W} #cap .w.on.y{color:#ffd166}
    ${W} #cap .w.on.r{color:#ff7a7a}
    ${W} .part{font-family:GFCMont,Mont,sans-serif;font-weight:700;text-transform:none}
    ${W} .part .un-src{display:inline-block;font-family:GFCMont,Mont,sans-serif;font-weight:600;font-size:11px;line-height:14px;
      letter-spacing:.1px;color:#ffe6a8;white-space:nowrap;background:rgba(20,11,60,.82);border:1px solid rgba(255,209,102,.55);
      border-radius:10px;padding:2px 8px 1px;box-shadow:0 3px 10px rgba(5,3,26,.55)}
    ${W} .part .gf-card{display:inline-block;font-family:GFCMont,Mont,sans-serif;font-weight:800;font-size:13.5px;line-height:1.3;
      letter-spacing:.4px;text-transform:uppercase;color:#fff;padding:11px 14px 11px;border-radius:14px;
      background:linear-gradient(160deg,rgba(84,38,160,.94),rgba(30,34,116,.94));border:1px solid rgba(255,255,255,.24);
      box-shadow:0 8px 22px rgba(6,4,30,.6),inset 0 1px 0 rgba(255,255,255,.2);text-shadow:0 1.5px 0 rgba(12,7,46,.6)}
    ${W} .part .gf-card::before{content:"";display:block;width:11px;height:11px;margin:0 auto 7px;border-radius:50%;
      background:radial-gradient(circle at 40% 38%,#fffbe8 0,#ffe27a 38%,#ffb23d 75%,#ff8a3d 100%);box-shadow:0 0 10px 3px rgba(255,180,70,.55)}
    ${W} .part .gf-small{display:block;font-family:GFCMont,Mont,sans-serif;font-weight:600;font-size:13px;line-height:1.3;
      letter-spacing:.1px;text-transform:none;color:#cfd2ff;margin-top:7px;text-shadow:none}
    ${W} .part .gf-view{display:inline-block;font-family:GFCMont,Mont,sans-serif;font-weight:800;font-size:16px;letter-spacing:1.5px;color:#fff;padding:6px 14px 5px;border-radius:999px;background:linear-gradient(90deg,#ff8a3d,#ffb347);box-shadow:0 4px 14px rgba(0,0,0,.35)}
  `;
  document.head.appendChild(css);
  try {   // шрифт грузится сразу: render.py ждёт document.fonts.ready до первого кадра
    const face = new FontFace('GFCMont', "url('../fonts/Montserrat[wght].ttf')", { weight: '100 900' });
    document.fonts.add(face); face.load().catch(() => {});
  } catch (e) { /* без FontFace — останется @font-face */ }

  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const H = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const noise = x => { const i = Math.floor(x), u = x - i, k = u * u * (3 - 2 * u); return (H(i) + (H(i + 1) - H(i)) * k) * 2 - 1; };
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const lerp = (a, b, q) => a + (b - a) * q;
  const frac = x => x - Math.floor(x);
  const TAU = Math.PI * 2;
  const bare = w => String(w).toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '');

  /* ---------------- цвета ---------------- */
  const INK = '#12072e', SUN = '#ffd36b', ACC = '#ffd166', GOLD = '#ffc94a', RED = '#ff5a5f';
  // [светлый, тёмный]; 0..4 — как в v1 (коралл, бирюза, небо, фиалка, золото), v2 добавил 5 — розовый, 6 — зелёный
  const PAL = Object.freeze([['#ff9d8f', '#e8505b'], ['#63e6d2', '#17998f'], ['#8ccbff', '#3b6fe0'], ['#eba2ff', '#9547d6'], ['#ffe27a', '#ff9a3d'],
    ['#ffa6d6', '#e0559a'], ['#95e67c', '#2f9e5e']].map(p => Object.freeze(p)));
  const NAME = Object.freeze({ coral: 0, teal: 1, sky: 2, violet: 3, gold: 4, pink: 5, green: 6 });
  const CROWD = Object.freeze([0, 1, 2, 5, 6, 3]);           // цвета людей и значков по seed: без золота (золото — «тот самый»)
  const pick = (seed = 0) => { const k = Number.isInteger(+seed) ? +seed : Math.floor(H(+seed * 7.31 + 2) * 600) || 0; return CROWD[((k % CROWD.length) + CROWD.length) % CROWD.length]; };
  const DOT = Object.freeze(PAL.map(p => p[0]));
  const RAMP = Object.freeze(['#2fc9b6', '#4f9bf2', '#a66ef0', '#f0708a', '#ffb547']);
  const rgb = c => {
    c = String(c).trim();
    if (c[0] === '#') { if (c.length === 4) c = '#' + [...c.slice(1)].map(x => x + x).join(''); return [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); }
    const m = c.match(/\d+(\.\d+)?/g); return m ? m.slice(0, 3).map(Number) : [255, 255, 255];
  };
  const mixC = (a, b, k) => { const A = rgb(a), B = rgb(b); k = clamp(k); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; };
  const ramp = (u, cols = RAMP) => { u = clamp(u) * (cols.length - 1); const i = Math.min(cols.length - 2, Math.floor(u)); return mixC(cols[i], cols[i + 1], u - i); };
  function paint(c) {
    if (c == null) c = 0;
    if (typeof c === 'string' && NAME[c] != null) c = NAME[c];
    if (typeof c === 'number') { const i = ((Math.round(c) % PAL.length) + PAL.length) % PAL.length; return { fill: `url(#gfc-p${i})`, dark: PAL[i][1], light: PAL[i][0], grad: true }; }
    return { fill: c, dark: mixC(c, INK, .32), light: mixC(c, '#ffffff', .25), grad: false };
  }

  /* ---------------- текст: Montserrat 700, ширина — по таблице знаков (доли кегля ×1000, замер PIL на станции) ---------------- */
  const ADV_C = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz0123456789 .,:;!?«»—–-·()\'"/%+=…№°×→←↑↓';
  const ADV_V = [799, 738, 745, 593, 831, 673, 673, 1079, 652, 821, 821, 735, 799, 963, 817, 842, 812, 724, 726, 637, 724, 950, 722, 841, 729,
    1098, 1130, 845, 1028, 721, 714, 1114, 734, 604, 673, 622, 514, 701, 643, 643, 913, 562, 710, 710, 642, 666, 815, 694, 654, 685, 694, 592,
    535, 614, 849, 592, 704, 634, 971, 971, 682, 859, 605, 590, 903, 628, 766, 765, 724, 826, 671, 639, 771, 808, 328, 541, 740, 604, 955, 808,
    844, 732, 844, 735, 638, 618, 788, 746, 1163, 714, 676, 671, 617, 690, 591, 692, 631, 387, 700, 691, 301, 307, 655, 301, 1049, 691, 655,
    690, 690, 431, 531, 435, 687, 598, 937, 595, 598, 543, 679, 392, 590, 592, 689, 595, 637, 620, 660, 637, 283, 262, 262, 262, 262, 289, 589,
    568, 568, 1000, 500, 386, 302, 357, 358, 230, 437, 392, 877, 599, 599, 798, 1217, 418, 599, 600, 600, 600, 600];
  const ADV = new Map();
  [...ADV_C].forEach((c, i) => ADV.set(c, ADV_V[i] ?? 640));
  const textW = (s, size, ls = 0) => { let w = 0, n = 0; for (const c of String(s)) { w += ADV.get(c) ?? 640; n++; } return w / 1000 * size + ls * n; };
  // Safe zone (story.safe, runtime.js): small labels (< 16) grow by story.safe.text up to 16, as UN.fs.
  const fs = v => { const k = (typeof S !== 'undefined' && S && S.safe && S.safe.text) || 1; return k === 1 || v >= 16 ? v : Math.min(16, v * k); };
  const MONO = { size: 9, anchor: 'start', op: .9, caps: true, ls: .12, weight: 700, color: '#fff' };
  const LABEL = { size: 22, anchor: 'middle', op: 1, caps: true, ls: .03, weight: 700, color: '#fff' };
  const ITALIC = { size: 20, anchor: 'start', op: .9, caps: false, ls: 0, weight: 600, color: '#fff' };
  function fit(s, o, d) {
    const caps = o.caps ?? d.caps, up = v => caps ? String(v).toUpperCase() : String(v);
    const str = up(s);
    let size = o.grow === false ? (o.size ?? d.size) : fs(o.size ?? d.size);
    const em = o.ls ?? d.ls, maxW = o.maxW ?? d.maxW;
    if (maxW) { const w = textW(o.fit != null ? up(o.fit) : str, size, size * em); if (w > maxW) size *= maxW / w; }
    return { str, size, ls: size * em, anchor: o.anchor ?? d.anchor };
  }
  function text(x, y, s, o, d) {
    const op = o.opacity ?? o.op ?? d.op;
    if (op <= .003 || s == null || s === '') return '';
    const m = fit(s, o, d);
    const xx = x + (m.anchor === 'middle' ? m.ls / 2 : m.anchor === 'end' ? m.ls : 0);   // разрядка висит после последней буквы
    const at = `x="${f(xx)}" font-family="${FF}" font-weight="${o.weight ?? d.weight}" font-size="${f(m.size)}" letter-spacing="${f(m.ls)}" text-anchor="${m.anchor}"`;
    const sh = o.shadow ?? 1, dy = Math.max(.7, m.size * .085);
    return `<g opacity="${f(op)}">${sh > 0 ? `<text ${at} y="${f(y + dy)}" fill="${INK}" opacity="${f(.55 * sh)}">${esc(m.str)}</text>` : ''}` +
      `<text ${at} y="${f(y)}" fill="${o.color ?? d.color}"${o.glow ? ' filter="url(#gfc-tglow)"' : ''}>${esc(m.str)}</text></g>`;
  }
  const mono = (x, y, s, o = {}) => text(x, y, s, o, MONO);
  const label = (x, y, s, o = {}) => text(x, y, s, o, LABEL);
  const italic = (x, y, s, o = {}) => text(x, y, s, o, ITALIC);

  /* ---------------- время от слов (как GF) ---------------- */
  const T = (K, pid) => (K && K[pid] != null) ? K[pid] : 0;
  const TE = (K, pid) => (K && K[pid + '_end'] != null) ? K[pid + '_end'] : T(K, pid) + 3;
  function word(K, pid, stem, n = 0, end = false) {
    const ws = (K && K.words && K.words[pid]) || [];
    const s = bare(stem);
    const hit = ws.filter(w => bare(w.w).startsWith(s));
    if (hit.length > n) return end ? hit[n].t1 : hit[n].t0;
    return T(K, pid) + n * .4 + (end ? .4 : 0);
  }
  const w = (K, pid, stem, n = 0) => word(K, pid, stem, n, false);
  const we = (K, pid, stem, n = 0) => word(K, pid, stem, n, true);
  const q = (t, a, dur = .6) => ease((t - a) / Math.max(.001, dur));
  const qq = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const out = (t, a, dur = .6) => 1 - q(t, a, dur);

  /* ---------------- точки (формулы GF) ---------------- */
  function cloud(n, seed = 1, box = [20, 30, 340, 340]) {
    const [x0, y0, x1, y1] = box, P = [];
    for (let i = 0; i < n; i++) P.push([lerp(x0, x1, H(seed * 991 + i * 7.13)), lerp(y0, y1, H(seed * 577 + i * 3.71 + 9))]);
    return P;
  }
  function lattice(cx, cy, r, cols, rows) {
    const dx = Math.sqrt(3) * r, dy = 1.5 * r, C = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++)
      C.push([cx + (i - (cols - 1) / 2) * dx + (j % 2 ? dx / 2 : 0) - dx / 4, cy + (j - (rows - 1) / 2) * dy]);
    return C;
  }
  const hexV = (cx, cy, r) => [0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k - Math.PI / 2; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const hexD = (cx, cy, r) => 'M' + hexV(cx, cy, r).map(v => `${f(v[0])} ${f(v[1])}`).join(' L') + ' Z';
  function hexPts(cx, cy, r, cols, rows) {
    const seen = new Set(), P = [];
    const add = p => { const k = Math.round(p[0] * 2) + ',' + Math.round(p[1] * 2); if (!seen.has(k)) { seen.add(k); P.push(p); } };
    for (const c of lattice(cx, cy, r, cols, rows)) {
      const V = hexV(c[0], c[1], r);
      V.forEach((v, k) => { add(v); const u = V[(k + 1) % 6]; add([(v[0] + u[0]) / 2, (v[1] + u[1]) / 2]); });
    }
    return P;
  }
  function personPts(cx, gy, h, n = 240, seed = 1) {
    // доли: голова 14 %, туловище 36 %, руки 22 %, ноги 28 %; ось y вниз, подошвы на gy
    const P = [], s = h / 100;
    for (let i = 0; i < n; i++) {
      const a = H(seed * 31 + i * 1.7), b = H(seed * 53 + i * 2.9), c = H(seed * 71 + i * 4.3);
      let x, y;
      if (i < n * .14) { const r = 7.2 * Math.sqrt(a), th = b * 6.283; x = r * Math.cos(th); y = -91 + r * 1.12 * Math.sin(th); }
      else if (i < n * .50) { y = -80 + a * 34; const wdt = 10.5 - Math.abs(y + 66) * .05; x = (b * 2 - 1) * wdt; }
      else if (i < n * .72) { const side = c < .5 ? -1 : 1, u = a; x = side * (11 + u * 6.5) + (b - .5) * 2.6; y = -78 + u * 31 + (b - .5) * 2; }
      else { const side = c < .5 ? -1 : 1, u = a; x = side * (3.2 + u * 2.6) + (b - .5) * 3.4; y = -46 + u * 46; }
      P.push([cx + x * s, gy + y * s]);
    }
    return P;
  }
  function jitter(P, t, amp = 2, seed = 3) {
    return P.map((p, i) => [p[0] + amp * Math.sin(t * (1.3 + H(i + seed) * 1.9) + i * 2.1),
                            p[1] + amp * Math.cos(t * (1.1 + H(i * 3 + seed) * 1.7) + i * 1.3)]);
  }
  function drift(P, t, t0, speed = 18, seed = 5) {
    const d = Math.max(0, t - t0);
    return P.map((p, i) => { const a = H(i * 13 + seed) * 6.283, v = speed * (.4 + H(i * 7 + seed)); return [p[0] + Math.cos(a) * v * d, p[1] + Math.sin(a) * v * d * .8]; });
  }
  function morph(A, B, qv, t = 0, o = {}) {
    const spread = o.spread ?? .35, amp = o.amp ?? 3, n = Math.max(A.length, B.length);
    const R = [];
    for (let i = 0; i < n; i++) {
      const a = A[i % A.length], b = B[i % B.length];
      const d = H(i * 17 + (o.seed ?? 2)) * spread;
      const u = ease((qv - d) / Math.max(.001, 1 - spread));
      const bend = Math.sin(u * Math.PI) * (o.bend ?? 14) * (H(i * 5 + 1) - .5);
      const ch = (1 - u) * amp;
      R.push([lerp(a[0], b[0], u) + bend + ch * Math.sin(t * 1.7 + i), lerp(a[1], b[1], u) - bend * .6 + ch * Math.cos(t * 1.3 + i * .7)]);
    }
    return R;
  }
  // цветные частицы: группы по цвету, мягкое свечение — размытая копия
  function dots(P, o = {}) {
    const r = o.r ?? 1.2, op = o.op ?? .85, t = o.t ?? 0, col = o.color, seed = o.seed ?? 0;
    if (op <= .003 || !P || !P.length) return '';
    const list = Array.isArray(col) ? col : DOT;
    const groups = new Map();
    for (let i = 0; i < P.length; i++) {
      const p = P[i]; if (p[0] < -10 || p[0] > 370 || p[1] < -10 || p[1] > 650) continue;
      const a = op * (.78 + .22 * Math.sin(t * 2.1 + i * 1.37)) * (o.alpha ? o.alpha(i) : 1);
      if (a <= .003) continue;
      const c = typeof col === 'string' ? col : typeof col === 'function' ? col(i) : list[Math.floor(H(i * 7.31 + seed * 13.7) * list.length) % list.length];
      groups.set(c, (groups.get(c) || '') + `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r * (o.size ? o.size(i) : 1))}" opacity="${f(a)}"/>`);
    }
    let s = '';
    for (const [c, v] of groups) s += `<g fill="${c}">${v}</g>`;
    const g = o.glow ?? .5;
    return (g > 0 ? `<g filter="url(#gfc-soft)" opacity="${f(g)}">${s}</g>` : '') + s;
  }

  /* ---------------- рисунки ---------------- */
  function hex(cx, cy, r, o = {}) {
    const op = o.op ?? .85; if (op <= .003) return '';
    const d = hexD(cx, cy, r), fill = o.fill ?? 'none';
    let s = o.shadow ? `<path d="${hexD(cx + r * .05, cy + r * .13, r)}" fill="${INK}" opacity="${f(.38 * o.shadow)}"/>` : '';
    s += `<path d="${d}" fill="${fill}" stroke="${o.color ?? '#fff'}" stroke-width="${o.w ?? .9}" stroke-linejoin="round"${o.glow ? ' filter="url(#gfc-soft)"' : ''}/>`;
    if (fill !== 'none' && o.shade !== false) s += `<path d="${d}" fill="url(#gfc-shade)"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  function comb(cx, cy, r, cols, rows, o = {}) {
    const C = lattice(cx, cy, r, cols, rows), op = o.op ?? 1;
    if (op <= .003) return '';
    const grid = o.grid ?? .24, gap = o.gap ?? .84;
    const sx = Math.max(1, (cols - .5) * Math.sqrt(3) * r / 2), sy = Math.max(1, (rows - 1) * .75 * r + r);
    let gd = '', sh = '', tiles = '';
    C.forEach((c, i) => {
      const l = o.lit ? clamp(o.lit(i, c[0], c[1])) : 1; if (l <= .003) return;
      gd += hexD(c[0], c[1], r) + ' ';
      const k = ease(l), rr = r * gap * (.5 + .5 * k);
      const col = o.color ? o.color(i, c[0], c[1]) : ramp(.5 + .36 * (c[0] - cx) / sx + .22 * (c[1] - cy) / sy);
      sh += `<path d="${hexD(c[0] + r * .04, c[1] + r * .12, rr)}" opacity="${f(.42 * k)}"/>`;
      const d = hexD(c[0], c[1], rr);
      tiles += `<g opacity="${f(k)}"><path d="${d}" fill="${col}"/><path d="${d}" fill="url(#gfc-shade)"/>` +
        `<path d="${hexD(c[0], c[1], rr * .99)}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width=".7" stroke-linejoin="round"/></g>`;
    });
    const gridS = grid > 0 && gd ? `<path d="${gd}" fill="none" stroke="#fff" stroke-opacity="${f(grid)}" stroke-width="${o.w ?? .6}" stroke-linejoin="round"/>` : '';
    return `<g opacity="${f(op)}">${gridS}<g fill="${INK}" filter="url(#gfc-soft)">${sh}</g>${tiles}</g>`;
  }
  // огонь порядка: шар с лучами, дышит, лучи медленно вращаются (проба gfx_flatcolor, sun)
  function spark(x, y, r, o = {}) {
    const op = o.op ?? 1; if (op <= .003) return '';
    const t = o.t ?? 0, warm = o.warm ?? 1, n = o.rays ?? 14;
    const pulse = 1 + .06 * Math.sin(t * 3.1) + .03 * noise(t * 5);
    let s = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 4.4 * pulse)}" fill="url(#gfc-halo)" opacity="${f(warm)}"/>`;
    const rot = t * .24;
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU + rot, long = i % 2 ? .5 : 1;
      const r0 = r * 1.38, r1 = r * (1.38 + .8 * long * (.88 + .12 * Math.sin(t * 4 + i)));
      s += `<line x1="${f(x + r0 * Math.cos(a))}" y1="${f(y + r0 * Math.sin(a))}" x2="${f(x + r1 * Math.cos(a))}" y2="${f(y + r1 * Math.sin(a))}" stroke="${SUN}" stroke-width="${f(Math.max(.7, r * .17))}" stroke-linecap="round" opacity=".9"/>`;
    }
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 1.16 * pulse)}" fill="#ffb84a" opacity=".35"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#gfc-ball)"/>` +
      `<circle cx="${f(x - r * .34)}" cy="${f(y - r * .36)}" r="${f(r * .26)}" fill="#fffdf2" opacity=".85"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  function typed(x, y, s, t, t0, o = {}) {
    if (t < t0) return '';
    const str = String(s), n = Math.min(str.length, Math.floor((t - t0) * (o.cps ?? 22)) + 1);
    const opts = { size: o.size ?? 10, anchor: o.anchor ?? 'middle', opacity: o.op ?? .92, color: o.color, glow: o.glow, ls: o.ls,
      maxW: o.maxW, fit: str, caps: o.caps, weight: o.weight, shadow: o.shadow };
    let r = mono(x, y, str.slice(0, n), opts);
    if (n < str.length && Math.floor(t * 3) % 2 === 0) {
      const m = fit(str.slice(0, n), opts, MONO), wd = textW(m.str, m.size, m.ls);
      const right = m.anchor === 'middle' ? x + wd / 2 : m.anchor === 'end' ? x : x + wd;
      r += `<rect x="${f(right + m.size * .1)}" y="${f(y - m.size * .76)}" width="${f(Math.max(.8, m.size * .12))}" height="${f(m.size * .9)}" rx="${f(m.size * .05)}" fill="${ACC}" opacity="${f(opts.opacity)}"/>`;
    }
    return r;
  }
  function thinker(s, t, t0, t1, o = {}) {
    const op = (o.op ?? 1) * (t1 != null ? out(t, t1 - .5, .5) : 1);
    if (t < t0 || op <= .003) return '';
    const y = o.y ?? 54, opts = { size: o.size ?? 9.5, cps: o.cps ?? 30, maxW: o.maxW ?? 300, ls: o.ls ?? .14, color: o.color };
    const m = fit(s, { ...opts, fit: s }, MONO), W2 = textW(m.str, m.size, m.ls) / 2;
    const L = Math.min(W2 + 4, 160) * q(t, t0, .6), ly = y + Math.max(5.5, m.size * .62);
    return `<g opacity="${f(op)}">${typed(180, y, s, t, t0, opts)}` +
      (L > .2 ? `<rect x="${f(180 - L)}" y="${f(ly - .65)}" width="${f(2 * L)}" height="1.3" rx=".65" fill="url(#gfc-uline)"/>` : '') +
      `<circle cx="180" cy="${f(ly)}" r="${f(1.9 * q(t, t0, .4))}" fill="${ACC}"/></g>`;
  }
  // v2: крупный заголовок сверху, как в образце. Строки — через «/», *слово* — акцент: золото GOLD, крупнее (o.big), тёплое
  // свечение. Montserrat 800 капсом; строка шире o.maxW ужимается целиком. Ширина 800 — таблица 700 × W800.
  const W800 = 1.035;
  function headBox(s, o = {}) {
    const size = o.size ?? 26, big = o.big ?? 1.5, maxW = o.maxW ?? 300, ls = o.ls ?? .02, caps = o.caps ?? true;
    const lines = String(s ?? '').split('/').map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean).map(line => {
      const segs = line.split('*').map((tx, i) => ({ tx: caps ? tx.toUpperCase() : tx, acc: i % 2 === 1 })).filter(g => g.tx !== '');
      let w = 0;
      segs.forEach(g => { g.size = size * (g.acc ? big : 1); w += textW(g.tx, g.size, g.size * ls) * W800; });
      const k = w > maxW ? maxW / w : 1;
      segs.forEach(g => { g.size *= k; g.ls = g.size * ls; });
      return { segs, w: w * k, size: Math.max(...segs.map(g => g.size)) };
    });
    let y = Math.max(50, o.y ?? 70);                       // выше 50 — под интерфейсом Reels
    lines.forEach((L, i) => { if (i) y += .74 * L.size + (o.gap ?? .5) * lines[i - 1].size; L.y = y; });
    const a = lines[0], b = lines[lines.length - 1];
    return { lines, y0: a ? a.y - .74 * a.size : y, y1: b ? b.y + .22 * b.size : y };
  }
  function headline(s, t, t0 = 0, t1 = null, o = {}) {
    if (s == null || s === '' || t < t0) return '';
    const op = (o.op ?? o.opacity ?? 1) * (t1 != null ? out(t, t1 - .35, .35) : 1);
    if (op <= .003) return '';
    const B = headBox(s, o), x = o.x ?? 180, dur = o.dur ?? .3, stag = o.stagger ?? .1, glow = o.glow ?? 1;
    const col = o.color ?? '#fff', acc = o.accent ?? GOLD;
    const at = `x="${f(x)}" text-anchor="middle" font-family="${FF}" font-weight="${o.weight ?? 800}"`;
    const spans = (L, fill) => L.segs.map(g => `<tspan font-size="${f(g.size)}" letter-spacing="${f(g.ls)}"${fill ? ` fill="${fill(g)}"` : ''}>${esc(g.tx)}</tspan>`).join('');
    let sh = '', gl = '', tx = '';
    B.lines.forEach((L, i) => {
      const k = q(t, t0 + i * stag, dur); if (k <= .003) return;
      const y = L.y + 8 * (1 - k);
      sh += `<text ${at} y="${f(y + Math.max(1, L.size * .075))}" fill="${INK}" opacity="${f(k)}">${spans(L)}</text>`;
      if (glow > .003 && L.segs.some(g => g.acc)) gl += `<text ${at} y="${f(y)}" opacity="${f(k)}">${spans(L, g => g.acc ? '#ffa040' : 'none')}</text>`;
      tx += `<text ${at} y="${f(y)}" opacity="${f(k)}">${spans(L, g => g.acc ? acc : col)}</text>`;
    });
    return `<g opacity="${f(op)}"><g filter="url(#gfc-hblur)" opacity=".7">${sh}</g><g opacity=".55">${sh}</g>` +
      (gl ? `<g filter="url(#gfc-glow3)" opacity="${f(.75 * glow)}">${gl}</g>` : '') + tx + '</g>';
  }

  // v2: значки для GFC.node — белые рисунки в круге радиуса 16 (поле ±10); c — цвет значка, d — тёмный цвет круга (детали)
  const STAR5 = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 3.9 : 9.4; return `${f(r * Math.cos(a))} ${f(r * Math.sin(a) + .7)}`; }).join(' L');
  const ICONS = Object.freeze({
    book: (c, d) => `<path d="M-.9 -5.6 C-3.6 -7.6 -7.2 -7.8 -9.8 -6.8 L-9.8 6.4 C-7.2 5.4 -3.6 5.6 -.9 7.4 Z M.9 -5.6 C3.6 -7.6 7.2 -7.8 9.8 -6.8 L9.8 6.4 C7.2 5.4 3.6 5.6 .9 7.4 Z" fill="${c}"/>` +
      `<path d="M-7.8 -3.4 L-3.2 -2.7 M-7.8 -.4 L-3.2 .3 M-7.8 2.6 L-3.2 3.3 M3.2 -2.7 L7.8 -3.4 M3.2 .3 L7.8 -.4 M3.2 3.3 L7.8 2.6" stroke="${d}" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>`,
    heart: c => `<path d="M0 8.2 C-6.4 3.8 -9.8 .4 -9.8 -3.2 C-9.8 -6.4 -7.4 -8.4 -4.8 -8.4 C-2.8 -8.4 -1 -7.2 0 -5.2 C1 -7.2 2.8 -8.4 4.8 -8.4 C7.4 -8.4 9.8 -6.4 9.8 -3.2 C9.8 .4 6.4 3.8 0 8.2 Z" fill="${c}"/>`,
    scales: c => `<path d="M0 -6.6 L0 7 M-4.6 7.6 L4.6 7.6 M-8.2 -4.8 L8.2 -4.8 M-8.2 -4.8 L-10.8 1.4 M-8.2 -4.8 L-5.6 1.4 M8.2 -4.8 L5.6 1.4 M8.2 -4.8 L10.8 1.4" stroke="${c}" stroke-width="1.7" stroke-linecap="round" fill="none"/>` +
      `<path d="M-11.6 1.2 Q-8.2 6 -4.8 1.2 Z M4.8 1.2 Q8.2 6 11.6 1.2 Z" fill="${c}"/><circle cy="-7.4" r="1.7" fill="${c}"/>`,
    star: c => `<path d="M${STAR5} Z" fill="${c}" stroke="${c}" stroke-width="1.3" stroke-linejoin="round"/>`,
    leaf: (c, d) => `<path d="M-7.8 7.8 C-9 -1.6 -2.6 -9 8.6 -8.6 C9 2.2 2.4 8.8 -7.8 7.8 Z" fill="${c}"/>` +
      `<path d="M-7.8 7.8 Q-1.2 1.2 5.4 -5.4 M-1.8 1.8 L-2.4 -2.8 M1.8 -1.8 L5.2 -1.2" stroke="${d}" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".75"/>`,
    drop: (c, d) => `<path d="M0 -9.6 C3.6 -4.6 7.2 -.8 7.2 2.9 C7.2 7 4 9.4 0 9.4 C-4 9.4 -7.2 7 -7.2 2.9 C-7.2 -.8 -3.6 -4.6 0 -9.6 Z" fill="${c}"/>` +
      `<path d="M-3.8 3.2 C-3.8 5.2 -2.6 6.5 -.8 6.9" stroke="${d}" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".6"/>`,
    plus: c => `<rect x="-2.5" y="-8.6" width="5" height="17.2" rx="2.5" fill="${c}"/><rect x="-8.6" y="-2.5" width="17.2" height="5" rx="2.5" fill="${c}"/>`,
    question: c => `<text y="7" font-family="${FF}" font-weight="800" font-size="20" text-anchor="middle" fill="${c}">?</text>`,
    flame: (c, d) => `<path d="M0 -9.8 C3 -5.6 7.2 -2.8 7.2 2.6 C7.2 6.8 4 9.4 0 9.4 C-4 9.4 -7.2 6.8 -7.2 2.6 C-7.2 -.6 -5.4 -2.6 -3.9 -4.3 C-3.7 -1.6 -2.5 0 -1 .5 C-1.6 -3.6 -1 -6.9 0 -9.8 Z" fill="${c}"/>` +
      `<path d="M0 1.2 C1.9 3.2 3.3 4.6 3.3 6.2 C3.3 7.8 1.9 8.8 0 8.8 C-1.9 8.8 -3.3 7.8 -3.3 6.2 C-3.3 4.6 -1.9 3.2 0 1.2 Z" fill="${d}" opacity=".5"/>`,
    human: c => `<circle cy="-7.4" r="4.2" fill="${c}"/><path d="M-6.4 9 L-5.4 -.8 C-5 -2.7 -3.2 -3.4 0 -3.4 C3.2 -3.4 5 -2.7 5.4 -.8 L6.4 9 Z" fill="${c}"/>`,
    cell: c => `<circle r="8.5" fill="none" stroke="${c}" stroke-width="1.9"/><circle cx="1.6" cy="-1.2" r="3.3" fill="${c}"/><circle cx="-3.6" cy="3.2" r="1.2" fill="${c}" opacity=".85"/><circle cx="-2.4" cy="-4.4" r=".9" fill="${c}" opacity=".85"/>`,
    fish: c => `<path d="M9 0 C5.5 -5.4 -2.5 -5.6 -6 0 C-2.5 5.6 5.5 5.4 9 0 Z M-5 0 L-11.5 -5.4 L-9.6 0 L-11.5 5.4 Z M-.5 -4.4 L3 -7.6 L4.2 -3.8 Z" fill="${c}"/>`,
    eye: (c, d) => `<path d="M-10.4 0 C-6.6 -6.6 6.6 -6.6 10.4 0 C6.6 6.6 -6.6 6.6 -10.4 0 Z" fill="${c}"/><circle r="3.9" fill="${d}"/><circle cx="-1.2" cy="-1.2" r="1.2" fill="${c}"/>`,
  });
  // v2: цветной кружок со значком (как значки на ветвях в образце): o.color (номер/имя PAL или цвет-строка; без него — по
  // o.seed, как у людей), o.op, o.scale (1; появление — 0→1), o.glow=1 (мягкое свечение цвета круга), o.shadow=1 (тень под
  // кругом), o.ink='#fff' (цвет значка), o.ring=1 (светлая обводка). icon — имя из GFC.ICONS, свой SVG (строка с «<», поле ±10
  // при r=16) или короткий текст («150», «?», «1»).
  function node(x, y, r, icon, o = {}) {
    const op = o.op ?? o.opacity ?? 1, sc = o.scale ?? 1;
    if (op <= .003 || sc <= .003 || !(r > 0)) return '';
    const C = paint(o.color ?? pick(o.seed ?? 1)), k = r / 16, ink = o.ink ?? '#fff';
    const glow = o.glow ?? 1, shadow = o.shadow ?? 1, ring = o.ring ?? 1;
    let s = shadow > .003 ? `<ellipse cx="${f(r * .12)}" cy="${f(r * .98)}" rx="${f(r * .78)}" ry="${f(r * .2)}" fill="#0a0626" opacity="${f(.5 * shadow)}" filter="url(#gfc-blur)"/>` : '';
    if (glow > .003) s += `<circle r="${f(r * 1.45)}" fill="${C.light}" opacity="${f(.3 * glow)}" filter="url(#gfc-glow3)"/>`;
    s += `<circle r="${f(r)}" fill="${C.fill}"/><circle r="${f(r)}" fill="url(#gfc-shade)"/>`;
    if (ring > .003) s += `<circle r="${f(r - .8 * k)}" fill="none" stroke="${mixC(C.light, '#ffffff', .5)}" stroke-width="${f(1.5 * k)}" opacity="${f(.8 * ring)}"/>`;
    s += `<path d="M${f(-r * .62)} ${f(-r * .36)} A${f(r * .72)} ${f(r * .72)} 0 0 1 ${f(-r * .1)} ${f(-r * .71)}" fill="none" stroke="#fff" stroke-width="${f(1.3 * k)}" stroke-linecap="round" opacity=".38"/>`;
    let ic = '';
    if (typeof icon === 'function') ic = icon(ink, C.dark);
    else if (icon != null && ICONS[icon]) ic = ICONS[icon](ink, C.dark);
    else if (icon != null && String(icon).trim()[0] === '<') ic = String(icon);
    else if (icon != null && icon !== '') {
      const str = String(icon).toUpperCase(), sz = Math.min(15, 24 / Math.max(.01, textW(str, 1) * W800));
      ic = `<text y="${f(sz * .36)}" font-family="${FF}" font-weight="800" font-size="${f(sz)}" text-anchor="middle" fill="${ink}">${esc(str)}</text>`;
    }
    if (ic) s += `<g transform="scale(${k.toFixed(4)})">${ic}</g>`;
    return `<g opacity="${f(op)}" transform="translate(${f(x)} ${f(y)}) scale(${(+sc).toFixed(4)})">${s}</g>`;
  }

  function arrow(x0, y, x1, o = {}) {
    const op = o.op ?? .8; if (op <= .003) return '';
    const wd = o.w ?? 1.6, c = o.color ?? '#fff', d = Math.sign(x1 - x0) || 1, hl = 4 + wd * 2.2, hw = 2.4 + wd * 1.5;
    return `<g opacity="${f(op)}"><line x1="${f(x0)}" y1="${f(y)}" x2="${f(x1 - d * hl * .6)}" y2="${f(y)}" stroke="${c}" stroke-width="${f(wd)}" stroke-linecap="round"/>` +
      `<path d="M${f(x1)} ${f(y)} L${f(x1 - d * hl)} ${f(y - hw)} L${f(x1 - d * hl)} ${f(y + hw)} Z" fill="${c}" stroke="${c}" stroke-width="${f(wd * .6)}" stroke-linejoin="round"/></g>`;
  }
  // линия времени: цветная полоса, засечки, ПРОШЛОЕ → БУДУЩЕЕ, плашка СЕЙЧАС
  function line(o = {}) {
    const y = o.y ?? 200, x0 = o.x0 ?? 40, x1 = o.x1 ?? 320, op = o.op ?? 1;
    if (op <= .003) return '';
    const hl = 9, end = '#ff8a6b';
    let s = `<rect x="${f(x0 - 1)}" y="${f(y + 1.2)}" width="${f(Math.max(1, x1 - x0 - hl + 3))}" height="4" rx="2" fill="${INK}" opacity=".45"/>` +
      `<rect x="${f(x0 - 1)}" y="${f(y - 2)}" width="${f(Math.max(1, x1 - x0 - hl + 3))}" height="4" rx="2" fill="url(#gfc-time)"/>` +
      `<path d="M${f(x1)} ${f(y)} L${f(x1 - hl)} ${f(y - 5.5)} L${f(x1 - hl)} ${f(y + 5.5)} Z" fill="${end}" stroke="${end}" stroke-width="1.6" stroke-linejoin="round"/>`;
    for (let i = 0; i <= 10; i++) {
      const x = lerp(x0 + 2, x1 - hl - 3, i / 10);
      s += `<line x1="${f(x)}" x2="${f(x)}" y1="${f(y + 4.5)}" y2="${f(y + (i % 5 ? 7 : 9))}" stroke="#fff" stroke-width=".8" stroke-linecap="round" opacity=".5"/>`;
    }
    const lab = o.labels ?? 1;
    if (lab > 0) {
      s += mono(x0, y + 22, 'ПРОШЛОЕ', { size: 9, anchor: 'start', opacity: .92 * lab, color: '#7ff0de' });
      s += mono(x1, y + 22, 'БУДУЩЕЕ', { size: 9, anchor: 'end', opacity: .92 * lab, color: ACC });
    }
    if (o.now != null) {
      const x = lerp(x0, x1, o.now), m = fit('СЕЙЧАС', { size: 8.5 }, MONO);
      const pw = textW(m.str, m.size, m.ls) + 11, ph = m.size + 6, py = y - 12 - ph;
      s += `<line x1="${f(x)}" x2="${f(x)}" y1="${f(y - 12)}" y2="${f(y + 9)}" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".9"/>` +
        `<circle cx="${f(x)}" cy="${f(y)}" r="3.6" fill="#fff"/><circle cx="${f(x)}" cy="${f(y)}" r="1.6" fill="${INK}"/>` +
        `<rect x="${f(x - pw / 2)}" y="${f(py + 1.2)}" width="${f(pw)}" height="${f(ph)}" rx="${f(ph / 2)}" fill="${INK}" opacity=".45"/>` +
        `<rect x="${f(x - pw / 2)}" y="${f(py)}" width="${f(pw)}" height="${f(ph)}" rx="${f(ph / 2)}" fill="#fff"/>` +
        mono(x, py + ph / 2 + m.size * .36, 'СЕЙЧАС', { size: 8.5, anchor: 'middle', opacity: 1, color: INK, shadow: 0 });
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  const lx = (o, q2) => lerp(o.x0 ?? 40, o.x1 ?? 320, q2);
  function polyline(P, o = {}) {
    if (!P || !P.length) return '';
    const op = o.opacity ?? o.op ?? .4; if (op <= .003) return '';
    const d = P.map((p, i) => `${i ? 'L' : 'M'}${f(p[0] ?? p.x)} ${f(p[1] ?? p.y)}`).join(' ') + (o.close ? ' Z' : '');
    return `<path d="${d}" fill="none" stroke="${o.color ?? '#fff'}" stroke-width="${o.width ?? .55}" opacity="${f(op)}" stroke-linecap="round" stroke-linejoin="round"${o.glow ? ' filter="url(#gfc-soft)"' : ''}/>`;
  }
  const thread = (a, b, o = {}) => polyline([a, b], o);
  // нить-дуга от a к b, по ней бежит искра (огонь порядка → голова человека)
  function beam(a, b, t = 0, o = {}) {
    const op = o.op ?? 1; if (op <= .003) return '';
    const bend = o.bend ?? .25, c = [lerp(a[0], b[0], .5) + (b[0] - a[0]) * bend, lerp(a[1], b[1], .25)], col = o.color ?? SUN;
    let s = `<path d="M${f(a[0])} ${f(a[1])} Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}" fill="none" stroke="${col}" stroke-width="${f(o.w ?? .9)}" stroke-linecap="round" opacity=".55"/>`;
    if (o.run !== false) {
      const u = frac(t * (o.speed ?? .42) + (o.phase ?? 0)), v = 1 - u, k = Math.sin(Math.PI * u);
      const px = v * v * a[0] + 2 * v * u * c[0] + u * u * b[0], py = v * v * a[1] + 2 * v * u * c[1] + u * u * b[1];
      s += `<circle cx="${f(px)}" cy="${f(py)}" r="4.5" fill="${col}" opacity="${f(.3 * k)}"/><circle cx="${f(px)}" cy="${f(py)}" r="1.7" fill="#fff6d0" opacity="${f(k)}"/>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // v2: холмы и горизонт под сценой (как в образце): o.y=300 — линия горизонта (гребень ближней земли в центре), o.op=1,
  // o.glow=1 — мягкий свет над горизонтом, o.warm — тёплый отсвет огня на земле, o.seed — рисунок гребней, o.far=1 / o.mid=1 —
  // дальние / средние холмы (0 — без них). Земля уходит вниз до маски субтитров, по бокам мягко гаснет.
  function ridge(base, amp, n, seed) {
    const P = [];
    for (let i = 0; i <= n; i++) P.push([lerp(-40, 400, i / n), base - amp * (.35 + .65 * H(seed * 17.3 + i * 3.1))]);
    let d = `M-40 ${f(base + 200)} L${f(P[0][0])} ${f(P[0][1])}`;
    for (let i = 0; i < n; i++) { const a = P[i], b = P[i + 1]; d += ` Q${f(a[0] + (b[0] - a[0]) * .5)} ${f(Math.min(a[1], b[1]) - amp * .25)} ${f(b[0])} ${f(b[1])}`; }
    return { d: d + ` L400 ${f(base + 200)} Z`, top: d.replace(/^M[^L]*L/, 'M') };
  }
  function hills(o = {}) {
    const op = o.op ?? 1; if (op <= .003) return '';
    const y = o.y ?? 300, sd = o.seed ?? 0, glow = o.glow ?? 1, far = o.far ?? 1, mid = o.mid ?? 1;
    let s = glow > .003 ? `<ellipse cx="180" cy="${f(y - 34)}" rx="250" ry="54" fill="url(#gfc-hglowG)" opacity="${f(glow)}"/>` : '';
    if (far > .003) {
      const R = ridge(y - 20, 22, 5, sd + 1);
      s += `<g opacity="${f(far)}"><path d="${R.d}" fill="#4b2a96"/><path d="${R.top}" fill="none" stroke="#b89aff" stroke-width="1.2" opacity=".55"/></g>`;
    }
    if (mid > .003) {
      const R = ridge(y - 6, 12, 4, sd + 7);
      s += `<g opacity="${f(mid)}"><path d="${R.d}" fill="#381f80"/><path d="${R.top}" fill="none" stroke="#9c7ef2" stroke-width="1.1" opacity=".42"/></g>`;
    }
    s += `<path d="M-40 ${f(y + 9)} C90 ${f(y - 4)} 270 ${f(y - 4)} 400 ${f(y + 9)} L400 ${f(y + 200)} L-40 ${f(y + 200)} Z" fill="url(#gfc-hill)"/>` +
      `<path d="M-40 ${f(y + 9)} C90 ${f(y - 4)} 270 ${f(y - 4)} 400 ${f(y + 9)}" fill="none" stroke="#9a7cf0" stroke-width="1.2" opacity=".42"/>`;
    if (o.warm > .003) s += `<ellipse cx="180" cy="${f(y + 16)}" rx="175" ry="42" fill="url(#gfc-halo)" opacity="${f(o.warm)}"/>`;
    return `<g opacity="${f(op)}" mask="url(#gfc-hmask)">${s}</g>`;
  }
  // мягкая площадка под людьми; o.warm — тёплый отсвет огня. v2: GFC.ground(o) (первый аргумент — объект или нет) — холмы hills
  function ground(cx, y, rx, ry, o = {}) {
    if (cx == null || typeof cx === 'object') return hills(cx || {});
    const op = o.op ?? 1; if (op <= .003) return '';
    ry = ry ?? rx * .2;
    return `<g opacity="${f(op)}"><ellipse cx="${f(cx)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#gfc-ground)"/>` +
      (o.warm > .003 ? `<ellipse cx="${f(cx)}" cy="${f(y)}" rx="${f(rx * 1.08)}" ry="${f(ry * 1.25)}" fill="url(#gfc-halo)" opacity="${f(o.warm)}"/>` : '') + '</g>';
  }

  /* ---------------- плоский человек ---------------- */
  // Оси как у пробы gfx_flatcolor: голова — круг, туловище — скруглённая трапеция до земли, руки — толстые скруглённые
  // штрихи; на шаге подол поднимается и видны ноги (ножницы, носок отрывается от земли). Единицы: макушка −95,5 при
  // голове 1, подошвы 0; на экран — масштаб s = h / (72,5 + 2·голова).
  function rig(h, o = {}) {
    const t = o.t ?? 0, seed = o.seed ?? 0;
    const up = ease(o.up ?? (o.pose === 'raise' ? 1 : 0));
    const wk = clamp(o.walk ?? (o.pose === 'walk' ? 1 : 0));
    const dir = (o.dir ?? 1) < 0 ? -1 : 1;
    const ph = (o.phase ?? seed * 1.3) + t * (o.speed ?? 7);
    const sw = Math.sin(ph) * wk, cw = Math.cos(ph) * wk;
    const lift = 1.8 * (1 - Math.abs(Math.sin(ph))) * wk;
    const hem = 18 * wk, hr = 11.5 * (o.head ?? 1);
    const headY = -72.5 - hr - lift, s = h / (72.5 + 2 * hr);
    const idle = 2.4 * Math.sin(t * 1.4 + seed * 2.3) * (1 - wk);
    const wave = 6 * Math.sin(t * 2.2 + seed) * up * (1 - wk);
    const arms = [-1, 1].map(side => {
      const sh = [side * 12.5, -61 - lift];
      const th = (lerp(14, 150, up) + side * wave) * Math.PI / 180;
      const th2 = lerp(th, 6 * Math.PI / 180, wk * (1 - up));
      let hx = sh[0] + side * 35 * Math.sin(th2) + side * idle, hy = sh[1] + 35 * Math.cos(th2);
      hx += -side * 10 * sw * dir;
      const mid = [(sh[0] + hx) / 2 + side * 3.5 * up, (sh[1] + hy) / 2 + 1.5 * up];
      return [sh, mid, [hx, hy]];
    });
    let legs = '';
    if (wk > .01) {
      const hipY = -hem - 3 - lift;
      [1, -1].forEach(side => {
        const fx = side * 4.5 + side * 11 * sw * dir, ly = 4 * Math.max(0, side * cw), fy = -4.2 - ly;
        const hx = side * 5, kx = (hx + fx) / 2 + dir * 2.5 * ly, ky = (hipY + fy) / 2;
        legs += `M${f(hx)} ${f(hipY)} Q${f(kx)} ${f(ky)} ${f(fx)} ${f(fy)} `;
      });
    }
    return { s, up, wk, dir, lift, hem, hr, headY, arms, legs, lean: 4 * wk * dir, br: 1 + .014 * Math.sin(t * 2.3 + seed * 1.7) };
  }
  const tunic = (hem, lift) => {
    const b = 19 - .07 * hem, y0 = -hem, top = -71 - lift, shl = -58 - lift, sh2 = -67 - lift;
    return `M-15 ${f(shl)} C-15 ${f(sh2)} -9 ${f(top)} 0 ${f(top)} C9 ${f(top)} 15 ${f(sh2)} 15 ${f(shl)} L${f(b)} ${f(y0 - 5)} ` +
      `C${f(b)} ${f(y0 - 2)} ${f(b - 2)} ${f(y0)} ${f(b - 5)} ${f(y0)} L${f(5 - b)} ${f(y0)} C${f(2 - b)} ${f(y0)} ${f(-b)} ${f(y0 - 2)} ${f(-b)} ${f(y0 - 5)} Z`;
  };
  function person(cx, gy, h, o = {}) {
    const op = o.opacity ?? o.op ?? 1; if (op <= .003 || !(h > 0)) return '';
    const R = rig(h, o), C = paint(o.color ?? pick(o.seed ?? 0));   // без цвета — по seed (seed 0 — коралл, как в v1)
    const armD = R.arms.map(a => `M${f(a[0][0])} ${f(a[0][1])} Q${f(a[1][0])} ${f(a[1][1])} ${f(a[2][0])} ${f(a[2][1])}`).join(' ');
    const bodyD = tunic(R.hem, R.lift), head = `<circle cx="0" cy="${f(R.headY)}" r="${f(R.hr)}"`;
    const shape = (fill, arm) => `<path d="${armD}" fill="none" stroke="${arm}" stroke-width="9" stroke-linecap="round"/><path d="${bodyD}" fill="${fill}"/>${head} fill="${fill}"/>`;
    let b = R.legs ? `<path d="${R.legs}" fill="none" stroke="${C.dark}" stroke-width="8.5" stroke-linecap="round"/>` : '';
    b += shape(C.fill, C.dark);
    if (!C.grad) b += `<path d="${bodyD}" fill="url(#gfc-shade)"/>${head} fill="url(#gfc-shade)"/>`;
    const shade = clamp(o.shade ?? 0), lit = clamp(o.lit ?? 0), rim = o.rim ?? 0;
    if (shade > .003) b += `<g opacity="${f(.42 * shade)}">${shape(INK, INK)}</g>`;
    if (lit > .003) b += `<g opacity="${f(.24 * lit)}">${shape('#ffb46a', '#ffb46a')}</g>`;
    if (rim) {
      const sd = Math.sign(rim), ro = f((o.rimOp ?? .55) * Math.min(1, Math.abs(rim)));
      b += `<path d="M${15 * sd} ${f(-58 - R.lift)} L${f((19 - .07 * R.hem) * sd)} ${f(-R.hem - 6)}" fill="none" stroke="#ffc27a" stroke-width="3" stroke-linecap="round" opacity="${ro}"/>` +
        `<path d="M${f(R.hr * .35 * sd)} ${f(R.headY - R.hr * .96)} A${f(R.hr)} ${f(R.hr)} 0 0 ${sd > 0 ? 1 : 0} ${f(R.hr * .96 * sd)} ${f(R.headY + R.hr * .35)}" fill="none" stroke="#ffc27a" stroke-width="2.6" stroke-linecap="round" opacity="${ro}"/>`;
    }
    b += `<ellipse cx="${f(-R.hr * .38)}" cy="${f(R.headY - R.hr * .42)}" rx="${f(R.hr * .3)}" ry="${f(R.hr * .2)}" fill="#fff" opacity=".2"/>`;
    const shadow = o.shadow ?? 1;
    const sh = shadow > .003 ? `<ellipse cx="${f(cx)}" cy="${f(gy + .4)}" rx="${f(h * .27)}" ry="${f(h * .06)}" fill="url(#gfc-shadow)" opacity="${f(shadow)}"/>` : '';
    return `<g opacity="${f(op)}">${sh}<g transform="translate(${f(cx)} ${f(gy)}) rotate(${f(R.lean)}) scale(${(R.s).toFixed(4)} ${(R.s * R.br).toFixed(4)})">${b}</g></g>`;
  }
  function anchors(cx, gy, h, o = {}) {
    const R = rig(h, o), p = v => [cx + v[0] * R.s, gy + v[1] * R.s];
    return { head: p([0, R.headY]), top: p([0, R.headY - R.hr]), hands: R.arms.map(a => p(a[2])), feet: [cx, gy], s: R.s };
  }

  /* ---------------- фон, маска, сцена ---------------- */
  const g = (id, stops, at = '') => `<linearGradient id="${id}" ${at}>${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const DEFS = `<defs>
    ${PAL.map(([a, b], i) => g(`gfc-p${i}`, [[0, a], [1, b]], 'x1="0" y1="0" x2=".7" y2="1"')).join('')}
    ${g('gfc-bg', [[0, '#3d0f6c'], [.14, '#36106e'], [.3, '#2a146c'], [.5, '#19195f'], [.6, '#10154a'], [.75, '#0a0e33'], [1, '#070a24']], 'gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="640"')}
    <radialGradient id="gfc-top"><stop offset="0" stop-color="#c24ad8" stop-opacity=".3"/><stop offset=".5" stop-color="#8a34c8" stop-opacity=".13"/><stop offset="1" stop-color="#5a24a8" stop-opacity="0"/></radialGradient>
    ${g('gfc-hill', [[0, '#301c72'], [.1, '#26175f'], [.26, '#1b1550'], [.5, '#121342'], [1, '#0c0f36']], 'x1="0" y1="0" x2="0" y2="1"')}
    <radialGradient id="gfc-hglowG"><stop offset="0" stop-color="#d27cff" stop-opacity=".26"/><stop offset=".45" stop-color="#9a4ae0" stop-opacity=".11"/><stop offset="1" stop-color="#6a30c0" stop-opacity="0"/></radialGradient>
    ${g('gfc-hx', [[0, '#000'], [.14, '#fff'], [.86, '#fff'], [1, '#000']], 'gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="360" y2="0"')}
    <mask id="gfc-hmask" maskUnits="userSpaceOnUse" x="-400" y="-640" width="1160" height="1920" style="mask-type:luminance"><rect x="0" y="-640" width="360" height="1920" fill="url(#gfc-hx)"/></mask>
    <filter id="gfc-hblur" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="2.4"/></filter>
    <filter id="gfc-glow3" x="-60%" y="-120%" width="220%" height="340%"><feGaussianBlur stdDeviation="3.4"/></filter>
    ${g('gfc-shade', [[0, '#fff', .24], [.42, '#fff', 0], [.58, INK, 0], [1, INK, .32]], 'x1="0" y1="0" x2=".8" y2="1"')}
    ${g('gfc-time', RAMP.map((c, i) => [i / (RAMP.length - 1), c]), 'x1="0" y1="0" x2="1" y2="0"')}
    ${g('gfc-uline', [[0, ACC, 0], [.25, ACC, .9], [.75, ACC, .9], [1, ACC, 0]], 'x1="0" y1="0" x2="1" y2="0"')}
    <radialGradient id="gfc-neb"><stop offset="0" stop-color="#8a45d8" stop-opacity=".30"/><stop offset=".5" stop-color="#5a2fb0" stop-opacity=".12"/><stop offset="1" stop-color="#3a2090" stop-opacity="0"/></radialGradient>
    <radialGradient id="gfc-halo"><stop offset="0" stop-color="#ffcf6a" stop-opacity=".6"/><stop offset=".35" stop-color="#ff9a4a" stop-opacity=".22"/><stop offset="1" stop-color="#ff7a3a" stop-opacity="0"/></radialGradient>
    <radialGradient id="gfc-glowP"><stop offset="0" stop-color="#ff6fa8" stop-opacity=".34"/><stop offset=".5" stop-color="#b44fd0" stop-opacity=".14"/><stop offset="1" stop-color="#7a3fd0" stop-opacity="0"/></radialGradient>
    <radialGradient id="gfc-ball" cx=".42" cy=".4" r=".65"><stop offset="0" stop-color="#fffbe8"/><stop offset=".38" stop-color="#ffe27a"/><stop offset=".75" stop-color="#ffb23d"/><stop offset="1" stop-color="#ff8a3d"/></radialGradient>
    <radialGradient id="gfc-shadow"><stop offset="0" stop-color="#07041c" stop-opacity=".62"/><stop offset=".6" stop-color="#07041c" stop-opacity=".3"/><stop offset="1" stop-color="#07041c" stop-opacity="0"/></radialGradient>
    <radialGradient id="gfc-ground"><stop offset="0" stop-color="#40299a" stop-opacity=".95"/><stop offset=".6" stop-color="#2c1c78" stop-opacity=".75"/><stop offset="1" stop-color="#1e1660" stop-opacity="0"/></radialGradient>
    <filter id="gfc-soft" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.25"/></filter>
    <filter id="gfc-blur" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter>
    <filter id="gfc-tglow" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    ${g('gfc-my', [[0, '#fff'], [.531, '#fff'], [.556, '#e6e6e6'], [.581, '#999'], [.606, '#404040'], [.633, '#000'], [1, '#000']], 'gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="640"')}
    ${g('gfc-ml', [[0, '#000', 1], [1, '#000', 0]], 'x1="0" y1="0" x2="1" y2="0"')}
    ${g('gfc-mr', [[0, '#000', 0], [1, '#000', 1]], 'x1="0" y1="0" x2="1" y2="0"')}
    ${g('gfc-mt', [[0, '#000', 1], [1, '#000', 0]], 'x1="0" y1="0" x2="0" y2="1"')}
    <mask id="gfc-mask" maskUnits="userSpaceOnUse" x="-400" y="-640" width="1160" height="1920" color-interpolation="sRGB" style="mask-type:luminance">
      <rect x="0" y="0" width="360" height="640" fill="url(#gfc-my)"/><rect x="0" y="0" width="12" height="640" fill="url(#gfc-ml)"/>
      <rect x="348" y="0" width="12" height="640" fill="url(#gfc-mr)"/><rect x="0" y="0" width="360" height="10" fill="url(#gfc-mt)"/>
    </mask>
  </defs>`;
  // звёзды-точки с запасом за краями кадра (в безопасной зоне сцена ужата, вокруг виден фон) и звёзды-искры
  const STARS = Object.freeze(Array.from({ length: 140 }, (_, i) => {
    const x = -70 + H(i * 1.7 + 3) * 540, y = -120 + H(i * 2.9 + 11) * 440;
    return [x, y, .55 + 1.05 * H(i * 4.3), i % 5 ? '#ffffff' : '#ffe9a8', 1.2 + H(i) * 2, i * 2.1, 1 - clamp((y - 200) / 120)];
  }));
  const GLINTS = [[40, 126, 1], [322, 150, 1.15], [292, 236, .75], [62, 212, .8], [-24, 58, .9], [404, 44, 1], [428, 252, .8], [-34, 262, .7], [180, -40, .8]];
  function sky(t = 0) {
    let s = '<ellipse cx="180" cy="0" rx="430" ry="240" fill="url(#gfc-top)"/><ellipse cx="180" cy="150" rx="330" ry="250" fill="url(#gfc-neb)"/>';
    for (const [x, y, r, c, sp, ph, k] of STARS) {
      if (k <= .01) continue;
      const tw = .5 + .5 * Math.sin(t * sp + ph);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${c}" opacity="${f((.28 + .5 * tw) * k)}"/>`;
    }
    GLINTS.forEach(([x, y, sc], i) => {
      const tw = .7 + .3 * Math.sin(t * 1.7 + i * 2);
      s += `<path d="M0 -6 Q.9 -.9 6 0 Q.9 .9 0 6 Q-.9 .9 -6 0 Q-.9 -.9 0 -6 Z" fill="#fff6d8" transform="translate(${x} ${y}) scale(${f(sc * tw)})" opacity=".85"/>`;
    });
    return s;
  }
  const wrap = (svg, t = 0) => `<g id="${WORLD}">${DEFS}<rect x="-400" y="-640" width="1160" height="1920" fill="url(#gfc-bg)"/>${sky(t)}<g mask="url(#gfc-mask)">${svg}</g></g>`;
  const dissolve = (a, b, qv) => qv <= 0 ? a : qv >= 1 ? b : `<g opacity="${f(1 - qv)}">${a}</g><g opacity="${f(qv)}">${b}</g>`;
  const zoom = (svg, cx, cy, z, tx = cx, ty = cy) => Math.abs(z - 1) < 1e-4 && tx === cx && ty === cy ? svg :
    `<g transform="translate(${f(tx)} ${f(ty)}) scale(${(+z).toFixed(4)}) translate(${f(-cx)} ${f(-cy)})">${svg}</g>`;

  /* SCENES.имя = GFC.scene('имя', body, o) — как GF.scene: body(t, K, mode, p) → сырой SVG без фона; SCENES[name].body = body
   * (для наплыва следующей сцены). Вход в кадр: если прошлая сцена другая и у неё есть body — наплыв o.enter=.5 с от начала
   * кадра (t − u) из её последнего режима; фон (GFC.wrap) общий и не мигает. */
  function scene(name, body, o = {}) {
    const fn = function (u, p, d, t) {
      const t0 = t - u, K = p.K || {}, mode = p.mode;
      let own = body(t, K, mode, p);
      const prev = p.prev && p.prev !== name && SCENES[p.prev] && SCENES[p.prev].body;
      if (prev) {
        const qv = qq(t, t0, t0 + (o.enter ?? .5));
        if (qv < 1) own = dissolve(SCENES[p.prev].body(t, K, p.prev_mode, { ...p, mode: p.prev_mode }), own, qv);
      }
      return wrap(own, t);
    };
    fn.body = body;
    SCENES[name] = fn;
    return fn;
  }
  window.GFC = Object.freeze({ scene, T, TE, w, we, q, qq, out, ease, clamp, lerp, hash: H, noise, bare,
    cloud, lattice, hexPts, personPts, jitter, drift, morph, dots,
    hex, comb, spark, mono, label, italic, typed, thinker, arrow, line, lx, person, anchors, wrap, dissolve, zoom,
    thread, polyline, beam, ground, fs, textW, mixC, ramp, PAL, DOT, RAMP, INK, SUN, ACC, RED,
    headline, headBox, hills, node, ICONS, pick, NAME, CROWD, GOLD, version: 2 });

  /* Проверочный лист стиля v2 (9 с, три момента, как образец style_flatcolor.jpg): 0–3 заголовок, холмы, разноцветные люди
   * (без o.color — по seed) вокруг огня порядка с нитями; 3–6 кольцо значков GFC.node вокруг огня, разноцветные точки;
   * 6–9 прежние функции v1: соты, частицы хаос → порядок, линия времени, подпись мыслителя. */
  SCENES.gfc_style = scene('gfc_style', t => {
    const k1 = out(t, 2.8, .25), k2 = q(t, 3.0, .25) * out(t, 5.8, .25), k3 = q(t, 6.0, .25);
    let s = '';
    if (k1 > .003) {
      const S = [180, 166], GYb = 270, GYf = 318;
      let g = hills({ y: 262, warm: .5 });
      const P = [[64, GYb, 62], [134, GYb - 6, 56], [226, GYb - 6, 56], [296, GYb, 62], [92, GYf, 84], [180, GYf + 6, 90], [268, GYf, 84]];
      P.forEach(([x, gy, h], i) => { if (i < 4) g += person(x, gy, h, { t, seed: i + 1, up: i === 1 || i === 2 ? .35 : 0, lit: .6, rim: x < 180 ? .8 : -.8 }); });
      P.forEach(([x, gy, h], i) => { const a = anchors(x, gy, h, {}); g += beam([S[0], S[1] + 12], [a.top[0], a.top[1] - 2], t, { phase: i * .37 }); });
      g += spark(S[0], S[1], 16, { t });
      P.forEach(([x, gy, h], i) => { if (i >= 4) g += person(x, gy, h, { t, seed: i + 1, shade: .15, rim: x < 180 ? .6 : x > 180 ? -.6 : 0 }); });
      g += headline('Зачем людям / *боги?*', t, .2, 2.9);
      s += `<g opacity="${f(k1)}">${g}</g>`;
    }
    if (k2 > .003) {
      const C = [180, 222], names = ['book', 'heart', 'scales', 'star', 'leaf', 'drop', 'plus', 'question'];
      let g = hills({ y: 320, far: .6 });
      g += dots(jitter(cloud(70, 9, [24, 140, 336, 320]), t, 2, 4), { r: 1.5, op: .8, t });
      const N = names.map((nm, i) => { const a = -Math.PI / 2 + i / names.length * TAU; return [C[0] + 120 * Math.cos(a), C[1] + 84 * Math.sin(a), nm, i]; });
      N.forEach(([x, y, nm, i]) => { g += beam([C[0], C[1]], [x, y], t, { op: q(t, 3.3 + i * .12, .3), phase: i * .21, color: PAL[pick(i + 1)][0], bend: .12 }); });
      g += spark(C[0], C[1], 14, { t });
      N.forEach(([x, y, nm, i]) => { const k = q(t, 3.2 + i * .12, .35); g += node(x, y + 1.2 * Math.sin(t * 2.1 + i), 17, nm, { seed: i + 1, scale: .6 + .4 * k, op: k }); });
      g += headline('Одни заповеди / *на всех*', t, 3.1, null);
      s += `<g opacity="${f(k2)}">${g}</g>`;
    }
    if (k3 > .003) {
      const A = cloud(260, 4, [30, 120, 330, 320]), B = hexPts(180, 222, 21, 6, 6), k = qq(t, 6.3, 7.4);
      let g = comb(180, 222, 21, 6, 6, { lit: (i, x, y) => { const d = Math.hypot(x - 180, y - 222) / 220; return qq(t, 6.9 + d, 7.5 + d); } });
      g += dots(morph(jitter(A, t, 3), B, k, t), { op: (.6 + .35 * k) * (1 - .55 * qq(t, 7.5, 8.1)), t, r: 1.5 });
      g += line({ y: 336, op: qq(t, 7.6, 8.2), now: .62 });
      g += thinker('Шрёдингер · «Что такое жизнь?» · 1944', t, 6.1, null);
      g += label(180, 100, k < .5 ? 'хаос' : 'порядок', { size: 21, color: k < .5 ? '#8ccbff' : ACC, opacity: q(t, 6.2, .3) });
      s += `<g opacity="${f(k3)}">${g}</g>`;
    }
    return s;
  });
})();
