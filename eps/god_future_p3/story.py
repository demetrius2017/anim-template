"""«Бог будущего» — часть 3 из 3 ролика «Бог ещё не создан» (eps/god_future/source/text_v26.md, текст v25 части 3,
«да» владельца 05.11, 22:25: «Да, озвучивай»).

Раскадровка — eps/god_future/source/storyboard_p3new.md: фраза → сцена → режим; сцены engine/scenes/gf_reach.js,
gf_images.js, gf_phone.js, gf_grow.js сами находят свои слова через GF.w(K, id, «основа») (eps/god_future/storybase.py).
Надпись «ЧАСТЬ 3 ИЗ 3» рисует gf_reach/hook; плашку ВЗГЛЯД АВТОРА — storybase (VIEWS).
"""
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "god_future"))  # eps/god_future/storybase.py
from storybase import build  # noqa: E402

BEATS = [
    ("e01", "gf_reach", "hook"),       # ЧАСТЬ 3 ИЗ 3; шар Земли: 3 ГОДА → 2000 ЛЕТ, светится меньше трети; «?»
    ("e02", "gf_reach", "formula"),    # христиане / мусульмане / историки; Новый Завет: «возлюби ближнего…» (Мф 22:39)
    ("e03", "gf_reach", "swords"),     # войны (красный); МЕССИЯ — СПАСИТЕЛЬ И СУДЬЯ; Исаия 2:4: меч → плуг
    ("e04", "gf_images", "plough"),    # ОРАЛО = ПЛУГ, «?»; слова перевели, образы древние; пастух → город
    ("e05", "gf_images", "skills"),    # три пустые клетки: 7 000+ ЯЗЫКОВ · ОБРАЗЫ НАШЕГО ВРЕМЕНИ · СОВЕТ КАЖДОМУ
    ("e06", "gf_phone", "phone"),      # клетки ✓ → телефон; CHATGPT; 1 200 000 000 В НЕДЕЛЮ (OpenAI, 10.2026)
    ("e07", "gf_phone", "thoughts"),   # за советом; огонь порядка видит мысли — а этому мы пишем их сами
    ("e08", "gf_phone", "student"),    # ученик за партой: УМНЫЙ СТАРШЕКЛАССНИК; 2 + 2 = 5 ✗
    ("e09", "gf_grow", "grow"),        # ученик растёт в сверхразум из сот; Альтман; ≈ 3 000 ДНЕЙ ≈ 8 ЛЕТ
    ("e10", "gf_grow", "whatif"),      # контур огня с гнёздами; УЧИТЕЛЬ · СУДЬЯ; слова людей летят в гнёзда
    ("e11", "gf_grow", "mirror"),      # Ватикан, ИДОЛОПОКЛОНСТВО; зеркало с отражением толпы; создатели и каждый
    ("e12", "gf_grow", "choice"),      # Даль; УЧИТЕЛЬ ✓ / СУДЬЯ ?; карточка
]
SOURCES = []   # источники — подписи в сценах и описание (delivery/description.txt)
VIEWS = [("e10", "что")]   # плашка ВЗГЛЯД АВТОРА на «А что если…»

if __name__ == "__main__":
    build(Path(__file__).resolve().parent, BEATS, SOURCES, views=VIEWS)
