# Way Forward — Post-Bootstrap (Human-in-the-Loop)

Mode: recommendations-only; all changes via PRs you approve.  
Preconditions: Bootstrap A–G complete (including smoke test); proposal-only
mode; branch protection on.

---

### Phase 0 — Namespace Foundations (completed in Bootstrap)

**Goal:** Establish clean domain separation without changing behavior.  
**Why:** Prevents future migration pain as business content appears; keeps
OS/system memory distinct from business artifacts.

**Actions:**

- [ ] Create namespaced layout: system namespace + empty business namespace
      skeleton.
- [ ] Move existing docs/memory/automation/proposals/logs/workflows into the
      system namespace.
- [ ] Keep CI/lint/formatter configs at repo root; extend globs to cover both
      namespaces.
- [ ] (Optional) Add and then archive/delete a brief migration report after
      merge.

**Gate:**

- [ ] CI green; IDs preserved; no content churn beyond moves and path/glob
      updates.

---

### Phase 1 — Self-Audit & Opinionated Schema Redesign

**Goal:** Assess and improve structure, IDs, links, and schemas before further
ingestion.  
**Why:** Lock the contract so normalization is one-pass and queryable; stop
“extra fields” drift via a clear core+extensions model.

**Actions:**

- [ ] Prepare **Schema Options Pack** (2–3 variants) with pros/cons, migration
      steps, and example diffs.
- [ ] Prepare **Repo Fix Pack** (folder/naming normalization, link repair plan,
      ID format enforcement).
- [ ] Add **constraint**: core schemas use `additionalProperties: false`; any
      extras live under a typed `extensions` object and are validated by CI.
- [ ] Document referential integrity checks (IDs resolve; no cross-namespace
      leaks unless allowed).

**Gate:**

- [ ] Choose one schema option → merge → proceed to Phase 3 only after this
      merges.

---

### Phase 2 — Solvia Bloom Bootstrapping

**Goal:** Stand up the business domain as a separate “brain” with parallel
structure.  
**Why:** Avoid mixing system memory with business artifacts; enable independent
metrics/contradictions and safer scaling.

**Actions:**

- [ ] Seed business memory: `identity.yaml`, `goals.yaml`, `beliefs.yaml`,
      `tasks.yaml`, `contradictions.yaml`, `metrics.yaml`, `decisions.md`.
- [ ] Mirror schemas and IDs from system namespace; confirm CI validates both
      domains.
- [ ] Activate only when first business content is ready; inherit root configs
      by default.

**Gate:**

- [ ] PRs merged; CI green across both domains.

---

### Phase 3 — Legacy Dump & Selective Incorporation

**Goal:** Ingest old `.md/.txt` content, structure it, deduplicate, and
selectively merge.  
**Why:** Convert unstructured history into governed, searchable memory without
polluting live namespaces; one-way staging prevents drift.

**Actions:**

- [ ] Create temporary staging paths for originals, structured chunks, and
      review packs.
- [ ] Chunk and tag with: `source_path`, `source_hash`, `source_modified`,
      `detected_domains`, `topics`, `summary`, `overlap_groups`.
- [ ] Track contradictions separately in a **staging ledger** (do not touch live
      `contradictions.yaml`).
- [ ] Produce **recommendation PRs** targeting exact repo paths (or defer
      explicitly).

**Gate:**

- [ ] Approve/reject recommendations; after merges, delete staging dirs,
      re-index, tighten allow-lists.

---

### Phase 4 — Current State vs Master Plan

**Goal:** Compare current state vs master plan and update where reality
differs.  
**Why:** Reflect truth after ingestion; update the master plan once the repo
mirrors reality.

**Actions:**

- [ ] Generate `docs/current_state.md`: inventory, schemas, CI globs, indexer
      config, goals/metrics snapshot (both domains).
- [ ] Generate `docs/delta_vs_master.md`: diffs vs master plan; propose plan
      updates accordingly.
- [ ] Submit PRs to update `master_plan.md` (and `bootstrap.md` if needed).

**Gate:**

- [ ] Approve changes before merge.

---

### Phase 5 — Interfaces & Mirrors

**Goal:** Create human-friendly read-only views.  
**Why:** Reduce cognitive load and review friction without creating new writable
surfaces.

**Actions:**

- [ ] Set up Notion/Obsidian read-only mirrors for both namespaces.
- [ ] (Optional) Dashboard for open PRs, goals/tasks, and audit summaries.
- [ ] Maintain living docs: `docs/capabilities_registry.md` (system) and a
      business-domain triggers registry.

**Gate:**

- [ ] Confirm mirrors are read-only; edits blocked or overwritten on next sync.

---

### Phase 6 — Business Data Surfaces (Assets/CRM/Campaigns)

**Goal:** Register assets/CRM/campaign metadata in governed YAML; keep
binaries/PII external.  
**Why:** Observability and queryability without sensitive data in the repo.

**Actions:**

- [ ] Add `assets_meta/assets.yaml` entries (metadata only; binaries in
      Drive/SharePoint/Dropbox/DAM).
- [ ] Add `ops/crm_summary.yaml` (aggregates only; no PII); outline read-only
      connector plan.
- [ ] Add `gtm/campaigns.yaml` (briefs/status/links); defer ad-platform
      connectors until justified.

**Gate:**

- [ ] PRs merged; confirm no sensitive data enters the repo.

---

### Phase 7 — Connectors & Project Tools (capability-driven, proposal-only)

**Goal:** Add connectors only when justified.  
**Why:** Prevent tool sprawl; capabilities follow demonstrated need, not
wishlists.

**Actions:**

- [ ] Propose connector only after repeated manual friction (e.g., Drive
      metadata sync, PR triage helpers).
- [ ] Keep all connectors proposal-only; no direct writes to live memory/docs.

**Gate:**

- [ ] Each connector PR includes rationale, scope, and rollback; CI covers paths
      it may touch.

---

### Phase 8 — Orchestration & Scaling (optional, later)

**Goal:** Introduce advanced orchestration only when needed.  
**Why:** Adopt LangChain/LangGraph/LlamaIndex/Beam only when
coordination/state/observability needs exceed n8n + MCP; CI remains the
gatekeeper.

**Actions:**

- [ ] Define concrete limits you’ve hit (multi-agent routing, long-running
      state, richer observability).
- [ ] Prototype in a branch; ensure proposal-only writes.

**Gate:**

- [ ] Observed need documented; orchestration merges without bypassing CI.

---

### Phase 9 — Ongoing Self-Audit & Metrics (per domain)

**Goal:** Sustain hygiene and momentum.  
**Why:** Catch drift early; maintain symmetry and data quality as scope grows.

**Actions:**

- [ ] Weekly **Review Pack**: symmetry checks, broken links, schema drift,
      duplicate/stale goals/tasks.
- [ ] Track metrics per domain: proposal merge rate, contradictions closed, %
      goals progressing, proposal→merge lead time.

**Gate:**

- [ ] Review Pack posted; metrics updated; corrective PRs opened where needed.

---

### Governance — Non-Negotiable

- GitHub repo is single source of truth.
- Writes only via proposals and PRs; branch protection + CI required.
- Connectors and agents never write directly to live memory or docs.
- Indexer excludes staging and archive paths by default.
- Repo-root configs (CI/lint/formatter) govern all namespaces via globs; no
  per-namespace duplicates by default.
- Namespace-specific config overrides require an automation PR with rationale;
  otherwise inherit root.
