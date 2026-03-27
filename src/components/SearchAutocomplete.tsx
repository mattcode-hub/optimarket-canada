'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Clock, X } from 'lucide-react';
import { Listing } from '@/types';

interface SearchAutocompleteProps {
  listings: Listing[];
  onSelect?: (listing: Listing) => void;
}

export default function SearchAutocomplete({ listings, onSelect }: SearchAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Simulated popular searches - in production, these could come from analytics
  const popularSearches = [
    'Phoropter',
    'Autorefractor',
    'Tonometer',
    'Ophthalmoscope',
    'Slit lamp',
  ];

  // Get recent searches from localStorage
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  // Filter suggestions
  const getFilteredSuggestions = () => {
    if (!query.trim()) {
      return [];
    }

    const queryLower = query.toLowerCase();
    return listings.filter(listing =>
      listing.title.toLowerCase().includes(queryLower) ||
      listing.category.toLowerCase().includes(queryLower) ||
      listing.brand.toLowerCase().includes(queryLower) ||
      listing.seller.name.toLowerCase().includes(queryLower)
    ).slice(0, 5);
  };

  const suggestions = getFilteredSuggestions();

  // Show dropdown when there's query or when focused without query
  const showDropdown = isOpen && (query.trim() || suggestions.length === 0);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && e.key !== 'ArrowDown') return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectListing(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectListing = (listing: Listing) => {
    addRecentSearch(listing.title);
    if (onSelect) {
      onSelect(listing);
    }
    setQuery('');
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (query.trim()) {
      addRecentSearch(query);
      // Redirect to search page
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  const addRecentSearch = (search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const removeRecentSearch = (e: React.MouseEvent, search: string) => {
    e.preventDefault();
    const updated = recentSearches.filter(s => s !== search);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search listings..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-neutral-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-lg"
        >
          {/* Filtered Suggestions */}
          {suggestions.length > 0 && (
            <>
              <div className="border-b border-neutral-100">
                {suggestions.map((listing, index) => (
                  <Link
                    key={listing.id}
                    href={`/listing/${listing.id}`}
                    onClick={() => handleSelectListing(listing)}
                    className={`block border-b border-neutral-100 px-4 py-3 transition-colors last:border-b-0 ${
                      index === selectedIndex ? 'bg-primary-50' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <p className="line-clamp-1 font-medium text-neutral-900">{listing.title}</p>
                    <p className="text-xs text-neutral-500">
                      {listing.category} • ${listing.price.toFixed(2)}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <>
              <div className="border-b border-neutral-100 px-4 py-3">
                <p className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
                  <Clock className="h-3 w-3" />
                  Recent Searches
                </p>
              </div>
              <div>
                {recentSearches.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => {
                      addRecentSearch(search);
                      window.location.href = `/search?q=${encodeURIComponent(search)}`;
                    }}
                    className={`w-full border-b border-neutral-100 px-4 py-3 text-left transition-colors last:border-b-0 ${
                      index === selectedIndex ? 'bg-primary-50' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-neutral-700">{search}</span>
                      <button
                        onClick={(e) => removeRecentSearch(e, search)}
                        className="text-neutral-400 transition-colors hover:text-neutral-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Popular Searches */}
          {!query && (
            <>
              <div className="border-b border-neutral-100 px-4 py-3">
                <p className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
                  <TrendingUp className="h-3 w-3" />
                  Popular Searches
                </p>
              </div>
              <div>
                {popularSearches.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => {
                      addRecentSearch(search);
                      window.location.href = `/search?q=${encodeURIComponent(search)}`;
                    }}
                    className={`w-full border-b border-neutral-100 px-4 py-3 text-left text-sm transition-colors last:border-b-0 ${
                      index === selectedIndex ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {suggestions.length === 0 && query && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-neutral-500">No listings found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
