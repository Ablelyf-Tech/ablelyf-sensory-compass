
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { patients } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { User, FileText, Activity, Brain, Calendar, AlertTriangle } from 'lucide-react';

const PatientProfile: React.FC = () => {
  const { toast } = useToast();
  const patient = patients[0]; // For demo purposes, we'll use the first patient
  
  const handleContactTherapist = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the therapist.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Patient Profile</h1>
          <Button 
            variant="default" 
            onClick={handleContactTherapist}
            className="bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600"
          >
            Contact Therapist
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-28 w-28">
                  <AvatarImage src="/placeholder.svg" alt={patient.name} />
                  <AvatarFallback>
                    <User size={32} />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{patient.name}</h2>
                  <p className="text-muted-foreground">Age: {patient.age}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {patient.condition?.map((condition) => (
                    <Badge key={condition} variant="outline" className="bg-ablelyf-blue-50">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date of Diagnosis</p>
                  <p>{patient.diagnosisDate || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Primary Therapist</p>
                  <p>Dr. Maria Rodriguez</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">School</p>
                  <p>Brookside Elementary</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="therapy">Therapy</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Brain size={18} />
                      Current Therapy Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-ablelyf-green-500"></div>
                        <span>Improve sensory processing in crowded environments</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-ablelyf-blue-500"></div>
                        <span>Develop coping mechanisms for auditory sensitivities</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <span>Enhance fine motor skills for daily activities</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Activity size={18} />
                      Recent Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Social Interaction</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full h-2 bg-ablelyf-neutral-200 rounded-full overflow-hidden">
                          <div className="bg-ablelyf-green-500 h-full rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Communication</span>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <div className="w-full h-2 bg-ablelyf-neutral-200 rounded-full overflow-hidden">
                          <div className="bg-ablelyf-blue-500 h-full rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Sensory Regulation</span>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <div className="w-full h-2 bg-ablelyf-neutral-200 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="therapy" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Therapy Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="font-medium">Current Focus Areas</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-ablelyf-blue-50 rounded-md">
                          <h4 className="font-medium">Sensory Integration</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Working on integrating multiple sensory inputs in a controlled environment.
                          </p>
                        </div>
                        <div className="p-3 bg-ablelyf-green-50 rounded-md">
                          <h4 className="font-medium">Social Communication</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Practicing conversation skills and non-verbal cues recognition.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          View Full Therapy Plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Assessment Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-ablelyf-blue-500" />
                          <div>
                            <p className="font-medium">Quarterly Progress Assessment</p>
                            <p className="text-sm text-muted-foreground">March 15, 2025</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-ablelyf-blue-500" />
                          <div>
                            <p className="font-medium">Sensory Processing Evaluation</p>
                            <p className="text-sm text-muted-foreground">January 10, 2025</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Treatment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="font-medium">2024</h3>
                        <div className="ml-4 pl-4 border-l space-y-3">
                          <div>
                            <p className="font-medium">Occupational Therapy Program</p>
                            <p className="text-sm text-muted-foreground">January - December</p>
                            <p className="text-sm mt-1">Focus on fine motor skills and sensory integration</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-medium">2023</h3>
                        <div className="ml-4 pl-4 border-l space-y-3">
                          <div>
                            <p className="font-medium">Speech Therapy</p>
                            <p className="text-sm text-muted-foreground">March - November</p>
                            <p className="text-sm mt-1">Social communication and pragmatic language skills</p>
                          </div>
                          <div>
                            <p className="font-medium">Initial Assessment</p>
                            <p className="text-sm text-muted-foreground">January 15</p>
                            <p className="text-sm mt-1">Comprehensive evaluation and diagnosis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Calendar size={18} />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-ablelyf-blue-50 rounded-md">
                  <p className="font-medium">Therapy Session</p>
                  <p className="text-sm text-muted-foreground">April 10, 2025 - 2:00 PM</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-white">In-person</Badge>
                    <Badge variant="outline" className="bg-white">Dr. Rodriguez</Badge>
                  </div>
                </div>
                <div className="p-3 bg-ablelyf-neutral-100 rounded-md">
                  <p className="font-medium">School Consultation</p>
                  <p className="text-sm text-muted-foreground">April 15, 2025 - 10:00 AM</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-white">Virtual</Badge>
                    <Badge variant="outline" className="bg-white">Brookside Elementary</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle size={18} />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-md border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Sensory Overload</p>
                      <p className="text-sm">Yesterday, 3:45 PM - During grocery store visit</p>
                      <p className="text-sm mt-1">
                        Loud noises and crowded environment triggered distress. Applied calming techniques.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-ablelyf-blue-50 rounded-md border border-ablelyf-blue-200">
                  <div className="flex items-start gap-2">
                    <Activity className="h-5 w-5 text-ablelyf-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Missed Medication</p>
                      <p className="text-sm">April 5, 8:00 AM</p>
                      <p className="text-sm mt-1">
                        Morning dose was missed. Administered at 9:30 AM instead.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-right">
                <Button variant="ghost" size="sm">
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default PatientProfile;
