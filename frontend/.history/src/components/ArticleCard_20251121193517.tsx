import React from 'react';
// Importe l'interface Article depuis ton dossier types
import { Article } from '../types'; 

// 1. Définit les props que le composant attend
interface ArticleCardProps {
  article: Article;
}

// Composant fonctionnel principal
const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  
  // Fonction utilitaire pour limiter l'abstract aux trois premières lignes
  // (Une approximation simple, basée sur les sauts de ligne ou une limite de mots)
  const getExcerpt = (abstract: string) => {
    // Dans cet exemple simple, nous limitons à une phrase ou une limite arbitraire
    const limit = 00; 
    if (abstract.length > limit) {
      return abstract.substring(0, limit) + '...';
    }
    return abstract;
  };

  // Calcule le score en pourcentage pour un affichage lisible
  // Si le score est entre 0 et 1, on le multiplie par 100
  const scorePercent = (article.score * 100).toFixed(1);
  
  // Détermine la couleur en fonction du score pour un retour visuel rapide
  const scoreColor = article.score > 0.7 ? 'text-green-600' : article.score > 0.4 ? 'text-yellow-600' : 'text-red-600';
  
  return (
    // L'élément est enveloppé dans un lien (<a>) utilisant pdf_url pour être cliquable.
    // target="_blank" ouvre le PDF dans un nouvel onglet, selon ta décision temporaire.
    <a 
      href={article.pdf_url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-white mb-4"
    >
      <div className="flex justify-between items-start">
        {/* Titre de l'article */}
        <h3 className="text-xl font-semibold text-blue-700 hover:text-blue-800">
          {article.title}
        </h3>
        
        {/* Score de similarité */}
        <span className={`ml-4 flex-shrink-0 font-bold ${scoreColor}`}>
          {scorePercent}%
        </span>
      </div>

      {/* Extrait du résumé */}
      <p className="mt-2 text-gray-600 text-sm">
        {getExcerpt(article.abstract)}
      </p>

      {/* Petite note pour indiquer que c'est le lien complet */}
      <p className="mt-2 text-xs text-gray-400">
        Cliquez pour lire l'intégralité du document (PDF)
      </p>
    </a>
  );
};

export default ArticleCard;