
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const diagnosticFormSchema = z.object({
  patientId: z.string().min(1, { message: "Please select a patient" }),
  assessmentType: z.string().min(1, { message: "Please select an assessment type" }),
  dateOfAssessment: z.string().min(1, { message: "Please enter assessment date" }),
  
  // Patient Information
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  referralSource: z.string().optional(),
  
  // Developmental History
  pregnancyComplications: z.boolean().optional(),
  developmentalDelays: z.boolean().optional(),
  developmentalNotes: z.string().optional(),
  
  // Medical History
  medicalConditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  allergies: z.string().optional(),
  
  // Behavioral Observations
  attentionScore: z.string().min(1, { message: "Please rate attention" }).optional(),
  socialInteractionScore: z.string().min(1, { message: "Please rate social interaction" }).optional(),
  motorSkillsScore: z.string().min(1, { message: "Please rate motor skills" }).optional(),
  behavioralNotes: z.string().optional(),
  
  // Assessment Results
  communicationSkills: z.string().optional(),
  cognitiveAbilities: z.string().optional(),
  sensoryProcessing: z.string().optional(),
  
  // Recommendations
  diagnosisImpression: z.string().optional(),
  recommendedServices: z.array(z.string()).optional(),
  treatmentGoals: z.string().optional(),
  
  // Additional Notes
  additionalNotes: z.string().optional(),
});

type DiagnosticFormValues = z.infer<typeof diagnosticFormSchema>;

export const DiagnosticAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<Partial<DiagnosticFormValues>>({});
  
  const form = useForm<DiagnosticFormValues>({
    resolver: zodResolver(diagnosticFormSchema),
    defaultValues: {
      patientId: "",
      assessmentType: "",
      dateOfAssessment: new Date().toISOString().split('T')[0],
      medicalConditions: [],
      medications: [],
      recommendedServices: [],
    },
  });

  const steps = [
    { id: 'basic', title: 'Basic Information' },
    { id: 'history', title: 'Patient History' },
    { id: 'behavioral', title: 'Behavioral Assessment' },
    { id: 'results', title: 'Assessment Results' },
    { id: 'recommendations', title: 'Recommendations' },
  ];

  const handleNext = async () => {
    const fields = [
      ['patientId', 'assessmentType', 'dateOfAssessment'],
      ['dateOfBirth', 'gender', 'referralSource', 'pregnancyComplications', 'developmentalDelays', 'developmentalNotes'],
      ['medicalConditions', 'medications', 'allergies', 'attentionScore', 'socialInteractionScore', 'motorSkillsScore', 'behavioralNotes'],
      ['communicationSkills', 'cognitiveAbilities', 'sensoryProcessing'],
      ['diagnosisImpression', 'recommendedServices', 'treatmentGoals', 'additionalNotes'],
    ][currentStep];

    const isValid = await form.trigger(fields as any);
    
    if (isValid) {
      setAssessmentData(prev => ({ ...prev, ...form.getValues() }));
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Submit the form
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", form.getValues());
    toast({
      title: "Assessment Created",
      description: "The diagnostic assessment has been saved successfully.",
    });
    form.reset();
    setCurrentStep(0);
  };

  return (
    <div className="space-y-6">
      <Tabs value={steps[currentStep].id} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          {steps.map((step, index) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              onClick={() => setCurrentStep(index)}
              disabled={index > currentStep}
              className={index <= currentStep ? "opacity-100" : "opacity-50"}
            >
              {step.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <Form {...form}>
          <form className="space-y-6 mt-6">
            <TabsContent value="basic">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="patientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select patient" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="patient1">John Doe</SelectItem>
                              <SelectItem value="patient2">Jane Smith</SelectItem>
                              <SelectItem value="patient3">Michael Johnson</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="assessmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assessment Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="initial">Initial Assessment</SelectItem>
                              <SelectItem value="followUp">Follow-up Assessment</SelectItem>
                              <SelectItem value="comprehensive">Comprehensive Evaluation</SelectItem>
                              <SelectItem value="specific">Specific Domain Assessment</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dateOfAssessment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Assessment</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="nonBinary">Non-binary</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="preferNotToSay">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="referralSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referral Source</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Pediatrician, School" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="col-span-2 border rounded-md p-4">
                      <h3 className="font-medium mb-2">Developmental History</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="pregnancyComplications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Pregnancy/Birth Complications</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="developmentalDelays"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Developmental Delays</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="developmentalNotes"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Developmental Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter any relevant developmental milestones or concerns" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="behavioral">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Medical History</h3>
                      
                      <FormField
                        control={form.control}
                        name="medicalConditions"
                        render={() => (
                          <FormItem>
                            <FormLabel>Medical Conditions</FormLabel>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {["ADHD", "Autism", "Anxiety", "Depression", "Seizures", "Other"].map((condition) => (
                                <FormField
                                  key={condition}
                                  control={form.control}
                                  name="medicalConditions"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={condition}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(condition)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), condition])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== condition
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {condition}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Allergies</FormLabel>
                            <FormControl>
                              <Input placeholder="List any allergies" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-4">Behavioral Observations</h3>
                      
                      <FormField
                        control={form.control}
                        name="attentionScore"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Attention/Focus</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-1"
                              >
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <FormItem key={value} className="flex items-center space-x-1">
                                    <FormControl>
                                      <RadioGroupItem value={value.toString()} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{value}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormDescription>
                              1 = Significant difficulty, 5 = Age-appropriate
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="socialInteractionScore"
                        render={({ field }) => (
                          <FormItem className="space-y-3 mt-4">
                            <FormLabel>Social Interaction</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-1"
                              >
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <FormItem key={value} className="flex items-center space-x-1">
                                    <FormControl>
                                      <RadioGroupItem value={value.toString()} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{value}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormDescription>
                              1 = Significant difficulty, 5 = Age-appropriate
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="motorSkillsScore"
                        render={({ field }) => (
                          <FormItem className="space-y-3 mt-4">
                            <FormLabel>Motor Skills</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-1"
                              >
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <FormItem key={value} className="flex items-center space-x-1">
                                    <FormControl>
                                      <RadioGroupItem value={value.toString()} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{value}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormDescription>
                              1 = Significant difficulty, 5 = Age-appropriate
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="behavioralNotes"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Behavioral Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter observations about behavior during assessment" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="results">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="communicationSkills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Communication Skills Assessment</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe receptive and expressive language abilities" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cognitiveAbilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cognitive Abilities Assessment</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe problem-solving, reasoning, and learning abilities" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sensoryProcessing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sensory Processing Assessment</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe sensory preferences, sensitivities, and processing patterns" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="diagnosisImpression"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diagnostic Impression</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Clinical impression and potential diagnoses" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="recommendedServices"
                      render={() => (
                        <FormItem>
                          <FormLabel>Recommended Services</FormLabel>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Speech Therapy",
                              "Occupational Therapy",
                              "Physical Therapy",
                              "Behavioral Therapy",
                              "Psychological Support",
                              "Educational Support",
                              "Parent Training",
                              "Social Skills Group"
                            ].map((service) => (
                              <FormField
                                key={service}
                                control={form.control}
                                name="recommendedServices"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={service}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(service)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), service])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== service
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {service}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="treatmentGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Treatment Goals</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Outline proposed treatment goals and objectives" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any additional information or recommendations" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              
              <Button 
                type="button"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};
