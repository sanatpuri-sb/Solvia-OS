# 🚀 Solvia Bootstrap Plan (Day 1–2) — From Zero to Claude MCP Handoff

> Goal: Minimize manual window. In ~1–2 days, bring up **persistent memory**, **MCP runtime**, **vector search**, **automation (n8n)**, **CI guardrails**, then run one smoke test and hand off execution to Claude MCP.

---

## ✅ Prerequisites (once-only)
- [x] GitHub account with a new repo (created `Solvia-Os`)
- [x] macOS with admin rights
- [ ] Claude Desktop installed (for **MCP** runtime)
- [ ] GPT-4o API key (Day 1; assists reasoning/multimodal alongside Claude MCP)
- [ ] Node 20+ (for CI scripts)
- [ ] Python 3.10+ (for embeddings if needed)
- [ ] Docker Desktop (optional; helpful for n8n/Chroma)
- [x] Git configured locally (GitHub Desktop working; can push)
- [x] VS Code installed and can edit repo
- [ ] Backup location set (2nd remote, iCloud/Time Machine, or external drive)

---

## 1) Create Canonical Repo Structure (10 min)
Create folders and seed files. **GitHub is the only writable source of truth.** Others mirror read-only.

/docs/
	master_plan.md
	bootstrap.md
/memory/
	identity.yaml
	goals.yaml
	beliefs.yaml
	tasks.yaml
	contradictions.yaml
	decisions.md
	metrics.yaml
/proposals/
/logs/
/automation/
/workflows
Note: `/automation` and `/workflows` are operational folders for automation configs and workflow exports, not part of core memory.

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
- [x] Day-1 files commit cleanly; IDs (`G-…`, `B-…`, `T-…`, `C-…`) are present where relevant
- [ ] No schema/format errors (we’ll enforce in §4)

---

## 3) Bring Up Vector Memory (Chroma/FAISS) (30–45 min)
Purpose: eliminate session amnesia immediately.

- [ ] Start Chroma (local or Docker) **or** choose FAISS (local library)
- [ ] Index `/memory/**` + `/docs/master_plan.md`
- [ ] Save an indexing script/config under `/automation/` (name it, e.g., `index_config.md` with simple instructions) and confirm incremental updates on new commits (don’t re-embed the whole repo each time)
- [ ] Define minimal chunking & metadata: `file`, `section`, `id`

**Go/No-Go C**
- [ ] Ask your assistant (any) a question requiring both `goals.yaml` and `master_plan.md`
- [ ] Verify answer cites both (files/IDs). No manual paste used.

---

## 4) Fail-Closed Governance (CI) (30 min)
Purpose: prevent phantom files & drift.

- [ ] Add a GitHub Action workflow file at `.github/workflows/ci.yml` that enforces:
- YAML lint + JSON-schema checks (at least structure & required keys); include `decisions.md` Markdown lint for broken headings/links
- Path allow-list strictly enforced (deny writes outside `/memory`, `/docs`, `/proposals`, `/logs`, `/automation`)
- Referential integrity (e.g., `tasks.links.beliefs` exist)
- ID format checks for `G-`, `B-`, `T-`, `C-` where applicable
- [ ] Mark invalid PRs as **fail** (no merge)
- [ ] Main branch must be protected in GitHub settings; require CI pass before merge

*(If you don’t have scripts yet, stub the job to at least lint YAML + deny unknown paths; you can harden later.)*

**Go/No-Go D**
- [ ] Intentionally break a key in `tasks.yaml` on a PR → CI blocks merge

---

## 5) Configure Automation Engine (n8n) (45–60 min)
Purpose: close loops without you as glue.

- [ ] Run n8n (Docker or local)
- [ ] Create 2 simple workflows:
1) **Proposals Cron (daily)**: read repo → write a tiny, valid proposal to `/proposals` → open a PR
2) **Mirror Sync (optional)**: push read-only views (tasks/beliefs/goals) to Notion/Obsidian/Asana
- [ ] Store secrets in n8n credentials (never in repo)
- [ ] Enforce in workflows: write only to `/proposals/` (open PR); never commit directly to main
- [ ] Confirm main-branch protection in GitHub blocks direct pushes and requires CI pass
- [ ] Workflow exports saved under `/workflows`

**Go/No-Go E**
- [ ] Manually trigger Proposals Cron → a PR appears with a trivial, valid change (e.g., a new tag in `identity.yaml`)

---

## 6) Configure Claude MCP Runtime (30–45 min)
Purpose: give the model direct file/tool access without copy-paste.

- [ ] Enable MCP Filesystem scoped to your repo folder
- [ ] Verify Claude Desktop is configured to use the same repo folder as MCP root; test read/write permissions on allowed paths
- [ ] Allowed paths: read/write `/memory`, `/docs`, `/proposals`; append-only `/logs`
- [ ] Policy: Claude MCP writes to `/proposals` (no direct main-branch writes); GPT-4o may assist reasoning but has no file access
- [ ] (Optional) Expose a small HTTP tool for **retrieve_context** → returns a context pack from vector store

**Go/No-Go F**
- [ ] In Claude: “Open `identity.yaml` → prepare a proposal to add a minor key (e.g., `docs.master_plan=/docs/master_plan.md`)”  
- [ ] Confirm a PR lands; CI passes
- [ ] In the same Claude session, call `retrieve_context` (or read embeddings via tool) and then open a PR; both must succeed

---

## 7) First End-to-End Smoke (10–15 min)
Run this **in one Claude session**:

1) **Read**: load `master_plan.md` + `goals.yaml`  
2) **Retrieve**: fetch related beliefs for the top goal and cite file paths/IDs  
3) **Propose**: add or link one task in `tasks.yaml`; open PR to `/proposals`  
4) **Validate**: ensure CI passes and links resolve  
5) **Reflect**: append a short decision entry in `decisions.md` referencing the PR

**Go/No-Go G**
- [ ] All five steps succeed without manual paste

---

## 8) Handoff to Claude MCP (final switch)
When A–G are green:

- **Day-to-day lives in Claude MCP** (Operator).  
- Keep this chat (SolviaLite) only for **architecture debates** or major plan revisions.
- Use n8n for cron jobs & deterministic workflows; keep mirrors read-only.
- Ensure `/docs/master_plan.md` and `/docs/bootstrap.md` are up to date in the repo before switching.
- Ensure `/workflows` and `/automation/index_config.md` are committed

---

## 🔒 Guardrails that keep you safe
- GitHub is the **single writable source**; mirrors are **read-only**
- CI blocks invalid structure/paths/links
- CI guardrails are defined in `.github/workflows/ci.yml` and block invalid proposals before merge
- PRs only from `/proposals`; no direct edits to main
- Keep **IDs stable** (`G-…`, `B-…`, `T-…`, `C-…`) to avoid link rot
- MCP runtime must never be allowed to bypass proposal workflow — disable direct main-branch writes at the GitHub repo level
- Automation and MCP must operate PR-only; direct edits to main are prohibited and blocked by branch protection
- Maintain at least one local or remote backup clone for repo recovery; if the main repo is corrupted, restore from backup and re-run CI

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
- [ ] C Vector retrieval ✔
- [ ] D CI fail-closed ✔
- [ ] E n8n PR appears ✔
- [ ] F MCP proposal PR ✔
- [ ] G Smoke test (read→retrieve→propose→validate→reflect) ✔

**Issue: “Mirrors Read-Only Confirmed”**
- [ ] Notion/Obsidian/Asana pull only
- [ ] Edits blocked or overwritten on next sync

---

## 📎 Notes
- `decisions.md` is Markdown for narrative clarity; all other core memory is YAML for strict structure.  
- Keep all schema/doc choices **inside the repo**, so any assistant (Claude/GPT) can pick up instantly with zero paste.