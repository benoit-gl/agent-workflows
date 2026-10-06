# ChatGPT Work Planned Merge Adapter

Load [BOOTSTRAP.md](BOOTSTRAP.md) from the same workflow revision and pair this
adapter with the existing PR-review Work adapter.

Work supports readiness assessment, planning edits, implementation, verification,
and final qualification. Use the local checkout and shell when available, and use
the PR-review Work adapter for authoritative remote delivery and check evidence.

## Planning PR handoff

If Work receives a planning-phase handoff, re-resolve the planning PR and head,
complete the missing convergence capability, and resume the PR review workflow in
`update-pr` mode until the planning PR converges. Then stop at the human
planning-merge gate. Do not start implementation or qualification before the
revised plan lands.

## Verification and qualification campaign

Once Work starts because a required convergence capability or qualification
requires it, keep routine fixing, verification, and re-review in Work until
qualification completes or the canonical workflow reaches a human gate or
capability blocker.

If the handoff arrived before provisional convergence because a required
capability exists only in Work, complete that capability and resume the PR review
workflow to convergence before final qualification.

Use the PR review workflow's normal cost tiers for routine work. Q2 and above
require a fresh Standard-tier whole-PR qualification. When a fresh Standard-tier
whole-PR Work review on the unchanged complete PR is also the review that closes
PR-review convergence, record that one review against both gates instead of
running a duplicate review. Q3 adds Strong targeted review. Q4 adds Frontier
targeted reconciliation. Record a class promotion before performing newly
mandatory higher-tier review.
