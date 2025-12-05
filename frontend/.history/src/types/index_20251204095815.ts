// Types pour l'interface
export interface SearchFilters {
  author: string | null;
  year: number | null;
}

export interface SearchRequest {
  query: string;
  filters: SearchFilters;
  top_k?: number;
}

export interface Article {
  rank: number;
  title: string;
  best_sentence: string;
  keywords: string[];
  authors: string;
  year: number;
  score: number;
  url: string;
  // Champs optionnels du backend
  score_es?: number;
  excerpt?: string;
  similarity?: number;
  best_sentence_score?: number;
}

export interface SearchResponse {
  query: string;
  filter: SearchFilters;
  documents: Article[];
  latency_ms?: number;
}