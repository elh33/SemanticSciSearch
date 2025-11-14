from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import search

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the SemanticSciSearch API"}