
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles } from 'lucide-react';

interface CreateToolsTabProps {
  onOpenCreateDialog: () => void;
}

export const CreateToolsTab: React.FC<CreateToolsTabProps> = ({
  onOpenCreateDialog
}) => {
  return (
    <div className="bg-muted/40 rounded-lg p-8 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Create New Therapy Tools</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your own therapy materials or let AI generate customized tools for your specific needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-card border rounded-lg p-6 text-center flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Upload Existing Tool</h3>
          <p className="text-muted-foreground text-sm">
            Upload your PDF, document, or image files to share with other therapists
          </p>
          <Button onClick={onOpenCreateDialog}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Tool
          </Button>
        </div>
        
        <div className="bg-card border rounded-lg p-6 text-center flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Generate with AI</h3>
          <p className="text-muted-foreground text-sm">
            Describe what you need and our AI will create customized therapy tools
          </p>
          <Button onClick={onOpenCreateDialog}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Tool
          </Button>
        </div>
      </div>
      
      <div className="bg-card border rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-medium mb-4">Quick Create</h3>
        <div className="flex gap-2">
          <Input placeholder="Describe the therapy tool you need..." className="flex-1" />
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Quick Generate
          </Button>
        </div>
      </div>
    </div>
  );
};
