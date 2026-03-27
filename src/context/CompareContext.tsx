'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Listing } from '@/types';

interface CompareContextType {
  items: Listing[];
  addToCompare: (listing: Listing) => boolean;
  removeFromCompare: (listingId: string) => void;
  clearCompare: () => void;
  isInCompare: (listingId: string) => boolean;
  compareCount: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Listing[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('compareItems');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse compare items:', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('compareItems', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCompare = useCallback((listing: Listing): boolean => {
    setItems(prev => {
      if (prev.some(item => item.id === listing.id)) {
        return prev;
      }
      if (prev.length >= MAX_COMPARE_ITEMS) {
        return prev;
      }
      return [...prev, listing];
    });
    return !items.some(item => item.id === listing.id) && items.length < MAX_COMPARE_ITEMS;
  }, [items]);

  const removeFromCompare = useCallback((listingId: string) => {
    setItems(prev => prev.filter(item => item.id !== listingId));
  }, []);

  const clearCompare = useCallback(() => {
    setItems([]);
  }, []);

  const isInCompare = useCallback((listingId: string) => {
    return items.some(item => item.id === listingId);
  }, [items]);

  return (
    <CompareContext.Provider value={{
      items,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      compareCount: items.length,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within CompareProvider');
  return context;
}
