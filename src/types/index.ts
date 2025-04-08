
export type UserRole = 'therapist' | 'teacher' | 'hr' | 'caregiver' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosisDate?: string;
  condition?: string[];
  caregivers?: string[];
  therapists?: string[];
  teachers?: string[];
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'stats' | 'alerts' | 'activity' | 'progress' | 'calendar';
  data?: any;
}

export interface ProgressData {
  id: string;
  patientId: string;
  date: string;
  category: string;
  value: number;
  notes?: string;
}

export interface AlertData {
  id: string;
  patientId: string;
  type: 'behavioral' | 'sensory' | 'medical' | 'emergency';
  timestamp: string;
  message: string;
  resolved: boolean;
  severity: 'low' | 'medium' | 'high';
  actions?: string[];
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

export interface TherapyGoal {
  id: string;
  title: string;
  description: string;
  metrics: string[];
  targetDate?: string;
  status: 'not-started' | 'in-progress' | 'achieved';
  progress: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  type: 'therapy' | 'doctor' | 'school' | 'activity' | 'medication' | 'other';
  location?: string;
  description?: string;
  participants?: string[];
  completed?: boolean;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'none';
}
