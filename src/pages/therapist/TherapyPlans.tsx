
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { therapyPlans, patients } from '@/data/mockData';
import { FileText, Clock, ChevronRight, Brain, Activity } from 'lucide-react';
import { TherapyPlanForm } from '@/components/therapist/TherapyPlanForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConditionTherapyTemplates } from '@/components/therapist/therapy/ConditionTherapyTemplates';
import { TherapyActivities } from '@/components/therapist/therapy/TherapyActivities';
import { TherapyPlanTemplate, TherapyActivity } from '@/types/diagnostic';

const TherapyPlans: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [templateMode, setTemplateMode] = useState(false);
  
  // Group plans by status
  const activePlans = therapyPlans.filter(plan => plan.status === 'active');
  const draftPlans = therapyPlans.filter(plan => plan.status === 'draft');
  const completedPlans = therapyPlans.filter(plan => plan.status === 'completed');
  
  // Get patient name from ID
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };
  
  // Calculate overall progress for a plan
  const calculateProgress = (planId: string) => {
    const plan = therapyPlans.find(p => p.id === planId);
    if (!plan) return 0;
    
    const totalGoals = plan.goals.length;
    if (totalGoals === 0) return 0;
    
    const achievedGoals = plan.goals.filter(g => g.status === 'achieved').length;
    const inProgressGoals = plan.goals.filter(g => g.status === 'in-progress').length;
    
    return Math.round((achievedGoals + (inProgressGoals * 0.5)) / totalGoals * 100);
  };

  const handleSelectTemplate = (template: TherapyPlanTemplate) => {
    console.log('Selected template:', template);
    // Here you would typically open the therapy plan form and pre-fill it with template data
    setTemplateMode(false);
  };
  
  const handleSelectActivity = (activity: TherapyActivity) => {
    console.log('Selected activity:', activity);
    // Here you would typically add this activity to an existing or new therapy plan
  };

  const renderPlanList = (plans: typeof therapyPlans) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map(plan => (
        <Card key={plan.id} className="border border-border">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Badge className={
                plan.status === 'active' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : plan.status === 'completed'
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200'
              }>
                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </Badge>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {new Date(plan.startDate).toLocaleDateString()}
              </div>
            </div>
            <CardTitle className="text-xl">{plan.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              Patient: {getPatientName(plan.patientId)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{calculateProgress(plan.id)}%</span>
                </div>
                <Progress value={calculateProgress(plan.id)} className="h-2" />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Goals ({plan.goals.length})</h4>
                <div className="space-y-2">
                  {plan.goals.slice(0, 2).map((goal, index) => (
                    <div key={index} className="flex items-center justify-between bg-ablelyf-neutral-50 p-2 rounded-md text-sm">
                      <div className="flex items-center">
                        <div 
                          className={`h-2 w-2 rounded-full mr-2 ${
                            goal.status === 'achieved' 
                              ? 'bg-green-500' 
                              : goal.status === 'in-progress'
                              ? 'bg-amber-500'
                              : 'bg-gray-300'
                          }`}
                        />
                        <span className="truncate max-w-[200px]">{goal.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {goal.progress}%
                      </Badge>
                    </div>
                  ))}
                  {plan.goals.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">
                      + {plan.goals.length - 2} more goals
                    </div>
                  )}
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View Full Plan
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-ablelyf-blue-900">Therapy Plans</h1>
          <p className="text-muted-foreground">Create and manage patient therapy plans</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={templateMode ? "default" : "outline"}
            onClick={() => setTemplateMode(!templateMode)}
            className={templateMode ? "bg-ablelyf-blue-500" : ""}
          >
            <Brain className="mr-2 h-4 w-4" />
            Templates & Activities
          </Button>
          <TherapyPlanForm />
        </div>
      </div>
      
      {templateMode ? (
        <Tabs defaultValue="templates" className="mb-6">
          <TabsList>
            <TabsTrigger value="templates">
              Condition-Specific Templates
            </TabsTrigger>
            <TabsTrigger value="activities">
              Therapy Activities
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="pt-6">
            <ConditionTherapyTemplates onSelectTemplate={handleSelectTemplate} />
          </TabsContent>
          
          <TabsContent value="activities" className="pt-6">
            <TherapyActivities onSelectActivity={handleSelectActivity} />
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="active" className="mb-6" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="active">
              Active Plans ({activePlans.length})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Draft Plans ({draftPlans.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed Plans ({completedPlans.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="pt-6">
            {activePlans.length > 0 ? (
              renderPlanList(activePlans)
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="text-xl font-medium">No Active Plans</h3>
                  <p className="text-muted-foreground">Create a new therapy plan to get started.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="draft" className="pt-6">
            {draftPlans.length > 0 ? (
              renderPlanList(draftPlans)
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="text-xl font-medium">No Draft Plans</h3>
                  <p className="text-muted-foreground">No draft plans currently exist.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="pt-6">
            {completedPlans.length > 0 ? (
              renderPlanList(completedPlans)
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="text-xl font-medium">No Completed Plans</h3>
                  <p className="text-muted-foreground">Your completed plans will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </AppLayout>
  );
};

export default TherapyPlans;
