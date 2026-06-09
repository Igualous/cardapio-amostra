import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Buscar prato...',
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative mb-8">
      <div className="relative flex items-center">
        <Search
          className="absolute left-4 text-gray-400 pointer-events-none"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
