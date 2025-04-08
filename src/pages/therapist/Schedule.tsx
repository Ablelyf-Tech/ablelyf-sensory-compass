
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, User, Video, MessageSquare, FileText, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { patients } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import ScheduleModal from '@/components/therapist/ScheduleModal';

// Mock scheduled sessions data
const mockSessions = [
  {
    id: 's1',
    patientId: 'p1',
    date: new Date(2025, 3, 10, 9, 0), // April 10, 2025, 9:00 AM
    timeSlot: '09:00 AM',
    duration: 60,
    sessionType: 'therapy',
    notes: 'Focus on speech exercises and social interactions',
    status: 'upcoming'
  },
  {
    id: 's2',
    patientId: 'p2',
    date: new Date(2025, 3, 10, 11, 0), // April 10, 2025, 11:00 AM
    timeSlot: '11:00 AM',
    duration: 45,
    sessionType: 'evaluation',
    notes: 'Quarterly progress evaluation',
    status: 'upcoming'
  },
  {
    id: 's3',
    patientId: 'p3',
    date: new Date(2025, 3, 11, 10, 0), // April 11, 2025, 10:00 AM
    timeSlot: '10:00 AM',
    duration: 60,
    sessionType: 'initial',
    notes: 'Initial assessment session',
    status: 'upcoming'
  },
  {
    id: 's4',
    patientId: 'p1',
    date: new Date(2025, 3, 8, 14, 0), // April 8, 2025, 2:00 PM
    timeSlot: '02:00 PM',
    duration: 45,
    sessionType: 'therapy',
    notes: 'Continued work on communication skills',
    status: 'completed'
  },
  {
    id: 's5',
    patientId: 'p4',
    date: new Date(2025, 3, 12, 13, 0), // April 12, 2025, 1:00 PM
    timeSlot: '01:00 PM',
    duration: 60,
    sessionType: 'consultation',
    notes: 'Parent consultation about home exercises',
    status: 'upcoming'
  }
];

const Schedule: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('upcoming');

  // Get sessions based on selected date and active tab
  const getFilteredSessions = () => {
    let filtered = [...mockSessions];
    
    if (selectedDate) {
      filtered = filtered.filter(session => 
        session.date.getDate() === selectedDate.getDate() &&
        session.date.getMonth() === selectedDate.getMonth() &&
        session.date.getFullYear() === selectedDate.getFullYear()
      );
    }
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(session => session.status === activeTab);
    }
    
    return filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  
  const filteredSessions = getFilteredSessions();

  // Get patient name from patient ID
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'therapy':
        return 'Therapy Session';
      case 'evaluation':
        return 'Progress Evaluation';
      case 'initial':
        return 'Initial Assessment';
      case 'consultation':
        return 'Parent Consultation';
      case 'followup':
        return 'Follow-up Session';
      default:
        return 'Session';
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'therapy':
        return 'bg-ablelyf-green-500';
      case 'evaluation':
        return 'bg-ablelyf-blue-500';
      case 'initial':
        return 'bg-purple-500';
      case 'consultation':
        return 'bg-amber-500';
      case 'followup':
        return 'bg-cyan-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSessionAction = (action: string, sessionId: string, patientName: string) => {
    switch (action) {
      case 'Start':
        navigate('/video-session');
        break;
      case 'Reschedule':
        toast({
          title: "Reschedule Session",
          description: `Rescheduling session for ${patientName}`,
        });
        break;
      case 'Cancel':
        toast({
          title: "Cancel Session",
          description: `Session for ${patientName} has been cancelled`,
        });
        break;
      case 'Notes':
        toast({
          title: "Session Notes",
          description: `Viewing notes for ${patientName}'s session`,
        });
        break;
      default:
        toast({
          title: action,
          description: `${action} for session with ${patientName}`,
        });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Therapy Schedule</h1>
            <p className="text-muted-foreground">Manage and view all your scheduled therapy sessions</p>
          </div>
          <ScheduleModal 
            buttonText="Schedule New Session"
            customButtonClass="flex items-center gap-2"
          >
            <CalendarIcon size={16} className="mr-1" />
            <span>Schedule New Session</span>
          </ScheduleModal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={setSelectedDate}
                className="rounded-md border mx-auto"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Session Types:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-ablelyf-green-500">Therapy</Badge>
                  <Badge className="bg-ablelyf-blue-500">Evaluation</Badge>
                  <Badge className="bg-purple-500">Assessment</Badge>
                  <Badge className="bg-amber-500">Consultation</Badge>
                  <Badge className="bg-cyan-500">Follow-up</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2 space-y-5">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Sessions</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {selectedDate && (
              <h3 className="font-medium flex items-center gap-2">
                <CalendarIcon size={16} />
                Sessions for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
            )}
            
            <div className="space-y-4">
              {filteredSessions.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No sessions scheduled for this date.
                  </CardContent>
                </Card>
              ) : (
                filteredSessions.map(session => {
                  const patientName = getPatientName(session.patientId);
                  
                  return (
                    <Card key={session.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className={`w-full sm:w-2 ${getSessionTypeColor(session.sessionType)} h-2 sm:h-auto`}></div>
                          <div className="p-4 sm:p-5 w-full space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={session.status === 'completed' ? 'text-muted-foreground' : ''}>
                                    {session.timeSlot} ({session.duration} min)
                                  </Badge>
                                  <Badge className={getSessionTypeColor(session.sessionType)}>
                                    {getSessionTypeLabel(session.sessionType)}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                  <User size={16} className="text-muted-foreground" />
                                  {patientName}
                                </h3>
                              </div>
                              <div className="flex gap-2 flex-wrap justify-end">
                                {session.status === 'upcoming' && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => handleSessionAction('Start', session.id, patientName)}
                                  >
                                    <Video size={14} className="mr-1" />
                                    Start Session
                                  </Button>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <MoreHorizontal size={14} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {session.status === 'upcoming' ? (
                                      <>
                                        <DropdownMenuItem onClick={() => handleSessionAction('Message', session.id, patientName)}>
                                          <MessageSquare size={14} className="mr-2" />
                                          Send Reminder
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleSessionAction('Reschedule', session.id, patientName)}>
                                          <CalendarIcon size={14} className="mr-2" />
                                          Reschedule
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleSessionAction('Cancel', session.id, patientName)}>
                                          <Clock size={14} className="mr-2" />
                                          Cancel Session
                                        </DropdownMenuItem>
                                      </>
                                    ) : (
                                      <DropdownMenuItem onClick={() => handleSessionAction('Notes', session.id, patientName)}>
                                        <FileText size={14} className="mr-2" />
                                        View Session Notes
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            {session.notes && (
                              <p className="text-sm text-muted-foreground">
                                {session.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Schedule;
