"""Offline paid-call safety and resumability checks for the WaveSpeed provider."""
import asyncio
import io
import json
import sys
from types import SimpleNamespace
import urllib.error

import pytest

import tts
import tts_ws as ws


@pytest.fixture
def provider(tmp_path, monkeypatch):
    calls = []

    def request(method, route, body=None):
        calls.append((method, route, body))
        if method == "POST":
            return {"id": "prediction-1"}
        return {"status": "completed", "outputs": ["https://example.invalid/audio.mp3"]}

    monkeypatch.setattr(ws, "request", request)
    monkeypatch.setattr(ws.urllib.request, "urlopen", lambda *a, **kw: io.BytesIO(b"test-audio"))
    monkeypatch.setattr(ws.subprocess, "run", lambda *a, **kw: SimpleNamespace(returncode=0))
    return {"work": str(tmp_path), "voice": "Brian", "speed": 1}, calls, request


def records(cfg):
    return [json.loads(line) for line in (ws.Path(cfg["work"]) / "ledger.jsonl").read_text().splitlines()]


def test_rebuild_and_speed_change_do_not_purchase_another_generation(provider):
    cfg, calls, _ = provider
    raw = ws.generate("Число, умноженное на вес.", cfg)
    assert ws.generate("Число, умноженное на вес.", {**cfg, "speed": 1.1}) == raw
    assert [c[0] for c in calls] == ["POST", "GET"]
    assert raw.read_bytes() == b"test-audio"
    events = records(cfg)
    assert [r["event"] for r in events] == ["reserve", "submitted", "completed"]
    assert sum(r.get("reserved_usd", 0) for r in events) == pytest.approx(len("Число, умноженное на вес.") * ws.RATE)


def test_explicit_retake_changes_only_selected_text_and_preserves_first(provider):
    cfg, calls, _ = provider
    text = "Соедини атомы. Это молекула. Это слой."
    first = ws.generate(text, cfg)
    selected = {**cfg, "takes": {text: 2}}
    second = ws.generate(text, selected)
    assert first != second and first.exists() and second.exists()
    assert ws.generate(text, selected) == second
    assert ws.generate(text, cfg) == first
    assert len([c for c in calls if c[0] == "POST"]) == 2
    assert ws.digest([ws.MODEL, json.loads((first.parent / "job.json").read_text())["params"]]) == first.parent.name


def test_uncertain_submission_stays_reserved_and_is_never_repeated(provider, monkeypatch):
    cfg, calls, _ = provider

    def ambiguous(method, route, body=None):
        calls.append((method, route, body))
        raise urllib.error.URLError("connection lost after submit")

    monkeypatch.setattr(ws, "request", ambiguous)
    with pytest.raises(urllib.error.URLError):
        ws.generate("Число.", cfg)
    with pytest.raises(RuntimeError, match="Previous submission"):
        ws.generate("Число.", cfg)
    assert len(calls) == 1
    assert len(records(cfg)) == 1
    assert ws.reserved_total(ws.Path(cfg["work"]) / "ledger.jsonl") > 0


def test_poll_failure_can_resume_existing_id_without_repayment(provider, monkeypatch):
    cfg, calls, normal_request = provider

    def interrupted(method, route, body=None):
        if method == "GET":
            calls.append((method, route, body))
            raise urllib.error.URLError("temporary GET failure")
        return normal_request(method, route, body)

    monkeypatch.setattr(ws, "request", interrupted)
    with pytest.raises(urllib.error.URLError):
        ws.generate("Число.", cfg)
    monkeypatch.setattr(ws, "request", normal_request)
    assert ws.generate("Число.", cfg).exists()
    assert sum(c[0] == "POST" for c in calls) == 1
    assert sum(r["event"] == "reserve" for r in records(cfg)) == 1


@pytest.mark.parametrize("initial,budget", [(0, 0.0001), (0.9999, 10)])
def test_budget_guard_precedes_submission_and_hard_caps_one_dollar(provider, initial, budget):
    cfg, calls, _ = provider
    ledger = ws.Path(cfg["work"]) / "ledger.jsonl"
    ws.append(ledger, {"event": "reserve", "reserved_usd": initial})
    with pytest.raises(RuntimeError, match="budget"):
        ws.generate("Число.", {**cfg, "budget_usd": budget})
    assert not calls
    assert ws.reserved_total(ledger) == initial


@pytest.mark.parametrize("budget", [float("nan"), float("inf"), -1])
def test_nonfinite_or_negative_budget_rejected_before_submission(provider, budget):
    cfg, calls, _ = provider
    with pytest.raises((ValueError, RuntimeError)):
        ws.generate("Число.", {**cfg, "budget_usd": budget})
    assert not calls


@pytest.mark.parametrize("terminal", ["failed", "cancelled", "timeout", "deleted"])
def test_terminal_failure_stops_polling_and_keeps_paid_id(provider, monkeypatch, terminal):
    cfg, calls, request = provider

    def terminal_result(method, route, body=None):
        if method == "GET":
            calls.append((method, route, body))
            return {"status": terminal}
        return request(method, route, body)

    clock = iter([0, 601])
    monkeypatch.setattr(ws, "request", terminal_result)
    monkeypatch.setattr(ws.time, "monotonic", lambda: next(clock))
    with pytest.raises(RuntimeError, match="WaveSpeed"):
        ws.generate("Число.", cfg)
    assert [c[0] for c in calls] == ["POST", "GET"]
    meta = json.loads(next((ws.Path(cfg["work"]) / "audio/.ws_cache").glob("*/job.json")).read_text())
    assert meta["id"] == "prediction-1"


def test_synth_reuses_alignment_without_second_remote_call(provider, tmp_path, monkeypatch):
    cfg, calls, _ = provider
    import tts_openai

    remote_calls = []

    def transcribe(paths):
        remote_calls.append(paths)
        return {str(paths[0]): [{"words": [{"w": "Число.", "s": .1, "e": .7}]}]}

    remote = SimpleNamespace(transcribe=transcribe,
                             words=lambda segs: [(w["s"], w["e"], w["w"]) for s in segs for w in s["words"]])
    monkeypatch.setitem(sys.modules, "remote_whisper", remote)
    monkeypatch.setenv("QA_REMOTE", "tesla")
    monkeypatch.setattr(tts_openai, "speech_bounds", lambda path: (.1, .7))
    first = ws.synth("Число.", tmp_path / "first.mp3", cfg)
    second = ws.synth("Число.", tmp_path / "second.mp3", cfg)
    assert first == second == [(.1, .7, "Число.")]
    assert len(remote_calls) == 1
    assert sum(c[0] == "POST" for c in calls) == 1
    assert (tmp_path / "first.mp3").read_bytes() == (tmp_path / "second.mp3").read_bytes()


def test_invalid_speed_never_reaches_generation(provider, monkeypatch):
    cfg, _, _ = provider
    monkeypatch.setattr(ws, "generate", lambda *a: pytest.fail("must reject speed before paid call"))
    with pytest.raises(ValueError, match="speed"):
        ws.synth("Число.", "unused.mp3", {**cfg, "speed": 0})


def test_unconfigured_ws_voice_never_falls_back_to_edge(monkeypatch):
    monkeypatch.setattr(tts, "TTS_CFG", {"provider": "elevenlabs_ws", "voices": {"narr": {"voice": "Brian"}}})
    with pytest.raises(ValueError, match="не настроен"):
        asyncio.run(tts.synth("Число.", "unused.mp3", "pa"))
