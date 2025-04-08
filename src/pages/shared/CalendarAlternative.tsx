
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogTrigger 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  X,
  MapPin, 
  Users,
  MoreHorizontal,
  CalendarDays,
  CalendarClock,
  CalendarCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addDays, addMonths, subMonths, isSameDay, isToday, isThisMonth, startOfMonth, endOfMonth, eachDayOfInterval, getDay, startOfWeek, endOfWeek } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarEvent } from '@/types';

// Define a type for the new event form state
interface NewEventForm {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: CalendarEvent['type'];
  location?: string;
  description?: string;
  participants: string[];
  recurring: CalendarEvent['recurring'];
}

// Example events
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Therapy Session',
    date: addDays(new Date(), 1),
    startTime: '10:00',
    endTime: '11:00',
    type: 'therapy',
    location: 'Sensory Health Center',
    description: 'Weekly therapy session with Dr. Rodriguez',
    participants: ['Dr. Rodriguez', 'Alex'],
    recurring: 'weekly'
  },
  {
    id: '2',
    title: 'School Meeting',
    date: addDays(new Date(), 3),
    startTime: '14:00',
    endTime: '15:00',
    type: 'school',
    location: 'Brookside Elementary',
    description: 'Meeting with teacher about progress',
    participants: ['Ms. Thompson', 'Alex', 'Parent'],
    recurring: 'none'
  },
  {
    id: '3',
    title: 'Doctor Appointment',
    date: addDays(new Date(), 5),
    startTime: '09:30',
    endTime: '10:30',
    type: 'doctor',
    location: 'Medical Center',
    description: 'Regular check-up with Dr. Patel',
    participants: ['Dr. Patel', 'Alex', 'Parent']
  },
  {
    id: '4',
    title: 'Playgroup',
    date: new Date(),
    startTime: '11:00',
    endTime: '12:00',
    type: 'activity',
    location: 'Community Center',
    description: 'Social activity group',
    participants: ['Group Facilitator', 'Alex', '5 peers'],
    recurring: 'weekly'
  },
  {
    id: '5',
    title: 'Evening Medication',
    date: new Date(),
    startTime: '19:00',
    type: 'medication',
    description: 'Daily evening medication',
    recurring: 'daily',
    participants: ['Alex'],
    completed: false
  }
];

const CalendarAlternative: React.FC = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');
  const [activeTab, setActiveTab] = useState('all');

  const [newEvent, setNewEvent] = useState<NewEventForm>({
    title: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    type: 'therapy',
    location: '',
    description: '',
    participants: [],
    recurring: 'none'
  });

  // Event Helpers
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Type styles
  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'therapy': return 'bg-ablelyf-blue-500';
      case 'doctor': return 'bg-ablelyf-green-500';
      case 'school': return 'bg-amber-500';
      case 'activity': return 'bg-purple-500';
      case 'medication': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeBadge = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'therapy': return <Badge className="bg-ablelyf-blue-500">Therapy</Badge>;
      case 'doctor': return <Badge className="bg-ablelyf-green-500">Doctor</Badge>;
      case 'school': return <Badge className="bg-amber-500">School</Badge>;
      case 'activity': return <Badge className="bg-purple-500">Activity</Badge>;
      case 'medication': return <Badge className="bg-red-500">Medication</Badge>;
      default: return <Badge variant="outline">Other</Badge>;
    }
  };

  // Create new event
  const handleCreateEvent = () => {
    if (!newEvent.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for the event.",
        variant: "destructive"
      });
      return;
    }

    // Process participants
    let participants = Array.isArray(newEvent.participants) 
      ? newEvent.participants 
      : newEvent.participants.split(',').map(p => p.trim()).filter(Boolean);

    const createdEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      type: newEvent.type,
      location: newEvent.location,
      description: newEvent.description,
      participants: participants,
      recurring: newEvent.recurring,
      completed: false
    };

    setEvents(prev => [...prev, createdEvent]);
    setShowAddEvent(false);
    setNewEvent({
      title: '',
      date: new Date(),
      startTime: '',
      endTime: '',
      type: 'therapy',
      location: '',
      description: '',
      participants: [],
      recurring: 'none'
    });

    toast({
      title: "Event created",
      description: "Your new event has been added to the calendar.",
    });
  };

  // Mark event as completed
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

  // Delete event
  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setShowEventDetails(false);
    
    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar.",
    });
  };

  // Filter events for the active tab
  const getFilteredEvents = () => {
    let filtered = [...events];
    
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(event => 
        new Date(event.date) >= new Date() && !event.completed
      );
    } 
    else if (activeTab === 'completed') {
      filtered = filtered.filter(event => event.completed);
    }
    
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Calendar grid rendering for month view
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekDays.map(day => (
            <div key={day} className="text-sm font-medium py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {dateRange.map((date, i) => {
            const isSelected = isSameDay(date, selectedDate);
            const isCurrentMonth = isThisMonth(date);
            const dateEvents = getEventsForDate(date);
            
            return (
              <button
                key={i}
                className={cn(
                  "h-24 sm:h-28 p-1 text-left border rounded-md relative",
                  isSelected ? "border-ablelyf-blue-500 shadow-sm" : "border-gray-200",
                  !isCurrentMonth && "opacity-40"
                )}
                onClick={() => setSelectedDate(date)}
              >
                <div className={cn(
                  "font-medium text-sm w-6 h-6 flex items-center justify-center rounded-full",
                  isToday(date) ? "bg-ablelyf-blue-500 text-white" : ""
                )}>
                  {format(date, 'd')}
                </div>
                
                {dateEvents.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {dateEvents.slice(0, 3).map((event, idx) => (
                      <div 
                        key={idx}
                        className={cn(
                          "text-xs py-0.5 px-1.5 rounded-sm overflow-hidden text-ellipsis whitespace-nowrap",
                          `bg-opacity-20 ${getEventTypeColor(event.type)}`
                        )}
                        title={event.title}
                      >
                        {event.startTime && event.startTime.split(':')[0] + ':' + event.startTime.split(':')[1]} {event.title}
                      </div>
                    ))}
                    
                    {dateEvents.length > 3 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{dateEvents.length - 3} more
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Week view rendering
  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, i) => (
            <div 
              key={i} 
              className={cn(
                "text-center",
                isSameDay(day, selectedDate) && "font-medium"
              )}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-sm text-muted-foreground">{weekDayNames[i]}</div>
              <div className={cn(
                "mx-auto w-8 h-8 flex items-center justify-center rounded-full mt-1 text-sm",
                isToday(day) ? "bg-ablelyf-blue-500 text-white" : "",
                isSameDay(day, selectedDate) && !isToday(day) ? "bg-ablelyf-blue-100" : ""
              )}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {weekDays.map((day, i) => {
            const dayEvents = getEventsForDate(day);
            if (dayEvents.length === 0) return null;
            
            return (
              <div key={i} className="space-y-2">
                <div className={cn(
                  "text-sm font-medium py-1 px-2 rounded-md",
                  isSameDay(day, selectedDate) ? "bg-ablelyf-blue-50" : "bg-gray-50"
                )}>
                  {weekDayNames[i]}, {format(day, 'MMMM d')}
                  {isToday(day) && <Badge className="ml-2">Today</Badge>}
                </div>
                
                {dayEvents
                  .sort((a, b) => {
                    if (!a.startTime) return 1;
                    if (!b.startTime) return -1;
                    return a.startTime.localeCompare(b.startTime);
                  })
                  .map((event, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventDetails(true);
                      }}
                    >
                      <div className={`w-1 h-10 rounded-full mr-3 ${getEventTypeColor(event.type)}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{event.title}</span>
                          {getEventTypeBadge(event.type)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          {event.startTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.startTime}
                              {event.endTime && ` - ${event.endTime}`}
                            </span>
                          )}
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                      {event.completed && (
                        <CheckCircle2 className="h-4 w-4 text-ablelyf-green-500 ml-2" />
                      )}
                    </div>
                  ))
                }
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Agenda view rendering
  const renderAgendaView = () => {
    const filteredEvents = getFilteredEvents();
    
    // Group events by date
    const groupedEvents: Record<string, CalendarEvent[]> = {};
    
    filteredEvents.forEach(event => {
      const dateKey = format(new Date(event.date), 'yyyy-MM-dd');
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    });
    
    // Sort dates
    const sortedDates = Object.keys(groupedEvents).sort();
    
    return (
      <div className="space-y-6">
        {sortedDates.length > 0 ? (
          sortedDates.map(dateKey => {
            const date = new Date(dateKey);
            const dateEvents = groupedEvents[dateKey];
            
            return (
              <div key={dateKey} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 flex flex-col items-center justify-center rounded-full",
                    isToday(date) ? "bg-ablelyf-blue-500 text-white" : "bg-gray-100"
                  )}>
                    <span className="text-xs font-medium">{format(date, 'MMM')}</span>
                    <span className="text-sm font-bold">{format(date, 'd')}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{format(date, 'EEEE')}</h3>
                    <p className="text-sm text-muted-foreground">{format(date, 'MMMM d, yyyy')}</p>
                  </div>
                  {isToday(date) && <Badge>Today</Badge>}
                </div>
                
                <div className="space-y-2 ml-5 pl-5 border-l-2 border-gray-200">
                  {dateEvents
                    .sort((a, b) => {
                      if (!a.startTime) return 1;
                      if (!b.startTime) return -1;
                      return a.startTime.localeCompare(b.startTime);
                    })
                    .map(event => (
                      <div 
                        key={event.id}
                        className={cn(
                          "p-3 border rounded-md cursor-pointer",
                          event.completed ? "bg-gray-50" : "bg-white",
                          "hover:border-ablelyf-blue-300"
                        )}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventDetails(true);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className={`w-1 h-full rounded-full ${getEventTypeColor(event.type)}`} />
                            <div>
                              <h4 className={cn(
                                "font-medium",
                                event.completed && "line-through text-muted-foreground"
                              )}>
                                {event.title}
                              </h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {event.startTime && (
                                  <span className="text-xs flex items-center text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {event.startTime}
                                    {event.endTime && ` - ${event.endTime}`}
                                  </span>
                                )}
                                {event.location && (
                                  <span className="text-xs flex items-center text-muted-foreground">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {event.location}
                                  </span>
                                )}
                                {event.participants && event.participants.length > 0 && (
                                  <span className="text-xs flex items-center text-muted-foreground">
                                    <Users className="h-3 w-3 mr-1" />
                                    {typeof event.participants === 'string' 
                                      ? event.participants 
                                      : event.participants.length > 2 
                                        ? `${event.participants[0]} +${event.participants.length - 1}` 
                                        : event.participants.join(', ')}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {getEventTypeBadge(event.type)}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10">
            <CalendarIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-medium">No events</h3>
            <p className="text-sm text-muted-foreground mt-1">
              There are no events matching your current filters.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setNewEvent(prev => ({
                  ...prev,
                  date: selectedDate
                }));
                setShowAddEvent(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and appointments</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md p-1 bg-muted/50">
              <Button 
                variant={viewMode === 'month' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('month')}
                className="gap-1"
              >
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">Month</span>
              </Button>
              <Button 
                variant={viewMode === 'week' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('week')}
                className="gap-1"
              >
                <CalendarClock className="h-4 w-4" />
                <span className="hidden sm:inline">Week</span>
              </Button>
              <Button 
                variant={viewMode === 'agenda' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('agenda')}
                className="gap-1"
              >
                <CalendarCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Agenda</span>
              </Button>
            </div>
            
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
                  {/* Title input */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="event-title"
                      placeholder="Event title"
                      className="col-span-3"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  {/* Date picker */}
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
                  {/* Time inputs */}
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
                          value={newEvent.startTime}
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
                          value={newEvent.endTime}
                          onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Event type select */}
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
                  {/* Recurring select */}
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
                  {/* Location input */}
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
                  {/* Participants input */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-participants" className="text-right">
                      Participants
                    </Label>
                    <Input
                      id="event-participants"
                      placeholder="Names separated by commas"
                      className="col-span-3"
                      value={Array.isArray(newEvent.participants) ? newEvent.participants.join(', ') : newEvent.participants}
                      onChange={(e) => setNewEvent({ 
                        ...newEvent, 
                        participants: e.target.value.split(',').map(p => p.trim()).filter(Boolean)
                      })}
                    />
                  </div>
                  {/* Description textarea */}
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
        </div>
        
        {/* Main calendar container */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
          {/* Left panel - Calendar */}
          <div className={cn(
            viewMode === 'agenda' ? "lg:col-span-5" : "lg:col-span-6",
            "space-y-6"
          )}>
            {/* Calendar controls and view */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {viewMode === 'month' && format(currentMonth, 'MMMM yyyy')}
                    {viewMode === 'week' && `Week of ${format(selectedDate, 'MMMM d, yyyy')}`}
                    {viewMode === 'agenda' && 'Agenda View'}
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
              <CardContent className="p-4">
                {viewMode === 'month' && renderMonthView()}
                {viewMode === 'week' && renderWeekView()}
                {viewMode === 'agenda' && (
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Events</TabsTrigger>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">{renderAgendaView()}</TabsContent>
                    <TabsContent value="upcoming">{renderAgendaView()}</TabsContent>
                    <TabsContent value="completed">{renderAgendaView()}</TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right panel - Selected date/event details */}
          <div className={cn(
            viewMode === 'agenda' ? "lg:col-span-3" : "lg:col-span-2",
            "space-y-6"
          )}>
            {viewMode !== 'agenda' && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
                    {isToday(selectedDate) && <Badge>Today</Badge>}
                  </CardTitle>
                  <CardDescription>
                    {format(selectedDate, 'EEEE')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[380px] pr-4">
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
                              className={cn(
                                "p-3 rounded-md border",
                                event.completed ? 'bg-gray-50 border-gray-200' : 'bg-white'
                              )}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex items-start space-x-3">
                                  <div className={`mt-0.5 p-2 rounded-full
                                    ${event.type === 'therapy' ? 'bg-ablelyf-blue-50' : ''}
                                    ${event.type === 'doctor' ? 'bg-ablelyf-green-50' : ''}
                                    ${event.type === 'school' ? 'bg-amber-50' : ''}
                                    ${event.type === 'activity' ? 'bg-purple-50' : ''}
                                    ${event.type === 'medication' ? 'bg-red-50' : ''}
                                    ${event.type === 'other' ? 'bg-gray-50' : ''}
                                  `}>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      {event.startTime && (
                                        <span className="text-sm text-muted-foreground">
                                          {event.startTime}
                                          {event.endTime && ` - ${event.endTime}`}
                                        </span>
                                      )}
                                    </div>
                                    <h3 className={`font-medium mt-1 ${event.completed ? 'line-through text-muted-foreground' : ''}`}>
                                      {event.title}
                                    </h3>
                                    {event.location && (
                                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        <span>{event.location}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  {getEventTypeBadge(event.type)}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedEvent(event);
                                          setShowEventDetails(true);
                                        }}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" /> View Details
                                      </DropdownMenuItem>
                                      {!event.completed && (
                                        <DropdownMenuItem
                                          onClick={() => handleMarkCompleted(event.id)}
                                        >
                                          <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Completed
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem
                                        onClick={() => handleDeleteEvent(event.id)}
                                        className="text-red-600"
                                      >
                                        <X className="mr-2 h-4 w-4" /> Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
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
                            setNewEvent(prev => ({
                              ...prev,
                              date: selectedDate
                            }));
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
            )}
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events
                    .filter(event => new Date(event.date) >= new Date() && !event.completed)
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 5)
                    .map((event) => (
                      <div 
                        key={event.id}
                        className="flex items-start p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventDetails(true);
                        }}
                      >
                        <div className={`w-1 h-full self-stretch rounded-full mr-3 ${getEventTypeColor(event.type)}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{event.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {format(new Date(event.date), 'MMM d')}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {event.startTime && (
                              <span className="text-xs flex items-center text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.startTime}
                              </span>
                            )}
                            {event.type && (
                              <span className="text-xs">{getEventTypeBadge(event.type)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  
                  {events.filter(event => new Date(event.date) >= new Date() && !event.completed).length === 0 && (
                    <div className="text-center text-muted-foreground py-6">
                      No upcoming events
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Event details dialog */}
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
                      {Array.isArray(selectedEvent.participants) && selectedEvent.participants.map((participant, index) => (
                        <Badge key={index} variant="outline" className="bg-ablelyf-blue-50">
                          {participant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3 pt-4 mt-4 border-t">
                  {!selectedEvent.completed && (
                    <Button 
                      className="flex-1 gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600"
                      onClick={() => handleMarkCompleted(selectedEvent.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Complete
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    className="flex-1 gap-2 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                  >
                    <X className="h-4 w-4" />
                    Delete Event
                  </Button>
                </div>
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

export default CalendarAlternative;
