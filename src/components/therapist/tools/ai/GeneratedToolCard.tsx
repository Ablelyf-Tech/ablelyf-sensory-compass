
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Download, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { GeneratedCategoryTool } from './CategoryAITypes';

interface GeneratedToolCardProps {
  tool: GeneratedCategoryTool;
  onSave: () => void;
}

export const GeneratedToolCard: React.FC<GeneratedToolCardProps> = ({ 
  tool, 
  onSave 
}) => {
  return (
    <Card className="mt-4 border-t-4 border-t-primary">
      <CardHeader>
        <h3 className="text-lg font-semibold">{tool.title}</h3>
        <p className="text-sm text-muted-foreground">{tool.description}</p>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md">
          <p className="font-medium mb-2">Generated Content:</p>
          <p className="text-sm">{tool.content}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => toast.success("Tool downloaded")}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button onClick={onSave}>
          <ArrowRight className="mr-2 h-4 w-4" />
          Save to Library
        </Button>
      </CardFooter>
    </Card>
  );
};
