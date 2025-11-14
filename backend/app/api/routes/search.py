from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..dependencies import get_elasticsearch_client
from ...models.article import Article
from ...services.search_service import perform_search

router = APIRouter()

@router.get("/search", response_model=List[Article])
async def search_articles(query: str, es_client=Depends(get_elasticsearch_client)):
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter is required")
    
    results = await perform_search(query, es_client)
    return results