
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
import { 
  TherapyActivity,
  ConditionType, 
  ConditionArea, 
  TherapyType,
  ConditionSeverity
} from '@/types/diagnostic';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, FilePlus, ListChecks, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

// Mock therapy activities
const mockTherapyActivities: TherapyActivity[] = [
  {
    id: 'act1',
    name: 'Picture Exchange Communication',
    description: 'Using picture cards to facilitate communication for non-verbal children',
    duration: 20,
    materials: ['Picture cards', 'Communication binder', 'Velcro strips', 'Preferred items/rewards'],
    steps: [
      'Set up communication binder with relevant picture cards',
      'Show child preferred item and place it in view but out of reach',
      'Guide child to select appropriate picture card',
      'Prompt child to hand card to communication partner',
      'Immediately provide the requested item and verbal reinforcement',
      'Gradually increase distance between child and communication partner'
    ],
    targetAreas: ['communication', 'social'],
    suitableConditions: ['autism-spectrum-disorder', 'communication-disorder', 'developmental-delay'],
    therapyTypes: ['speech', 'behavioral'],
    suitableSeverities: ['moderate', 'severe'],
    expectedOutcomes: [
      'Initiate communication using pictures',
      'Understand cause-effect relationship in communication',
      'Reduce frustration from inability to communicate'
    ]
  },
  {
    id: 'act2',
    name: 'Sensory Exploration Bin',
    description: 'Gradual exposure to different textures through guided play',
    duration: 15,
    materials: ['Plastic bin', 'Rice/beans/sand', 'Small toys', 'Scoops', 'Containers'],
    steps: [
      'Fill sensory bin with chosen material',
      'Hide toys or objects in the material',
      'Demonstrate how to explore and find items',
      'Encourage child to touch materials with fingertips first',
      'Gradually increase sensory involvement',
      'Provide frequent breaks if needed'
    ],
    targetAreas: ['sensory', 'motor'],
    suitableConditions: ['sensory-processing-disorder', 'autism-spectrum-disorder'],
    therapyTypes: ['sensory-integration', 'occupational', 'play'],
    suitableSeverities: ['mild', 'moderate', 'severe'],
    expectedOutcomes: [
      'Increased tolerance to textural input',
      'Improved fine motor skills',
      'Reduced tactile defensiveness'
    ],
    adaptations: [
      {
        severity: 'severe',
        description: 'Start with preferred textures only, use tools instead of hands if needed'
      },
      {
        severity: 'moderate', 
        description: 'Provide gloves initially if needed, gradually transition to direct contact'
      }
    ]
  },
  {
    id: 'act3',
    name: 'Attention Regulation Station',
    description: 'Activity rotation system to build focus and transition skills',
    duration: 25,
    materials: ['Visual timer', 'Activity picture cards', 'Rotation board', '3-4 focus activities'],
    steps: [
      'Set up 3-4 different activities in defined spaces',
      'Create visual schedule of activity rotation',
      'Use timer set for appropriate duration (start with 3-5 minutes)',
      'Give 1-minute warning before transitions',
      'Guide child to check schedule and move to next activity',
      'Gradually increase time at each station'
    ],
    targetAreas: ['cognitive', 'behavioral'],
    suitableConditions: ['adhd', 'autism-spectrum-disorder'],
    therapyTypes: ['behavioral', 'cognitive'],
    suitableSeverities: ['mild', 'moderate'],
    expectedOutcomes: [
      'Improved attention span',
      'Better transition between activities',
      'Following visual schedules independently'
    ]
  }
];

interface ActivityDetailViewProps {
  activity: TherapyActivity;
  onClose: () => void;
  onAddToTherapyPlan: (activity: TherapyActivity) => void;
}

const ActivityDetailView: React.FC<ActivityDetailViewProps> = ({ 
  activity, 
  onClose,
  onAddToTherapyPlan 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Activity Details</h3>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="flex items-center gap-1">
            <Clock size={14} /> {activity.duration} min
          </Badge>
          {activity.suitableSeverities.map((severity) => (
            <Badge key={severity} variant="outline" className="bg-ablelyf-neutral-100">
              {severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Target Areas</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {activity.targetAreas.map((area) => (
              <Badge key={area}>{areaNames[area]}</Badge>
            ))}
          </div>
          
          <h3 className="text-lg font-medium mb-2">Therapy Types</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {activity.therapyTypes.map((type) => (
              <Badge key={type} variant="secondary">{therapyTypeNames[type]}</Badge>
            ))}
          </div>
          
          <h3 className="text-lg font-medium mb-2">Suitable Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {activity.suitableConditions.map((condition) => (
              <Badge key={condition} variant="outline">{conditionNames[condition]}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Materials Needed</h3>
          <ul className="list-disc pl-5 mb-4 text-sm space-y-1">
            {activity.materials.map((material, idx) => (
              <li key={idx}>{material}</li>
            ))}
          </ul>
          
          <h3 className="text-lg font-medium mb-2">Expected Outcomes</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {activity.expectedOutcomes.map((outcome, idx) => (
              <li key={idx}>{outcome}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Implementation Steps</h3>
        <ol className="list-decimal pl-5 text-sm space-y-2">
          {activity.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
      
      {activity.adaptations && activity.adaptations.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Adaptations by Severity</h3>
          <div className="space-y-2">
            {activity.adaptations.map((adaptation, idx) => (
              <div key={idx} className="bg-ablelyf-neutral-50 p-3 rounded-md">
                <h4 className="text-sm font-medium">
                  For {adaptation.severity.charAt(0).toUpperCase() + adaptation.severity.slice(1)} Severity:
                </h4>
                <p className="text-sm">{adaptation.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={() => onAddToTherapyPlan(activity)}>
          Add to Therapy Plan
        </Button>
      </div>
    </div>
  );
};

interface TherapyActivitiesProps {
  onSelectActivity: (activity: TherapyActivity) => void;
}

export const TherapyActivities: React.FC<TherapyActivitiesProps> = ({ 
  onSelectActivity 
}) => {
  const [selectedActivity, setSelectedActivity] = useState<TherapyActivity | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleViewDetails = (activity: TherapyActivity) => {
    setSelectedActivity(activity);
    setDetailDialogOpen(true);
  };
  
  const handleAddToTherapyPlan = (activity: TherapyActivity) => {
    onSelectActivity(activity);
    setDetailDialogOpen(false);
  };
  
  // Filter activities based on search term
  const filteredActivities = mockTherapyActivities.filter(activity => 
    activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.targetAreas.some(area => areaNames[area].toLowerCase().includes(searchTerm.toLowerCase())) ||
    activity.therapyTypes.some(type => therapyTypeNames[type].toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Group activities by therapy type
  const activitiesByTherapyType: Record<TherapyType, TherapyActivity[]> = {} as Record<TherapyType, TherapyActivity[]>;
  
  mockTherapyActivities.forEach(activity => {
    activity.therapyTypes.forEach(type => {
      if (!activitiesByTherapyType[type]) {
        activitiesByTherapyType[type] = [];
      }
      if (!activitiesByTherapyType[type].includes(activity)) {
        activitiesByTherapyType[type].push(activity);
      }
    });
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Therapy Activities Library</h2>
        <p className="text-muted-foreground">
          Browse and select activities to include in your therapy plans
        </p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search activities, skills, or therapy types..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {searchTerm ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Search Results ({filteredActivities.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActivities.map((activity) => (
              <Card key={activity.id} className="border border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className="flex items-center gap-1">
                      <Clock size={14} /> {activity.duration} min
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{activity.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {activity.targetAreas.map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {areaNames[area]}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Suitable for:</span>
                      <span>{activity.suitableConditions.length} conditions</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Therapy types:</span>
                      <span>{activity.therapyTypes.length}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewDetails(activity)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="all">All Activities</TabsTrigger>
            {Object.keys(activitiesByTherapyType).map((type) => (
              <TabsTrigger key={type} value={type}>
                {therapyTypeNames[type as TherapyType]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTherapyActivities.map((activity) => (
                <Card key={activity.id} className="border border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge className="flex items-center gap-1">
                        <Clock size={14} /> {activity.duration} min
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{activity.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {activity.targetAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {areaNames[area]}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Suitable for:</span>
                        <span>{activity.suitableConditions.length} conditions</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Therapy types:</span>
                        <span>{activity.therapyTypes.length}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewDetails(activity)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="border border-dashed border-border flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-ablelyf-neutral-100 w-12 h-12 flex items-center justify-center mb-4">
                  <FilePlus size={24} className="text-ablelyf-blue-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Create New Activity</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Design a custom activity for your specific therapy needs
                </p>
                <Button>Create Activity</Button>
              </Card>
            </div>
          </TabsContent>
          
          {Object.entries(activitiesByTherapyType).map(([type, activities]) => (
            <TabsContent key={type} value={type} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activities.map((activity) => (
                  <Card key={activity.id} className="border border-border">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className="flex items-center gap-1">
                          <Clock size={14} /> {activity.duration} min
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{activity.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {activity.targetAreas.map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {areaNames[area]}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Suitable for:</span>
                          <span>{activity.suitableConditions.length} conditions</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Steps:</span>
                          <span>{activity.steps.length}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleViewDetails(activity)}
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
      )}
      
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedActivity?.name}</DialogTitle>
            <DialogDescription>
              {selectedActivity?.duration} minute therapy activity
            </DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <ActivityDetailView 
              activity={selectedActivity}
              onClose={() => setDetailDialogOpen(false)}
              onAddToTherapyPlan={handleAddToTherapyPlan}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
