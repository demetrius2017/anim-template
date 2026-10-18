"""Проверяемые контракты legacy-движка и квитанция повторного использования речи."""
import hashlib
import json
import math
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent


class ContractError(ValueError):
    pass


def sha256(path):
    h = hashlib.sha256()
    with Path(path).open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def json_hash(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False,
                                     separators=(',', ':'), allow_nan=False).encode()).hexdigest()


def fields(obj, allowed, where):
    if not isinstance(obj, dict):
        raise ContractError(f'{where}: ожидается объект')
    extra = set(obj) - set(allowed.split())
    if extra:
        raise ContractError(f'{where}: неизвестные поля {sorted(extra)}')


def number(value, where, minimum=None):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        raise ContractError(f'{where}: нужно конечное число')
    if minimum is not None and value < minimum:
        raise ContractError(f'{where}: значение должно быть >= {minimum}')
    return value


def pause(item, default=0):
    if 'pause' in item and 'pause_after' in item:
        raise ContractError('pause и pause_after неоднозначны: оставьте одно поле')
    return number(item.get('pause_after', item.get('pause', default)), 'pause_after', 0)


def validate_script(script, voices):
    fields(script, 'title lead tail end_card phrases', 'script')
    for name in ('lead', 'tail'):
        number(script.get(name, 0), name, 0)
    if 'end_card' in script:
        fields(script['end_card'], 'dur text', 'end_card')
        number(script['end_card'].get('dur', 0), 'end_card.dur', 0)
    phrases = script.get('phrases')
    if not isinstance(phrases, list) or not phrases:
        raise ContractError('script.phrases: нужен непустой список')
    ids, token_ids = set(), set()
    for i, ph in enumerate(phrases):
        fields(ph, 'id text spans voice pause pause_after emphasis focus rate pitch', f'phrase[{i}]')
        pid = ph.get('id', str(i))
        if not isinstance(pid, str) or not pid or pid in ids:
            raise ContractError(f'phrase id: пустой или повторный {pid!r}')
        ids.add(pid)
        if ph.get('voice', 'narr') not in voices:
            raise ContractError(f'{pid}: неизвестный голос')
        pause(ph, .12)
        if ('text' in ph) == ('spans' in ph):
            raise ContractError(f'{pid}: нужно ровно одно из text/spans')
        spans = ph.get('spans', [{'text': ph.get('text')}])
        if not isinstance(spans, list) or not spans:
            raise ContractError(f'{pid}: spans пуст')
        index = 0
        for sp in spans:
            fields(sp, 'text token_id emphasis focus pause_after rate pitch', f'{pid}.span')
            if not isinstance(sp.get('text'), str) or not sp['text'].strip():
                raise ContractError(f'{pid}: текст пуст')
            pause(sp)
            tokens = sp['text'].split()
            if 'token_id' in sp and len(tokens) != 1:
                raise ContractError(f'{pid}: token_id допустим для одного слова')
            for _ in tokens:
                tid = sp.get('token_id', f'{pid}.{index}')
                if not isinstance(tid, str) or not tid or tid in token_ids:
                    raise ContractError(f'token_id: пустой или повторный {tid!r}')
                token_ids.add(tid)
                index += 1
            for obj in (ph, sp):
                if 'emphasis' in obj and not isinstance(obj['emphasis'], bool):
                    raise ContractError(f'{pid}: emphasis должен быть bool')
                if 'focus' in obj and (not isinstance(obj['focus'], str) or not obj['focus']):
                    raise ContractError(f'{pid}: focus должен быть непустой строкой')
                for key, pattern in [('rate', r'[+-]\d+%'), ('pitch', r'[+-]\d+Hz')]:
                    if key in obj and (not isinstance(obj[key], str) or not re.fullmatch(pattern, obj[key])):
                        raise ContractError(f'{pid}: неверный {key}')
    return script


def scene_names():
    names = set()
    for path in [ROOT / 'engine/scenes.js', *sorted((ROOT / 'engine/scenes').glob('*.js'))]:
        names.update(re.findall(r'\bSCENES\.([A-Za-z_$][\w$]*)\s*=', path.read_text()))
    return names


def interval(a, b, where):
    number(a, where + '.t0')
    number(b, where + '.t1')
    if b <= a:
        raise ContractError(f'{where}: пустой или обратный интервал [{a},{b})')


def disjoint(items, where):
    last = None
    for a, b in items:
        interval(a, b, where)
        if last is not None and a < last - 1e-9:
            raise ContractError(f'{where}: перекрывающиеся или неупорядоченные интервалы')
        last = b


def validate_story(story, scenes=None, work=None):
    fields(story, 'duration shots overlays words pages fades kicks capFrom0 capOff look token_map pauses frame scripts', 'story')
    if 'frame' in story and not (isinstance(story['frame'], list) and len(story['frame']) == 2 and all(isinstance(v, (int, float)) and v > 0 for v in story['frame'])):
        raise ContractError('frame: нужен [ширина, высота] > 0')
    duration = number(story.get('duration'), 'duration', 0)
    shots = story.get('shots')
    if not duration or not isinstance(shots, list) or not shots:
        raise ContractError('story: нужны duration > 0 и непустые shots')
    known = scene_names() if scenes is None else scenes
    for i, sh in enumerate(shots):
        fields(sh, 't0 t1 scene source p cam', f'shot[{i}]')
        interval(sh.get('t0'), sh.get('t1'), f'shot[{i}]')
        if i == 0 and sh['t0'] > 0:
            raise ContractError('shots: пустота в начале')
        if i and abs(sh['t0'] - shots[i-1]['t1']) > 1e-9:
            raise ContractError('shots: пустота или перекрывающиеся интервалы')
        if ('scene' in sh) == ('source' in sh):
            raise ContractError('shot: нужно ровно одно из scene/source')
        if 'scene' in sh and sh['scene'] not in known:
            raise ContractError(f'неизвестная сцена: {sh["scene"]}')
        if 'source' in sh:
            src = sh['source']
            fields(src, 'kind path in out speed fit', 'source')
            if src.get('kind') != 'video':
                raise ContractError('source.kind: поддерживается video')
            path = src.get('path')
            if not isinstance(path, str) or not path or '://' in path:
                raise ContractError('source.path: нужен локальный файл')
            start = number(src.get('in', 0), 'source.in', 0)
            end = number(src.get('out'), 'source.out', 0)
            speed = number(src.get('speed', 1), 'source.speed', 0)
            if not speed or end <= start or sh['t1'] - sh['t0'] > (end-start)/speed + 1e-6:
                raise ContractError('source: интервал клипа не покрывает план')
            if src.get('fit', 'contain') not in ('contain', 'cover'):
                raise ContractError('source.fit: нужен contain или cover')
            if work is not None and not (Path(work) / path).is_file():
                raise ContractError(f'нет ресурса: {path}')
        if not isinstance(sh.get('p', {}), dict):
            raise ContractError('shot.p: нужен объект')
        cam = sh.get('cam', {})
        fields(cam, 'z0 z1 x0 x1 y0 y1 ox oy drift kicks hold look', 'camera')
        for key in set(cam) - {'hold', 'look'}:
            number(cam[key], 'camera.' + key)
            if key in ('z0', 'z1') and cam[key] <= 0:
                raise ContractError('camera: zoom должен быть положительным')
            if key in ('drift', 'kicks') and cam[key] < 0:
                raise ContractError('camera: gain должен быть >= 0')
        disjoint(cam.get('hold', []), 'camera.hold')
        for a, b in cam.get('hold', []):
            if a < sh['t0'] or b > sh['t1']:
                raise ContractError('camera.hold: интервал за границами плана')
    if abs(shots[-1]['t1'] - duration) > 1e-9:
        raise ContractError('shots: конец не совпадает с duration')
    for name in ('overlays', 'fades'):
        for item in story.get(name, []):
            interval(item.get('t0'), item.get('t1'), name)
    # Наложения разных видов намеренно одновременны; fades/capOff — одна дорожка.
    disjoint([(x['t0'], x['t1']) for x in story.get('fades', [])], 'fades')
    disjoint(story.get('capOff', []), 'capOff')
    for t in story.get('kicks', []):
        number(t, 'kick')
    words = story.get('words', [])
    for word in words:
        a, b = number(word.get('t0'), 'word.t0'), number(word.get('t1'), 'word.t1')
        if a < 0 or b < a or b > duration + 1e-6:
            raise ContractError('word: неверный интервал')
    for page in story.get('pages', []):
        if not page or any(type(i) is not int or i < 0 or i >= len(words) for i in page):
            raise ContractError('pages: потерянная ссылка на слово')
    for tid, entry in story.get('token_map', {}).items():
        idx = entry.get('caption_index')
        if type(idx) is not int or not 0 <= idx < len(words):
            raise ContractError(f'token_map: потерянный токен {tid}')
    return story


def tts_receipt(work, voice_settings):
    work = Path(work)
    script = json.loads((work / 'build/script.json').read_text())
    validate_script(script, voice_settings)
    voices = sorted({p.get('voice', 'narr') for p in script['phrases']})
    files = ['build/words.json', *[f'audio/voice_{v}.wav' for v in voices]]
    return {'schema_version': 1, 'script_sha256': json_hash(script),
            'voice_settings_sha256': json_hash({v: voice_settings[v] for v in voices}),
            'outputs': {name: sha256(work / name) for name in files}}


def write_tts_manifest(work, voice_settings, expected_script=None):
    path = Path(work) / 'build/tts_manifest.json'
    receipt = tts_receipt(work, voice_settings)
    if expected_script is not None and receipt['script_sha256'] != json_hash(expected_script):
        raise ContractError('Сценарий изменился во время TTS; озвучку нужно повторить')
    tmp = path.with_suffix('.tmp')
    tmp.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + '\n')
    tmp.replace(path)
    return receipt


def verify_tts_manifest(work, voice_settings):
    work = Path(work)
    try:
        actual = tts_receipt(work, voice_settings)
        path = work / 'build/tts_manifest.json'
        if path.exists():
            expected = json.loads(path.read_text())
        else:
            # Только точный замороженный пример, не автоматическое доверие старым файлам.
            from legacy_tts_receipts import EXAMPLE
            expected = EXAMPLE
        if actual != expected:
            raise ContractError('--skip-tts: сценарий, настройки голоса или файлы озвучки изменились; повторите TTS')
    except (OSError, json.JSONDecodeError) as exc:
        raise ContractError(f'--skip-tts: нет проверяемой озвучки; повторите TTS ({exc})') from exc
    return actual
