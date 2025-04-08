
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TherapyToolTypes } from '@/types';

interface TherapyModulesTabsProps {
  activeCategory: TherapyToolTypes | 'all';
  onCategoryChange: (category: TherapyToolTypes | 'all') => void;
}

export const TherapyModulesTabs: React.FC<TherapyModulesTabsProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  const categories: { id: TherapyToolTypes | 'all', label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'assessment', label: 'Assessment' },
    { id: 'visual', label: 'Visual' },
    { id: 'motor', label: 'Motor' },
    { id: 'communication', label: 'Communication' },
    { id: 'behavioral', label: 'Behavioral' },
    { id: 'social', label: 'Social' },
    { id: 'sensory', label: 'Sensory' },
    { id: 'cognitive', label: 'Cognitive' },
  ];

  return (
    <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as TherapyToolTypes | 'all')}>
      <TabsList className="flex flex-wrap h-auto mb-6">
        {categories.map(category => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
