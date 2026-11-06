/* gfc_future — «Бог ещё не создан», цветная версия («Цветная инфографика») сцены gf_future. ЗАГЛУШКА: сцену пишет её автор. */
(() => {
  SCENES.gfc_future = GFC.scene('gfc_future', (t, K, mode) => GFC.label(180, 180, 'gfc_future / ' + mode, { size: 18 }) +
    GFC.dots(GFC.jitter(GFC.cloud(120, 7, [40, 60, 320, 320]), t, 2, 3), { t }));
})();
