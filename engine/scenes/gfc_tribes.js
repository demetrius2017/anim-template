/* gfc_tribes — «Бог ещё не создан», цветная версия («Цветная инфографика») сцены gf_tribes. ЗАГЛУШКА: сцену пишет её автор. */
(() => {
  SCENES.gfc_tribes = GFC.scene('gfc_tribes', (t, K, mode) => GFC.label(180, 180, 'gfc_tribes / ' + mode, { size: 18 }) +
    GFC.dots(GFC.jitter(GFC.cloud(120, 7, [40, 60, 320, 320]), t, 2, 3), { t }));
})();
