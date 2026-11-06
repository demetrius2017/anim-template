/* gfc_phone — «Бог ещё не создан», цветная версия («Цветная инфографика») сцены gf_phone. ЗАГЛУШКА: сцену пишет её автор. */
(() => {
  SCENES.gfc_phone = GFC.scene('gfc_phone', (t, K, mode) => GFC.label(180, 180, 'gfc_phone / ' + mode, { size: 18 }) +
    GFC.dots(GFC.jitter(GFC.cloud(120, 7, [40, 60, 320, 320]), t, 2, 3), { t }));
})();
