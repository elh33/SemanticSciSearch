import time
import sys
from pathlib import Path
import json
from elasticsearch import Elasticsearch

sys.path.append(str(Path(__file__).resolve().parents[1]))

from backend.app.services.embedding_service_biobert import BioBERTEmbeddingService
from backend.app.services.text_processing_service import TextProcessingService

ES_HOST = "http://localhost:9200"
INDEX_NAME = "medical_biobert_index"
OUTPUT_FILE = Path(__file__).parents[1] / "output" / "biobert_results.json"


def run_performance_test():
    print("--- Initialisation du modèle BioBERT ---")

    try:
        start_init = time.time()
        embedder = BioBERTEmbeddingService()
        processor = TextProcessingService(embedder)
        print(f"Modèle chargé en {time.time() - start_init:.2f} sec")
    except Exception as e:
        print(f"Erreur modèle: {e}")
        return

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

    results_log = []
    es = Elasticsearch(ES_HOST)


    # -------------------------------------------------------
    # TESTS 1 : RECHERCHES AVEC PROMPT (COMME AVANT)
    # -------------------------------------------------------
    for i, query in enumerate(test_queries):
        print(f"\n========== Requête {i+1} ==========")
        print(f"Query: {query}")

        for filt in test_filters:
            print(f"\n--- Test filtre: author={filt['author']}, year={filt['year']} ---")
            log_entry = {"query": query, "filter": filt, "documents": []}

            qvec = embedder.generate_embeddings(query)
            body = processor.build_es_query(qvec, author=filt["author"], year=filt["year"])
            resp = es.search(index=INDEX_NAME, body=body)
            hits = resp["hits"]["hits"]

            if not hits:
                print("Aucun document trouvé.")
                continue

            for j, hit in enumerate(hits):
                src = hit["_source"]
                title = src.get("title", "")
                abstract = src.get("abstract", "")

                best_sentence, sent_score = processor.extract_best_sentence(abstract, qvec)
                doc_keywords = processor.extract_keywords(abstract, top_n=10)

                print(f"\n→ Document {j+1}")
                print(f"   Titre: {title[:80]}...")
                print(f"   Score ES: {hit['_score']:.4f}")
                print(f"   Extrait pertinent: \"{best_sentence}\" ({sent_score:.4f})")
                print(f"   Keywords: {', '.join(doc_keywords)}")

                log_entry["documents"].append({
                    "rank": j + 1,
                        "score_es": hit["_score"],
                        "title": title,
                        "best_sentence": best_sentence,
                        "best_sentence_score": sent_score,
                        "keywords": doc_keywords
                })

            results_log.append(log_entry)

    # -------------------------------------------------------
    # TESTS 2 : RECHERCHES PAR FILTRES SEULEMENT (SANS PROMPT)
    # -------------------------------------------------------
    print("\n\n==============================")
    print("   TESTS SANS PROMPT (FILTRES)")
    print("==============================\n")

    filter_only_tests = [
        {"author": "Ning Xie", "year": None},
        {"author": "Ning", "year": None},
        {"author": None, "year": 2020},
        {"author": None, "year": 2008},
        {"author": "Alessio Gagliardi", "year": 2022}
    ]

    for filt in filter_only_tests:
        print(f"\n--- Recherche sans prompt: author={filt['author']}, year={filt['year']} ---")

        body = processor.build_es_query(query_vec=None, author=filt["author"], year=filt["year"])
        resp = es.search(index=INDEX_NAME, body=body)

        hits = resp["hits"]["hits"]
        if not hits:
            print("Aucun résultat.\n")
            continue

        log_entry = {"query": None, "filter": filt, "documents": []}

        for j, hit in enumerate(hits[:20]):
            src = hit["_source"]
            title = src.get("title", "")
            abstract = src.get("abstract", "")
            doc_keywords = processor.extract_keywords(abstract, top_n=10)

            print(f"\n→ [FILTER ONLY] Document {j+1}")
            print(f"   Titre: {title[:80]}...")
            print(f"   Score ES: {hit['_score']:.4f}")
            print(f"   Keywords: {', '.join(doc_keywords)}")

            log_entry["documents"].append({
                "rank": j + 1,
                "title": title,
                "score": float(hit["_score"]),
                "keywords": doc_keywords
            })

        results_log.append(log_entry)

    # Sauvegarde finale
    OUTPUT_FILE.parent.mkdir(exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(results_log, f, indent=4, ensure_ascii=False)

    print(f"\nRésultats enregistrés dans : {OUTPUT_FILE}")


if __name__ == "__main__":
    run_performance_test()
