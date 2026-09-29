# ChatGPT Chat Adapter

Before any repository work, load and follow [BOOTSTRAP.md](BOOTSTRAP.md) from the
same commit SHA as this file. Select this file as the one environment adapter. Do
not continue until the bootstrap's required instruction set is loaded.

Use this adapter in ChatGPT Chat when there is no usable Git checkout and no
authenticated Git transport.

## Capability facts

- Do not attempt to clone, fetch, or push with Git.
- Use the authenticated repository connector for source, refs, PR metadata,
  checks, and authorized Git-object delivery.
- Inspect the connector's actual schemas before work. Account for pagination,
  truncation, and response limits when proving complete source or diff coverage.
- Use temporary workspace files only for review state, briefs, and candidate
  assembly. They are not an authoritative repository checkout.
- Use fresh delegated contexts when available. Otherwise apply the bootstrap's
  explicitly non-independent surrogate rule.
- Prefer authoritative remote CI for repository checks that cannot run in the
  Chat environment.

If complete source access, exact tree construction, non-force ref advancement,
or authoritative check evidence is unavailable, complete safe work and report
the affected stage as blocked.

## `update-pr` delivery

After the canonical workflow has accepted and verified the candidate:

1. Re-resolve the PR base, head repository/ref, and head SHA. If either ref moved,
   reconcile as the workflow requires before delivery.
2. Create blobs for every changed file, then create one tree from the current
   remote head tree. Preserve unchanged entries, file modes, renames, and
   deletions.
3. Compare the constructed tree identity or complete tree diff with the exact
   reviewed candidate. Stop if identity cannot be established.
4. Create one commit with the current PR head as its parent and advance only the
   existing PR head ref with a non-force update.
5. Confirm that the PR now points to the delivered commit and exact reviewed
   tree, then verify the authoritative required-check target.

Do not simulate a coherent delivery with sequential per-file commits or a series
of partially visible file updates. Do not use a browser UI for delivery when the
connector can create Git objects and advance the ref atomically.
