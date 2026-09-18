# agent-workflows

Reusable workflow instructions for AI coding agents.

This repository keeps agent process guidance separate from product repositories. Target repositories remain responsible for their own contribution rules, architecture, coding standards, and acceptance criteria.

## PR review workflow

The initial workflow provides an iterative review-until-converged protocol:

- `AGENTS.md` contains general delegation and PR-review guidance.
- `.agents/pr-reviews/WORKFLOW.md` defines the review, triage, fix, verification, and convergence loop.
- `.agents/pr-reviews/STATE_TEMPLATE.md` provides a compact control record for one review.
- `.agents/pr-reviews/README.md` describes how to invoke and exercise the workflow.

The protocol discovers ordinary human-facing target-repository governance,
requires findings to cite their governing invariants, distinguishes local review
from PR update and merge authority, and verifies the exact pushed revision when
remote delivery is requested. Target repositories do not need agent-specific
instruction files.

## Usage

Run the agent from the target repository and explicitly reference this workflow when the agent does not load remote instructions automatically. For example:

> Review PR 19 using the PR review workflow from `benoit-gl/agent-workflows`.
> Use `update-pr` delivery: apply accepted fixes, commit them, and push normally
> to the existing PR head. Do not force-push, change PR state, or merge.

The workflow may create local review state under `.agents/pr-reviews/state/` in the target working tree. Keep that state untracked. Prefer a local Git exclude such as `.git/info/exclude` when the target repository does not already ignore the path.

The workflow is advisory process infrastructure. It does not replace CI, branch protection, required human review, or repository-specific rules.
