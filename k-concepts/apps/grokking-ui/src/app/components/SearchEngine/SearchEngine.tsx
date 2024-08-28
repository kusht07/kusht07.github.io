import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const SearchEngine: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simplified debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 500); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSuggestions = async (query: string) => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      setSuggestions(data.products.map((product: Product) => product.title));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-primary-600 text-center">Search Engine</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex items-center flex-col">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your search query"
              className="w-full p-3 border-2 border-primary-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-primary-300 rounded-lg mt-1 shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-primary-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>
      {searchResults.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">Search Results:</h2>
          <ul className="space-y-3">
            {searchResults.map((product) => (
              <li key={product.id} className="p-3 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-primary-600 font-medium mt-2">Price: ${product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchEngine;