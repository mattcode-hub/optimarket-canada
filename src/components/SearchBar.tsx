'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  fullWidth?: boolean;
}

const CATEGORY_SUGGESTIONS = [
  'Phoropters',
  'Slit Lamps',
  'Tonometers',
  'Lens Meters',
  'Trial Frames',
  'Autorefractors',
  'Ophthalmoscopes',
  'Retinoscopes',
];

export default function SearchBar({
  placeholder = 'Search equipment...',
  onSearch,
  fullWidth = true,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim()) {
      const filtered = CATEGORY_SUGGESTIONS.filter((cat) =>
        cat.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      if (onSearch) {
        onSearch(finalQuery);
      } else {
        router.push(`/browse?q=${encodeURIComponent(finalQuery)}`);
      }
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${fullWidth ? 'w-full' : 'w-96'}`}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          onFocus={() => {
            if (query.trim()) {
              setShowSuggestions(true);
            }
          }}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 pl-10 text-sm placeholder-neutral-500 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />

        <Search className="absolute left-3 h-4 w-4 text-neutral-400" />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            className="absolute right-3 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-neutral-200 bg-white shadow-lg z-50">
          <ul className="py-2">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors flex items-center gap-2"
                >
                  <Search className="h-4 w-4 text-neutral-400" />
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
