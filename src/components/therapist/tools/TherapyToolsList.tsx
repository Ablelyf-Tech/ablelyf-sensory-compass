
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { Download, Bookmark, BookmarkCheck, Info, X } from 'lucide-react';
import { getTherapyTools } from '@/data/therapyToolsData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

interface TherapyToolsListProps {
  searchTerm: string;
  activeCategory: TherapyToolTypes | 'all';
}

export const TherapyToolsList: React.FC<TherapyToolsListProps> = ({ 
  searchTerm, 
  activeCategory 
}) => {
  const allTools = getTherapyTools();
  const [selectedTool, setSelectedTool] = useState<TherapyTool | null>(null);

  // Filter tools based on search term and active category
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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

  if (filteredTools.length === 0) {
    return (
      <Card className="h-64 flex items-center justify-center">
        <CardContent className="text-center p-6">
          <h3 className="text-lg font-medium mb-2">No tools found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or category selection.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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

      <Dialog open={selectedTool !== null} onOpenChange={(open) => !open && closeToolDetails()}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
          
          <div className="space-y-4 mt-2">
            <p>{selectedTool?.description}</p>
            
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Tool Content</h4>
              <p>{selectedTool?.content}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Age Range</h4>
                <p className="text-sm">{selectedTool?.ageRange} years</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">File Type</h4>
                <p className="text-sm">{selectedTool?.fileType} - {selectedTool?.fileSize}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {selectedTool?.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={closeToolDetails}
            >
              Close
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => selectedTool && downloadTool(selectedTool.id)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
