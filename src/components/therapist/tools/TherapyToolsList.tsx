
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { getTherapyTools } from '@/data/therapyToolsData';
import { TherapyToolsGrid } from './TherapyToolsGrid';
import { TherapyToolDetails } from './TherapyToolDetails';
import { filterTools, getCategoryBadgeColor } from './therapyToolsUtils';
import { toast } from 'sonner';

interface TherapyToolsListProps {
  searchTerm: string;
  activeCategory: TherapyToolTypes | 'all';
}

export const TherapyToolsList: React.FC<TherapyToolsListProps> = ({ 
  searchTerm, 
  activeCategory 
}) => {
  const [tools, setTools] = useState(getTherapyTools());
  const [selectedTool, setSelectedTool] = useState<TherapyTool | null>(null);

  // Filter tools based on search term and active category
  const filteredTools = filterTools(tools, searchTerm, activeCategory);

  const toggleFavorite = (id: string) => {
    console.log(`Favoriting tool: ${id}`);
    // Implementation would update state or call an API
  };

  const downloadTool = (id: string) => {
    console.log(`Downloading tool: ${id}`);
    toast.success(`Starting download for therapy tool`);
    // Implementation would handle the download
  };

  const openToolDetails = (tool: TherapyTool) => {
    setSelectedTool(tool);
  };

  const closeToolDetails = () => {
    setSelectedTool(null);
  };

  const deleteTool = (id: string) => {
    setTools(tools.filter(tool => tool.id !== id));
    toast.success("Tool deleted successfully");
  };

  return (
    <>
      <TherapyToolsGrid 
        tools={filteredTools}
        onToggleFavorite={toggleFavorite}
        onDownload={downloadTool}
        onViewDetails={openToolDetails}
        getCategoryBadgeColor={getCategoryBadgeColor}
        onDelete={deleteTool}
      />

      <TherapyToolDetails
        tool={selectedTool}
        open={selectedTool !== null}
        onClose={closeToolDetails}
        onDownload={downloadTool}
        getCategoryBadgeColor={getCategoryBadgeColor}
      />
    </>
  );
};
