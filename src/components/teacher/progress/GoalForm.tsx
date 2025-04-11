
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
  SelectField
} from '@/components/shared/FormFields';

const goalSchema = z.object({
  name: z.string().min(2, { message: 'Goal name must be at least 2 characters' }),
  target: z.string().min(5, { message: 'Target description must be at least 5 characters' }),
  progress: z.coerce.number().min(0).max(100),
  category: z.string().min(1, { message: 'Category is required' }),
  notes: z.string().optional(),
});

export type GoalFormValues = z.infer<typeof goalSchema>;

interface GoalFormProps {
  goal?: {
    id: number;
    name: string;
    progress: number;
    target: string;
    category?: string;
    notes?: string;
  };
  studentId: number;
  onSubmit: (data: GoalFormValues) => void;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({
  goal,
  studentId,
  onSubmit,
  onCancel
}) => {
  const defaultValues = goal 
    ? {
        name: goal.name,
        target: goal.target,
        progress: goal.progress,
        category: goal.category || '',
        notes: goal.notes || ''
      }
    : {
        name: '',
        target: '',
        progress: 0,
        category: '',
        notes: ''
      };

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues
  });

  const handleSubmit = (data: GoalFormValues) => {
    try {
      onSubmit(data);
      toast.success(`Goal ${goal ? 'updated' : 'created'} successfully`);
      if (!goal) form.reset();
    } catch (error) {
      toast.error('There was an error saving the goal data');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField
          form={form}
          name="name"
          label="Goal Name"
          placeholder="Enter goal name"
        />
        
        <TextAreaField
          form={form}
          name="target"
          label="Target"
          placeholder="Describe what the student should be able to accomplish"
          rows={2}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            form={form}
            name="progress"
            label="Current Progress (%)"
            type="number"
            placeholder="0"
          />
          
          <SelectField
            form={form}
            name="category"
            label="Category"
            options={[
              { value: 'academic', label: 'Academic' },
              { value: 'behavioral', label: 'Behavioral' },
              { value: 'social', label: 'Social' },
              { value: 'communication', label: 'Communication' },
              { value: 'motor', label: 'Motor Skills' },
              { value: 'self_help', label: 'Self-Help' },
            ]}
            placeholder="Select category"
          />
        </div>
        
        <TextAreaField
          form={form}
          name="notes"
          label="Notes"
          placeholder="Add any additional notes about this goal"
          rows={3}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {goal ? 'Update Goal' : 'Add Goal'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GoalForm;
