
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TherapyToolTypes } from '@/types';
import { toast } from 'sonner';

interface AIToolGeneratorProps {
  onGenerate: (prompt: string, category: TherapyToolTypes, ageRange: string) => Promise<void>;
  isGenerating: boolean;
  promptHistory: string[];
  onPromptClick: (prompt: string) => void;
}

export const AIToolGenerator: React.FC<AIToolGeneratorProps> = ({
  onGenerate,
  isGenerating,
  promptHistory,
  onPromptClick
}) => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<TherapyToolTypes>('assessment');
  const [ageRange, setAgeRange] = useState('3-12');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt describing the tool you need');
      return;
    }
    
    await onGenerate(prompt, category, ageRange);
    setPrompt('');
  };

  return (
    <div className="bg-muted/40 rounded-lg p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">AI Therapy Tools Generator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Describe the therapy tool you need, and our AI will generate it for you in seconds
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2 col-span-2">
          <label htmlFor="prompt" className="text-sm font-medium">What kind of therapy tool do you need?</label>
          <Textarea 
            id="prompt"
            placeholder="E.g., Create a visual schedule for morning routine activities for a 6-year-old with ADHD"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select 
              id="category"
              className="w-full p-2 border rounded-md" 
              value={category}
              onChange={(e) => setCategory(e.target.value as TherapyToolTypes)}
            >
              <option value="assessment">Assessment</option>
              <option value="visual">Visual Supports</option>
              <option value="motor">Motor Skills</option>
              <option value="communication">Communication</option>
              <option value="behavioral">Behavioral</option>
              <option value="social">Social Skills</option>
              <option value="sensory">Sensory Processing</option>
              <option value="cognitive">Cognitive Skills</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="age-range" className="text-sm font-medium">Age Range</label>
            <Input 
              id="age-range"
              placeholder="E.g., 3-8, 9-12, 13-18" 
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !prompt.trim()}
          className="px-8"
        >
          {isGenerating ? 'Generating...' : 'Generate Tool'}
          <Sparkles className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Recent prompts</p>
        <div className="flex flex-wrap gap-2">
          {promptHistory.slice(0, 5).map((text, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="cursor-pointer hover:bg-muted"
              onClick={() => onPromptClick(text)}
            >
              {text.length > 30 ? `${text.substring(0, 30)}...` : text}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
