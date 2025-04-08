
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

// Patient types
export interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosisDate: string;
  condition: string[];
  caregivers: string[];
  therapists: string[];
  teachers: string[];
}

// Progress tracking types
export interface ProgressData {
  id: string;
  patientId: string;
  date: string;
  category: string;
  value: number;
  notes?: string;
}

// Alert types
export interface AlertData {
  id: string;
  patientId: string;
  type: 'behavioral' | 'sensory' | 'medical' | 'emergency';
  timestamp: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
}

// Therapy Plan types
export interface TherapyGoal {
  id: string;
  title: string;
  description: string;
  metrics: string[];
  targetDate: string;
  status: 'not-started' | 'in-progress' | 'achieved';
  progress: number;
}

export interface TherapyPlan {
  id: string;
  patientId: string;
  title: string;
  goals: TherapyGoal[];
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'draft';
}

// Calendar event types
export interface CalendarEvent {
  id: string;
  title: string;
  patientId?: string;
  patientName?: string;
  start: string;
  end: string;
  type: 'session' | 'assessment' | 'meeting' | 'reminder';
  location?: string;
  description?: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
}
