
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TherapyToolTypes } from '@/types';

interface TherapyCategoryItem {
  path: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

interface TherapyCategoriesGridProps {
  categories: TherapyCategoryItem[];
  navigateToCategory: (path: string) => void;
  openAIGeneratorForCategory: (category: TherapyToolTypes) => void;
}

export const TherapyCategoriesGrid: React.FC<TherapyCategoriesGridProps> = ({
  categories,
  navigateToCategory,
  openAIGeneratorForCategory
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Card 
          key={category.path} 
          className={`cursor-pointer hover:shadow-md transition-shadow ${category.color}`}
          onClick={() => navigateToCategory(category.path)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <category.icon className="h-8 w-8 text-muted-foreground" />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    openAIGeneratorForCategory(category.path.split('/').pop() as TherapyToolTypes);
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToCategory(category.path);
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="text-lg mt-2">{category.name}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
