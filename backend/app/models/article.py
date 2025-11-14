from pydantic import BaseModel
from typing import List, Optional

class Article(BaseModel):
    id: str
    title: str
    abstract: str
    authors: List[str]
    publication_date: str
    vector: List[float]

class ArticleCreate(BaseModel):
    title: str
    abstract: str
    authors: List[str]
    publication_date: str

class ArticleResponse(Article):
    pass