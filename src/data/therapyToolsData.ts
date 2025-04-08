
import { TherapyTool } from '@/types';

// Function to get all therapy tools
export const getTherapyTools = (): TherapyTool[] => {
  return [
    // Assessment Tools
    {
      id: 'a1',
      title: 'Sensory Processing Assessment',
      description: 'Comprehensive assessment tool for identifying sensory processing patterns in children with sensory integration difficulties.',
      category: 'assessment',
      ageRange: '3-12',
      fileType: 'PDF',
      tags: ['sensory', 'screening', 'questionnaire'],
      createdBy: 'system',
      createdAt: '2024-02-15',
      favorited: true
    },
    {
      id: 'a2',
      title: 'Motor Skills Evaluation',
      description: 'Assessment for fine and gross motor skills development with scoring guidelines.',
      category: 'assessment',
      ageRange: '2-10',
      fileType: 'PDF',
      tags: ['motor', 'development', 'evaluation'],
      createdBy: 'system',
      createdAt: '2024-01-20',
      favorited: false
    },
    {
      id: 'a3',
      title: 'Communication Skills Checklist',
      description: 'Standardized checklist for assessing receptive and expressive communication abilities.',
      category: 'assessment',
      ageRange: '1-16',
      fileType: 'PDF',
      tags: ['speech', 'language', 'communication'],
      createdBy: 'system',
      createdAt: '2024-03-05',
      favorited: false
    },
    {
      id: 'a4',
      title: 'Executive Function Screening',
      description: 'Screening tool for executive function skills including attention, working memory, and inhibition.',
      category: 'assessment',
      ageRange: '5-18',
      fileType: 'PDF',
      tags: ['cognitive', 'executive function', 'attention'],
      createdBy: 'system',
      createdAt: '2024-02-28',
      favorited: false
    },
    
    // Visual Supports
    {
      id: 'v1',
      title: 'Visual Schedule Cards',
      description: 'Printable visual schedule cards for establishing routines and supporting transitions.',
      category: 'visual',
      ageRange: '2-12',
      fileType: 'PDF',
      tags: ['schedule', 'routine', 'transitions'],
      createdBy: 'system',
      createdAt: '2024-01-15',
      favorited: true
    },
    {
      id: 'v2',
      title: 'Emotion Picture Cards',
      description: 'Visual cards depicting various emotions to help children identify and express feelings.',
      category: 'visual',
      ageRange: '3-12',
      fileType: 'PDF',
      tags: ['emotions', 'feelings', 'recognition'],
      createdBy: 'system',
      createdAt: '2024-02-10',
      favorited: false
    },
    {
      id: 'v3',
      title: 'Social Story Templates',
      description: 'Customizable social story templates for creating personalized social narratives.',
      category: 'visual',
      ageRange: '4-14',
      fileType: 'Word',
      tags: ['social stories', 'behavior', 'social situations'],
      createdBy: 'system',
      createdAt: '2024-03-15',
      favorited: false
    },
    {
      id: 'v4',
      title: 'First-Then Board',
      description: 'Visual support to help children understand sequence of activities and reinforce completion.',
      category: 'visual',
      ageRange: '2-10',
      fileType: 'PDF',
      tags: ['behavior', 'motivation', 'routine'],
      createdBy: 'system',
      createdAt: '2024-01-30',
      favorited: true
    },
    
    // Motor Skills
    {
      id: 'm1',
      title: 'Fine Motor Activity Pack',
      description: 'Collection of printable activities designed to improve fine motor skills and dexterity.',
      category: 'motor',
      ageRange: '3-8',
      fileType: 'PDF',
      tags: ['fine motor', 'dexterity', 'hand strength'],
      createdBy: 'system',
      createdAt: '2024-02-05',
      favorited: false
    },
    {
      id: 'm2',
      title: 'Gross Motor Movement Cards',
      description: 'Movement activity cards for developing coordination, balance, and body awareness.',
      category: 'motor',
      ageRange: '3-10',
      fileType: 'PDF',
      tags: ['gross motor', 'coordination', 'movement'],
      createdBy: 'system',
      createdAt: '2024-01-25',
      favorited: false
    },
    {
      id: 'm3',
      title: 'Handwriting Practice Sheets',
      description: 'Specialized handwriting practice sheets with visual cues and progressive difficulty.',
      category: 'motor',
      ageRange: '4-10',
      fileType: 'PDF',
      tags: ['handwriting', 'fine motor', 'visual-motor'],
      createdBy: 'system',
      createdAt: '2024-03-01',
      favorited: true
    },
    
    // Communication
    {
      id: 'c1',
      title: 'Communication Boards',
      description: 'Customizable communication boards for non-verbal or limited verbal children.',
      category: 'communication',
      ageRange: '2-16',
      fileType: 'PDF',
      tags: ['AAC', 'non-verbal', 'communication'],
      createdBy: 'system',
      createdAt: '2024-01-10',
      favorited: true
    },
    {
      id: 'c2',
      title: 'Speech Sound Cards',
      description: 'Visual cards for practicing speech sounds and phonological awareness.',
      category: 'communication',
      ageRange: '3-10',
      fileType: 'PDF',
      tags: ['articulation', 'phonology', 'speech'],
      createdBy: 'system',
      createdAt: '2024-02-18',
      favorited: false
    },
    {
      id: 'c3',
      title: 'Conversation Starters',
      description: 'Cards with conversation prompts to practice social communication skills.',
      category: 'communication',
      ageRange: '6-16',
      fileType: 'PDF',
      tags: ['social communication', 'pragmatics', 'conversation'],
      createdBy: 'system',
      createdAt: '2024-03-12',
      favorited: false
    },
    
    // Behavioral
    {
      id: 'b1',
      title: 'Emotional Regulation Cards',
      description: 'Cards to help children identify and regulate their emotions in various situations.',
      category: 'behavioral',
      ageRange: '4-12',
      fileType: 'PDF',
      tags: ['emotions', 'self-regulation', 'coping strategies'],
      createdBy: 'system',
      createdAt: '2024-01-22',
      favorited: true
    },
    {
      id: 'b2',
      title: 'Behavior Management System',
      description: 'Comprehensive token economy system for positive behavior reinforcement.',
      category: 'behavioral',
      ageRange: '3-15',
      fileType: 'PDF',
      tags: ['positive reinforcement', 'behavior', 'token economy'],
      createdBy: 'system',
      createdAt: '2024-02-20',
      favorited: false
    },
    {
      id: 'b3',
      title: 'Calm Down Kit Guide',
      description: 'Guide for creating personalized calm down kits with visual supports and strategies.',
      category: 'behavioral',
      ageRange: '3-12',
      fileType: 'PDF',
      tags: ['self-regulation', 'emotional', 'calming strategies'],
      createdBy: 'system',
      createdAt: '2024-03-08',
      favorited: false
    },
    
    // Social Skills
    {
      id: 's1',
      title: 'Social Skills Activity Cards',
      description: 'Activities for practicing various social skills in structured settings.',
      category: 'social',
      ageRange: '5-14',
      fileType: 'PDF',
      tags: ['social skills', 'friendship', 'interaction'],
      createdBy: 'system',
      createdAt: '2024-01-18',
      favorited: false
    },
    {
      id: 's2',
      title: 'Perspective Taking Scenarios',
      description: 'Scenario cards for developing theory of mind and perspective taking abilities.',
      category: 'social',
      ageRange: '6-15',
      fileType: 'PDF',
      tags: ['theory of mind', 'perspective taking', 'empathy'],
      createdBy: 'system',
      createdAt: '2024-02-14',
      favorited: true
    },
    {
      id: 's3',
      title: 'Friendship Skills Workbook',
      description: 'Interactive workbook for developing and maintaining friendships.',
      category: 'social',
      ageRange: '7-16',
      fileType: 'PDF',
      tags: ['friendship', 'peer relationships', 'social skills'],
      createdBy: 'system',
      createdAt: '2024-03-10',
      favorited: false
    },
    
    // Sensory Processing
    {
      id: 'sp1',
      title: 'Sensory Diet Planning Guide',
      description: 'Guide for planning appropriate sensory activities throughout the day.',
      category: 'sensory',
      ageRange: '3-18',
      fileType: 'PDF',
      tags: ['sensory diet', 'sensory integration', 'self-regulation'],
      createdBy: 'system',
      createdAt: '2024-01-12',
      favorited: true
    },
    {
      id: 'sp2',
      title: 'Sensory Activity Cards',
      description: 'Activities targeting different sensory systems for sensory integration.',
      category: 'sensory',
      ageRange: '2-14',
      fileType: 'PDF',
      tags: ['proprioception', 'vestibular', 'tactile'],
      createdBy: 'system',
      createdAt: '2024-02-22',
      favorited: false
    },
    {
      id: 'sp3',
      title: 'Environmental Adaptation Checklist',
      description: 'Checklist for identifying and implementing sensory-friendly environmental modifications.',
      category: 'sensory',
      ageRange: '2-18',
      fileType: 'PDF',
      tags: ['environment', 'sensory-friendly', 'adaptations'],
      createdBy: 'system',
      createdAt: '2024-03-02',
      favorited: false
    },
    
    // Cognitive Skills
    {
      id: 'cg1',
      title: 'Executive Function Activities',
      description: 'Activities to strengthen planning, organization, and impulse control skills.',
      category: 'cognitive',
      ageRange: '5-18',
      fileType: 'PDF',
      tags: ['executive function', 'planning', 'organization'],
      createdBy: 'system',
      createdAt: '2024-01-28',
      favorited: false
    },
    {
      id: 'cg2',
      title: 'Problem Solving Worksheets',
      description: 'Structured worksheets for developing logical problem-solving skills.',
      category: 'cognitive',
      ageRange: '7-16',
      fileType: 'PDF',
      tags: ['problem solving', 'critical thinking', 'reasoning'],
      createdBy: 'system',
      createdAt: '2024-02-25',
      favorited: true
    },
    {
      id: 'cg3',
      title: 'Working Memory Games',
      description: 'Printable games and activities designed to improve working memory capacity.',
      category: 'cognitive',
      ageRange: '5-14',
      fileType: 'PDF',
      tags: ['working memory', 'attention', 'cognitive'],
      createdBy: 'system',
      createdAt: '2024-03-18',
      favorited: false
    }
  ];
};
