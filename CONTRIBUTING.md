# Contributing to agent-workflows

This document defines the minimum submission standard for repository changes.
It does not replace workflow-specific guidance in `.agents/` or agent behavior
rules in `AGENTS.md`.

## Definition of done

Development branches and draft pull requests can contain incomplete, fixup, or
checkpoint commits. Intermediate commits do not have to satisfy every repository
gate. The final pull-request head must be a coherent repository state before the
pull request is ready for review or merge.

Run `npm run check` as the complete local mechanical verification gate. A pull
request is complete only when the repository CI `verify` job succeeds for the
relevant final revision.

Verification claims must describe evidence that actually ran against the stated
revision. Do not describe work as complete when a required gate has not run
successfully. If verification cannot run because of an external limitation, keep
the work explicitly incomplete and state which evidence is missing.

## Workflow and documentation changes

The workflow documents are a coordinated contract. When behavior changes, update
every affected artifact in the same pull request. Depending on the change, this
can include:

- `AGENTS.md` for top-level agent rules;
- `.agents/pr-reviews/WORKFLOW.md` for workflow semantics;
- `.agents/pr-reviews/STATE_TEMPLATE.md` for durable review state;
- `.agents/pr-reviews/README.md` for invocation and exercise guidance; and
- `README.md` for repository-level usage and scope.

Update only artifacts whose meaning changes. Do not duplicate a rule into
unaffected documents merely for symmetry.

Keep local Markdown links valid. Repository-local links are checked
automatically by `npm run check`.

## Pull-request workflow and hygiene

Use one pull request for one logical merge unit. Keep unrelated cleanup and
refactoring out of the change.

Open a draft pull request when the work becomes useful to share, preserve, or
review. Draft work can be incomplete and can contain temporary commits. Before
the pull request is ready for review, make its final scope coherent and remove
temporary working state.

Pull requests are squash-merged. Write the pull-request title and description as
the final squash commit title and message. The description must state the
resulting change, not temporary branch or review-process status. Update it during
review when the final change makes the existing description inaccurate or
incomplete.

Prefer normal fast-forward updates to an active pull-request branch. Coordinate
before rewriting or force-updating branch history that another contributor is
using or building on.

Submit only files that belong to the change. Remove temporary scripts,
diagnostic logs, local review state, generated output, and other working files
before review unless the repository explicitly requires them.

Before you mark a pull request ready for review:

- inspect the complete diff against its target branch;
- confirm that the final head is coherent and has no known broken state;
- confirm that no unrelated or temporary files remain;
- confirm that all affected workflow and documentation artifacts agree;
- run or obtain the required verification for the relevant final revision; and
- ensure that the pull-request title and description accurately state the final
  change.

## Verification tooling

The repository verification entry point is:

```text
npm run check
```

It performs:

- Prettier formatting verification; and
- repository-local Markdown link verification.

The formatter version is pinned in the package script. CI runs the same
repository command rather than a separate CI-only verification path.

Keep the verification surface small and deterministic. Add a new lint rule,
checker, dependency, or CI-only step only when a concrete repository failure mode
justifies it.
