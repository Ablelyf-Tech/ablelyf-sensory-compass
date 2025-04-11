
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

const reportSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  studentId: z.coerce.number().min(1, { message: 'Student is required' }),
  reportType: z.string().min(1, { message: 'Report type is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  period: z.string().min(1, { message: 'Period is required' }),
  summary: z.string().min(10, { message: 'Summary must be at least 10 characters' }),
  academicProgress: z.string().optional(),
  behavioralProgress: z.string().optional(),
  socialProgress: z.string().optional(),
  recommendations: z.string().optional(),
});

export type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportFormProps {
  students: { id: number; name: string }[];
  onSubmit: (data: ReportFormValues) => void;
  onCancel: () => void;
  studentId?: number;
}

const ReportForm: React.FC<ReportFormProps> = ({
  students,
  onSubmit,
  onCancel,
  studentId
}) => {
  const studentOptions = students.map(student => ({
    value: student.id.toString(),
    label: student.name
  }));

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      studentId: studentId || 0,
      reportType: '',
      date: new Date().toISOString(),
      period: '',
      summary: '',
      academicProgress: '',
      behavioralProgress: '',
      socialProgress: '',
      recommendations: '',
    }
  });

  const handleSubmit = (data: ReportFormValues) => {
    try {
      onSubmit(data);
      toast.success('Report created successfully');
      form.reset();
    } catch (error) {
      toast.error('There was an error creating the report');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField
          form={form}
          name="title"
          label="Report Title"
          placeholder="Enter report title"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            form={form}
            name="studentId"
            label="Student"
            options={studentOptions}
            placeholder="Select student"
          />
          
          <SelectField
            form={form}
            name="reportType"
            label="Report Type"
            options={[
              { value: 'iep_progress', label: 'IEP Progress Report' },
              { value: '504_progress', label: '504 Plan Progress Report' },
              { value: 'quarterly', label: 'Quarterly Assessment' },
              { value: 'annual', label: 'Annual Review' },
              { value: 'behavior', label: 'Behavior Report' }
            ]}
            placeholder="Select report type"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerField
            form={form}
            name="date"
            label="Report Date"
            placeholder="Select date"
          />
          
          <SelectField
            form={form}
            name="period"
            label="Reporting Period"
            options={[
              { value: 'q1', label: 'Quarter 1' },
              { value: 'q2', label: 'Quarter 2' },
              { value: 'q3', label: 'Quarter 3' },
              { value: 'q4', label: 'Quarter 4' },
              { value: 'semester1', label: 'Semester 1' },
              { value: 'semester2', label: 'Semester 2' },
              { value: 'annual', label: 'Annual' }
            ]}
            placeholder="Select period"
          />
        </div>
        
        <TextAreaField
          form={form}
          name="summary"
          label="Summary"
          placeholder="Provide an overall summary of student progress"
          rows={3}
        />
        
        <TextAreaField
          form={form}
          name="academicProgress"
          label="Academic Progress"
          placeholder="Describe academic progress during this period"
          rows={3}
        />
        
        <TextAreaField
          form={form}
          name="behavioralProgress"
          label="Behavioral Progress"
          placeholder="Describe behavioral progress during this period"
          rows={3}
        />
        
        <TextAreaField
          form={form}
          name="socialProgress"
          label="Social Progress"
          placeholder="Describe social skills progress during this period"
          rows={3}
        />
        
        <TextAreaField
          form={form}
          name="recommendations"
          label="Recommendations"
          placeholder="Provide recommendations for continued progress"
          rows={3}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Generate Report</Button>
        </div>
      </form>
    </Form>
  );
};

export default ReportForm;
