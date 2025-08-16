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

- 2025-08-14: Corrected schema folder naming from `shcemas` → `schemas`; CI
  schema validation now passes.

- 2025-08-14: Added Prettier config + `.prettierignore`; optional autoformatting
  available pre-commit, strict enforcement deferred.

- 2025-08-14: CI uses GitHub-hosted runners with Node 20 (pinned via actions).
  Local Node is optional unless running validators/Prettier locally or
  installing n8n. Prereq updated accordingly.

- 2025-08-16: Adopted namespaced layout — `/solvia/**` live; `/solvia_bloom/**`
  skeleton (empty).

- 2025-08-16: Completed Bootstrap F.5 (Namespace Migration) **before** Smoke
  Test (G); IDs preserved; no content churn.

- 2025-08-16: Root configs (CI/lint/formatter) remain canonical; globs now cover
  both `solvia/**` and `solvia_bloom/**`; no per-namespace copies by default.

- 2025-08-16: CI/indexer allow-lists updated: include `solvia/**`,
  `solvia_bloom/**`; exclude `**/staging/**`, `**/archive/**`.

- 2025-08-16: First automation proposals must target namespaced paths;
  proposal-only mode remains; no direct writes to `main`.

- 2025-08-16: Schema redesign (Phase 1) is a prerequisite for legacy ingestion
  (Phase 3); adopt **core + extensions** approach (core sets
  `additionalProperties: false`; optional typed `extensions` object).

- 2025-08-16: “Current state vs master plan” (Phase 4) scheduled **after**
  legacy ingestion (Phase 3) to reflect reality; no early delta pass.

- 2025-08-16: Mirrors continue read-only; Bloom inherits root configs until a
  justified override is proposed via PR.

- 2025-08-16: Any migration report (`solvia/docs/migration_report.md`) is
  ephemeral documentation; may be deleted/archived post-merge.

- 2025-08-16: Follow-Up Plan drafted as `docs/way_forward_post_bootstrap.md`
  (root). Will move to `/solvia/docs/` during Namespace Migration (F.5).
