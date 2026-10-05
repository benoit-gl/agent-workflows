# Planned Merge-Point Workflow

Use this workflow when the user asks an agent to assess, prepare, implement, or
qualify a named unit from a repository implementation plan. A planned merge point
can be called a merge unit, milestone merge, planned PR, or equivalent term in the
target repository.

The coordinator owns plan-unit identity, readiness, scope, decisions,
qualification class, environment handoffs, and final disposition. Target
repository documentation remains authoritative for product requirements,
architecture, contracts, contribution rules, and acceptance criteria.

This workflow is an outer orchestration layer. It uses the
[iterative PR review workflow](../pr-reviews/WORKFLOW.md) for PR review, fixing,
verification, delivery, and convergence. It does not duplicate or weaken that
workflow.

## Core invariants

These rules are normative. Later sections repeat them at the point of action.
Those repetitions add local context; they do not weaken or redefine the rules.

- Qualification classes are monotonic: they can only increase during a run.
- Q2 and above require Work and a fresh Standard-tier whole-PR qualification in
  a fresh reviewer context. A same-context surrogate cannot satisfy this
  qualification.
- Q3 adds a Strong-tier targeted review of the qualifying risk. Q4 adds
  Frontier-tier targeted reconciliation.
- Work-only required verification promotes the merge point to at least Q2. If it
  blocks PR-review convergence, hand off with convergence explicitly not
  established; never treat unavailable verification as passed.
- After a Chat-to-Work handoff, stay in Work for routine fixing, verification,
  and re-review until qualification completes or a stop condition occurs.
- Human gates require human judgment or authority and are limited to materially
  different valid choices not settled by repository authority, substantial plan
  or scope changes, irreversible or destructive approval, and planning or final
  merges. A manual environment handoff and an unavailable capability are
  operational stops, not by themselves human decisions.
- Never merge without a separate explicit user request.

Treat alternatives as materially different when choosing among them changes a
public or architectural contract, compatibility, dependency strategy, persistent
representation, security posture, plan-unit boundaries or order, or creates a
meaningful future-maintenance constraint.

## 1. Establish authority and durable state

Resolve the selected `agent-workflows` revision to an immutable commit and keep it
fixed for the session. If the invocation does not select a revision, resolve the
repository's default-branch tip and use that commit. Load this workflow, its state
template, the PR review workflow, and the selected environment adapter from that
same revision.

Record:

- target repository and base branch;
- the exact planned merge point and governing plan revision;
- requested work authority, including whether planning edits, implementation,
  commits, new draft PRs, and updates to existing PRs are authorized;
- prohibited actions, especially merge and force-update;
- current execution environment;
- current plan PR or implementation PR, if one exists; and
- prior accepted user decisions that materially constrain the merge point.

Do not infer stronger write authority from a request to assess readiness. Do not
merge either a planning PR or implementation PR unless the user separately asks
for that merge.

Use [STATE_TEMPLATE.md](STATE_TEMPLATE.md) as the durable control record. Keep
temporary state out of the target repository unless the user explicitly asks to
commit it.

## 2. Resolve the merge point against current repository state

Read the plan unit, its prerequisites, exclusions, referenced specifications, and
repository governance. Inspect what has actually landed on the target branch.
Do not assume the plan still matches the implementation merely because it was
previously accepted.

A merge point is **ready** only when all of these are true:

1. Its prerequisites have landed or are explicitly available in the intended
   base.
2. Its intended observable behavior and exclusions are clear.
3. Authoritative specifications settle every material design choice needed for
   implementation, or an accepted user decision already settles it.
4. Required verification and evidence can be identified before implementation.
5. The plan is internally consistent with the current repository and active
   specifications.
6. The work remains one coherent, reviewable merge unit suitable for the target
   repository's normal merge method.

Record each criterion as `pass`, `fail`, or `blocked`, with evidence. A
reviewer's confidence that the unit "looks actionable" is not sufficient.

## 3. Repair the plan before implementation when needed

If readiness fails, do not implement through the ambiguity.

For defects with one clearly implied resolution under existing repository
authority, revise the plan and affected authoritative documentation. Do not use
this autonomous repair path for a substantial plan or scope change or for an
irreversible or destructive choice that requires approval; those remain human
gates. If more than one materially different valid resolution remains under the
core definition, stop and obtain user direction before choosing among them.

When planning edits are authorized:

1. Create or update a dedicated planning branch and draft PR.
2. Keep the change documentation-only unless the repository explicitly requires
   executable evidence for the planning decision.
3. Run the PR review workflow in `update-pr` mode until that planning PR
   converges.
4. Stop at the human merge gate.

After the planning PR is merged, resume from the new target-branch state and run
the readiness gate again. Do not let an implementation branch silently depend on
an unmerged planning change.

## 4. Implement the ready merge point

When implementation is authorized and the readiness gate passes:

1. Start from the current target branch or the explicitly requested ref.
2. Create or reuse one dedicated implementation branch.
3. Implement only the accepted merge-point scope.
4. Add or update tests and durable evidence required by the plan and repository.
5. Open a draft PR when the change becomes useful to share.
6. Run the PR review workflow in `update-pr` mode until the implementation PR
   reaches **provisional convergence**. In Chat, if a required convergence check
   can be performed or authoritatively observed only in Work, do not weaken
   convergence; complete the remaining Chat-capable work and use the handoff rule
   in section 7.

Provisional convergence means the current PR satisfies the PR review workflow's
solution-convergence requirements. It does not by itself mean that this outer
workflow's qualification requirements are complete.

## 5. Detect scope drift before absorbing it

Implementation findings do not automatically redefine the planned merge point.

Stop implementation and return to planning when a finding requires any of these:

- inventing a material semantic or architectural contract not settled by current
  authority;
- pulling a substantial later merge point forward;
- adding an independently meaningful concern with different prerequisites,
  risks, or acceptance criteria;
- splitting or combining plan units to keep the change coherent;
- changing a public interface, compatibility promise, dependency strategy, or
  irreversible representation in a way not already authorized; or
- choosing among materially different valid solutions that affect future
  development.

Routine correctness fixes, test completion, documentation propagation, and
implementation details already determined by the accepted contracts remain
inside the current merge point.

If plan repair is required, preserve the implementation PR safely, create the
planning PR, and stop at the human planning-merge gate. Resume implementation
only after the revised plan lands.

## 6. Assign an objective qualification class

Classify the merge point before the first implementation review and re-evaluate
the class after every material scope change. Qualification classes are monotonic:
they can only increase during a run. A clean review never lowers the required
class.

| Class | Objective trigger                                                                                                                                                                                                                                                       | Required final qualification                                                      |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Q0    | Documentation or mechanical change with no behavioral contract change                                                                                                                                                                                                   | Current environment; normal PR convergence                                        |
| Q1    | Localized implementation of an existing contract with deterministic verification and none of the Q2+ triggers                                                                                                                                                           | Fresh stability confirmation in the current environment                           |
| Q2    | Cross-module semantic change; persistence, serialization, or reload; concurrency or replication; lifecycle or identity semantics; public API or compatibility surface; material architectural boundary; or an important verification-oracle limitation                  | Fresh whole-PR qualification in Work at Standard tier                             |
| Q3    | Security boundary, credible data-loss risk, irreversible migration or format decision, difficult distributed/concurrency semantics, candidate or architecture selection, an accepted P1, or multiple accepted P2 findings that span distinct components or broad rounds | Q2 requirements plus a Strong-tier targeted review of the qualifying risk surface |
| Q4    | A consequential Q3 issue remains unresolved or materially disputed after Strong-tier analysis                                                                                                                                                                           | Q3 requirements plus Frontier-tier targeted reconciliation                        |

Additional mandatory promotions:

- A material governing-plan revision promotes Q0 or Q1 to at least Q2 and Q2 to
  at least Q3. It does not by itself promote Q3 to Q4. Reserve Q4 for a
  consequential Q3 issue that remains unresolved or materially disputed after
  Strong-tier analysis.
- If required deterministic verification cannot be performed or authoritatively
  observed in Chat but can be performed in Work, promote the merge point to at
  least Q2. Complete all Chat-capable review and fixing before handoff, but do not
  weaken PR-review convergence by treating the unavailable verification as passed.
- If a newly accepted finding introduces a Q2, Q3, or Q4 trigger, immediately
  raise the class before further qualification.

For Q2 and above, "fresh" means a fresh reviewer context under the PR review
workflow's fresh-review rules. A same-context surrogate can support investigation,
but it cannot satisfy the mandatory qualification. The fresh Work review is
required even when all Chat reviews are clean. This rule prevents the current
agent's confidence from deciding whether stronger independent qualification is
necessary.

The PR review workflow still owns finding semantics and convergence. Q3 and Q4
add targeted higher-tier qualification; they do not require repeating the entire
PR review at the higher tier.

## 7. Minimize human-blocking environment transitions

Chat and Work are execution environments, not lifecycle phases. Either can
perform readiness work, plan repair, implementation, fixing, or verification.

When both are available, the default orchestration is:

1. Stay in Chat through readiness, implementation, and provisional convergence
   when Chat can satisfy every convergence prerequisite.
2. If a required convergence check can be performed or authoritatively observed
   only in Work, complete all other Chat-capable review and fixing, then prepare
   the handoff with that check recorded as the only remaining convergence blocker.
3. If the qualification class or unavailable verification capability requires
   Work, create one complete handoff checkpoint.
4. Switch to Work once.
5. Keep the work in Work through final qualification.

The normal target is **at most one Chat-to-Work transition per merge point**.
Record every environment transition and its reason.

A Work handoff is ready only when:

- the planned scope is stable;
- no material user decision is pending;
- the implementation PR exists and its current head is identified;
- provisional convergence is established, or it is blocked only by required
  verification that can be performed or authoritatively observed in Work;
- all deterministic checks that Chat can perform or authoritatively observe have
  passed, and every Work-only verification blocker is identified; and
- the state record contains the qualification class, reasons, convergence status
  or blocker, remaining mandatory reviews, and exact resume action.

Do not use Work merely because the change is important or because Work is
available. Use it when an objective qualification requirement or unavailable
verification capability requires it.

## 8. Run one autonomous Work verification and qualification campaign

Once a merge point enters Work because required verification or qualification
requires it, Work owns the rest of the autonomous campaign. Do not send routine
findings back to Chat to save compute.

Within Work:

1. Re-resolve the repository, plan, PR head, and qualification class.
2. If provisional convergence was blocked only by Work-only verification, run
   that verification and resume the PR review workflow until provisional
   convergence is established.
3. Run the required fresh whole-PR qualification at Standard tier in a fresh
   reviewer context.
4. Run any mandatory Q3 or Q4 targeted review even if the Standard review is
   clean.
5. Triage findings under the PR review workflow.
6. Fix accepted findings that do not require a material user decision.
7. Re-run focused verification, integration checks, policy audit, and fresh
   review as required.
8. After any fix or other PR-content change, record the new content identity and
   re-evaluate qualification evidence. Mark evidence stale when its reviewed
   content or scoped risk surface changed. Always rerun the Standard whole-PR
   qualification on the new complete content before marking Q2+ qualified.
9. Update the existing implementation PR and continue until qualified.

Routine fixing, tests, comments, documentation propagation, and another review
round are not reasons to stop or return to Chat.

Stop the autonomous Work campaign only for one of these reasons:

- **Human gate:** a materially different valid choice is unresolved by repository
  authority; scope drift requires a substantial plan or scope change; an
  irreversible or destructive choice requires explicit approval; or a planning
  or final merge requires human authority.
- **Capability blocker:** a required capability is unavailable.
- **Completed qualification:** qualification is complete and the PR is ready for
  human acceptance and merge.

Do not report a capability blocker as a pending human decision unless the human
must choose how to resolve it.

The Work adapter must not spend Strong or Frontier capacity merely because the
current agent thinks more intelligence could help. Higher tiers are used when
this workflow's objective class requires them. If a lower-tier review exposes a
new qualifying risk, raise the class first, then perform the now-mandatory review.

## 9. Distinguish convergence from qualification

Use these terms consistently:

- **Provisional convergence:** the current implementation PR has converged under
  the PR review workflow.
- **Qualified:** provisional convergence is current and every mandatory review
  for the recorded qualification class has passed on the current PR content.
- **Ready for human merge:** qualified, required remote checks pass, no material
  decision is pending, and the PR accurately represents the accepted merge point.

For Q0, normal PR convergence can satisfy qualification. For Q1, require one
fresh whole-PR stability confirmation against unchanged content after first
convergence. For Q2 and above, the mandatory Work campaign supplies the
independent stability confirmation; do not add a redundant clean Chat pass solely
for bookkeeping.

If Work is required only for qualification after provisional convergence and the
required Work environment or higher-tier reviewer is unavailable, report the PR
as provisionally converged but **not qualified**. If Work-only verification still
blocks provisional convergence, report both convergence and qualification as not
established. Do not silently weaken the class.

## 10. Completion and reporting

A planned merge-point run stops at one of five states:

- **awaiting human decision or approval**;
- **awaiting human planning merge**;
- **awaiting required environment handoff**;
- **blocked on required capability**; or
- **ready for human implementation merge**.

Report:

- merge point and governing plan revision;
- readiness result;
- planning changes and planning PR, if any;
- implementation PR and current head;
- qualification class and objective triggers;
- provisional convergence and qualification status;
- environment transitions and whether the one-transition target was met;
- mandatory higher-tier reviews actually performed;
- accepted user decisions;
- remaining risks or blocked evidence; and
- the exact next action, including any required human action.

Never claim completion merely because the current reviewer found no further
issues. Completion is determined by the recorded readiness, convergence, and
qualification invariants. A capability blocker can stop execution without
creating a human decision; report the missing capability and the exact resume
condition separately.
