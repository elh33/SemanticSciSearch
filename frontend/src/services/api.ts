import { Article, SearchFilters, SearchRequest, SearchResponse } from '../types';
import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:8000/api';

export const searchArticles = async (
  query: string, 
  filters: SearchFilters
): Promise<Article[]> => {
  console.log(`[API] Search request: "${query}", Filters:`, filters);

  try {
    const requestBody: SearchRequest = {
      query,
      filters,
      top_k: 20  // Fixed to 20 results
    };
    
    const response = await axios.post<SearchResponse>(
      `${API_BASE_URL}/search`, 
      requestBody
    );
    
    console.log(`[API] Received ${response.data.documents.length} results in ${response.data.latency_ms}ms`);
    
    // Return documents sorted by rank
    return response.data.documents.sort((a, b) => a.rank - b.rank);
    
  } catch (error) {
    console.error("Error calling search API:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
    }
    return []; 
  }
};

// Health check function (optional, for debugging)
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log("[API] Health check:", response.data);
    return response.data.status === "healthy";
  } catch (error) {
    console.error("[API] Health check failed:", error);
    return false;
  }
};