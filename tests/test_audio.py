import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest
from unittest.mock import patch

import numpy as np
from scipy import signal

from audio_report import measure_audio, write_audio_report
from mixlib import Mix, SR, env_follow, rms


class EnvelopeTests(unittest.TestCase):
    def test_attack_and_release_are_seconds_not_blocks(self):
        source = np.concatenate([np.ones(2 * SR), np.zeros(2 * SR)])
        envelope = env_follow(source, att=0.03, rel=0.35)
        attack = np.flatnonzero(envelope >= 1 - np.exp(-1))[0] / SR
        release = np.flatnonzero(envelope[2 * SR:] <= np.exp(-1))[0] / SR
        # 30 Hz rectifier smoothing adds about 5 ms, one block adds <1 ms.
        self.assertAlmostEqual(attack, 0.03, delta=0.008)
        self.assertAlmostEqual(release, 0.35, delta=0.008)

    def test_invalid_times_and_silence(self):
        for att, rel in [(0, .35), (.03, -1), (float("nan"), .35)]:
            with self.assertRaises(ValueError):
                env_follow(np.ones(20), att=att, rel=rel)
        np.testing.assert_array_equal(env_follow(np.zeros(73)), np.zeros(73))
        self.assertEqual(len(env_follow(np.zeros(0))), 0)


class SpeechTests(unittest.TestCase):
    def test_episode_without_narr_keeps_voice_and_ducks(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "build").mkdir()
            (root / "build" / "story.json").write_text(json.dumps({"duration": 3}))
            (root / "build" / "words.json").write_text(json.dumps({
                "phrases": [{"id": "p1", "i": 0, "voice": "kol", "t0": 1, "t1": 2}],
                "words": [],
            }))
            source = np.zeros(4 * SR, np.float32)
            source[SR:2 * SR] = .2 * np.sin(2 * np.pi * 440 * np.arange(SR) / SR)
            with patch.object(Mix, "_vo", return_value=source) as load_voice:
                mix = Mix(root)
            load_voice.assert_called_once_with("kol")
            self.assertGreater(rms(mix.vo["kol"]), .2)
            self.assertFalse(np.any(mix.narr))
            self.assertGreater(mix.R_NARR, .3)
            duck = mix.duck()
            self.assertEqual(duck[SR // 2], 1)
            self.assertLess(duck[int(1.5 * SR)], .5)
            self.assertGreater(duck[int(3.5 * SR)], .95)

    def test_opposite_phase_voices_and_postprocessing_do_not_hide_speech(self):
        mix = Mix.__new__(Mix)
        mix.N = SR
        mix.narr = np.zeros(SR)
        voice = .2 * np.sin(2 * np.pi * 440 * np.arange(SR) / SR)
        mix.vo = {"a": voice, "b": -voice}
        self.assertLess(mix.duck()[SR // 2], .5)
        mix.vo = {"a": np.zeros(SR)}
        np.testing.assert_array_equal(mix.duck(), np.ones(SR))


@unittest.skipUnless(shutil.which("ffmpeg"), "Нужен ffmpeg")
class EncodedAudioTests(unittest.TestCase):
    def test_final_aac_measurements_hash_and_report(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            video = root / "encoded.mp4"
            subprocess.run([
                "ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i",
                "color=c=black:s=16x16:r=10:d=2", "-f", "lavfi", "-i",
                "sine=frequency=1000:sample_rate=48000:duration=2",
                "-af", "volume=6dB", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-b:a", "128k", "-shortest", str(video),
            ], check=True, capture_output=True)
            measurement = measure_audio(video)
            self.assertEqual(measurement["sha256"], hashlib.sha256(video.read_bytes()).hexdigest())
            self.assertAlmostEqual(measurement["integrated_lufs"], -15.1, delta=.7)
            # AAC может дать выброс на начале тона. Сверяем пик с независимым
            # четырёхкратным oversampling декодированных отсчётов.
            decoded = subprocess.run([
                "ffmpeg", "-v", "error", "-i", str(video), "-map", "0:a:0",
                "-f", "f32le", "-ac", "1", "-ar", str(SR), "-",
            ], check=True, capture_output=True).stdout
            samples = np.frombuffer(decoded, dtype="<f4")
            peak = 20 * np.log10(np.max(np.abs(signal.resample_poly(samples, 4, 1))))
            self.assertAlmostEqual(measurement["true_peak_dbtp"], peak, delta=.2)
            self.assertTrue(measurement["target_pass"])
            report_path = root / "build" / "audio_report.json"
            report = write_audio_report([video], report_path)
            self.assertEqual(json.loads(report_path.read_text()), report)
            self.assertEqual(report["listening_status"], "unknown")
            self.assertEqual(report["audio_outputs"][0], measurement)

    def test_missing_audio_is_an_error(self):
        with tempfile.TemporaryDirectory() as directory:
            video = Path(directory) / "silent-video.mp4"
            subprocess.run([
                "ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i",
                "color=c=black:s=16x16:r=10:d=0.1", "-an", "-c:v", "libx264", str(video),
            ], check=True, capture_output=True)
            with self.assertRaises(subprocess.CalledProcessError):
                measure_audio(video)


if __name__ == "__main__":
    unittest.main()
