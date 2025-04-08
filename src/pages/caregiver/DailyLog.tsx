
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, PopoverContent, PopoverTrigger 
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  CalendarDays, Clock, Activity, Brain, 
  FileText, Plus, Calendar as CalendarIcon,
  AlertTriangle, MessageSquare, Check, X, RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Define types for daily logs
interface LogEntry {
  id: string;
  date: Date;
  type: 'activity' | 'medication' | 'behavior' | 'therapy';
  title: string;
  notes: string;
  status?: 'completed' | 'missed' | 'partial';
  mood?: 'positive' | 'neutral' | 'negative';
  duration?: string;
}

// Mock data for logs
const mockLogs: LogEntry[] = [
  {
    id: '1',
    date: new Date('2025-04-07T09:30:00'),
    type: 'activity',
    title: 'Morning Routine',
    notes: 'Completed breakfast and hygiene routine independently with visual schedule.',
    status: 'completed',
    mood: 'positive',
    duration: '45 minutes'
  },
  {
    id: '2',
    date: new Date('2025-04-07T12:00:00'),
    type: 'medication',
    title: 'Lunchtime Medication',
    notes: 'Took all medication as prescribed.',
    status: 'completed'
  },
  {
    id: '3',
    date: new Date('2025-04-07T14:00:00'),
    type: 'behavior',
    title: 'Sensory Overload Episode',
    notes: 'Became overwhelmed by loud noises during outdoor play. Used noise-cancelling headphones to help calm down.',
    mood: 'negative',
    duration: '20 minutes'
  },
  {
    id: '4',
    date: new Date('2025-04-07T16:30:00'),
    type: 'therapy',
    title: 'Home Therapy Exercises',
    notes: 'Completed fine motor skill exercises as recommended by therapist.',
    status: 'partial',
    duration: '25 minutes'
  },
  {
    id: '5',
    date: new Date('2025-04-06T10:00:00'),
    type: 'therapy',
    title: 'Speech Practice',
    notes: 'Practiced conversation skills using picture cards.',
    status: 'completed',
    mood: 'positive',
    duration: '30 minutes'
  },
  {
    id: '6',
    date: new Date('2025-04-06T19:00:00'),
    type: 'behavior',
    title: 'Bedtime Routine',
    notes: 'Followed visual schedule for bedtime routine with minimal prompting.',
    mood: 'positive',
    duration: '40 minutes'
  }
];

// Helper functions for displaying log entries
const getLogTypeIcon = (type: LogEntry['type']) => {
  switch (type) {
    case 'activity':
      return <Activity className="h-5 w-5" />;
    case 'medication':
      return <RefreshCw className="h-5 w-5" />;
    case 'behavior':
      return <Brain className="h-5 w-5" />;
    case 'therapy':
      return <FileText className="h-5 w-5" />;
    default:
      return <MessageSquare className="h-5 w-5" />;
  }
};

const getStatusBadge = (status?: LogEntry['status']) => {
  if (!status) return null;
  
  switch (status) {
    case 'completed':
      return <Badge className="bg-ablelyf-green-500 hover:bg-ablelyf-green-600">Completed</Badge>;
    case 'missed':
      return <Badge variant="destructive">Missed</Badge>;
    case 'partial':
      return <Badge className="bg-amber-500 hover:bg-amber-600">Partial</Badge>;
    default:
      return null;
  }
};

const getMoodIcon = (mood?: LogEntry['mood']) => {
  if (!mood) return null;
  
  switch (mood) {
    case 'positive':
      return <Check className="h-4 w-4 text-ablelyf-green-500" />;
    case 'neutral':
      return <div className="h-1 w-3 bg-gray-400 rounded-full" />;
    case 'negative':
      return <X className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const DailyLog: React.FC = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [logEntries, setLogEntries] = useState<LogEntry[]>(mockLogs);
  const [newEntryOpen, setNewEntryOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [newEntry, setNewEntry] = useState<Partial<LogEntry>>({
    date: new Date(),
    type: 'activity',
    title: '',
    notes: ''
  });
  
  // Filter logs by selected date and tab
  const filteredLogs = logEntries.filter(log => {
    const isSameDay = log.date.toDateString() === selectedDate.toDateString();
    
    if (selectedTab === 'all') {
      return isSameDay;
    }
    
    return isSameDay && log.type === selectedTab;
  });
  
  // Group logs by day (for the week view)
  const groupedByDay = logEntries.reduce<Record<string, LogEntry[]>>((groups, log) => {
    const dateKey = log.date.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(log);
    return groups;
  }, {});
  
  // Handle creating a new log entry
  const handleCreateLog = () => {
    if (!newEntry.title || !newEntry.notes) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      date: newEntry.date || new Date(),
      type: newEntry.type || 'activity',
      title: newEntry.title || '',
      notes: newEntry.notes || '',
      status: newEntry.status,
      mood: newEntry.mood,
      duration: newEntry.duration
    };
    
    setLogEntries(prev => [newLog, ...prev]);
    setNewEntryOpen(false);
    setNewEntry({
      date: new Date(),
      type: 'activity',
      title: '',
      notes: ''
    });
    
    toast({
      title: "Log entry created",
      description: "Your new log entry has been added.",
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Daily Log</h1>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{format(selectedDate, 'MMM d, yyyy')}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            <Dialog open={newEntryOpen} onOpenChange={setNewEntryOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600">
                  <Plus className="h-4 w-4" />
                  <span>New Entry</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Log Entry</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="entry-date" className="text-right">
                      Date
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newEntry.date ? (
                              format(newEntry.date, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newEntry.date}
                            onSelect={(date) => setNewEntry({ ...newEntry, date })}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="entry-time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="entry-time"
                      type="time"
                      className="col-span-3"
                      onChange={(e) => {
                        const date = new Date(newEntry.date || new Date());
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        date.setHours(hours, minutes);
                        setNewEntry({ ...newEntry, date });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="entry-type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={newEntry.type}
                      onValueChange={(value) => setNewEntry({ ...newEntry, type: value as LogEntry['type'] })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select entry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activity">Activity</SelectItem>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="behavior">Behavior</SelectItem>
                        <SelectItem value="therapy">Therapy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="entry-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="entry-title"
                      placeholder="Enter a title"
                      className="col-span-3"
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    />
                  </div>
                  {(newEntry.type === 'activity' || newEntry.type === 'therapy') && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="entry-status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={newEntry.status}
                        onValueChange={(value) => setNewEntry({ ...newEntry, status: value as LogEntry['status'] })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="partial">Partial</SelectItem>
                          <SelectItem value="missed">Missed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {(newEntry.type === 'behavior') && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="entry-mood" className="text-right">
                        Mood
                      </Label>
                      <Select
                        value={newEntry.mood}
                        onValueChange={(value) => setNewEntry({ ...newEntry, mood: value as LogEntry['mood'] })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select mood" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="positive">Positive</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="negative">Negative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="entry-duration" className="text-right">
                      Duration
                    </Label>
                    <Input
                      id="entry-duration"
                      placeholder="e.g. 30 minutes"
                      className="col-span-3"
                      value={newEntry.duration || ''}
                      onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="entry-notes" className="text-right pt-2">
                      Notes
                    </Label>
                    <Textarea
                      id="entry-notes"
                      placeholder="Enter details about this entry"
                      className="col-span-3"
                      rows={4}
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewEntryOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateLog}>
                    Create Entry
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="activity">Activities</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="therapy">Therapy</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="mt-6">
            {filteredLogs.length > 0 ? (
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <Card key={log.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-shrink-0 p-3 rounded-full bg-ablelyf-blue-50">
                          {getLogTypeIcon(log.type)}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="font-medium text-lg">{log.title}</h3>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(log.status)}
                              {log.mood && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <span>Mood:</span>
                                  {getMoodIcon(log.mood)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{format(log.date, 'h:mm a')}</span>
                            {log.duration && (
                              <>
                                <span>•</span>
                                <span>{log.duration}</span>
                              </>
                            )}
                          </div>
                          
                          <p className="text-sm">{log.notes}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="p-3 rounded-full bg-ablelyf-neutral-100 mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg">No entries for this day</h3>
                <p className="text-muted-foreground mt-1">
                  There are no log entries for {format(selectedDate, 'MMMM d, yyyy')}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setNewEntryOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Entry
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedByDay)
                .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                .slice(0, 5)
                .map(([dateString, entries]) => (
                  <div key={dateString} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-ablelyf-blue-500" />
                      <h3 className="font-medium">
                        {format(new Date(dateString), 'EEEE, MMMM d')}
                      </h3>
                    </div>
                    <div className="ml-6 space-y-1">
                      {entries.map((entry) => (
                        <div 
                          key={entry.id} 
                          className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-ablelyf-blue-500" />
                            <span className="text-sm font-medium">{entry.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {format(entry.date, 'h:mm a')}
                            </span>
                            {getStatusBadge(entry.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DailyLog;
