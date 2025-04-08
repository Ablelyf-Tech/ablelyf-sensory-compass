
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TherapyToolsHeaderProps {
  activeTab: 'browse' | 'create';
  setActiveTab: (tab: 'browse' | 'create') => void;
}

export const TherapyToolsHeader: React.FC<TherapyToolsHeaderProps> = ({
  activeTab,
  setActiveTab
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Therapy Tools</h1>
        <p className="text-muted-foreground">
          Comprehensive collection of tools and activities for assessment and intervention
        </p>
      </div>
      <TabsList>
        <TabsTrigger value="browse">Browse</TabsTrigger>
        <TabsTrigger value="create">Create</TabsTrigger>
      </TabsList>
    </div>
  );
};
