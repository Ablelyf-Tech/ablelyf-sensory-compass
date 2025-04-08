
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Filter, Calendar, User, FileText, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { patients } from '@/data/mockData';
import { AssessmentForm } from '@/components/therapist/AssessmentForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock assessment data
const mockAssessments = [
  {
    id: 'a1',
    patientId: 'p1',
    type: 'initial',
    date: '2023-04-01',
    completed: true
  },
  {
    id: 'a2',
    patientId: 'p2',
    type: 'quarterly',
    date: '2023-04-05',
    completed: true
  },
  {
    id: 'a3',
    patientId: 'p3',
    type: 'annual',
    date: '2023-04-10',
    completed: true
  },
  {
    id: 'a4',
    patientId: 'p1',
    type: 'progress',
    date: '2023-07-15',
    completed: true
  },
  {
    id: 'a5',
    patientId: 'p4',
    type: 'initial',
    date: '2023-08-20',
    completed: false
  }
];

const Assessments: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const completedAssessments = mockAssessments.filter(a => a.completed);
  const pendingAssessments = mockAssessments.filter(a => !a.completed);
  
  // Get patient name from ID
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };
  
  // Format assessment type for display
  const formatAssessmentType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' Assessment';
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-ablelyf-blue-900">Assessments</h1>
          <p className="text-muted-foreground">Manage patient assessments and evaluations</p>
        </div>
        <AssessmentForm />
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input 
            placeholder="Search assessments..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="completed" className="mb-6">
        <TabsList>
          <TabsTrigger value="completed">
            Completed ({completedAssessments.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingAssessments.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="completed" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedAssessments.map(assessment => (
              <Card key={assessment.id} className="border border-border">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Completed
                    </Badge>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(assessment.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg">
                    {formatAssessmentType(assessment.type)}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-1 h-4 w-4" />
                    {getPatientName(assessment.patientId)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-3">
                    <div className="pt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-ablelyf-blue-100 rounded-full p-1">
                          <ClipboardList className="h-4 w-4 text-ablelyf-blue-800" />
                        </div>
                        <span className="text-sm">Sensory Processing Score: 7/10</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-ablelyf-green-100 rounded-full p-1">
                          <ClipboardList className="h-4 w-4 text-ablelyf-green-800" />
                        </div>
                        <span className="text-sm">Communication Score: 6/10</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-3">
                      <FileText className="mr-2 h-4 w-4" />
                      View Assessment
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="pt-6">
          {pendingAssessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingAssessments.map(assessment => (
                <Card key={assessment.id} className="border border-border">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        Pending
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(assessment.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-lg">
                      {formatAssessmentType(assessment.type)}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="mr-1 h-4 w-4" />
                      {getPatientName(assessment.patientId)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full mt-3 bg-ablelyf-blue-500">
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Complete Assessment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ClipboardList className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="text-xl font-medium">No Pending Assessments</h3>
                <p className="text-muted-foreground">All assessments have been completed.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Assessments;
