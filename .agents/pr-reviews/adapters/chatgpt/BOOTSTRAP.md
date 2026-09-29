# ChatGPT PR Review Bootstrap

Use this bootstrap with exactly one ChatGPT environment adapter and the shared
model mapping. It does not replace the canonical workflow.

## Load one fixed instruction revision

At the start of the run, resolve the tip of the default branch of
`benoit-gl/agent-workflows` to an immutable commit SHA. At that exact commit,
read:

- `AGENTS.md`;
- `.agents/pr-reviews/WORKFLOW.md`;
- `.agents/pr-reviews/STATE_TEMPLATE.md`;
- `.agents/pr-reviews/adapters/chatgpt/MODELS.md`; and
- exactly one of `.agents/pr-reviews/adapters/chatgpt/CHAT.md` or
  `.agents/pr-reviews/adapters/chatgpt/WORK.md`.

Record the commit and selected adapter in the review state. Keep that instruction
revision fixed for the session. On resume, reload it; assess an intentional
instruction update before adopting it.

The canonical workflow owns authority, review semantics, acceptance criteria,
and completion. The adapter owns only environment capability facts and the route
used to satisfy the workflow.

## Establish capabilities once

Treat stable limits declared by the selected adapter as facts. Do not spend time
probing a known-unavailable checkout, authentication path, or delivery route.

Before review work begins, inspect actual schemas and availability for variable
capabilities the run needs, including repository reads and writes, PR metadata,
checks, temporary state, and fresh delegated contexts. Record unsupported
facilities and any substitution. A same-context surrogate is not independent and
cannot satisfy a repository requirement for independent review.

Use the portable cost tier selected by the workflow and map it through
[MODELS.md](MODELS.md). Record any unavailable mapping and substitution.

If a fresh reviewer context is unavailable, a bounded same-context surrogate may
perform a neutral re-read only when repository policy permits it. Give it the
fresh-round brief without earlier findings or conclusions, label the result as
non-independent, and report the limitation.
