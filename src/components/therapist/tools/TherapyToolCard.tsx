
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { Download, Bookmark, BookmarkCheck, Info } from 'lucide-react';

interface TherapyToolCardProps {
  tool: TherapyTool;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
  onViewDetails: (tool: TherapyTool) => void;
  getCategoryBadgeColor: (category: TherapyToolTypes) => string;
}

export const TherapyToolCard: React.FC<TherapyToolCardProps> = ({
  tool,
  onToggleFavorite,
  onDownload,
  onViewDetails,
  getCategoryBadgeColor
}) => {
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
