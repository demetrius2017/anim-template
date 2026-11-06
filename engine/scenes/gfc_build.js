/* gfc_build — «Бог ещё не создан», цветная версия («Цветная инфографика») сцены gf_build. ЗАГЛУШКА: сцену пишет её автор. */
(() => {
  SCENES.gfc_build = GFC.scene('gfc_build', (t, K, mode) => GFC.label(180, 180, 'gfc_build / ' + mode, { size: 18 }) +
    GFC.dots(GFC.jitter(GFC.cloud(120, 7, [40, 60, 320, 320]), t, 2, 3), { t }));
})();
