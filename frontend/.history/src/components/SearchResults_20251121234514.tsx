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
      const sortedData = [...data].sort((a, b) => b.score - a.score);
      setResults(sortedData);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* BARRE JAUNE EN HAUT */}
      <div style={{ backgroundColor: '#fbbf24', height: '30px' }} className="w-full"></div>

      {/* En-tête avec fond bleu */}
      <div style={{ backgroundColor: '#3883c5ff' }} className="w-full sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-8">
            {/* Espace gauche */}
            <div className="flex-1"></div>
            
            {/* Zone de recherche centrée - Directement sur le fond bleu */}
            <div className="flex-1 max-w-3xl flex items-center justify-center">
              <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
                {/* Input de recherche */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher des articles scientifiques..."
                  className="flex-1 outline-none border-none"
                  style={{
                    padding: '12px 40px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    border: '1px solid #dfe1e5'
                  }}
                />
                
                {/* Bouton de recherche avec icône loupe */}
                <button
                  type="submit"
                  className="flex items-center justify-center transition-colors"
                  style={{
                    padding: '10px 10px',
                    backgroundColor: 'white',
                    border: '1px solid #dfe1e5',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  {/* Icône loupe SVG */}
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#5f6368"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </form>
            </div>

            {/* Logo à droite */}
            <div className="flex-1 flex justify-end">
              <img 
                src="/fleur.png" 
                alt="Logo" 
                className="object-contain"
                style={{ width: '60px', height: '60px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {hasSearched && !isLoading && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Environ {results.length} résultat{results.length !== 1 ? 's' : ''}
              {query && ` pour "${query}"`}
            </p>
            
            <div className="text-xs text-gray-500">
              Trié par pertinence
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Recherche en cours...</p>
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="bg-white">
            {results.length > 0 ? (
              results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              hasSearched && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    Aucun résultat trouvé pour "{query}"
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Essayez avec d'autres mots-clés
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          SemanticSciSearch - Recherche sémantique d'articles scientifiques en IA et Cardiologie
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;