
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Brain, Activity, School, Headphones, Building } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-ablelyf-blue-500 w-10 h-10 flex items-center justify-center text-white">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ablelyf-blue-900">AbleLyf</h1>
              <p className="text-xs text-ablelyf-blue-700">Sensory Care</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <Link to="#therapist-solutions" className="flex gap-2 p-3 hover:bg-muted rounded-md">
                        <Activity className="h-5 w-5 text-ablelyf-blue-500" />
                        <div>
                          <div className="font-medium">For Therapists</div>
                          <div className="text-sm text-muted-foreground">Track progress and manage interventions</div>
                        </div>
                      </Link>
                      <Link to="#teacher-solutions" className="flex gap-2 p-3 hover:bg-muted rounded-md">
                        <School className="h-5 w-5 text-ablelyf-green-500" />
                        <div>
                          <div className="font-medium">For Teachers</div>
                          <div className="text-sm text-muted-foreground">Classroom tools and IEP tracking</div>
                        </div>
                      </Link>
                      <Link to="#caregiver-solutions" className="flex gap-2 p-3 hover:bg-muted rounded-md">
                        <Headphones className="h-5 w-5 text-amber-500" />
                        <div>
                          <div className="font-medium">For Caregivers</div>
                          <div className="text-sm text-muted-foreground">Daily logs and health monitoring</div>
                        </div>
                      </Link>
                      <Link to="#hr-solutions" className="flex gap-2 p-3 hover:bg-muted rounded-md">
                        <Building className="h-5 w-5 text-ablelyf-blue-600" />
                        <div>
                          <div className="font-medium">For HR Professionals</div>
                          <div className="text-sm text-muted-foreground">Workplace inclusivity and accommodations</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="#features" className={navigationMenuTriggerStyle()}>
                    Features
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="#about" className={navigationMenuTriggerStyle()}>
                    About
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center gap-4">
            {currentUser ? (
              <Button asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="hidden sm:flex">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
