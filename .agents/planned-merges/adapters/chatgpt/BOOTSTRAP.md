# ChatGPT Planned Merge Bootstrap

Use this bootstrap with exactly one planned-merge ChatGPT environment adapter.
It does not replace either canonical workflow.

## Load one fixed instruction revision

Resolve the selected `benoit-gl/agent-workflows` revision to an immutable commit
SHA. If the invocation does not select a branch, tag, or other ref, resolve the
tip of the repository's default branch. At that exact commit, read:

- `AGENTS.md`;
- `.agents/planned-merges/WORKFLOW.md`;
- `.agents/planned-merges/STATE_TEMPLATE.md`;
- `.agents/pr-reviews/WORKFLOW.md`;
- `.agents/pr-reviews/STATE_TEMPLATE.md`;
- `.agents/pr-reviews/adapters/chatgpt/BOOTSTRAP.md`;
- `.agents/pr-reviews/adapters/chatgpt/MODELS.md`; and
- exactly one planned-merge adapter plus the matching PR-review adapter:
  `CHAT.md` and `pr-reviews/.../CHAT.md`, or `WORK.md` and
  `pr-reviews/.../WORK.md`.

Record the commit and environment in planned-merge state. Keep that instruction
revision fixed for the session.

The planned merge workflow owns outer orchestration. The PR review workflow owns
inner review/fix/verification semantics. The environment adapters own only
capability facts and execution routes.

## Establish capabilities once

Inspect actual repository, PR, write, check, local-workspace, and fresh-context
capabilities needed by the current phase. Reuse the matching PR-review adapter's
delivery route for every inner `update-pr` run.

Do not infer Work availability from model availability. Do not claim a Q2+
merge point qualified unless its required Work campaign actually ran.

Use the shared portable tier mapping from
[the PR review model mapping](../../../pr-reviews/adapters/chatgpt/MODELS.md).
The planned merge workflow's qualification class decides when Strong or Frontier
review is mandatory.
