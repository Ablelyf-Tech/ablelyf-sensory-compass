
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TherapyTool, TherapyToolTypes } from '@/types';
import { getTherapyTools } from '@/data/therapyToolsData';
import { SearchBar } from '@/components/therapist/diagnostic/SearchBar';
import { TherapyToolsList } from './TherapyToolsList';

interface CategoryToolsTemplateProps {
  title: string;
  description: string;
  category: TherapyToolTypes | 'all';
  featuredTools?: TherapyTool[];
}

export const CategoryToolsTemplate: React.FC<CategoryToolsTemplateProps> = ({
  title,
  description,
  category,
  featuredTools
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const allTools = getTherapyTools();
  
  // Filter tools based on category
  const categoryTools = category === 'all' 
    ? allTools 
    : allTools.filter(tool => tool.category === category);
  
  // Get featured tools or first few from the category
  const highlightedTools = featuredTools || categoryTools.slice(0, 3);

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              {categoryTools.length} tools available in this category
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder={`Search ${title.toLowerCase()}...`}
        />
      </div>

      <TherapyToolsList
        searchTerm={searchTerm}
        activeCategory={category}
      />
    </div>
  );
};
