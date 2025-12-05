import React, { useState, useEffect } from 'react';
import { Article, SearchFilters } from '../types';
import { searchArticles } from '../services/api';
import ArticleCard from './ArticleCard';

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

  // Generate year options (from current year back to 1990)
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
      {/* Yellow bar */}
      <div style={{ backgroundColor: '#e2d810', height: '30px' }} className="w-full"></div>

      {/* Blue header with search form */}
      <div style={{ backgroundColor: '#12a4d9' }} className="w-full sticky top-0 z-10 shadow-lg">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px 16px' }}>
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
                border: '1px solid #322e2f',
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
                border: '1px solid #322e2f',
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
                border: '1px solid #322e2f',
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
                backgroundColor: '#1a73e8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1557b0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a73e8'}
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
          <div className="max-w-5xl mx-auto px-4" style={{ paddingLeft: '10px' }}>
            <p className="text-sm text-gray-600">
              About {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
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
                borderBottom: '2px solid #dfe1e5',
                fontWeight: '600',
                fontSize: '14px',
                color: '#5f6368'
              }}>
                <div style={{ paddingLeft: '10px' }}>Year</div>
                <div>Authors</div>
                <div>Article</div>
                <div style={{ textAlign: 'center' }}>PDF</div>
              </div>
            )}

            {/* Articles list */}
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
      border: '3px solid #e8f0fe'
    }}>
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#5f6368" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    </div>

    {/* Main message */}
    <h3 style={{
      fontSize: '24px',
      fontWeight: '500',
      color: '#202124',
      margin: '0 0 12px 0'
    }}>
      No results found
    </h3>

    {/* Query display */}
    {searchedQuery && (
      <p style={{
        fontSize: '16px',
        color: '#5f6368',
        margin: '0 0 20px 0'
      }}>
        Your search for <strong style={{ color: '#1a73e8' }}>"{searchedQuery}"</strong> did not match any articles
      </p>
    )}

    {/* Suggestions */}
    <div style={{
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '20px 24px',
      maxWidth: '500px',
      marginTop: '12px'
    }}>
      <p style={{
        fontSize: '14px',
        color: '#5f6368',
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

    {/* Reset button */}
    <button
      onClick={handleReset}
      style={{
        marginTop: '24px',
        padding: '12px 32px',
        fontSize: '15px',
        backgroundColor: '#1a73e8',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1557b0';
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1a73e8';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
      }}
    >
      Show all articles
    </button>
  </div>
)}

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
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    backgroundColor: currentPage === 1 ? '#f0f0f0' : 'white',
                    color: currentPage === 1 ? '#999' : '#1a73e8',
                    border: '1px solid #dfe1e5',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Previous
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      backgroundColor: currentPage === pageNum ? '#1a73e8' : 'white',
                      color: currentPage === pageNum ? 'white' : '#1a73e8',
                      border: '1px solid #dfe1e5',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: currentPage === pageNum ? '600' : '500'
                    }}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    backgroundColor: currentPage === totalPages ? '#f0f0f0' : 'white',
                    color: currentPage === totalPages ? '#999' : '#1a73e8',
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
      <footer className="mt-12 border-t border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          SemanticSciSearch - Semantic search for scientific articles in AI and Medicine (cardiac, cancer, diabetes, respiratory)
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;