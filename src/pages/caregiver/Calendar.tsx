import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar as CalendarIcon, Clock, Plus,
  Brain, Users, Book, ChevronLeft, 
  ChevronRight, CheckCircle2, ArrowRight,
  Video, MapPin, User, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addDays, addMonths, subMonths, parseISO, isSameDay, isToday } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  type: 'therapy' | 'doctor' | 'school' | 'activity' | 'medication' | 'other';
  location?: string;
  description?: string;
  participants?: string[];
  completed?: boolean;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'none';
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Occupational Therapy',
    date: addDays(new Date(), 1),
    startTime: '10:00',
    endTime: '11:00',
    type: 'therapy',
    location: 'Sensory Health Center',
    description: 'Weekly occupational therapy session with Dr. Rodriguez',
    participants: ['Dr. Rodriguez', 'Alex'],
    recurring: 'weekly'
  },
  {
    id: '2',
    title: 'Speech Therapy',
    date: addDays(new Date(), 3),
    startTime: '14:00',
    endTime: '15:00',
    type: 'therapy',
    location: 'Sensory Health Center',
    description: 'Speech therapy focusing on social communication',
    participants: ['Dr. Johnson', 'Alex'],
    recurring: 'weekly'
  },
  {
    id: '3',
    title: 'Pediatrician Appointment',
    date: addDays(new Date(), 5),
    startTime: '09:30',
    endTime: '10:30',
    type: 'doctor',
    location: 'ChildrenWell Medical Center',
    description: 'Regular check-up with Dr. Patel',
    participants: ['Dr. Patel', 'Alex', 'Parent']
  },
  {
    id: '4',
    title: 'School IEP Meeting',
    date: addDays(new Date(), 7),
    startTime: '15:00',
    endTime: '16:00',
    type: 'school',
    location: 'Brookside Elementary - Room 202',
    description: 'Annual IEP review meeting',
    participants: ['Ms. Thompson', 'School Counselor', 'Alex', 'Parent'],
    recurring: 'none'
  },
  {
    id: '5',
    title: 'Sensory Playgroup',
    date: new Date(),
    startTime: '11:00',
    endTime: '12:00',
    type: 'activity',
    location: 'Community Center',
    description: 'Structured playgroup for sensory integration',
    participants: ['Group Facilitator', 'Alex', '5 peers'],
    recurring: 'weekly'
  },
  {
    id: '6',
    title: 'Evening Medication',
    date: new Date(),
    startTime: '19:00',
    type: 'medication',
    description: 'Daily evening medication',
    recurring: 'daily',
    completed: true
  }
];

const getEventTypeIcon = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'therapy':
      return <Brain className="h-4 w-4" />;
    case 'doctor':
      return <User className="h-4 w-4" />;
    case 'school':
      return <Book className="h-4 w-4" />;
    case 'activity':
      return <Users className="h-4 w-4" />;
    case 'medication':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <CalendarIcon className="h-4 w-4" />;
  }
};

const getEventTypeBadge = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'therapy':
      return <Badge className="bg-ablelyf-blue-500">Therapy</Badge>;
    case 'doctor':
      return <Badge className="bg-ablelyf-green-500">Doctor</Badge>;
    case 'school':
      return <Badge className="bg-amber-500">School</Badge>;
    case 'activity':
      return <Badge className="bg-purple-500">Activity</Badge>;
    case 'medication':
      return <Badge className="bg-red-500">Medication</Badge>;
    default:
      return <Badge variant="outline">Other</Badge>;
  }
};

const getEventColor = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'therapy':
      return 'bg-ablelyf-blue-500';
    case 'doctor':
      return 'bg-ablelyf-green-500';
    case 'school':
      return 'bg-amber-500';
    case 'activity':
      return 'bg-purple-500';
    case 'medication':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const CalendarPage: React.FC = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    date: new Date(),
    type: 'therapy',
    recurring: 'none'
  });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleCreateEvent = () => {
    if (!newEvent.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for the event.",
        variant: "destructive"
      });
      return;
    }

    let participants: string[] | undefined;
    
    if (typeof newEvent.participants === 'string') {
      participants = newEvent.participants.split(',').map(p => p.trim()).filter(Boolean);
    } else {
      participants = newEvent.participants;
    }

    const createdEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title || '',
      date: newEvent.date || new Date(),
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      type: newEvent.type as CalendarEvent['type'] || 'other',
      location: newEvent.location,
      description: newEvent.description,
      participants: participants,
      recurring: newEvent.recurring as CalendarEvent['recurring'],
      completed: false
    };

    setEvents(prev => [...prev, createdEvent]);
    setShowAddEvent(false);
    setNewEvent({
      date: new Date(),
      type: 'therapy',
      recurring: 'none'
    });

    toast({
      title: "Event created",
      description: "Your new event has been added to the calendar.",
    });
  };

  const handleMarkCompleted = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, completed: true } : event
      )
    );

    setShowEventDetails(false);

    toast({
      title: "Event completed",
      description: "The event has been marked as completed.",
    });
  };

  const hasEvents = (date: Date) => {
    return events.some(event => isSameDay(event.date, date));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          
          <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600">
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="event-title"
                    placeholder="Event title"
                    className="col-span-3"
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-date" className="text-right">
                    Date
                  </Label>
                  <div className="col-span-3">
                    <CalendarComponent
                      mode="single"
                      selected={newEvent.date}
                      onSelect={(date) => date && setNewEvent({ ...newEvent, date })}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Time</Label>
                  <div className="col-span-3 grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time" className="text-sm text-muted-foreground">
                        Start
                      </Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={newEvent.startTime || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="text-sm text-muted-foreground">
                        End
                      </Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={newEvent.endTime || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) => 
                      setNewEvent({ 
                        ...newEvent, 
                        type: value as CalendarEvent['type'] 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="therapy">Therapy</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-recurring" className="text-right">
                    Recurring
                  </Label>
                  <Select
                    value={newEvent.recurring}
                    onValueChange={(value) => 
                      setNewEvent({ 
                        ...newEvent, 
                        recurring: value as CalendarEvent['recurring'] 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select recurrence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="event-location"
                    placeholder="Event location"
                    className="col-span-3"
                    value={newEvent.location || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-participants" className="text-right">
                    Participants
                  </Label>
                  <Input
                    id="event-participants"
                    placeholder="Names separated by commas"
                    className="col-span-3"
                    value={
                      typeof newEvent.participants === 'string' 
                        ? newEvent.participants 
                        : Array.isArray(newEvent.participants) 
                          ? newEvent.participants.join(', ') 
                          : ''
                    }
                    onChange={(e) => setNewEvent({ ...newEvent, participants: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="event-description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="event-description"
                    placeholder="Event details"
                    className="col-span-3"
                    rows={3}
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddEvent(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateEvent}
                  className="bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600"
                >
                  Add to Calendar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {format(currentMonth, 'MMMM yyyy')}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={prevMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setCurrentMonth(new Date());
                      setSelectedDate(new Date());
                    }}
                  >
                    Today
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={nextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className={cn("p-3 pointer-events-auto")}
                modifiers={{
                  today: (date) => isToday(date),
                  hasEvents: (date) => hasEvents(date)
                }}
                modifiersClassNames={{
                  today: "bg-ablelyf-blue-100 text-ablelyf-blue-800 font-medium",
                  hasEvents: "border border-ablelyf-blue-500 font-medium relative"
                }}
                components={{
                  Day: (props) => {
                    const date = props.date;
                    const selected = props.selected;
                    const dateEvents = getEventsForDate(date);
                    const isSelected = selected && isSameDay(selected, date);
                    
                    return (
                      <div className="relative">
                        <div 
                          className={cn(
                            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center rounded-md",
                            isToday(date) && "bg-ablelyf-blue-100 text-ablelyf-blue-800 font-medium",
                            isSelected && !isToday(date) && "bg-ablelyf-blue-500 text-white"
                          )}
                        >
                          {date.getDate()}
                        </div>
                        
                        {dateEvents.length > 0 && (
                          <div className="absolute bottom-0.5 left-0 right-0 flex justify-center">
                            <div className="flex gap-0.5">
                              {dateEvents.slice(0, 3).map((event, index) => (
                                <div 
                                  key={index}
                                  className={`h-1 w-1 rounded-full ${getEventColor(event.type)}`}
                                />
                              ))}
                              {dateEvents.length > 3 && (
                                <div className="h-1 w-1 rounded-full bg-gray-500" />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  },
                }}
              />
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
                  {isToday(selectedDate) && <Badge>Today</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {getEventsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDate)
                        .sort((a, b) => {
                          if (!a.startTime) return 1;
                          if (!b.startTime) return -1;
                          return a.startTime.localeCompare(b.startTime);
                        })
                        .map((event) => (
                          <div 
                            key={event.id}
                            className={`
                              p-3 rounded-md border 
                              ${event.completed ? 'bg-gray-50 border-gray-200' : 'bg-white'}
                            `}
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowEventDetails(true);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-3">
                                <div className={`
                                  p-2 rounded-full mt-0.5
                                  ${event.type === 'therapy' ? 'bg-ablelyf-blue-50' : ''}
                                  ${event.type === 'doctor' ? 'bg-ablelyf-green-50' : ''}
                                  ${event.type === 'school' ? 'bg-amber-50' : ''}
                                  ${event.type === 'activity' ? 'bg-purple-50' : ''}
                                  ${event.type === 'medication' ? 'bg-red-50' : ''}
                                  ${event.type === 'other' ? 'bg-gray-50' : ''}
                                `}>
                                  {getEventTypeIcon(event.type)}
                                </div>
                                <div>
                                  <h3 className={`font-medium ${event.completed ? 'line-through text-gray-500' : ''}`}>
                                    {event.title}
                                  </h3>
                                  
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                    {event.startTime && (
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>
                                          {event.startTime}
                                          {event.endTime && ` - ${event.endTime}`}
                                        </span>
                                      </div>
                                    )}
                                    
                                    {event.location && (
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{event.location}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                {getEventTypeBadge(event.type)}
                                {event.completed && (
                                  <div className="mt-1 flex justify-end">
                                    <CheckCircle2 className="h-4 w-4 text-ablelyf-green-500" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <CalendarIcon className="h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="font-medium">No events scheduled</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        There are no events scheduled for this day.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setNewEvent({
                            ...newEvent,
                            date: selectedDate
                          });
                          setShowAddEvent(true);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events
                    .filter(event => new Date(event.date) >= new Date() && !event.completed)
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 3)
                    .map((event) => (
                      <div 
                        key={event.id}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-1 h-10 rounded-full ${getEventColor(event.type)}`} />
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(event.date), 'MMM d')}
                              {event.startTime && ` • ${event.startTime}`}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setSelectedDate(new Date(event.date));
                            setCurrentMonth(new Date(event.date));
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  }
                  
                  {events.filter(event => new Date(event.date) >= new Date() && !event.completed).length === 0 && (
                    <div className="text-center text-muted-foreground py-2">
                      No upcoming events
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
          {selectedEvent && (
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{selectedEvent.title}</span>
                  {getEventTypeBadge(selectedEvent.type)}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(selectedEvent.date), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                
                {selectedEvent.startTime && (
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedEvent.startTime}
                      {selectedEvent.endTime && ` - ${selectedEvent.endTime}`}
                    </span>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                
                {selectedEvent.recurring && selectedEvent.recurring !== 'none' && (
                  <div className="flex items-start gap-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mt-0.5"><path d="M17 2.1l4 4-4 4"></path><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"></path><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"></path></svg>
                    <span className="capitalize">{selectedEvent.recurring} event</span>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="pt-2">
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm mt-1">{selectedEvent.description}</p>
                  </div>
                )}
                
                {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                  <div className="pt-2">
                    <p className="text-sm font-medium">Participants</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedEvent.participants.map((participant, index) => (
                        <Badge key={index} variant="outline" className="bg-ablelyf-blue-50">
                          {participant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedEvent.type === 'therapy' && (
                  <div className="flex gap-3 pt-3 mt-3 border-t">
                    <Button 
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => {
                        toast({
                          title: "Joining video session",
                          description: "Setting up your video connection...",
                        });
                        setShowEventDetails(false);
                      }}
                    >
                      <Video className="h-4 w-4" />
                      Join Video
                    </Button>
                    <Button 
                      className="flex-1 gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600"
                      onClick={() => handleMarkCompleted(selectedEvent.id)}
                      disabled={selectedEvent.completed}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {selectedEvent.completed ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>
                )}
                
                {selectedEvent.type !== 'therapy' && !selectedEvent.completed && (
                  <div className="flex gap-3 pt-3 mt-3 border-t">
                    <Button 
                      className="w-full gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600"
                      onClick={() => handleMarkCompleted(selectedEvent.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Mark as Completed
                    </Button>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEventDetails(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
