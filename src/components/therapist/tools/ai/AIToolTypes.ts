
import { TherapyToolTypes } from '@/types';

export interface AIGeneratedTool {
  id: string;
  title: string;
  description: string;
  category: TherapyToolTypes;
  ageRange: string;
  prompt: string;
  content: string;
  feedback?: 'positive' | 'negative';
}
