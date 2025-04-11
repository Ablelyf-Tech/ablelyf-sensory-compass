
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

const toolSchema = z.object({
  name: z.string().min(2, { message: 'Tool name must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  usage: z.string().min(5, { message: 'Usage instructions must be at least 5 characters' }),
  url: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  tags: z.string()
});

export type ToolFormValues = z.infer<typeof toolSchema>;

interface ToolFormProps {
  onSubmit: (data: ToolFormValues) => void;
  onCancel: () => void;
}

const ToolForm: React.FC<ToolFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const form = useForm<ToolFormValues>({
    resolver: zodResolver(toolSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      usage: '',
      url: '',
      tags: ''
    }
  });

  const handleSubmit = (data: ToolFormValues) => {
    try {
      onSubmit(data);
      toast.success('Tool added successfully');
      form.reset();
    } catch (error) {
      toast.error('There was an error adding the tool');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField
          form={form}
          name="name"
          label="Tool Name"
          placeholder="Enter tool name"
        />
        
        <TextAreaField
          form={form}
          name="description"
          label="Description"
          placeholder="Describe what this tool does"
          rows={3}
        />
        
        <SelectField
          form={form}
          name="category"
          label="Category"
          options={[
            { value: 'assessment', label: 'Assessment' },
            { value: 'behavior_management', label: 'Behavior Management' },
            { value: 'visual_support', label: 'Visual Support' },
            { value: 'sensory', label: 'Sensory' },
            { value: 'communication', label: 'Communication' },
            { value: 'social_skills', label: 'Social Skills' },
            { value: 'academic', label: 'Academic' }
          ]}
          placeholder="Select category"
        />
        
        <TextAreaField
          form={form}
          name="usage"
          label="Usage Instructions"
          placeholder="Provide instructions on how to use this tool"
          rows={4}
        />
        
        <TextField
          form={form}
          name="url"
          label="URL"
          placeholder="https://example.com/resource"
          description="Link to external resource (optional)"
        />
        
        <TextField
          form={form}
          name="tags"
          label="Tags"
          placeholder="Enter tags (comma separated)"
          description="Add keywords to help with searching"
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Tool</Button>
        </div>
      </form>
    </Form>
  );
};

export default ToolForm;
