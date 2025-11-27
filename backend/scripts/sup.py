from elasticsearch import Elasticsearch

es = Elasticsearch("http://localhost:9200")
index_name = "medical_scivocab_index"

if es.indices.exists(index=index_name):
    es.indices.delete(index=index_name)
    print("Index supprimé ✔")
