
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MATERIAL_CATEGORIES } from './MaterialsUtils';
import { 
  TextField, 
  TextAreaField, 
  SelectField
} from '@/components/shared/FormFields';

const materialSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z.string(),
  url: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  type: z.string().min(1, { message: 'Type is required' })
});

export type MaterialFormValues = z.infer<typeof materialSchema>;

interface MaterialFormProps {
  onSubmit: (data: MaterialFormValues) => void;
  onCancel: () => void;
}

const MaterialForm: React.FC<MaterialFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      tags: '',
      url: '',
      type: ''
    }
  });

  const handleSubmit = (data: MaterialFormValues) => {
    try {
      onSubmit(data);
      toast.success('Material added successfully');
      form.reset();
    } catch (error) {
      toast.error('There was an error adding the material');
      console.error(error);
    }
  };

  // Get category options from the existing MATERIAL_CATEGORIES
  const categoryOptions = MATERIAL_CATEGORIES.map(cat => ({
    value: cat.category,
    label: cat.category
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField
          form={form}
          name="title"
          label="Title"
          placeholder="Enter material title"
        />
        
        <TextAreaField
          form={form}
          name="description"
          label="Description"
          placeholder="Enter a description of the material"
          rows={3}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            form={form}
            name="category"
            label="Category"
            options={categoryOptions}
            placeholder="Select category"
          />
          
          <SelectField
            form={form}
            name="type"
            label="Material Type"
            options={[
              { value: 'worksheet', label: 'Worksheet' },
              { value: 'lesson_plan', label: 'Lesson Plan' },
              { value: 'visual_support', label: 'Visual Support' },
              { value: 'assessment', label: 'Assessment' },
              { value: 'activity', label: 'Activity' },
              { value: 'reference', label: 'Reference Material' }
            ]}
            placeholder="Select type"
          />
        </div>
        
        <TextField
          form={form}
          name="tags"
          label="Tags"
          placeholder="Enter tags (comma separated)"
          description="Add keywords to help with searching"
        />
        
        <TextField
          form={form}
          name="url"
          label="URL"
          placeholder="https://example.com/resource"
          description="Link to external resource (optional)"
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Material</Button>
        </div>
      </form>
    </Form>
  );
};

export default MaterialForm;
