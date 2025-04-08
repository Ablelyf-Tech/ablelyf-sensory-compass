
import React, { useState } from 'react';
import { TherapyToolTypes } from '@/types';
import { TherapyToolsList } from '../tools/TherapyToolsList';
import { SearchBar } from './SearchBar';
import { TherapyToolsCategories } from '../tools/TherapyToolsCategories';

export const TherapyToolsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<TherapyToolTypes | 'all'>('all');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <TherapyToolsCategories 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
      </div>
      <div className="md:col-span-3 space-y-4">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search for therapy tools..."
        />
        <TherapyToolsList 
          searchTerm={searchTerm} 
          activeCategory={activeCategory} 
        />
      </div>
    </div>
  );
};
