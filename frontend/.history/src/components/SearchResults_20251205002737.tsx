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
  {/* Header avec logo + barre sur la même ligne */}
  <div
    style={{ backgroundColor: '#30ece0ff' }}
    className="w-full sticky top-0 z-10 shadow-lg"
  >
    <div className="flex items-center gap-8 px-8 py-6">
      {/* Logo à gauche */}
      <img
        src={ssLogo}
        alt="Logo"
        className="h-16 w-auto"
      />

      {/* Barre de recherche centrée dans l’espace restant */}
      <div className="flex-1 flex justify-center">
        <form className="flex w-full max-w-4xl gap-3">
          <input
            type="text"
            placeholder="Search scientific articles..."
            className="flex-1 rounded-lg px-4 py-3 shadow"
          />
          <input
            type="text"
            placeholder="Author"
            className="w-48 rounded-lg px-4 py-3 shadow"
          />
          {/* tes autres champs / boutons ici */}
        </form>
      </div>
    </div>
  </div>
</div>

        {/* Search Form */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 16px 24px 16px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '1000px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search scientific articles..."
              style={{
                flex: '1 1 300px',
                padding: '12px 16px',
                fontSize: '16px',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                border: '1px solid #0dc5b9',
                outline: 'none'
              }}
            />
            
            {/* Author filter */}
            <input
              type="text"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              placeholder="Author"
              style={{
                width: '150px',
                padding: '12px 16px',
                fontSize: '14px',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                border: '1px solid #0dc5b9',
                outline: 'none'
              }}
            />
            
            {/* Year dropdown filter */}
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              style={{
                width: '120px',
                padding: '12px 16px',
                fontSize: '14px',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                border: '1px solid #0dc5b9',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">All Years</option>
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            
            {/* Submit button */}
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#0dc5b9',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0dc5b9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0dc5b9'}
            >
              Search
            </button>

            {/* Reset button */}
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#5f6368',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3c4043'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5f6368'}
            >
              Reset
            </button>
          </form>
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