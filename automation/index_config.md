# Vector Index Configuration

**Index scope:**
- `/memory/**`
- `/docs/master_plan.md`

**Embedding model:** OpenAI `text-embedding-3-small`

**Chunking:**
- Size: ~800 characters
- Overlap: 100 characters

**Metadata fields:**
- `file`
- `chunk_index`
- `hint` (top-level keys for YAML, or section headers for Markdown)

**Storage:**
- Persistent ChromaDB collection `solvia` in `automation/chroma/`

**Indexing policy:**
- Incremental: only re-embed changed files
- Skip unchanged chunks by hash

**Embedding engine policy:**
- Default: OpenAI `text-embedding-3-small` if `OPENAI_API_KEY` is set.
- Automatic fallback: local `sentence-transformers/all-MiniLM-L6-v2` if OpenAI fails (quota/network) or if `USE_LOCAL_EMBEDDINGS=1`.