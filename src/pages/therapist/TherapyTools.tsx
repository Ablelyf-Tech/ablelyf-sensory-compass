
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { TherapyToolsCategories } from '@/components/therapist/tools/TherapyToolsCategories';
import { TherapyToolsList } from '@/components/therapist/tools/TherapyToolsList';
import { TherapyToolTypes } from '@/types';

const TherapyTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<TherapyToolTypes | 'all'>('all');
  
  const handleCategoryChange = (category: TherapyToolTypes | 'all') => {
    setActiveCategory(category);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Therapy Tools</h1>
        <p className="text-muted-foreground">
          Comprehensive collection of tools and activities for assessment and intervention
        </p>
      </div>

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

export default TherapyTools;
