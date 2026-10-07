# ChatGPT Planned Merge Adapters

These adapters bind the provider-neutral
[planned merge-point workflow](../../WORKFLOW.md) to ChatGPT Chat and Work. The
canonical workflow owns readiness, scope, qualification, and handoff rules.

The planned merge workflow uses the existing ChatGPT PR review adapters for its
inner `update-pr` loops. Load all required files from one immutable
`agent-workflows` revision. If the invocation does not select a revision, use
the tip of the repository's default branch.

- [Chat entry point](CHAT.md)
- [Work entry point](WORK.md)
- [Shared bootstrap](BOOTSTRAP.md)
- [Shared model mapping](../../../pr-reviews/adapters/chatgpt/MODELS.md)

## Cost model

For the current ChatGPT operating model, treat Chat as the lower-cost default:
ordinary Chat work does not consume the scarce Work usage quota, while Work does.
This is an environment assumption, not a permanent workflow invariant. Reassess
it if product limits or pricing change.

Conserve Work quota without weakening evidence. Complete all work that Chat can
satisfy before handoff. When one fresh Standard-tier whole-PR Work review on the
unchanged complete PR independently satisfies both the PR-review convergence gate
and Q2+ whole-PR qualification, record it against both gates instead of running a
duplicate Work review.

## Chat entry

Use Chat as the normal cost-conscious environment for readiness, planning, and
implementation. Stay through provisional convergence when Chat can satisfy every
convergence prerequisite. If a required convergence capability exists only in
Work, including a fresh reviewer context, complete all other Chat-capable work,
prepare the handoff, and stop without claiming convergence. For a planning PR,
use that planning PR as the active handoff PR; an implementation PR and
qualification class are not prerequisites. If the recorded class otherwise
requires Work after implementation convergence, prepare the qualification handoff
and stop without claiming qualification.

## Work entry

Work can execute every phase. For a planning-phase handoff, finish the planning
PR convergence loop and stop as `awaiting human planning merge` before
implementation. For an implementation handoff, once Work starts because a
required convergence capability or qualification requires it, keep the merge
point in Work through routine fixing, verification, and re-review until
qualification completes or a stop condition is reached. Q2 and above require a
fresh Standard-tier whole-PR qualification; reuse a convergence-closing Work
review when it independently
satisfies that same qualification contract. Q3 adds Strong targeted review; Q4
adds Frontier targeted reconciliation.

A manual environment handoff and a capability blocker are not by themselves
human gates. The environment choice never changes repository authority or merge
permission.
