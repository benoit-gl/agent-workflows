# ChatGPT PR Review Adapters

These adapters bind the provider-neutral [PR review workflow](../../WORKFLOW.md)
to ChatGPT environments. They define environment capabilities, delivery routes,
and concrete model mappings without changing review authority, acceptance
criteria, or convergence rules.

Start each run from exactly one environment entry point. The selected entry point
requires the shared bootstrap before repository work begins; the bootstrap loads
the canonical workflow, state template, and model mapping at one recorded
revision.

- [Chat entry point](CHAT.md)
- [Work entry point](WORK.md)
- [Shared bootstrap](BOOTSTRAP.md)
- [Model mapping](MODELS.md)

## Chat invocation

> Review PR `<number>` in `<owner/repository>`. Before doing any repository work,
> load and follow `.agents/pr-reviews/adapters/chatgpt/BOOTSTRAP.md` from one
> resolved commit of `benoit-gl/agent-workflows`, selecting
> `.agents/pr-reviews/adapters/chatgpt/CHAT.md` as the environment adapter. Use
> `update-pr` delivery. Do not force-update, approve, close, enable auto-merge,
> change PR state, or merge.

## Work invocation

> Review PR `<number>` in `<owner/repository>`. Before doing any repository work,
> load and follow `.agents/pr-reviews/adapters/chatgpt/BOOTSTRAP.md` from one
> resolved commit of `benoit-gl/agent-workflows`, selecting
> `.agents/pr-reviews/adapters/chatgpt/WORK.md` as the environment adapter. Use
> `update-pr` delivery. Do not force-update, approve, close, enable auto-merge,
> change PR state, or merge.

The core workflow remains authoritative for modes, governance, findings,
verification, and completion. These files describe only how ChatGPT satisfies
those requirements in a particular environment.

## Background references

These explain the ChatGPT-specific delegation choices; they do not add workflow
requirements.

- [OpenAI multi-agent guidance](https://developers.openai.com/api/docs/guides/responses-multi-agent)
- [OpenAI orchestration patterns](https://developers.openai.com/api/docs/guides/agents/orchestration)
