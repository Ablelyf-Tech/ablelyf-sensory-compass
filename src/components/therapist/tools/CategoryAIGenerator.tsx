
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { TherapyToolTypes } from '@/types';
import { Sparkles } from 'lucide-react';
import { categoryPrompts } from './ai/CategoryPromptsData';
import { PromptExamples } from './ai/PromptExamples';
import { GeneratedToolCard } from './ai/GeneratedToolCard';
import { GeneratingToolSkeleton } from './ai/GeneratingToolSkeleton';
import { GeneratedCategoryTool } from './ai/CategoryAITypes';

interface CategoryAIGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: TherapyToolTypes;
}

export const CategoryAIGenerator: React.FC<CategoryAIGeneratorProps> = ({ 
  open, 
  onOpenChange, 
  category 
}) => {
  const [prompt, setPrompt] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTool, setGeneratedTool] = useState<GeneratedCategoryTool | null>(null);
  
  const promptInfo = categoryPrompts[category] || {
    category,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Tools Generator`,
    description: `Generate customized ${category} tools and resources`,
    examples: [`Create a ${category} tool for children`]
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt describing the tool you need');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulating AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call an API endpoint
      const newTool: GeneratedCategoryTool = {
        id: `ai-tool-${Date.now()}`,
        title: `AI Generated: ${prompt.slice(0, 30)}...`,
        description: `This is an AI-generated ${category} tool based on your specific requirements. It has been tailored for age range ${ageRange || 'all ages'}.`,
        category,
        ageRange: ageRange || 'All ages',
        prompt,
        content: `The AI has generated content for a ${category} tool based on: "${prompt}". This would include customized activities, worksheets, visual supports, or assessment tools depending on the request.`,
      };
      
      setGeneratedTool(newTool);
      toast.success('Tool generated successfully!');
    } catch (error) {
      console.error('Error generating tool:', error);
      toast.error('Failed to generate tool. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleSave = () => {
    if (generatedTool) {
      toast.success('Tool saved to your library');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{promptInfo.title}</DialogTitle>
          <DialogDescription>{promptInfo.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">What kind of {category} tool do you need?</Label>
            <Textarea
              id="prompt"
              placeholder={`E.g., ${promptInfo.examples[0]}`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age-range">Age Range (optional)</Label>
            <Input
              id="age-range"
              placeholder="E.g., 3-5, 6-12, 13-18, or adults"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            />
          </div>

          <PromptExamples 
            promptInfo={promptInfo} 
            onExampleClick={handleExampleClick} 
          />

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? 'Generating...' : `Generate ${category.charAt(0).toUpperCase() + category.slice(1)} Tool`}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>

          {isGenerating && <GeneratingToolSkeleton />}

          {!isGenerating && generatedTool && (
            <GeneratedToolCard 
              tool={generatedTool}
              onSave={handleSave}
            />
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
