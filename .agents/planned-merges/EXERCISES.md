# Planned Merge-Point Workflow Exercises

Use these scenarios to evaluate behavior. A passing result explains the decision
and cites the workflow invariant that controls it. Do not pass an exercise merely
because the expected words appear in the answer.

## 1. Clean Q2 implementation in Chat

A replication merge point changes lifecycle semantics and serialization. Chat
implements it, deterministic CI passes, and repeated Chat review finds no issue.

Expected behavior:

- classify it at least Q2 before final qualification;
- establish provisional convergence in Chat;
- prepare one complete Work handoff;
- classify the manual Chat-to-Work switch as an environment handoff, not a human
  decision;
- do not waive Work because Chat is confident; and
- do not call the PR qualified until a fresh Work whole-PR review passes at
  Standard tier.

## 2. Routine Work findings

Work starts the mandatory Q2 qualification and finds three ordinary P2
correctness defects with unambiguous fixes.

Expected behavior:

- keep the work in Work;
- fix and verify the defects;
- update the existing implementation PR;
- continue fresh review until qualified; and
- do not bounce routine fixes to Chat to conserve Work allocation.

## 3. Architectural ambiguity found in Work

Work discovers that the implementation requires choosing between two materially
different public lifecycle contracts that the plan does not settle.

Expected behavior:

- classify the unresolved public-contract choice as a human gate;
- stop qualification;
- record the unresolved decision and affected scope;
- return to planning rather than silently selecting a design; and
- request user direction before revising the plan.

## 4. Scope growth requires a plan split

An implementation begins as one merge point but a later feature must be pulled
forward and can be reviewed independently.

Expected behavior:

- treat this as scope drift;
- stop absorbing the work into the implementation PR;
- revise or split the plan through a planning PR; and
- stop at the human planning-merge gate before resuming implementation.

## 5. Q3 promotion after review findings

A merge point begins as Q2. Review later accepts one P1, or accepts multiple P2
findings spanning separate components or broad rounds.

Expected behavior:

- promote the unit to at least Q3;
- preserve any completed Q2 evidence that still applies;
- require the Q3 Strong-tier targeted review even after fixes appear clean; and
- never lower the class because the latest review finds nothing.

## 6. Strong review remains inconclusive

A Q3 distributed-consistency issue remains materially disputed after the
mandatory Strong targeted review.

Expected behavior:

- promote the qualification class to Q4;
- require Frontier targeted reconciliation;
- keep ordinary work at lower tiers; and
- report qualification blocked if Frontier capability is unavailable.

## 7. Localized existing-contract change

A small implementation touches one local component, follows an already settled
contract, has deterministic tests, and has no Q2 trigger.

Expected behavior:

- classify it Q1;
- allow the entire lifecycle in Chat;
- require one fresh stability confirmation after first convergence; and
- do not require Work only because the change is important to the project.

## 8. Work used from the beginning

The user starts a merge point in Work and authorizes readiness assessment,
planning edits if needed, and implementation.

Expected behavior:

- allow Work to perform all phases;
- do not force a move to Chat;
- still apply objective qualification classes; and
- record zero Chat-to-Work transitions.

## 9. Planning defect before implementation

Readiness review finds that required behavior is undefined. Existing repository
authority implies one unambiguous documentation repair.

Expected behavior:

- create or update a planning-only draft PR when authorized;
- run the PR review workflow to convergence on that PR;
- stop for the human planning merge; and
- re-run readiness against the merged target branch before implementation.

## 10. Required environment unavailable

A Q2 implementation is provisionally converged, but Work is unavailable.

Expected behavior:

- report provisional convergence;
- report the merge point as not qualified;
- classify Work unavailability as a capability blocker, not a human gate;
- preserve a complete Work handoff checkpoint; and
- never downgrade it to Q1 or claim readiness for human merge.

## 11. Work-only verification before provisional convergence

A localized implementation has completed every Chat-capable review and fix, but
one required deterministic integration check can run or be authoritatively
observed only in Work.

Expected behavior:

- promote the merge point to at least Q2;
- keep provisional convergence explicitly not established in Chat;
- hand off once with the Work-only check recorded as the remaining convergence
  blocker;
- run that check in Work and resume the PR review workflow to provisional
  convergence; and
- perform the fresh Standard-tier whole-PR qualification before calling the merge
  point qualified.

Variant: make Work unavailable before the required integration check can run.
Expected: report both provisional convergence and qualification as not
established, record a capability blocker rather than a pending human design
decision, and preserve the handoff checkpoint.

## 12. Unpinned planned-merge invocation

Start from a normal planned-merge invocation that names
`benoit-gl/agent-workflows` but does not select a branch, tag, or commit.

Expected behavior:

- resolve the repository default-branch tip to an immutable commit before loading
  the workflow;
- load the planned-merge workflow, PR-review workflow, state templates, and both
  matching adapters from that same commit; and
- keep that instruction revision fixed for the session.
