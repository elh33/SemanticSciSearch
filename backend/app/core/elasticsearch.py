from elasticsearch import Elasticsearch
from elasticsearch.exceptions import NotFoundError

class ElasticSearchClient:
    def __init__(self, hosts):
        self.client = Elasticsearch(hosts)

    def index_article(self, index_name, article_id, document):
        self.client.index(index=index_name, id=article_id, body=document)

    def search(self, index_name, query, size=10):
        response = self.client.search(index=index_name, body={
            "query": {
                "match": {
                    "title": query
                }
            },
            "size": size
        })
        return response['hits']['hits']

    def get_article(self, index_name, article_id):
        try:
            return self.client.get(index=index_name, id=article_id)
        except NotFoundError:
            return None

    def delete_article(self, index_name, article_id):
        self.client.delete(index=index_name, id=article_id)