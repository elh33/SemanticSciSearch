from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.services.search_service import SearchService

router = APIRouter()

# Initialize search service (singleton pattern)
search_service = SearchService()


# Request/Response Models
class SearchFilters(BaseModel):
    author: Optional[str] = None
    year: Optional[int] = None


class SearchRequest(BaseModel):
    query: str
    filters: SearchFilters
    top_k: Optional[int] = 20


class ArticleResponse(BaseModel):
    rank: int
    title: str
    abstract: str
    best_sentence: str
    best_sentence_score: float
    keywords: List[str]
    authors: str
    year: Optional[int]
    score: float
    score_raw: Optional[float] = None
    similarity: float
    url: str


class SearchResponse(BaseModel):
    query: str
    filters: SearchFilters
    documents: List[ArticleResponse]
    total: int
    latency_ms: float
    is_semantic_search: Optional[bool] = False


@router.post("/search", response_model=SearchResponse)
async def search_articles(request: SearchRequest):
    """
    Semantic search endpoint using BioBERT embeddings
    
    - **query**: Search text (empty = show all articles, with text = semantic search top 20)
    - **filters**: Optional author and/or year filters
    - **top_k**: Ignored - automatically determined based on query presence
    """
    try:
        result = search_service.search(
            query=request.query,
            author=request.filters.author,
            year=request.filters.year,
            top_k=request.top_k
        )
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")


@router.get("/health")
async def health_check():
    """Check if the API and Elasticsearch are running"""
    try:
        if search_service.es.ping():
            count_result = search_service.es.count(index="medical_biobert_index")
            return {
                "status": "healthy",
                "elasticsearch": "connected",
                "index": "medical_biobert_index",
                "document_count": count_result.get("count", 0)
            }
        else:
            return {"status": "unhealthy", "elasticsearch": "disconnected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unavailable: {str(e)}")