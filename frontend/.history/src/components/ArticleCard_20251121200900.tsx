import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const scorePercent = (article.score * 100).toFixed(0);
  
  return (
    <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
      {/* Titre cliquable comme Google Scholar */}
      <h3 className="text-xl mb-1">
        <a 
          href={article.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800 hover:underline font-normal visited:text-purple-800"
        >
          {article.title}
        </a>
      </h3>
      
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
          href={article.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
          Cliquer ici pour voir le PDF
        </a>
        
        {/* ID de l'article */}
        <span className="text-gray-400 text-xs ml-auto">
          Article #{article.id}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;