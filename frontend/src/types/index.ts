export interface Article {
    id: string;
    title: string;
    abstract: string;
    similarityScore: number;
}

export interface SearchResponse {
    articles: Article[];
    totalResults: number;
    query: string;
}