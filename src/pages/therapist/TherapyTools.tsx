
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrowseToolsTab } from '@/components/therapist/tools/BrowseToolsTab';
import { CreateToolsTab } from '@/components/therapist/tools/CreateToolsTab';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { TherapyToolsHeader } from '@/components/therapist/tools/TherapyToolsHeader';
import { TherapyToolTypes } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Activity, Eye, Move, MessageCircle, Smile, Hand, Lightbulb, ArrowRight } from 'lucide-react';
import { CreateToolDialog } from '@/components/therapist/tools/CreateToolDialog';

const TherapyTools = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<TherapyToolTypes | 'all'>('all');
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const categories = [
    { path: '/therapy-tools/assessment', name: 'Assessment Tools', icon: Activity, description: 'Evaluation and screening tools', color: 'bg-blue-50 border-blue-200' },
    { path: '/therapy-tools/visual', name: 'Visual Supports', icon: Eye, description: 'Visual schedules and communication aids', color: 'bg-amber-50 border-amber-200' },
    { path: '/therapy-tools/motor', name: 'Motor Skills', icon: Move, description: 'Fine and gross motor activities', color: 'bg-green-50 border-green-200' },
    { path: '/therapy-tools/communication', name: 'Communication', icon: MessageCircle, description: 'Speech and language development resources', color: 'bg-purple-50 border-purple-200' },
    { path: '/therapy-tools/behavioral', name: 'Behavioral', icon: Hand, description: 'Behavior management strategies', color: 'bg-red-50 border-red-200' },
    { path: '/therapy-tools/social', name: 'Social Skills', icon: Smile, description: 'Social interaction and emotional learning', color: 'bg-pink-50 border-pink-200' },
    { path: '/therapy-tools/sensory', name: 'Sensory Processing', icon: Brain, description: 'Sensory integration activities', color: 'bg-indigo-50 border-indigo-200' },
    { path: '/therapy-tools/cognitive', name: 'Cognitive Skills', icon: Lightbulb, description: 'Problem-solving and executive function', color: 'bg-cyan-50 border-cyan-200' },
  ];

  const navigateToCategory = (path: string) => {
    navigate(path);
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <TherapyToolsHeader
        activeTab={activeTab as 'browse' | 'create'}
        setActiveTab={(tab) => setActiveTab(tab)}
      />

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="browse">Browse All</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.path} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${category.color}`}
                onClick={() => navigateToCategory(category.path)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <category.icon className="h-8 w-8 text-muted-foreground" />
                    <Button variant="ghost" size="icon" onClick={(e) => {
                      e.stopPropagation();
                      navigateToCategory(category.path);
                    }}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg mt-2">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="browse" className="mt-6">
          <BrowseToolsTab
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            handleCategoryChange={setActiveCategory}
          />
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <CreateToolsTab onOpenCreateDialog={handleOpenCreateDialog} />
        </TabsContent>
      </Tabs>

      <CreateToolDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
};

export default TherapyTools;
