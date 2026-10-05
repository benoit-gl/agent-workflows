# ChatGPT Work Planned Merge Adapter

Load [BOOTSTRAP.md](BOOTSTRAP.md) from the same workflow revision and pair this
adapter with the existing PR-review Work adapter.

Work supports readiness assessment, planning edits, implementation, verification,
and final qualification. Use the local checkout and shell when available, and use
the PR-review Work adapter for authoritative remote delivery and check evidence.

## Verification and qualification campaign

Once Work starts because required verification or qualification requires it, keep
routine fixing, verification, and re-review in Work until qualification completes
or the canonical workflow reaches a human gate or capability blocker.

If the handoff arrived before provisional convergence because a required
verification capability exists only in Work, complete that verification and
resume the PR review workflow to convergence before final qualification.

Use the PR review workflow's normal cost tiers for routine work. Q2 and above
require a fresh Standard-tier whole-PR qualification. Q3 adds Strong targeted
review. Q4 adds Frontier targeted reconciliation. Record a class promotion before
performing newly mandatory higher-tier review.
