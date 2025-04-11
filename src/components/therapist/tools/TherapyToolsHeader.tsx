
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TherapyToolsHeaderProps {
  activeTab: 'browse' | 'create';
  setActiveTab: (tab: 'browse' | 'create') => void;
}

export const TherapyToolsHeader: React.FC<TherapyToolsHeaderProps> = ({
  activeTab,
  setActiveTab
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
      <div>
        <h1 className="text-2xl font-bold text-ablelyf-blue-900">Therapy Tools</h1>
        <p className="text-muted-foreground">Browse, create, and manage therapy resources</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'browse' | 'create')}>
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="browse">Browse Tools</TabsTrigger>
          <TabsTrigger value="create">Create Tool</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
