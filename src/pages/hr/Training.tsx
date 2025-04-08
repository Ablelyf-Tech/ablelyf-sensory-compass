
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Play, Download, Book, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Training = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock training data
  const trainings = [
    { 
      id: 1, 
      title: 'Understanding Neurodiversity in the Workplace', 
      description: 'Learn about different types of neurodiversity and how to create an inclusive environment.',
      duration: '1 hour 30 minutes',
      category: 'Awareness',
      completion: 100,
      thumbnail: 'neurodiversity_training.jpg'
    },
    { 
      id: 2, 
      title: 'Sensory-Friendly Workplace Design', 
      description: 'How to design physical and virtual work environments that support sensory needs.',
      duration: '45 minutes',
      category: 'Environment',
      completion: 60,
      thumbnail: 'sensory_workplace.jpg'
    },
    { 
      id: 3, 
      title: 'Communication Strategies for Inclusive Meetings', 
      description: 'Techniques for facilitating meetings that are accessible to all cognitive styles.',
      duration: '1 hour',
      category: 'Communication',
      completion: 0,
      thumbnail: 'inclusive_meetings.jpg'
    },
    { 
      id: 4, 
      title: 'Accommodation Plan Development', 
      description: 'A guide for HR professionals on developing effective accommodation plans.',
      duration: '2 hours',
      category: 'HR Practices',
      completion: 25,
      thumbnail: 'accommodation_plan.jpg'
    },
    { 
      id: 5, 
      title: 'Legal Frameworks for Workplace Accommodations', 
      description: 'Overview of legal requirements and best practices for disability accommodations.',
      duration: '1 hour 15 minutes',
      category: 'Legal',
      completion: 0,
      thumbnail: 'legal_frameworks.jpg'
    },
  ];

  // Filter trainings based on search term
  const filteredTrainings = trainings.filter(training => 
    training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category) => {
    const colors = {
      'Awareness': 'bg-blue-100 text-blue-800 border-blue-200',
      'Environment': 'bg-green-100 text-green-800 border-green-200',
      'Communication': 'bg-purple-100 text-purple-800 border-purple-200',
      'HR Practices': 'bg-amber-100 text-amber-800 border-amber-200',
      'Legal': 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inclusivity Training</h1>
        <p className="text-muted-foreground">
          Training resources for creating inclusive workplaces and supporting neurodivergent employees
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search training modules..." 
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

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Training</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="required">Required</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredTrainings.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No training modules match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrainings.map(training => (
                <Card key={training.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getCategoryColor(training.category)}>
                        {training.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{training.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{training.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{training.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span>Progress</span>
                        <span>{training.completion}%</span>
                      </div>
                      <Progress value={training.completion} />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2">
                    <Button 
                      variant={training.completion === 100 ? "outline" : "secondary"}
                      size="sm" 
                      className="flex-1"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {training.completion === 0 ? 'Start' : training.completion === 100 ? 'Review' : 'Continue'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Materials
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-auto p-2" 
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="inprogress" className="mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing training modules that are currently in progress.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing completed training modules.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="required" className="mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing required training modules.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Training;
