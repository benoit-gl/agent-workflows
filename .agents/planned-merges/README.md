# Using the Planned Merge-Point Workflow

Read [WORKFLOW.md](WORKFLOW.md) for the lifecycle rules and
[STATE_TEMPLATE.md](STATE_TEMPLATE.md) for durable orchestration state. The
workflow uses the existing [PR review workflow](../pr-reviews/WORKFLOW.md) for
each PR convergence loop.

Chat and Work are interchangeable execution environments. They are not synonyms
for planning and implementation. The normal cost-conscious path stays in Chat
through provisional convergence and switches to Work once only when the
qualification class requires it.

## Typical Chat invocation

> Run the planned merge-point workflow from `benoit-gl/agent-workflows` for
> Step `<x>`, Merge `<y>` in `<owner/repository>`. Use the Chat adapter.
> Assess readiness against the current repository. If the plan needs an
> unambiguous repair and planning edits are authorized, create a documentation
> draft PR and run `update-pr` to convergence. Otherwise implement the ready
> merge point, create a draft implementation PR, and run `update-pr` to
> provisional convergence. Stop for material user decisions or a human planning
> merge. If Work qualification is required, stop only when the Work handoff is
> complete and ready.

## Typical Work handoff invocation

> Continue the planned merge-point workflow for Step `<x>`, Merge `<y>` in
> `<owner/repository>` using the Work adapter. Re-resolve the current plan and
> implementation PR, then run the mandatory qualification campaign for the
> recorded class. Fix ordinary findings and update the PR autonomously. Do not
> return routine fixes to Chat. Stop only for a material user decision, scope
> replanning, an unavailable required capability, or completed qualification.
> Do not merge.

## Starting directly in Work

Work can also perform readiness, planning, and implementation from the start.
When Work is already the active environment, do not introduce a Chat handoff
merely to follow the default cost path. Continue the same canonical workflow.

## Human gates

Human intervention is expected for:

- materially different valid designs not settled by repository authority;
- scope split, reordering, or another substantial plan change;
- planning PR merge;
- irreversible or destructive choices that require explicit approval; and
- final implementation PR acceptance and merge.

Routine review findings, fixes, tests, documentation propagation, and additional
review rounds are not human gates.

## Qualification summary

The workflow records Q0 through Q4 qualification. Q2 and above require Work even
when Chat review is clean. Q3 adds a mandatory Strong-tier targeted review. Q4
adds Frontier-tier targeted reconciliation after Strong remains inconclusive.

See [EXERCISES.md](EXERCISES.md) for expected behavior in representative cases
and [ChatGPT adapters](adapters/chatgpt/README.md) for environment-specific
execution.
