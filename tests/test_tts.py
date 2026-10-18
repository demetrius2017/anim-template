"""Offline TTS integration: real PCM assembly and silence, no provider requests."""
import asyncio
import json
import wave

import numpy as np
import pytest

import tts
from engine_contracts import ContractError, verify_tts_manifest


@pytest.fixture
def local_tts(tmp_path, monkeypatch):
    (tmp_path / 'build').mkdir()
    monkeypatch.setattr(tts, 'WORK', tmp_path)
    calls = []

    async def synth(text, path, voice='narr', *, rate=None, pitch=None):
        calls.append((text, voice, rate, pitch))
        words = text.split()
        # The .mp3 filename is intentional: ffmpeg detects actual PCM from headers.
        length = tts.sample(.2 + .2 * len(words))
        with wave.open(str(path), 'wb') as f:
            f.setnchannels(1)
            f.setsampwidth(2)
            f.setframerate(tts.SR)
            f.writeframes(np.full(length, 10000, dtype='<i2').tobytes())
        return [(.1 + .2 * i, .25 + .2 * i, w) for i, w in enumerate(words)]

    monkeypatch.setattr(tts, 'synth', synth)

    def run(script):
        (tmp_path / 'build/script.json').write_text(json.dumps(script, ensure_ascii=False))
        asyncio.run(tts.main())
        return json.loads((tmp_path / 'build/words.json').read_text())

    return tmp_path, calls, run


def pcm(path):
    with wave.open(str(path), 'rb') as f:
        assert f.getframerate() == tts.SR
        return np.frombuffer(f.readframes(f.getnframes()), dtype='<i2')


def test_structured_pause_is_silence_and_moves_all_later_words(local_tts):
    root, calls, run = local_tts
    result = run({'lead': 0, 'tail': 0, 'phrases': [
        {'id': 'p', 'voice': 'boy', 'pause_after': .4, 'spans': [
            {'text': '*Сегодня*', 'token_id': 'p.today', 'emphasis': True,
             'focus': 'future_list', 'pause_after': .625},
            {'text': '~прошлое~.', 'pitch': '+3Hz'},
        ]},
        {'id': 'next', 'voice': 'boy', 'text': 'Проверим.', 'pause': 0},
    ]})
    first, second, following = result['words']
    assert first['token_id'] == 'p.today'
    assert second['token_id'] == 'p.1'
    assert following['token_id'] == 'next.0'
    assert (first['c'], second['c']) == ('y', 'r')
    assert first['emphasis'] is True and first['focus'] == 'future_list'
    assert calls == [('Сегодня', 'boy', '+0%', None),
                     ('прошлое.', 'boy', None, '+3Hz'), ('Проверим.', 'boy', None, None)]
    segments = result['phrases'][0]['segments']
    assert segments[1]['t0_sample'] - segments[0]['t1_sample'] == tts.sample(.625)
    assert result['phrases'][1]['t0_sample'] - result['phrases'][0]['t1_sample'] == tts.sample(.4)
    audio = pcm(root / 'audio/voice_boy.wav')
    for start, end in [(segments[0]['t1_sample'], segments[1]['t0_sample']),
                       (result['phrases'][0]['t1_sample'], result['phrases'][1]['t0_sample'])]:
        assert len(audio[start:end]) > 0
        assert not np.any(audio[start:end])
        assert np.any(audio[max(0, start - 4800):start])
        assert np.any(audio[end:end + 4800])
    assert len(audio) == result['duration_samples']
    assert not (root / 'audio/voice_narr.wav').exists()
    assert result['source_boundaries'][0]['boundaries'][0]['t0'] == .1
    assert first['t0'] != .1
    assert result['alignment'][0] == {'token_id': 'p.today', 'ph': 0, 'segment': 0,
                                      'status': 'exact', 'source_index': 0}
    verify_tts_manifest(root, tts.VOICES)


def test_legacy_pause_and_markers_keep_single_synthesis(local_tts):
    root, calls, run = local_tts
    result = run({'phrases': [{'id': 'p', 'text': '*За́мок* ~закрыт~.', 'pause': .5}]})
    assert len(calls) == 1
    assert calls[0] == ('За́мок закрыт.', 'narr', None, None)
    assert [w['w'] for w in result['words']] == ['Замок', 'закрыт.']
    assert [w['c'] for w in result['words']] == ['y', 'r']
    assert result['phrases'][0]['pause_after'] == .5
    assert result['words'][-1]['pause_after'] == .5
    assert (root / 'audio/vo_00.mp3').is_file()
    verify_tts_manifest(root, tts.VOICES)


def test_phrase_emphasis_inherited_and_explicit_span_override(local_tts):
    _, calls, run = local_tts
    result = run({'phrases': [{'id': 'p', 'emphasis': True, 'focus': 'date', 'pitch': '+2Hz',
                              'spans': [{'text': 'Вчера'}, {'text': 'сегодня', 'rate': '-7%', 'focus': 'list'}]}]})
    assert calls == [('Вчера', 'narr', '+0%', '+2Hz'), ('сегодня', 'narr', '-7%', '+2Hz')]
    assert [w['focus'] for w in result['words']] == ['date', 'list']
    assert all(w['emphasis'] for w in result['words'])


@pytest.mark.parametrize('phrase', [
    {'text': 'Слово', 'pause': .1, 'pause_after': .2},
    {'text': 'Слово', 'pause_after': -1},
    {'spans': [{'text': 'Два слова', 'token_id': 'ambiguous'}]},
    {'spans': [{'text': 'Слово', 'pause_after': float('nan')}]},
    {'text': 'Слово', 'emphasis': 'strong'},
])
def test_bad_markup_rejected_before_synthesis(local_tts, phrase):
    root, calls, run = local_tts
    with pytest.raises(ContractError):
        run({'phrases': [phrase]})
    assert not calls
    assert not (root / 'build/tts_manifest.json').exists()


def test_missing_tts_token_does_not_produce_trusted_manifest(local_tts, monkeypatch):
    root, calls, run = local_tts
    original = tts.synth

    async def incomplete(*args, **kwargs):
        return (await original(*args, **kwargs))[:1]

    monkeypatch.setattr(tts, 'synth', incomplete)
    with pytest.raises(ValueError, match='Потеря токенов'):
        run({'phrases': [{'text': 'Два слова'}]})
    assert not (root / 'build/tts_manifest.json').exists()


def test_alignment_reports_fallback_and_punctuation_has_no_speech_duration():
    times, evidence = tts.align_report(tts.tokens('Это — слово'), [(.1, .3, 'Это'), (.4, .6, 'другое')])
    assert evidence[0]['status'] == 'exact'
    assert evidence[1]['status'] == 'punctuation'
    assert evidence[2]['status'] == 'fallback'
    assert times == [(.1, .3), (.3, .3), (.4, .6)]


@pytest.mark.parametrize('marker', [{'focus': 'result'}, {'emphasis': True}, {'token_id': 'p.key'}])
def test_marked_token_cannot_use_unrelated_tts_boundary(local_tts, monkeypatch, marker):
    root, _, run = local_tts
    original = tts.synth

    async def mismatch(*args, **kwargs):
        bounds = await original(*args, **kwargs)
        return [(a, b, 'СовершенноДругойТекст') for a, b, _ in bounds]

    monkeypatch.setattr(tts, 'synth', mismatch)
    with pytest.raises(ValueError, match='ключевого токена'):
        run({'phrases': [{'id': 'p', 'spans': [{'text': 'Будущее', **marker}]}]})
    assert not (root / 'build/tts_manifest.json').exists()
    assert not (root / 'build/words.json').exists()


def test_unmarked_legacy_fallback_remains_explicit_in_evidence(local_tts, monkeypatch):
    _, _, run = local_tts
    original = tts.synth

    async def mismatch(*args, **kwargs):
        bounds = await original(*args, **kwargs)
        return [(a, b, 'СовершенноДругойТекст') for a, b, _ in bounds]

    monkeypatch.setattr(tts, 'synth', mismatch)
    result = run({'phrases': [{'id': 'p', 'text': 'Будущее'}]})
    assert result['alignment'][0]['status'] == 'fallback'


def test_script_edited_during_synthesis_cannot_be_certified(local_tts, monkeypatch):
    root, _, run = local_tts
    original = tts.synth

    async def edit_during_synthesis(*args, **kwargs):
        bounds = await original(*args, **kwargs)
        path = root / 'build/script.json'
        changed = json.loads(path.read_text())
        changed['phrases'][0]['text'] = 'Новая редакция'
        path.write_text(json.dumps(changed, ensure_ascii=False))
        return bounds

    monkeypatch.setattr(tts, 'synth', edit_during_synthesis)
    with pytest.raises(ContractError):
        run({'phrases': [{'id': 'p', 'text': 'Будущее'}]})
    assert not (root / 'build/tts_manifest.json').exists()
    with pytest.raises(ContractError):
        verify_tts_manifest(root, tts.VOICES)
