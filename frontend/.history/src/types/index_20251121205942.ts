export interface Article {
  id: string;
  title: string;
  abstract: string;
  authors: string;
  year: number;
  url: string;
}

export interface SearchResponse {
    articles: Article[];
    totalResults: number;
    query: string;
}