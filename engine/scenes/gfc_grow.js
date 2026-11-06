/* gfc_grow — «Бог ещё не создан», цветная версия («Цветная инфографика») сцены gf_grow. ЗАГЛУШКА: сцену пишет её автор. */
(() => {
  SCENES.gfc_grow = GFC.scene('gfc_grow', (t, K, mode) => GFC.label(180, 180, 'gfc_grow / ' + mode, { size: 18 }) +
    GFC.dots(GFC.jitter(GFC.cloud(120, 7, [40, 60, 320, 320]), t, 2, 3), { t }));
})();
