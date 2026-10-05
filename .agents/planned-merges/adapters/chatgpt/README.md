# ChatGPT Planned Merge Adapters

These adapters bind the provider-neutral
[planned merge-point workflow](../../WORKFLOW.md) to ChatGPT Chat and Work. The
canonical workflow owns readiness, scope, qualification, and handoff rules.

The planned merge workflow uses the existing ChatGPT PR review adapters for its
inner `update-pr` loops. Load all required files from one immutable
`agent-workflows` revision.

- [Chat entry point](CHAT.md)
- [Work entry point](WORK.md)
- [Shared bootstrap](BOOTSTRAP.md)
- [Shared model mapping](../../../pr-reviews/adapters/chatgpt/MODELS.md)

## Chat entry

Use Chat as the normal cost-conscious environment for readiness, planning,
implementation, and provisional convergence. If the recorded class requires
Work, prepare the handoff and stop without claiming qualification.

## Work entry

Work can execute every phase. When it receives a qualification handoff, keep the
merge point in Work until qualification completes or a true human decision gate
is reached. Do not return routine fixes to Chat.

The environment choice never changes repository authority or merge permission.
