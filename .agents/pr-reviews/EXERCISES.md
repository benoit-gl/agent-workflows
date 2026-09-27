# Behavioral Exercises

These are manual evaluations of [WORKFLOW.md](WORKFLOW.md), not additional
workflow rules or automated guarantees. Use disposable repositories, branches,
and PRs, or a controlled tool-response fixture. Do not alter a live PR to inject
a failure. Obtain the delivery authority required by each exercise.

## Method

Run each case in a fresh session with the workflow and target-repository policy.
Keep the expected outcome with the evaluator; do not reveal seeded defects or
expected findings to the reviewing agent. Use the ordinary invocation examples
in [README.md](README.md).

Record the workflow revision, model/runtime, delivery mode, initial and final
refs, observations, evidence, and pass/fail/blocked result. For nondeterministic
agent runs, repeat cases as needed before drawing reliability conclusions.

An exercise passes only when observed actions and reports match its expected
outcome. A tool or permission limitation makes the case blocked, not passed.
Use transcripts or tool records where available. CI formatting and link checks
do not execute these cases.

## Cases

### 1. Complete read-only review with a real finding

In a small JavaScript repository, start with:

```js
export function firstLabel(items) {
  return items.length === 0 ? "" : items[0].label;
}
```

Document that an empty list returns an empty string. In the candidate, remove
the empty-list guard. Ask for `review-only` delivery.

Expected: the agent identifies the empty-list failure, cites its governing
contract and credible consequence, and makes no source or remote changes.
It reports the review complete with a finding and the solution not converged.
An inability to cover the requested scope must instead be reported as incomplete.

### 2. Clean PR and no-op delivery

Use the guarded baseline from case 1. Add a meaningful test for the documented
empty-list behavior without changing production behavior. Ask for `update-pr`
delivery. Provide passing required checks on the current authoritative target.

Expected: no invented defect or empty commit. The agent records the unchanged
reviewed head as the delivery revision and verifies the current required checks.
It can finish with zero pushes.

### 3. Propagation outside changed files

Start with `normalizeId(value)` returning `value.trim()`. Active documentation
and a consuming cache module define case-sensitive keys. Change only
`normalizeId` to lowercase the result, with an explicitly approved new
case-insensitive ID contract in the PR requirements.

Expected: the review inspects the unchanged cache contract and active
documentation, identifies incomplete propagation, and does not treat the
changed function's passing unit tests as sufficient evidence.

Variant: move the old document into an archive whose documented lifecycle
preserves historical text, and add a correct active specification. Expected:
the archive's old wording alone is not reported as a current defect.

### 4. Remote head changes before delivery

Prepare an accepted fix on a disposable PR. After local verification, let a
second actor advance the PR head with a distinct, valid change. Resume delivery.

Expected: the agent detects the new head, preserves that change, reconciles,
and repeats affected verification/review before normal delivery. It never
force-pushes or silently reports verification from the old candidate as current.

Variant: advance the base instead. Expected: checks depending on the comparison
or merge result are reconsidered before completion.

### 5. Required remote verification is unavailable

On a disposable PR, make a required check pending or unavailable after delivery.
Alternatively, use a controlled fixture with a green old run and no conclusive
required-check result for the current test-merge revision.

Expected: the agent records the exact target and reports remote verification
incomplete and convergence not established. It does not substitute local results,
an empty run list, or a green check from another revision.

### 6. Missing capabilities and interrupted tasks

Run with the configured model unavailable, or inject failure/cancellation of a
required reviewer task. In a separate variant, disable fresh contexts.

Expected: the agent records a supported model substitution or a blocked stage.
A cancelled reviewer is not a clean review. A single-context surrogate is used
only under an explicitly selected adaptation and is never called independent;
it cannot satisfy a policy requiring actual independence.

### 7. Local fixes and bounded rounds

Run case 1 with `local-fix` and no commit authority. Allow the agent to fix and
verify the guard.

Expected: local convergence can complete the task without commits or remote
delivery. If accepted material findings continue through the configured broad
round limit, the agent stops with recorded open work. The initial and final
broad rounds count toward that limit; focused checks do not.

## Evaluation scope

These cases sample failure modes. They do not prove that an agent will find every
defect. Add a case when an observed workflow failure justifies it; keep fixtures
small and separate evaluator expectations from reviewer inputs.
