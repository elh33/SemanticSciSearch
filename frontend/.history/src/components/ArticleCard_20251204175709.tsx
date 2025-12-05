import React, { useState } from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [showAbstract, setShowAbstract] = useState(false);
  
  const scorePercent = article.score > 1 
    ? ((article.score - 1) * 100).toFixed(0)
    : (article.score * 100).toFixed(0);
  
  return (
    <>
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
        
        {/* Column 4: Info Icon */}
        <div style={{ 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center'
        }}>
          {/* Abstract Info Button */}
          <button
            onClick={() => setShowAbstract(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="View Abstract"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#1a73e8" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
          
          {/* PDF Link */}
          <a 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1a0dab',
              fontSize: '13px',
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

      {/* Abstract Modal */}
      {showAbstract && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setShowAbstract(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Modal Content */}
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                position: 'relative'
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid #e8e8e8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 1
              }}>
                <h2 style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '500',
                  color: '#202124',
                  flex: 1,
                  paddingRight: '16px'
                }}>
                  {article.title}
                </h2>
                <button
                  onClick={() => setShowAbstract(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '28px',
                    cursor: 'pointer',
                    color: '#5f6368',
                    padding: '0',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f4'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div style={{
                padding: '24px'
              }}>
                {/* Authors and Year */}
                <div style={{
                  marginBottom: '16px',
                  fontSize: '14px',
                  color: '#5f6368'
                }}>
                  <strong>{article.authors}</strong> ({article.year})
                </div>

                {/* Keywords */}
                <div style={{
                  marginBottom: '20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {article.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: '12px',
                        color: '#1a73e8',
                        backgroundColor: '#e8f0fe',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: '500'
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Abstract Title */}
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#202124',
                  marginBottom: '12px'
                }}>
                  Abstract
                </h3>

                {/* Abstract Text */}
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: '#3c4043',
                  textAlign: 'justify',
                  margin: 0
                }}>
                  {article.abstract}
                </p>

                {/* PDF Link */}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #e8e8e8',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#1a73e8',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '500',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1557b0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a73e8'}
                  >
                    View Full Paper (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ArticleCard;