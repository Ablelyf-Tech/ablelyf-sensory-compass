
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TherapyCategoriesGrid } from './TherapyCategoriesGrid';
import { BrowseToolsTab } from './BrowseToolsTab';
import { CreateToolsTab } from './CreateToolsTab';
import { AIToolsLibrary } from './ai/AIToolsLibrary';
import { TherapyToolTypes } from '@/types';

interface TherapyToolsTabsContainerProps {
  categories: {
    path: string;
    name: string;
    icon: React.ElementType;
    description: string;
    color: string;
  }[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: TherapyToolTypes | 'all';
  setActiveCategory: (category: TherapyToolTypes | 'all') => void;
  navigateToCategory: (path: string) => void;
  handleOpenCreateDialog: () => void;
  openAIGeneratorForCategory: (category: TherapyToolTypes) => void;
}

export const TherapyToolsTabsContainer: React.FC<TherapyToolsTabsContainerProps> = ({
  categories,
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  navigateToCategory,
  handleOpenCreateDialog,
  openAIGeneratorForCategory
}) => {
  return (
    <Tabs defaultValue="categories" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-4">
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="browse">Browse All</TabsTrigger>
        <TabsTrigger value="ai">AI Library</TabsTrigger>
        <TabsTrigger value="create">Create New</TabsTrigger>
      </TabsList>

      <TabsContent value="categories" className="mt-6">
        <TherapyCategoriesGrid 
          categories={categories}
          navigateToCategory={navigateToCategory}
          openAIGeneratorForCategory={openAIGeneratorForCategory}
        />
      </TabsContent>

      <TabsContent value="browse" className="mt-6">
        <BrowseToolsTab
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          handleCategoryChange={setActiveCategory}
        />
      </TabsContent>

      <TabsContent value="ai" className="mt-6">
        <AIToolsLibrary />
      </TabsContent>

      <TabsContent value="create" className="mt-6">
        <CreateToolsTab onOpenCreateDialog={handleOpenCreateDialog} />
      </TabsContent>
    </Tabs>
  );
};
