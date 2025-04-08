
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  FileText, Search, Plus, Download, 
  BookOpen, Play, Share2, Calendar, 
  Filter, ChevronRight, Star, StarHalf,
  Users, BookOpen as BookIcon,
  Clock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Material {
  id: string;
  title: string;
  type: 'worksheet' | 'activity' | 'visual' | 'video' | 'assessment';
  subject: string;
  level: string;
  tags: string[];
  createdAt: string;
  modifiedAt: string;
  favorite: boolean;
  shared: boolean;
  downloadCount: number;
}

interface Lesson {
  id: string;
  title: string;
  subject: string;
  level: string;
  duration: string;
  objectives: string[];
  materials: string[];
  steps: {
    title: string;
    duration: string;
    description: string;
  }[];
  notes: string;
  created: string;
  shared: boolean;
}

const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Social Stories: Playground Interactions',
    type: 'visual',
    subject: 'Social Skills',
    level: 'Beginner',
    tags: ['social stories', 'communication', 'playground'],
    createdAt: '2025-03-15',
    modifiedAt: '2025-04-05',
    favorite: true,
    shared: true,
    downloadCount: 28
  },
  {
    id: '2',
    title: 'Math Concepts: Visual Counting 1-20',
    type: 'worksheet',
    subject: 'Mathematics',
    level: 'Beginner',
    tags: ['math', 'counting', 'visual supports'],
    createdAt: '2025-03-10',
    modifiedAt: '2025-03-10',
    favorite: false,
    shared: true,
    downloadCount: 45
  },
  {
    id: '3',
    title: 'Visual Schedule Templates',
    type: 'visual',
    subject: 'Organization',
    level: 'All Levels',
    tags: ['schedules', 'visual supports', 'routines'],
    createdAt: '2025-02-28',
    modifiedAt: '2025-03-20',
    favorite: true,
    shared: false,
    downloadCount: 56
  },
  {
    id: '4',
    title: 'Emotion Recognition Cards',
    type: 'activity',
    subject: 'Emotional Regulation',
    level: 'Intermediate',
    tags: ['emotions', 'social skills', 'recognition'],
    createdAt: '2025-02-15',
    modifiedAt: '2025-02-15',
    favorite: false,
    shared: true,
    downloadCount: 32
  },
  {
    id: '5',
    title: 'Reading Comprehension Assessment',
    type: 'assessment',
    subject: 'Language Arts',
    level: 'Advanced',
    tags: ['reading', 'assessment', 'comprehension'],
    createdAt: '2025-03-01',
    modifiedAt: '2025-03-05',
    favorite: false,
    shared: false,
    downloadCount: 18
  },
  {
    id: '6',
    title: 'Sensory Break Activities',
    type: 'activity',
    subject: 'Sensory Integration',
    level: 'All Levels',
    tags: ['sensory', 'breaks', 'regulation'],
    createdAt: '2025-03-25',
    modifiedAt: '2025-04-01',
    favorite: true,
    shared: true,
    downloadCount: 39
  },
  {
    id: '7',
    title: 'Understanding Non-Verbal Cues',
    type: 'video',
    subject: 'Social Skills',
    level: 'Intermediate',
    tags: ['non-verbal', 'communication', 'social'],
    createdAt: '2025-02-10',
    modifiedAt: '2025-02-10',
    favorite: false,
    shared: true,
    downloadCount: 25
  }
];

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introducing Emotions and Facial Expressions',
    subject: 'Social Emotional Learning',
    level: 'Beginner',
    duration: '30 minutes',
    objectives: [
      'Identify basic emotions from facial expressions',
      'Match emotion words to appropriate pictures',
      'Express feelings using appropriate vocabulary'
    ],
    materials: [
      'Emotion Recognition Cards',
      'Emotions Poster',
      'Mirror for practice'
    ],
    steps: [
      {
        title: 'Introduction',
        duration: '5 minutes',
        description: 'Introduce the concept of emotions using the Emotions Poster. Discuss how we all feel different emotions throughout the day.'
      },
      {
        title: 'Emotion Recognition Activity',
        duration: '10 minutes',
        description: 'Use Emotion Recognition Cards to identify and label different facial expressions. Have students take turns matching emotion words to pictures.'
      },
      {
        title: 'Mirror Practice',
        duration: '10 minutes',
        description: 'Students use mirrors to practice making facial expressions for different emotions. Partner activity: one student makes an expression, the other guesses.'
      },
      {
        title: 'Wrap-Up Discussion',
        duration: '5 minutes',
        description: 'Review emotions covered today. Ask students to share one time they felt one of these emotions recently.'
      }
    ],
    notes: 'Some students may require additional visual supports. Have simplified emotion cards available for students who need them.',
    created: '2025-03-20',
    shared: true
  },
  {
    id: '2',
    title: 'Visual Math: Comparing Numbers with Objects',
    subject: 'Mathematics',
    level: 'Beginner',
    duration: '25 minutes',
    objectives: [
      'Compare quantities using "more than," "less than," and "equal to"',
      'Use visual supports to understand numerical comparisons',
      'Practice one-to-one correspondence'
    ],
    materials: [
      'Counting manipulatives (blocks, buttons, etc.)',
      'Comparison worksheets',
      'Visual number line'
    ],
    steps: [
      {
        title: 'Warm-Up',
        duration: '5 minutes',
        description: 'Review counting 1-10 using visual number line and manipulatives.'
      },
      {
        title: 'Concept Introduction',
        duration: '5 minutes',
        description: 'Introduce comparison vocabulary with visual examples. Show groups of objects and model language "more than," "less than," "equal to."'
      },
      {
        title: 'Guided Practice',
        duration: '10 minutes',
        description: 'Students work in pairs to create and compare groups of objects. Teacher circulates to provide support and feedback.'
      },
      {
        title: 'Independent Work',
        duration: '5 minutes',
        description: 'Students complete simple comparison worksheet using manipulatives as needed.'
      }
    ],
    notes: 'Provide additional visual supports for students who need them. Some may benefit from comparison symbols (>, <, =) to reinforce concepts.',
    created: '2025-03-15',
    shared: false
  }
];

const subjects = [
  'All Subjects',
  'Mathematics',
  'Language Arts',
  'Social Skills',
  'Emotional Regulation',
  'Sensory Integration',
  'Organization',
  'Science',
  'Art'
];

const levels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

const MaterialsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('materials');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [levelFilter, setLevelFilter] = useState('All Levels');

  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = subjectFilter === 'All Subjects' || material.subject === subjectFilter;
    const matchesLevel = levelFilter === 'All Levels' || material.level === levelFilter;
    
    return matchesSearch && matchesSubject && matchesLevel;
  });

  const filteredLessons = mockLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.objectives.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = subjectFilter === 'All Subjects' || lesson.subject === subjectFilter;
    const matchesLevel = levelFilter === 'All Levels' || lesson.level === levelFilter;
    
    return matchesSearch && matchesSubject && matchesLevel;
  });

  const getTypeIcon = (type: Material['type']) => {
    switch (type) {
      case 'worksheet': return <FileText className="h-4 w-4" />;
      case 'activity': return <Users className="h-4 w-4" />;
      case 'visual': return <BookIcon className="h-4 w-4" />;
      case 'video': return <Play className="h-4 w-4" />;
      case 'assessment': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: Material['type']) => {
    switch (type) {
      case 'worksheet': return 'bg-ablelyf-blue-50 text-ablelyf-blue-700';
      case 'activity': return 'bg-purple-50 text-purple-700';
      case 'visual': return 'bg-green-50 text-green-700';
      case 'video': return 'bg-red-50 text-red-700';
      case 'assessment': return 'bg-amber-50 text-amber-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Teaching Materials</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search materials..."
                className="w-full pl-8 md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600">
              <Plus className="h-4 w-4" />
              <span>Create New</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select 
              value={subjectFilter} 
              onValueChange={setSubjectFilter}
            >
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={levelFilter} 
              onValueChange={setLevelFilter}
            >
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {(subjectFilter !== 'All Subjects' || levelFilter !== 'All Levels' || searchTerm) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8"
                onClick={() => {
                  setSubjectFilter('All Subjects');
                  setLevelFilter('All Levels');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="materials" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="lessons">Lesson Plans</TabsTrigger>
            <TabsTrigger value="shared">Shared Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map(material => (
                <Card key={material.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-start">
                      <Badge className={`${getTypeColor(material.type)}`}>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(material.type)}
                          <span className="capitalize">{material.type}</span>
                        </div>
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7 -mt-1 -mr-1">
                        {material.favorite ? 
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> : 
                          <Star className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                    <CardTitle className="text-base mt-2">{material.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{material.subject}</span>
                      <span>•</span>
                      <span>{material.level}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Modified {new Date(material.modifiedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{material.downloadCount}</span>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Share2 className="h-3 w-3" />
                        <span>Share</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredMaterials.length === 0 && (
                <div className="col-span-full text-center p-8 border rounded-lg">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No Materials Found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSubjectFilter('All Subjects');
                      setLevelFilter('All Levels');
                      setSearchTerm('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="lessons">
            <div className="space-y-4">
              {filteredLessons.map(lesson => (
                <Card key={lesson.id}>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{lesson.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{lesson.subject}</span>
                          <span>•</span>
                          <span>{lesson.level}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.shared && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            <Share2 className="h-3 w-3 mr-1" />
                            Shared
                          </Badge>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Objectives</h4>
                        <ul className="text-sm space-y-1">
                          {lesson.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-ablelyf-blue-500">•</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Materials Needed</h4>
                        <div className="flex flex-wrap gap-2">
                          {lesson.materials.map((material, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Schedule</span>
                        </Button>
                        <Button size="sm" className="gap-1 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600">
                          <span>View Details</span>
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredLessons.length === 0 && (
                <div className="text-center p-8 border rounded-lg">
                  <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No Lesson Plans Found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSubjectFilter('All Subjects');
                      setLevelFilter('All Levels');
                      setSearchTerm('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="shared">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recently Shared With You</CardTitle>
                  <CardDescription>
                    Resources other educators have shared with you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <Badge className="bg-green-50 text-green-700">Visual Support</Badge>
                          <span className="text-xs text-muted-foreground">Shared 2 days ago</span>
                        </div>
                        <h3 className="font-medium mt-2">Communication Board: Classroom Edition</h3>
                        <p className="text-xs text-muted-foreground mt-1">Shared by: Maria Rodriguez</p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <Badge className="bg-ablelyf-blue-50 text-ablelyf-blue-700">Lesson Plan</Badge>
                          <span className="text-xs text-muted-foreground">Shared 1 week ago</span>
                        </div>
                        <h3 className="font-medium mt-2">Multi-Sensory Reading Approach</h3>
                        <p className="text-xs text-muted-foreground mt-1">Shared by: John Smith</p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <Badge className="bg-purple-50 text-purple-700">Activity</Badge>
                          <span className="text-xs text-muted-foreground">Shared 2 weeks ago</span>
                        </div>
                        <h3 className="font-medium mt-2">Calming Corner Setup Guide</h3>
                        <p className="text-xs text-muted-foreground mt-1">Shared by: Sarah Johnson</p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <Badge className="bg-amber-50 text-amber-700">Assessment</Badge>
                          <span className="text-xs text-muted-foreground">Shared 3 weeks ago</span>
                        </div>
                        <h3 className="font-medium mt-2">Functional Communication Checklist</h3>
                        <p className="text-xs text-muted-foreground mt-1">Shared by: David Wilson</p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Community Resources</CardTitle>
                  <CardDescription>
                    Popular resources from the teaching community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-ablelyf-blue-50 text-ablelyf-blue-700">Resource Pack</Badge>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <StarHalf className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs ml-1">(4.5)</span>
                          </div>
                        </div>
                        <h3 className="font-medium mt-2">Inclusive Classroom Bundle</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Comprehensive set of visual supports, social stories, and activities
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Downloads: 1,245</span>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-purple-50 text-purple-700">Curriculum</Badge>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3" />
                            <span className="text-xs ml-1">(4.0)</span>
                          </div>
                        </div>
                        <h3 className="font-medium mt-2">Social Skills Curriculum</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          12-week program for developing social communication skills
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Downloads: 982</span>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-green-50 text-green-700">Template</Badge>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs ml-1">(5.0)</span>
                          </div>
                        </div>
                        <h3 className="font-medium mt-2">IEP Goal Bank & Templates</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Customizable templates and pre-written goals for IEPs
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Downloads: 2,103</span>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-red-50 text-red-700">Webinar</Badge>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <Star className="h-3 w-3" />
                            <span className="text-xs ml-1">(4.2)</span>
                          </div>
                        </div>
                        <h3 className="font-medium mt-2">Sensory-Friendly Classroom Strategies</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recorded webinar with downloadable resources
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Views: 876</span>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MaterialsPage;
