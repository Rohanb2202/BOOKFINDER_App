import React, { useState } from 'react';

const SearchForm = ({ searchText }) => {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('Search for books'); // Initial placeholder

  const handleSearch = () => {
    if (!query.trim()) {
      setPlaceholder("Please type something before searching!"); // Set temporary placeholder
    } else {
      setPlaceholder('Search for books'); // Reset placeholder
      searchText(query); // Pass the search query to update `term`
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (placeholder !== 'Search for books') {
      setPlaceholder('Search for books'); // Reset placeholder when user starts typing
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder} // Dynamic placeholder
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchForm;
