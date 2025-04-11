
import React from 'react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, Eye, Move, MessageCircle, 
  Hand, Users, Brain, Lightbulb
} from 'lucide-react';

export const TherapyToolsNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const categories = [
    { 
      path: '/therapy-tools/assessment',
      name: 'Assessment Tools', 
      icon: <FileText className="mr-2 h-4 w-4" />, 
      description: 'Evaluation and screening tools'
    },
    { 
      path: '/therapy-tools/visual', 
      name: 'Visual Supports', 
      icon: <Eye className="mr-2 h-4 w-4" />, 
      description: 'Visual schedules and communication aids'
    },
    { 
      path: '/therapy-tools/motor', 
      name: 'Motor Skills', 
      icon: <Move className="mr-2 h-4 w-4" />, 
      description: 'Fine and gross motor activities'
    },
    { 
      path: '/therapy-tools/communication', 
      name: 'Communication', 
      icon: <MessageCircle className="mr-2 h-4 w-4" />, 
      description: 'Speech and language development resources'
    },
    { 
      path: '/therapy-tools/behavioral', 
      name: 'Behavioral', 
      icon: <Hand className="mr-2 h-4 w-4" />, 
      description: 'Behavior management strategies'
    },
    { 
      path: '/therapy-tools/social', 
      name: 'Social Skills', 
      icon: <Users className="mr-2 h-4 w-4" />, 
      description: 'Social interaction and emotional learning'
    },
    { 
      path: '/therapy-tools/sensory', 
      name: 'Sensory Processing', 
      icon: <Brain className="mr-2 h-4 w-4" />, 
      description: 'Sensory integration activities'
    },
    { 
      path: '/therapy-tools/cognitive', 
      name: 'Cognitive Skills', 
      icon: <Lightbulb className="mr-2 h-4 w-4" />, 
      description: 'Problem-solving and executive function'
    },
  ];

  return (
    <div className="mb-6">
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap justify-start">
          {categories.map((category) => (
            <NavigationMenuItem key={category.path}>
              <Link to={category.path}>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle() + 
                    (currentPath === category.path ? ' bg-primary text-primary-foreground' : '')}
                >
                  {category.icon}
                  {category.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
