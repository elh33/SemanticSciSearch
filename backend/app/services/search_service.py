import time
from elasticsearch import Elasticsearch
from typing import Optional, List, Dict, Any
from app.services.embedding_service_biobert import BioBERTEmbeddingService
from app.services.text_processing_service import TextProcessingService
from app.core.config import settings


class SearchService:
    def __init__(self):
        self.es = Elasticsearch(settings.ES_HOST)
        self.embedder = BioBERTEmbeddingService()
        self.processor = TextProcessingService(self.embedder)
        
    def search(
        self, 
        query: str, 
        author: Optional[str] = None, 
        year: Optional[int] = None,
        top_k: int = 20
    ) -> Dict[str, Any]:
        """
        Perform semantic search with BioBERT embeddings
        - If query is provided: Return top 20 semantic results
        - If query is empty: Return ALL matching articles (no limit)
        """
        start_time = time.time()
        
        # Determine if we have a semantic query (explicitly convert to boolean)
        has_query = bool(query and query.strip() != "")
        
        if has_query:
            # Semantic search: Generate embedding and limit to 20 results
            query_vec = self.embedder.generate_embeddings(query)
            result_size = 20
        else:
            # No query: Show all articles (no semantic ranking)
            query_vec = None
            result_size = 10000  # Large number to get all documents
        
        # Build Elasticsearch query
        es_query = self.processor.build_es_query(
            query_vec=query_vec,
            author=author,
            year=year,
            size=result_size
        )
        
        # Execute search
        response = self.es.search(index=settings.ES_INDEX, body=es_query)
        hits = response["hits"]["hits"]
        
        # Process results
        documents = []
        for rank, hit in enumerate(hits, start=1):
            source = hit["_source"]
            title = source.get("title", "")
            abstract = source.get("abstract", "")
            authors_list = source.get("authors", [])
            year_val = source.get("year", None)
            url = source.get("url", "")
            
            # Format authors (from list to string)
            if isinstance(authors_list, list):
                authors_str = ", ".join(authors_list)
            else:
                authors_str = str(authors_list)
            
            # Get the raw ES score
            raw_score = float(hit["_score"])
            
            # Extract best sentence and keywords only if we have a query
            if has_query:
                best_sentence, sent_score = self.processor.extract_best_sentence(
                    abstract, query_vec
                )
                keywords = self.processor.extract_keywords(abstract, top_n=10)
                similarity_score = sent_score
                
                # Convert ES score to percentage (score - 1.0) * 100
                score_percentage = (raw_score - 1.0) * 100 if raw_score >= 1.0 else 0.0
            else:
                # No semantic analysis without query - show excerpt
                best_sentence = abstract[:200] + "..." if len(abstract) > 200 else abstract
                sent_score = 0.0
                keywords = self.processor.extract_keywords(abstract, top_n=10)
                similarity_score = 0.0
                score_percentage = 0.0
            
            doc = {
                "rank": rank,
                "title": title,
                "abstract": abstract,
                "best_sentence": best_sentence,
                "best_sentence_score": float(sent_score),
                "keywords": keywords,
                "authors": authors_str,
                "year": year_val,
                "score": round(score_percentage, 1),
                "score_raw": raw_score,
                "similarity": float(similarity_score),
                "url": url
            }
            documents.append(doc)
        
        latency_ms = (time.time() - start_time) * 1000
        
        return {
            "query": query,
            "filters": {
                "author": author,
                "year": year
            },
            "documents": documents,
            "total": len(documents),
            "latency_ms": round(latency_ms, 2),
            "is_semantic_search": bool(has_query)  # Explicitly cast to boolean
        }