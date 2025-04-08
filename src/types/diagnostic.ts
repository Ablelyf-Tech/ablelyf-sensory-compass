
import { Patient } from './index';

export type ConditionSeverity = 'mild' | 'moderate' | 'severe';

export type ConditionArea = 
  | 'communication' 
  | 'sensory' 
  | 'social' 
  | 'behavioral' 
  | 'cognitive' 
  | 'motor';

export type AssessmentQuestion = {
  id: string;
  text: string;
  area: ConditionArea;
  options: {
    value: number;
    label: string;
  }[];
};

export type ConditionAssessment = {
  id: string;
  patientId: string;
  date: string;
  primaryCondition: string;
  areas: {
    [key in ConditionArea]?: {
      score: number;
      severity: ConditionSeverity;
      notes: string;
    }
  };
  overallSeverity: ConditionSeverity;
  recommendedTherapies: TherapyTool[];
  createdBy: string;
};

export type TherapyTool = {
  id: string;
  name: string;
  description: string;
  targetAreas: ConditionArea[];
  suitableSeverities: ConditionSeverity[];
  instructions: string;
  evidenceBase: string;
  resources: {
    title: string;
    url: string;
  }[];
};
