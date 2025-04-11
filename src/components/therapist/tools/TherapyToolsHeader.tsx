
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface TherapyToolsHeaderProps {
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
        <TabsTrigger 
          value="browse" 
          onClick={() => setActiveTab('browse')}
          data-state={activeTab === 'browse' ? 'active' : 'inactive'}
        >
          Browse
        </TabsTrigger>
        <TabsTrigger 
          value="create"
          onClick={() => setActiveTab('create')}
          data-state={activeTab === 'create' ? 'active' : 'inactive'}
        >
          Create
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
