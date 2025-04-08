
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Brain, ArrowRight, ClipboardCheck, FileText, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConditionArea, ConditionSeverity, TherapyTool } from "@/types/diagnostic";
import { diagnosticQuestions, therapyTools } from "@/data/diagnosticData";
import { patients } from "@/data/mockData";

const formSchema = z.object({
  patientId: z.string().min(1, { message: "Patient is required" }),
  primaryCondition: z.string().min(1, { message: "Primary condition is required" }),
  assessmentNotes: z.string().optional(),
  areas: z.record(z.object({
    score: z.number(),
    notes: z.string().optional(),
  })),
});

type FormValues = z.infer<typeof formSchema>;

export const DiagnosticAssessment = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<ConditionArea | 'summary'>('communication');
  const [recommendedTools, setRecommendedTools] = useState<TherapyTool[]>([]);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  
  const areas: ConditionArea[] = ['communication', 'sensory', 'social', 'behavioral', 'cognitive', 'motor'];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      primaryCondition: "",
      assessmentNotes: "",
      areas: areas.reduce((acc, area) => {
        acc[area] = { score: 0, notes: "" };
        return acc;
      }, {} as Record<string, { score: number, notes: string }>),
    },
  });

  const calculateSeverity = (score: number): ConditionSeverity => {
    if (score < 30) return 'mild';
    if (score < 70) return 'moderate';
    return 'severe';
  };

  const calculateProgress = () => {
    const completedSteps = areas.filter(area => form.getValues().areas[area].score > 0).length;
    return (completedSteps / areas.length) * 100;
  };

  const generateRecommendations = () => {
    const formData = form.getValues();
    const recommendations: TherapyTool[] = [];
    
    // Get severity for each area
    const areaSeverities = Object.entries(formData.areas).reduce((acc, [area, data]) => {
      acc[area as ConditionArea] = calculateSeverity(data.score);
      return acc;
    }, {} as Record<ConditionArea, ConditionSeverity>);
    
    // Find matching therapy tools
    const matchedTools = therapyTools.filter(tool => {
      const hasMatchingAreas = tool.targetAreas.some(area => 
        areaSeverities[area] && tool.suitableSeverities.includes(areaSeverities[area])
      );
      return hasMatchingAreas;
    });
    
    // Sort by relevance (number of matching areas)
    matchedTools.sort((a, b) => {
      const aMatches = a.targetAreas.filter(area => 
        areaSeverities[area] && a.suitableSeverities.includes(areaSeverities[area])
      ).length;
      
      const bMatches = b.targetAreas.filter(area => 
        areaSeverities[area] && b.suitableSeverities.includes(areaSeverities[area])
      ).length;
      
      return bMatches - aMatches;
    });
    
    setRecommendedTools(matchedTools.slice(0, 5));
  };

  const nextStep = () => {
    const currentIndex = areas.indexOf(currentStep as ConditionArea);
    if (currentIndex < areas.length - 1) {
      setCurrentStep(areas[currentIndex + 1]);
    } else {
      setCurrentStep('summary');
      generateRecommendations();
    }
  };

  const prevStep = () => {
    const currentIndex = areas.indexOf(currentStep as ConditionArea);
    if (currentIndex > 0) {
      setCurrentStep(areas[currentIndex - 1]);
    }
  };

  const onSubmit = (data: FormValues) => {
    // Here you would normally save the assessment to your backend
    console.log('Assessment data:', data);
    console.log('Recommended tools:', recommendedTools);
    
    toast({
      title: "Assessment Complete",
      description: "The diagnostic assessment has been saved successfully.",
    });
    
    setAssessmentComplete(true);
  };

  const resetAssessment = () => {
    form.reset();
    setCurrentStep('communication');
    setRecommendedTools([]);
    setAssessmentComplete(false);
  };

  const renderAreaQuestions = (area: ConditionArea) => {
    const areaQuestions = diagnosticQuestions.filter(q => q.area === area);
    
    return (
      <div className="space-y-6">
        {areaQuestions.map((question) => (
          <Card key={question.id} className="border border-border">
            <CardContent className="pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">{question.text}</h3>
              </div>
              <RadioGroup 
                className="grid grid-cols-1 md:grid-cols-5 gap-2"
                onValueChange={(value) => {
                  const currentAreaData = form.getValues().areas[area];
                  form.setValue(`areas.${area}`, {
                    ...currentAreaData,
                    score: currentAreaData.score + parseInt(value)
                  });
                }}
              >
                {question.options.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value.toString()} id={`${question.id}-${i}`} />
                    <Label htmlFor={`${question.id}-${i}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
        
        <FormField
          control={form.control}
          name={`areas.${area}.notes`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clinical Observations</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any relevant observations or notes for this area"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-ablelyf-blue-900">Diagnostic Assessment</h2>
        {!assessmentComplete && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Progress: {Math.round(calculateProgress())}%
            </span>
            <Progress value={calculateProgress()} className="w-[100px] h-2" />
          </div>
        )}
      </div>

      {assessmentComplete ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-green-500" />
              Assessment Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
              The diagnostic assessment has been completed and saved successfully.
            </div>
            
            <Button onClick={resetAssessment} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Start New Assessment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 'summary' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="patientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select patient" />
                              </SelectTrigger>
                              <SelectContent>
                                {patients.map((patient) => (
                                  <SelectItem key={patient.id} value={patient.id}>
                                    {patient.name} ({patient.age})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="primaryCondition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Condition</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="autism">Autism Spectrum Disorder</SelectItem>
                                <SelectItem value="adhd">ADHD</SelectItem>
                                <SelectItem value="sensory">Sensory Processing Disorder</SelectItem>
                                <SelectItem value="developmental">Developmental Delay</SelectItem>
                                <SelectItem value="learning">Learning Disability</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Area Assessment Results</h3>
                    <div className="space-y-3">
                      {areas.map(area => {
                        const areaScore = form.getValues().areas[area].score;
                        const severity = calculateSeverity(areaScore);
                        const severityColor = 
                          severity === 'mild' ? 'bg-green-500' :
                          severity === 'moderate' ? 'bg-amber-500' :
                          'bg-red-500';
                          
                        return (
                          <div key={area} className="p-3 bg-ablelyf-neutral-50 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${severityColor}`}></div>
                                <span className="font-medium capitalize">{area}</span>
                              </div>
                              <span className="text-sm">{areaScore} points - {severity}</span>
                            </div>
                            <Progress value={(areaScore / 100) * 100} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="assessmentNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overall Assessment Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add your overall assessment notes and recommendations"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <h3 className="font-medium mb-3">Recommended Therapy Tools</h3>
                    <div className="space-y-3">
                      {recommendedTools.length > 0 ? (
                        recommendedTools.map(tool => (
                          <Card key={tool.id} className="border border-border">
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-1">{tool.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {tool.targetAreas.map(area => (
                                  <span 
                                    key={area} 
                                    className="text-xs bg-ablelyf-blue-100 text-ablelyf-blue-800 px-2 py-1 rounded-full capitalize"
                                  >
                                    {area}
                                  </span>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p className="text-muted-foreground">
                          Complete the assessment to get therapy tool recommendations
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      onClick={prevStep} 
                      variant="outline"
                    >
                      Back
                    </Button>
                    <Button type="submit">
                      Complete Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Tabs value={currentStep} className="w-full">
                <TabsList className="grid grid-cols-6 mb-6">
                  {areas.map(area => (
                    <TabsTrigger 
                      key={area} 
                      value={area}
                      onClick={() => setCurrentStep(area)}
                      className="capitalize"
                    >
                      {area}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {areas.map(area => (
                  <TabsContent key={area} value={area} className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="capitalize flex items-center gap-2">
                          <Brain className="h-5 w-5 text-ablelyf-blue-600" />
                          {area} Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderAreaQuestions(area)}
                        
                        <div className="flex justify-between mt-6">
                          {area !== 'communication' && (
                            <Button 
                              type="button" 
                              onClick={prevStep} 
                              variant="outline"
                            >
                              Previous
                            </Button>
                          )}
                          <Button 
                            type="button" 
                            onClick={nextStep} 
                            className="ml-auto"
                          >
                            {area === 'motor' ? 'View Summary' : 'Next'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </form>
        </Form>
      )}
    </div>
  );
};
