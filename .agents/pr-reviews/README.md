# Testing the PR Review Protocol

Start a fresh agent session at the target repository root. Explicitly name the
requested delivery outcome.

For a read-only iterative review:

> Run the iterative PR review protocol from `benoit-gl/agent-workflows` on PR
> `<number>`. Use `review-only` delivery. Do not edit, commit, push, or change PR
> state.

For an updated but unmerged PR:

> Run the iterative PR review protocol from `benoit-gl/agent-workflows` on PR
> `<number>`. Use `update-pr` delivery: work from the current PR head, apply
> accepted fixes, commit them, and push normally to that same head branch so CI
> runs. Do not force-push, approve, close, enable auto-merge, change draft status,
> or merge. Ask before selecting among materially different valid contract, API,
> security, or migration resolutions.

For local fixes only:

> Run the iterative PR review protocol from `benoit-gl/agent-workflows` on the
> current branch versus `<base>`. Use `local-fix` delivery and include
> `<whether uncommitted changes are in scope>`. Do not push or merge.

The workflow automatically performs bounded discovery of ordinary target
repository documentation. Callers should not have to repeat "read applicable
documentation" in each request. Repository-specific policy remains in human
documents such as `CONTRIBUTING.md` and path-scoped `README.md` files; an
`AGENTS.md` file is not required.

For a small, localized PR, `gpt-5.6-terra` at medium effort is an economical
coordinator. For a high-risk PR, use `gpt-5.6-sol` and raise effort only when
triage or reconciliation is genuinely difficult. Reserve `gpt-6-astra` for
exceptional architecture, security, or debugging ambiguity.

During an exercise, confirm that:

1. The coordinator records delivery mode, authorized actions, exact refs, and
   remote state in `.agents/pr-reviews/state/`.
2. It reads the root contribution entry point and path-scoped governance for
   every changed path, then records concise sourced invariants.
3. Every accepted P0-P2 finding separates observation, governing invariant,
   interpretation, alternatives, and decision needs.
4. Broad review rounds use fresh, read-only reviewers.
5. Only one fixer changes source, and only after findings are accepted.
6. Material choices are presented to the user and recorded before fixing.
7. Verifiers check governing invariants rather than merely the intended patch
   shape.
8. A changed-path policy audit, integration checks, and a fresh broad re-review
   occur before commit or push.
9. `update-pr` uses a normal push to the existing PR head, records the pushed
   SHA, and waits for required checks on that exact SHA without changing PR state.
10. The final report states whether the loop converged and never equates a clean
    model response with proof.

Keep the state directory untracked. Prefer a local Git exclude such as
`.git/info/exclude` when the target repository does not already ignore it.
