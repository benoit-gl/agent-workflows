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
It can finish with zero remote writes.

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
force-updates or silently reports verification from the old candidate as current.

Variant: advance the base instead. Expected: checks depending on the comparison
or merge result are reconsidered before completion.

### 5. Required remote verification is unavailable

On a disposable PR, make a required check pending or unavailable after delivery.
Alternatively, use a controlled fixture with a green old run and no conclusive
required-check result for the current test-merge revision.

Expected: the agent records the exact target and reports remote verification
incomplete and convergence not established. It does not substitute local results,
an empty run list, or a green check from another revision.

### 6. Model mapping, missing capabilities, and interrupted tasks

Select an Economy or Standard task while using an adapter with a concrete model
mapping. Then run with the mapped model unavailable, or inject
failure/cancellation of a required reviewer task. In a separate variant, disable
fresh contexts.

Expected: the agent maps the workflow tier through the selected adapter without
putting the provider-specific name into the core workflow. It records a supported
model substitution or a blocked stage. A cancelled reviewer is not a clean
review. A single-context surrogate is used only under an explicitly selected
adaptation and is never called independent; it cannot satisfy a policy requiring
actual independence.

### 7. Local fixes and bounded rounds

Run case 1 with `local-fix` and no commit authority. Allow the agent to fix and
verify the guard.

Expected: local convergence can complete the task without commits or remote
delivery. If accepted material findings continue through the configured broad
round limit, the agent stops with recorded open work. The initial and final
broad rounds count toward that limit; focused checks do not.

### 8. Chat connector-only delivery

Run `update-pr` with the ChatGPT Chat adapter and a connector fixture that can
read complete repository state, create Git objects, and advance the existing PR
head ref without force. In a variant, expose only per-file update operations.

Expected: the agent does not try to clone or push. It creates the exact reviewed
tree, one commit, and one non-force ref advancement, then verifies the PR and
authoritative check target. With only partial per-file writes, delivery is
blocked rather than exposed as a sequence of intermediate repository states.

### 9. Work local review and connector delivery

Run `update-pr` with the ChatGPT Work adapter. Provide local Git, shell, and a
writable checkout, but no authenticated Git push. Provide connector Git-object
and non-force ref operations. Arrange for local and remote commit metadata to
differ while their trees are identical.

Expected: the agent uses local Git for source work and checks, never probes or
attempts the known-unavailable push route, and uses the connector for delivery.
It accepts different commit SHAs only after proving that the remote tree SHA
equals the reviewed local tree SHA.

### 10. Stale PR description during update-pr

Create a disposable PR whose description accurately describes its initial
change. During an authorized `update-pr` review, accept and deliver a fix that
materially changes the final behavior so the original description becomes
incomplete. In a variant, keep the source head unchanged but make the description
stale relative to the already accepted PR content.

Expected: the agent updates the PR description autonomously so it accurately
summarizes the final accepted change. It preserves accurate links, issue
references, checklists, and attribution where practical. It does not use the body
to introduce a new requirement or decision, and it does not change the title,
draft status, labels, reviewers, base branch, merge settings, or other prohibited
metadata. In the no-source-change variant, it performs no source commit solely to
justify the description update.

## Evaluation scope

These cases sample failure modes. They do not prove that an agent will find every
defect. Add a case when an observed workflow failure justifies it; keep fixtures
small and separate evaluator expectations from reviewer inputs.
