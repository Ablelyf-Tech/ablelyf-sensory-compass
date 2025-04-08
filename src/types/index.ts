// User types
export type UserRole = 'therapist' | 'caregiver' | 'admin' | 'teacher' | 'hr';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Therapy tool types
export type TherapyToolTypes = 'assessment' | 'visual' | 'motor' | 'communication' | 'behavioral' | 'social' | 'sensory' | 'cognitive';

export interface TherapyTool {
  id: string;
  title: string;
  description: string;
  category: TherapyToolTypes;
  ageRange: string;
  fileType: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
  favorited: boolean;
  fileSize?: string;
  content?: string;
}
