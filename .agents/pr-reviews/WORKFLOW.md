# Iterative PR Review Workflow

Use this workflow only when requested by the user or required by the active
agent instructions. The coordinator owns scope, policy discovery, triage,
decisions, delivery authority, integration, and the final report. Subagents
provide bounded evidence or implement accepted work.

Target-repository human documentation remains authoritative for
repository-specific policy, architecture, coding standards, contribution rules,
and acceptance criteria. An `AGENTS.md` file is not required.

## 1. Establish authority, scope, and state

### 1.1 Select the delivery mode

Record one delivery mode before review work begins:

| Mode          | Edit | Commit   | Push                  | Merge                           |
| ------------- | ---- | -------- | --------------------- | ------------------------------- |
| `review-only` | no   | no       | no                    | no                              |
| `local-fix`   | yes  | optional | no                    | no                              |
| `update-pr`   | yes  | yes      | existing PR head only | no                              |
| `land-pr`     | yes  | yes      | yes                   | only when explicitly authorized |

- A plain request to review code selects `review-only` and means one read-only
  pass unless the user explicitly requests the iterative fixing loop.
- A request to fix locally selects `local-fix`.
- A request to update, repair, or push fixes to an existing PR selects
  `update-pr` only when pushing is explicit.
- A prohibition such as "do not merge" does not by itself authorize commits or
  pushes.
- Approval to push does not authorize force-push, approval, closing, enabling
  auto-merge, changing draft/ready-for-review status, labels, milestones, base
  branch, or other PR metadata.
- `land-pr` requires positive merge authorization. Never infer it from "finish,"
  "complete," or "make it ready."
- If the requested loop requires a write or remote action whose mode is unclear,
  ask once before taking that action. Record authorized and forbidden actions.

For `update-pr` or `land-pr`, resolve the PR's base repository/ref, head
repository/ref, and current head SHA from authoritative remote metadata. Confirm
that the head repository is writable. Fetch immediately before work and before
every push. Never review or push from a stale detached checkout merely because it
was once based on the PR branch.

### 1.2 Discover applicable repository governance

Perform bounded, path-scoped instruction discovery before classifying findings:

1. Read the target repository's root contribution entry point when present:
   `CONTRIBUTING*`, then the root `README*`. Read root `GOVERNANCE*` or
   `SECURITY*` when the changed surface makes it relevant.
2. For every changed path, walk its ancestor directories from repository root to
   the containing directory. Read any `README*`, `CONTRIBUTING*`, or
   `GOVERNANCE*` document encountered. Deduplicate documents shared by paths.
3. Follow direct links from those documents only when they are identified as
   policies, lifecycle rules, authority maps, standards, or required acceptance
   criteria for the changed surface. Do not recursively crawl unrelated
   documentation.
4. Record each applicable source at the revision reviewed and summarize the
   concrete invariant it contributes. If no such document exists, record that
   explicitly and continue using established correctness and safety invariants.
5. Give subagents the concise applicable invariants and source paths. Include a
   full document only when its exact wording or broader context is necessary.

Repository-specific facts belong in ordinary human documentation. Agent-specific
instructions, when present, supplement this discovery process but do not replace
it.

### 1.3 Establish the diff and durable state

1. Determine the base and head revisions, requested behavior, acceptance
   criteria, and whether uncommitted changes are in scope. Prefer the target
   repository's documented base; otherwise determine the likely merge base and
   state the assumption.
2. Classify risk:
   - **Low:** small, localized, well-tested changes with no sensitive boundary.
   - **Medium:** cross-module behavior, persistence, public behavior, or a
     meaningful test gap.
   - **High:** authentication or authorization, secrets, migrations,
     concurrency, data loss, cryptography, broad public compatibility, or a
     large or unclear diff.
3. Create `.agents/pr-reviews/state/<branch-or-pr>.md` in the target working tree
   from `.agents/pr-reviews/STATE_TEMPLATE.md`, or resume the matching state
   file. Keep it untracked unless the user explicitly chooses otherwise. Prefer
   a local Git exclude rather than changing the target repository solely for
   review state.
4. Confirm that recorded scope, governance, remote refs, delivery authority, and
   decisions still match the current diff. Mark stale entries rather than
   silently carrying them forward.
5. Run or inspect the cheapest useful baseline checks once. Record pre-existing
   failures.

## 2. Choose the least-cost review path

- **Low or medium risk:** spawn one fresh `pr_reviewer` for a broad read-only
  review.
- **High risk:** start with `pr_reviewer`, then use `pr_risk_reviewer` only for
  the matching high-risk surface or an uncertain or disputed finding.
  Independent duplicate review is justified only when the consequence warrants
  its cost.
- Do not spawn reviewers for mechanical facts already settled by reliable
  tooling.
- Do not send raw logs or the full conversation. Supply the authoritative
  diff/base, stable requirements, applicable governance invariants and sources,
  accepted decisions, and minimum code context.
- For a blind broad re-review, provide requirements, governance invariants, and
  accepted user decisions, but omit earlier reviewers' wording, rejected
  hypotheses, and claimed resolutions. Independence must not withhold governing
  ground truth.

## 3. Triage findings against governing invariants

The coordinator must validate and deduplicate findings before any edit.

- Use severities consistently:
  - **P0:** immediate catastrophic or actively exploitable failure; stop the
    workflow.
  - **P1:** likely serious correctness, security, data-loss, or compatibility
    failure.
  - **P2:** material defect or regression under a credible scenario.
  - **P3:** low-impact improvement; do not block convergence unless requested.
- Assign a stable fingerprint based on invariant or behavior, location or
  component, and trigger. Reuse it when the same defect reappears under different
  wording.
- Record each finding as `proposed`, `accepted`, `rejected`, `deferred`, `fixed`,
  `verified`, `reopened`, or `stale`.
- Separate these elements for every proposed P0-P2 finding:
  1. the observed fact and reproducible evidence;
  2. the governing repository source and invariant, or the general
     correctness/safety invariant when no repository source exists;
  3. the interpretation connecting observation to consequence;
  4. materially different valid resolutions; and
  5. whether user direction is required.
- A mechanical symptom is not sufficient evidence of a defect. For example, a
  broken link in preserved historical material is not actionable when lifecycle
  policy deliberately permits it and provides a current supersession path.
- Reject unsupported, duplicate, purely stylistic, pre-existing, or out-of-scope
  findings unless they materially affect the PR.
- Ask the user before selecting among materially different valid fixes, or when
  resolution changes public behavior or API, a contract, security tradeoff,
  irreversible migration, conflicting requirement, or substantial scope. Record
  the choice and rationale before fixing.

## 4. Fix accepted findings

1. Give one fresh `pr_fixer` accepted finding IDs, observations, governing
   invariants and sources, acceptance criteria, relevant decisions, and owned
   files. It is the only source-code writer for the round.
2. State acceptance criteria as repository invariants, not merely desired patch
   properties. Do not say only "remove all old links" when the actual invariant
   concerns lifecycle or authority.
3. Do not ask the fixer to conduct a broad review. New suspected issues return to
   the coordinator for triage.
4. If the fix expands into a new path or concern, discover and record the newly
   applicable governance before editing that scope.
5. Review the resulting diff for scope discipline and map each implementation to
   its accepted finding before marking it `fixed`.
6. Keep fixes uncommitted until focused verification and the changed-path policy
   audit pass, unless the user explicitly requires an intermediate commit.

## 5. Verify, audit policy, and re-review

1. Use `pr_verifier` for focused verification and narrow tests when routine.
   Escalate only an inconclusive or reasoning-heavy item. Give the verifier the
   governing invariant and require it to verify that invariant, not simply the
   intended mechanical patch outcome.
2. Run one proportionate integration check after fixes; do not have every agent
   repeat the broad suite.
3. Perform a changed-path policy audit: repeat bounded discovery for every file
   now changed, confirm that no applicable source was missed, and check every
   hunk against the recorded invariants.
4. Spawn a fresh `pr_reviewer` for a blind review of the current complete diff.
5. Triage new findings and reopen failed fixes. Start another fix round only for
   accepted P0-P2 findings.

## 6. Commit, push, and remote verification

Apply this section only to delivery modes that authorize the corresponding
actions.

1. After local verification, policy audit, and fresh re-review succeed, create
   scoped commits in the authorized worktree or branch.
2. Re-fetch the remote PR head immediately before pushing. If it moved, reconcile
   deliberately and repeat affected checks. Do not overwrite it.
3. Push normally to the recorded existing PR head branch. Never force-push unless
   the user explicitly authorizes that exact operation after seeing why it is
   needed.
4. Record the pushed SHA. Confirm that remote PR metadata still points to that
   SHA and that prohibited PR state did not change.
5. Wait for required remote checks on that exact SHA. Triage failures; do not call
   a local check an equivalent substitute for a required remote check.
6. `update-pr` stops with an updated, verified PR. It never approves or merges.
   `land-pr` may merge only after every stop condition passes and the user has
   explicitly authorized merging.

## 7. Stop conditions

Declare convergence only when:

- no accepted P0-P2 finding remains unverified;
- required deterministic checks pass, or unrelated pre-existing failures are
  explicitly recorded;
- the changed-path policy audit passes;
- one fresh broad review finds no new actionable P0-P2 issue;
- the user has made every required material decision; and
- for `update-pr` or `land-pr`, the exact pushed SHA is the current PR head and
  its required remote checks pass.

Default to at most three broad review rounds. Stop earlier when converged. If the
bound, budget, or practical context limit is reached, report open findings and
evidence; do not call the PR clean. A clean model review never replaces required
human approval, CI, branch protection, domain review, or security review.

## 8. Cost and final report

- Start with `gpt-5.6-terra` at medium effort for general review and fixing, and
  `gpt-5.6-luna` at medium effort for routine targeted verification.
- Use `gpt-5.6-sol` at high effort only for a specific difficult or high-risk
  question. Escalate the uncertain subtask, not the whole workflow.
- Never increase fan-out merely to use concurrency. Keep no more than three
  delegated threads active, normally one reviewer or writer at a time in this
  sequential loop.
- When available, record models, effort, rounds, accepted and rejected findings,
  retries, token or paid-tool usage, latency, and rework. Never invent unavailable
  usage data.
- Optimize for confirmed actionable findings and escaped-defect reduction, not
  raw finding count.
- The final report states: delivery mode, convergence status, reviewed base/head
  and pushed SHA when applicable, governance sources consulted, accepted and
  rejected findings, user decisions, changes made, commits and remote actions,
  verification evidence, remaining risks, known failures, rounds, and available
  cost metrics.
