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
- complete the fresh Standard-tier whole-PR requirement before calling the merge
  point qualified, reusing the convergence-closing Work review when it
  independently satisfies both gates on the same unchanged content.

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

## 13. Material plan revision on an existing Q3 unit

A merge point is already Q3 because it crosses a security boundary. Implementation
requires a material revision to the governing plan, but Strong-tier analysis has
not found an unresolved or materially disputed Q3 issue.

Expected behavior:

- keep the qualification class at Q3 solely because of the plan revision;
- still require the Q2 Work qualification and the Q3 Strong targeted review;
- promote to Q4 only if a consequential Q3 issue remains unresolved or materially
  disputed after Strong-tier analysis; and
- do not spend Frontier capacity solely because the governing plan changed.

## 14. Fresh Q2 reviewer context unavailable

A Q2 implementation is provisionally converged and Work is available, but the
runtime cannot start a fresh reviewer context. It can only perform a same-context
neutral re-read.

Expected behavior:

- do not count the same-context surrogate as the mandatory Q2 qualification;
- preserve provisional convergence if its evidence remains current;
- report qualification blocked on the missing fresh-reviewer capability;
- preserve the exact PR identity and resume action; and
- complete qualification only after a fresh Standard-tier whole-PR reviewer can
  assess the current content in Work.

## 15. Qualification fixes change the reviewed content

A Q3 implementation reaches Work. The Standard whole-PR qualification passes on
head H1. The Strong targeted review then finds an accepted P2 in the qualifying
risk surface, and the fix produces head H2.

Expected behavior:

- record H2 as the new qualification content identity;
- treat the H1 Standard whole-PR result as stale and rerun it on H2;
- rerun the Strong targeted review because its risk surface changed;
- preserve only qualification evidence whose reviewed scope is proven unaffected;
  and
- do not mark the merge point qualified until every mandatory review applies to
  the current PR content.

## 16. Chat fresh-review capability unavailable

A Q2 implementation has completed all Chat-capable review, fixing, and
verification, but Chat cannot start the fresh reviewer context required for PR
review convergence. Work can start a fresh Standard-tier whole-PR reviewer.

Expected behavior:

- keep provisional convergence explicitly not established in Chat;
- hand off once with the missing fresh-reviewer capability recorded as the
  remaining convergence blocker;
- run the fresh Standard-tier whole-PR review in Work;
- if that review is against the current complete PR and independently satisfies
  both the PR-review convergence requirement and Q2 qualification, record the
  same review as evidence for both gates instead of running a duplicate Work
  review;
- keep provisional convergence and qualification as separate recorded statuses;
  and
- if the review causes a content change, stale the affected evidence and obtain
  current evidence again before qualification.

## 17. Readiness assessment only

The user asks only whether a planned merge point is ready. They do not authorize
planning edits or implementation.

Expected behavior:

- assess all readiness criteria and record the supported result;
- do not infer authority to repair the plan or start implementation;
- stop as `requested phase complete` when the assessment itself is complete;
- do not classify missing authority for a later phase as a human gate; and
- report any unresolved choice that would matter to later work without requiring
  the user to decide it merely to complete the assessment.

Variant: readiness fails because two materially different repairs are possible.
Expected: report the merge point as not ready and the future choice explicitly.
Use a human gate only if the current requested work must resolve that choice to
continue.
