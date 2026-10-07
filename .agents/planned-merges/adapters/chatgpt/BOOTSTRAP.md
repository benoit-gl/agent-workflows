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
- exactly one environment-matched adapter pair:
  `.agents/planned-merges/adapters/chatgpt/CHAT.md` and
  `.agents/pr-reviews/adapters/chatgpt/CHAT.md`, or
  `.agents/planned-merges/adapters/chatgpt/WORK.md` and
  `.agents/pr-reviews/adapters/chatgpt/WORK.md`.

Record the commit and environment in planned-merge state. Keep that instruction
revision fixed for the session.

The planned merge workflow owns outer orchestration. The PR review workflow owns
inner review/fix/verification semantics. The environment adapters own only
capability facts and execution routes.

## Establish capabilities once

Inspect actual repository, PR, write, check, local-workspace, and fresh-context
capabilities needed by the current phase. Reuse the matching PR-review adapter's
delivery route for every inner `update-pr` run.

Do not infer Work availability from model availability. Q2 and above require Work
and a fresh Standard-tier whole-PR qualification in a fresh reviewer context; the
PR-review same-context surrogate does not satisfy this outer qualification. Q3
adds Strong targeted review. Q4 adds Frontier targeted reconciliation. Do not
weaken these thresholds because the current reviewer is confident.

Use the shared portable tier mapping from
[the PR review model mapping](../../../pr-reviews/adapters/chatgpt/MODELS.md).
The planned merge workflow's qualification class decides when Strong or Frontier
review is mandatory.
