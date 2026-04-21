"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  isInFavorites: (id: string) => boolean;
  isInCompare: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedFavs = localStorage.getItem('mersal_favorites');
    const savedCompare = localStorage.getItem('mersal_compare');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedCompare) setCompareList(JSON.parse(savedCompare));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('mersal_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('mersal_compare', JSON.stringify(compareList));
  }, [compareList]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(cid => cid !== id);
      if (prev.length >= 4) return prev; // Limit comparison to 4 items
      return [...prev, id];
    });
  };

  const isInFavorites = (id: string) => favorites.includes(id);
  const isInCompare = (id: string) => compareList.includes(id);

  return (
    <WishlistContext.Provider value={{ 
      favorites, 
      compareList, 
      toggleFavorite, 
      toggleCompare,
      isInFavorites,
      isInCompare 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
