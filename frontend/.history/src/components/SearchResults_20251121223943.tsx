import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { searchArticles } from '../services/api';
import ArticleCard from './ArticleCard';

const SearchResults: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchQuery: string = query) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await searchArticles(searchQuery);
      // TRI PAR SCORE DÉCROISSANT (plus pertinent en premier)
      const sortedData = [...data].sort((a, b) => b.score - a.score);
      setResults(sortedData);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Recherche initiale au chargement
  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* En-tête avec fond bleu ciel */}
      <div className="bg-sky-1000 sticky top-10 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-6">
            {/* Espace vide à gauche pour centrer la barre */}
            <div className="flex-1"></div>
            
            {/* Barre de recherche au centre - Plus grande et entourée en jaune */}
            <form onSubmit={handleSubmit} className="flex-1 max-w-3xl">
              <div className="flex border-4 border-yellow-400 rounded-lg shadow-xl bg-white">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher des articles scientifiques..."
                  className="flex-grow px-6 py-4 text-lg rounded-l-lg outline-none"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  🔍 Rechercher
                </button>
              </div>
            </form>

            {/* Logo fleur.png à droite */}
            <div className="flex-1 flex justify-end">
              <img 
                src="/fleur.png" 
                alt="Logo" 
                className="h-50 w-50 object-contain"
              />
            </div>
          </div>

          {/* Titre sous la barre de recherche */}
          <h1 className="text-3xl font-bold text-center text-white mt-4">
            SemanticSciSearch
          </h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Barre d'informations */}
        {hasSearched && !isLoading && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Environ <strong>{results.length}</strong> résultat{results.length > 1 ? 's' : ''}
              {query && (
                <span> pour <strong>"{query}"</strong></span>
              )}
              <span className="ml-2 text-xs text-gray-500">(triés par pertinence)</span>
            </p>
            
            {/* Options de tri */}
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-blue-700">Par pertinence</span>
            </div>
          </div>
        )}

        {/* Indicateur de chargement */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 text-sm">Recherche sémantique en cours...</p>
            </div>
          </div>
        )}

        {/* Liste des résultats */}
        {!isLoading && (
          <div className="bg-white">
            {results.length > 0 ? (
              results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              hasSearched && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 text-lg">Aucun résultat trouvé</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Essayez avec des mots-clés différents
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Footer simple */}
      <footer className="mt-12 border-t border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          SemanticSciSearch - Recherche sémantique d'articles scientifiques en IA et Cardiologie
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;