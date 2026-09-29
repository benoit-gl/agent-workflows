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
> Use `update-pr` delivery: apply accepted fixes and deliver the reviewed tree
> to the existing PR head. Do not force-update it, change PR state, or merge.

Load the workflow explicitly when your runtime does not load remote instructions.
Environment adapters can specify tool use, state locations, delivery routes, and
concrete model mappings. The core workflow uses portable cost tiers and does not
require particular model names or agent presets.

A completed review may report unresolved findings. Solution convergence and
verified remote delivery are separate outcomes defined by the workflow. This
process does not replace CI, branch protection, or human acceptance and merge.
