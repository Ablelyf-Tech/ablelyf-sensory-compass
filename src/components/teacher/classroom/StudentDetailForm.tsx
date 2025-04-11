
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Student } from './types';
import { 
  TextField, 
  TextAreaField, 
  SelectField,
  DatePickerField
} from '@/components/shared/FormFields';

const studentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  age: z.coerce.number().min(5).max(18),
  grade: z.string().min(1, { message: 'Grade is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  accommodations: z.string(),
  lastAssessment: z.string().optional(),
  notes: z.string().optional()
});

export type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentDetailFormProps {
  student?: Student;
  onSubmit: (data: StudentFormValues) => void;
  onCancel: () => void;
}

const StudentDetailForm: React.FC<StudentDetailFormProps> = ({
  student,
  onSubmit,
  onCancel
}) => {
  // Convert accommodations array to string for the form
  const defaultValues = student 
    ? {
        ...student,
        accommodations: student.accommodations.join(', ')
      }
    : {
        name: '',
        age: undefined,
        grade: '',
        status: '',
        accommodations: '',
        lastAssessment: '',
        notes: ''
      };

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues
  });

  const handleSubmit = (data: StudentFormValues) => {
    try {
      onSubmit(data);
      toast.success(`Student ${student ? 'updated' : 'created'} successfully`);
    } catch (error) {
      toast.error('There was an error saving the student data');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField
          form={form}
          name="name"
          label="Student Name"
          placeholder="Enter student's full name"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            form={form}
            name="age"
            label="Age"
            type="number"
            placeholder="Age"
          />
          
          <SelectField
            form={form}
            name="grade"
            label="Grade"
            options={[
              { value: 'Kindergarten', label: 'Kindergarten' },
              { value: '1st Grade', label: '1st Grade' },
              { value: '2nd Grade', label: '2nd Grade' },
              { value: '3rd Grade', label: '3rd Grade' },
              { value: '4th Grade', label: '4th Grade' },
              { value: '5th Grade', label: '5th Grade' },
              { value: '6th Grade', label: '6th Grade' }
            ]}
            placeholder="Select grade"
          />
        </div>
        
        <SelectField
          form={form}
          name="status"
          label="Status"
          options={[
            { value: 'Active IEP', label: 'Active IEP' },
            { value: 'Active 504', label: 'Active 504' },
            { value: 'Under Evaluation', label: 'Under Evaluation' },
            { value: 'No Plan', label: 'No Plan' }
          ]}
          placeholder="Select status"
        />
        
        <TextAreaField
          form={form}
          name="accommodations"
          label="Accommodations"
          placeholder="Enter accommodations (comma separated)"
          description="List all accommodations needed for this student"
        />
        
        <DatePickerField
          form={form}
          name="lastAssessment"
          label="Last Assessment Date"
          placeholder="Select date"
        />
        
        <TextAreaField
          form={form}
          name="notes"
          label="Additional Notes"
          placeholder="Enter any additional notes about the student"
          rows={4}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {student ? 'Update Student' : 'Add Student'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StudentDetailForm;
