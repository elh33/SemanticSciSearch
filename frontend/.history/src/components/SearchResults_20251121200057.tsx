import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { searchArticles } from '../services/api'; 
import ArticleCard from './ArticleCard';
import SearchBar from './SearchBar'; // Importation du composant SearchBar

const SearchResults: React.FC = () => {
    // 1. Définition des états nécessaires (mémoire du composant)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // 2. Fonction de gestion de la recherche
    // Elle est maintenant appelée par SearchBar lorsqu'une recherche est soumise.
    const handleSearch = async (newQuery: string) => {
        // Met à jour la requête dans l'état de ce composant conteneur
        setQuery(newQuery);

        if (newQuery.trim() === '' && hasSearched) {
            // Ne relance pas la recherche si la requête est vide et qu'on a déjà cherché
            return;
        }

        setIsLoading(true);
        setHasSearched(true); 

        try {
            // Appel au service API (mode mocké)
            const data = await searchArticles(newQuery); 
            setResults(data); 
        } catch (error) {
            console.error("Erreur lors de la recherche:", error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Pour lancer une recherche par défaut lors du premier montage (requête vide)
    React.useEffect(() => {
        // Lance la recherche initiale (pour charger tous les mocks)
        handleSearch('');
    }, []);

    const resultCount = results.length;

    // 3. Rendu du composant
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            {/* Titre et Sous-titre */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">
                SemanticSciSearch
            </h1>
            <p className="text-center text-gray-500 mb-10 mt-2">
                Recherchez par sens, pas par mots-clés. 🧠
            </p>

            {/* Intégration du composant SearchBar */}
            {/* On lui passe la fonction de rappel handleSearch */}
            <SearchBar initialQuery={query} onSearch={handleSearch} />

            {/* Affichage des états de la recherche */}
            {isLoading && (
                <p className="text-center text-blue-600 mt-4">
                    Recherche sémantique en cours...
                </p>
            )}

            {!isLoading && hasSearched && (
                <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">
                    {resultCount} {resultCount > 1 ? 'Résultats' : 'Résultat'} trouvé{resultCount > 1 ? 's' : ''}
                </h2>
            )}

            {/* Affichage des Résultats */}
            <div className="space-y-4">
                {!isLoading && results.map(article => (
                    <ArticleCard key={article.id} article={article} /> 
                ))}

                {/* Gestion des résultats vides */}
                {!isLoading && hasSearched && resultCount === 0 && (
                    <p className="text-center text-gray-500 mt-8">
                        Aucun article correspondant n'a été trouvé.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;