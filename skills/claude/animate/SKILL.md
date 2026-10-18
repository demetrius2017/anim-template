---
name: animate
description: "Сделать анимационный ролик 9:16 (mp4 1080×1920, нейроголос, субтитры) на движке anim-template — форк demetrius2017/anim-template. Использовать по /animate <тема> или когда Дмитрий просит ролик, анимацию, видео-объяснение."
argument-hint: "<тема ролика> [— источник фактов: путь к отчёту/данным]"
---

# /animate — ролик на движке anim-template

Тема из аргумента: `$ARGUMENTS`. Если темы нет — спроси одной строкой.

## Где движок

- Рабочая копия: `~/Projects/anim-template` (форк https://github.com/demetrius2017/anim-template; `upstream` = aonetimeusername/anim-template).
- Если папки нет: `git clone https://github.com/demetrius2017/anim-template.git ~/Projects/anim-template`, затем
  `python3.11 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`. Браузер — системный Google Chrome
  (иначе `python -m playwright install chromium`), нужен ffmpeg. Проверка: `python build.py example`.
- Рендерить на Mac: на Tesla нет Chrome и node.
- Перед работой прочитать в репозитории `CLAUDE.md`, `docs/FORMAT.md`, `docs/SCENES.md` — это правила движка.
- Образец готового эпизода: `eps/spy_flow` («Почему вы не обгоните SPY»: PLAN.md, script.json, story.py, сцены `engine/scenes/sf_*.js`, протоколы приёмки REVIEW*.md).

## Роль Claude: дирижёр, тяжёлое — Codex

По директиве Дмитрия токены Claude экономим: сцены, озвучку, рендер и приёмку делает **Codex** (`codex exec … -m gpt-6-astra`)
в **tmux** на Mac, каждый шаг пишет статус-файл, Claude ставит фоновый `until [ -f STATUS ]; do sleep 60; done` и просыпается по нему.
tmux-сессия закрывается вместе с командой — для следующего шага создавай новую сессию. Claude сам делает: материал и факты,
утверждение плана с Дмитрием, взгляд на лист кадров, доставку, push.

## Порядок

1. **Материал.** `eps/<имя>/source/` — отчёт, числа, тексты. Все цифры и утверждения в ролике — только оттуда, без усиления
   (урок spy_flow: «стратегия обогнала SPY в 100 раз» вместо «выросла в 100 раз» — приёмка забраковала).
2. **План** (Codex): `build/script.json`, черновик `story.py`, `PLAN.md` — фраза → сцена (готовая из SCENES.md или новая) → камера →
   плашки; длина 20–60 с, хук в первые 2 с, смена кадра не реже раза в 3 с, рассказ на «вы», узнаваемая «фишка»; голос
   `ru-RU-DmitryNeural` или `ru-RU-SvetlanaNeural`. Длинный материал — серия роликов, а не один длинный.
3. **Утверждение.** Покажи Дмитрию сценарий и список кадров. Если он уже сказал «делай целиком» — не спрашивай.
4. **Сборка** (Codex): новые сцены `engine/scenes/<префикс>_*.js`, каждая через `scene_test.py` с просмотром кадров;
   `python build.py <имя> --no-render` (озвучка, ударения — CLAUDE.md «Озвучка: грабли»); `--sheet` и чек-лист CLAUDE.md;
   полный рендер `python build.py <имя>` (≈5–15 мин на минуту видео). Правки без смены текста — `--skip-tts`.
   Пример не должен сломаться: `python build.py example --skip-tts --sheet`.
5. **Приёмка** (второй, независимый Codex): ffprobe (1080×1920, звук, ≤60 с), кадры каждые 2 с и `qa/sheet.jpg`, все числа против
   `source/`, чек-лист FORMAT.md, финальная плашка (для финансов — «Учебное объяснение, не инвестиционная рекомендация»).
   Первая строка ответа `VIDEO_OK` / `VIDEO_NEEDS_FIXES`; до двух кругов исправлений.
6. **Доставка.** Превью: `ffmpeg -i out/<имя>.mp4 -vf scale=540:-2 -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart preview.mp4`
   (+ постер `-ss 1 -frames:v 1 poster.jpg`). Отправь превью через SendUserFile (`display: render`) и опубликуй страницу-плеер
   Artifact (`<video src="preview.mp4" poster="poster.jpg" controls playsinline>`; файлы через `files`, каждый ≤15 МБ).
   Назови путь к полной версии `eps/<имя>/out/<имя>.mp4`.
7. **Git.** Коммит сцен и эпизода (mp4 и `out/` в .gitignore — не коммитить) от `demetrius2017 <demetrius2017@users.noreply.github.com>`,
   `git push origin main` — только в форк. В upstream — только pull request и только по просьбе Дмитрия.

## Грабли

- `NoAudioReceived` от edge-tts — повторить запуск. Неверное ударение — знак ударения после гласной (за́мок) или замена слова.
- Ударения проверяются автоматически; на слух — только Дмитрием: в отчёте так и пиши.
- Не выдумывай внешние факты; если нужна цифра не из `source/` — помечай источник и округление.
