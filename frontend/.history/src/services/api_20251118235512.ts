// filepath: c:\Users\pc\Desktop\MRI4\SemanticSciSearch\frontend\src\services\api.ts
import axios from 'axios';
import { Article } from '../types';
import { MOCK_RESULTS } from '../data/mockData';

const USE_MOCK_DATA = true;
const API_BASE_URL = 'http://localhost:8000';

export const searchArticles = async (query: string): Promise<Article[]> => {
  if (USE_MOCK_DATA) {
    // simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!query || query.trim() === '') return MOCK_RESULTS;

    const q = query.toLowerCase();
    return MOCK_RESULTS.filter((article) =>
      article.title.toLowerCase().includes(q)
    );
  }

  // Production: real backend call (requires axios + backend)
  const response = await axios.post(`${API_BASE_URL}/search`, { query });
  return response.data as Article[];
};
