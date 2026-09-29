# ChatGPT PR Review Adapters

These adapters bind the provider-neutral [PR review workflow](../../WORKFLOW.md)
to ChatGPT environments. They define environment capabilities, delivery routes,
and concrete model mappings without changing review authority, acceptance
criteria, or convergence rules.

For each run:

1. load [BOOTSTRAP.md](BOOTSTRAP.md) and [MODELS.md](MODELS.md); and
2. select exactly one environment adapter: [CHAT.md](CHAT.md) or
   [WORK.md](WORK.md).

Example invocation:

> Review PR `<number>` in `<owner/repository>` using the PR review workflow from
> `benoit-gl/agent-workflows`, the ChatGPT bootstrap and model mapping, and the
> ChatGPT Work adapter. Use `update-pr` delivery. Do not merge.

The core workflow remains authoritative for modes, governance, findings,
verification, and completion. These files describe only how ChatGPT satisfies
those requirements in a particular environment.

## Background references

These explain the ChatGPT-specific delegation choices; they do not add workflow
requirements.

- [OpenAI multi-agent guidance](https://developers.openai.com/api/docs/guides/responses-multi-agent)
- [OpenAI orchestration patterns](https://developers.openai.com/api/docs/guides/agents/orchestration)
