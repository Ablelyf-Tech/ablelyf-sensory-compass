import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, Search, Filter, Users, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LearningModuleForm } from '@/components/therapist/LearningModuleForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Mock learning modules data
const mockModules = [
  {
    id: 'm1',
    title: 'Social Communication Basics',
    description: 'Foundational skills for effective social communication',
    skillArea: 'communication',
    ageRange: '5-12',
    activitiesCount: 5,
    featured: true,
    suitableFor: ['autism', 'developmental'],
    createdBy: 'system'
  },
  {
    id: 'm2',
    title: 'Sensory Regulation Toolkit',
    description: 'Strategies for managing sensory sensitivities',
    skillArea: 'sensory',
    ageRange: '3-10',
    activitiesCount: 4,
    featured: true,
    suitableFor: ['sensory', 'autism'],
    createdBy: 'system'
  },
  {
    id: 'm3',
    title: 'Executive Function Skills',
    description: 'Activities to improve planning and organization',
    skillArea: 'cognitive',
    ageRange: '7-14',
    activitiesCount: 6,
    featured: false,
    suitableFor: ['adhd', 'learning'],
    createdBy: 'system'
  },
  {
    id: 'm4',
    title: 'Emotional Regulation',
    description: 'Techniques for identifying and managing emotions',
    skillArea: 'emotional',
    ageRange: '4-12',
    activitiesCount: 7,
    featured: false,
    suitableFor: ['autism', 'adhd', 'emotional'],
    createdBy: 'system'
  },
  {
    id: 'm5',
    title: 'Fine Motor Skills Development',
    description: 'Activities to improve hand-eye coordination and fine motor control',
    skillArea: 'motor',
    ageRange: '3-8',
    activitiesCount: 5,
    featured: false,
    suitableFor: ['developmental', 'physical'],
    createdBy: 'user'
  }
];

const LearningModules: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Filter modules based on search term
  const filteredModules = mockModules.filter(module => 
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get system modules vs user created modules
  const systemModules = filteredModules.filter(m => m.createdBy === 'system');
  const userModules = filteredModules.filter(m => m.createdBy === 'user');
  
  // Get skill area badge color
  const getSkillAreaColor = (skillArea: string) => {
    switch (skillArea) {
      case 'communication':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sensory':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cognitive':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'emotional':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'motor':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'adaptive':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format skill area for display
  const formatSkillArea = (skillArea: string) => {
    return skillArea.charAt(0).toUpperCase() + skillArea.slice(1) + ' Skills';
  };

  const renderModuleList = (modules: typeof mockModules) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map(module => (
        <Card key={module.id} className="border border-border h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge className={getSkillAreaColor(module.skillArea)}>
                {formatSkillArea(module.skillArea)}
              </Badge>
              {module.featured && (
                <Badge variant="outline" className="bg-ablelyf-blue-100 text-ablelyf-blue-800 border-ablelyf-blue-200">
                  Featured
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg mt-2">{module.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{module.description}</p>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Ages {module.ageRange}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{module.activitiesCount} activities</span>
                </div>
              </div>
              
              <ScrollArea className="whitespace-nowrap pb-2">
                <div className="flex gap-1">
                  {module.suitableFor.map((condition, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {condition === 'autism' && 'Autism'}
                      {condition === 'adhd' && 'ADHD'}
                      {condition === 'sensory' && 'Sensory Processing'}
                      {condition === 'developmental' && 'Developmental Delay'}
                      {condition === 'learning' && 'Learning Disability'}
                      {condition === 'physical' && 'Physical Disability'}
                      {condition === 'emotional' && 'Emotional Regulation'}
                    </Badge>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              <Book className="mr-2 h-4 w-4" />
              View Module
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const handleAddModule = () => {
    const triggerElement = document.querySelector('[data-trigger="learningModuleForm"]');
    if (triggerElement instanceof HTMLElement) {
      triggerElement.click();
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-ablelyf-blue-900">Learning Modules</h1>
          <p className="text-muted-foreground">Educational content and therapy activities</p>
        </div>
        <LearningModuleForm />
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search modules..." 
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
      
      <Tabs defaultValue="library" className="mb-6">
        <TabsList>
          <TabsTrigger value="library">
            Module Library ({systemModules.length})
          </TabsTrigger>
          <TabsTrigger value="user">
            My Modules ({userModules.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="pt-6">
          {systemModules.length > 0 ? (
            renderModuleList(systemModules)
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Book className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="text-xl font-medium">No Modules Found</h3>
                <p className="text-muted-foreground">Try changing your search criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="user" className="pt-6">
          {userModules.length > 0 ? (
            renderModuleList(userModules)
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Book className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="text-xl font-medium">No Custom Modules</h3>
                <p className="text-muted-foreground">Create your own custom modules to see them here.</p>
                <Button className="mt-4 bg-ablelyf-blue-500" onClick={handleAddModule}>
                  <Book className="mr-2 h-4 w-4" />
                  Create Module
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default LearningModules;
