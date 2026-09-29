# ChatGPT Model Mapping

The canonical workflow selects a portable cost tier. Use this default mapping
when the named model and effort are available:

| Tier     | ChatGPT model   | Effort |
| -------- | --------------- | ------ |
| Economy  | `gpt-5.6-luna`  | medium |
| Standard | `gpt-5.6-terra` | medium |
| Strong   | `gpt-5.6-sol`   | high   |
| Frontier | `gpt-6-astra`   | low    |

Escalate only the affected subtask as directed by the workflow, then return
routine work to its default tier. If a mapped model or effort is unavailable,
choose the closest supported option and record the requested tier, substitution,
and reason. The mapping is configuration, not an acceptance prerequisite.
