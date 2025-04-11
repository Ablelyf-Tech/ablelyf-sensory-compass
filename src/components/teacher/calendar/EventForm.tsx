
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  TextField, 
  TextAreaField, 
  SelectField,
  DatePickerField
} from '@/components/shared/FormFields';

const eventSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  type: z.string().min(1, { message: 'Event type is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  startTime: z.string().min(1, { message: 'Start time is required' }),
  endTime: z.string().optional(),
  participants: z.string().optional(),
  notes: z.string().optional(),
  location: z.string().optional(),
});

export type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormValues) => void;
  onCancel: () => void;
  defaultDate?: Date;
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  onCancel,
  defaultDate = new Date()
}) => {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      type: '',
      date: defaultDate.toISOString(),
      startTime: '',
      endTime: '',
      participants: '',
      notes: '',
      location: '',
    }
  });

  const handleSubmit = (data: EventFormValues) => {
    try {
      onSubmit(data);
      toast.success('Event added successfully');
      form.reset();
    } catch (error) {
      toast.error('There was an error adding the event');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField
          form={form}
          name="title"
          label="Event Title"
          placeholder="Enter event title"
        />
        
        <SelectField
          form={form}
          name="type"
          label="Event Type"
          options={[
            { value: 'meeting', label: 'Meeting' },
            { value: 'assessment', label: 'Assessment' },
            { value: 'conference', label: 'Conference' },
            { value: 'training', label: 'Training' },
            { value: 'other', label: 'Other' }
          ]}
          placeholder="Select event type"
        />
        
        <DatePickerField
          form={form}
          name="date"
          label="Date"
          placeholder="Select date"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            form={form}
            name="startTime"
            label="Start Time"
            type="time"
          />
          
          <TextField
            form={form}
            name="endTime"
            label="End Time"
            type="time"
          />
        </div>
        
        <TextField
          form={form}
          name="location"
          label="Location"
          placeholder="Enter location (optional)"
        />
        
        <TextField
          form={form}
          name="participants"
          label="Participants"
          placeholder="Enter participant names (comma separated)"
        />
        
        <TextAreaField
          form={form}
          name="notes"
          label="Notes"
          placeholder="Add any additional details or notes for this event"
          rows={3}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add to Calendar</Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
