# Planned Merge-Point Workflow

This README is explanatory and non-normative. [WORKFLOW.md](WORKFLOW.md) defines
execution behavior. [STATE_TEMPLATE.md](STATE_TEMPLATE.md) defines durable
orchestration state, and [EXERCISES.md](EXERCISES.md) defines representative
behavioral checks.

Normal workflow bootstraps do not load this README. Use it to understand the
workflow's purpose, design rationale, tradeoffs, and known limitations, or when
considering a change to the workflow contract.

## Purpose and applicability

Use this workflow to carry one named unit from a repository implementation plan
through readiness assessment, optional plan repair, implementation, PR
convergence, and final qualification.

It is useful when a project already has planned merge points, milestones, or
equivalent implementation units and needs a repeatable way to decide whether a
unit is ready, implement it without silent scope drift, and qualify the result.

It is not a replacement for the PR review workflow. It uses that workflow for each
PR convergence loop.

## Design goals

The workflow tries to balance these goals:

- keep planning, implementation, review, qualification, and merge authority
  distinct;
- prevent an agent's confidence in its own work from deciding whether stronger
  review is required;
- keep routine work in the least expensive capable environment;
- avoid duplicate Work review when one current result satisfies multiple review
  gates;
- minimize manual Chat-to-Work transitions that can block progress;
- keep Work responsible for routine follow-up once a required handoff occurs;
- stop for human judgment only when a material decision or explicit authority is
  actually required;
- distinguish PR convergence from higher-confidence qualification; and
- remain usable by models with different capability levels without making the
  canonical execution contract unnecessarily large.

## Design rationale and tradeoffs

### Objective escalation instead of self-assessed confidence

Agents tend to be optimistic about whether their own review has converged. If
escalation depended only on the current agent deciding that stronger review might
help, difficult defects could be missed precisely when the agent cannot recognize
its own limitation.

The workflow therefore uses objective Q0-Q4 triggers. Q2 and above require Work
and Standard whole-PR qualification. Q3 adds Strong targeted review. Q4 is
reserved for consequential Q3 uncertainty that remains after Strong analysis.

This can spend more compute than a purely discretionary scheme, but it makes
escalation depend on observable properties of the work instead of reviewer
confidence.

### Controlled repetition versus maximum structural deduplication

Critical invariants are stated canonically and then repeated near the action
points where they matter. This is intentional. Less-capable models can benefit
from local recency, and a rule repeated close to the relevant decision is less
likely to be missed than a rule available only in a distant section.

The tradeoff is additional context and a maintenance risk: repeated wording can
drift. The workflow therefore treats the core invariants as normative and expects
local repetitions to reinforce, not redefine, them. Behavioral exercises provide
additional protection, but there is no automated semantic consistency checker.

This choice favors execution reliability over strict DRY structure.

### Minimize human-blocking environment transitions

Switching between Chat and Work is a manual operation. That manual handoff can
become the slowest part of an otherwise fast autonomous workflow.

The normal path therefore stays in Chat while Chat can satisfy convergence
requirements, prepares one complete handoff when Work becomes objectively
required, and then keeps routine fixes and re-review in Work. The goal is at most
one Chat-to-Work transition per merge point.

In the current ChatGPT operating model, Chat is effectively free with respect to
the scarce Work usage quota, while Work consumes that quota. This makes it
important to finish Chat-capable work before handoff and to avoid duplicate Work
review when one fresh result satisfies multiple gates. This cost relationship is
an environment assumption and should be recalibrated if product limits change.

Keeping routine follow-up in Work after handoff can still consume more Work
capacity than bouncing work back to Chat, but it reduces human-blocking stalls and
coordination cost.

### Human gates versus operational stops

A missing capability and a manual environment switch are operational conditions,
not design decisions. Treating them as human decision gates would create needless
interruptions.

Human gates are therefore reserved for unresolved material choices, substantial
plan or scope changes, irreversible or destructive approval, and merge authority.
Capability blockers and environment handoffs are recorded separately.

Completing the phase the user actually requested is also a normal terminal
condition. A readiness-only run can report its result and stop without asking for
permission to implement. An unresolved choice that matters only to a later,
unrequested phase is recorded for that future work; it becomes a human gate only
when the active requested work must cross it.

### Phase authority versus operation-by-operation approval

Once the user authorizes plan repair or implementation, the workflow treats the
routine repository mechanics of that phase as part of the same authority. This
includes the dedicated branch, scoped commits, draft PR creation, and updates to
that PR through the inner review workflow unless the user explicitly restricts
one of those actions.

Requiring a new approval for each routine delivery operation would create manual
stalls without adding a meaningful design or safety decision. Explicit
restrictions still win, and destructive or lifecycle-changing operations remain
outside the umbrella: merge, force-update, ready-for-review changes, and unrelated
PR metadata still require their own authority.

Readiness-only work does not receive this umbrella authority because assessment
does not imply permission to modify the repository.

### Convergence versus qualification

A PR can converge under the PR review workflow and still require stronger
qualification because of its semantic risk. Keeping those states separate avoids
two opposite errors: treating a clean ordinary review as sufficient for every
change, or forcing high-tier review into every ordinary PR review.

Separate states do not imply duplicate executions. If a fresh Standard-tier
whole-PR Work review on the unchanged complete PR is both the review that closes
PR-review convergence and the Q2+ whole-PR qualification, the workflow records
that one review as evidence for both gates. This preserves the semantic
distinction while conserving scarce Work quota.

### Repair the plan before coding through ambiguity

When implementation exposes a material gap in the governing plan, silently
choosing a design in code makes the implementation PR the de facto specification.
The workflow instead returns substantial ambiguity to planning and records
unambiguous plan repairs separately.

This adds a planning merge gate, but it keeps architecture and scope decisions in
the place where future contributors can discover them.

## Relationship to other workflows

The planned merge workflow is an outer orchestration layer.

The PR review workflow owns PR findings, fixing, verification, delivery, and
convergence. The planned merge workflow owns merge-point readiness, plan repair,
scope-drift handling, qualification class, environment handoff, and final
disposition.

The shared model mapping supplies concrete models for portable cost tiers. The
qualification class decides when stronger tiers are mandatory.

## Known limitations and possible improvements

Current limitations include:

- Q-class thresholds are policy heuristics and have not yet been calibrated
  against a large set of measured review outcomes;
- the one-handoff target assumes Chat and Work remain separate environments that
  require manual switching;
- controlled repetition can drift because there is no automated semantic
  consistency check across repeated invariants;
- runtime capabilities, model mappings, and the relative cost of Chat and Work can
  change;
- novel risks may not fit the current objective triggers cleanly; and
- cost and latency metrics are not always available for evaluating the policy.

Possible future improvements include calibrating qualification classes from
observed escaped defects and review cost, adding lightweight consistency checks
for repeated invariants, and simplifying the environment-handoff logic if Chat
and Work become automatically orchestratable.

## Usage and invocation examples

At the start of a run, resolve the selected `agent-workflows` revision to an
immutable commit. If the invocation does not select a revision, use the tip of the
repository's default branch. Load the planned-merge and PR-review workflow files
and adapters from that same commit.

### Typical Chat invocation

> Run the planned merge-point workflow from `benoit-gl/agent-workflows` for
> Step `<x>`, Merge `<y>` in `<owner/repository>`. Use the Chat adapter.
> Assess readiness against the current repository. If the plan needs an
> unambiguous repair and planning edits are authorized, create a documentation
> draft PR and run `update-pr` toward convergence. If that planning PR is blocked
> only by a required capability available in Work, hand it off as the active PR;
> do not require an implementation PR or qualification class. Otherwise stop as
> `awaiting human planning merge` when it converges. If no plan repair is needed,
> implement the ready merge point, create a draft implementation PR, and run
> `update-pr` toward provisional convergence. If a required implementation
> convergence capability exists only in Work, including a required fresh reviewer
> context, complete all other Chat-capable convergence work and record that
> blocker in the handoff instead of treating it as passed. Stop as
> `awaiting human decision or approval` or `blocked on required capability`
> when either state applies. If Work qualification is required, stop only as
> `awaiting required environment handoff` when the Work handoff is complete and
> ready.

### Typical Work handoff invocation

> Continue the planned merge-point workflow for Step `<x>`, Merge `<y>` in
> `<owner/repository>` using the Work adapter. Re-resolve the current plan and
> active PR. For a planning-phase handoff, finish the planning PR `update-pr`
> convergence loop and stop as `awaiting human planning merge`. For an
> implementation handoff, run the mandatory qualification campaign for the
> recorded class. Fix ordinary findings and update the active PR autonomously. Do
> not return routine fixes to Chat. Stop only in the applicable canonical
> terminal state: `awaiting human decision or approval`,
> `blocked on required capability`, or `ready for human implementation merge`.
> Do not merge.

### Starting directly in Work

Work can perform readiness, planning, and implementation from the start. When
Work is already the active environment, do not introduce a Chat handoff merely to
follow the default cost path. Continue the same canonical workflow.

See [ChatGPT adapters](adapters/chatgpt/README.md) for environment-specific
execution.
