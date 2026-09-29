# Iterative PR Review Workflow

Use this workflow only when requested by the user or required by the active
agent instructions. The coordinator owns scope, policy discovery, triage,
decisions, delivery authority, integration, and the final report. Subagents
provide bounded evidence or implement accepted work.

Target-repository human documentation remains authoritative for
repository-specific policy, architecture, coding standards, contribution rules,
and acceptance criteria. An `AGENTS.md` file is not required.

This file is authoritative for review semantics. The [README](README.md) supplies
invocations; the [state template](STATE_TEMPLATE.md) records execution. Environment
adapters may specify tool use and state locations, but cannot grant authority or
silently weaken acceptance criteria.

## 1. Establish authority, scope, and state

### 1.0 Check the execution environment

Before starting, identify the workflow revision and keep it fixed for the session.
When loading remotely, resolve a commit and read the workflow and template at that
commit. Record any adapter and its revision or content identity. On resume, reload
the recorded instructions; assess an intentional update before continuing.

Verify facilities for complete source/diff access, writable process state, checks,
fresh reviewer contexts, and the selected delivery route. Repository read access,
connector write access, and Git push authentication are separate capabilities.
Use actual tool schemas; role names below do not imply installed agent presets.

An explicitly selected adapter may declare stable environment limits and a
prescribed delivery route. Treat those declarations as capability facts: do not
probe a route known to be unavailable. Discover variable capabilities and inspect
their actual schemas before relying on them.

Record unavailable facilities and substitutions. Use an explicitly selected
environment adaptation where provided. A same-context review is not independent;
it cannot satisfy an acceptance rule that requires independence. If required
instructions, source, or verification remain unavailable, complete safe work and
report the affected stage as blocked. Do not invent evidence or bypass controls.

### 1.1 Select the delivery mode

Record one delivery mode before review work begins:

| Mode          | Edit | Commit        | Remote delivery       | Merge |
| ------------- | ---- | ------------- | --------------------- | ----- |
| `review-only` | no   | no            | no                    | no    |
| `local-fix`   | yes  | explicit only | no                    | no    |
| `update-pr`   | yes  | yes           | existing PR head only | no    |

- A plain request to review code selects `review-only` and means one read-only
  pass. Explicit repeated read-only review does not authorize fixes.
- A request to fix locally selects `local-fix`. It authorizes worktree edits, not
  commits. A local commit requires separate explicit authorization recorded in
  the state file.
- A request to update, repair, deliver, or push fixes to an existing PR selects
  `update-pr` only when remote delivery is explicit.
- A prohibition such as "do not merge" does not by itself authorize commits or
  remote delivery.
- Approval for remote delivery does not authorize force-updating, approval,
  closing, enabling auto-merge, changing draft/ready-for-review status, labels,
  milestones, base branch, or other PR metadata.
- This workflow never merges a PR. Merge remains a separate user or repository
  operation outside these delivery modes.
- If the requested loop requires a write or remote action whose mode is unclear,
  ask once before taking that action. Record authorized and forbidden actions.

For `update-pr`, resolve the PR's base repository/ref, head repository/ref, and
current head SHA from authoritative remote metadata. Confirm that the head
repository is writable. Refresh remote facts immediately before work and before
every delivery. Never review or deliver from a stale snapshot merely because it
was once based on the PR branch.

### 1.2 Discover applicable repository governance

Perform bounded, path-scoped instruction discovery before classifying findings:

1. Read the target repository's root `README*` and inspect the hosting platform's
   conventional repository-policy locations once. On GitHub, inspect supported
   root, `.github/`, and `docs/` locations for `CONTRIBUTING*`, `SECURITY*`, and
   `CODEOWNERS`, applying GitHub's precedence when more than one candidate
   exists. Read root `GOVERNANCE*` when present.
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
   state the assumption. Record the base tip and comparison baseline separately.
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

The coordinator owns the state file. At each stage transition, record the next
action and bind evidence to the content tested. Baseline CI does not verify later
edits. Use `pass`, `fail`, `blocked`, or `not applicable`, with supporting evidence.
Checkpoint before interruption; on resume, re-resolve remote facts and invalidate
affected evidence. Temporary files may not survive a new session: report missing
state rather than reconstructing prior results from assumptions.

## 2. Choose the least-cost review path

Each broad review is a first-principles assessment of the current PR. Reconstruct
the PR's purpose and design from the current repository state, and ask whether
the PR is good as a whole. Treat the required review dimensions as prompts for
investigation, not as an exhaustive checklist. Look for any material defect,
inconsistency, unjustified design choice, incomplete propagation, or other reason
the current PR should not be accepted.

Investigate repository compliance, correctness and edge cases, design quality,
compatibility, missing verification, and consistency among implementation, tests,
ADRs, specifications, and active documentation. Look for incomplete work, stale
documents, temporary scaffolding, and cruft. Neither trust earlier fixes nor
assume a defect must exist. Question misplaced or inconsistent rules with evidence;
do not silently replace them with personal preferences.

### 2.1 Semantic propagation

When a semantic contract changes, inspect unchanged consumers and active
documentation. This includes changes to invariants, interfaces, serialization,
ordering, concurrency, lifecycle, architecture, or defined terminology. Search
for direct references and restatements of superseded semantics.

Check documentation against implementation/tests and the reverse; abstractions
against consumers; and design decisions against active summaries/specifications.
Distinguish active material from history that policy requires to remain unchanged.
Record inspected paths and coverage limits. This supplements the changed-path
policy audit; it does not expand governance discovery into an unrelated crawl.

### 2.2 Roles and task contracts

- **Low or medium risk:** spawn one fresh `pr_reviewer` for a broad read-only
  review.
- **High risk:** start with `pr_reviewer`, then use `pr_risk_reviewer` only for
  the matching high-risk surface or an uncertain or disputed finding.
  Independent duplicate review is justified only when the consequence warrants
  its cost.
- Do not spawn reviewers for mechanical facts already settled by reliable
  tooling.
- Fixer and verifier are responsibilities. The coordinator may perform routine
  fixes and deterministic checks directly. Delegate bounded work when it improves
  focus or execution; this does not remove the fresh broad-review requirement.
- Keep at most three delegated threads active. Parallelize independent
  investigations, not dependent review/fix/verify stages. One source writer
  prevents conflicting edits; freeze the candidate while it is under review.
- Give each task its question, exact input identity, scope, write authority,
  governing invariants, expected output, and stopping condition. The coordinator
  retains decision and delivery authority. Reviewers are read-only; restrict their
  tools where the runtime permits. Instructions alone are not an access boundary.
- Reviewers return the section 3 finding format, inspected scope, and limitations.
  Fixers return changed paths and accepted finding IDs. Verifiers return commands,
  tested content identity, results, and evidence locations. Return concise evidence,
  not raw transcripts. Validate results before advancing; a failed, cancelled, or
  incomplete task is not a clean review.

### 2.3 Fresh broad-review inputs

Before every broad round, refresh remote facts and identify the complete candidate
against its comparison baseline, including pending edits. Reconcile changed refs
before starting; do not mix source snapshots. Generate a brief containing only:

- requirements and acceptance criteria;
- applicable sourced governance and invariants;
- explicit accepted user decisions;
- current base/head, comparison baseline, and complete candidate identity/scope;
- neutral context and access to source needed for independent investigation.

Exclude earlier findings, reviewer wording, rejected hypotheses, claims of fix
correctness, and previous convergence conclusions. Do not withhold governing
decisions merely because they arose in an earlier round.

Start a fresh reviewer context with this brief, without inherited finding history
or the full conversation/state file. Check actual context controls: a new agent
name alone proves no isolation. Separate contexts may share files and tools.
Record the isolation method and brief location for each round. Reconcile the new
review with the finding history only after it returns.

Fresh contexts reduce anchoring; they do not guarantee independent judgment.
Content identities prevent stale verification, while deterministic checks supply
evidence that a model review cannot provide.

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
- Ask the user before selecting among materially different valid fixes affecting
  architecture, interfaces, dependencies, compatibility, maintainability, or
  future development. Also obtain direction for public behavior/API or contract
  changes, security tradeoffs, irreversible migrations, conflicting requirements,
  or substantial scope changes that existing authority does not cover. Record
  the choice and rationale before fixing; do not ask again for recorded decisions.

## 4. Fix accepted findings

1. Assign one writer: the coordinator or a fresh `pr_fixer`. Supply accepted
   finding IDs, observations, governing invariants and sources, acceptance
   criteria, relevant decisions, and owned files.
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

1. Perform focused verification directly or delegate it to `pr_verifier`.
   Verify the governing invariant, not simply the intended patch shape. Escalate
   only an inconclusive or reasoning-heavy item.
2. Run one proportionate integration check after fixes; do not have every agent
   repeat the broad suite.
3. Perform a changed-path policy audit: repeat bounded discovery for every file
   now changed, confirm that no applicable source was missed, and check every
   hunk against the recorded invariants.
4. Run a fresh broad review of the complete candidate using section 2.3.
5. Triage new findings and reopen failed fixes. Start another fix round only for
   accepted P0-P2 findings.
6. When the local state passes these checks, record an identity for the exact
   reviewed content, such as its tree or complete diff, for comparison after any
   authorized commit.

## 6. Commit, deliver, and verify remotely

Apply commit steps only when commit authority is explicit. Apply remote delivery
and verification steps only to `update-pr`.

For `update-pr` with no changes to deliver, skip commit/delivery and record the
unchanged reviewed head as the delivery revision. Still perform final remote verification.
Local pre-delivery checks and required post-delivery CI are distinct gates; neither
substitutes for the other.

1. After candidate verification, policy audit, and fresh re-review succeed,
   create one scoped commit through the selected delivery route when authorized.
2. Compare the committed tree or complete committed diff with the recorded
   reviewed content. If staging, a commit hook, or any other step changed content
   or added paths, repeat the affected policy audit, verification, and re-review
   before delivery.
3. For `update-pr`, re-resolve both the remote PR base and head immediately before
   delivery. If the head moved, reconcile deliberately and repeat affected checks;
   do not overwrite it. If the base moved, repeat checks whose result depends on
   the base or merge result before declaring convergence.
4. Deliver the exact reviewed tree to the recorded existing PR head branch using
   the selected environment adapter. Prefer one coherent commit and one
   non-force ref advancement. Never force-update unless the user explicitly
   authorizes that exact operation after seeing why it is needed.
5. Record the delivered head SHA. Confirm that remote PR metadata still points to
   that SHA and that prohibited PR state did not change. Re-resolve the current
   base and head before final remote verification.
   If a write response is uncertain, inspect remote state before retrying.
6. Determine the authoritative required-check target from current host and
   repository metadata. Do not assume required checks attach to the PR head SHA;
   for example, GitHub checks can apply to a current PR test-merge or merge-queue
   revision. Record the exact target and wait for its required checks. Triage
   failures; do not substitute a local check for a required remote check.
   Unknown check requirements or targets block completion. An empty run list is
   not proof of success; record authoritative evidence when no checks are required.
7. `update-pr` stops with an updated, verified PR. It never approves, changes PR
   lifecycle state, enables auto-merge, or merges.

## 7. Stop conditions

Report task completion separately from solution convergence:

| Mode          | Task completion                                                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `review-only` | Requested review scope and rounds are complete, findings are triaged, and evidence/limits are reported. Unresolved findings do not make the review task incomplete. |
| `local-fix`   | The local candidate has converged. Commit only if separately authorized; no remote delivery is required by this mode.                                               |
| `update-pr`   | The delivered or unchanged head has converged and current remote verification passes.                                                                               |

A read-only review can be complete with findings. Do not call its solution
converged when accepted P0-P2 findings remain unresolved. A missing required
review stage is still incomplete work, in any mode.

Declare solution convergence only when:

- no accepted P0-P2 finding remains unverified;
- required deterministic checks pass, or unrelated pre-existing failures are
  explicitly recorded;
- the changed-path policy audit passes;
- one fresh broad review finds no new actionable P0-P2 issue;
- the user has made every required material decision; and
- for `update-pr`, the recorded delivery revision is still the current PR head, the
  current base/head pair has been re-resolved, and required remote checks pass on
  the authoritative check target for that current PR state.

Default to at most three broad review rounds, including the initial and final
broad reviews. The last qualifying broad round can serve as the final review if
its content and refs remain current; do not add a duplicate for bookkeeping.
Focused follow-up checks do not count as broad rounds. Stop earlier when the
selected mode's task is complete. A clean initial candidate needs no fixing pass.

The round bound limits cost and prevents endless re-review. If the bound, budget,
or practical context limit prevents a required step, checkpoint the blocker and
next action; report convergence not established. Do not defer an accepted blocker
merely to pass the convergence test. A clean model review never replaces required
human approval, CI, branch protection, domain review, or security review.

## 8. Cost and final report

- Use these cost-conscious defaults when they are available:

  | Work                                            | Default tier | Escalate when                                                                                                                                               |
  | ----------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Inventory, extraction, and routine verification | Economy      | Results are inconclusive or require substantial reasoning.                                                                                                  |
  | General review and ordinary fixing              | Standard     | A specific finding crosses modules or semantic contracts, or remains disputed after validation.                                                             |
  | Difficult targeted analysis                     | Strong       | A serious architecture, security, correctness, data-loss, concurrency, migration, or compatibility question remains unresolved after focused investigation. |
  | Exceptional reconciliation                      | Frontier     | Targeted analysis still leaves consequential architecture, security, or debugging ambiguity.                                                                |

- Escalate only the affected subtask. Do not repeat settled work on the stronger
  model, and return later routine work to the default path. Risk classification
  alone does not require escalation: first identify the unresolved reasoning that
  the cheaper path could not settle.
- The selected environment adapter maps these tiers to concrete model and effort
  settings. Runtime and user model preferences remain configuration rather than
  workflow prerequisites. If a mapped model or effort is unavailable, select the
  closest supported option and record the substitution and reason.
- When available, record models, effort, rounds, accepted and rejected findings,
  retries, token or paid-tool usage, latency, and rework. Never invent unavailable
  usage data.
- Optimize for confirmed actionable findings and escaped-defect reduction, not
  raw finding count.
- The final report states: delivery mode, task completion, solution convergence,
  reviewed base/head, reviewed-content identity, delivery revision and check target
  when applicable, governance sources consulted, accepted and rejected findings,
  user decisions, changes made, commits and remote actions, verification evidence,
  remaining risks, known failures, rounds, and available cost metrics.
