
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Activity, Search, Plus, Calendar, ClipboardCheck, FileText, BarChart, User } from 'lucide-react';
import { patients } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

// Mock assessment data
const assessments = [
  {
    id: 'a1',
    title: 'Initial Cognitive Assessment',
    patientId: 'p1',
    date: '2024-01-15',
    type: 'cognitive',
    status: 'completed',
    score: 82,
    description: 'Comprehensive initial assessment for cognitive function and development.'
  },
  {
    id: 'a2',
    title: 'Sensory Processing Evaluation',
    patientId: 'p2',
    date: '2024-02-05',
    type: 'sensory',
    status: 'completed',
    score: 65,
    description: 'Evaluation of sensory processing and integration abilities.'
  },
  {
    id: 'a3',
    title: 'Social Skills Assessment',
    patientId: 'p3',
    date: '2024-03-10',
    type: 'social',
    status: 'completed',
    score: 70,
    description: 'Assessment of social interaction skills and development.'
  },
  {
    id: 'a4',
    title: 'Quarterly Progress Evaluation',
    patientId: 'p1',
    date: '2024-04-15',
    type: 'progress',
    status: 'scheduled',
    description: 'Quarterly follow-up to measure progress against goals.'
  },
  {
    id: 'a5',
    title: 'Communication Skills Assessment',
    patientId: 'p4',
    date: '2024-03-20',
    type: 'communication',
    status: 'draft',
    description: 'Evaluation of verbal and non-verbal communication abilities.'
  },
  {
    id: 'a6',
    title: 'Emotional Regulation Assessment',
    patientId: 'p2',
    date: '2024-04-10',
    type: 'emotional',
    status: 'scheduled',
    description: 'Assessment of emotional awareness and regulation strategies.'
  }
];

const Assessments: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter assessments based on search, status and type
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    const matchesType = typeFilter === 'all' || assessment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-ablelyf-green-500">Completed</Badge>;
      case 'scheduled':
        return <Badge className="bg-ablelyf-blue-500">Scheduled</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return null;
    }
  };

  // Get patient name from patient ID
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  // Handle assessment action
  const handleAssessmentAction = (action: string, assessmentId: string) => {
    toast({
      title: `${action} Assessment`,
      description: `${action} assessment ID: ${assessmentId}`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
            <p className="text-muted-foreground">Create, manage and track patient assessments</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Assessment</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assessments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-52">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cognitive">Cognitive</SelectItem>
              <SelectItem value="sensory">Sensory Processing</SelectItem>
              <SelectItem value="social">Social Skills</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
              <SelectItem value="emotional">Emotional Regulation</SelectItem>
              <SelectItem value="progress">Progress Evaluation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => {
            const patientName = getPatientName(assessment.patientId);
            
            return (
              <Card key={assessment.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-muted-foreground" />
                        <CardDescription>{patientName}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(assessment.status)}
                  </div>
                </CardHeader>
                <CardContent className="py-2 flex-1">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{assessment.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>{new Date(assessment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-muted-foreground" />
                        <span className="capitalize">{assessment.type}</span>
                      </div>
                    </div>
                    
                    {assessment.score && (
                      <div className="bg-ablelyf-neutral-100 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Overall Score:</span>
                          <span className="font-bold text-lg">{assessment.score}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t flex justify-between">
                  {assessment.status === 'draft' ? (
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleAssessmentAction('Edit', assessment.id)}>
                      <FileText size={14} className="mr-1" />
                      Edit Draft
                    </Button>
                  ) : assessment.status === 'scheduled' ? (
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleAssessmentAction('Start', assessment.id)}>
                      <ClipboardCheck size={14} className="mr-1" />
                      Start Assessment
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleAssessmentAction('Report', assessment.id)}>
                      <BarChart size={14} className="mr-1" />
                      Analysis
                    </Button>
                  )}
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="text-xs" 
                    onClick={() => handleAssessmentAction('View', assessment.id)}
                  >
                    <FileText size={14} className="mr-1" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Assessments;
