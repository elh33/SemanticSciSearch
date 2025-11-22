// Exemple d'utilisation dans SearchResults.tsx (ou dans App.tsx)

import React, { useState } from 'react';
import { searchArticles } from '../services/api';
import { Article } from './types';

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const data = await searchArticles(query); // <-- Appel de la fonction abstraite
      setResults(data);
    } catch (error) {
      console.error("Erreur de recherche:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (Code JSX pour la SearchBar et l'affichage des résultats)
};