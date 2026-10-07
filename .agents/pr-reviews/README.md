# PR Review Workflow

This README is explanatory and non-normative. [WORKFLOW.md](WORKFLOW.md) defines
execution behavior. [STATE_TEMPLATE.md](STATE_TEMPLATE.md) defines the durable
control record, and [EXERCISES.md](EXERCISES.md) defines representative behavioral
checks.

Normal workflow bootstraps do not load this README. Use it to understand why the
workflow is structured as it is, to decide whether the workflow fits a task, or to
review a proposed change to the workflow.

## Purpose and applicability

Use this workflow for pull-request review when the task needs a defined authority
boundary, evidence-based findings, verification, and a repeatable convergence
process.

It supports three delivery modes:

- read-only review;
- local fixes without remote delivery; and
- updating the existing PR head with accepted fixes.

The workflow is not a general implementation-planning process. A higher-level
workflow can use it as a convergence engine.

## Design goals

The workflow tries to balance these goals:

- find material defects without rewarding raw finding count;
- keep review authority separate from implementation and merge authority;
- use fresh review contexts to reduce anchoring when the runtime supports them;
- combine model review with deterministic evidence instead of treating either as
  sufficient by itself;
- bind verification to the exact content reviewed and delivered;
- preserve important decisions and evidence across interruptions;
- keep routine work on lower-cost models and escalate only unresolved difficult
  questions; and
- bound repeated broad review so the process can converge instead of becoming an
  open-ended search for more findings.

## Design rationale and tradeoffs

### Fresh review versus context reuse

A reviewer that inherits previous findings can anchor on earlier conclusions.
Fresh contexts reduce that risk, so broad re-review is designed around a neutral
brief and a new context when possible.

Fresh contexts cost more and are not available in every runtime. A same-context
neutral re-read is therefore a fallback, but it is explicitly weaker evidence and
is not treated as independent review.

### Model review versus deterministic verification

A clean model review is useful evidence, but it does not prove that code builds,
tests pass, links resolve, or the delivered tree matches the reviewed tree.
Deterministic checks cover those failure modes. Model review covers semantic and
design failures that mechanical checks often miss.

The tradeoff is additional process overhead. The workflow accepts that overhead
for changes where review and verification evidence matter.

### Durable state

The state record exists so authority, decisions, findings, evidence, and content
identity survive interruptions and repeated rounds. This reduces accidental
re-litigation and stale verification.

The cost is record-keeping overhead. The state is therefore intentionally concise
and excludes raw transcripts and large logs.

### Exact delivery identity

For remote updates, the workflow verifies the exact reviewed content before and
after delivery. This avoids a common failure mode where the reviewed patch differs
from the committed or remotely tested tree.

This makes delivery more careful than a simple sequence of file updates, but it
keeps review evidence tied to the artifact that will actually be merged.

### PR description maintenance

Repository policy can treat the PR description as durable documentation or as the
future squash-commit message. Accepted fixes can therefore make a previously
accurate description stale.

`update-pr` includes narrow authority to keep that description accurate without
requiring another human approval. The authority is intentionally limited to the
body: it does not include the PR title, lifecycle state, reviewers, labels, base
branch, or merge controls, and it cannot be used to introduce new requirements or
decisions.

### Cost tiers and bounded review rounds

Routine extraction, verification, and ordinary review use lower-cost tiers.
Stronger models are reserved for unresolved difficult questions. Broad review
rounds are bounded by default so stronger review does not become an automatic
response to uncertainty about whether more review might help.

The thresholds are deliberately conservative rather than perfectly predictive.
They are expected to need calibration as more review outcomes and cost data become
available.

## Relationship to other workflows

The planned merge-point workflow uses this workflow as its inner PR convergence
engine. PR review owns finding semantics, fixes, verification, delivery, and
convergence. The outer workflow owns readiness, plan repair, qualification class,
environment handoff, and final merge-point disposition.

This separation lets the PR review process stay reusable without embedding
repository planning semantics into it.

## Known limitations and possible improvements

Current limitations include:

- fresh independent reviewer contexts are runtime-dependent;
- authoritative required-check discovery can depend on host and connector
  capabilities;
- finding severity and triage still require judgment;
- the default broad-round bound can be too high or too low for unusual changes;
- concrete model mappings can become stale as platform capabilities change; and
- available runtimes do not always expose useful cost, latency, or token metrics.

Possible future improvements include using accumulated review outcomes to
calibrate tier escalation and round limits, improving evidence persistence, and
making authoritative check-target discovery more uniform across runtimes.

## Invocation examples

### Read-only review

> Review PR `<number>` in `<owner/repository>` using the PR review workflow
> from `benoit-gl/agent-workflows`. Use `review-only` delivery.
> Do not edit, commit, push, or change PR state.

A normal read-only review is one broad pass. Request repeated read-only rounds
explicitly if needed. Findings can remain unresolved when the review is complete.

### Update an existing PR

> Run the iterative PR review workflow from `benoit-gl/agent-workflows` on PR
> `<number>` in `<owner/repository>`. Use `update-pr` delivery and the environment
> adapter selected for your runtime. Apply accepted fixes, deliver the exact
> reviewed tree to the existing head branch, and keep the PR description accurate
> when the final accepted change makes it materially stale. Do not change the PR
> title, force-update, approve, close, enable auto-merge, change PR state, or
> merge.

### Local fixes

> Run the iterative PR review workflow from `benoit-gl/agent-workflows` on the
> current branch against `<base>`. Use `local-fix` delivery and
> `<include/exclude>` uncommitted changes. Do not commit or push.

## Environment setup

Use a checkout of the target repository when available. An environment adapter
can specify another source-access route and state location. It must identify
unsupported steps and any loss of review isolation.

Bundled adapters:

- [ChatGPT Chat and Work](adapters/chatgpt/README.md)

Keep process state untracked; prefer the checkout's local Git exclude. Load the
workflow, template, and adapter from one commit. At the start of the run, resolve
the selected revision to a commit SHA and record it; use the workflow repository's
default-branch tip unless the invocation explicitly selects another revision.
Model and runtime choices belong to the invocation or environment adapter, not
copied workflow variants.

When reporting an exercise, include observed results and evidence rather than
merely confirming that the instructions were read. Formatting and link checks do
not establish behavioral compliance.
