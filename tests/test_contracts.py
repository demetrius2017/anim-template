import copy
import json
from pathlib import Path
import pytest
from engine_contracts import ContractError, validate_script, validate_story, write_tts_manifest, verify_tts_manifest
from storylib import Ep

VOICES = {'narr': ('ru-RU-DmitryNeural', '+22%', '-6Hz')}


def script():
    return {'phrases': [{'id': 'p', 'text': 'Привет миру'}]}


def story():
    return {'duration': 2, 'shots': [{'scene': 'demo', 't0': 0, 't1': 1},
                                    {'scene': 'demo', 't0': 1, 't1': 2}]}


@pytest.mark.parametrize('mutate', [
    lambda s: s['phrases'][0].update(puase=1),
    lambda s: s['phrases'][0].update(pause=1,pause_after=1),
    lambda s: s['phrases'][0].update(pause_after=-1),
    lambda s: s['phrases'][0].update(pause_after=float('nan')),
    lambda s: s['phrases'][0].update(voice='unknown'),
    lambda s: s['phrases'].append(copy.deepcopy(s['phrases'][0])),
])
def test_script_rejects_invalid(mutate):
    s = script(); mutate(s)
    with pytest.raises(ContractError): validate_script(s, VOICES)


@pytest.mark.parametrize('mutate', [
    lambda s: s['shots'][0].update(scene='missing'),
    lambda s: s['shots'][1].update(t0=.9),
    lambda s: s['shots'][1].update(t0=1.1),
    lambda s: s['shots'][0].update(t1=0),
    lambda s: s['shots'][0].update(cam={'hold': [[0,.7],[.5,.9]]}),
    lambda s: s.update(pages=[[7]]),
])
def test_story_rejects_invalid(mutate):
    s=story(); mutate(s)
    with pytest.raises(ContractError): validate_story(s, {'demo'})


def test_valid_overlays_can_overlap():
    s=story(); s['overlays']=[{'kind':'vf','t0':0,'t1':2}, {'kind':'track','t0':0,'t1':2}]
    validate_story(s, {'demo'})


def make_receipt(tmp_path):
    (tmp_path/'build').mkdir(); (tmp_path/'audio').mkdir()
    (tmp_path/'build/script.json').write_text(json.dumps(script()))
    (tmp_path/'build/words.json').write_text('{}')
    (tmp_path/'audio/voice_narr.wav').write_bytes(b'fixture voice')
    return write_tts_manifest(tmp_path, VOICES)


@pytest.mark.parametrize('changed', ['build/script.json','build/words.json','audio/voice_narr.wav','settings','missing_manifest'])
def test_skip_tts_rejects_stale_inputs(tmp_path, changed):
    make_receipt(tmp_path)
    verify_tts_manifest(tmp_path, VOICES)
    voices = copy.deepcopy(VOICES)
    if changed == 'settings': voices['narr'] = ('other', '+22%', '-6Hz')
    elif changed == 'missing_manifest': (tmp_path/'build/tts_manifest.json').unlink()
    elif changed == 'build/script.json':
        s=script(); s['phrases'][0]['text']='Другой текст'
        (tmp_path/changed).write_text(json.dumps(s))
    else: (tmp_path/changed).write_bytes(b'changed')
    with pytest.raises(ContractError, match='skip-tts'): verify_tts_manifest(tmp_path, voices)


def test_tts_hash_ignores_json_formatting(tmp_path):
    receipt = make_receipt(tmp_path)
    (tmp_path/'build/script.json').write_text(json.dumps(script(),indent=4))
    assert verify_tts_manifest(tmp_path, VOICES)==receipt


def test_caption_pause_token_map_and_story_anchors(tmp_path):
    (tmp_path/'build').mkdir()
    (tmp_path/'build/script.json').write_text(json.dumps(script()))
    words=[{'w':'сорок','c':'','ph':0,'token_id':'p.0','t0':0,'t1':.3},
           {'w':'семь','c':'y','ph':0,'token_id':'p.1','t0':.3,'t1':.6,'emphasis':True,'focus':'result','pause_after':.8},
           {'w':'акций','c':'','ph':0,'token_id':'p.2','t0':1.4,'t1':1.8}]
    data={'duration':2,'voice_end':1.8,'words':words,
          'phrases':[{'id':'p','i':0,'t0':0,'t1':1.8,'pause_after':.2,'pause_t0':1.8,'pause_t1':2,
                      'segments':[{'i':0,'pause_after':.8,'pause_t0':.6,'pause_t1':1.4}]}]}
    (tmp_path/'build/words.json').write_text(json.dumps(data))
    e=Ep(tmp_path)
    assert e.token('p.1')==.3 and e.focus('result',end=True)==.6 and e.pause_end('p')==2
    with pytest.raises(ContractError): e.token('lost')
    e.shot('bedroom',0)
    e.write()
    result=json.loads((tmp_path/'build/story.json').read_text())
    assert result['words'][0]['w']=='47'
    assert result['words'][0]['emphasis'] is True
    assert result['words'][0]['focus']=='result'
    assert result['token_map']['p.1']['focus']=='result'
    assert result['token_map']['p.1']['caption_index']==0
    assert result['pages']==[[0],[1]]
    assert [(p['t0'],p['t1']) for p in result['pauses']]==[(.6,1.4),(1.8,2)]


def test_video_contract_rejects_short_source(tmp_path):
    path=tmp_path/'clip.mp4'; path.write_bytes(b'x')
    s={'duration':2,'shots':[{'t0':0,'t1':2,'source':{'kind':'video','path':'clip.mp4','out':1}}]}
    with pytest.raises(ContractError,match='не покрывает'): validate_story(s,work=tmp_path)
