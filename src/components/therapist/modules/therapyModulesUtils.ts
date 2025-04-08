
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
