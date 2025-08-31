// src/components/SearchBar.jsx
import { useState } from 'react';
import axios from 'axios';

function SearchBar({ setResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${query}`);
      setResults(response.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter product name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
