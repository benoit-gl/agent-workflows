# agent-workflows

Reusable workflow instructions for AI coding agents. Target repositories own
their product requirements, architecture, contribution rules, and acceptance
criteria.

## PR review

[WORKFLOW.md](.agents/pr-reviews/WORKFLOW.md) is the authority for iterative PR
review. It covers read-only review, local fixes, and updates to an existing PR.
It requires evidence-based findings, semantic propagation checks, fresh broad
reviews, and verification of the exact content delivered.

- [Invocation examples](.agents/pr-reviews/README.md)
- [Review state template](.agents/pr-reviews/STATE_TEMPLATE.md)
- [Behavioral exercises](.agents/pr-reviews/EXERCISES.md)
- [Bundled environment adapters](.agents/pr-reviews/adapters/chatgpt/README.md)
- [Agent entry point](AGENTS.md)
- [Contribution rules](CONTRIBUTING.md)

Example:

> Review PR 19 using the PR review workflow from `benoit-gl/agent-workflows`.
> Use `update-pr` delivery: apply accepted fixes, deliver the reviewed tree to
> the existing PR head, and keep the PR description accurate. Do not change the
> PR title, force-update it, change PR state, or merge.

Load the workflow explicitly when your runtime does not load remote instructions.
Resolve the selected workflow revision to a commit SHA, using the repository's
default-branch tip unless the invocation explicitly selects another revision.
Load every workflow and adapter file from that commit. Environment adapters can
specify tool use, state locations, delivery routes, and concrete model mappings.
The core workflow uses portable cost tiers and does not require particular model
names or agent presets.

A completed review may report unresolved findings. Solution convergence and
verified remote delivery are separate outcomes defined by the workflow. This
process does not replace CI, branch protection, or human acceptance and merge.

## Planned merge points

[WORKFLOW.md](.agents/planned-merges/WORKFLOW.md) orchestrates a repository plan
unit from readiness assessment through implementation and final qualification.
It treats Chat and Work as interchangeable execution environments, keeps the PR
review workflow as the inner convergence engine, and uses objective qualification
classes to require stronger independent review when the change warrants it.

The default cost policy keeps work in Chat through provisional convergence when
Chat can satisfy every convergence prerequisite. If a required convergence
capability exists only in Work, including a fresh reviewer context, it hands off
once after all other Chat-capable convergence work is complete. A planning PR
uses that same handoff when its convergence is blocked by a Work-only capability;
it does not wait for an implementation PR. Work finishes the planning PR
convergence loop and stops at the planning-merge gate. For an implementation
handoff, Work fixes routine findings and continues qualification without bouncing
work back to Chat. When one fresh Standard-tier Work whole-PR review on unchanged
content satisfies both the convergence and Q2+ qualification contracts, the same
review is recorded for both instead of being repeated.

Q2 and above require Work and a fresh Standard-tier whole-PR qualification. Q3
adds Strong targeted review, and Q4 adds Frontier targeted reconciliation.
Qualification classes never decrease. Human gates require human judgment or
authority and are limited to materially different valid choices not settled by
repository authority, substantial plan or scope changes, irreversible or
destructive approval, and planning or final merges. Completing an explicitly
requested phase is normal task completion; lack of authority for an unrequested
later phase is not by itself a human gate. Manual environment handoffs and
unavailable capabilities are operational stops, not by themselves human
decisions.

- [Invocation examples](.agents/planned-merges/README.md)
- [Workflow state template](.agents/planned-merges/STATE_TEMPLATE.md)
- [Behavioral exercises](.agents/planned-merges/EXERCISES.md)
- [ChatGPT adapters](.agents/planned-merges/adapters/chatgpt/README.md)
