
import React from 'react';
import { TherapyTool, TherapyToolTypes } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X } from 'lucide-react';

interface TherapyModuleDetailsProps {
  tool: TherapyTool | null;
  open: boolean;
  onClose: () => void;
  onDownload: (id: string) => void;
}

export const TherapyModuleDetails: React.FC<TherapyModuleDetailsProps> = ({
  tool,
  open,
  onClose,
  onDownload
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

  if (!tool) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
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
        
        <div className="space-y-6 mt-4">
          <p className="text-base">{tool.description}</p>
          
          <div className="bg-muted p-6 rounded-md">
            <h4 className="font-medium text-lg mb-3">Tool Content</h4>
            <p className="whitespace-pre-line">{tool.content}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium">Age Range</h4>
                  <p className="text-sm">{tool.ageRange} years</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Format</h4>
                  <p className="text-sm">{tool.fileType} - {tool.fileSize}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Created</h4>
                  <p className="text-sm">{tool.createdAt}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, index) => (
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
            onClick={onClose}
          >
            Close
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => onDownload(tool.id)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
