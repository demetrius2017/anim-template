/* gfc_book — «Бог ещё не создан», цветная версия («Цветная инфографика») сцены gf_book. ЗАГЛУШКА: сцену пишет её автор. */
(() => {
  SCENES.gfc_book = GFC.scene('gfc_book', (t, K, mode) => GFC.label(180, 180, 'gfc_book / ' + mode, { size: 18 }) +
    GFC.dots(GFC.jitter(GFC.cloud(120, 7, [40, 60, 320, 320]), t, 2, 3), { t }));
})();
