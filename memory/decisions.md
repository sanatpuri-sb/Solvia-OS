# Decisions

- 2025-08-13: GitHub is canonical; mirrors read-only; proposals via /proposals.

- 2025-08-13: Chroma online (local embeddings). Branch protection PR-only;
  status checks/approvals off until CI (Step D).

- 2025-08-13: Repo kept Public to enable branch protection on a personal plan;
  plan to migrate to a GitHub Organization and make Private later.

- 2025-08-13: Switched vector embeddings to local
  `sentence-transformers/all-MiniLM-L6-v2` due to API quota (429). Will
  re-evaluate after CI and billing.

- 2025-08-14: Authored initial memory files with AI inline completions (Copilot)
  for speed; content treated as drafts pending CI schema validation (Step D).

- 2025-08-14: Enabled VS Code AI inline completions (Copilot) for faster
  authoring; added YAML schema hints to keep structure enforceable prior to CI.

- 2025-08-14: CI online as “validate” with path allow-list, YAML schema checks,
  referential integrity (tasks → goals/beliefs), and markdownlint (decisions
  only). Main is protected with PR-only, required status checks, and linear
  history; approvals left off temporarily for solo flow.

- 2025-08-14: Editor schema mapping in `.vscode/settings.json` confirmed; VS
  Code flags invalid YAML keys before CI.

- 2025-08-14: Markdown lint temporarily limited to `memory/decisions.md`; plan
  to expand to `docs/**/*.md` after cleanup (D+1).

- 2025-08-14: Proposal schema validation deferred; to add
  `automation/schemas/proposal.schema.json` and CI check for `/proposals/**`
  (D+1).

- 2025-08-14: Branch protection updated — PR-only, **Require status checks** =
  `validate`, **Require linear history**; approvals left off for solo flow.

- 2025-08-14: Proposal schema added at
  `automation/schemas/proposal.schema.json`; CI validates
  `/proposals/**/*.yaml`.

- 2025-08-14: Markdownlint expanded to `docs/**/*.md` using relaxed
  `.markdownlint.json` at repo root.
