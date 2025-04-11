
import { Student } from './types';

export const mockStudents: Student[] = [
  { 
    id: 1, 
    name: 'Jamie Rodriguez', 
    age: 9,
    grade: '3rd Grade',
    accommodations: ['Visual supports', 'Noise-canceling headphones', 'Movement breaks'],
    status: 'Active IEP',
    lastAssessment: '2025-03-15'
  },
  { 
    id: 2, 
    name: 'Taylor Wilson', 
    age: 8,
    grade: '3rd Grade',
    accommodations: ['Extended time', 'Preferential seating', 'Written instructions'],
    status: 'Active 504',
    lastAssessment: '2025-03-01'
  },
  { 
    id: 3, 
    name: 'Alex Chen', 
    age: 9,
    grade: '3rd Grade',
    accommodations: ['Visual schedule', 'Fidget tools', 'Check-in system'],
    status: 'Under Evaluation',
    lastAssessment: '2025-04-02'
  },
  { 
    id: 4, 
    name: 'Jordan Santos', 
    age: 8,
    grade: '3rd Grade',
    accommodations: ['Simplified directions', 'Frequent breaks', 'Sensory tools'],
    status: 'Active IEP',
    lastAssessment: '2025-02-20'
  },
  { 
    id: 5, 
    name: 'Riley Kim', 
    age: 9,
    grade: '3rd Grade',
    accommodations: ['Visual timer', 'Alternate workspace', 'Movement opportunities'],
    status: 'Active 504',
    lastAssessment: '2025-03-10'
  },
];
