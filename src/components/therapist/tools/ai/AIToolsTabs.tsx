
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AIGeneratedTool } from './AIToolTypes';
import { AIToolCard } from './AIToolCard';

interface AIToolsTabsProps {
  generatedTools: AIGeneratedTool[];
  savedTools: AIGeneratedTool[];
  exampleTools: AIGeneratedTool[];
  isGenerating: boolean;
  onSave: (tool: AIGeneratedTool) => void;
  onFeedback: (toolId: string, type: 'positive' | 'negative') => void;
}

export const AIToolsTabs: React.FC<AIToolsTabsProps> = ({
  generatedTools,
  savedTools,
  exampleTools,
  isGenerating,
  onSave,
  onFeedback
}) => {
  return (
    <Tabs defaultValue="generated" className="w-full">
      <TabsList className="w-full max-w-md grid grid-cols-3">
        <TabsTrigger value="generated">Recently Generated</TabsTrigger>
        <TabsTrigger value="saved">My Saved Tools</TabsTrigger>
        <TabsTrigger value="examples">Example Tools</TabsTrigger>
      </TabsList>
      
      <TabsContent value="generated" className="mt-4">
        {isGenerating && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="h-full">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="pb-2">
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-24 w-full rounded-md" />
                </CardContent>
                <CardFooter className="pt-2 flex gap-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {!isGenerating && generatedTools.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No tools generated yet</h3>
            <p className="text-muted-foreground">
              Use the generator above to create your first AI therapy tool
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedTools.map(tool => (
              <AIToolCard 
                key={tool.id}
                tool={tool} 
                onSave={onSave}
                onFeedback={onFeedback}
              />
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="saved" className="mt-4">
        {savedTools.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No saved tools yet</h3>
            <p className="text-muted-foreground">
              Save generated tools to access them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedTools.map(tool => (
              <AIToolCard 
                key={tool.id}
                tool={tool} 
                showFeedback={false} 
                showSave={false}
              />
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="examples" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exampleTools.map(tool => (
            <AIToolCard 
              key={tool.id}
              tool={tool} 
              showFeedback={false}
              onSave={onSave}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
