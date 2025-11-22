import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { Article } from './types';

const App: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Article[]>([]);

    const handleSearch = async (searchQuery: string) => {
        setQuery(searchQuery);
        // Call the API to fetch search results based on the query
        // Update the results state with the fetched data
    };

    return (
        <div>
            <h1>Semantic Sci Search</h1>
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={results} />
        </div>
    );
};

export default App;