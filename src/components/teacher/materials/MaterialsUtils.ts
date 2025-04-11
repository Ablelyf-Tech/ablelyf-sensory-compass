
export const getCategoryColorScheme = (category: string): string => {
  const colors = {
    'Visual Supports': 'bg-amber-100 text-amber-800 border-amber-200',
    'Sensory': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Social Emotional': 'bg-pink-100 text-pink-800 border-pink-200',
    'Academic': 'bg-blue-100 text-blue-800 border-blue-200',
    'Executive Function': 'bg-purple-100 text-purple-800 border-purple-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const MATERIAL_CATEGORIES = [
  { id: 'all', label: 'All Materials' },
  { id: 'visual', label: 'Visual Supports', category: 'Visual Supports' },
  { id: 'sensory', label: 'Sensory', category: 'Sensory' },
  { id: 'social', label: 'Social Emotional', category: 'Social Emotional' },
  { id: 'academic', label: 'Academic', category: 'Academic' },
];

export interface MaterialItem {
  id: number;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  tags: string[];
}

export const mockMaterials: MaterialItem[] = [
  { 
    id: 1, 
    title: 'Visual Schedule Templates', 
    description: 'Customizable visual schedule templates for daily classroom routines.',
    category: 'Visual Supports',
    fileType: 'PDF, DOCX',
    fileSize: '2.5 MB',
    tags: ['Visual', 'Organization', 'Routine']
  },
  { 
    id: 2, 
    title: 'Sensory Break Activity Cards', 
    description: 'Printable cards with sensory break activities for classroom use.',
    category: 'Sensory',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    tags: ['Sensory', 'Movement', 'Regulation']
  },
  { 
    id: 3, 
    title: 'Social Story Templates', 
    description: 'Editable social story templates for various classroom situations.',
    category: 'Social Emotional',
    fileType: 'DOCX, PPT',
    fileSize: '3.2 MB',
    tags: ['Social', 'Communication', 'Behavior']
  },
  { 
    id: 4, 
    title: 'Modified Math Worksheets', 
    description: 'Math practice sheets with visual supports and scaffolded problems.',
    category: 'Academic',
    fileType: 'PDF',
    fileSize: '5.1 MB',
    tags: ['Math', 'Modification', 'Visual']
  },
  { 
    id: 5, 
    title: 'Executive Function Organizers', 
    description: 'Graphic organizers to support planning, organization, and time management.',
    category: 'Executive Function',
    fileType: 'PDF, DOCX',
    fileSize: '2.3 MB',
    tags: ['Organization', 'Planning', 'Time Management']
  },
  { 
    id: 6, 
    title: 'Calming Corner Resources', 
    description: 'Printable resources for setting up a classroom calming corner.',
    category: 'Sensory',
    fileType: 'PDF, JPG',
    fileSize: '4.7 MB',
    tags: ['Regulation', 'Sensory', 'Environment']
  },
];
