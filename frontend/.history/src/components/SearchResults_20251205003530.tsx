import React, { useState, useEffect } from 'react';
import { Article, SearchFilters } from '../types';
import { searchArticles } from '../services/api';
import ArticleCard from './ArticleCard';
import ssLogo from '../assets/SemanticSearch.png';

const SearchResults: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

  const handleSearch = async (searchQuery: string = query, author: string = authorFilter, year: string = yearFilter) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchedQuery(searchQuery);
    setCurrentPage(1);

    try {
      const filters: SearchFilters = {
        author: author.trim() === '' ? null : author.trim(),
        year: year.trim() === '' ? null : parseInt(year)
      };
      
      const data = await searchArticles(searchQuery, filters);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('', '', '');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleReset = () => {
    setQuery('');
    setAuthorFilter('');
    setYearFilter('');
    handleSearch('', '', '');
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentArticles = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
    {/* Header avec logo en haut à gauche et barre de recherche */}
   {/* Header avec logo et barre de recherche sur la même ligne */}
<div style={{ backgroundColor: '#30ece0ff' }} className="w-full sticky top-0 z-10 shadow-lg">
  <div style={{ 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    gap: '40px'
  }}>
    {/* Logo à gauche */}
    <img 
      src={ssLogo} 
      alt="Logo" 
      style={{ 
        height: '230px',
        width: 'auto',
        flexShrink: 0
      }} 
    />

    {/* Search Form au milieu/droite - garde le même style */}
    <div style={{ 
      flex: 1,
      display: 'flex', 
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '900px'
    }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '4px',
          boxShadow: '0 1px 6px rgba(32, 33, 36, 0.28)',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '16px',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              backgroundColor: '#17a2b8',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            Search
          </button>
        </div>
      </form>

      {/* Filtres en dessous */}
      <div style={{ 
        display: 'flex', 
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <input
          type="text"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          placeholder="Filter by author"
          style={{
            padding: '10px 16px',
            fontSize: '14px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            outline: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: '200px'
          }}
        />
        
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          style={{
            padding: '10px 16px',
            fontSize: '14px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            outline: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            cursor: 'pointer',
            width: '150px'
          }}
        >
          <option value="">All Years</option>
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#5f6368',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</div>

      {/* Separator bar with result count */}
      {hasSearched && !isLoading && (
        <div style={{ 
          borderBottom: '1px solid #dfe1e5',
          backgroundColor: '#f8f9fa',
          padding: '12px 0'
        }}>
          <div style={{ 
           maxWidth: '10000px',  // ✅ Ajustez cette valeur (700px, 800px, 900px, 1000px)
           margin: '0 auto', 
           padding: '0 16px' 
           }}>
            <p className="text-sm text-gray-600" style={{ paddingLeft: '10px' }}>
              About {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ 
       maxWidth: '1200px',  // ✅ Même valeur que ci-dessus
       margin: '0 auto', 
       padding: '24px 16px' 
      }}>
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Table header */}
            {hasSearched && results.length > 0 && (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '80px 200px 1fr 80px',
                gap: '16px',
                padding: '12px 0',
                borderBottom: '2px solid #17a2b8',
                fontWeight: '600',
                fontSize: '14px',
                color: '#0a2540'
              }}>
                <div style={{ paddingLeft: '10px' }}>Year</div>
                <div>Authors</div>
                <div>Article</div>
                <div style={{ textAlign: 'center' }}>Info</div>
              </div>
            )}

            {/* No results message */}
            {hasSearched && results.length === 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px',
                textAlign: 'center'
              }}>
                {/* Icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  border: '3px solid #17a2b8'
                }}>
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#0a2540" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </div>

                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '500',
                  color: '#0a2540',
                  margin: '0 0 12px 0'
                }}>
                  No results found
                </h3>

                {searchedQuery && (
                  <p style={{
                    fontSize: '16px',
                    color: '#5f6368',
                    margin: '0 0 20px 0'
                  }}>
                    Your search for <strong style={{ color: '#17a2b8' }}>"{searchedQuery}"</strong> did not match any articles
                  </p>
                )}

                <div style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '20px 24px',
                  maxWidth: '500px',
                  marginTop: '12px',
                  border: '1px solid #17a2b8'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#0a2540',
                    margin: '0 0 12px 0',
                    fontWeight: '600'
                  }}>
                    Suggestions:
                  </p>
                  <ul style={{
                    textAlign: 'left',
                    margin: '0',
                    padding: '0 0 0 20px',
                    fontSize: '14px',
                    color: '#5f6368',
                    lineHeight: '1.8'
                  }}>
                    <li>Check your spelling</li>
                    <li>Try more general keywords</li>
                    <li>Try different keywords</li>
                    <li>Remove year or author filters</li>
                  </ul>
                </div>

                <button
                  onClick={handleReset}
                  style={{
                    marginTop: '24px',
                    padding: '12px 32px',
                    fontSize: '15px',
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#138496';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#17a2b8';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
                  }}
                >
                  Show all articles
                </button>
              </div>
            )}

            {/* Articles list */}
            {currentArticles.map((article) => (
              <div key={article.rank} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <ArticleCard article={article} />
              </div>
            ))}

            {/* Pagination */}
            {results.length > 0 && totalPages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '8px',
                marginTop: '32px',
                paddingBottom: '32px'
              }}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    backgroundColor: currentPage === 1 ? '#f0f0f0' : 'white',
                    color: currentPage === 1 ? '#999' : '#17a2b8',
                    border: '1px solid #dfe1e5',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      backgroundColor: currentPage === pageNum ? '#17a2b8' : 'white',
                      color: currentPage === pageNum ? 'white' : '#17a2b8',
                      border: '1px solid #dfe1e5',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: currentPage === pageNum ? '600' : '500'
                    }}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    backgroundColor: currentPage === totalPages ? '#f0f0f0' : 'white',
                    color: currentPage === totalPages ? '#999' : '#17a2b8',
                    border: '1px solid #dfe1e5',
                    borderRadius: '4px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200" style={{ backgroundColor: '#0a2540' }}>
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm" style={{ color: '#17a2b8' }}>
          SemanticSciSearch - Semantic search for scientific articles in AI and Medicine
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;