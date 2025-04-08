
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

export type TherapyType = 
  | 'speech' 
  | 'occupational' 
  | 'physical' 
  | 'behavioral' 
  | 'cognitive' 
  | 'sensory-integration' 
  | 'play' 
  | 'music' 
  | 'art';

export type ConditionType = 
  | 'autism-spectrum-disorder'
  | 'adhd'
  | 'sensory-processing-disorder'
  | 'learning-disability'
  | 'developmental-delay'
  | 'intellectual-disability'
  | 'communication-disorder'
  | 'physical-disability'
  | 'other';

export type TherapyActivity = {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  materials: string[];
  steps: string[];
  targetAreas: ConditionArea[];
  suitableConditions: ConditionType[];
  therapyTypes: TherapyType[];
  suitableSeverities: ConditionSeverity[];
  expectedOutcomes: string[];
  adaptations?: {
    severity: ConditionSeverity;
    description: string;
  }[];
};

export type TherapyPlanTemplate = {
  id: string;
  name: string;
  description: string;
  conditionType: ConditionType;
  targetAreas: ConditionArea[];
  therapyTypes: TherapyType[];
  suitableSeverities: ConditionSeverity[];
  duration: number; // in weeks
  frequency: number; // sessions per week
  goals: {
    area: ConditionArea;
    description: string;
    measurableOutcomes: string[];
  }[];
  recommendedActivities: string[]; // IDs of TherapyActivity
};
