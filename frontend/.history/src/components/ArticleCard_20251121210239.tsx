import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const scorePercent = (article.score * 100).toFixed(0);
  
  return (
    <div className="border-b border-gray-200 py-3 hover:bg-gray-50 transition-colors">
      {/* Titre cliquable comme Google Scholar */}
      <h3 className="text-xl mb-1">
        <a 
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800 hover:underline font-normal visited:text-purple-800"
        >
          {article.title}
        </a>
      </h3>
      
      {/* Auteurs et année */}
      <p className="text-sm text-gray-600 mb-2">
        {article.authors} - <span className="font-medium">{article.year}</span>
      </p>
      
      {/* Résumé */}
      <p className="text-sm text-gray-700 leading-relaxed mb-2">
        {article.abstract}
      </p>
      
      {/* Métadonnées et actions */}
      <div className="flex items-center gap-4 text-sm">
        {/* Score de pertinence */}
        <span className="text-gray-600">
          <span className="font-semibold">Pertinence:</span>{' '}
          <span className={`font-bold ${
            article.score > 0.8 ? 'text-green-600' : 
            article.score > 0.5 ? 'text-yellow-600' : 
            'text-gray-500'
          }`}>
            {scorePercent}%
          </span>
        </span>
        
        {/* Séparateur */}
        <span className="text-gray-400">•</span>
        
        {/* Lien PDF */}
        <a 
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          [PDF]
        </a>
        
        {/* Séparateur */}
        <span className="text-gray-400">•</span>
        
        {/* ID de l'article */}
        <span className="text-gray-400 text-xs">
          Article #{article.id}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;