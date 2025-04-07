
import { Patient, ProgressData, AlertData, TherapyPlan } from '@/types';

// Mock Patients
export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Alex Morgan',
    age: 8,
    diagnosisDate: '2022-03-15',
    condition: ['Autism Spectrum Disorder', 'ADHD'],
    caregivers: ['c1'],
    therapists: ['t1'],
    teachers: ['t2']
  },
  {
    id: 'p2',
    name: 'Mia Johnson',
    age: 12,
    diagnosisDate: '2021-07-22',
    condition: ['Sensory Processing Disorder'],
    caregivers: ['c2'],
    therapists: ['t1'],
    teachers: ['t2']
  },
  {
    id: 'p3',
    name: 'Ethan Williams',
    age: 6,
    diagnosisDate: '2023-01-10',
    condition: ['Autism Spectrum Disorder'],
    caregivers: ['c3'],
    therapists: ['t1'],
    teachers: ['t3']
  },
  {
    id: 'p4',
    name: 'Sophia Martinez',
    age: 10,
    diagnosisDate: '2022-05-18',
    condition: ['ADHD', 'Dyslexia'],
    caregivers: ['c4'],
    therapists: ['t4'],
    teachers: ['t3']
  },
];

// Mock Progress Data
export const progressData: ProgressData[] = [
  // Alex's data
  { id: 'pr1', patientId: 'p1', date: '2024-01-01', category: 'Social Skills', value: 45, notes: 'Struggled with eye contact' },
  { id: 'pr2', patientId: 'p1', date: '2024-01-15', category: 'Social Skills', value: 50, notes: 'Slight improvement in social interaction' },
  { id: 'pr3', patientId: 'p1', date: '2024-02-01', category: 'Social Skills', value: 58, notes: 'Better at taking turns in conversation' },
  { id: 'pr4', patientId: 'p1', date: '2024-02-15', category: 'Social Skills', value: 65, notes: 'Maintained eye contact for longer periods' },
  { id: 'pr5', patientId: 'p1', date: '2024-03-01', category: 'Social Skills', value: 67, notes: 'Small group interaction is improving' },
  { id: 'pr6', patientId: 'p1', date: '2024-03-15', category: 'Social Skills', value: 72, notes: 'Successfully participated in group activity' },
  
  { id: 'pr7', patientId: 'p1', date: '2024-01-01', category: 'Communication', value: 40, notes: 'Limited verbal expression' },
  { id: 'pr8', patientId: 'p1', date: '2024-01-15', category: 'Communication', value: 42, notes: 'Started using simple phrases more' },
  { id: 'pr9', patientId: 'p1', date: '2024-02-01', category: 'Communication', value: 48, notes: 'Increased vocabulary' },
  { id: 'pr10', patientId: 'p1', date: '2024-02-15', category: 'Communication', value: 53, notes: 'More willing to communicate needs' },
  { id: 'pr11', patientId: 'p1', date: '2024-03-01', category: 'Communication', value: 60, notes: 'Started asking simple questions' },
  { id: 'pr12', patientId: 'p1', date: '2024-03-15', category: 'Communication', value: 65, notes: 'More complex sentence structures' },
  
  { id: 'pr13', patientId: 'p1', date: '2024-01-01', category: 'Sensory Regulation', value: 30, notes: 'Frequent sensory overload episodes' },
  { id: 'pr14', patientId: 'p1', date: '2024-01-15', category: 'Sensory Regulation', value: 35, notes: 'Learning to identify triggers' },
  { id: 'pr15', patientId: 'p1', date: '2024-02-01', category: 'Sensory Regulation', value: 42, notes: 'Using fidget tools effectively' },
  { id: 'pr16', patientId: 'p1', date: '2024-02-15', category: 'Sensory Regulation', value: 50, notes: 'Better self-regulation in noisy environments' },
  { id: 'pr17', patientId: 'p1', date: '2024-03-01', category: 'Sensory Regulation', value: 55, notes: 'Fewer meltdowns at school' },
  { id: 'pr18', patientId: 'p1', date: '2024-03-15', category: 'Sensory Regulation', value: 62, notes: 'Using calming strategies independently' },
  
  // Mia's data (partial)
  { id: 'pr19', patientId: 'p2', date: '2024-02-01', category: 'Motor Skills', value: 65, notes: 'Good progress with fine motor activities' },
  { id: 'pr20', patientId: 'p2', date: '2024-02-15', category: 'Motor Skills', value: 70, notes: 'Improved handwriting' },
  { id: 'pr21', patientId: 'p2', date: '2024-03-01', category: 'Motor Skills', value: 75, notes: 'Better coordination in PE activities' },
  { id: 'pr22', patientId: 'p2', date: '2024-03-15', category: 'Motor Skills', value: 80, notes: 'Successfully completed obstacle course' },
];

// Mock Alert Data
export const alertData: AlertData[] = [
  {
    id: 'a1',
    patientId: 'p1',
    type: 'sensory',
    timestamp: '2024-04-07T08:30:00',
    message: 'Alex experienced sensory overload during morning assembly. Calming techniques applied.',
    resolved: true,
    severity: 'medium'
  },
  {
    id: 'a2',
    patientId: 'p1',
    type: 'behavioral',
    timestamp: '2024-04-07T10:15:00',
    message: 'Difficulty focusing on classwork. Redirected with visual schedule.',
    resolved: false,
    severity: 'low'
  },
  {
    id: 'a3',
    patientId: 'p2',
    type: 'medical',
    timestamp: '2024-04-07T09:45:00',
    message: 'Mia complained of headache. Parent notified, resting in quiet area.',
    resolved: false,
    severity: 'medium'
  },
  {
    id: 'a4',
    patientId: 'p3',
    type: 'behavioral',
    timestamp: '2024-04-06T14:20:00',
    message: 'Ethan had difficulty transitioning between activities. Used timer successfully.',
    resolved: true,
    severity: 'low'
  },
  {
    id: 'a5',
    patientId: 'p1',
    type: 'emergency',
    timestamp: '2024-04-07T11:05:00',
    message: 'Alex left supervised area. Located safely and returned to classroom.',
    resolved: false,
    severity: 'high'
  }
];

// Mock Therapy Plans
export const therapyPlans: TherapyPlan[] = [
  {
    id: 'tp1',
    patientId: 'p1',
    title: 'Social Communication Plan - Alex',
    goals: [
      {
        id: 'g1',
        title: 'Maintain eye contact for 30 seconds during conversation',
        description: 'Practice maintaining appropriate eye contact during structured conversations',
        metrics: ['Duration of eye contact', 'Frequency of eye contact initiation'],
        targetDate: '2024-05-15',
        status: 'in-progress',
        progress: 70
      },
      {
        id: 'g2',
        title: 'Use 3-4 word sentences to express needs',
        description: 'Increase verbal communication skills to express basic needs and wants',
        metrics: ['Sentence length', 'Frequency of verbal requests'],
        targetDate: '2024-05-30',
        status: 'in-progress',
        progress: 65
      },
      {
        id: 'g3',
        title: 'Take turns in conversation (2-3 exchanges)',
        description: 'Develop turn-taking skills in structured conversations',
        metrics: ['Number of exchanges', 'Wait time before interrupting'],
        targetDate: '2024-06-15',
        status: 'not-started',
        progress: 10
      },
      {
        id: 'g4',
        title: 'Use visual schedule independently',
        description: 'Follow daily routine using a visual schedule with minimal prompting',
        metrics: ['Percentage of schedule followed without prompts', 'Transitions completed successfully'],
        targetDate: '2024-05-01',
        status: 'achieved',
        progress: 100
      }
    ],
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    status: 'active'
  },
  {
    id: 'tp2',
    patientId: 'p2',
    title: 'Sensory Integration Plan - Mia',
    goals: [
      {
        id: 'g5',
        title: 'Identify sensory triggers in school environment',
        description: 'Recognize and communicate when sensory input is overwhelming',
        metrics: ['Number of self-identified triggers', 'Advance warning of sensory overload'],
        targetDate: '2024-05-10',
        status: 'achieved',
        progress: 100
      },
      {
        id: 'g6',
        title: 'Use 2 calming strategies independently',
        description: 'Select and apply appropriate self-regulation strategies',
        metrics: ['Frequency of independent strategy use', 'Effectiveness of strategy'],
        targetDate: '2024-05-25',
        status: 'in-progress',
        progress: 80
      },
      {
        id: 'g7',
        title: 'Tolerate 15 minutes in noisy environment',
        description: 'Gradually increase tolerance for noisy settings like cafeteria',
        metrics: ['Duration in noisy environment', 'Stress level rating'],
        targetDate: '2024-06-20',
        status: 'in-progress',
        progress: 60
      }
    ],
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    status: 'active'
  }
];
