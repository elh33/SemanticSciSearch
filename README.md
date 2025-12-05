# 🔬 SemanticSciSearch

A modern **semantic search engine** for medical AI scientific articles powered by BioBERT embeddings, React, FastAPI, and Elasticsearch.

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![React](https://img.shields.io/badge/react-18.0+-61dafb.svg)
![FastAPI](https://img.shields.io/badge/fastapi-0.104+-009688.svg)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [How It Works](#-how-it-works)
- [Technologies](#-technologies)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🎯 Overview

**SemanticSciSearch** enables intelligent semantic search through medical AI research papers. Unlike traditional keyword-based search, it understands the **meaning** behind your queries:

- 🔍 **"AI for heart disease"** finds articles about **"machine learning for cardiology"**
- 🧠 Powered by **BioBERT** embeddings (768-dimensional vectors)
- ⚡ Fast vector similarity search with **Elasticsearch**
- 🎨 Modern React UI with real-time results

**Use Cases:**
- Browse all 50+ medical AI articles by default
- Perform semantic search to find the top 20 most relevant papers
- Filter by author name or publication year
- View article abstracts, keywords, and similarity scores

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Semantic Understanding** | Finds conceptually similar articles, not just keyword matches |
| **BioBERT Embeddings** | Domain-specific BERT model for biomedical text (`pritamdeka/S-BioBERT-snli-multinli-stsb`) |
| **Dual Search Modes** | Show all articles by default, or top 20 with semantic query |
| **Advanced Filtering** | Filter by author name and/or publication year |
| **Similarity Scoring** | Displays both ES cosine score and sentence-level similarity |
| **Keyword Extraction** | Automatic keyword extraction from abstracts |
| **Best Sentence Highlighting** | Shows most relevant sentence matching your query |
| **PDF Links** | Direct links to arXiv papers |
| **Modern UI** | Responsive React interface with modal article details |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Browser                           │
│              React + TypeScript + Vite                      │
│                  (Port 3000)                                │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP REST API
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   FastAPI Backend                           │
│              Python + Uvicorn                               │
│                  (Port 8000)                                │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Search     │    │   BioBERT    │    │    Text      │ │
│  │   Service    │───▶│   Embedding  │    │  Processing  │ │
│  └──────────────┘    │   Service    │    │   Service    │ │
│                      └──────────────┘    └──────────────┘ │
└────────────────────┬────────────────────────────────────────┘
                     │ Elasticsearch Client
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Elasticsearch 7.17.12                          │
│          Vector Store + k-NN Search                         │
│         (Docker Container - Port 9200)                      │
│                                                             │
│  Index: medical_biobert_index                              │
│  - 50+ articles with 768-dim vectors                       │
│  - Cosine similarity search                                 │
└─────────────────────────────────────────────────────────────┘
```

### **Search Flow:**

1. **User enters query** → Frontend (`SearchResults.tsx`)
2. **API call** → Backend endpoint (`/api/search`)
3. **Generate embedding** → BioBERT converts query to 768-dim vector
4. **Vector search** → Elasticsearch finds top 20 similar articles
5. **Post-processing** → Extract keywords, best sentence, scores
6. **Return results** → Display in React UI with scores

---

## 📦 Prerequisites

Before starting, ensure you have:

- **Node.js** 18+ and npm 10+ ([Download](https://nodejs.org/))
- **Python** 3.10+ ([Download](https://www.python.org/downloads/))
- **Docker** and Docker Compose ([Download](https://www.docker.com/get-started))
- **Git** ([Download](https://git-scm.com/downloads))
- **4GB+ RAM** (for BioBERT model)
- **Windows PowerShell** or Bash terminal

---

## 🚀 Installation & Setup

### **Step 1: Clone the Repository**

```powershell
git clone https://github.com/elh33/SemanticSciSearch.git
cd SemanticSciSearch
```

---

### **Step 2: Start Elasticsearch (Docker)**

```powershell
# Start Elasticsearch container
docker-compose up -d elasticsearch

# Verify it's running (wait 30-60 seconds for startup)
curl http://localhost:9200

# Expected output: JSON with cluster info
```

**Troubleshooting:** If port 9200 is busy:
```powershell
docker ps  # Check running containers
docker-compose down  # Stop all containers
docker-compose up -d elasticsearch  # Restart
```

---

### **Step 3: Backend Setup**

```powershell
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1  # Windows PowerShell
# source venv/bin/activate    # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Install additional dependency
pip install pydantic-settings
```

---

### **Step 4: Index Articles (First Time Only)**

This step loads the 50+ articles and generates BioBERT embeddings (~5-10 minutes):

```powershell
# Make sure you're in backend directory with venv activated
python scripts\index_articles_biobert.py
```

**Expected output:**
```
✓ Connected to Elasticsearch
🔄 Initializing BioBERT model...
✓ Model loaded

📝 Creating index 'medical_biobert_index' with mapping...
✓ Index created

📂 Loading articles from Medical_Ai_Articles.json...
✓ Loaded 50 articles

🚀 Starting indexing process...

✓ [1/50] Neural networks in 3D medical scan visualization...
✓ [2/50] Deep-Motion-Net: GNN-based volumetric organ shape...
...
✓ [50/50] ...

✅ Indexing complete! 50 articles indexed to 'medical_biobert_index'
📊 Total documents in index: 50
```

**Note:** Run this only once. To re-index, the script will automatically delete and recreate the index.

---

### **Step 5: Start Backend Server**

```powershell
# In backend directory with venv activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [XXXX] using StatReload
INFO:     Started server process [XXXX]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Test the API:**
- Open http://localhost:8000/docs (Swagger UI)
- Try http://localhost:8000/api/health (should return `{"status": "healthy"}`)

---

### **Step 6: Frontend Setup**

Open a **new terminal** (keep backend running):

```powershell
cd frontend

# Install dependencies
npm install

# Start development server (Docker)
docker-compose up -d frontend

# OR run locally without Docker:
# npm run dev
```

**Expected output:**
```
✔ Network semanticsearch_default  Created
✔ Container frontend              Started
```

**Access the app:**
- Open http://localhost:3000 in your browser

---

## 📖 Usage

### **1. Browse All Articles (Default)**

- Open http://localhost:3000
- Leave search box empty
- Click "Search" or just load the page
- **Result:** Shows ALL 50+ articles with basic info

### **2. Semantic Search (Top 20 Results)**

- Enter a query: *"machine learning for cancer detection"*
- Optionally filter by:
  - **Author:** Enter author name (e.g., "Ning Xie")
  - **Year:** Select publication year from dropdown
- Click "Search"
- **Result:** Top 20 most semantically similar articles with:
  - **Score:** Elasticsearch cosine similarity (%)
  - **Similarity:** Best sentence match score (%)
  - **Keywords:** Auto-extracted from abstract
  - **Best Sentence:** Most relevant excerpt

### **3. View Article Details**

- Click the **ℹ️ icon** on any article
- Modal shows:
  - Full abstract
  - All keywords
  - Authors and year
  - **"View Full Paper (PDF)"** button → Opens arXiv link

---

## 📁 Project Structure

```
SemanticSciSearch/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── search.py          # FastAPI endpoints
│   │   ├── core/
│   │   │   ├── config.py              # Settings (ES host, index name)
│   │   │   └── elasticsearch.py       # ES client (unused)
│   │   ├── models/
│   │   │   └── article.py             # Pydantic models
│   │   ├── services/
│   │   │   ├── search_service.py      # Main search logic
│   │   │   ├── embedding_service_biobert.py  # BioBERT embeddings
│   │   │   └── text_processing_service.py    # NLP utilities
│   │   └── main.py                    # FastAPI app entry
│   ├── data/
│   │   └── Medical_Ai_Articles.json   # 50+ article dataset
│   ├── scripts/
│   │   └── index_articles_biobert.py  # Indexing script
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchResults.tsx      # Main search interface
│   │   │   └── ArticleCard.tsx        # Article display component
│   │   ├── services/
│   │   │   └── api.ts                 # Axios API client
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── docker-compose.yml                 # Elasticsearch + Frontend
├── docker-compose.override.yml        # Dev overrides
└── README.md
```

---

## 🔌 API Documentation

### **Endpoints**

#### `POST /api/search`

**Request:**
```json
{
  "query": "deep learning for medical imaging",
  "filters": {
    "author": "Ning Xie",
    "year": 2020
  },
  "top_k": 20
}
```

**Response:**
```json
{
  "query": "deep learning for medical imaging",
  "filters": {
    "author": "Ning Xie",
    "year": 2020
  },
  "documents": [
    {
      "rank": 1,
      "title": "Neural networks in 3D medical scan visualization",
      "abstract": "For medical volume visualization...",
      "best_sentence": "Neural networks detect distinctive features...",
      "keywords": ["neural", "networks", "medical", "visualization"],
      "authors": "Dženan Zukić, Andreas Elsner",
      "year": 2008,
      "score": 34.5,
      "similarity": 0.78,
      "url": "https://arxiv.org/abs/0806.2925"
    }
  ],
  "total": 20,
  "latency_ms": 1250.5,
  "is_semantic_search": true
}
```

#### `GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "elasticsearch": "connected",
  "index": "medical_biobert_index",
  "document_count": 50
}
```

---

## 🧠 How It Works

### **1. Indexing Phase (One-Time)**

```python
# Load article
article = {
    "title": "Neural networks in 3D medical scan visualization",
    "abstract": "For medical volume visualization...",
    "authors": ["Dženan Zukić", "Andreas Elsner"],
    "year": 2008
}

# Generate embedding
text = title + " " + abstract
vector = biobert.encode(text)  # 768-dimensional vector

# Store in Elasticsearch
es.index(index="medical_biobert_index", document={
    "title": title,
    "abstract": abstract,
    "vector": vector,  # Dense vector for k-NN search
    ...
})
```

### **2. Search Phase (Real-Time)**

```python
# User query
query = "machine learning for cancer detection"

# Generate query embedding
query_vector = biobert.encode(query)  # 768-dim

# Elasticsearch k-NN search
results = es.search(index="medical_biobert_index", body={
    "query": {
        "script_score": {
            "query": {"match_all": {}},
            "script": {
                "source": "cosineSimilarity(params.query_vector, 'vector') + 1.0",
                "params": {"query_vector": query_vector}
            }
        }
    },
    "size": 20
})

# Post-process results
for hit in results:
    # Find best matching sentence
    sentences = tokenize(hit['abstract'])
    best_sentence = max(sentences, key=lambda s: similarity(query_vector, biobert.encode(s)))
    
    # Extract keywords
    keywords = extract_top_keywords(hit['abstract'])
    
    # Calculate scores
    score = (hit['_score'] - 1.0) * 100  # Convert to percentage
    similarity = cosine_similarity(query_vector, biobert.encode(best_sentence))
```

### **3. Similarity Scores**

- **Score (%)**: Elasticsearch cosine similarity between query and full article
  - Formula: `(ES_score - 1.0) × 100`
  - Example: ES score 1.345 → 34.5%
  
- **Similarity (%)**: Sentence-level similarity
  - Best matching sentence from abstract vs. query
  - Example: 0.78 → 78%

---

## 🛠️ Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | UI framework |
| | Vite | Build tool & dev server |
| | Axios | HTTP client |
| **Backend** | FastAPI | RESTful API framework |
| | Python 3.10 | Programming language |
| | Uvicorn | ASGI server |
| **NLP** | BioBERT | Domain-specific BERT model |
| | sentence-transformers | Embedding generation |
| | NLTK | Text processing |
| | scikit-learn | Cosine similarity |
| **Database** | Elasticsearch 7.17 | Vector store + k-NN search |
| **DevOps** | Docker | Containerization |
| | Docker Compose | Multi-container orchestration |

---

## ❓ Troubleshooting

### **Elasticsearch Not Starting**

```powershell
# Check container status
docker ps -a

# View logs
docker logs elastic_server

# Restart
docker-compose down
docker-compose up -d elasticsearch
```

### **Backend: "No module named 'app'"**

```powershell
# Run from backend directory
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **Backend: "Index not found"**

```powershell
# Re-run indexing script
cd backend
python scripts\index_articles_biobert.py
```

### **Frontend: CORS Errors**

- Ensure backend is running on port 8000
- Check `frontend/src/services/api.ts` has correct `API_BASE_URL`
- Backend already has CORS configured in `backend/app/main.py`

### **Port Already in Use**

```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (Windows)
taskkill /PID <PID> /F
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 Context

This project demonstrates:
- **Semantic Search**: Understanding meaning beyond keywords
- **Transfer Learning**: Using pre-trained BioBERT for domain-specific tasks
- **Vector Databases**: Efficient similarity search at scale
- **Full-Stack Development**: React + FastAPI + Elasticsearch integration
- **Modern DevOps**: Docker containerization and microservices

**Technologies covered:**
✅ Natural Language Processing (NLP)  
✅ Deep Learning (BERT)  
✅ Vector Embeddings  
✅ RESTful APIs  
✅ React TypeScript  
✅ Elasticsearch  
✅ Docker  

---

**Happy Searching! 🔬🔍**
