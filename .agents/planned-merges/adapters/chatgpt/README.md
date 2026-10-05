# ChatGPT Planned Merge Adapters

These adapters bind the provider-neutral
[planned merge-point workflow](../../WORKFLOW.md) to ChatGPT Chat and Work. The
canonical workflow owns readiness, scope, qualification, and handoff rules.

The planned merge workflow uses the existing ChatGPT PR review adapters for its
inner `update-pr` loops. Load all required files from one immutable
`agent-workflows` revision. If the invocation does not select a revision, use
the tip of the repository's default branch.

- [Chat entry point](CHAT.md)
- [Work entry point](WORK.md)
- [Shared bootstrap](BOOTSTRAP.md)
- [Shared model mapping](../../../pr-reviews/adapters/chatgpt/MODELS.md)

## Chat entry

Use Chat as the normal cost-conscious environment for readiness, planning, and
implementation. Stay through provisional convergence when Chat can satisfy every
convergence prerequisite. If Work-only verification blocks convergence, or if the
recorded class otherwise requires Work, prepare the handoff and stop without
claiming qualification.

## Work entry

Work can execute every phase. When it receives a qualification handoff, keep the
merge point in Work until qualification completes or a true human decision gate
is reached. Do not return routine fixes to Chat.

The environment choice never changes repository authority or merge permission.
