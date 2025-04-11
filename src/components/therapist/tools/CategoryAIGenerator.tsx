
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
import { Sparkles, Download, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryAIGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: TherapyToolTypes;
}

interface CategoryPrompt {
  category: TherapyToolTypes;
  title: string;
  description: string;
  examples: string[];
}

const categoryPrompts: Record<TherapyToolTypes, CategoryPrompt> = {
  assessment: {
    category: 'assessment',
    title: 'Assessment Tools Generator',
    description: 'Generate customized assessment tools, questionnaires, and evaluation forms',
    examples: [
      'Create a sensory processing assessment for a 5-year-old',
      'Generate a communication skills checklist for teenagers',
      'Design a behavioral observation form for classroom settings'
    ]
  },
  visual: {
    category: 'visual',
    title: 'Visual Supports Generator',
    description: 'Create visual schedules, communication boards, and other visual aids',
    examples: [
      'Design a morning routine visual schedule for a child with autism',
      'Create a feelings identification chart with realistic photos',
      'Generate a visual communication board for non-verbal children'
    ]
  },
  motor: {
    category: 'motor',
    title: 'Motor Skills Activities Generator',
    description: 'Generate fine and gross motor skill development activities',
    examples: [
      'Create fine motor activities using household items for preschoolers',
      'Design a gross motor obstacle course for a small therapy room',
      'Generate hand-strengthening exercises for a child with poor pencil grip'
    ]
  },
  communication: {
    category: 'communication',
    title: 'Communication Tools Generator',
    description: 'Create speech, language, and communication development resources',
    examples: [
      'Generate conversation starter cards for social skills groups',
      'Create articulation practice activities for the "r" sound',
      'Design a communication board for a child with limited verbal skills'
    ]
  },
  behavioral: {
    category: 'behavioral',
    title: 'Behavioral Tools Generator',
    description: 'Create behavior management strategies and intervention tools',
    examples: [
      'Generate a token economy system for classroom behavior management',
      'Create a behavior tracking chart for home use',
      'Design a social story about managing frustration'
    ]
  },
  social: {
    category: 'social',
    title: 'Social Skills Tools Generator',
    description: 'Create social interaction and emotional learning resources',
    examples: [
      'Generate conversation topic cards for teens with social anxiety',
      'Create a feelings identification activity with scenarios',
      'Design a friendship skills curriculum for small groups'
    ]
  },
  sensory: {
    category: 'sensory',
    title: 'Sensory Processing Tools Generator',
    description: 'Create sensory integration activities and resources',
    examples: [
      'Generate a list of calming sensory activities for an overstimulated child',
      'Create a sensory diet for a child with tactile defensiveness',
      'Design a sensory-friendly classroom modifications guide'
    ]
  },
  cognitive: {
    category: 'cognitive',
    title: 'Cognitive Skills Tools Generator',
    description: 'Create problem-solving and executive function resources',
    examples: [
      'Generate executive functioning worksheets for teens',
      'Create memory and attention activities for elementary students',
      'Design a visual problem-solving sequence for daily challenges'
    ]
  }
};

export const CategoryAIGenerator: React.FC<CategoryAIGeneratorProps> = ({ 
  open, 
  onOpenChange, 
  category 
}) => {
  const [prompt, setPrompt] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTool, setGeneratedTool] = useState<any>(null);
  
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
      const newTool = {
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

          <div className="space-y-2">
            <p className="text-sm font-medium">Examples</p>
            <div className="flex flex-wrap gap-2">
              {promptInfo.examples.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(example)}
                  className="text-xs"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? 'Generating...' : `Generate ${category.charAt(0).toUpperCase() + category.slice(1)} Tool`}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>

          {isGenerating && (
            <Card className="mt-4">
              <CardHeader>
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-3 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full rounded-md" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-28" />
              </CardFooter>
            </Card>
          )}

          {!isGenerating && generatedTool && (
            <Card className="mt-4 border-t-4 border-t-primary">
              <CardHeader>
                <h3 className="text-lg font-semibold">{generatedTool.title}</h3>
                <p className="text-sm text-muted-foreground">{generatedTool.description}</p>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-medium mb-2">Generated Content:</p>
                  <p className="text-sm">{generatedTool.content}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => toast.success("Tool downloaded")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handleSave}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Save to Library
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
