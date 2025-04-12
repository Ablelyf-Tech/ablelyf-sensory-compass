
import React from 'react';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { TherapyToolCard } from './TherapyToolCard';

interface TherapyToolsGridProps {
  tools: TherapyTool[];
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
  onViewDetails: (tool: TherapyTool) => void;
  getCategoryBadgeColor: (category: TherapyToolTypes) => string;
  onDelete?: (id: string) => void;
}

export const TherapyToolsGrid: React.FC<TherapyToolsGridProps> = ({
  tools,
  onToggleFavorite,
  onDownload,
  onViewDetails,
  getCategoryBadgeColor,
  onDelete
}) => {
  if (tools.length === 0) {
    return (
      <div className="bg-muted p-8 rounded-md text-center">
        <h3 className="text-lg font-medium mb-2">No tools found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria or category selection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tools.map(tool => (
        <TherapyToolCard
          key={tool.id}
          tool={tool}
          onToggleFavorite={toggleFavorite}
          onDownload={onDownload}
          onViewDetails={openToolDetails}
          getCategoryBadgeColor={getCategoryBadgeColor}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
