
import { TherapyToolTypes } from '@/types';

export interface CategoryPrompt {
  category: TherapyToolTypes;
  title: string;
  description: string;
  examples: string[];
}

export interface GeneratedCategoryTool {
  id: string;
  title: string;
  description: string;
  category: TherapyToolTypes;
  ageRange: string;
  prompt: string;
  content: string;
}
