
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MaterialCard } from './MaterialCard';
import { MaterialItem } from '../../../types/materials';

interface MaterialsListProps {
  materials: MaterialItem[];
  getCategoryColor: (category: string) => string;
  onDownload: (id: number) => void;
  onPreview: (id: number) => void;
  onOpenExternal: (id: number) => void;
  onDelete: (id: number) => void;
}

export const MaterialsList: React.FC<MaterialsListProps> = ({
  materials,
  getCategoryColor,
  onDownload,
  onPreview,
  onOpenExternal,
  onDelete
}) => {
  if (materials.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center">
          <p>No materials match your search criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {materials.map(material => (
        <MaterialCard
          key={material.id}
          material={material}
          getCategoryColor={getCategoryColor}
          onDownload={onDownload}
          onPreview={onPreview}
          onOpenExternal={onOpenExternal}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
