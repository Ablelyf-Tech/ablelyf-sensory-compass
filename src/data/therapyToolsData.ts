
import { TherapyTool } from '@/types';

// Function to get all therapy tools
export const getTherapyTools = (): TherapyTool[] => {
  return [
    // Assessment Tools
    {
      id: 'a1',
      title: 'Sensory Processing Assessment',
      description: 'Comprehensive assessment tool for evaluating sensory processing patterns in children. Includes sections for tactile, visual, auditory, vestibular, and proprioceptive processing with detailed scoring guidelines.',
      category: 'assessment',
      ageRange: '3-12',
      fileType: 'PDF',
      tags: ['sensory', 'assessment', 'evaluation', 'tactile', 'auditory', 'visual'],
      createdBy: 'system',
      createdAt: '2024-04-08',
      favorited: false,
      fileSize: '2.4 MB',
      content: 'This 28-page assessment tool helps therapists evaluate a child\'s sensory processing abilities across multiple domains. It includes standardized questionnaires for parents and teachers, observation checklists for clinicians, and interpretation guidelines to identify sensory processing patterns.'
    },
    {
      id: 'a2',
      title: 'Motor Skills Evaluation',
      description: 'Assessment for fine and gross motor skills development with scoring guidelines and age-appropriate norms.',
      category: 'assessment',
      ageRange: '2-10',
      fileType: 'PDF',
      tags: ['motor', 'development', 'evaluation', 'milestones', 'coordination'],
      createdBy: 'system',
      createdAt: '2024-01-20',
      favorited: false,
      fileSize: '3.1 MB',
      content: 'This evaluation tool provides a structured approach to assessing both fine and gross motor skills. Includes developmental milestone checklists, standardized test procedures, and visual documentation templates to track progress over time. Contains normative data for age-appropriate comparisons.'
    },
    {
      id: 'a3',
      title: 'Communication Skills Checklist',
      description: 'Standardized checklist for assessing receptive and expressive communication abilities across developmental stages.',
      category: 'assessment',
      ageRange: '1-16',
      fileType: 'PDF',
      tags: ['speech', 'language', 'communication', 'receptive', 'expressive'],
      createdBy: 'system',
      createdAt: '2024-03-05',
      favorited: false,
      fileSize: '1.8 MB',
      content: 'A comprehensive communication assessment tool covering receptive language, expressive language, pragmatics, and social communication. Features scoring rubrics for different age ranges and detailed intervention recommendations based on results. Includes case examples and goal-setting guidelines.'
    },
    {
      id: 'a4',
      title: 'Executive Function Screening',
      description: 'Screening tool for executive function skills including attention, working memory, and inhibition with practical intervention strategies.',
      category: 'assessment',
      ageRange: '5-18',
      fileType: 'PDF',
      tags: ['cognitive', 'executive function', 'attention', 'working memory', 'inhibition'],
      createdBy: 'system',
      createdAt: '2024-02-28',
      favorited: false,
      fileSize: '2.3 MB',
      content: 'This screening tool helps identify strengths and challenges in executive functioning. It evaluates working memory, inhibitory control, cognitive flexibility, planning, and organization through behavioral observations and performance tasks. Includes school accommodation recommendations and home strategy suggestions.'
    },
    
    // Visual Supports
    {
      id: 'v1',
      title: 'Visual Schedule Cards',
      description: 'Printable visual schedule cards for establishing routines and transitions with over 200 daily activity illustrations.',
      category: 'visual',
      ageRange: '2-10',
      fileType: 'PDF',
      tags: ['schedule', 'routine', 'transitions', 'structure', 'independence'],
      createdBy: 'system',
      createdAt: '2024-04-08',
      favorited: false,
      fileSize: '5.7 MB',
      content: 'A collection of 200+ colorful visual schedule cards covering morning routines, school activities, therapy sessions, community outings, and evening routines. Includes blank templates for customization, implementation guide with Velcro board setup instructions, and practical examples for different settings.'
    },
    {
      id: 'v2',
      title: 'Emotion Picture Cards',
      description: 'Visual cards depicting various emotions to help children identify and express feelings with accompanying discussion prompts.',
      category: 'visual',
      ageRange: '3-12',
      fileType: 'PDF',
      tags: ['emotions', 'feelings', 'recognition', 'social-emotional', 'expression'],
      createdBy: 'system',
      createdAt: '2024-02-10',
      favorited: false,
      fileSize: '3.8 MB',
      content: 'These 48 emotion picture cards illustrate a wide range of emotions from basic (happy, sad) to complex (frustrated, anxious, proud). Each card includes a character depicting the emotion, the emotion word, and a simple definition. The accompanying guidebook provides conversation starters, role-play scenarios, and games to promote emotional literacy.'
    },
    {
      id: 'v3',
      title: 'Social Story Templates',
      description: 'Customizable social story templates for creating personalized social narratives for various situations and transitions.',
      category: 'visual',
      ageRange: '4-14',
      fileType: 'Word',
      tags: ['social stories', 'behavior', 'social situations', 'expectations', 'transitions'],
      createdBy: 'system',
      createdAt: '2024-03-15',
      favorited: false,
      fileSize: '4.2 MB',
      content: 'This resource includes 25 editable social story templates addressing common challenges: trying new foods, waiting turns, unexpected changes, using appropriate voice volume, personal space, and more. Features professional formatting with image placeholders and guidelines for creating effective, personalized social stories.'
    },
    {
      id: 'v4',
      title: 'First-Then Board',
      description: 'Visual support to help children understand sequence of activities and reinforce completion of non-preferred tasks.',
      category: 'visual',
      ageRange: '2-10',
      fileType: 'PDF',
      tags: ['behavior', 'motivation', 'routine', 'compliance', 'reinforcement'],
      createdBy: 'system',
      createdAt: '2024-01-30',
      favorited: true,
      fileSize: '1.2 MB',
      content: 'A versatile First-Then board with multiple designs (vertical, horizontal, themed) to visually structure expectations. Includes 100+ activity icons and blank templates for customization. The implementation guide covers strategies for using this visual support to increase compliance and decrease challenging behaviors.'
    },
    
    // Motor Skills
    {
      id: 'm1',
      title: 'Fine Motor Skills Activities',
      description: 'Collection of activities designed to improve fine motor skills and dexterity through engaging, therapeutic play.',
      category: 'motor',
      ageRange: '3-8',
      fileType: 'PDF',
      tags: ['fine motor', 'dexterity', 'hand strength', 'manipulation', 'coordination'],
      createdBy: 'system',
      createdAt: '2024-04-08',
      favorited: false,
      fileSize: '4.5 MB',
      content: 'This comprehensive resource provides 75 fine motor activities organized by skill level and target areas (pincer grasp, bilateral coordination, hand strength, etc.). Each activity includes materials list, step-by-step instructions, therapeutic benefits, and modifications for different ability levels. Features printable templates for finger mazes, lacing cards, and cutting activities.'
    },
    {
      id: 'm2',
      title: 'Gross Motor Movement Cards',
      description: 'Movement activity cards for developing coordination, balance, and body awareness through structured physical activities.',
      category: 'motor',
      ageRange: '3-10',
      fileType: 'PDF',
      tags: ['gross motor', 'coordination', 'movement', 'balance', 'body awareness'],
      createdBy: 'system',
      createdAt: '2024-01-25',
      favorited: false,
      fileSize: '3.6 MB',
      content: 'A set of 60 illustrated movement cards featuring animal walks, obstacle course ideas, balance challenges, and coordination games. Designed to improve motor planning, spatial awareness, and physical confidence. Includes indoor and outdoor activity variations, progress tracking sheets, and integration ideas for classroom and therapy settings.'
    },
    {
      id: 'm3',
      title: 'Handwriting Practice Sheets',
      description: 'Specialized handwriting practice sheets with visual cues and progressive difficulty levels for different writing skills.',
      category: 'motor',
      ageRange: '4-10',
      fileType: 'PDF',
      tags: ['handwriting', 'fine motor', 'visual-motor', 'letter formation', 'pencil control'],
      createdBy: 'system',
      createdAt: '2024-03-01',
      favorited: true,
      fileSize: '6.8 MB',
      content: 'These developmentally sequenced handwriting sheets progress from pre-writing strokes to letter formation and sentence writing. Features multisensory approaches including highlighted starting points, directional arrows, and tactile tracing paths. Includes both print and cursive options with left-handed adaptations and pencil grip guides.'
    },
    
    // Communication
    {
      id: 'c1',
      title: 'Communication Boards',
      description: 'Customizable communication boards for non-verbal or limited verbal children with core vocabulary and topic-specific options.',
      category: 'communication',
      ageRange: '2-15',
      fileType: 'PDF',
      tags: ['AAC', 'non-verbal', 'communication', 'visual support', 'core vocabulary'],
      createdBy: 'system',
      createdAt: '2024-04-08',
      favorited: false,
      fileSize: '7.2 MB',
      content: 'This comprehensive AAC resource includes 15 ready-to-use communication boards with core vocabulary and situation-specific boards (mealtime, playground, classroom, etc.). Features high-contrast symbols, consistent symbol placement across boards, and implementation guidelines for caregivers and professionals. Includes blank templates for customization.'
    },
    {
      id: 'c2',
      title: 'Speech Sound Cards',
      description: 'Visual cards for practicing speech sounds and phonological awareness with evidence-based articulation exercises.',
      category: 'communication',
      ageRange: '3-10',
      fileType: 'PDF',
      tags: ['articulation', 'phonology', 'speech', 'sounds', 'phonological awareness'],
      createdBy: 'system',
      createdAt: '2024-02-18',
      favorited: false,
      fileSize: '5.3 MB',
      content: 'A collection of 300+ speech sound cards organized by placement (bilabial, alveolar, etc.) and developmental sequence. Each card features a high-quality image, target word, and visual cues for correct tongue/lip positioning. Includes activity ideas for all levels of speech sound practice (isolation, syllables, words, sentences, conversation).'
    },
    {
      id: 'c3',
      title: 'Conversation Starters',
      description: 'Cards with conversation prompts to practice social communication skills across various settings and relationships.',
      category: 'communication',
      ageRange: '6-16',
      fileType: 'PDF',
      tags: ['social communication', 'pragmatics', 'conversation', 'turn-taking', 'topic maintenance'],
      createdBy: 'system',
      createdAt: '2024-03-12',
      favorited: false,
      fileSize: '2.9 MB',
      content: 'These 120 conversation starter cards are organized by communication function (requesting, commenting, questioning) and social context (peers, adults, classroom, community). Includes conversation scripts, turn-taking visual supports, and topic maintenance strategies. Features progressive difficulty levels from simple exchanges to complex conversation skills.'
    },
    
    // Behavioral
    {
      id: 'b1',
      title: 'Emotional Regulation Cards',
      description: 'Cards to help children identify and regulate their emotions with calming strategies and self-regulation techniques.',
      category: 'behavioral',
      ageRange: '4-12',
      fileType: 'PDF',
      tags: ['emotions', 'self-regulation', 'coping strategies', 'calming', 'emotional literacy'],
      createdBy: 'system',
      createdAt: '2024-04-08',
      favorited: false,
      fileSize: '4.1 MB',
      content: 'This emotional regulation toolkit includes 30 emotion identification cards paired with 50 coping strategy cards. The emotion cards feature realistic photos of children expressing emotions with intensity ratings. Strategy cards provide visual instructions for calming techniques like deep breathing, progressive muscle relaxation, and sensory breaks. Includes a feelings thermometer and personalized regulation plan template.'
    },
    {
      id: 'b2',
      title: 'Behavior Management System',
      description: 'Comprehensive token economy system for positive behavior reinforcement with visual supports and reinforcement menus.',
      category: 'behavioral',
      ageRange: '3-15',
      fileType: 'PDF',
      tags: ['positive reinforcement', 'behavior', 'token economy', 'incentives', 'motivation'],
      createdBy: 'system',
      createdAt: '2024-02-20',
      favorited: false,
      fileSize: '3.7 MB',
      content: 'A complete behavior management package featuring token boards, behavior expectation visuals, and reinforcement systems. Includes implementation guide with strategies for identifying target behaviors, establishing consistent reinforcement schedules, and fading prompts. Features age-appropriate reinforcement menus and data collection sheets for progress monitoring.'
    },
    {
      id: 'b3',
      title: 'Calm Down Kit Guide',
      description: 'Guide for creating personalized calm down kits with visual supports and strategies for emotional regulation.',
      category: 'behavioral',
      ageRange: '3-12',
      fileType: 'PDF',
      tags: ['self-regulation', 'emotional', 'calming strategies', 'sensory tools', 'emotional support'],
      createdBy: 'system',
      createdAt: '2024-03-08',
      favorited: false,
      fileSize: '2.8 MB',
      content: 'This comprehensive guide helps therapists create individualized calm down kits for children. Includes recommendations for sensory tools (fidgets, weighted items, visual timers), visual supports for regulation strategies, and environmental considerations. Features case studies demonstrating implementation across home, school, and community settings.'
    },
    
    // Social Skills
    {
      id: 's1',
      title: 'Social Stories Templates',
      description: 'Templates for creating social stories to help children understand social situations and behavioral expectations.',
      category: 'social',
      ageRange: '3-12',
      fileType: 'Word',
      tags: ['social stories', 'social situations', 'understanding', 'behavior', 'expectations'],
      createdBy: 'system',
      createdAt: '2024-04-08',
      favorited: false,
      fileSize: '3.4 MB',
      content: 'This resource includes 15 professionally designed, editable social story templates addressing common social challenges. Each template follows best practice guidelines for social story development with descriptive, perspective, directive, and affirmative sentences. Includes a writer\'s guide with examples and customization recommendations for different ages and cognitive abilities.'
    },
    {
      id: 's2',
      title: 'Perspective Taking Scenarios',
      description: 'Scenario cards for developing theory of mind and perspective taking abilities through guided activities.',
      category: 'social',
      ageRange: '6-15',
      fileType: 'PDF',
      tags: ['theory of mind', 'perspective taking', 'empathy', 'social cognition', 'emotional understanding'],
      createdBy: 'system',
      createdAt: '2024-02-14',
      favorited: true,
      fileSize: '3.9 MB',
      content: 'This collection includes 40 illustrated scenario cards depicting various social situations that require perspective taking. Each card presents a scenario and questions to guide discussion about different characters\' thoughts, feelings, and intentions. Includes progressive levels from basic emotional recognition to complex hidden intentions and false beliefs.'
    },
    {
      id: 's3',
      title: 'Friendship Skills Workbook',
      description: 'Interactive workbook for developing and maintaining friendships with practical exercises and role-play activities.',
      category: 'social',
      ageRange: '7-16',
      fileType: 'PDF',
      tags: ['friendship', 'peer relationships', 'social skills', 'conversation', 'conflict resolution'],
      createdBy: 'system',
      createdAt: '2024-03-10',
      favorited: false,
      fileSize: '5.6 MB',
      content: 'A 45-page interactive workbook covering essential friendship skills: starting conversations, joining groups, sharing and turn-taking, giving compliments, resolving conflicts, and being a good sport. Features reflection activities, skill-building exercises, role-play scenarios, and home practice assignments. Includes parent/teacher handouts for reinforcing skills across environments.'
    },
    
    // Sensory Processing
    {
      id: 'sp1',
      title: 'Sensory Diet Planning Guide',
      description: 'Guide for planning appropriate sensory activities throughout the day based on individual sensory processing needs.',
      category: 'sensory',
      ageRange: '2-18',
      fileType: 'PDF',
      tags: ['sensory diet', 'sensory activities', 'planning', 'regulation', 'sensory integration'],
      createdBy: 'system',
      createdAt: '2024-04-08',
      favorited: false,
      fileSize: '4.8 MB',
      content: 'This comprehensive planning guide helps therapists design personalized sensory diets. Features assessment tools to identify sensory needs, activity recommendations for different sensory systems, and scheduling templates for home and school. Includes 75+ sensory activities with materials, instructions, and specific sensory benefits identified.'
    },
    {
      id: 'sp2',
      title: 'Sensory Activity Cards',
      description: 'Activities targeting different sensory systems for sensory integration with detailed instructions and therapeutic benefits.',
      category: 'sensory',
      ageRange: '2-14',
      fileType: 'PDF',
      tags: ['proprioception', 'vestibular', 'tactile', 'visual', 'auditory'],
      createdBy: 'system',
      createdAt: '2024-02-22',
      favorited: false,
      fileSize: '6.2 MB',
      content: 'A collection of 100 sensory activity cards organized by sensory system (proprioceptive, vestibular, tactile, visual, auditory, olfactory, gustatory). Each card includes materials needed, setup instructions, therapeutic benefits, and adaptations for different sensory preferences. Features indoor and outdoor options with minimal equipment requirements.'
    },
    {
      id: 'sp3',
      title: 'Environmental Adaptation Checklist',
      description: 'Checklist for identifying and implementing sensory-friendly environmental modifications across different settings.',
      category: 'sensory',
      ageRange: '2-18',
      fileType: 'PDF',
      tags: ['environment', 'sensory-friendly', 'adaptations', 'accommodations', 'modifications'],
      createdBy: 'system',
      createdAt: '2024-03-02',
      favorited: false,
      fileSize: '2.3 MB',
      content: 'This comprehensive resource helps therapists evaluate and modify environments to support sensory processing. Includes assessment checklists for home, classroom, and community settings with specific recommendations for lighting, acoustics, seating, visual organization, and sensory break spaces. Features implementation guidelines and advocacy tools for requesting accommodations.'
    },
    
    // Cognitive Skills
    {
      id: 'cg1',
      title: 'Executive Function Activities',
      description: 'Activities to strengthen planning, organization, and impulse control through targeted cognitive exercises.',
      category: 'cognitive',
      ageRange: '5-18',
      fileType: 'PDF',
      tags: ['executive function', 'planning', 'organization', 'working memory', 'impulse control'],
      createdBy: 'system',
      createdAt: '2024-04-08',
      favorited: false,
      fileSize: '5.3 MB',
      content: 'This resource provides 50 targeted activities to build executive function skills. Organized by skill area: working memory, inhibitory control, cognitive flexibility, planning, and organization. Each activity includes a detailed description, materials needed, therapeutic rationale, and modifications for different ages and ability levels. Features data collection tools to monitor progress.'
    },
    {
      id: 'cg2',
      title: 'Problem Solving Worksheets',
      description: 'Structured worksheets for developing logical problem-solving skills with real-world scenarios and guided prompts.',
      category: 'cognitive',
      ageRange: '7-16',
      fileType: 'PDF',
      tags: ['problem solving', 'critical thinking', 'reasoning', 'decision making', 'logical thinking'],
      createdBy: 'system',
      createdAt: '2024-02-25',
      favorited: true,
      fileSize: '4.1 MB',
      content: 'A collection of 35 problem-solving worksheets featuring real-world scenarios relevant to children\'s daily experiences. Each worksheet guides learners through a structured problem-solving process: identifying the problem, generating solutions, evaluating options, and reflecting on outcomes. Includes social problems, practical challenges, and open-ended critical thinking exercises.'
    },
    {
      id: 'cg3',
      title: 'Working Memory Games',
      description: 'Printable games and activities designed to improve working memory capacity and processing through engaging exercises.',
      category: 'cognitive',
      ageRange: '5-14',
      fileType: 'PDF',
      tags: ['working memory', 'attention', 'cognitive', 'memory games', 'concentration'],
      createdBy: 'system',
      createdAt: '2024-03-18',
      favorited: false,
      fileSize: '3.8 MB',
      content: 'This resource contains 25 printable games and activities specifically designed to strengthen working memory. Includes visual memory matching games, auditory memory sequences, n-back challenges, and dual-task activities. Features progressive difficulty levels and adaptations for visual, auditory, and kinesthetic learning preferences.'
    }
  ];
};
