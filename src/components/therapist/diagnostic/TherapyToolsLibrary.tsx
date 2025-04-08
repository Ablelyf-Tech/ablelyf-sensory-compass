
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Bookmark, BookmarkCheck } from 'lucide-react';

type TherapyTool = {
  id: string;
  title: string;
  description: string;
  category: string;
  ageRange: string;
  fileType: string;
  saved: boolean;
};

export const TherapyToolsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [tools, setTools] = useState<TherapyTool[]>([
    {
      id: '1',
      title: 'Sensory Processing Assessment',
      description: 'Comprehensive assessment tool for evaluating sensory processing patterns in children.',
      category: 'assessment',
      ageRange: '3-12',
      fileType: 'PDF',
      saved: false,
    },
    {
      id: '2',
      title: 'Visual Schedule Cards',
      description: 'Printable visual schedule cards for establishing routines and transitions.',
      category: 'visual',
      ageRange: '2-10',
      fileType: 'PDF',
      saved: true,
    },
    {
      id: '3',
      title: 'Fine Motor Skills Activities',
      description: 'Collection of activities designed to improve fine motor skills and dexterity.',
      category: 'motor',
      ageRange: '3-8',
      fileType: 'PDF',
      saved: false,
    },
    {
      id: '4',
      title: 'Communication Boards',
      description: 'Customizable communication boards for non-verbal or limited verbal children.',
      category: 'communication',
      ageRange: '2-15',
      fileType: 'PDF',
      saved: false,
    },
    {
      id: '5',
      title: 'Emotional Regulation Cards',
      description: 'Cards to help children identify and regulate their emotions.',
      category: 'behavioral',
      ageRange: '4-12',
      fileType: 'PDF',
      saved: true,
    },
    {
      id: '6',
      title: 'Social Stories Templates',
      description: 'Templates for creating social stories to help children understand social situations.',
      category: 'social',
      ageRange: '3-12',
      fileType: 'Word',
      saved: false,
    },
    {
      id: '7',
      title: 'Sensory Diet Planning Guide',
      description: 'Guide for planning appropriate sensory activities throughout the day.',
      category: 'sensory',
      ageRange: '2-18',
      fileType: 'PDF',
      saved: false,
    },
    {
      id: '8',
      title: 'Executive Function Activities',
      description: 'Activities to strengthen planning, organization, and impulse control.',
      category: 'cognitive',
      ageRange: '5-18',
      fileType: 'PDF',
      saved: false,
    },
  ]);

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'assessment', name: 'Assessment Tools' },
    { id: 'visual', name: 'Visual Supports' },
    { id: 'motor', name: 'Motor Skills' },
    { id: 'communication', name: 'Communication' },
    { id: 'behavioral', name: 'Behavioral' },
    { id: 'social', name: 'Social Skills' },
    { id: 'sensory', name: 'Sensory Processing' },
    { id: 'cognitive', name: 'Cognitive Skills' },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSaved = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, saved: !tool.saved } : tool
    ));
  };

  const downloadTool = (id: string) => {
    // In a real app, this would trigger a download
    console.log(`Downloading tool ${id}`);
    alert(`Tool download started.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for tools..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          Filter Options
        </Button>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="flex flex-wrap h-auto">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            {filteredTools.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No tools found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map(tool => (
                  <Card key={tool.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{tool.title}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => toggleSaved(tool.id)}
                        >
                          {tool.saved ? (
                            <BookmarkCheck className="h-5 w-5 text-primary" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                      <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Age: {tool.ageRange}</Badge>
                        <Badge variant="outline">{tool.fileType}</Badge>
                        <Badge variant="secondary" className="capitalize">
                          {tool.category}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full"
                        onClick={() => downloadTool(tool.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
