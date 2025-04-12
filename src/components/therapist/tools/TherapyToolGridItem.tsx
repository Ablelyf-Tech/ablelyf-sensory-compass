
import React from 'react';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { TherapyToolCard } from './TherapyToolCard';

interface TherapyToolGridItemProps {
  tool: TherapyTool;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
  onViewDetails: (tool: TherapyTool) => void;
  getCategoryBadgeColor: (category: TherapyToolTypes) => string;
  onDelete?: (id: string) => void;
}

export const TherapyToolGridItem: React.FC<TherapyToolGridItemProps> = ({
  tool,
  onToggleFavorite,
  onDownload,
  onViewDetails,
  getCategoryBadgeColor,
  onDelete
}) => {
  return (
    <TherapyToolCard
      tool={tool}
      onToggleFavorite={onToggleFavorite}
      onDownload={onDownload}
      onViewDetails={onViewDetails}
      getCategoryBadgeColor={getCategoryBadgeColor}
      onDelete={onDelete}
    />
  );
};
