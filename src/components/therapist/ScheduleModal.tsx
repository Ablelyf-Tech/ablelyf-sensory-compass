
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ScheduleModalProps {
  patientName?: string;
  patientId?: string;
  buttonText?: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  customButtonClass?: string;
  onScheduleSuccess?: (data: any) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  patientName = 'Patient',
  patientId,
  buttonText = 'Schedule Session',
  buttonVariant = 'default',
  buttonSize = 'sm',
  customButtonClass = '',
  onScheduleSuccess
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();
  const [timeSlot, setTimeSlot] = React.useState('');
  const [sessionType, setSessionType] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !sessionType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const scheduleData = {
      patientId,
      patientName,
      date: date,
      timeSlot,
      sessionType,
      notes,
      createdAt: new Date(),
    };

    // In a real app, you would save this to the database
    console.log('Schedule data:', scheduleData);
    
    toast({
      title: "Session Scheduled",
      description: `Session with ${patientName} scheduled for ${format(date, 'PPP')} at ${timeSlot}`,
    });

    if (onScheduleSuccess) {
      onScheduleSuccess(scheduleData);
    }

    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setDate(undefined);
    setTimeSlot('');
    setSessionType('');
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant} 
          size={buttonSize} 
          className={customButtonClass}
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule a Session with {patientName}</DialogTitle>
          <DialogDescription>
            Choose a date, time, and session type to schedule a therapy session.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time Slot</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select a time slot">
                  <div className="flex items-center">
                    {timeSlot ? (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        {timeSlot}
                      </>
                    ) : (
                      "Select a time slot"
                    )}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                <SelectItem value="04:00 PM">04:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sessionType">Session Type</Label>
            <Select value={sessionType} onValueChange={setSessionType}>
              <SelectTrigger id="sessionType">
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="initial">Initial Assessment</SelectItem>
                <SelectItem value="followup">Follow-up Session</SelectItem>
                <SelectItem value="therapy">Therapy Session</SelectItem>
                <SelectItem value="evaluation">Progress Evaluation</SelectItem>
                <SelectItem value="consultation">Parent Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Session Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes or preparation details for the session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
