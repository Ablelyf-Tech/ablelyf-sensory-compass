
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Activity, Calendar, Users } from 'lucide-react';
import { PatientIntakeForm } from '@/components/therapist/PatientIntakeForm';

export const WelcomeHeader: React.FC = () => {
  const { currentUser } = useAuth();
  
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };
  
  const renderActionButton = () => {
    switch (currentUser?.role) {
      case 'therapist':
        return (
          <PatientIntakeForm>
            <Button 
              className="bg-white text-ablelyf-blue-600 hover:bg-ablelyf-blue-50 border border-ablelyf-blue-200 shadow-sm"
              size="sm"
            >
              <span className="flex items-center gap-2">
                <Plus size={16} />
                Add New Patient
              </span>
            </Button>
          </PatientIntakeForm>
        );
      case 'caregiver':
        return (
          <Button 
            className="bg-white text-ablelyf-blue-600 hover:bg-ablelyf-blue-50 border border-ablelyf-blue-200 shadow-sm"
            size="sm"
          >
            <span className="flex items-center gap-2">
              <Activity size={16} />
              Log Activity
            </span>
          </Button>
        );
      case 'teacher':
        return (
          <Button 
            className="bg-white text-ablelyf-blue-600 hover:bg-ablelyf-blue-50 border border-ablelyf-blue-200 shadow-sm"
            size="sm"
          >
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              Class Schedule
            </span>
          </Button>
        );
      case 'hr':
        return (
          <Button 
            className="bg-white text-ablelyf-blue-600 hover:bg-ablelyf-blue-50 border border-ablelyf-blue-200 shadow-sm"
            size="sm"
          >
            <span className="flex items-center gap-2">
              <Users size={16} />
              Add Employee
            </span>
          </Button>
        );
      case 'admin':
        return (
          <Button 
            className="bg-white text-ablelyf-blue-600 hover:bg-ablelyf-blue-50 border border-ablelyf-blue-200 shadow-sm"
            size="sm"
          >
            <span className="flex items-center gap-2">
              <Users size={16} />
              Manage Users
            </span>
          </Button>
        );
      default:
        return (
          <Button 
            className="bg-white text-ablelyf-blue-600 hover:bg-ablelyf-blue-50 border border-ablelyf-blue-200 shadow-sm"
            size="sm"
          >
            <span className="flex items-center gap-2">
              <Activity size={16} />
              Dashboard
            </span>
          </Button>
        );
    }
  };

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
        {renderActionButton()}
      </CardContent>
    </Card>
  );
};
