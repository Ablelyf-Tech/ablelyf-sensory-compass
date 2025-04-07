
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Search, Plus, Calendar, Trophy, Users, CheckCircle2, CircleEllipsis, Clock } from 'lucide-react';
import { therapyPlans, patients } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TherapyPlan } from '@/types';
import { Progress } from '@/components/ui/progress';

const TherapyPlans: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [patientFilter, setPatientFilter] = useState('all');

  // Filter therapy plans based on search, status and patient
  const filteredPlans = therapyPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    const matchesPatient = patientFilter === 'all' || plan.patientId === patientFilter;
    return matchesSearch && matchesStatus && matchesPatient;
  });

  // Calculate overall progress for a therapy plan
  const calculateOverallProgress = (plan: TherapyPlan) => {
    if (plan.goals.length === 0) return 0;
    const totalProgress = plan.goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / plan.goals.length);
  };

  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-ablelyf-green-500">Active</Badge>;
      case 'completed':
        return <Badge className="bg-ablelyf-blue-500">Completed</Badge>;
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

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Therapy Plans</h1>
            <p className="text-muted-foreground">Create and manage therapy plans for your patients</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Plan</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search plans..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={patientFilter} onValueChange={setPatientFilter}>
            <SelectTrigger className="w-full md:w-52">
              <SelectValue placeholder="Filter by patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const progress = calculateOverallProgress(plan);
            const patientName = getPatientName(plan.patientId);
            
            return (
              <Card key={plan.id} className="overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{plan.title}</CardTitle>
                      <CardDescription>For {patientName}</CardDescription>
                    </div>
                    {getStatusBadge(plan.status)}
                  </div>
                </CardHeader>
                <CardContent className="py-2 flex-1">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>Started: {new Date(plan.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy size={14} className="text-muted-foreground" />
                        <span>{plan.goals.filter(g => g.status === 'achieved').length} goals achieved</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Top Goals:</p>
                      <ul className="space-y-1">
                        {plan.goals.slice(0, 2).map((goal) => (
                          <li key={goal.id} className="flex items-start gap-2 text-sm">
                            {goal.status === 'achieved' ? (
                              <CheckCircle2 size={14} className="text-ablelyf-green-500 mt-0.5" />
                            ) : goal.status === 'in-progress' ? (
                              <CircleEllipsis size={14} className="text-ablelyf-blue-500 mt-0.5" />
                            ) : (
                              <Clock size={14} className="text-muted-foreground mt-0.5" />
                            )}
                            <span className="line-clamp-1">{goal.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t flex justify-between">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Users size={14} className="mr-1" />
                    Collaborators
                  </Button>
                  <Button variant="default" size="sm" className="text-xs">
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

export default TherapyPlans;
