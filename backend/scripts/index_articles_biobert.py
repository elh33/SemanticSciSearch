import json
from elasticsearch import Elasticsearch
from pathlib import Path
from backend.app.services.embedding_service_biobert import BioBERTEmbeddingService

ES_HOST = "http://localhost:9200"
INDEX_NAME = "medical_biobert_index"

DATA_PATH = Path(__file__).parents[1] / "data" / "Medical_Ai_Articles.json"


def main():
    es = Elasticsearch(ES_HOST)
    if not es.ping():
        raise RuntimeError(" Cannot connect to Elasticsearch at " + ES_HOST)

    embedder = BioBERTEmbeddingService()

    # Create index with mapping if missing
    if not es.indices.exists(INDEX_NAME):
        print("Creating index with mapping...")
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

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        articles = json.load(f)

    for i, art in enumerate(articles):
        title = art.get("title", "")
        abstract = art.get("abstract", "")
        authors = art.get("author", [])
        year = art.get("year")
        url = art.get("url", "")

        # Embedding du titre + abstract
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
        es.index(index=INDEX_NAME, id=doc_id, body=doc)

        print(f"Indexed {i+1}/{len(articles)}: {title[:60]}")

    print("\n Indexing finished.")


if __name__ == "__main__":
    main()
