
import React from 'react';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { TherapyModuleCard } from './TherapyModuleCard';

interface TherapyModulesGridProps {
  tools: TherapyTool[];
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
  onViewDetails: (tool: TherapyTool) => void;
  onDelete?: (id: string) => void;
}

export const TherapyModulesGrid: React.FC<TherapyModulesGridProps> = ({
  tools,
  onToggleFavorite,
  onDownload,
  onViewDetails,
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map(tool => (
        <TherapyModuleCard
          key={tool.id}
          tool={tool}
          onToggleFavorite={onToggleFavorite}
          onDownload={onDownload}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
