import axios from 'axios';
import { Article, SearchResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust the base URL as needed

export const searchArticles = async (query: string): Promise<SearchResponse> => {
    try {
        const response = await axios.get<SearchResponse>(`${API_BASE_URL}/search`, {
            params: { q: query },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};



