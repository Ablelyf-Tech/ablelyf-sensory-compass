
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Activity, Calendar, Users } from 'lucide-react';

export const WelcomeHeader: React.FC = () => {
  const { currentUser } = useAuth();
  
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };
  
  const getRoleSpecificAction = () => {
    switch (currentUser?.role) {
      case 'therapist':
        return {
          text: 'Add New Patient',
          icon: <Plus size={16} />,
          route: '/patients/new'
        };
      case 'caregiver':
        return {
          text: 'Log Activity',
          icon: <Activity size={16} />,
          route: '/daily-log/new'
        };
      case 'teacher':
        return {
          text: 'Class Schedule',
          icon: <Calendar size={16} />,
          route: '/calendar'
        };
      case 'hr':
        return {
          text: 'Add Employee',
          icon: <Users size={16} />,
          route: '/employees/new'
        };
      case 'admin':
        return {
          text: 'Manage Users',
          icon: <Users size={16} />,
          route: '/users'
        };
      default:
        return {
          text: 'Dashboard',
          icon: <Activity size={16} />,
          route: '/dashboard'
        };
    }
  };

  const action = getRoleSpecificAction();

  return (
    <Card className="bg-ablelyf-blue-100 border-none shadow-none mb-6">
      <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ablelyf-blue-900">
            Good {getTimeOfDay()}, {currentUser?.name.split(' ')[0]}
          </h1>
          <p className="text-ablelyf-blue-700 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Button 
          className="bg-white text-ablelyf-blue-600 hover:bg-ablelyf-blue-50 border border-ablelyf-blue-200 shadow-sm"
          size="sm"
        >
          <span className="flex items-center gap-2">
            {action.icon}
            {action.text}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};
