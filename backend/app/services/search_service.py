from typing import List
from elasticsearch import Elasticsearch
from backend.app.models.article import Article

class SearchService:
    def __init__(self, es_client: Elasticsearch):
        self.es_client = es_client

    def search_articles(self, query: str, size: int = 10) -> List[Article]:
        search_body = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["title", "abstract"]
                }
            },
            "size": size
        }
        response = self.es_client.search(index="articles", body=search_body)
        articles = [self._parse_article(hit) for hit in response['hits']['hits']]
        return articles

    def _parse_article(self, hit) -> Article:
        return Article(
            title=hit['_source']['title'],
            abstract=hit['_source']['abstract'],
            vector=hit['_source'].get('vector', None)
        )