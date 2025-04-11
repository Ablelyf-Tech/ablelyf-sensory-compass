
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format, addHours } from 'date-fns';
import { 
  CalendarClock, Clock, CalendarRange, CalendarPlus, 
  Calendar as CalendarIcon, Clock3, Users, User, Plus 
} from 'lucide-react';
import { toast } from 'sonner';

const TeacherCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [participants, setParticipants] = useState('');
  const [notes, setNotes] = useState('');
  
  // Mock calendar events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'IEP Meeting - Jamie Rodriguez',
      date: new Date(2025, 3, 15, 10, 0),
      endTime: new Date(2025, 3, 15, 11, 0),
      type: 'meeting',
      participants: ['Jamie Rodriguez', 'Parent', 'Special Ed Coordinator', 'School Psychologist'],
      notes: 'Annual IEP review and update of accommodations.'
    },
    {
      id: 2,
      title: 'Class Reading Assessment',
      date: new Date(2025, 3, 16, 9, 0),
      endTime: new Date(2025, 3, 16, 10, 30),
      type: 'assessment',
      participants: ['All Students'],
      notes: 'Quarterly reading comprehension assessment.'
    },
    {
      id: 3,
      title: 'Behavior Support Team Meeting',
      date: new Date(2025, 3, 17, 14, 0),
      endTime: new Date(2025, 3, 17, 15, 0),
      type: 'meeting',
      participants: ['Behavior Specialist', 'School Counselor', 'Assistant Principal'],
      notes: 'Review behavior intervention plans for three students.'
    }
  ]);

  const getSelectedDateEvents = () => {
    if (!date) return [];
    
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assessment':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'conference':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'training':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddEvent = () => {
    if (!date || !eventTitle || !eventType || !startTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create date object from selected date and time
    const [hours, minutes] = startTime.split(':').map(Number);
    const eventDate = new Date(date);
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);
    
    let endDate;
    if (endTime) {
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      endDate = new Date(date);
      endDate.setHours(endHours);
      endDate.setMinutes(endMinutes);
    } else {
      // Default to 1 hour event
      endDate = addHours(eventDate, 1);
    }

    const newEvent = {
      id: Date.now(),
      title: eventTitle,
      date: eventDate,
      endTime: endDate,
      type: eventType,
      participants: participants ? participants.split(',').map(p => p.trim()) : [],
      notes: notes
    };

    setEvents([...events, newEvent]);
    toast.success('Event added to calendar');
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setEventTitle('');
    setEventType('');
    setStartTime('');
    setEndTime('');
    setParticipants('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Class Calendar</h1>
        <p className="text-muted-foreground">
          Manage your class schedule, meetings, and important dates
        </p>
      </div>

      <div className="flex justify-between items-start">
        <div className="flex space-x-2">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 py-1">
            Meeting
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 py-1">
            Assessment
          </Badge>
          <Badge className="bg-pink-100 text-pink-800 border-pink-200 py-1">
            Conference
          </Badge>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200 py-1">
            Training
          </Badge>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Schedule Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Calendar Event</DialogTitle>
              <DialogDescription>
                Create a new event, meeting, or assessment for your class calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Event Type</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="participants">Participants</Label>
                <Input
                  id="participants"
                  placeholder="Enter participant names (comma separated)"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional details or notes for this event..."
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddEvent}>
                Add to Calendar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Date Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto"
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>
              {date ? format(date, 'EEEE, MMMM d, yyyy') : 'No Date Selected'}
            </CardTitle>
            <CardDescription>
              {date ? `Scheduled events for ${format(date, 'MMMM d')}` : 'Select a date to view events'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getSelectedDateEvents().length === 0 ? (
                <div className="text-center p-6">
                  <CalendarClock className="mx-auto h-10 w-10 text-muted-foreground opacity-50 mb-2" />
                  <h3 className="text-lg font-medium">No events scheduled</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    There are no events scheduled for this date.
                  </p>
                </div>
              ) : (
                getSelectedDateEvents().map(event => (
                  <Card key={event.id}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{event.title}</CardTitle>
                          <CardDescription className="text-sm flex items-center mt-1">
                            <Clock3 className="mr-1 h-3 w-3" />
                            {format(event.date, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
                          </CardDescription>
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-0">
                      {event.participants.length > 0 && (
                        <div className="flex items-start space-x-2 mb-2">
                          <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="text-sm">
                            {event.participants.length > 3 
                              ? `${event.participants.slice(0, 3).join(', ')} +${event.participants.length - 3} more`
                              : event.participants.join(', ')}
                          </div>
                        </div>
                      )}
                      {event.notes && (
                        <div className="text-sm text-muted-foreground">
                          {event.notes}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="py-2">
                      <div className="flex justify-end w-full space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event for {date ? format(date, 'MMMM d') : 'Selected Date'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TeacherCalendar;
