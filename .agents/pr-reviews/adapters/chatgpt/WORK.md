# ChatGPT Work Adapter

Before any repository work, load and follow [BOOTSTRAP.md](BOOTSTRAP.md) at the
same recorded `agent-workflows` commit. Select this file as the one environment
adapter. Do not continue until the bootstrap's required instruction set is
loaded.

Use this adapter in ChatGPT Work when local Git, shell, and a writable workspace
are available but authenticated `git push` is not.

## Capability facts

- Use local Git and shell tools for clone or fetch, checkout, diff inspection,
  editing, local commits, and runnable checks.
- Do not attempt `git push`; it is not an authenticated delivery route in this
  environment.
- Use the authenticated repository connector for authoritative PR metadata,
  refs, Git-object delivery, and remote check evidence.
- Before work, inspect the connector schemas needed to create blobs, trees, and
  commits; advance a ref without force; and inspect PR/check state.
- Work in an isolated checkout at the authoritative PR head. Keep review state,
  briefs, and other process files untracked.
- Use fresh delegated contexts for broad review when available. Give each only
  the bounded fresh-round brief and required source access; do not inherit prior
  findings into a new broad round.

If the connector cannot create the complete tree and one commit, cannot advance
the existing head ref without force, or cannot establish authoritative check
status, complete safe local work and report remote delivery or verification as
blocked.

## `update-pr` delivery

After the canonical workflow has accepted and verified the local candidate:

1. Record the exact local reviewed tree. Re-resolve the PR base, head
   repository/ref, and head SHA. If either ref moved, reconcile locally and repeat
   affected checks and review.
2. Through the connector, create blobs for every changed file and one tree based
   on the current remote head tree. Preserve unchanged entries, file modes,
   renames, and deletions.
3. Require the connector-created tree SHA to equal the reviewed local tree SHA.
   The remote commit SHA may differ from a local commit because metadata can
   differ; tree identity is the content gate.
4. Create one remote commit with the current PR head as its parent and advance
   only the existing PR head ref with a non-force update.
5. Confirm that the PR points to the delivered commit and reviewed tree, then
   verify the authoritative required-check target.

Do not fall back to browser editing, sequential per-file commits, or `git push`.
