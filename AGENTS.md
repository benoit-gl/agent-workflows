# Workspace Agent Guidelines

## General delegation

Use subagents for independent, bounded work when they improve focus or execution.
Keep one coordinator responsible for decisions, integration, and the final answer.

- Start with at most three concurrent subagents. Increase concurrency only when
  independent work justifies it and the active workflow permits it.
- Use supported models suited to each task. Prefer economical routine execution;
  escalate an uncertain subtask rather than rerunning the entire assignment.
- Give each agent a clear scope, input, permissions, deliverable, and stopping
  condition. Avoid overlapping writes and unnecessary duplicate investigation.
- Send only relevant context. Return concise evidence and references rather than
  raw transcripts or large logs.
- Avoid delegation for trivial work or dependent steps that gain nothing from a
  separate context. Stop or redirect redundant agents.
- Run proportionate integration checks. Do not repeat broad suites in every agent.
- Record available cost and latency data without inventing missing metrics.

## PR review

For an iterative PR review or the repository review protocol, read and follow
[the PR review workflow](.agents/pr-reviews/WORKFLOW.md). It owns review authority,
roles, governance discovery, verification, and completion rules, including its
specific concurrency and fresh-review requirements.

## Planned merge points

For a planned merge-point lifecycle, read and follow
[the planned merge workflow](.agents/planned-merges/WORKFLOW.md). It owns
readiness assessment, plan repair, scope-drift handling, implementation
orchestration, qualification classes, and environment handoffs. It uses the PR
review workflow for each PR convergence loop instead of replacing it.

For changes to this repository, follow [CONTRIBUTING.md](CONTRIBUTING.md).
