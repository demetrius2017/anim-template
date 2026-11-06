/* gfc_reach — «Бог ещё не создан», цветная версия («Цветная инфографика») сцены gf_reach. ЗАГЛУШКА: сцену пишет её автор. */
(() => {
  SCENES.gfc_reach = GFC.scene('gfc_reach', (t, K, mode) => GFC.label(180, 180, 'gfc_reach / ' + mode, { size: 18 }) +
    GFC.dots(GFC.jitter(GFC.cloud(120, 7, [40, 60, 320, 320]), t, 2, 3), { t }));
})();
