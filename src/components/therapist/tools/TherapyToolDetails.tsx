
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { Download, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';

interface TherapyToolDetailsProps {
  tool: TherapyTool | null;
  open: boolean;
  onClose: () => void;
  onDownload: (id: string) => void;
  getCategoryBadgeColor: (category: TherapyToolTypes) => string;
}

export const TherapyToolDetails: React.FC<TherapyToolDetailsProps> = ({
  tool,
  open,
  onClose,
  onDownload,
  getCategoryBadgeColor
}) => {
  if (!tool) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{tool.title}</DialogTitle>
              <DialogDescription className="mt-1">
                <Badge className={getCategoryBadgeColor(tool.category)}>
                  {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
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
          <p>{tool.description}</p>
          
          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2">Tool Content</h4>
            <p>{tool.content}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Age Range</h4>
              <p className="text-sm">{tool.ageRange} years</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">File Type</h4>
              <p className="text-sm">{tool.fileType} - {tool.fileSize}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {tool.tags.map((tag, index) => (
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
            onClick={onClose}
          >
            Close
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => tool && onDownload(tool.id)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
