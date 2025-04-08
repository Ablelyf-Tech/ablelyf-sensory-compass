
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { Download, Bookmark, BookmarkCheck, Info } from 'lucide-react';

interface TherapyModuleCardProps {
  tool: TherapyTool;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
  onViewDetails: (tool: TherapyTool) => void;
}

export const TherapyModuleCard: React.FC<TherapyModuleCardProps> = ({
  tool,
  onToggleFavorite,
  onDownload,
  onViewDetails
}) => {
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

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getCategoryBadgeColor(tool.category)}>
            {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
          </Badge>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onToggleFavorite(tool.id)}
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
          onClick={() => onDownload(tool.id)}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-9 p-0" 
          onClick={() => onViewDetails(tool)}
        >
          <Info className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
