# SemanticSciSearch

A modern semantic search engine for scientific articles using BERT embeddings, React, FastAPI, and Elasticsearch.

## 🎯 Project Overview

SemanticSciSearch enables intelligent search through scientific articles using semantic similarity rather than keyword matching. The system understands that "AI for heart disease" is semantically similar to "machine learning for cardiology" even with different words.

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **UI Components**: 
  - `SearchBar`: User input interface
  - `SearchResults`: Display search results
  - `ArticleCard`: Individual article display with similarity score
- **API Client**: Axios for backend communication

### Backend
- **Framework**: FastAPI (Python)
- **NLP Model**: BERT via sentence-transformers
- **Database**: Elasticsearch (as vector store)
- **Search Method**: k-NN with cosine similarity

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm 10+
- **Python** 3.9+
- **Docker** (for Elasticsearch)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SemanticSciSearch.git
cd SemanticSciSearch
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will run on `http://localhost:8000`

### 4. Start Elasticsearch

```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or run Elasticsearch manually
docker run -d -p 9200:9200 -e "discovery.type=single-node" elasticsearch:8.11.0
```

### 5. Index Articles (First Time Only)

```bash
cd backend
python scripts/indexer.py
```

This will:
- Load ~50 scientific articles
- Generate BERT embeddings
- Store vectors in Elasticsearch

## 📁 Project Structure

```
SemanticSciSearch/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── ArticleCard.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── search.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── elasticsearch.py
│   │   ├── models/
│   │   │   └── article.py
│   │   ├── services/
│   │   │   ├── search_service.py
│   │   │   └── embedding_service.py
│   │   └── main.py
│   └── requirements.txt
├── docker-compose.yml
└── README.md
```

## 🧪 Usage

1. Open `http://localhost:3000`
2. Enter a natural language query (e.g., "machine learning for medical diagnosis")
3. View results ranked by semantic similarity score
4. Each result shows:
   - Article title
   - Abstract excerpt
   - **Similarity score** (0.0 - 1.0)

## 🎯 Key Features

- **Semantic Understanding**: Finds conceptually similar articles, not just keyword matches
- **BERT Embeddings**: Uses state-of-the-art NLP model
- **Fast Search**: Elasticsearch k-NN for efficient vector search
- **Modern UI**: React 18 with TypeScript and Vite
- **RESTful API**: FastAPI backend with automatic OpenAPI docs

## 📊 Evaluation

The system is evaluated using:
- **Precision**: Accuracy of retrieved results
- **Recall**: Coverage of relevant documents
- **F1-Score**: Harmonic mean of precision and recall
- **Confusion Matrix**: For 5 test queries

## 🛠️ Development Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

### Backend
```bash
uvicorn app.main:app --reload  # Dev server with hot reload
pytest                          # Run tests
```

## 📝 Environment Variables

Create `.env` files:

**backend/.env**
```env
ELASTICSEARCH_HOST=http://localhost:9200
BERT_MODEL=sentence-transformers/all-MiniLM-L6-v2
VECTOR_DIMENSION=384
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:8000
```

## 🐳 Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 Technologies

- **Frontend**: React 18, TypeScript, Vite, Axios
- **Backend**: FastAPI, sentence-transformers, Python 3.9+
- **Database**: Elasticsearch 8.x
- **NLP**: BERT (pritamdeka/S-BioBERT-snli-multinli-stsb) et BERT(allenai/scibert_scivocab_uncased)
- **Containerization**: Docker, Docker Compose
  
## Pour indexer les articles 
  - run script backend/scripts/index_articles_biobert.py
## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Note**: This is an academic project demonstrating semantic search capabilities using modern NLP and web technologies.
