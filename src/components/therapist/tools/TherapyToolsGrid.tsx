
import React from 'react';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { TherapyToolGridItem } from './TherapyToolGridItem';
import { EmptyToolsState } from './EmptyToolsState';

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
    return <EmptyToolsState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tools.map(tool => (
        <TherapyToolGridItem
          key={tool.id}
          tool={tool}
          onToggleFavorite={onToggleFavorite}
          onDownload={onDownload}
          onViewDetails={onViewDetails}
          getCategoryBadgeColor={getCategoryBadgeColor}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
