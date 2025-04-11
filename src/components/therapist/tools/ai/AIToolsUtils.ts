
import { TherapyToolTypes } from '@/types';

// Helper function to get badge color based on category
export const getCategoryBadgeColor = (category: TherapyToolTypes): string => {
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

// Example tools data for the AI library
export const exampleTools = [
  {
    id: 'ai-tool-1',
    title: 'Daily Emotional Check-In Visual Support',
    description: 'A visual aid to help children identify and express their emotions throughout the day.',
    category: 'visual' as TherapyToolTypes,
    ageRange: '4-10',
    prompt: 'Create a visual emotional check-in tool for young children',
    content: 'Comprehensive visual chart with emoji faces representing different emotions and simple strategies for regulation',
  },
  {
    id: 'ai-tool-2',
    title: 'Sensory Processing Assessment Questionnaire',
    description: 'A detailed assessment tool to identify sensory processing challenges across multiple domains.',
    category: 'assessment' as TherapyToolTypes,
    ageRange: '3-18',
    prompt: 'Generate a comprehensive sensory processing assessment',
    content: 'Multi-page assessment covering tactile, auditory, visual, vestibular and proprioceptive processing',
  },
  {
    id: 'ai-tool-3',
    title: 'Social Skills Story Creator',
    description: 'Generate customized social stories to address specific behavioral challenges.',
    category: 'social' as TherapyToolTypes,
    ageRange: '5-12',
    prompt: 'Create a social story template for playground interactions',
    content: 'Editable social story template with placeholders for personalization',
  }
];
