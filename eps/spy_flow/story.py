"""Монтаж по реальным границам слов edge-tts; утверждён владельцем."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[2]))
from storylib import Ep, NUMS


def Z(z0=1.0, z1=1.06, ox=0, oy=-100):
    return dict(z0=z0, z1=z1, ox=ox, oy=oy)


# id фразы, сцена, режим, желаемая дополнительная склейка на слове.
BEATS = [
    ("hook", "sf_backtest", "headline", None),
    ("bias", "sf_backtest", "future", "прошлом"),
    ("honest", "sf_backtest", "honest", "наши"),
    ("credit", "sf_money", "credit", None),
    ("first", "sf_money", "first", "компании"),
    ("salary", "sf_money", "salary", None),
    ("return", "sf_money", "return", "возвращают"),
    ("weight", "sf_index", "weights", "пропорциональна"),
    ("large", "sf_index", "large", None),
    ("grow", "sf_index", "grow", None),
    ("refresh", "sf_index", "refresh", None),
    ("tail", "sf_risk", "tail", None),
    ("risk", "sf_risk", "drawdown", "зато"),
    ("cost", "sf_market", "cost", None),
    ("math", "sf_market", "before", "получают"),
    ("after", "sf_market", "after", None),
    ("edge", "sf_money", "overview", "даёт"),
    ("end", "sf_market", "control", "не"),
]


def main():
    E = Ep(work=pathlib.Path(__file__).resolve().parent)
    t, te, wf = E.t, E.te, E.wfind
    # Локальное расширение субтитров; общий storylib.py не меняем.
    NUMS.insert(0, (["сто", "раз"], "100 раз"))

    # В сценах использовать t, а не u, для частиц и событий: поток продолжается
    # при смене плана; все времена в p абсолютные, получены из озвучки.
    events = {
        "creditAt": wf("credit", "кредит"),
        "firstAt": t("first"),
        "salaryAt": wf("salary", "зарплаты"),
        "returnAt": wf("return", "возвращают"),
        "growAt": wf("grow", "вес"),
        "refreshAt": wf("refresh", "обновляется"),
        "tailAt": wf("tail", "взлёт"),
        "riskAt": wf("risk", "зато"),
        "costAt": t("cost"),
    }
    for i, (pid, scene, mode, cut_word) in enumerate(BEATS):
        params = dict(mode=mode, **events)
        # Первый кадр уже сформирован к t=0: без заставки и затемнения.
        E.shot(scene, -0.25 if i == 0 else t(pid) - 0.05, params, Z())
        if cut_word:
            E.shot(scene, wf(pid, cut_word) - 0.05,
                   dict(params, detail=True), Z(1.02, 1.06))

    def chip(pid, text, color="dark", y=92, until=None):
        E.add("chip", t(pid) - 0.05, until if until is not None else te(pid),
              text=text, color=color, x=180, y=y)

    E.add("chip", -0.25, te("hook"), text="×100? Проверьте состав", color="white", x=180, y=92)
    chip("bias", "Сегодняшний список → в прошлое")
    chip("honest", "Состав на каждую дату")
    chip("first", "Упрощённая схема", until=te("return"))
    chip("weight", "S&P 500 · вес по капитализации", until=te("large"))
    chip("refresh", "Состав меняется")
    chip("tail", "Редкий взлёт ≠ средний результат")
    chip("risk", "Horizon · волатильные 40")
    chip("cost", "Издержки уменьшают результат")
    chip("math", "Шарп, 1991 · до издержек", until=te("math"))
    chip("after", "После издержек — меньше")
    chip("edge", "Общий поток ≠ ваше преимущество")
    chip("end", "Просадка + издержки", color="white", until=E.dur)

    E.add("part", t("end") - 0.05, E.dur, y=570, size=10,
          text="Учебное объяснение,<br>не инвестиционная рекомендация")

    # Числовые карточки соответствуют source/STORYBOARD.md:
    # sf_backtest/honest: SPY 14,1%; волатильные 40 13,2%; моментум 40 14,7%
    # в год, Horizon FULL 2011–2026; без сочинённых кривых роста.
    # sf_risk/drawdown: −55% / SPY −34%, Horizon, максимум просадки.
    # sf_market/before: «Среднее по капиталу · один рынок», не среднее людей.
    # sf_money/overview: упрощённая схема, без числовых долей потоков.

    # При изменении текста монтаж снова обязан пройти ограничения формата.
    if E.dur > 60:
        raise ValueError(f"Длина {E.dur:.2f} с > 60: сократить текст и переозвучить.")
    for i, shot in enumerate(E.shots):
        finish = E.shots[i + 1]["t0"] if i + 1 < len(E.shots) else E.dur
        length = finish - max(0, shot["t0"])
        if not 0.8 <= length <= 3.0:
            raise ValueError(f"Кадр {i} ({shot['scene']}): {length:.2f} с. Перенести склейку к слову.")
    if E.dur - t("cost") < 10:
        raise ValueError("Тему издержек нужно ввести раньше последних 10 секунд.")
    E.write(kicks=[], marks={"credit": events["creditAt"], "risk": events["riskAt"],
                             "cost": events["costAt"], "end": t("end")})


if __name__ == "__main__":
    main()
