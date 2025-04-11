
import { Activity, Brain, Eye, Hand, Lightbulb, MessageCircle, Move, Smile } from 'lucide-react';

export const therapyCategories = [
  { 
    path: '/therapy-tools/assessment', 
    name: 'Assessment Tools', 
    icon: Activity, 
    description: 'Evaluation and screening tools', 
    color: 'bg-blue-50 border-blue-200' 
  },
  { 
    path: '/therapy-tools/visual', 
    name: 'Visual Supports', 
    icon: Eye, 
    description: 'Visual schedules and communication aids', 
    color: 'bg-amber-50 border-amber-200' 
  },
  { 
    path: '/therapy-tools/motor', 
    name: 'Motor Skills', 
    icon: Move, 
    description: 'Fine and gross motor activities', 
    color: 'bg-green-50 border-green-200' 
  },
  { 
    path: '/therapy-tools/communication', 
    name: 'Communication', 
    icon: MessageCircle, 
    description: 'Speech and language development resources', 
    color: 'bg-purple-50 border-purple-200' 
  },
  { 
    path: '/therapy-tools/behavioral', 
    name: 'Behavioral', 
    icon: Hand, 
    description: 'Behavior management strategies', 
    color: 'bg-red-50 border-red-200' 
  },
  { 
    path: '/therapy-tools/social', 
    name: 'Social Skills', 
    icon: Smile, 
    description: 'Social interaction and emotional learning', 
    color: 'bg-pink-50 border-pink-200' 
  },
  { 
    path: '/therapy-tools/sensory', 
    name: 'Sensory Processing', 
    icon: Brain, 
    description: 'Sensory integration activities', 
    color: 'bg-indigo-50 border-indigo-200' 
  },
  { 
    path: '/therapy-tools/cognitive', 
    name: 'Cognitive Skills', 
    icon: Lightbulb, 
    description: 'Problem-solving and executive function', 
    color: 'bg-cyan-50 border-cyan-200' 
  },
];
