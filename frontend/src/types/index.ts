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
  abstract: string;
  best_sentence: string;
  keywords: string[];
  authors: string;
  year: number;
  score: number;
  similarity: number;
  url: string;
  score_raw?: number;
  best_sentence_score?: number;
}

export interface SearchResponse {
  query: string;
  filters: SearchFilters;
  documents: Article[];
  total: number;
  latency_ms: number;
  is_semantic_search?: boolean;
}