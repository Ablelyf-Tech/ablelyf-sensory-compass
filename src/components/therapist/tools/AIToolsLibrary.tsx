
import React, { useState } from 'react';
import { toast } from 'sonner';
import { TherapyToolTypes } from '@/types';
import { AIGeneratedTool } from './ai/AIToolTypes';
import { AIToolGenerator } from './ai/AIToolGenerator';
import { AIToolsTabs } from './ai/AIToolsTabs';
import { exampleTools } from './ai/AIToolsUtils';

export const AIToolsLibrary: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedTools, setSavedTools] = useState<AIGeneratedTool[]>([]);
  const [generatedTools, setGeneratedTools] = useState<AIGeneratedTool[]>([]);
  const [promptHistory, setPromptHistory] = useState<string[]>([
    'Create a visual schedule for morning routine',
    'Design a sensory activity for children with tactile sensitivity',
    'Develop a communication board for non-verbal children',
    'Create a behavioral intervention plan for attention-seeking behavior'
  ]);

  const handleGenerate = async (prompt: string, category: TherapyToolTypes, ageRange: string) => {
    setIsGenerating(true);
    
    try {
      // Simulating AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call an API endpoint
      const newTool: AIGeneratedTool = {
        id: `ai-tool-${Date.now()}`,
        title: `AI Generated: ${prompt.slice(0, 30)}...`,
        description: `This is an AI-generated therapy tool based on your specific requirements. It has been tailored for the ${category} category and age range ${ageRange}.`,
        category,
        ageRange,
        prompt,
        content: `The AI has generated content for a therapy tool based on: "${prompt}". This would include customized activities, worksheets, visual supports, or assessment tools depending on the request.`,
      };
      
      // Add to generated tools
      setGeneratedTools(prev => [newTool, ...prev]);
      
      // Add to prompt history if not already there
      if (!promptHistory.includes(prompt)) {
        setPromptHistory(prev => [prompt, ...prev.slice(0, 9)]);
      }
      
      toast.success('Tool generated successfully!');
    } catch (error) {
      console.error('Error generating tool:', error);
      toast.error('Failed to generate tool. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTool = (tool: AIGeneratedTool) => {
    setSavedTools(prev => [tool, ...prev]);
    toast.success('Tool saved to your library');
  };

  const handleFeedback = (toolId: string, type: 'positive' | 'negative') => {
    setGeneratedTools(prev => 
      prev.map(tool => 
        tool.id === toolId ? { ...tool, feedback: type } : tool
      )
    );
    
    toast.success(`Thank you for your feedback! This helps improve future tools.`);
  };

  const handlePromptClick = (promptText: string) => {
    // Set the prompt in the generator
    // In this refactored version, we pass this function to the generator component
    // which will use it to set its internal prompt state
  };

  return (
    <div className="space-y-6">
      <AIToolGenerator
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        promptHistory={promptHistory}
        onPromptClick={handlePromptClick}
      />
      
      <AIToolsTabs
        generatedTools={generatedTools}
        savedTools={savedTools}
        exampleTools={exampleTools}
        isGenerating={isGenerating}
        onSave={handleSaveTool}
        onFeedback={handleFeedback}
      />
    </div>
  );
};
