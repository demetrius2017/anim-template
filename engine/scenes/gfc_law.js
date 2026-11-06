/* gfc_law — «Бог ещё не создан», цветная версия («Цветная инфографика») сцены gf_law. ЗАГЛУШКА: сцену пишет её автор. */
(() => {
  SCENES.gfc_law = GFC.scene('gfc_law', (t, K, mode) => GFC.label(180, 180, 'gfc_law / ' + mode, { size: 18 }) +
    GFC.dots(GFC.jitter(GFC.cloud(120, 7, [40, 60, 320, 320]), t, 2, 3), { t }));
})();
