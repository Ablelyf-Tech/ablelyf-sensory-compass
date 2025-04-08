
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { TherapyToolsCategories } from '@/components/therapist/tools/TherapyToolsCategories';
import { TherapyToolsList } from '@/components/therapist/tools/TherapyToolsList';
import { TherapyToolTypes } from '@/types';

interface BrowseToolsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: TherapyToolTypes | 'all';
  handleCategoryChange: (category: TherapyToolTypes | 'all') => void;
}

export const BrowseToolsTab: React.FC<BrowseToolsTabProps> = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  handleCategoryChange
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search therapy tools..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <TherapyToolsCategories 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>
        <div className="lg:col-span-3">
          <TherapyToolsList 
            searchTerm={searchTerm} 
            activeCategory={activeCategory} 
          />
        </div>
      </div>
    </div>
  );
};
