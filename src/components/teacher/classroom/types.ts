
export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  accommodations: string[];
  status: string;
  lastAssessment: string;
}

export interface Goal {
  id: number;
  name: string;
  progress: number;
  target: string;
  category?: string;
  notes?: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  endTime: Date;
  type: string;
  participants: string[];
  notes: string;
  location?: string;
}

export interface Material {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url?: string;
  type: string;
  dateAdded: string;
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  usage: string;
  url?: string;
  tags: string[];
}

export interface ProgressReport {
  id: number;
  title: string;
  studentId: number;
  reportType: string;
  date: string;
  period: string;
  summary: string;
  academicProgress?: string;
  behavioralProgress?: string;
  socialProgress?: string;
  recommendations?: string;
}
