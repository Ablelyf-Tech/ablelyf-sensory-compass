import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, User, Video, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { patients } from '@/data/mockData';
import { ScheduleSessionForm } from '@/components/therapist/ScheduleSessionForm';

// Mock calendar events data
const mockEvents = [
  {
    id: 'e1',
    patientId: 'p1',
    title: 'Therapy Session',
    date: new Date(2023, 3, 10, 10, 0),
    duration: 60,
    type: 'individual',
    location: 'clinic'
  },
  {
    id: 'e2',
    patientId: 'p2',
    title: 'Initial Assessment',
    date: new Date(2023, 3, 10, 13, 0),
    duration: 90,
    type: 'evaluation',
    location: 'clinic'
  },
  {
    id: 'e3',
    patientId: 'p3',
    title: 'Group Session',
    date: new Date(2023, 3, 11, 15, 0),
    duration: 60,
    type: 'group',
    location: 'telehealth'
  },
  {
    id: 'e4',
    patientId: 'p4',
    title: 'Parent Consultation',
    date: new Date(2023, 3, 12, 9, 0),
    duration: 45,
    type: 'consultation',
    location: 'telehealth'
  }
];

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  
  // Get patient name from ID
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };
  
  // Get events for selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return mockEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  
  // Format time from Date object
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get location icon and text
  const getLocationInfo = (location: string) => {
    switch (location) {
      case 'clinic':
        return { icon: <MapPin className="h-4 w-4" />, text: 'Clinic' };
      case 'telehealth':
        return { icon: <Video className="h-4 w-4" />, text: 'Virtual Session' };
      case 'home':
        return { icon: <MapPin className="h-4 w-4" />, text: "Patient's Home" };
      case 'school':
        return { icon: <MapPin className="h-4 w-4" />, text: 'School' };
      default:
        return { icon: <MapPin className="h-4 w-4" />, text: location };
    }
  };
  
  // Get event type badge color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'individual':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'group':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'evaluation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'consultation':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'training':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'team':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddSession = () => {
    const triggerElement = document.querySelector('[data-trigger="scheduleSessionForm"]');
    if (triggerElement instanceof HTMLElement) {
      triggerElement.click();
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-ablelyf-blue-900">Schedule</h1>
          <p className="text-muted-foreground">Manage your therapy sessions and appointments</p>
        </div>
        <ScheduleSessionForm />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-border lg:col-span-1">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
              initialFocus
            />
          </CardContent>
        </Card>
        
        <Card className="border border-border lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              {selectedDate ? (
                <span>
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              ) : (
                <span>No Date Selected</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="flex flex-col space-y-2 border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <User className="h-4 w-4 mr-1" />
                          <span>{getPatientName(event.patientId)}</span>
                        </div>
                      </div>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>
                          {formatTime(event.date)} ({event.duration} min)
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        {getLocationInfo(event.location).icon}
                        <span className="ml-1">{getLocationInfo(event.location).text}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      {event.location === 'telehealth' && (
                        <Button size="sm" className="bg-ablelyf-blue-500">
                          <Video className="mr-2 h-4 w-4" />
                          Join Session
                        </Button>
                      )}
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Sessions Scheduled</h3>
                  <p className="text-muted-foreground mt-1">
                    No appointments for {selectedDate?.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </p>
                  <Button 
                    className="mt-4 bg-ablelyf-blue-500"
                    onClick={handleAddSession}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Schedule;
