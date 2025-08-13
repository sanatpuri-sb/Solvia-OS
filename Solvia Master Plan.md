# 🧠 Your AI Cofounder – Finalized Master Blueprint

## 🧭 Vision

You are building a **self-learning, execution-capable, AI-powered business system** — designed to operate as your high-performance solo founder infrastructure.

This is not a chatbot, and not just a productivity assistant — it is a **persistent, evolving operating system for your company**, capable of reasoning, executing, and improving itself over time.

**Solvia Will Be (Can Evolve):**

| Role                   | Description                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------- |
| 🧠 Cofounder           | Helps define strategy, evolve vision, challenge thinking, set direction                 |
| 📈 COO                 | Executes internal tasks, sends updates/reminders, marks completion, coordinates actions |
| 🧑‍💻 Operator         | Automates internal workflows, calls APIs, connects tools, generates reports             |
| 📚 Coach & Advisor     | Guides you on business, tools, productivity, legal, finances, marketing                 |
| 💼 Business Runner     | Helps run your business from launch to scale — not just track it                        |
| 🧰 Tool Navigator      | Integrates with tools (Excel, Notion, Figma, APIs) and helps you use them               |
| 🔁 Self-Evolving Agent | Improves itself + your systems continuously via reasoning + reflection                  |

⚠️ **Solvia is no longer just an assistant — this is your AI Startup System.**

---

## 🧩 Operating Philosophy (Can Evolve)

Principles that govern every layer:

| Principle                    | What It Means                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| 🧬 Everything Evolves        | Beliefs, goals, tasks, and architecture adapt — nothing is fixed                            |
| ♻️ Execute + Track           | It performs actions, closes loops, marks work as done                                       |
| 🧘 Standardized Everything   | All outputs follow unified structure, schema, tone                                          |
| 📚 Live Docs, No Redundancy  | Single source of truth — no duplicate or orphaned files                                     |
| ⚙️ Symmetry in All Systems   | From YAML schemas to UI — clean, balanced, parseable                                        |
| 💼 Business-First Design     | Core purpose is to help you build and run a company                                         |
| 🤝 Internal Tool Integration | Can operate APIs, scripts, and apps you control                                             |
| 🧠 Self-Improving            | Learns from actions, logs contradictions, updates memory automatically                      |
| 🧷 Fail-Closed Governance    | Invalid changes are rejected automatically via schema + CI; only valid proposals are merged |

---

## 🧱 Full Stack (Can Evolve)

All tools and formats are **starting points** — Solvia can replace or upgrade them as it matures.

| Layer                   | Tool(s) (Current)                        | Purpose                                                                                                                              |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **AI Model**            | GPT-4o + Claude 3.5 (MCP) — Day 1        | Reasoning, content, action; GPT for high-speed reasoning and multimodal; Claude provides MCP runtime and file/tool access            |
| **Protocol Bridge**     | MCP (Model Context Protocol) — Day 1     | Direct tool/file access for the assistant (no manual copy-paste)                                                                     |
| **Memory (Structured)** | GitHub repo (.md, .yaml) — Day 1         | Persistent core memory: identity, goals, beliefs, tasks, contradictions, decisions                                                   |
| **Memory (Semantic)**   | ChromaDB or FAISS — Day 1                | Embedding-based search across files                                                                                                  |
| **Automation Engine**   | n8n (preferred) / Zapier / Make — Day 1  | Executes internal actions: API calls, syncs, file updates; connected to Claude MCP and GitHub by Day-1 for PR-only proposal workflow |
| **File & Docs**         | Obsidian (local) + Notion (cloud)        | Operating documents + knowledge base                                                                                                 |
| **UI/Chat Interface**   | Optional (later)                         | Persistent conversation and control panel                                                                                            |
| **Orchestration Layer** | LangChain / CrewAI (Week 6+, if needed)  | Advanced multi-agent coordination, tool routing, workflow logic (n8n handles Day-1 workflows)                                        |
| **Business Tools**      | Excel, Canva, Figma, Google Docs, Notion | Where you work; assistant integrates                                                                                                 |
| **Execution Bots**      | Custom Python scripts (optional, later)  | Only for rare custom ETL/long-running jobs MCP+n8n can’t handle; invoked by MCP/automation when needed                               |

---

## 🛠️ Assistant Responsibilities (Can Evolve)

**Internal-Facing Execution Only** — no direct customer-facing actions until explicitly approved.

**1. You (the person)**
- Track preferences, working style, and personal growth
- Suggest habit, time use, and learning optimizations
- Act as co-pilot for skills development
**2. Your Business (core function)**
- Build your startup from zero to scale
- Create, evolve, and execute:
	- Business model & plan
    - Strategy decks
    - Social media plans
    - Growth experiments
    - Financial projections
    - P&L / budgets
    - Compliance checklists
    - Incorporation plans (country-specific)
**3. Operations + Tasks**
- Mark tasks complete
- Send internal reminders
- Track due dates
- Assign follow-ups to itself
- Report with status summaries  
**4. Knowledge Management**
- Maintain evolving memory files
- Auto-update linked docs (e.g., changing vision updates related plans)
- Summarize past lessons and reflections  
**5. Reflection & Evolution**
- Detect contradictions (beliefs vs. actions)
- Suggest workflow/process improvements
- Propose self-updates  
**6. Internal Tool Help**
- Integrate with and operate:
    - Excel / Sheets  
    - PowerPoint / Pitch.com  
    - Canva / Figma  
    - Notion / Obsidian  
    - Tally / Typeform  
    - Zapier / n8n
- Generate structured content for these tools
- Suggest new tools where relevant  
 ---

## 🗂️ Minimum Viable Memory (Week 1)

Start with only these files so automation can work on them immediately:

| File                  | Purpose                                                           |
| --------------------- | ----------------------------------------------------------------- |
| `identity.yaml`       | Who you are, values, style, tone                                  |
| `goals.yaml`          | Multi-level goals: quarter → month → week                         |
| `beliefs.yaml`        | Core beliefs/assumptions that guide actions                       |
| `tasks.yaml`          | Single source of truth for work (AC, links, deps, evidence)       |
| `contradictions.yaml` | Detected contradictions (beliefs vs. actions) with proposed fixes |
| `decisions.md`        | Major decisions + justifications                                  |
| `metrics.yaml`        | What the OS is measuring to track its improvement                 |

---

## 📜 Proposal Schema (from Day 1)

All automation proposals must follow this format:

```yaml
title: string
rationale: string
linked_metrics: [string]
risk: enum(low|medium|high)
changes:
  - file: string
    type: enum(add|edit|delete)
    preview: string
tests_added: [string]
rollback: string
acceptance_criteria: [string]
```

**Merge Policy:**
- Low risk: auto-merge if checks pass
- Medium risk: human review
- High risk: human review + cooldown

---

## 📏 Self-Build Loop Success Metrics (Can Evolve)

Solvia measures itself against:
- **Proposal merge rate** (safe/unsafe)
- **# contradictions closed** per week
- **% goals with measurable progress**
- **Avg. time from proposal → merge**

---

## 🔄 The Self-Build Loop (Can Evolve)

Automation starts by improving its **own memory and workflows** before touching business deliverables.

1. **Read**: Load all memory + recent logs.
2. **Propose**: Suggest updates or new files into `/proposals`.
3. **Validate**: Schema check + guardrails.
4. **Approve**: Auto-merge low-risk; queue others for manual review.
5. **Apply**: Commit to GitHub, sync to other tools if needed.
6. **Reflect**: Update `decisions.md`, `metrics.yaml`, `contradictions.yaml` via a proposal PR (no direct main writes); commit via MCP or automation engine, not manual edits.
7. **Repeat**: Daily at fixed time via n8n cron job; manual trigger allowed.

>**Note:** The loop is not limited to content and workflow updates — it can also propose toolchain or architecture changes (e.g., replacing ChromaDB with Weaviate, swapping automation engines, or altering memory formats) when beneficial.

---

## 🔐 Governance & Audit

- Canonical store: GitHub `/memory` & `/docs` (only writable source of truth)
- Mirrors: Notion, Obsidian, Asana/Airtable (read-only, synced by automation)
- Fail-closed validation: schema + integrity checks in CI block invalid merges
- Auto-rollback: failed merges or corrupted memory revert automatically; rollback and recovery procedures are in /docs/bootstrap.md; maintain at least one local or remote backup clone for repo recovery
- Branch protection: main branch blocks direct pushes; CI must pass before merge
- Write policy: Claude MCP and automation engine may write only to `/proposals/` via PRs; no direct main-branch edits allowed; CI guardrails are defined in .github/workflows/ci.yml
- Optional auditor: read-only agent or CI review on medium/high-risk proposals

---

## 📆 Build Sequence (Can Evolve)

| Week    | Focus                                                      | Outcome                                                                                                                                                                                                                                                                                                             |
| ------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**   | Toolchain + Core Memory + MCP + Vector + Automation Engine | Python, GitHub, APIs; create identity.yaml, goals.yaml, beliefs.yaml, tasks.yaml, contradictions.yaml, decisions.md, metrics.yaml; bring up MCP bridge; start ChromaDB/FAISS; configure n8n/Zapier/Make; define proposal schema; establish MCP+n8n as the orchestration backbone until LangChain/CrewAI in Week 6+. |
| **2**   | First Automation Pass                                      | n8n reads core memory → generates proposals → validates → commits; daily cron job active                                                                                                                                                                                                                            |
| **3**   | Expand Memory via Automation                               | Automation enriches and refactors beliefs/tasks/contradictions; adds links; improves internal consistency                                                                                                                                                                                                           |
| **4**   | Semantic Memory Layer                                      | Retrieval optimization (chunking/metadata), re-embedding, and deep search quality across the repo                                                                                                                                                                                                                   |
| **5**   | Business Execution Layer                                   | Add business_model.md, finances.md, social_media.md; generate initial drafts                                                                                                                                                                                                                                        |
| **6**   | Orchestration & Skill Agents                               | Add LangChain/CrewAI to coordinate different roles                                                                                                                                                                                                                                                                  |
| Ongoing | Self-Evolution Loop                                        | Detect contradictions, propose improvements, track metrics                                                                                                                                                                                                                                                          |

**Estimated Effort:** ~70–80 hours over 6 weeks → evolves indefinitely.

---

## ✅ Week 1 Setup

We will:
- Back up the repo (GitHub backup or local clone; maintain at least one secondary local or remote backup for recovery) before starting automation
**0. Environment sanity check**
- python --version (>=3.10), node --version (>=20), git --version
- Docker Desktop running (if you’ll use n8n/Chroma containers)
- GitHub auth OK (SSH or PAT) → `git ls-remote` succeeds
- Editor available (VS Code or preferred) to create/commit `.yaml`/`.md`
**1. Install**:
- Python (latest)
- Git + GitHub
- VS Code
- Node.js 20+ (for CI scripts and automation jobs)
- Docker Desktop (optional; required if running n8n or Chroma via container)
- GitHub CLI (optional; speeds up PR and branch operations)
- Notion Developer access
- GPT-4o API key + Claude Desktop (MCP runtime) — both Day 1 (Claude provides MCP tool/file access)
- ChromaDB or FAISS (local)
- n8n (preferred) / Zapier / Make
**2. Create** core structure:
    /memory
    /proposals
    /automation
    /docs
    /logs
	/workflows
Note: `/workflows` stores exported automation engine workflows (e.g., n8n `.json` exports)
**3. Write** initial memory files:
- identity.yaml
- beliefs.yaml
- goals.yaml
- contradictions.yaml
- tasks.yaml
- decisions.md
- metrics.yaml  
**4. Run first test**:
- Model reads memory → creates proposal file → validates → commits to `/proposals`
**5. Save vector index config**
- Add /automation/index_config.md with indexing instructions and confirm incremental updates on new commits (don’t re-embed the whole repo each time)