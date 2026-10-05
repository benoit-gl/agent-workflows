# Using the Planned Merge-Point Workflow

Read [WORKFLOW.md](WORKFLOW.md) for the lifecycle rules and
[STATE_TEMPLATE.md](STATE_TEMPLATE.md) for durable orchestration state. The
workflow uses the existing [PR review workflow](../pr-reviews/WORKFLOW.md) for
each PR convergence loop.

At the start of a run, resolve the selected `agent-workflows` revision to an
immutable commit. If the invocation does not select a revision, use the tip of the
repository's default branch. Load the planned-merge and PR-review workflow files
and adapters from that same commit.

Chat and Work are interchangeable execution environments. They are not synonyms
for planning and implementation. The normal cost-conscious path stays in Chat
through provisional convergence when Chat can satisfy every convergence
prerequisite. If required verification exists only in Work, hand off once after
all other Chat-capable convergence work is complete.

For quick reference: Q2 and above require Work and a fresh Standard-tier
whole-PR qualification. Q3 adds Strong targeted review. Q4 adds Frontier targeted
reconciliation. Qualification classes never decrease.

## Typical Chat invocation

> Run the planned merge-point workflow from `benoit-gl/agent-workflows` for
> Step `<x>`, Merge `<y>` in `<owner/repository>`. Use the Chat adapter.
> Assess readiness against the current repository. If the plan needs an
> unambiguous repair and planning edits are authorized, create a documentation
> draft PR and run `update-pr` to convergence. Otherwise implement the ready
> merge point, create a draft implementation PR, and run `update-pr` toward
> provisional convergence. If a required verification capability exists only in
> Work, complete all other Chat-capable convergence work and record that blocker
> in the handoff instead of treating it as passed. Stop for a human gate or
> capability blocker. If Work qualification is required, stop only when the Work
> handoff is complete and ready.

## Typical Work handoff invocation

> Continue the planned merge-point workflow for Step `<x>`, Merge `<y>` in
> `<owner/repository>` using the Work adapter. Re-resolve the current plan and
> implementation PR, then run the mandatory qualification campaign for the
> recorded class. Fix ordinary findings and update the PR autonomously. Do not
> return routine fixes to Chat. Stop only for a human gate, capability blocker,
> or completed qualification. Do not merge.

## Starting directly in Work

Work can also perform readiness, planning, and implementation from the start.
When Work is already the active environment, do not introduce a Chat handoff
merely to follow the default cost path. Continue the same canonical workflow.

## Human gates

Human gates require human judgment or authority and are limited to:

- materially different valid choices not settled by repository authority;
- substantial plan or scope changes;
- irreversible or destructive choices that require explicit approval; and
- planning or final merges.

Routine review findings, fixes, tests, documentation propagation, and additional
review rounds are not human gates. Manual environment handoffs and unavailable
required capabilities are operational stops; they are not by themselves human
decisions.

## Qualification summary

The workflow records Q0 through Q4 qualification. Q2 and above require Work and a
fresh Standard-tier whole-PR qualification, even when Chat review is clean. Q3
adds a mandatory Strong-tier targeted review. Q4 adds Frontier-tier targeted
reconciliation after Strong remains inconclusive. Qualification classes never
decrease.

See [EXERCISES.md](EXERCISES.md) for expected behavior in representative cases
and [ChatGPT adapters](adapters/chatgpt/README.md) for environment-specific
execution.
