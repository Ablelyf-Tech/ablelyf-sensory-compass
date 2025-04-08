
import { useState, useEffect } from 'react';
import { UserRole } from '../video-session/RoleSpecificHelper';

export const useRoleSpecificContent = (role: UserRole) => {
  const [aiSentiment, setAiSentiment] = useState<'positive' | 'neutral' | 'negative'>('neutral');
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  const getRoleSpecificTitle = () => {
    switch (role) {
      case 'therapist':
        return 'Therapy Session';
      case 'caregiver':
        return 'Remote Care Session';
      case 'teacher':
        return 'Classroom Session';
      case 'hr':
        return 'Employee Consultation';
      case 'admin':
        return 'Administrative Meeting';
      default:
        return 'Video Session';
    }
  };

  const getRoleSpecificInsights = () => {
    switch (role) {
      case 'therapist':
        return [
          "Patient shows increased engagement in the last 5 minutes",
          "Voice tone indicates reduced anxiety levels",
          "Facial expressions suggest positive response to therapy"
        ];
      case 'caregiver':
        return [
          "Sensory response patterns improved by 15%",
          "Morning routine adherence increased",
          "Reduced sensory overload indicators"
        ];
      case 'teacher':
        return [
          "Student attention span: 8.5 minutes (15% increase)",
          "Participation increased during interactive segments",
          "Responded well to visual learning elements"
        ];
      case 'hr':
        return [
          "Accommodation effectiveness increased by 12%",
          "Communication clarity metrics improved",
          "Workplace satisfaction indicators positive"
        ];
      case 'admin':
        return [
          "System performance metrics stable",
          "User engagement metrics trending upward",
          "Satisfaction metrics above threshold"
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const sentiments = ['positive', 'neutral', 'negative'] as const;
      const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      setAiSentiment(randomSentiment);
      
      setAiInsights(getRoleSpecificInsights());
    }, 5000);

    return () => clearInterval(timer);
  }, [role]);

  return {
    title: getRoleSpecificTitle(),
    aiSentiment,
    aiInsights
  };
};
