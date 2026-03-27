'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Listing } from '@/types';

interface RecentlyViewedContextType {
  items: Listing[];
  addItem: (listing: Listing) => void;
  clearHistory: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Listing[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recently viewed items:', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('recentlyViewed', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = useCallback((listing: Listing) => {
    setItems(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== listing.id);
      // Add to beginning
      const updated = [listing, ...filtered];
      // Keep only last 20
      return updated.slice(0, 20);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ items, addItem, clearHistory }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return context;
}
