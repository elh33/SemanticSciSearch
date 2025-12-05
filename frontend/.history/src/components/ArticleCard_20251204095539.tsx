import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Convert score: if score is > 1, use (1 - score) * 100, else use score * 100
  const scorePercent = article.score > 1 
    ? ((article.score - 1) * 100).toFixed(0)
    : (article.score * 100).toFixed(0);
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '80px 200px 1fr 80px',
      gap: '16px',
      padding: '16px 0',
      alignItems: 'start'
    }}>
      {/* Column 1: Year */}
      <div style={{ 
        fontSize: '14px', 
        color: '#5f6368',
        fontWeight: '500',
        paddingLeft: '10px'
      }}>
        {article.year}
      </div>
      
      {/* Column 2: Authors */}
      <div style={{ 
        fontSize: '14px', 
        color: '#5f6368',
        lineHeight: '1.4'
      }}>
        {article.authors}
      </div>
      
      {/* Column 3: Article (Title + Keywords + Best Sentence + Relevance) */}
      <div>
        {/* Title */}
        <h3 style={{ margin: '0 0 4px 0' }}>
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
        
        {/* Keywords with label */}
        <div style={{ 
          margin: '4px 0 8px 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '13px',
            color: '#5f6368',
            fontWeight: '500'
          }}>
            Keywords:
          </span>
          {article.keywords.map((keyword, index) => (
            <span
              key={index}
              style={{
                fontSize: '12px',
                color: '#1a73e8',
                backgroundColor: '#e8f0fe',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: '500'
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
        
        {/* Best Sentence */}
        <p style={{ 
          margin: '0 0 8px 0',
          fontSize: '14px',
          color: '#545454',
          lineHeight: '1.5'
        }}>
          {article.best_sentence}
        </p>
        
        {/* Relevance */}
        <div style={{ 
          fontSize: '13px',
          color: '#1a73e8',
          fontWeight: '500'
        }}>
          Relevance: {scorePercent}%
        </div>
      </div>
      
      {/* Column 4: PDF Link */}
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