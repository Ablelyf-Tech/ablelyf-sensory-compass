
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { getTherapyTools } from '@/data/therapyToolsData';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { TherapyModulesSearch } from '@/components/therapist/modules/TherapyModulesSearch';
import { TherapyModulesTabs } from '@/components/therapist/modules/TherapyModulesTabs';
import { TherapyModulesGrid } from '@/components/therapist/modules/TherapyModulesGrid';
import { TherapyModuleDetails } from '@/components/therapist/modules/TherapyModuleDetails';
import { filterTools } from '@/components/therapist/modules/therapyModulesUtils';

const TherapyModules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<TherapyToolTypes | 'all'>('assessment');
  const [selectedTool, setSelectedTool] = useState<TherapyTool | null>(null);
  const tools = getTherapyTools();

  // Filter tools based on search term and active category
  const filteredTools = filterTools(tools, searchTerm, activeCategory);

  const toggleFavorite = (id: string) => {
    console.log(`Favoriting tool: ${id}`);
    // Implementation would update state or call an API
  };

  const downloadTool = (id: string) => {
    console.log(`Downloading tool: ${id}`);
    alert(`Starting download for therapy tool`);
    // Implementation would handle the download
  };

  const openToolDetails = (tool: TherapyTool) => {
    setSelectedTool(tool);
  };

  const closeToolDetails = () => {
    setSelectedTool(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Therapy Modules</h1>
        <p className="text-muted-foreground">
          Comprehensive collection of assessment tools and therapeutic activities
        </p>
      </div>

      <TherapyModulesSearch 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <Tabs value={activeCategory}>
        <TherapyModulesTabs 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        <TabsContent value={activeCategory}>
          <TherapyModulesGrid
            tools={filteredTools}
            onToggleFavorite={toggleFavorite}
            onDownload={downloadTool}
            onViewDetails={openToolDetails}
          />
        </TabsContent>
      </Tabs>

      <TherapyModuleDetails
        tool={selectedTool}
        open={selectedTool !== null}
        onClose={closeToolDetails}
        onDownload={downloadTool}
      />
    </div>
  );
};

export default TherapyModules;
