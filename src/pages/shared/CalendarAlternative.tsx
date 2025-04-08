
import React, { useState, useEffect } from "react";
import { format, startOfWeek, endOfWeek, addDays, isSameDay, isWithinInterval, isValid } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, ChevronLeft, ChevronRight, Users, MapPin, Clock, Filter } from "lucide-react";
import { CalendarEvent } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DayClickEventHandler, DayContentProps } from "react-day-picker";

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Speech Therapy Session",
    date: new Date(2025, 3, 10),
    startTime: "09:00",
    endTime: "10:00",
    type: "therapy",
    location: "Main Clinic Room 3",
    description: "Weekly speech therapy session with Dr. Johnson",
    participants: ["Dr. Johnson", "Emily (Caregiver)"],
  },
  {
    id: "2",
    title: "Occupational Therapy",
    date: new Date(2025, 3, 12),
    startTime: "14:00",
    endTime: "15:30",
    type: "therapy",
    location: "Sensory Room",
    description: "Focus on fine motor skills",
    participants: ["Dr. Smith", "Ryan (Patient)"],
  },
  {
    id: "3",
    title: "Pediatrician Appointment",
    date: new Date(2025, 3, 15),
    startTime: "11:00",
    endTime: "12:00",
    type: "doctor",
    location: "Children's Hospital - North Wing",
    description: "Regular checkup and medication review",
    participants: ["Dr. Martinez", "Emily (Caregiver)"],
  },
  {
    id: "4",
    title: "School Parent-Teacher Meeting",
    date: new Date(2025, 3, 18),
    startTime: "16:00",
    endTime: "17:00",
    type: "school",
    location: "Sunshine Elementary School - Room 12",
    description: "Discuss progress and upcoming IEP review",
    participants: ["Ms. Williams (Teacher)", "Emily (Caregiver)"],
  },
  {
    id: "5",
    title: "Medication Administration",
    date: new Date(2025, 3, 9),
    startTime: "08:00",
    endTime: "08:15",
    type: "medication",
    recurring: "daily",
    description: "Morning medication dose",
    participants: ["Emily (Caregiver)"],
  },
  {
    id: "6",
    title: "Swimming Therapy",
    date: new Date(2025, 3, 11),
    startTime: "15:00",
    endTime: "16:00",
    type: "activity",
    location: "Community Pool",
    description: "Water-based therapy session",
    participants: ["Coach Roberts", "Emily (Caregiver)"],
  },
];

const eventTypeColors: Record<string, string> = {
  therapy: "bg-blue-100 text-blue-800 border-blue-200",
  doctor: "bg-green-100 text-green-800 border-green-200",
  school: "bg-purple-100 text-purple-800 border-purple-200",
  activity: "bg-amber-100 text-amber-800 border-amber-200",
  medication: "bg-red-100 text-red-800 border-red-200",
  other: "bg-gray-100 text-gray-800 border-gray-200",
};

const CalendarAlternative = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "agenda">("month");
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>(mockEvents);
  const [filters, setFilters] = useState<Record<string, boolean>>({
    therapy: true,
    doctor: true,
    school: true,
    activity: true,
    medication: true,
    other: true,
  });

  useEffect(() => {
    setFilteredEvents(
      mockEvents.filter((event) => filters[event.type || "other"])
    );
  }, [filters]);

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter((event) => {
      if (!event.date) return false;
      
      return isSameDay(new Date(event.date), day);
    });
  };

  const getEventsForWeek = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);

    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return isValid(eventDate) && isWithinInterval(eventDate, { start: weekStart, end: weekEnd });
    });
  };

  const formatTime = (time?: string) => {
    if (!time) return "";
    
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return time;
    
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startOfWeek(selectedDate), i);
    return {
      date: day,
      dayName: format(day, "EEE"),
      dayNumber: format(day, "d"),
      events: getEventsForDay(day),
    };
  });

  // Custom Day component for the calendar
  const CustomDay = (props: DayContentProps) => {
    const { date, activeModifiers } = props;
    const events = date ? getEventsForDay(date) : [];
    const isSelected = activeModifiers?.selected;
    
    return (
      <div
        className={cn(
          "relative h-12 w-12 p-0 font-normal",
          isSelected && "text-primary-foreground",
          events.length > 0 && "font-semibold"
        )}
      >
        <div className="flex h-full w-full items-center justify-center">
          {format(date, "d")}
        </div>
        {date && events.length > 0 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            {events.length > 3
              ? <Badge variant="secondary" className="h-1.5 w-4 p-0" />
              : events.slice(0, 3).map((event, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className={cn("h-1.5 w-1.5 p-0", eventTypeColors[event.type || "other"])}
                  />
                ))
            }
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedDate(new Date())}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const prevMonth = new Date(selectedDate);
                prevMonth.setMonth(prevMonth.getMonth() - 1);
                setSelectedDate(prevMonth);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <h2 className="text-lg font-medium">
              {format(selectedDate, view === "week" ? "'Week of' MMM d, yyyy" : "MMMM yyyy")}
            </h2>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const nextMonth = new Date(selectedDate);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                setSelectedDate(nextMonth);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h3 className="font-medium">Event Types</h3>
                {Object.keys(filters).map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`filter-${type}`}
                      checked={filters[type]}
                      onCheckedChange={(checked) =>
                        setFilters({ ...filters, [type]: !!checked })
                      }
                    />
                    <Label htmlFor={`filter-${type}`} className="capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Tabs defaultValue="month" value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <Tabs value={view} className="w-full">
        <TabsContent value="month" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                components={{
                  DayContent: CustomDay
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="week" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 bg-muted/30">
                {weekDays.map((day) => (
                  <div
                    key={day.dayName}
                    className={cn(
                      "p-2 text-center border-r last:border-r-0",
                      isSameDay(day.date, new Date()) && "bg-muted"
                    )}
                  >
                    <div className="font-medium">{day.dayName}</div>
                    <div className={cn(
                      "inline-flex h-7 w-7 items-center justify-center rounded-full",
                      isSameDay(day.date, new Date()) && "bg-primary text-primary-foreground"
                    )}>
                      {day.dayNumber}
                    </div>
                  </div>
                ))}
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-7">
                  {weekDays.map((day) => (
                    <div key={day.dayName} className="min-h-[400px] border-r last:border-r-0 p-1">
                      {day.events.map((event) => (
                        <Card
                          key={event.id}
                          className={cn(
                            "mb-2 cursor-pointer hover:shadow-md transition-shadow border-l-2",
                            eventTypeColors[event.type || "other"]
                          )}
                        >
                          <CardContent className="p-2">
                            <div className="font-medium truncate text-sm">{event.title}</div>
                            {event.startTime && (
                              <div className="text-xs flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(event.startTime)}
                                {event.endTime && ` - ${formatTime(event.endTime)}`}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agenda" className="mt-0">
          <Card>
            <CardContent className="py-4">
              <ScrollArea className="h-[500px] pr-4">
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className={cn(
                            "h-1.5",
                            eventTypeColors[event.type || "other"]
                          )} />
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base">{event.title}</CardTitle>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "capitalize",
                                  eventTypeColors[event.type || "other"]
                                )}
                              >
                                {event.type || "Other"}
                              </Badge>
                            </div>
                            <CardDescription>
                              {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-3 space-y-2">
                            {(event.startTime || event.endTime) && (
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {event.startTime && formatTime(event.startTime)}
                                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                                  {event.recurring && ` (${event.recurring})`}
                                </span>
                              </div>
                            )}
                            
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            
                            {event.participants && event.participants.length > 0 && (
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {Array.isArray(event.participants) 
                                    ? event.participants.join(", ") 
                                    : event.participants}
                                </span>
                              </div>
                            )}
                            
                            {event.description && (
                              <div className="text-sm text-muted-foreground mt-2">
                                {event.description}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No events match your filters</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarAlternative;
