from pydantic import BaseSettings

class Settings(BaseSettings):
    elasticsearch_url: str = "http://localhost:9200"
    index_name: str = "articles"
    embedding_model: str = "bert-base-uncased"

    class Config:
        env_file = ".env"

settings = Settings()