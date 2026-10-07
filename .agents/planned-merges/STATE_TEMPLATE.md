# Planned Merge State: <repository / plan unit>

Keep this record concise and evidence-based. Do not copy raw transcripts or large
logs into it.

## Authority and identity

- Workflow source/revision:
- Environment adapter:
- Target repository:
- Target branch/ref:
- Planned merge point:
- Governing plan path/revision:
- Requested phase/work:
- Phase authority and explicit write restrictions:
- Forbidden actions:
- Current environment:
- State last checked against revision:

## Repository decisions and governance

| ID    | Status   | Decision or invariant | Governing source | Rationale or user direction |
| ----- | -------- | --------------------- | ---------------- | --------------------------- |
| D-001 | accepted |                       |                  |                             |

Statuses: `pending`, `accepted`, `superseded`.

## Readiness gate

| Criterion                                | Status | Evidence |
| ---------------------------------------- | ------ | -------- |
| Prerequisites landed                     |        |          |
| Observable behavior and exclusions clear |        |          |
| Material design choices settled          |        |          |
| Verification/evidence identified         |        |          |
| Plan consistent with current repository  |        |          |
| Scope is one coherent merge unit         |        |          |

- Readiness result: `ready`, `not ready`, or `blocked`
- Required plan repairs:
- Pending user decisions:

## Planning repair

- Planning branch:
- Planning PR:
- Planning PR head:
- PR-review convergence:
- Human merge status:
- Revised plan revision after merge:

## Implementation

- Implementation branch:
- Implementation PR:
- Implementation PR head:
- Changed scope:
- Required tests/evidence:
- Provisional convergence: `not established` or `converged`
- Provisional convergence blocker, if any:
- Current PR-review state/evidence:

## Scope drift

- Drift detected:
- Trigger:
- Can existing authority settle it:
- Plan split/reorder/revision required:
- Disposition:

## Qualification

- Qualification class: `Q0`, `Q1`, `Q2`, `Q3`, or `Q4`
- Objective triggers:
- Promotions and reasons:
- Required final reviews:
- Work required:
- Standard whole-PR qualification (content identity/result):
- Shared convergence/qualification evidence, if any:
- Strong targeted qualification (content identity/scope/result):
- Frontier targeted reconciliation (content identity/scope/result):
- Stale qualification evidence after PR changes:
- Qualification status: `not started`, `in progress`, `blocked`, or
  `qualified`

A clean review does not reduce the qualification class. Bind qualification
evidence to the reviewed content and re-evaluate it after every implementation
PR-content change.

## Environment handoff

- Environment history:
- Chat-to-Work transitions:
- One-transition target met:
- Handoff phase: `planning repair` or `implementation`
- Active handoff PR/head:
- Handoff-ready criteria:
- Exact handoff content identity:
- Resume action:
- Handoff blocker:

## Current disposition

- Current stage:
- Task status:
- Requested phase completion result:
- Stop category: `none`, `requested phase complete`,
  `awaiting human decision or approval`, `awaiting human planning merge`,
  `awaiting required environment handoff`, `blocked on required capability`,
  or `ready for human implementation merge`
- Pending human decision or approval, if any:
- Next executable action:
- Next human action, if any:
- Remaining risks:
- Blocked capabilities or evidence:
- Resume checkpoint:
