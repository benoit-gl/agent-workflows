# Using the PR Review Workflow

Read [WORKFLOW.md](WORKFLOW.md) for process rules. Use
[STATE_TEMPLATE.md](STATE_TEMPLATE.md) for the control record and
[EXERCISES.md](EXERCISES.md) to evaluate behavior.

## Invocation examples

Read-only review:

> Review PR `<number>` in `<owner/repository>` using the PR review workflow
> from `benoit-gl/agent-workflows`. Use `review-only` delivery.
> Do not edit, commit, push, or change PR state.

A normal read-only review is one broad pass. Request repeated read-only rounds
explicitly if needed. Findings can remain unresolved when the review is complete.

Update an existing PR:

> Run the iterative PR review workflow from `benoit-gl/agent-workflows` on PR
> `<number>` in `<owner/repository>`. Use `update-pr` delivery and the environment
> adapter selected for your runtime. Apply accepted fixes and deliver the exact
> reviewed tree to the existing head branch. Do not force-update, approve, close,
> enable auto-merge, change PR state, or merge.

Local fixes:

> Run the iterative PR review workflow from `benoit-gl/agent-workflows` on the
> current branch against `<base>`. Use `local-fix` delivery and
> `<include/exclude>` uncommitted changes. Do not commit or push.

## Environment setup

Use a checkout of the target repository when available. An environment adapter
may specify another source-access route and state location. It must identify
unsupported steps and any loss of review isolation.

Bundled adapters:

- [ChatGPT Chat and Work](adapters/chatgpt/README.md)

Keep process state untracked; prefer the checkout's local Git exclude. Load the
workflow and template at one recorded revision. Model and runtime choices belong
to the invocation or environment adapter, not copied workflow variants.

When reporting an exercise, include observed results and evidence rather than
merely confirming that the instructions were read. Formatting/link checks do not
establish behavioral compliance.
