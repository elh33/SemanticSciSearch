// Types pour l'interface
interface SearchFilters {
  author: string | null;
  year: number | null;
}

interface SearchRequest {
  query: string;
  filters: SearchFilters;
  top_k?: number;
}

interface Document {
  rank: number;
  title: string;
  score?: number;
  score_es?: number;
  excerpt?: string;
  best_sentence?: string;
  similarity?: number;
  best_sentence_score?: number;
  keywords: string[];
}

interface SearchResponse {
  query: string;
  filter: SearchFilters;
  documents: Document[];
  latency_ms?: number;
}