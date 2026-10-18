import hashlib
import json
from pathlib import Path
import subprocess

import pytest

from media_assets import prepare_media, frame_for_time, video_frame_index

ROOT = Path(__file__).resolve().parents[1]


@pytest.fixture
def video_story(tmp_path):
    clip = tmp_path / "sample.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-f", "lavfi", "-i",
                    "testsrc2=size=64x96:rate=30:duration=0.4", "-c:v", "libx264",
                    "-pix_fmt", "yuv420p", str(clip)], check=True)
    story = {"duration": .2, "shots": [{"t0": 0, "t1": .2,
             "source": {"kind": "video", "path": "sample.mp4", "in": .1,
                        "out": .3, "speed": 1, "fit": "contain"},
             "cam": {"z0": 1, "z1": 1, "drift": 0, "kicks": 0}}],
             "overlays": [], "words": [], "pages": [], "kicks": []}
    return story, tmp_path


def test_indexed_video_random_access_and_boundaries(video_story):
    story, root = video_story
    prepared = prepare_media(story, root)
    shot, info = story["shots"][0], prepared[0]
    assert info["count"] == 12
    assert video_frame_index(shot, 0, info) == 3
    assert video_frame_index(shot, 1 / 30, info) == 4
    assert video_frame_index(shot, .2 - 1e-7, info) == 8
    with pytest.raises(ValueError, match="half-open"):
        video_frame_index(shot, .2, info)
    assert frame_for_time(story, .2, prepared) is None
    first = {t: frame_for_time(story, t, prepared) for t in [0, .1, .19]}
    assert len(set(first.values())) == 3
    reused = prepare_media(story, root)
    for t in [.19, 0, .1, 0]:
        assert frame_for_time(story, t, reused) == first[t]
    shot["source"]["speed"] = 2
    shot["t1"] = .1
    assert video_frame_index(shot, 1 / 30, info) == 5
    shot["t1"] = .2
    with pytest.raises(ValueError, match="out point"):
        prepare_media(story, root)
    shot["t1"] = .1
    shot["source"]["out"] = 2
    with pytest.raises(ValueError, match="Invalid video"):
        prepare_media(story, root)
    shot["source"]["out"] = .3
    shot["source"]["speed"] = 0
    with pytest.raises(ValueError, match="Invalid video"):
        prepare_media(story, root)
    shot["source"]["speed"] = 1
    (Path(info["directory"]) / "f00000003.png").write_bytes(b"corrupted")
    with pytest.raises(ValueError, match="hash mismatch"):
        frame_for_time(story, 0, prepared)


def test_camera_hold_and_shared_transform():
    script = (ROOT / "engine/lib.js").read_text() + "\n" + (ROOT / "engine/runtime.js").read_text()
    script += """
S = {kicks: [1.2, 1.5]};
const sh = {t0: 0, t1: 4, cam: {z0: 1, z1: 2, x1: 20, hold: [[1, 2]]}};
const held = [1.7, 1, 1.99, 1.3].map(t => cameraState(sh, t));
const mapped = toScreen(sh, 1.7, 180, 320);
const moving = cameraState(sh, 2);
const fixed = {t0: 0, t1: 4, cam: {z0: 1, z1: 1, drift: 0, kicks: 0}};
console.log(JSON.stringify({held, mapped, moving, fixed: [0,1.23,3].map(t => cameraState(fixed,t))}));
"""
    result = json.loads(subprocess.check_output(["node", "-e", script], text=True))
    assert all(c == result["held"][0] for c in result["held"])
    assert result["moving"] != result["held"][0]
    assert len({json.dumps(c, sort_keys=True) for c in result["fixed"]}) == 1
    held = result["held"][0]
    assert result["mapped"] == [180 + round(held["x"], 2), 320 + round(held["y"], 2), held["z"]]


def test_video_render_pixels_repeat_in_reverse_order(video_story):
    from render import run
    from PIL import Image
    story, root = video_story
    paths = run([.1, 0, .1, .19], root / "frames", story, episode_root=root)
    hashes = [hashlib.sha256(path.read_bytes()).hexdigest() for path in paths]
    assert hashes[0] == hashes[2]
    assert hashes[0] != hashes[1]
    # Colorful actual imported pixels, not an empty black frame.
    image = Image.open(paths[0]).convert("RGB")
    assert len(image.crop((250, 500, 800, 950)).getcolors(550 * 450)) > 100


def test_captions_hold_explicit_pause_and_emphasis():
    script = (ROOT / "engine/lib.js").read_text() + "\n" + (ROOT / "engine/runtime.js").read_text()
    script += """
const cap = {innerHTML: '', style: {}};
global.document = {getElementById: () => cap};
S = {words: [
  {w: 'Смотрите', t0: 0, t1: .4, emphasis: true, focus: 'date"<', pause_after: 2.6, pause_t0: .4, pause_t1: 3},
  {w: 'Дальше', t0: 3, t1: 3.4}], pages: [[0], [1]]};
const held = [.2, 1.5, 2.99, 3].map(t => { captions(t); return cap.innerHTML; });
S.words[0].c = 'r'; captions(.2); const color = cap.innerHTML;
delete S.words[0].pause_t1; delete S.words[0].pause_t0; delete S.words[0].pause_after;
captions(1.5); const legacyGap = cap.innerHTML;
captions(2.99); const legacyNext = cap.innerHTML;
console.log(JSON.stringify({held, color, legacyGap, legacyNext}));
"""
    result = json.loads(subprocess.check_output(["node", "-e", script], text=True))
    assert all('Смотрите' in text and 'Дальше' not in text for text in result['held'][:3])
    assert 'Дальше' in result['held'][3]
    assert 'class="w on y"' in result['held'][0]
    assert 'data-focus="date&quot;&lt;"' in result['held'][0]
    assert 'class="w on r"' in result['color']
    assert result['legacyGap'] == ''
    assert 'Дальше' in result['legacyNext']
