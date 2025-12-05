from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    ES_HOST: str = "http://localhost:9200"
    ES_INDEX: str = "medical_biobert_index"
    
    model_config = ConfigDict(
        env_file=".env",
        extra="ignore"
    )

settings = Settings()