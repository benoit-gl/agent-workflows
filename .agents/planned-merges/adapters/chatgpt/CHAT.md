# ChatGPT Chat Planned Merge Adapter

Load [BOOTSTRAP.md](BOOTSTRAP.md) from the same workflow revision and pair this
adapter with the existing PR-review Chat adapter.

Chat supports readiness assessment, planning edits, implementation, PR updates,
verification, and provisional convergence when the available repository tools are
sufficient. Repository and PR delivery follows the PR-review Chat adapter.

## Qualification handoff

Q2 and above require Work and a fresh Standard-tier whole-PR qualification. Q3
adds Strong targeted review. Q4 adds Frontier targeted reconciliation. When Work
is required, complete the handoff checkpoint with the exact plan and PR identity,
class triggers, completed verification, remaining mandatory reviews, and resume
action.

If Chat has established provisional convergence, a merge point that requires
Work remains provisionally converged, not qualified, until that campaign is
complete. If a Work-only verification blocker prevents provisional convergence,
complete all other Chat-capable review and fixing, then hand off with convergence
explicitly blocked on that check. Do not mark the PR converged in Chat.

When the checkpoint is complete and the only next step is the manual switch to
Work, record an environment handoff rather than a human gate or capability
blocker.
