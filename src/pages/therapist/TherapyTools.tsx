
import React, { useState } from 'react';
import { TherapyToolTypes } from '@/types';
import { CreateToolDialog } from '@/components/therapist/tools/CreateToolDialog';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TherapyToolsHeader } from '@/components/therapist/tools/TherapyToolsHeader';
import { BrowseToolsTab } from '@/components/therapist/tools/BrowseToolsTab';
import { CreateToolsTab } from '@/components/therapist/tools/CreateToolsTab';

const TherapyTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<TherapyToolTypes | 'all'>('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  
  const handleCategoryChange = (category: TherapyToolTypes | 'all') => {
    setActiveCategory(category);
  };

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <TherapyToolsHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <TabsContent value="browse" className="space-y-6">
        <BrowseToolsTab 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </TabsContent>

      <TabsContent value="create" className="space-y-6">
        <CreateToolsTab onOpenCreateDialog={handleOpenCreateDialog} />
      </TabsContent>

      <CreateToolDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </div>
  );
};

export default TherapyTools;
