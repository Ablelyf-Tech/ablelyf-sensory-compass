
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Search, Plus, Clock, BookOpen, Users, Share2, Play, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

// Mock learning modules data
const learningModules = [
  {
    id: 'm1',
    title: 'Sensory Integration Techniques',
    category: 'sensory',
    level: 'intermediate',
    duration: 45,
    rating: 4.8,
    enrollments: 87,
    tags: ['sensory', 'practical', 'techniques'],
    description: 'Learn evidence-based techniques for supporting sensory integration in various environments.'
  },
  {
    id: 'm2',
    title: 'Communication Strategies for Non-verbal Children',
    category: 'communication',
    level: 'beginner',
    duration: 60,
    rating: 4.9,
    enrollments: 124,
    tags: ['communication', 'non-verbal', 'strategies'],
    description: 'Effective strategies to facilitate communication with non-verbal and minimally verbal children.'
  },
  {
    id: 'm3',
    title: 'Advanced Behavioral Analysis Techniques',
    category: 'behavioral',
    level: 'advanced',
    duration: 90,
    rating: 4.6,
    enrollments: 63,
    tags: ['behavioral', 'analysis', 'techniques'],
    description: 'Advanced techniques for behavioral analysis and intervention planning.'
  },
  {
    id: 'm4',
    title: 'Social Skills Development',
    category: 'social',
    level: 'intermediate',
    duration: 75,
    rating: 4.7,
    enrollments: 95,
    tags: ['social', 'skills', 'development'],
    description: 'Structured approaches to developing and enhancing social skills through interactive activities.'
  },
  {
    id: 'm5',
    title: 'Assistive Technology: Assessment and Implementation',
    category: 'technology',
    level: 'intermediate',
    duration: 60,
    rating: 4.5,
    enrollments: 72,
    tags: ['assistive tech', 'implementation', 'assessment'],
    description: 'Learn how to assess needs and implement assistive technology solutions effectively.'
  },
  {
    id: 'm6',
    title: 'Building Emotional Regulation Skills',
    category: 'emotional',
    level: 'beginner',
    duration: 45,
    rating: 4.8,
    enrollments: 108,
    tags: ['emotional', 'regulation', 'skills'],
    description: 'Strategies to help children develop emotional awareness and regulation skills.'
  }
];

const LearningModules: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  // Filter modules based on search, category and level
  const filteredModules = learningModules.filter(module => {
    const matchesSearch = 
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || module.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Get level badge based on level
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge className="bg-ablelyf-green-500">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-ablelyf-blue-500">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-ablelyf-neutral-700 text-white">Advanced</Badge>;
      default:
        return null;
    }
  };

  // Handle module action
  const handleModuleAction = (action: string, moduleTitle: string) => {
    toast({
      title: `${action} Module`,
      description: `${action} "${moduleTitle}" module`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Learning Modules</h1>
            <p className="text-muted-foreground">Professional development resources and training modules</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Create Module</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search modules..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-52">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="sensory">Sensory Integration</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="social">Social Skills</SelectItem>
              <SelectItem value="emotional">Emotional Regulation</SelectItem>
              <SelectItem value="technology">Assistive Technology</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className="overflow-hidden flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  {getLevelBadge(module.level)}
                </div>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Brain size={14} className="text-muted-foreground" />
                  <span className="capitalize">{module.category}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2 flex-1">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-muted-foreground" />
                      <span>{module.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-amber-500" />
                      <span>{module.rating} ({module.enrollments})</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {module.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleModuleAction('Share', module.title)}
                >
                  <Share2 size={14} className="mr-1" />
                  Share
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs gap-1"
                  onClick={() => handleModuleAction('Start', module.title)}
                >
                  <Play size={14} className="mr-1" />
                  Start Learning
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default LearningModules;
