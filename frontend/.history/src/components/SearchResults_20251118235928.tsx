import React, { useState, FormEvent } from 'react';
import { Article } from '../types';
import { searchArticles } from '../services/api'; 
import ArticleCard from './ArticleCard'; // Importe ton composant créé précédemment

// Définition d'un composant de base pour la barre de recherche (à affiner dans SearchBar.tsx)
const SearchBar: React.FC<{ query: string, setQuery: (q: string) => void, onSearch: () => void }> = ({ query, setQuery, onSearch }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="flex w-full max-w-2xl mx-auto mb-10">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Recherchez par sens (ex: IA pour maladies du cœur)..."
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
            type="submit" 
            className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition duration-150"
        >
            Rechercher
        </button>
    </form>
);

const SearchResults: React.FC = () => {
    // 1. Définition des états nécessaires (mémoire du composant)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); // Pour savoir si on a lancé une recherche

    // 2. Fonction de gestion de la recherche
    const handleSearch = async () => {
        if (query.trim() === '' && hasSearched) {
            // Ne relance pas la recherche si la requête est vide après une première recherche
            return;
        }

        setIsLoading(true); // Active l'indicateur de chargement
        setHasSearched(true); 

        try {
            // Appel au service API (mode mocké grâce à l'interrupteur dans api.ts)
            const data = await searchArticles(query); 
            setResults(data); // Met à jour les résultats
        } catch (error) {
            console.error("Erreur lors de la recherche:", error);
            setResults([]);
        } finally {
            setIsLoading(false); // Désactive l'indicateur
        }
    };
    
    // Pour lancer une recherche par défaut lors du premier montage (avec requête vide)
    // Utile pour afficher tous les articles mockés au début.
    React.useEffect(() => {
        handleSearch();
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

            {/* Barre de Recherche (Rappel de la requête) */}
            <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

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
                    // Utilise la clé 'id' pour aider React à gérer la liste
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