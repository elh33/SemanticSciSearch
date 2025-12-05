export interface Article {
  id: string;
  title: string;
  abstract: string; ///best
  authors: string;
  year: number;
  score: number;
  url: string; // +rank
}

export interface SearchResponse {
    articles: Article[];
    totalResults: number;
    query: string;
}