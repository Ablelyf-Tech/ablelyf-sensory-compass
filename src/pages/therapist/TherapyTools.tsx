
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus, Upload, Sparkles } from 'lucide-react';
import { TherapyToolsCategories } from '@/components/therapist/tools/TherapyToolsCategories';
import { TherapyToolsList } from '@/components/therapist/tools/TherapyToolsList';
import { TherapyToolTypes } from '@/types';
import { CreateToolDialog } from '@/components/therapist/tools/CreateToolDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TherapyTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<TherapyToolTypes | 'all'>('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  
  const handleCategoryChange = (category: TherapyToolTypes | 'all') => {
    setActiveCategory(category);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Therapy Tools</h1>
          <p className="text-muted-foreground">
            Comprehensive collection of tools and activities for assessment and intervention
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'browse' | 'create')}>
          <TabsList>
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="browse" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search therapy tools..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TherapyToolsCategories 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
          </div>
          <div className="lg:col-span-3">
            <TherapyToolsList 
              searchTerm={searchTerm} 
              activeCategory={activeCategory} 
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="create" className="space-y-6">
        <div className="bg-muted/40 rounded-lg p-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Create New Therapy Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload your own therapy materials or let AI generate customized tools for your specific needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border rounded-lg p-6 text-center flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Upload Existing Tool</h3>
              <p className="text-muted-foreground text-sm">
                Upload your PDF, document, or image files to share with other therapists
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Tool
              </Button>
            </div>
            
            <div className="bg-card border rounded-lg p-6 text-center flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Generate with AI</h3>
              <p className="text-muted-foreground text-sm">
                Describe what you need and our AI will create customized therapy tools
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Tool
              </Button>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-medium mb-4">Quick Create</h3>
            <div className="flex gap-2">
              <Input placeholder="Describe the therapy tool you need..." className="flex-1" />
              <Button>
                <Sparkles className="mr-2 h-4 w-4" />
                Quick Generate
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <CreateToolDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </div>
  );
};

export default TherapyTools;
