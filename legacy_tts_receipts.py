"""Frozen 2026-10-18 example baseline; never enroll arbitrary unhashed TTS outputs.

This migration receipt binds observed legacy script/words/voice bytes, not a
listening acceptance or proof of historic synthesis provenance.
"""
EXAMPLE = {'outputs': {'audio/voice_kol.wav': '175d7da99bbe6c245b21f427d57ecea5c292005c73daa797449ea23824343a40',
             'audio/voice_narr.wav': '738bf50802b0653d8883e305f0289cb088df041af40319f61cca492a2da20858',
             'build/words.json': 'aeb4a1d4ec92a09b02ee767a5677809f6c5f1bc291cc7889953519dc25d836a3'},
 'schema_version': 1,
 'script_sha256': 'a36099d3ba03f236444e2fae63d8355c95daec8ef40e0ef23131c218d0323f46',
 'voice_settings_sha256': '07bacb9d9f272b210453ce68e620f9cc0c4cc0924e0ae2fc2aa2852b885a7c40'}
