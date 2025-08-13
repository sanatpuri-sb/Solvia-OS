import os, glob, hashlib, yaml, sys
import chromadb
from chromadb.config import Settings

# --- INDEX SCOPE ---
INDEX_PATHS = glob.glob("memory/**/*.yaml", recursive=True) + ["docs/master_plan.md"]
PERSIST_DIR = "automation/chroma"
CHUNK_SIZE = 800
CHUNK_OVERLAP = 100

# --- EMBEDDING ENGINE SELECTION ---
# If OPENAI_API_KEY is set and USE_LOCAL_EMBEDDINGS != "1", try OpenAI first, else use local.
USE_LOCAL = os.environ.get("USE_LOCAL_EMBEDDINGS") == "1" or not os.environ.get("OPENAI_API_KEY")

def _init_openai():
    from openai import OpenAI
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("OPENAI_API_KEY not set")
    return OpenAI()

def openai_embed(batch):
    client = _init_openai()
    try:
        res = client.embeddings.create(model="text-embedding-3-small", input=batch)
        return [e.embedding for e in res.data], "openai:text-embedding-3-small"
    except Exception as e:
        # Fallback to local on quota/network errors
        print(f"⚠️ OpenAI embedding failed ({e.__class__.__name__}): {e}")
        print("→ Falling back to local SentenceTransformers.")
        os.environ["USE_LOCAL_EMBEDDINGS"] = "1"
        return local_embed(batch)

# Lazy-load local model once
_local_model = None
def local_embed(batch):
    global _local_model
    if _local_model is None:
        from sentence_transformers import SentenceTransformer
        # Small, fast, no GPU required
        _local_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    vecs = _local_model.encode(batch, batch_size=64, convert_to_numpy=True).tolist()
    return vecs, "local:all-MiniLM-L6-v2"

def choose_embedder():
    if USE_LOCAL:
        return local_embed
    return openai_embed

# --- HELPERS ---
def read_text(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def chunk(text, size, overlap):
    out, i = [], 0
    while i < len(text):
        out.append(text[i:i+size])
        i += size - overlap
    return out

# --- BUILD DOCS ---
docs, ids, metas = [], [], []
for path in INDEX_PATHS:
    if not os.path.exists(path):
        print(f"⚠️ Missing path: {path}")
        continue
    text = read_text(path)
    hint = ""
    if path.endswith((".yaml",".yml")):
        try:
            data = yaml.safe_load(text)
            if isinstance(data, dict):
                hint = " |keys: " + ",".join(list(data.keys())[:6])
        except Exception as ex:
            print("YAML parse warning on", path, "->", ex)
    chs = chunk(text, CHUNK_SIZE, CHUNK_OVERLAP)
    for idx, c in enumerate(chs):
        doc_id = hashlib.sha1(f"{path}:{idx}".encode()).hexdigest()
        docs.append(c)
        ids.append(doc_id)
        metas.append({"file": path, "chunk_index": idx, "hint": hint})

if not docs:
    print("❌ No documents found to index. Check paths.")
    sys.exit(1)

# --- INIT CHROMA ---
os.makedirs(PERSIST_DIR, exist_ok=True)
client = chromadb.PersistentClient(path=PERSIST_DIR, settings=Settings(anonymized_telemetry=False))
collection = client.get_or_create_collection("solvia")

# --- EMBED + UPSERT ---
embed_fn = choose_embedder()
BATCH = 64
engine_used = None
total = 0
for i in range(0, len(docs), BATCH):
    batch = docs[i:i+BATCH]
    vecs, engine = embed_fn(batch)
    engine_used = engine
    collection.upsert(
        documents=batch,
        metadatas=metas[i:i+BATCH],
        ids=ids[i:i+BATCH],
        embeddings=vecs
    )
    total += len(batch)

print(f"✅ Indexed {total} chunks into 'solvia' at {PERSIST_DIR} (engine: {engine_used})")