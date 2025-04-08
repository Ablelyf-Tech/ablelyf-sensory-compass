
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download, Calendar, BookOpen, MessageSquare, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PatientProfile = () => {
  // Mock patient data
  const patient = {
    id: 1,
    name: 'Morgan Taylor',
    age: 8,
    dateOfBirth: '2017-05-12',
    diagnoses: ['Sensory Processing Disorder', 'ADHD'],
    therapist: 'Dr. Jamie Rodriguez',
    nextAppointment: '2025-04-15 10:00 AM',
    lastEvaluation: '2025-01-10',
    medications: [
      { name: 'Methylphenidate', dosage: '10mg', schedule: 'Morning' }
    ],
    goals: [
      { id: 1, name: 'Sensory Regulation', progress: 65, description: 'Develop strategies to manage sensory overload' },
      { id: 2, name: 'Focus Duration', progress: 40, description: 'Increase focused attention during activities' },
      { id: 3, name: 'Fine Motor Skills', progress: 70, description: 'Improve handwriting and tool manipulation' },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4 items-center">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <p className="text-muted-foreground">{patient.age} years old • DOB: {patient.dateOfBirth}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Therapist
            </Button>
            <Button variant="secondary" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
          <TabsTrigger value="therapy">Therapy Plan</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Clinical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Diagnoses</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.diagnoses.map((diagnosis, index) => (
                        <Badge key={index} variant="secondary">{diagnosis}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Primary Therapist</h3>
                    <p>{patient.therapist}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Last Evaluation Date</h3>
                    <p>{patient.lastEvaluation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-3 bg-slate-50">
                    <div className="font-medium">Occupational Therapy Session</div>
                    <div className="text-sm text-muted-foreground">{patient.nextAppointment}</div>
                    <div className="text-sm text-muted-foreground">With: {patient.therapist}</div>
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="outline" size="sm">Cancel</Button>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medications</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medications.length > 0 ? (
                  <div className="space-y-4">
                    {patient.medications.map((medication, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="font-medium">{medication.name}</div>
                        <div className="text-sm text-muted-foreground">Dosage: {medication.dosage}</div>
                        <div className="text-sm text-muted-foreground">Schedule: {medication.schedule}</div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      Update Medication Info
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No medications recorded</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Add Medication
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Therapy Goals</CardTitle>
              <CardDescription>Current progress toward therapy goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patient.goals.map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">{goal.name}</div>
                      <div>{goal.progress}%</div>
                    </div>
                    <Progress value={goal.progress} />
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">View Full Goal Details</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Goals & Progress</h3>
              <p className="text-muted-foreground mb-4">
                Detailed view of therapy goals and progress tracking.
              </p>
              <Button>View Detailed Goals</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="therapy" className="mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <h3 className="text-lg font-medium mb-2">Therapy Plan</h3>
              <p className="text-muted-foreground">
                Comprehensive therapy plan and treatment information.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <h3 className="text-lg font-medium mb-2">Reports & Documents</h3>
              <p className="text-muted-foreground">
                Access to evaluation reports and therapy documentation.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <h3 className="text-lg font-medium mb-2">Resources</h3>
              <p className="text-muted-foreground">
                Personalized resources and helpful materials.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile;
