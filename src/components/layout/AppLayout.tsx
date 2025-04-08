
import React from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, 
  SidebarProvider 
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  User, LogOut, Home, Users, Activity, Calendar, Settings, 
  FileText, AlertTriangle, Brain, Award, Video
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'Video Session', path: '/video-session', icon: Video },
    ];

    const roleSpecificItems = {
      therapist: [
        { name: 'Patients', path: '/patients', icon: Users },
        { name: 'Therapy Plans', path: '/therapy-plans', icon: FileText },
        { name: 'Assessments', path: '/assessments', icon: Activity },
        { name: 'Learning Modules', path: '/learning-modules', icon: Brain },
      ],
      caregiver: [
        { name: 'Patient Profile', path: '/patient-profile', icon: User },
        { name: 'Daily Log', path: '/daily-log', icon: Activity },
        { name: 'Alerts', path: '/alerts', icon: AlertTriangle },
        { name: 'Calendar', path: '/calendar', icon: Calendar },
      ],
      admin: [
        { name: 'User Management', path: '/users', icon: Users },
        { name: 'System Metrics', path: '/metrics', icon: Activity },
        { name: 'Certifications', path: '/certifications', icon: Award },
        { name: 'System Settings', path: '/settings', icon: Settings },
      ],
      teacher: [
        { name: 'Classroom', path: '/classroom', icon: Users },
        { name: 'Progress Reports', path: '/progress', icon: Activity },
        { name: 'Materials', path: '/materials', icon: FileText },
        { name: 'Calendar', path: '/calendar', icon: Calendar },
      ],
      hr: [
        { name: 'Employee Profiles', path: '/employees', icon: Users },
        { name: 'Accommodation Plans', path: '/accommodations', icon: FileText },
        { name: 'Inclusivity Metrics', path: '/inclusivity', icon: Activity },
        { name: 'Training', path: '/training', icon: Brain },
      ],
    };

    return [...baseItems, ...(roleSpecificItems[currentUser.role] || [])];
  };

  const navItems = getNavItems();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="px-3 py-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-ablelyf-blue-500 w-8 h-8 flex items-center justify-center text-white">
                <Brain size={18} />
              </div>
              <div>
                <h1 className="text-lg font-bold">AbleLyf</h1>
                <p className="text-xs text-muted-foreground">Sensory Care</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive 
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </SidebarContent>
          <SidebarFooter className="px-3 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-ablelyf-neutral-200 flex items-center justify-center overflow-hidden">
                  <User size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{currentUser.role}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 w-full"
                onClick={logout}
              >
                <LogOut size={16} />
                <span>Log out</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
