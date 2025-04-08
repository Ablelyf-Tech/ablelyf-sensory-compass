
import { AssessmentQuestion, TherapyTool } from '@/types/diagnostic';

export const diagnosticQuestions: AssessmentQuestion[] = [
  // Communication Area
  {
    id: 'comm-1',
    text: 'How well does the individual express basic needs and wants?',
    area: 'communication',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Unable to express' }
    ]
  },
  {
    id: 'comm-2',
    text: 'How is the individual\'s ability to understand and follow verbal instructions?',
    area: 'communication',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Unable to understand' }
    ]
  },
  
  // Sensory Area
  {
    id: 'sens-1',
    text: 'How does the individual respond to loud noises or busy environments?',
    area: 'sensory',
    options: [
      { value: 0, label: 'No sensitivity' },
      { value: 25, label: 'Mild sensitivity' },
      { value: 50, label: 'Moderate sensitivity' },
      { value: 75, label: 'High sensitivity' },
      { value: 100, label: 'Extreme sensitivity' }
    ]
  },
  {
    id: 'sens-2',
    text: 'How does the individual respond to different textures (food, clothing, etc.)?',
    area: 'sensory',
    options: [
      { value: 0, label: 'No sensitivity' },
      { value: 25, label: 'Mild sensitivity' },
      { value: 50, label: 'Moderate sensitivity' },
      { value: 75, label: 'High sensitivity' },
      { value: 100, label: 'Extreme sensitivity' }
    ]
  },
  
  // Social Area
  {
    id: 'soc-1',
    text: 'How well does the individual engage in social interactions with peers?',
    area: 'social',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Unable to engage' }
    ]
  },
  {
    id: 'soc-2',
    text: 'How well does the individual understand social cues and non-verbal communication?',
    area: 'social',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Unable to understand' }
    ]
  },
  
  // Behavioral Area
  {
    id: 'behav-1',
    text: 'How frequently does the individual exhibit repetitive behaviors?',
    area: 'behavioral',
    options: [
      { value: 0, label: 'Never' },
      { value: 25, label: 'Rarely' },
      { value: 50, label: 'Sometimes' },
      { value: 75, label: 'Often' },
      { value: 100, label: 'Very frequently' }
    ]
  },
  {
    id: 'behav-2',
    text: 'How well does the individual manage transitions between activities?',
    area: 'behavioral',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Extreme difficulty' }
    ]
  },
  
  // Cognitive Area
  {
    id: 'cog-1',
    text: 'How is the individual\'s ability to focus on tasks?',
    area: 'cognitive',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Extreme difficulty' }
    ]
  },
  {
    id: 'cog-2',
    text: 'How does the individual solve problems or adapt to new situations?',
    area: 'cognitive',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Extreme difficulty' }
    ]
  },
  
  // Motor Area
  {
    id: 'motor-1',
    text: 'How is the individual\'s fine motor control (writing, buttoning, etc.)?',
    area: 'motor',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Extreme difficulty' }
    ]
  },
  {
    id: 'motor-2',
    text: 'How is the individual\'s gross motor coordination (running, jumping, etc.)?',
    area: 'motor',
    options: [
      { value: 0, label: 'No difficulty' },
      { value: 25, label: 'Mild difficulty' },
      { value: 50, label: 'Moderate difficulty' },
      { value: 75, label: 'Significant difficulty' },
      { value: 100, label: 'Extreme difficulty' }
    ]
  }
];

export const therapyTools: TherapyTool[] = [
  {
    id: 'tool-1',
    name: 'Visual Schedule System',
    description: 'A customizable visual scheduling system that helps individuals understand and follow daily routines.',
    targetAreas: ['communication', 'behavioral', 'cognitive'],
    suitableSeverities: ['mild', 'moderate', 'severe'],
    instructions: 'Create visual representations of daily activities using pictures, icons, or written words depending on comprehension level. Use a "First-Then" format for simple schedules or full day schedules for more complex routines.',
    evidenceBase: 'Research shows visual schedules reduce anxiety, improve transitions, and increase independence for individuals with autism and developmental delays.',
    resources: [
      { title: 'Visual Schedule Templates', url: '#' },
      { title: 'Implementation Guide', url: '#' }
    ]
  },
  {
    id: 'tool-2',
    name: 'Sensory Integration Toolkit',
    description: 'A collection of tools and activities designed to help with sensory regulation and processing.',
    targetAreas: ['sensory', 'behavioral'],
    suitableSeverities: ['mild', 'moderate', 'severe'],
    instructions: 'Perform a sensory profile assessment first. Then select appropriate sensory tools based on individual needs. Include a mix of calming and alerting activities as needed.',
    evidenceBase: 'Sensory integration therapy has been shown to help regulate arousal states and improve attention, behavioral regulation, and social participation.',
    resources: [
      { title: 'Sensory Profile Assessment', url: '#' },
      { title: 'Sensory Diet Planning Guide', url: '#' }
    ]
  },
  {
    id: 'tool-3',
    name: 'Social Stories™',
    description: 'Individualized short stories that describe social situations and appropriate responses to help with social understanding.',
    targetAreas: ['social', 'communication', 'behavioral'],
    suitableSeverities: ['mild', 'moderate'],
    instructions: 'Write brief, personalized stories that describe social situations in terms of relevant cues and expected responses. Use clear, literal language and positive statements.',
    evidenceBase: 'Studies show Social Stories™ can improve social comprehension and reduce anxiety around unfamiliar situations for individuals with autism spectrum disorders.',
    resources: [
      { title: 'Social Story Creation Guide', url: '#' },
      { title: 'Example Social Stories', url: '#' }
    ]
  },
  {
    id: 'tool-4',
    name: 'Augmentative and Alternative Communication (AAC) System',
    description: 'Communication systems ranging from picture exchange to speech-generating devices that support expressive language.',
    targetAreas: ['communication'],
    suitableSeverities: ['moderate', 'severe'],
    instructions: 'Select the appropriate AAC system based on cognitive and motor abilities. Start with a core vocabulary and gradually expand. Model use of the system consistently.',
    evidenceBase: 'Research demonstrates AAC interventions do not inhibit vocal development and can enhance communication, reduce frustration, and support language development.',
    resources: [
      { title: 'AAC Assessment Tools', url: '#' },
      { title: 'Implementation Strategies', url: '#' }
    ]
  },
  {
    id: 'tool-5',
    name: 'Fine Motor Skills Development Kit',
    description: 'A set of activities and tools designed to improve fine motor control and hand strength.',
    targetAreas: ['motor'],
    suitableSeverities: ['mild', 'moderate'],
    instructions: 'Practice activities like threading, pinching, squeezing, and manipulating small objects. Progress from easier to more challenging activities as skills develop.',
    evidenceBase: 'Regular fine motor practice improves handwriting, self-care skills, and tool use in children with developmental and coordination disorders.',
    resources: [
      { title: 'Fine Motor Activity Guide', url: '#' },
      { title: 'Progression Tracking Sheet', url: '#' }
    ]
  },
  {
    id: 'tool-6',
    name: 'Cognitive Behavioral Therapy (CBT) Tools',
    description: 'Adapted CBT techniques to help identify and manage emotions, thoughts, and behaviors.',
    targetAreas: ['behavioral', 'cognitive', 'social'],
    suitableSeverities: ['mild', 'moderate'],
    instructions: 'Use simplified cognitive models with visual supports. Teach emotion recognition, thought identification, and coping strategies through concrete examples and practice.',
    evidenceBase: 'Modified CBT has shown effectiveness for anxiety, emotional regulation, and behavioral challenges in individuals with autism and developmental disabilities.',
    resources: [
      { title: 'Visual Emotion Cards', url: '#' },
      { title: 'Simplified Thought Record Sheets', url: '#' }
    ]
  },
  {
    id: 'tool-7',
    name: 'Weighted Vest/Blanket System',
    description: 'Therapeutic weighted items that provide deep pressure input to improve focus and sensory regulation.',
    targetAreas: ['sensory', 'behavioral', 'cognitive'],
    suitableSeverities: ['moderate', 'severe'],
    instructions: 'Use weighted items for no more than 20 minutes at a time with at least equal breaks between use. Weight should be approximately 10% of body weight but not exceed 15%.',
    evidenceBase: 'Deep pressure therapy has been shown to reduce anxiety, increase attention span, and decrease self-stimulatory behaviors in some individuals.',
    resources: [
      { title: 'Deep Pressure Protocol', url: '#' },
      { title: 'Monitoring Form', url: '#' }
    ]
  },
  {
    id: 'tool-8',
    name: 'Video Modeling Program',
    description: 'Structured video demonstrations of target skills that provide visual examples for learning.',
    targetAreas: ['social', 'communication', 'behavioral', 'motor'],
    suitableSeverities: ['mild', 'moderate'],
    instructions: 'Create or select videos demonstrating specific skills or behaviors. Have the individual watch, then immediately practice the target skill with support as needed.',
    evidenceBase: 'Video modeling is an evidence-based practice that leverages visual learning strengths to teach a wide range of skills to individuals with autism and developmental disabilities.',
    resources: [
      { title: 'Video Production Guide', url: '#' },
      { title: 'Skill Sequence Planning Sheet', url: '#' }
    ]
  }
];
