---
name: "animate"
description: "Сделать анимационный ролик 9:16 (mp4 1080×1920, нейроголос, субтитры) на движке anim-template — форк demetrius2017/anim-template. Вызов: $animate <тема>."
---

# $animate — ролик на движке anim-template

Тема — текст после `$animate`. Если темы нет — спроси одной строкой.

## Где движок

- Рабочая копия: `~/Projects/anim-template` (форк https://github.com/demetrius2017/anim-template; `upstream` = aonetimeusername/anim-template).
- Если папки нет: `git clone https://github.com/demetrius2017/anim-template.git ~/Projects/anim-template`, затем
  `python3.11 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`. Браузер — системный Google Chrome
  (иначе `python -m playwright install chromium`), нужен ffmpeg. Проверка: `python build.py example`.
- Рендерить на Mac: на Tesla нет Chrome и node.
- Прочитай и выполняй правила движка: `CLAUDE.md`, `docs/FORMAT.md`, `docs/SCENES.md` в репозитории.
- Образец готового эпизода: `eps/spy_flow` («Почему вы не обгоните SPY»: PLAN.md, script.json, story.py, сцены `engine/scenes/sf_*.js`, протоколы приёмки REVIEW*.md).

## Порядок (Codex делает всё сам)

1. **Материал.** `eps/<имя>/source/` — отчёт, числа, тексты. Все цифры и утверждения в ролике — только оттуда, без усиления
   (урок spy_flow: «стратегия обогнала SPY в 100 раз» вместо «выросла в 100 раз» — приёмка забраковала).
2. **План.** `build/script.json`, `story.py`, `PLAN.md` — фраза → сцена (готовая из SCENES.md или новая) → камера → плашки;
   длина 20–60 с, хук в первые 2 с, смена кадра не реже раза в 3 с, рассказ на «вы», узнаваемая «фишка»; голос
   `ru-RU-DmitryNeural` или `ru-RU-SvetlanaNeural`. Длинный материал — серия роликов, а не один длинный.
3. **Утверждение.** Покажи владельцу сценарий и список кадров и остановись, если он не сказал «делай целиком».
4. **Сборка.** Новые сцены `engine/scenes/<префикс>_*.js`, каждая через `scene_test.py` — посмотри кадры сам;
   `python build.py <имя> --no-render` (ударения — CLAUDE.md «Озвучка: грабли»); `--sheet`, пройди чек-лист CLAUDE.md и исправь;
   полный рендер `python build.py <имя>` (≈5–15 мин на минуту видео). Правки без смены текста — `--skip-tts`.
   Пример не должен сломаться: `python build.py example --skip-tts --sheet`.
5. **Самопроверка перед сдачей.** ffprobe (1080×1920, звук, ≤60 с), кадры каждые 2 с и `qa/sheet.jpg`, все числа против `source/`,
   чек-лист FORMAT.md, финальная плашка (для финансов — «Учебное объяснение, не инвестиционная рекомендация»).
   Если работаешь как приёмщик — первая строка ответа `VIDEO_OK` / `VIDEO_NEEDS_FIXES` и нумерованный список правок.
6. **Сдача.** Путь к `eps/<имя>/out/<имя>.mp4` и лёгкой копии; превью 540×960:
   `ffmpeg -i out/<имя>.mp4 -vf scale=540:-2 -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart preview.mp4`.
7. **Git.** Коммит сцен и эпизода (mp4 и `out/` в .gitignore — не коммитить) от `demetrius2017 <demetrius2017@users.noreply.github.com>`.
   Push в `origin` (форк) — только если владелец или оркестратор это поручил; в upstream — никогда без явной просьбы.

## Грабли

- `NoAudioReceived` от edge-tts — повторить запуск. Неверное ударение — знак ударения после гласной (за́мок) или замена слова.
- Ударения проверяются автоматически; слуховая проверка — за владельцем: так и пиши в отчёте.
- Не выдумывай внешние факты; если нужна цифра не из `source/` — помечай источник и округление.
- Долгие шаги запускай так, чтобы в конце появлялся статус-файл (оркестратор ждёт его).
