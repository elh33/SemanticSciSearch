from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import search

app = FastAPI(
    title="SemanticSciSearch API",
    description="Semantic search for medical AI articles using BioBERT embeddings",
    version="1.0.0"
)

# CORS Configuration (allows frontend on port 3000 to call backend on port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Vite dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include search router
app.include_router(search.router, prefix="/api", tags=["search"])


@app.get("/")
def read_root():
    return {
        "message": "Welcome to SemanticSciSearch API",
        "docs": "/docs",
        "health": "/api/health"
    }