import axios from 'axios';
import { Article, SearchResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust the base URL as needed

import { Article, SearchQuery } from '../types'; 
// Tu devras définir SearchQuery si tu veux typer la requête utilisateur

// Importe la bibliothèque pour les requêtes HTTP
// Tu devras faire 'npm install axios' si ce n'est pas déjà fait
import axios from 'axios'; 
import { MOCK_RESULTS } from '../data/mockData';

// 💡 L'INTERRUPTEUR MAGIQUE !
// Quand le Back-End est prêt, tu passes cette variable à false (ou tu la supprimes)
const USE_MOCK_DATA = true; 

// URL de base de l'API (lue depuis le .env)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// -------------------------------------------------------------
// La seule fonction que les composants Front-End appellent
// -------------------------------------------------------------

export const searchArticles = async (query: string): Promise<Article[]> => {
  if (USE_MOCK_DATA) {
    // --- MODE MOCKÉ (Facile à remplacer) ---
    console.log(`[MOCK] Simulation de recherche pour: ${query}`);
    
    // Simule le délai d'une requête réseau (pour éviter que l'affichage soit instantané)
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // Simule le filtrage par pertinence si tu veux, sinon tu renvoies tout
    return MOCK_RESULTS.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) || query.length === 0
    );

  } else {
    // --- MODE PRODUCTION (Une fois le Back-End prêt) ---
    console.log(`[AXIOS] Requête vers l'API réelle pour: ${query}`);

    const response = await axios.post(`${API_BASE_URL}/search`, { query });
    
    // Le Back-End doit renvoyer un tableau d'objets Article
    return response.data as Article[]; 
  }
};



