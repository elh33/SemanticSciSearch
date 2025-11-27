import time
import sys
from pathlib import Path
import json
from elasticsearch import Elasticsearch

sys.path.append(str(Path(__file__).resolve().parents[1]))

from backend.app.services.embedding_service_scivocab import ScivocabEmbeddingService
from backend.app.services.text_processing_service import TextProcessingService

ES_HOST = "http://localhost:9200"
INDEX_NAME = "medical_scivocab_index"
OUTPUT_PATH = Path(__file__).parents[1] / "output" / "scivocab_results.json"


def run_performance_test():

    print("--- Chargement du modèle Scivocab ---")
    embedder = ScivocabEmbeddingService()
    text_service = TextProcessingService(embedder)
    es = Elasticsearch(ES_HOST)

    test_queries = [
        "What are the benefits of using deep learning in medical imaging?",
        "Recent advances in predicting cancer recurrence using AI models.",
        "How can machine learning models be applied to genomics data?",
        "The application of convolutional neural networks in radiology."
    ]

    # Test filters
    test_filters = [
        {"author": None, "year": None},             
        {"author": "Ning Xie", "year": None}, 
        {"author": "Ning", "year": None},                   
        {"author": None, "year": 2020},     
        {"author": None, "year": 2008},             
        {"author": "Alessio Gagliardi", "year": 2022}         
    ]

    all_latencies_ms = []
    output_data = []

    for i, query in enumerate(test_queries):
        print(f"\n===== Requête {i+1} =====")
        print(f"Query : {query}")

        for filt in test_filters:
            print(f"\n--- Test filtre: author={filt['author']}, year={filt['year']} ---")
            start_total = time.time()
            query_vec = embedder.generate_embeddings(query)

            # Construire la query Elasticsearch avec filtre
            body = text_service.build_es_query(query_vec, author=filt["author"], year=filt["year"])
            resp = es.search(index=INDEX_NAME, body=body)
            hits = resp["hits"]["hits"]

            total_latency_ms = (time.time() - start_total) * 1000
            all_latencies_ms.append(total_latency_ms)
            print(f"Latence totale : {total_latency_ms:.2f} ms")

            query_result = {
                "query": query,
                "filter": filt,
                "latency_ms": total_latency_ms,
                "documents": []
            }

            if not hits:
                print("Aucun document trouvé avec ce filtre.")
            else:
                for rank, hit in enumerate(hits):
                    src = hit["_source"]
                    title = src.get("title", "")
                    abstract = src.get("abstract", "")

                    best_sentence, best_score = text_service.extract_best_sentence(abstract, query_vec)
                    keywords = text_service.extract_keywords(abstract, top_n=10)

                    print(f"\n--- Document {rank+1} ---")
                    print(f"Score ES   : {hit['_score']:.4f}")
                    print(f"Titre      : {title}")
                    print(f"Best sent  : {best_sentence}")
                    print(f"Keywords   : {', '.join(keywords)}")

                    query_result["documents"].append({
                        "rank": rank + 1,
                        "score_es": hit["_score"],
                        "title": title,
                        "best_sentence": best_sentence,
                        "best_sentence_score": best_score,
                        "keywords": keywords
                    })

            output_data.append(query_result)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=4, ensure_ascii=False)

    print(f"\nRésultats enregistrés dans : {OUTPUT_PATH}")

    if all_latencies_ms:
        avg_latency = sum(all_latencies_ms) / len(all_latencies_ms)
        print(f"\nLatence moyenne : {avg_latency:.2f} ms")


if __name__ == "__main__":
    run_performance_test()
