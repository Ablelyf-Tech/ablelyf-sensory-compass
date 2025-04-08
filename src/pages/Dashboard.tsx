
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { AlertList } from '@/components/dashboard/AlertList';
import { TherapyPlanCard } from '@/components/dashboard/TherapyPlanCard';
import { patients, progressData, alertData, therapyPlans } from '@/data/mockData';
import { User, Brain, Activity, Calendar, AlertTriangle, Clock, Users, BarChart, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ResponsiveContainer } from 'recharts';
import { PatientIntakeForm } from '@/components/therapist/PatientIntakeForm';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState(alertData);

  const handleResolveAlert = (alertId: string) => {
    setAlerts(currentAlerts => 
      currentAlerts.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
    
    toast({
      title: "Alert resolved",
      description: "The alert has been marked as resolved.",
    });
  };

  // Filter data based on user role
  const getPatientCount = () => {
    switch (currentUser?.role) {
      case 'therapist':
        return patients.length;
      case 'caregiver':
        return 1;
      case 'teacher':
        return Math.floor(patients.length * 1.5); // Simulate more students
      case 'admin':
        return patients.length * 3; // All patients
      default:
        return 0;
    }
  };

  // Get relevant progress data for the current role
  const getProgressData = () => {
    return progressData.filter(data => data.patientId === 'p1');
  };

  // Get relevant alerts for the current role
  const getAlerts = () => {
    if (currentUser?.role === 'admin') {
      return alerts.filter(alert => alert.severity === 'high');
    }
    return alerts.filter(alert => alert.patientId === 'p1');
  };

  // Get therapy plans based on role
  const getTherapyPlans = () => {
    return therapyPlans.filter(plan => plan.patientId === 'p1');
  };

  // Render different dashboards based on user role
  const renderRoleDashboard = () => {
    switch (currentUser?.role) {
      case 'therapist':
        return renderTherapistDashboard();
      case 'caregiver':
        return renderCaregiverDashboard();
      case 'teacher':
        return renderTeacherDashboard();
      case 'hr':
        return renderHrDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return <p>Unknown role</p>;
    }
  };

  const renderTherapistDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Therapist Dashboard</h2>
        <PatientIntakeForm />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Active Patients"
          value={getPatientCount()}
          icon={<User size={16} />}
          className="bg-ablelyf-blue-50 border-none"
        />
        <StatsCard
          title="Therapy Sessions"
          value="24"
          icon={<Brain size={16} />}
          trend={{ value: 12, isPositive: true }}
          className="bg-ablelyf-green-50 border-none"
        />
        <StatsCard
          title="Goals Achieved"
          value="18"
          icon={<Activity size={16} />}
          trend={{ value: 8, isPositive: true }}
          className="bg-amber-50 border-none"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart 
            data={getProgressData()} 
            title="Patient Progress Overview" 
            categories={['Social Skills', 'Communication', 'Sensory Regulation']} 
          />
        </div>
        <div>
          <AlertList alerts={getAlerts()} onResolve={handleResolveAlert} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getTherapyPlans().map(plan => (
          <TherapyPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-md bg-ablelyf-blue-50">
              <div className="bg-white rounded-full p-2">
                <Clock size={20} className="text-ablelyf-blue-500" />
              </div>
              <div>
                <p className="font-medium">Alex Morgan - Therapy Session</p>
                <p className="text-sm text-muted-foreground">Today, 2:00 PM - 3:00 PM</p>
                <p className="text-sm mt-1">Focus: Social communication skills</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 rounded-md bg-ablelyf-neutral-100">
              <div className="bg-white rounded-full p-2">
                <Clock size={20} className="text-ablelyf-neutral-500" />
              </div>
              <div>
                <p className="font-medium">Mia Johnson - Assessment</p>
                <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM - 11:30 AM</p>
                <p className="text-sm mt-1">Quarterly progress assessment</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCaregiverDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Daily Activities Logged"
          value="8"
          icon={<Activity size={16} />}
          className="bg-ablelyf-blue-50 border-none"
        />
        <StatsCard
          title="Upcoming Appointments"
          value="3"
          icon={<Calendar size={16} />}
          className="bg-ablelyf-green-50 border-none"
        />
        <StatsCard
          title="Alert Incidents"
          value={getAlerts().length}
          icon={<AlertTriangle size={16} />}
          trend={{ value: 30, isPositive: false }}
          className="bg-amber-50 border-none"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart 
            data={getProgressData()} 
            title="Alex's Progress Overview" 
            categories={['Social Skills', 'Communication', 'Sensory Regulation']} 
          />
        </div>
        <div>
          <AlertList alerts={getAlerts()} onResolve={handleResolveAlert} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getTherapyPlans().map(plan => (
          <TherapyPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Daily Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-md bg-ablelyf-blue-50">
              <div className="bg-white rounded-full p-2">
                <Clock size={20} className="text-ablelyf-blue-500" />
              </div>
              <div>
                <p className="font-medium">Morning Routine</p>
                <p className="text-sm text-muted-foreground">7:30 AM - 8:30 AM</p>
                <p className="text-sm mt-1">Completed independently with visual schedule</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 rounded-md bg-ablelyf-neutral-100">
              <div className="bg-white rounded-full p-2">
                <Activity size={20} className="text-ablelyf-neutral-500" />
              </div>
              <div>
                <p className="font-medium">Homework Session</p>
                <p className="text-sm text-muted-foreground">4:00 PM - 5:00 PM</p>
                <p className="text-sm mt-1">Math worksheet completed with minimal assistance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Students"
          value={getPatientCount()}
          icon={<Users size={16} />}
          className="bg-ablelyf-blue-50 border-none"
        />
        <StatsCard
          title="IEP Milestones"
          value="42"
          icon={<Activity size={16} />}
          trend={{ value: 15, isPositive: true }}
          className="bg-ablelyf-green-50 border-none"
        />
        <StatsCard
          title="Class Alerts Today"
          value="5"
          icon={<AlertTriangle size={16} />}
          className="bg-amber-50 border-none"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-ablelyf-neutral-100 rounded-md">
                <p className="text-muted-foreground">Classroom heatmap visualization</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <AlertList alerts={alertData} onResolve={handleResolveAlert} />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-md bg-ablelyf-blue-50">
              <div className="bg-white rounded-full p-2">
                <Clock size={20} className="text-ablelyf-blue-500" />
              </div>
              <div>
                <p className="font-medium">Morning Assembly</p>
                <p className="text-sm text-muted-foreground">8:30 AM - 9:00 AM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 rounded-md bg-ablelyf-neutral-100">
              <div className="bg-white rounded-full p-2">
                <Brain size={20} className="text-ablelyf-neutral-500" />
              </div>
              <div>
                <p className="font-medium">Math Class</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 10:30 AM</p>
                <p className="text-sm mt-1">Topic: Fractions with manipulatives</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHrDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Team Members"
          value="24"
          icon={<Users size={16} />}
          className="bg-ablelyf-blue-50 border-none"
        />
        <StatsCard
          title="Accommodation Plans"
          value="8"
          icon={<FileText size={16} />}
          trend={{ value: 25, isPositive: true }}
          className="bg-ablelyf-green-50 border-none"
        />
        <StatsCard
          title="Inclusivity Score"
          value="78%"
          icon={<BarChart size={16} />}
          trend={{ value: 12, isPositive: true }}
          className="bg-amber-50 border-none"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Workplace Accommodations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-ablelyf-blue-50">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-2">
                    <Users size={20} className="text-ablelyf-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Sensory-Friendly Spaces</p>
                    <p className="text-sm text-muted-foreground">3 quiet rooms implemented</p>
                  </div>
                </div>
                <span className="text-ablelyf-green-600 text-sm font-medium">Completed</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md bg-ablelyf-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-2">
                    <Brain size={20} className="text-ablelyf-neutral-500" />
                  </div>
                  <div>
                    <p className="font-medium">Flexible Work Schedules</p>
                    <p className="text-sm text-muted-foreground">15 employees enrolled</p>
                  </div>
                </div>
                <span className="text-ablelyf-blue-600 text-sm font-medium">In Progress</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Training</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-md bg-ablelyf-green-50">
                <div className="bg-white rounded-full p-2">
                  <Calendar size={20} className="text-ablelyf-green-500" />
                </div>
                <div>
                  <p className="font-medium">Neurodiversity Awareness Workshop</p>
                  <p className="text-sm text-muted-foreground">April 15, 2:00 PM - 4:00 PM</p>
                  <p className="text-sm mt-1">18 participants registered</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Department Inclusivity Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {/* Use Recharts BarChart here */}
              <div className="flex justify-center items-center h-full text-muted-foreground">
                Department inclusivity visualization
              </div>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Users"
          value="164"
          icon={<Users size={16} />}
          trend={{ value: 8, isPositive: true }}
          className="bg-ablelyf-blue-50 border-none"
        />
        <StatsCard
          title="Active Patients"
          value={getPatientCount()}
          icon={<User size={16} />}
          className="bg-ablelyf-green-50 border-none"
        />
        <StatsCard
          title="Critical Alerts"
          value={alerts.filter(a => a.severity === 'high').length}
          icon={<AlertTriangle size={16} />}
          className="bg-red-50 border-none"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Server Uptime</span>
                    <span className="text-sm font-medium">99.8%</span>
                  </div>
                  <div className="w-full h-2 bg-ablelyf-neutral-200 rounded-full overflow-hidden">
                    <div className="bg-ablelyf-green-500 h-full rounded-full" style={{ width: '99.8%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Database Performance</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full h-2 bg-ablelyf-neutral-200 rounded-full overflow-hidden">
                    <div className="bg-ablelyf-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">API Response Time</span>
                    <span className="text-sm font-medium">178ms</span>
                  </div>
                  <div className="w-full h-2 bg-ablelyf-neutral-200 rounded-full overflow-hidden">
                    <div className="bg-ablelyf-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <AlertList 
            alerts={alerts.filter(a => a.severity === 'high')} 
            onResolve={handleResolveAlert} 
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <div className="flex justify-center items-center h-full text-muted-foreground">
                User activity visualization
              </div>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <AppLayout>
      <WelcomeHeader />
      {renderRoleDashboard()}
    </AppLayout>
  );
};

export default Dashboard;
