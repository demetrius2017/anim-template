"""Горизонтальный кадр (story.frame) и выравнивание слов OpenAI-озвучки (tts_openai.align_tokens)."""
import pytest
from engine_contracts import ContractError, validate_story
from tts_openai import align_tokens


def story(**extra):
    return {'duration': 2, 'shots': [{'scene': 'demo', 't0': 0, 't1': 2}], **extra}


def test_frame_and_scripts_accepted():
    validate_story(story(frame=[640, 360], scripts=['eps/x/assets/data.js']), {'demo'})


@pytest.mark.parametrize('frame', [[0, 360], [640], 'wide', [640, -1]])
def test_bad_frame_rejected(frame):
    with pytest.raises(ContractError):
        validate_story(story(frame=frame), {'demo'})


def test_numbers_get_time_of_their_span():
    text = 'Он заработал сто сорок четыре процента — сегодня.'
    heard = [(0.0, 0.2, 'Он'), (0.25, 0.8, 'заработал'), (0.9, 2.1, '144%'), (2.3, 2.9, 'сегодня.')]
    out = align_tokens(text, heard, 0.0, 3.0)
    words = [w for _, _, w in out]
    assert words == ['Он', 'заработал', 'сто', 'сорок', 'четыре', 'процента', 'сегодня.']   # тире без границы
    num = out[2:6]
    assert num[0][0] >= 0.8 and num[-1][1] <= 2.3                       # числа — внутри участка «144%»
    assert all(a[0] <= b[0] for a, b in zip(out, out[1:]))               # время по порядку
    assert out[-1][1] >= 3.0 - 1e-9                                      # конец последнего слова — по энергии сигнала
