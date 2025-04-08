
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { TherapyToolTypes } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const toolCategories: { value: TherapyToolTypes; label: string }[] = [
  { value: 'assessment', label: 'Assessment Tools' },
  { value: 'visual', label: 'Visual Supports' },
  { value: 'motor', label: 'Motor Skills' },
  { value: 'communication', label: 'Communication' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'social', label: 'Social Skills' },
  { value: 'sensory', label: 'Sensory Processing' },
  { value: 'cognitive', label: 'Cognitive Skills' },
];

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.enum(['assessment', 'visual', 'motor', 'communication', 'behavioral', 'social', 'sensory', 'cognitive']),
  ageRange: z.string().min(1, { message: "Age range is required." }),
  file: z.instanceof(File).optional(),
  tags: z.string()
});

type FormValues = z.infer<typeof formSchema>;

interface ToolCreationFormProps {
  onClose: () => void;
}

export const ToolCreationForm: React.FC<ToolCreationFormProps> = ({ onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [tab, setTab] = useState<'upload' | 'generate'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'assessment',
      ageRange: '',
      tags: ''
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      form.setValue('file', file);
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt) {
      toast.error("Please provide a prompt for the AI");
      return;
    }

    setIsGenerating(true);
    
    // This would connect to an AI service in a real implementation
    try {
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate AI response
      const aiGeneratedValues = {
        title: `AI Generated: ${aiPrompt.slice(0, 20)}...`,
        description: `This is an AI-generated therapy tool based on the prompt: "${aiPrompt}". It includes customized activities and resources tailored for therapeutic intervention.`,
        category: form.getValues('category') as TherapyToolTypes,
        ageRange: '3-12',
        tags: 'ai-generated, therapy, custom'
      };
      
      // Update form with AI values
      form.setValue('title', aiGeneratedValues.title);
      form.setValue('description', aiGeneratedValues.description);
      form.setValue('ageRange', aiGeneratedValues.ageRange);
      form.setValue('tags', aiGeneratedValues.tags);
      
      toast.success("Tool generated successfully! Review and submit the form.");
    } catch (error) {
      console.error('Error generating with AI:', error);
      toast.error("Failed to generate tool with AI. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      // In a real app, this would send the data to an API
      console.log('Submitting form with values:', values);
      
      // Format tags
      const formattedTags = values.tags.split(',').map(tag => tag.trim());
      
      // Construct the tool object
      const newTool = {
        id: `tool-${Date.now()}`,
        title: values.title,
        description: values.description,
        category: values.category,
        ageRange: values.ageRange,
        tags: formattedTags,
        fileType: selectedFile ? selectedFile.type.split('/')[1].toUpperCase() : 'PDF',
        fileSize: selectedFile ? `${Math.round(selectedFile.size / 1024)} KB` : '500 KB',
        createdBy: 'current-user',
        createdAt: new Date().toISOString(),
        favorited: false,
        content: 'This is the content of the newly created therapy tool.'
      };
      
      console.log('New tool created:', newTool);
      
      // Success notification
      toast.success("Therapy tool created successfully!");
      onClose();
    } catch (error) {
      console.error('Error creating tool:', error);
      toast.error("Failed to create therapy tool. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="upload" value={tab} onValueChange={(value) => setTab(value as 'upload' | 'generate')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Tool
          </TabsTrigger>
          <TabsTrigger value="generate">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate with AI
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="rounded-md border border-dashed p-6 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm font-medium">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, Word, PowerPoint, Excel, or Images up to 10MB
                </p>
              </div>
            </label>
            {selectedFile && (
              <div className="mt-2 text-sm text-green-600">
                File selected: {selectedFile.name}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="generate" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-prompt">Describe the therapy tool you want to create</Label>
            <Textarea
              id="ai-prompt"
              placeholder="E.g., Create a social skills worksheet for children with autism ages 5-8 that focuses on turn-taking in conversations with visual cues..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={4}
            />
            <Button 
              onClick={generateWithAI} 
              disabled={isGenerating || !aiPrompt} 
              className="mt-2"
            >
              {isGenerating ? 'Generating...' : 'Generate Tool'}
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tool title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the purpose and content of this tool" 
                    {...field} 
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {toolCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ageRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Range</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., 3-8, 9-12, 13-18" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tags separated by commas" {...field} />
                </FormControl>
                <FormDescription>
                  E.g., social skills, visual supports, fine motor
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {tab === 'upload' ? 'Upload Tool' : 'Create Tool'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

// Named export for Label to avoid importing from another file
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />
);
