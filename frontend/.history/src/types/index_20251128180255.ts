export interface Article {
  id: string;
  title: string;
  abstract: string; ///best
  authors: string;
  year: number;
  score: number;
  url: string; // +M rank
}

export interface SearchResponse {
    articles: Article[];
    totalResults: number;
    query: string;
}