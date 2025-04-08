
import { ReactNode } from 'react';

export type UserRole = 'therapist' | 'caregiver' | 'teacher' | 'hr' | 'admin';

interface Participant {
  name: string;
  role: string;
  status: string;
  isCurrentUser?: boolean;
}

export const getSessionParticipants = (role: UserRole, userName?: string): Participant[] => {
  switch (role) {
    case 'therapist':
      return [
        { name: 'Alex Morgan', role: 'Patient', status: 'online' },
        { name: userName || 'Dr. Smith', role: 'Therapist', status: 'online', isCurrentUser: true }
      ];
    case 'caregiver':
      return [
        { name: userName || 'Jane Doe', role: 'Caregiver', status: 'online', isCurrentUser: true },
        { name: 'Dr. Williams', role: 'Therapist', status: 'online' }
      ];
    case 'teacher':
      return [
        { name: userName || 'Ms. Johnson', role: 'Teacher', status: 'online', isCurrentUser: true },
        { name: 'Student Group', role: 'Students', status: 'online' }
      ];
    case 'hr':
      return [
        { name: userName || 'Sarah Miller', role: 'HR Manager', status: 'online', isCurrentUser: true },
        { name: 'James Wilson', role: 'Employee', status: 'online' }
      ];
    case 'admin':
      return [
        { name: userName || 'Admin User', role: 'Administrator', status: 'online', isCurrentUser: true },
        { name: 'Department Heads', role: 'Attendees', status: 'online' }
      ];
    default:
      return [];
  }
};

export const getRoleSpecificNotes = (role: UserRole): string[] => {
  switch (role) {
    case 'therapist':
      return [
        "Focus on sensory regulation techniques",
        "Address communication strategies for school setting",
        "Review progress on social interaction goals"
      ];
    case 'caregiver':
      return [
        "Discuss morning routine effectiveness",
        "Address recent sensory triggers",
        "Plan for upcoming school transition"
      ];
    case 'teacher':
      return [
        "Review classroom accommodations",
        "Discuss group project participation strategies",
        "Plan for upcoming assessment modifications"
      ];
    case 'hr':
      return [
        "Review workplace accommodation implementation",
        "Discuss productivity support tools",
        "Address communication preferences"
      ];
    case 'admin':
      return [
        "System performance review",
        "User satisfaction metrics",
        "Implementation timeline discussion"
      ];
    default:
      return [];
  }
};
