import React from 'react';
import { Article } from '../types';

interface SearchResultsProps {
  articles: Article[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ articles }) => {
  return (
    <div>
      {articles.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.abstract}</p>
              <p>Similarity Score: {article.similarityScore}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;