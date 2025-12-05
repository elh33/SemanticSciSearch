import json
import time
from elasticsearch import Elasticsearch
from pathlib import Path
import sys

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.services.embedding_service_biobert import BioBERTEmbeddingService

ES_HOST = "http://localhost:9200"
INDEX_NAME = "medical_biobert_index"

DATA_PATH = Path(__file__).parents[1] / "data" / "Medical_Ai_Articles.json"


def wait_for_elasticsearch(es, max_retries=30, delay=2):
    """Wait for Elasticsearch to be ready"""
    for i in range(max_retries):
        try:
            if es.ping():
                print("✓ Connected to Elasticsearch")
                return True
            print(f"Waiting for Elasticsearch... ({i+1}/{max_retries})")
        except Exception as e:
            print(f"Connection attempt {i+1}/{max_retries}: {e}")
        time.sleep(delay)
    return False


def main():
    # Initialize ES client with timeout settings
    es = Elasticsearch(
        ES_HOST,
        request_timeout=30,
        max_retries=3,
        retry_on_timeout=True
    )
    
    if not wait_for_elasticsearch(es):
        raise RuntimeError(f"Cannot connect to Elasticsearch at {ES_HOST}")

    print("\n🔄 Initializing BioBERT model...")
    embedder = BioBERTEmbeddingService()
    print("✓ Model loaded\n")

    # Delete index if it exists (for clean re-indexing)
    if es.indices.exists(index=INDEX_NAME):
        print(f"⚠️  Index '{INDEX_NAME}' already exists. Deleting...")
        es.indices.delete(index=INDEX_NAME)
        print("✓ Index deleted\n")

    # Create index with proper mapping
    print(f"📝 Creating index '{INDEX_NAME}' with mapping...")
    es.indices.create(
        index=INDEX_NAME,
        body={
            "mappings": {
                "properties": {
                    "title": {"type": "text"},
                    "abstract": {"type": "text"},
                    "authors": {"type": "text"},
                    "year": {"type": "integer"},
                    "url": {"type": "keyword"},
                    "vector": {
                        "type": "dense_vector",
                        "dims": 768,
                        "index": True,
                        "similarity": "cosine"
                    }
                }
            }
        }
    )
    print("✓ Index created\n")

    # Load articles
    print(f"📂 Loading articles from {DATA_PATH.name}...")
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        articles = json.load(f)
    print(f"✓ Loaded {len(articles)} articles\n")

    # Index articles
    print("🚀 Starting indexing process...\n")
    for i, art in enumerate(articles, start=1):
        title = art.get("title", "")
        abstract = art.get("abstract", "")
        authors = art.get("author", [])
        year = art.get("year")
        url = art.get("url", "")

        # Generate embedding
        text = (title + " " + abstract).strip()
        vector = embedder.generate_embeddings(text)

        doc = {
            "title": title,
            "abstract": abstract,
            "authors": authors,
            "year": year,
            "url": url,
            "vector": vector
        }

        doc_id = art.get("id", i)
        es.index(index=INDEX_NAME, id=doc_id, document=doc)

        print(f"✓ [{i}/{len(articles)}] {title[:70]}...")

    print(f"\n✅ Indexing complete! {len(articles)} articles indexed to '{INDEX_NAME}'")
    
    # Verify
    es.indices.refresh(index=INDEX_NAME)
    count = es.count(index=INDEX_NAME)
    print(f"📊 Total documents in index: {count['count']}")


if __name__ == "__main__":
    main()