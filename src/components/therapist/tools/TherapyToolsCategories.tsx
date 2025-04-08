
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TherapyToolTypes } from '@/types';
import { Brain, Activity, Eye, Move, MessageCircle, Smile, Hand, Lightbulb } from 'lucide-react';

interface CategoryItem {
  id: TherapyToolTypes | 'all';
  name: string;
  description: string;
  icon: React.ElementType;
  count: number;
}

interface TherapyToolsCategoriesProps {
  activeCategory: TherapyToolTypes | 'all';
  onCategoryChange: (category: TherapyToolTypes | 'all') => void;
}

export const TherapyToolsCategories: React.FC<TherapyToolsCategoriesProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const categories: CategoryItem[] = [
    { 
      id: 'all', 
      name: 'All Tools', 
      description: 'View all therapeutic tools and resources',
      icon: Brain, 
      count: 204 
    },
    { 
      id: 'assessment', 
      name: 'Assessment Tools', 
      description: 'Evaluation and screening tools',
      icon: Activity, 
      count: 24 
    },
    { 
      id: 'visual', 
      name: 'Visual Supports', 
      description: 'Visual schedules and communication aids',
      icon: Eye, 
      count: 38 
    },
    { 
      id: 'motor', 
      name: 'Motor Skills', 
      description: 'Fine and gross motor activities',
      icon: Move, 
      count: 31 
    },
    { 
      id: 'communication', 
      name: 'Communication', 
      description: 'Speech and language development resources',
      icon: MessageCircle, 
      count: 29 
    },
    { 
      id: 'behavioral', 
      name: 'Behavioral', 
      description: 'Behavior management strategies',
      icon: Hand, 
      count: 22 
    },
    { 
      id: 'social', 
      name: 'Social Skills', 
      description: 'Social interaction and emotional learning',
      icon: Smile, 
      count: 26 
    },
    { 
      id: 'sensory', 
      name: 'Sensory Processing', 
      description: 'Sensory integration activities',
      icon: Brain, 
      count: 18 
    },
    { 
      id: 'cognitive', 
      name: 'Cognitive Skills', 
      description: 'Problem-solving and executive function',
      icon: Lightbulb, 
      count: 16 
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-1 p-2">
          {categories.map(category => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                  activeCategory === category.id 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center">
                  <category.icon className="mr-2 h-4 w-4" />
                  <span>{category.name}</span>
                </div>
                <span className="text-xs bg-muted rounded-full px-2 py-0.5">{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
