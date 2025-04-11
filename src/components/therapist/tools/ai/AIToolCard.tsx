
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Download, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';
import { AIGeneratedTool } from './AIToolTypes';
import { getCategoryBadgeColor } from './AIToolsUtils';

interface AIToolCardProps {
  tool: AIGeneratedTool;
  showFeedback?: boolean;
  showSave?: boolean;
  onSave?: (tool: AIGeneratedTool) => void;
  onFeedback?: (toolId: string, type: 'positive' | 'negative') => void;
}

export const AIToolCard: React.FC<AIToolCardProps> = ({ 
  tool, 
  showFeedback = true, 
  showSave = true,
  onSave,
  onFeedback
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave(tool);
    }
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    if (onFeedback) {
      onFeedback(tool.id, type);
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getCategoryBadgeColor(tool.category)}>
            {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
          </Badge>
          <Sparkles className="h-5 w-5 text-purple-500" />
        </div>
        <CardTitle className="text-lg mt-2">{tool.title}</CardTitle>
        <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="text-sm text-muted-foreground mb-2">
          <span>Ages: {tool.ageRange}</span>
        </div>
        <div className="bg-muted p-3 rounded-md text-sm h-24 overflow-y-auto">
          <p className="font-semibold mb-1">Generated from prompt:</p>
          <p className="italic">"{tool.prompt}"</p>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex gap-2">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          onClick={() => toast.success("Tool preview opened in a new tab")}
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => toast.success("Tool downloaded")}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        {showSave && (
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1"
            onClick={handleSave}
          >
            <Brain className="mr-2 h-4 w-4" />
            Save
          </Button>
        )}
        {showFeedback && (
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              className={`h-8 w-8 ${tool.feedback === 'positive' ? 'bg-green-100' : ''}`}
              onClick={() => handleFeedback('positive')}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`h-8 w-8 ${tool.feedback === 'negative' ? 'bg-red-100' : ''}`}
              onClick={() => handleFeedback('negative')}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
