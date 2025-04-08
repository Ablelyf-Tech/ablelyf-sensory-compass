
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TherapyPlanTemplate, ConditionType, ConditionArea, TherapyType } from '@/types/diagnostic';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, FileText, Plus, Users } from 'lucide-react';

const conditionNames: Record<ConditionType, string> = {
  'autism-spectrum-disorder': 'Autism Spectrum Disorder',
  'adhd': 'ADHD',
  'sensory-processing-disorder': 'Sensory Processing Disorder',
  'learning-disability': 'Learning Disability',
  'developmental-delay': 'Developmental Delay',
  'intellectual-disability': 'Intellectual Disability',
  'communication-disorder': 'Communication Disorder',
  'physical-disability': 'Physical Disability',
  'other': 'Other Condition'
};

const therapyTypeNames: Record<TherapyType, string> = {
  'speech': 'Speech Therapy',
  'occupational': 'Occupational Therapy',
  'physical': 'Physical Therapy',
  'behavioral': 'Behavioral Therapy',
  'cognitive': 'Cognitive Therapy',
  'sensory-integration': 'Sensory Integration',
  'play': 'Play Therapy',
  'music': 'Music Therapy',
  'art': 'Art Therapy'
};

const areaNames: Record<ConditionArea, string> = {
  'communication': 'Communication',
  'sensory': 'Sensory Processing',
  'social': 'Social Skills',
  'behavioral': 'Behavioral',
  'cognitive': 'Cognitive',
  'motor': 'Motor Skills'
};

// Mock data for therapy plan templates
const mockTherapyTemplates: TherapyPlanTemplate[] = [
  {
    id: 'tpt1',
    name: 'ASD Communication Development',
    description: 'A comprehensive plan targeting communication skills for children with autism spectrum disorder',
    conditionType: 'autism-spectrum-disorder',
    targetAreas: ['communication', 'social'],
    therapyTypes: ['speech', 'behavioral'],
    suitableSeverities: ['mild', 'moderate'],
    duration: 12, // 12 weeks
    frequency: 2, // 2 sessions per week
    goals: [
      {
        area: 'communication',
        description: 'Improve verbal expression of needs and wants',
        measurableOutcomes: ['Use 3-4 word sentences', 'Request items by name', 'Answer simple questions']
      },
      {
        area: 'social',
        description: 'Enhance social communication skills',
        measurableOutcomes: ['Take turns in conversation', 'Maintain eye contact', 'Use appropriate greetings']
      }
    ],
    recommendedActivities: ['act1', 'act2', 'act3']
  },
  {
    id: 'tpt2',
    name: 'SPD Sensory Integration',
    description: 'Sensory processing therapy plan for managing sensory sensitivities',
    conditionType: 'sensory-processing-disorder',
    targetAreas: ['sensory', 'behavioral'],
    therapyTypes: ['sensory-integration', 'occupational'],
    suitableSeverities: ['moderate', 'severe'],
    duration: 10,
    frequency: 3,
    goals: [
      {
        area: 'sensory',
        description: 'Improve tolerance to sensory stimuli',
        measurableOutcomes: ['Identify overwhelming sensory inputs', 'Use self-regulation techniques', 'Engage in sensory activities for 10+ minutes']
      },
      {
        area: 'behavioral',
        description: 'Reduce negative reactions to sensory triggers',
        measurableOutcomes: ['Decrease sensory avoidance behaviors', 'Use communication instead of behaviors', 'Use coping strategies when overwhelmed']
      }
    ],
    recommendedActivities: ['act4', 'act5', 'act6']
  },
  {
    id: 'tpt3',
    name: 'ADHD Executive Function',
    description: 'Therapy plan focused on improving executive function skills for ADHD',
    conditionType: 'adhd',
    targetAreas: ['cognitive', 'behavioral'],
    therapyTypes: ['cognitive', 'behavioral'],
    suitableSeverities: ['mild', 'moderate', 'severe'],
    duration: 8,
    frequency: 2,
    goals: [
      {
        area: 'cognitive',
        description: 'Enhance attention span and focus',
        measurableOutcomes: ['Complete 15-min tasks without distraction', 'Follow multi-step instructions', 'Self-monitor attention']
      },
      {
        area: 'behavioral',
        description: 'Improve impulse control',
        measurableOutcomes: ['Raise hand before speaking', 'Wait for turn in games', 'Think before acting']
      }
    ],
    recommendedActivities: ['act7', 'act8', 'act9']
  }
];

interface TemplateDetailViewProps {
  template: TherapyPlanTemplate;
  onClose: () => void;
  onUseTemplate: (template: TherapyPlanTemplate) => void;
}

const TemplateDetailView: React.FC<TemplateDetailViewProps> = ({ 
  template, 
  onClose,
  onUseTemplate
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Plan Details</h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline">{conditionNames[template.conditionType]}</Badge>
          {template.suitableSeverities.map((severity) => (
            <Badge key={severity} variant="outline" className="bg-ablelyf-neutral-100">
              {severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
            </Badge>
          ))}
          <Badge variant="outline" className="bg-ablelyf-blue-100 text-ablelyf-blue-800">
            {template.duration} weeks
          </Badge>
          <Badge variant="outline" className="bg-ablelyf-blue-100 text-ablelyf-blue-800">
            {template.frequency}x weekly
          </Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Target Areas</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {template.targetAreas.map((area) => (
            <Badge key={area}>{areaNames[area]}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Therapy Types</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {template.therapyTypes.map((type) => (
            <Badge key={type} variant="secondary">{therapyTypeNames[type]}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Therapy Goals</h3>
        <div className="mt-2 space-y-4">
          {template.goals.map((goal, index) => (
            <Card key={index} className="border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{areaNames[goal.area]}</CardTitle>
                <CardDescription>{goal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="text-sm font-medium mb-2">Measurable Outcomes:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  {goal.measurableOutcomes.map((outcome, idx) => (
                    <li key={idx}>{outcome}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={() => onUseTemplate(template)}>
          Use This Template
        </Button>
      </div>
    </div>
  );
};

interface ConditionTherapyTemplatesProps {
  onSelectTemplate: (template: TherapyPlanTemplate) => void;
}

export const ConditionTherapyTemplates: React.FC<ConditionTherapyTemplatesProps> = ({ 
  onSelectTemplate 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TherapyPlanTemplate | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  
  const therapyTemplates = mockTherapyTemplates;
  
  const handleViewDetails = (template: TherapyPlanTemplate) => {
    setSelectedTemplate(template);
    setDetailDialogOpen(true);
  };
  
  const handleUseTemplate = (template: TherapyPlanTemplate) => {
    onSelectTemplate(template);
    setDetailDialogOpen(false);
  };
  
  // Group templates by condition type
  const templatesByCondition: Record<ConditionType, TherapyPlanTemplate[]> = {} as Record<ConditionType, TherapyPlanTemplate[]>;
  
  therapyTemplates.forEach(template => {
    if (!templatesByCondition[template.conditionType]) {
      templatesByCondition[template.conditionType] = [];
    }
    templatesByCondition[template.conditionType].push(template);
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Condition-Specific Therapy Templates</h2>
        <p className="text-muted-foreground">
          Choose from pre-defined templates or create your own for specific conditions
        </p>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Conditions</TabsTrigger>
          {Object.keys(templatesByCondition).map((condition) => (
            <TabsTrigger key={condition} value={condition}>
              {conditionNames[condition as ConditionType]}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {therapyTemplates.map((template) => (
              <Card key={template.id} className="border border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{conditionNames[template.conditionType]}</Badge>
                    <Badge variant="outline" className="bg-ablelyf-neutral-100">
                      {template.duration} weeks
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.targetAreas.slice(0, 3).map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {areaNames[area]}
                      </Badge>
                    ))}
                    {template.targetAreas.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{template.targetAreas.length - 3}</Badge>
                    )}
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Therapy types:</span>
                      <span>{template.therapyTypes.length}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Goals:</span>
                      <span>{template.goals.length}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewDetails(template)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="border border-dashed border-border flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-ablelyf-neutral-100 w-12 h-12 flex items-center justify-center mb-4">
                <Plus size={24} className="text-ablelyf-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Create Custom Template</h3>
              <p className="text-center text-muted-foreground mb-4">
                Design a new therapy plan template for a specific condition
              </p>
              <Button>Create Template</Button>
            </Card>
          </div>
        </TabsContent>
        
        {Object.entries(templatesByCondition).map(([condition, templates]) => (
          <TabsContent key={condition} value={condition} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="border border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{conditionNames[template.conditionType]}</Badge>
                      <Badge variant="outline" className="bg-ablelyf-neutral-100">
                        {template.duration} weeks
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{template.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.targetAreas.slice(0, 3).map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {areaNames[area]}
                        </Badge>
                      ))}
                      {template.targetAreas.length > 3 && (
                        <Badge variant="secondary" className="text-xs">+{template.targetAreas.length - 3}</Badge>
                      )}
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Therapy types:</span>
                        <span>{template.therapyTypes.length}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Goals:</span>
                        <span>{template.goals.length}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewDetails(template)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              Therapy plan template for {selectedTemplate ? conditionNames[selectedTemplate.conditionType] : ''}
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <TemplateDetailView 
              template={selectedTemplate}
              onClose={() => setDetailDialogOpen(false)}
              onUseTemplate={handleUseTemplate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
