
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { getTherapyTools } from '@/data/therapyToolsData';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { Search, Filter, Download, Bookmark, BookmarkCheck, Info, X, FileText, Eye, Brain } from 'lucide-react';

const TherapyModules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<TherapyToolTypes | 'all'>('assessment');
  const [selectedTool, setSelectedTool] = useState<TherapyTool | null>(null);
  const tools = getTherapyTools();

  // Filter tools based on search term and active category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: TherapyToolTypes) => {
    const icons = {
      'assessment': Brain,
      'visual': Eye,
      'motor': Brain,
      'communication': FileText,
      'behavioral': Brain,
      'social': Brain,
      'sensory': Brain,
      'cognitive': Brain,
    };
    return icons[category] || Brain;
  };

  const getCategoryBadgeColor = (category: TherapyToolTypes) => {
    const colors = {
      'assessment': 'bg-blue-100 text-blue-800 border-blue-200',
      'visual': 'bg-amber-100 text-amber-800 border-amber-200',
      'motor': 'bg-green-100 text-green-800 border-green-200',
      'communication': 'bg-purple-100 text-purple-800 border-purple-200',
      'behavioral': 'bg-red-100 text-red-800 border-red-200',
      'social': 'bg-pink-100 text-pink-800 border-pink-200',
      'sensory': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'cognitive': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const toggleFavorite = (id: string) => {
    console.log(`Favoriting tool: ${id}`);
    // Implementation would update state or call an API
  };

  const downloadTool = (id: string) => {
    console.log(`Downloading tool: ${id}`);
    alert(`Starting download for therapy tool`);
    // Implementation would handle the download
  };

  const openToolDetails = (tool: TherapyTool) => {
    setSelectedTool(tool);
  };

  const closeToolDetails = () => {
    setSelectedTool(null);
  };

  const categories: { id: TherapyToolTypes | 'all', label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'assessment', label: 'Assessment' },
    { id: 'visual', label: 'Visual' },
    { id: 'motor', label: 'Motor' },
    { id: 'communication', label: 'Communication' },
    { id: 'behavioral', label: 'Behavioral' },
    { id: 'social', label: 'Social' },
    { id: 'sensory', label: 'Sensory' },
    { id: 'cognitive', label: 'Cognitive' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Therapy Modules</h1>
        <p className="text-muted-foreground">
          Comprehensive collection of assessment tools and therapeutic activities
        </p>
      </div>

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

      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as TherapyToolTypes | 'all')}>
        <TabsList className="flex flex-wrap h-auto mb-6">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => (
            <Card key={tool.id} className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={getCategoryBadgeColor(tool.category)}>
                    {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => toggleFavorite(tool.id)}
                  >
                    {tool.favorited ? 
                      <BookmarkCheck className="h-5 w-5 text-primary" /> : 
                      <Bookmark className="h-5 w-5" />
                    }
                  </Button>
                </div>
                <CardTitle className="text-lg mt-2">{tool.title}</CardTitle>
                <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tool.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tool.tags.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-x-4">
                  <span>Ages: {tool.ageRange}</span>
                  <span>{tool.fileType}</span>
                  {tool.fileSize && <span>{tool.fileSize}</span>}
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => downloadTool(tool.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-9 p-0" 
                  onClick={() => openToolDetails(tool)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Tabs>

      <Dialog open={selectedTool !== null} onOpenChange={(open) => !open && closeToolDetails()}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl">{selectedTool?.title}</DialogTitle>
                <DialogDescription className="mt-1">
                  <Badge className={selectedTool ? getCategoryBadgeColor(selectedTool.category) : ''}>
                    {selectedTool?.category.charAt(0).toUpperCase() + selectedTool?.category.slice(1)}
                  </Badge>
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <p className="text-base">{selectedTool?.description}</p>
            
            <div className="bg-muted p-6 rounded-md">
              <h4 className="font-medium text-lg mb-3">Tool Content</h4>
              <p className="whitespace-pre-line">{selectedTool?.content}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium">Age Range</h4>
                    <p className="text-sm">{selectedTool?.ageRange} years</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Format</h4>
                    <p className="text-sm">{selectedTool?.fileType} - {selectedTool?.fileSize}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Created</h4>
                    <p className="text-sm">{selectedTool?.createdAt}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedTool?.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={closeToolDetails}
            >
              Close
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => selectedTool && downloadTool(selectedTool.id)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TherapyModules;
