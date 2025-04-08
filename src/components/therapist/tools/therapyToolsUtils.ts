
import { TherapyTool, TherapyToolTypes } from '@/types';

export const filterTools = (
  tools: TherapyTool[], 
  searchTerm: string, 
  activeCategory: TherapyToolTypes | 'all'
): TherapyTool[] => {
  return tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
};

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
