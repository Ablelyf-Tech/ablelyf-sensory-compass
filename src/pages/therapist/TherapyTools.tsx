
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TherapyToolsHeader } from '@/components/therapist/tools/TherapyToolsHeader';
import { TherapyToolTypes } from '@/types';
import { CreateToolDialog } from '@/components/therapist/tools/CreateToolDialog';
import { CategoryAIGenerator } from '@/components/therapist/tools/CategoryAIGenerator';
import { TherapyToolsTabsContainer } from '@/components/therapist/tools/TherapyToolsTabsContainer';
import { therapyCategories } from '@/components/therapist/tools/TherapyCategoryData';

const TherapyTools = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<TherapyToolTypes | 'all'>('all');
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TherapyToolTypes | null>(null);

  const navigateToCategory = (path: string) => {
    navigate(path);
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const openAIGeneratorForCategory = (category: TherapyToolTypes) => {
    setSelectedCategory(category);
    setIsAIGeneratorOpen(true);
  };

  return (
    <div className="space-y-6">
      <TherapyToolsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <TherapyToolsTabsContainer
        categories={therapyCategories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        navigateToCategory={navigateToCategory}
        handleOpenCreateDialog={handleOpenCreateDialog}
        openAIGeneratorForCategory={openAIGeneratorForCategory}
      />

      <CreateToolDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />

      {selectedCategory && (
        <CategoryAIGenerator
          open={isAIGeneratorOpen}
          onOpenChange={setIsAIGeneratorOpen}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default TherapyTools;
