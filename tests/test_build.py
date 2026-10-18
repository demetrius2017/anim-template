"""Короткий настоящий build: CLI -> render -> AAC обоих размеров -> hash/report."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

from engine_contracts import write_tts_manifest, sha256
from tts import VOICES

ROOT = Path(__file__).resolve().parents[1]


def test_encoded_build_reports_both_exact_outputs(tmp_path):
    for name in ('build.py', 'tts.py', 'engine_contracts.py', 'legacy_tts_receipts.py',
                 'audio_report.py', 'render.py', 'media_assets.py'):
        shutil.copy2(ROOT / name, tmp_path / name)
    for name in ('engine', 'fonts'):
        shutil.copytree(ROOT / name, tmp_path / name)
    work = tmp_path / 'eps' / 'probe'
    for name in ('build', 'audio'):
        (work / name).mkdir(parents=True, exist_ok=True)
    (work / 'build/script.json').write_text(json.dumps({'phrases': [{'id':'probe','text':'Проверка'}]}))
    (work / 'build/words.json').write_text(json.dumps({'duration':1,'words':[],'phrases':[]}))
    subprocess.run(['ffmpeg','-v','error','-f','lavfi','-i',
                    'sine=frequency=1000:sample_rate=48000:duration=1',
                    '-af','volume=6dB',str(work / 'audio/voice_narr.wav')], check=True)
    write_tts_manifest(work, VOICES)
    story = {'duration':1,'shots':[{'t0':0,'t1':1,'scene':'bedroom','p':{},
                                  'cam':{'z0':1,'z1':1,'drift':0}}],
             'overlays':[],'words':[],'pages':[]}
    (work / 'story.py').write_text('import os, pathlib, json\n'
        + 'pathlib.Path(os.environ["WORK"],"build/story.json").write_text(json.dumps(' + repr(story) + '))\n')
    (work / 'mix.py').write_text('import os, pathlib, shutil\n'
        + 'p=pathlib.Path(os.environ["WORK"])/"audio"\nshutil.copyfile(p/"voice_narr.wav",p/"mix.wav")\n')
    result = subprocess.run([sys.executable, str(tmp_path / 'build.py'), 'probe', '--skip-tts', '--jobs', '1'],
                            cwd=tmp_path, capture_output=True, text=True, timeout=120)
    assert result.returncode == 0, result.stdout + result.stderr
    report = json.loads((work / 'build/build_report.json').read_text())
    assert report['audio_targets_pass'] is True
    assert report['listening_status'] == report['editorial_status'] == 'unknown'
    assert len(report['audio_outputs']) == 2
    for item in report['audio_outputs']:
        assert item['sha256'] == sha256(item['path'])
        assert -16 <= item['integrated_lufs'] <= -14
        assert item['true_peak_dbtp'] <= -1
    assert report['inputs']['build/script.json'] == sha256(work / 'build/script.json')
    # Sheet samples are half-open too: never ask an imported final clip for t==duration.
    story['duration'] = story['shots'][0]['t1'] = 1.5
    (work / 'story.py').write_text('import os, pathlib, json\n'
        + 'pathlib.Path(os.environ["WORK"],"build/story.json").write_text(json.dumps(' + repr(story) + '))\n')
    sheet = subprocess.run([sys.executable, str(tmp_path / 'build.py'), 'probe', '--skip-tts', '--sheet'],
                           cwd=tmp_path, capture_output=True, text=True, timeout=60)
    assert sheet.returncode == 0, sheet.stdout + sheet.stderr
    assert len(list((work / 'qa/sheet_frames').glob('f*.png'))) == 1
