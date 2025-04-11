
import { TherapyToolTypes } from '@/types';
import { CategoryPrompt } from './CategoryAITypes';

export const categoryPrompts: Record<TherapyToolTypes, CategoryPrompt> = {
  assessment: {
    category: 'assessment',
    title: 'Assessment Tools Generator',
    description: 'Generate customized assessment tools, questionnaires, and evaluation forms',
    examples: [
      'Create a sensory processing assessment for a 5-year-old',
      'Generate a communication skills checklist for teenagers',
      'Design a behavioral observation form for classroom settings'
    ]
  },
  visual: {
    category: 'visual',
    title: 'Visual Supports Generator',
    description: 'Create visual schedules, communication boards, and other visual aids',
    examples: [
      'Design a morning routine visual schedule for a child with autism',
      'Create a feelings identification chart with realistic photos',
      'Generate a visual communication board for non-verbal children'
    ]
  },
  motor: {
    category: 'motor',
    title: 'Motor Skills Activities Generator',
    description: 'Generate fine and gross motor skill development activities',
    examples: [
      'Create fine motor activities using household items for preschoolers',
      'Design a gross motor obstacle course for a small therapy room',
      'Generate hand-strengthening exercises for a child with poor pencil grip'
    ]
  },
  communication: {
    category: 'communication',
    title: 'Communication Tools Generator',
    description: 'Create speech, language, and communication development resources',
    examples: [
      'Generate conversation starter cards for social skills groups',
      'Create articulation practice activities for the "r" sound',
      'Design a communication board for a child with limited verbal skills'
    ]
  },
  behavioral: {
    category: 'behavioral',
    title: 'Behavioral Tools Generator',
    description: 'Create behavior management strategies and intervention tools',
    examples: [
      'Generate a token economy system for classroom behavior management',
      'Create a behavior tracking chart for home use',
      'Design a social story about managing frustration'
    ]
  },
  social: {
    category: 'social',
    title: 'Social Skills Tools Generator',
    description: 'Create social interaction and emotional learning resources',
    examples: [
      'Generate conversation topic cards for teens with social anxiety',
      'Create a feelings identification activity with scenarios',
      'Design a friendship skills curriculum for small groups'
    ]
  },
  sensory: {
    category: 'sensory',
    title: 'Sensory Processing Tools Generator',
    description: 'Create sensory integration activities and resources',
    examples: [
      'Generate a list of calming sensory activities for an overstimulated child',
      'Create a sensory diet for a child with tactile defensiveness',
      'Design a sensory-friendly classroom modifications guide'
    ]
  },
  cognitive: {
    category: 'cognitive',
    title: 'Cognitive Skills Tools Generator',
    description: 'Create problem-solving and executive function resources',
    examples: [
      'Generate executive functioning worksheets for teens',
      'Create memory and attention activities for elementary students',
      'Design a visual problem-solving sequence for daily challenges'
    ]
  }
};
