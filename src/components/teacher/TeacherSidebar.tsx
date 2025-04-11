
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  Users, 
  LineChart, 
  FileText, 
  Laptop, 
  Calendar 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TeacherSidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Video Session', 
      path: '/video-session', 
      icon: <Video className="h-5 w-5" /> 
    },
    { 
      name: 'Classroom', 
      path: '/classroom', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'Progress Reports', 
      path: '/progress', 
      icon: <LineChart className="h-5 w-5" /> 
    },
    { 
      name: 'Materials', 
      path: '/materials', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: 'Classroom Tools', 
      path: '/teacher-tools', 
      icon: <Laptop className="h-5 w-5" /> 
    },
    { 
      name: 'Calendar', 
      path: '/teacher-calendar', 
      icon: <Calendar className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center text-slate-800">Teacher Portal</h2>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary text-white" 
                    : "text-slate-700 hover:bg-slate-200"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TeacherSidebar;
