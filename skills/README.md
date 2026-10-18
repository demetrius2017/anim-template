# Навык `animate` для агентов

Один и тот же порядок работы с движком для двух агентов.

| Агент | Вызов | Куда установить |
|---|---|---|
| Claude Code | `/animate <тема>` | `cp -R skills/claude/animate ~/.claude/skills/` |
| Codex CLI | `$animate <тема>` | `cp -R skills/codex/animate ~/.codex/skills/` |

В Codex навык подключается только явным вызовом `$animate` (`agents/openai.yaml`: `allow_implicit_invocation: false`).
Claude-версия отдаёт тяжёлые шаги (сцены, рендер, приёмка) Codex в tmux; Codex-версия делает всё сама.
Образец эпизода — `eps/spy_flow`.
