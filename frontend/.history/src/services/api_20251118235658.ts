import { Article } from '../types';
import { MOCK_RESULTS } from '../data/mockData';
import axios from 'axios'; 

// 💡 INTERRUPTEUR : Passez à 'false' (ou commentez/supprimez) cette ligne
// UNIQUEMENT lorsque le Back-End FastAPI est prêt.
const USE_MOCK_DATA = true; 

// URL de base lue depuis le .env pour le mode production
// Le .env doit contenir VITE_API_URL=http://localhost:8000
const API_BASE_URL = import .env.VITE_API_URL || 'http://localhost:8000';

/**
 * Fonction principale de recherche d'articles.
 * Elle utilise soit les données mockées, soit l'API réelle.
 * @param query Le texte de la requête de l'utilisateur.
 * @returns Une promesse qui résout vers un tableau d'articles.
 */
export const searchArticles = async (query: string): Promise<Article[]> => {
  if (USE_MOCK_DATA) {
    // --- MODE MOCKÉ ---
    console.log(`[MOCK] Simulation de recherche pour: "${query}"`);
    
    // 1. Simuler le délai réseau (500ms) pour une meilleure expérience utilisateur
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // 2. Simuler un filtre simple (recherche du mot-clé dans le titre)
    // S'il n'y a pas de requête (query vide), on renvoie tout.
    const lowerCaseQuery = query.toLowerCase();

    return MOCK_RESULTS.filter(article => 
        article.title.toLowerCase().includes(lowerCaseQuery) || lowerCaseQuery.length === 0
    );

  } else {
    // --- MODE PRODUCTION (Axios) ---
    console.log(`[AXIOS] Requête réelle vers: ${API_BASE_URL}/search pour: "${query}"`);

    try {
      // 1. Envoi de la requête POST à FastAPI
      const response = await axios.post(`${API_BASE_URL}/search`, { query });
      
      // 2. Retourne les données (TypeScript vérifie que c'est un tableau d'Articles)
      return response.data as Article[]; 
      
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API de recherche:", error);
      // En cas d'échec de l'API, on renvoie un tableau vide
      return []; 
    }
  }
};