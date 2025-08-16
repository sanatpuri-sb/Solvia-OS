# 🚀 Solvia Bootstrap Plan (Day 1–2) — From Zero to Claude MCP Handoff

> Goal: Minimize manual window. In ~1–2 days, bring up **persistent memory**,
> **MCP runtime**, **vector search**, **automation (n8n)**, **CI guardrails**,
> then run one smoke test and hand off execution to Claude MCP.

---

## ✅ Prerequisites (once-only)

- [x] GitHub account with a new repo (created `Solvia-OS`)
- [x] macOS with admin rights
- [ ] Claude Desktop installed (for **MCP** runtime)
- [ ] GPT-4o API key (Day 1; assists reasoning/multimodal alongside Claude MCP)
- [ ] Node 20+ (only if you’ll run tools locally or install n8n; CI runners
      already have Node 20)
- [x] Python 3.13.6 installed
- [x] Docker Desktop (running n8n container)
- [x] Git configured locally (GitHub Desktop working; can push)
- [x] VS Code installed and can edit repo
- [ ] Backup location set (2nd remote, iCloud/Time Machine, or external drive)

**Note:** CI runs on GitHub-hosted runners with Node 20 preinstalled and pinned
in the workflow. You only need local Node if you want to run
validation/formatting locally or to install/run n8n (Step E).

> **Prereq Deltas (2025-08-13):**
>
> - Using **Public** repo to enable branch protection on Free plan (org-only
>   restrictions not available on personal accounts).
> - **GPT-4o API key** not set yet → Step C uses **local embeddings** as a
>   temporary workaround.
> - **Node 20+** not installed yet → required before Step D (CI).
> - **Claude Desktop** not installed yet → required before Step F (MCP runtime).
> - Authoring aid: VS Code **AI inline completions** (e.g., GitHub Copilot) is
>   enabled. Treat suggestions as drafts; structure enforced by CI in Step D.
> - Prettier config and `.prettierignore` added to repo; formatting run locally
>   before commit. This is optional in CI but supported.
> - n8n runs in Docker with `N8N_ENCRYPTION_KEY`, `N8N_SECURE_COOKIE=false`,
>   `GENERIC_TIMEZONE=Asia/Kolkata`. Access via http://localhost:5678.

---

## 1) Create Canonical Repo Structure (10 min)

Create folders and seed files. **GitHub is the only writable source of truth.**
Others mirror read-only.

/docs/ master_plan.md bootstrap.md /memory/ identity.yaml goals.yaml
beliefs.yaml tasks.yaml contradictions.yaml decisions.md metrics.yaml
/proposals/ /logs/ /automation/ /workflows Note: `/automation` and `/workflows`
are operational folders for automation configs and workflow exports, not part of
core memory.

**Go/No-Go A**

- [x] All folders exist and render on GitHub
- [x] Day-1 memory files exist (minimal)

---

## 2) Seed Day-1 Memory (20–30 min)

Populate minimal, valid entries:

- `identity.yaml`: owner, values, tone, canonical_store=github
- `goals.yaml`: Q/M/W with 1 top goal ID (e.g., `G-2025Q3-OPS`)
- `beliefs.yaml`: 2–3 beliefs with IDs (`B-0001…`)
- `tasks.yaml`: at least 1 task linking to a goal/belief (use IDs like `T-0001`)
- `contradictions.yaml`: start empty or add one known risk
- `decisions.md`: a short entry stating GitHub is canonical
- `metrics.yaml`: keys present, values can be null

**Go/No-Go B**

- [x] Day-1 files commit cleanly; IDs (`G-…`, `B-…`, `T-…`, `C-…`) are present
      where relevant
- [ ] No schema/format errors (we’ll enforce in §4)

---

## 3) Bring Up Vector Memory (Chroma) (30–45 min)

Purpose: eliminate session amnesia immediately.

- [x] Start Chroma (local)
- [x] Index `/memory/**` + `/docs/master_plan.md`
- [x] Save an indexing script/config under `/automation/` (`index_repo.py`,
      `index_config.md`)
- [x] Confirm policy note: indexing is manual for now; incremental re-embedding
      can be added later
- [x] `.gitignore` excludes the local vector DB at `automation/chroma/`

> **C Delta (2025-08-13):** Due to OpenAI quota, embeddings switched to
> **local** > `sentence-transformers/all-MiniLM-L6-v2`.  
> `index_repo.py` auto-falls back to local if `OPENAI_API_KEY` is missing or
> `USE_LOCAL_EMBEDDINGS=1`.  
> We will revisit OpenAI embeddings once billing is enabled.

**Go/No-Go C**

- [x] Ask your assistant a question requiring both `goals.yaml` and
      `master_plan.md` _(satisfied via programmatic retrieval: Chroma shows
      chunks from both)_
- [x] Verify answer cites both (files/IDs). No manual paste used.

---

## 4) Fail-Closed Governance (CI) (30 min)

Purpose: prevent phantom files & drift.

**Editor validation (schema hints)**

- [x] Add `.vscode/settings.json` in repo root to map YAML files → JSON Schemas
- [x] Confirm VS Code shows red squiggles on bad keys/IDs

> **D Delta (2025-08-13):** While CI is not yet configured, branch protection is
> **PR-only with linear history**;  
> “Require approvals” and “Require status checks” are **temporarily disabled**
> to allow solo merges.  
> They must be **re-enabled** immediately after CI is added in this step.

- [x] Add a GitHub Action workflow file at `.github/workflows/ci.yml` that
      enforces:
- YAML lint + JSON-schema checks (at least structure & required keys); include
  `decisions.md` Markdown lint for broken headings/links
- Path allow-list strictly enforced (deny writes outside `/memory`, `/docs`,
  `/proposals`, `/logs`, `/automation`)
- Referential integrity (e.g., `tasks.links.beliefs` exist)
- ID format checks for `G-`, `B-`, `T-`, `C-` where applicable
- [x] Add `.vscode/settings.json` schema mappings for YAML files
- [x] Verify VS Code validation works (introduce a fake key in
      `memory/tasks.yaml` → red squiggle appears)
- [x] Mark invalid PRs as **fail** (no merge)
- [x] Main branch must be protected in GitHub settings; require CI pass before
      merge
- [x] Branch protection → Required status checks: add **`validate`** (confirmed
      as exact name after first successful CI run)
- [x] Re-enable **Require status checks to pass before merging** (after CI is
      green on `main`)
- [ ] Re-enable **Require approvals (1)** (solo-friendly only when a second
      account can review)

_(If you don’t have scripts yet, stub the job to at least lint YAML + deny
unknown paths; you can harden later.)_

**Go/No-Go D**

- [x] Intentionally break a key in `tasks.yaml` on a PR → CI blocks merge
- [x] Local editor shows schema errors (bad key in `tasks.yaml` squiggled)
      before CI runs

### 4.1 D+1 Hardening Actions (to schedule)

- [x] Expand markdownlint scope back to `docs/**/*.md` with config in
      `.markdownlint.json` at repo root
- [x] Corrected schema folder naming from `shcemas` → `schemas`; CI schema
      validation now passes
- [x] Add proposal schema at `automation/schemas/proposal.schema.json` and
      validate `/proposals/**/*.yaml` in CI (schema in `automation/schemas/`,
      proposals under `proposals/`)
- [x] Add a CI job to auto-format Markdown (Prettier) before enforcing strict
      markdownlint ⟵ (config and `.prettierignore` added; enforcement deferred
      until after n8n setup)
- [x] Add status check aliasing (if job name changes, update Branch Protection
      to match current check name)
- [ ] Enable **Require approvals (1)** after a second reviewer (or Org) is
      available
- [x] Repo-wide ignore for macOS junk: add to `.gitignore` .DS_Store
      \*\*/.DS_Store

---

## 5) Configure Automation Engine (n8n) (45–60 min)

Purpose: close loops without you as glue.

- [x] Run n8n (Docker)
  - Container name: `n8n_solvia`
  - Port: `5678` (open in browser at `http://localhost:5678`)
  - Volume: host `~/<your-path>/solvia_os/.n8n` → container `/home/node/.n8n`
  - Env vars:
    - `N8N_ENCRYPTION_KEY=<32+ char random>`
    - `N8N_SECURE_COOKIE=false` (local HTTP)
    - `GENERIC_TIMEZONE=Asia/Kolkata`
- [x] Store secrets in n8n credentials (never in repo)
  - GitHub (predefined): PAT with `repo` (contents + pull_requests)
- [x] Enforce in workflows: write only to `/proposals/**` (open PR); never
      commit directly to `main`
- [x] Confirm main-branch protection in GitHub blocks direct pushes and requires
      CI pass
- [x] Create workflow: **Proposals Cron (daily)**
- [ ] Create workflow: **Mirror Sync (optional)** (push read-only views to
      Notion/Obsidian/Asana)
- [x] Export workflows to repo (no credentials) under `/workflows/` (e.g.,
      `workflows/proposals_pr.json`)

### Workflow: Proposals Cron (daily)

Runs at 09:10 IST. Manual run validated branch → file → PR → CI ✅.

1. Cron → daily @ 09:10 (Asia/Kolkata)

2. Set fields (Manual mapping)
   - `owner` = `<your-github-username>`
   - `repo` = `solvia_os`
   - `branch`
     ```text
     {{ "automation/proposal-" + $now.toISO().replace(/[:.]/g,"-") }}
     ```
   - `filePath`
     ```text
     {{ "proposals/proposal-" + $now.toISO().replace(/[:.]/g,"-") + ".yaml" }}
     ```
   - `commitMsg` = `chore(proposals): seed tiny proposal`
   - `prTitle` = `chore: add tiny proposal via n8n`
   - `prBody` = `Automated proposal created by n8n.`
   - `proposalContent` (schema-minimal; passes CI)
     ```yaml
     title: Automated proposal seed
     rationale: Verify n8n → PR → CI path end-to-end.
     linked_metrics: []
     risk: low
     changes:
       - file: docs/placeholder.md
         type: add
         preview: Add a placeholder doc via proposal seed
     rollback: revert this PR
     acceptance_criteria:
       - CI passes proposal schema
     ```

3. Validate path (Code) — fail-closed writer

   ```js
   const p = $json.filePath || "";
   const allowed = ["proposals/", "solvia/proposals/", "solvia_bloom/proposals/"];
   if (!allowed.some(prefix => p.startsWith(prefix))) {
     throw new Error(`Refusing to write outside proposals dirs (got: ${p})`);
   }
   return [$json];
   ```

4. Create base64 (Code) — single encode

   ```js
   const content = String($json.proposalContent || "");
   return [{ ...$json, contentB64: Buffer.from(content, "utf8").toString("base64") }];
   ```

5. Get main SHA (HTTP GET)  
   `https://api.github.com/repos/{{$json["owner"]}}/{{$json["repo"]}}/git/ref/heads/main`

6. Create branch (HTTP POST) → `.../git/refs`  
   Body (JSON):
   - `ref = "refs/heads/{{$json["branch"]}}"`
   - `sha = {{$json["object"]["sha"]}}`

7. Create file (HTTP PUT) → `.../contents/{{$json["filePath"]}}`  
   Body (JSON):
   - `message = {{$json["commitMsg"]}}`
   - `content = {{$json["contentB64"]}}`
   - `branch = {{$json["branch"]}}`

8. Open PR (HTTP POST) → `.../pulls`  
   Body (JSON):
   - `title = {{$json["prTitle"]}}`
   - `body = {{$json["prBody"]}}`
   - `head = {{$json["branch"]}}`
   - `base = main`

Note (reserved for §6.5): a future namespace toggle moves proposals into
`solvia/**` or `solvia_bloom/**`. At that time: set `ns`, update `filePath`,
tighten Validate-path, and update CI allow-lists.

**Go/No-Go E**

- [x] Manual trigger creates branch + file + PR
- [x] CI passes proposal schema (no `.DS_Store` noise)
- [x] Cron enabled @ 09:10 IST

---

## 6) Configure Claude MCP Runtime (30–45 min)

Purpose: give the model direct file/tool access without copy-paste.

- [ ] Enable MCP Filesystem scoped to your repo folder
- [ ] Verify Claude Desktop is configured to use the same repo folder as MCP
      root; test read/write permissions on allowed paths
- [ ] Allowed paths: read/write `/memory`, `/docs`, `/proposals`; append-only
      `/logs`
- [ ] Policy: Claude MCP writes to `/proposals` (no direct main-branch writes);
      GPT-4o may assist reasoning but has no file access
- [ ] (Optional) Expose a small HTTP tool for **retrieve_context** → returns a
      context pack from vector store

**Go/No-Go F**

- [ ] In Claude: “Open `identity.yaml` → prepare a proposal to add a minor key
      (e.g., `docs.master_plan=/docs/master_plan.md`)”
- [ ] Confirm a PR lands; CI passes
- [ ] In the same Claude session, call `retrieve_context` (or read embeddings
      via tool) and then open a PR; both must succeed

- ## 6.5) Namespace Migration (lightweight, pre-smoke)

Note: n8n already has a namespace toggle (variable `ns`, currently empty). In
F.5:

- Set `ns` to "solvia" or "solvia_bloom".
- Change `filePath` to
  `{{ ns + "/proposals/proposal-" + $now.toISO().replace(/[:.]/g,"-") + ".yaml" }}`
- Tighten the Validate path Code to allow only `${ns}/proposals/`.
- Update CI allow-lists (add `${ns}/**`, remove root `proposals/**`).

- Purpose: establish clean namespaces before any automation proposals land.

- Rules (temporary for this step only):
- No content churn. Only create directories and update paths/globs.
- No Bloom content yet; create an empty skeleton only.
- Keep all configs at repo root; extend globs to include both namespaces.

- Actions:
- [ ] Create `/solvia/**` and an empty `/solvia_bloom/**` skeleton:
-       `/docs`, `/memory`, `/proposals`, `/logs`, `/workflows`, `/ops`, `/finance`, `/gtm`, `/assets_meta`
- [ ] `git mv` existing `/docs/**`, `/memory/**`, `/automation/**`,
      `/proposals/**`, `/logs/**`, `/workflows/**`
-       into `/solvia/**` (one PR; no content edits)
- [ ] Update CI/lint/indexer allow-lists and globs to cover both namespaces:
-       - `.github/workflows/ci.yml` (path allow-lists, schema targets)
-       - markdownlint / prettier targets
-       - indexer allow-list (include `solvia/**`, `solvia_bloom/**`; exclude `**/staging/**`, `**/archive/**`)
- [ ] (Optional) Add a short `solvia/docs/migration_report.md` summarizing
      moves; delete or archive after merge.

- **Go/No-Go F.5**
- - [ ] New layout renders on GitHub
- - [ ] CI green with updated globs (no broken links/IDs)
- - [ ] No non-migration content changes in the PR

---

## 7) First End-to-End Smoke (10–15 min)

Run this **in one Claude session, after F.5 migration** (namespaced paths):

1. **Read**: load `/solvia/docs/master_plan.md` + `/solvia/memory/goals.yaml`
2. **Retrieve**: fetch related beliefs for the top goal and cite file paths/IDs
3. **Propose**: add or link one task in `tasks.yaml`; open PR to `/proposals`
4. **Validate**: ensure CI passes and links resolve
5. **Reflect**: append a short decision entry in `decisions.md` referencing the
   PR

**Go/No-Go G**

- [ ] All five steps succeed without manual paste

---

## 8) Handoff to Claude MCP (final switch)

When A–G are green:

- Confirm F.5 Namespace Migration completed; automation proposals now target
  `solvia/**` or `solvia_bloom/**` (n8n `ns` toggle flipped; CI allow-lists
  updated).
- Next: follow **way_forward_post_bootstrap.md** for post-bootstrap phases
  (human-in-the-loop).
- **Day-to-day lives in Claude MCP** (Operator).
- Keep this chat (SolviaLite) only for **architecture debates** or major plan
  revisions.
- Use n8n for cron jobs & deterministic workflows; keep mirrors read-only.
- Ensure `/docs/master_plan.md` and `/docs/bootstrap.md` are up to date in the
  repo before switching.
- Ensure `/workflows` and `/automation/index_config.md` are committed

---

## 🔒 Guardrails that keep you safe

- GitHub is the **single writable source**; mirrors are **read-only**
- CI blocks invalid structure/paths/links
- CI guardrails are defined in `.github/workflows/ci.yml` and block invalid
  proposals before merge
- PRs only from `/proposals`; no direct edits to main
- Keep **IDs stable** (`G-…`, `B-…`, `T-…`, `C-…`) to avoid link rot
- MCP runtime must never be allowed to bypass proposal workflow — disable direct
  main-branch writes at the GitHub repo level
- Automation and MCP must operate PR-only; direct edits to main are prohibited
  and blocked by branch protection
- Maintain at least one local or remote backup clone for repo recovery; if the
  main repo is corrupted, restore from backup and re-run CI

---

## 🧯 Rollback (if something breaks)

- Revert the PR that caused the failure (GitHub “Revert”)
- If vector retrieval corrupts, re-index from clean repo state
- If n8n fails, disable the affected workflow; re-enable after fix
- If MCP writes to the wrong path, reduce its allowed paths and retry

---

## 📌 Scope boundaries (to avoid overbuilding)

**Not required before handoff:**

- LangChain/CrewAI (save for Week 6+)
- Custom Python ETL (unless MCP+n8n cannot cover)
- Two-way Notion/Asana sync
- A custom UI/control panel

---

## 🧪 Quick Checklists (copy into issues)

**Issue: “Bootstrap A–G Go/No-Go”**

- [x] A Repo structure ✔
- [x] B Day-1 memory seeded ✔
- [x] C Vector retrieval ✔ (local embeddings)
- [x] D CI fail-closed ✔
- [x] E n8n proposal PR ✔
- [ ] F MCP proposal PR ✔
- [ ] F.5 Namespace migration (dirs + globs updated) ✔
- [ ] G Smoke test (read→retrieve→propose→validate→reflect) ✔

**Issue: “Mirrors Read-Only Confirmed”**

- [ ] Notion/Obsidian/Asana pull only
- [ ] Edits blocked or overwritten on next sync

---

## 📎 Notes

- `decisions.md` is Markdown for narrative clarity; all other core memory is
  YAML for strict structure.
- Keep all schema/doc choices **inside the repo**, so any assistant (Claude/GPT)
  can pick up instantly with zero paste.
- VS Code AI inline completions (e.g., GitHub Copilot) are enabled for YAML
  authoring; structure enforced via schema hints and CI.
  - File/folder naming errors (e.g., `shcemas` typo) can break CI; automation
    will later include a path consistency check.
