import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const scorePercent = (article.score * 100).toFixed(0);
  
  // Tronquer l'abstract aux 2 premières lignes (environ 150 caractères)
  const truncatedAbstract = article.abstract.length > 150 
    ? article.abstract.substring(0, 150) + '...' 
    : article.abstract;
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '80px 200px 1fr 80px',
      gap: '16px',
      padding: '16px 0',
      alignItems: 'start'
    }}>
      {/* Colonne 1: Année */}
      <div style={{ 
        fontSize: '14px', 
        color: '#5f6368',
        fontWeight: '500'
      }}>
        {article.year}
      </div>
      
      {/* Colonne 2: Auteurs */}
      <div style={{ 
        fontSize: '14px', 
        color: '#5f6368',
        lineHeight: '1.4'
      }}>
        {article.authors}
      </div>
      
      {/* Colonne 3: Article (Titre + Abstract + Pertinence) */}
      <div>
        {/* Titre cliquable en bleu */}
        <h3 style={{ margin: '0 0 8px 0' }}>
          <a 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1a0dab',
              fontSize: '18px',
              textDecoration: 'none',
              fontWeight: '400'
            }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            {article.title}
          </a>
        </h3>
        
        {/* Abstract tronqué */}
        <p style={{ 
          margin: '0 0 8px 0',
          fontSize: '14px',
          color: '#545454',
          lineHeight: '1.5'
        }}>
          {truncatedAbstract}
        </p>
        
        {/* Pertinence en bleu */}
        <div style={{ 
          fontSize: '13px',
          color: '#1a73e8',
          fontWeight: '500'
        }}>
          Pertinence: {scorePercent}%
        </div>
      </div>
      
      {/* Colonne 4: Lien PDF */}
      <div style={{ textAlign: 'center' }}>
        <a 
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#1a0dab',
            fontSize: '14px',
            textDecoration: 'none',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          [PDF]
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;