
import React from 'react';
import { Button } from '@/components/ui/button';
import { CategoryPrompt } from './CategoryAITypes';

interface PromptExamplesProps {
  promptInfo: CategoryPrompt;
  onExampleClick: (example: string) => void;
}

export const PromptExamples: React.FC<PromptExamplesProps> = ({ 
  promptInfo, 
  onExampleClick 
}) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Examples</p>
      <div className="flex flex-wrap gap-2">
        {promptInfo.examples.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onExampleClick(example)}
            className="text-xs"
          >
            {example}
          </Button>
        ))}
      </div>
    </div>
  );
};
