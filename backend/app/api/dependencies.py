from fastapi import Depends
from ..core.elasticsearch import get_elasticsearch_client

def get_client():
    return get_elasticsearch_client()