import { Article, SearchFilters, SearchRequest, SearchResponse } from '../types';
import { MOCK_RESULTS } from '../data/mockData';
import axios from 'axios'; 

const USE_MOCK_DATA = true; 
const API_BASE_URL = 'http://localhost:8000';

export const searchArticles = async (
  query: string, 
  filters: SearchFilters
): Promise<Article[]> => {
  if (USE_MOCK_DATA) {
    console.log(`[MOCK] Search for: "${query}", Filters:`, filters);
    
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    const lowerCaseQuery = query.toLowerCase();
    
    // Filter by query, year, and author
    let filtered = MOCK_RESULTS.filter(article => {
      const matchesQuery = query.length === 0 || 
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.best_sentence.toLowerCase().includes(lowerCaseQuery) ||
        article.keywords.some(kw => kw.toLowerCase().includes(lowerCaseQuery));
      
      const matchesYear = filters.year === null || article.year === filters.year;
      
      const matchesAuthor = filters.author === null || filters.author.trim() === '' ||
        article.authors.toLowerCase().includes(filters.author.toLowerCase());
      
      return matchesQuery && matchesYear && matchesAuthor;
    });
    
    // Sort by rank (ascending - lower rank = higher priority)
    return filtered.sort((a, b) => a.rank - b.rank);

  } else {
    console.log(`[AXIOS] Request to: ${API_BASE_URL}/search`);

    try {
      const requestBody: SearchRequest = {
        query,
        filters,
        top_k: 100
      };
      
      const response = await axios.post<SearchResponse>(`${API_BASE_URL}/search`, requestBody);
      
      // Sort by rank
      return response.data.documents.sort((a, b) => a.rank - b.rank);
      
    } catch (error) {
      console.error("Error calling search API:", error);
      return []; 
    }
  }
};