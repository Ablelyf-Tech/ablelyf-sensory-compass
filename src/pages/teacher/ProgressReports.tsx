
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Plus, Download, LineChart, FileText, Calendar, Edit, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { toast } from 'sonner';

const ProgressReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState('goals');
  
  // Mock student data with goals
  const students = [
    { 
      id: 1, 
      name: 'Jamie Rodriguez', 
      grade: '3rd Grade',
      status: 'Active IEP',
      goals: [
        { id: 1, name: 'Reading Comprehension', progress: 75, target: 'Read grade-level text with 80% comprehension accuracy' },
        { id: 2, name: 'Self-Regulation', progress: 60, target: 'Use calming strategies independently when frustrated' },
        { id: 3, name: 'Math Problem Solving', progress: 40, target: 'Solve multi-step word problems with 70% accuracy' }
      ],
      attendance: { present: 85, absent: 10, tardy: 5 },
      behavior: [
        { category: 'Following Directions', score: 4, outOf: 5 },
        { category: 'Participation', score: 3, outOf: 5 },
        { category: 'Task Completion', score: 4, outOf: 5 },
        { category: 'Peer Interactions', score: 3, outOf: 5 }
      ],
      academics: {
        reading: 72,
        writing: 68,
        math: 75,
        science: 80,
        socialStudies: 78
      },
      reportDue: '2025-05-15'
    },
    { 
      id: 2, 
      name: 'Taylor Wilson', 
      grade: '3rd Grade',
      status: 'Active 504',
      goals: [
        { id: 1, name: 'Writing Organization', progress: 80, target: 'Use graphic organizers to plan writing independently' },
        { id: 2, name: 'Attention', progress: 65, target: 'Stay on task for 15 minutes with one verbal reminder' }
      ],
      attendance: { present: 90, absent: 5, tardy: 5 },
      behavior: [
        { category: 'Following Directions', score: 3, outOf: 5 },
        { category: 'Participation', score: 4, outOf: 5 },
        { category: 'Task Completion', score: 3, outOf: 5 },
        { category: 'Peer Interactions', score: 5, outOf: 5 }
      ],
      academics: {
        reading: 85,
        writing: 70,
        math: 75,
        science: 82,
        socialStudies: 88
      },
      reportDue: '2025-05-10'
    },
    { 
      id: 3, 
      name: 'Alex Chen', 
      grade: '3rd Grade',
      status: 'Under Evaluation',
      goals: [
        { id: 1, name: 'Social Interaction', progress: 50, target: 'Initiate peer interactions 3 times per day' },
        { id: 2, name: 'Following Directions', progress: 70, target: 'Follow 2-step directions with 80% accuracy' },
        { id: 3, name: 'Fine Motor Skills', progress: 45, target: 'Complete handwriting tasks with appropriate letter size and spacing' }
      ],
      attendance: { present: 95, absent: 3, tardy: 2 },
      behavior: [
        { category: 'Following Directions', score: 2, outOf: 5 },
        { category: 'Participation', score: 3, outOf: 5 },
        { category: 'Task Completion', score: 2, outOf: 5 },
        { category: 'Peer Interactions', score: 2, outOf: 5 }
      ],
      academics: {
        reading: 65,
        writing: 60,
        math: 80,
        science: 85,
        socialStudies: 70
      },
      reportDue: '2025-04-30'
    },
  ];

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active IEP':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Active 504':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Evaluation':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Progress comparison data for chart
  const goalProgressData = selectedStudent?.goals.map(goal => ({
    name: goal.name,
    Current: goal.progress,
    Target: 100
  })) || [];

  // Attendance data for pie chart
  const attendanceData = selectedStudent ? [
    { name: 'Present', value: selectedStudent.attendance.present, color: '#4ade80' },
    { name: 'Absent', value: selectedStudent.attendance.absent, color: '#f87171' },
    { name: 'Tardy', value: selectedStudent.attendance.tardy, color: '#facc15' }
  ] : [];

  // Academic data for chart
  const academicData = selectedStudent ? [
    { subject: 'Reading', score: selectedStudent.academics.reading },
    { subject: 'Writing', score: selectedStudent.academics.writing },
    { subject: 'Math', score: selectedStudent.academics.math },
    { subject: 'Science', score: selectedStudent.academics.science },
    { subject: 'Social Studies', score: selectedStudent.academics.socialStudies }
  ] : [];

  const handleNewReport = () => {
    toast.success('New report functionality coming soon!');
  };

  const handleGenerateReport = () => {
    if (!selectedStudent) {
      toast.error('Please select a student first');
      return;
    }
    toast.success(`Generating report for ${selectedStudent.name}`);
  };

  const handleUpdateProgress = (goalId) => {
    toast.success(`Updating progress for goal ID: ${goalId}`);
  };

  const handleDeleteGoal = (goalId) => {
    toast.success(`Goal ID: ${goalId} deleted`);
    // In a real application, you would update the state or make an API call here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progress Reports</h1>
        <p className="text-muted-foreground">
          Track and document student progress toward IEP and learning goals
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search students..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="sm:w-auto" onClick={handleNewReport}>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Select a student to view progress details</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredStudents.length === 0 ? (
                  <div className="p-4 text-center">
                    <p>No students match your search criteria.</p>
                  </div>
                ) : (
                  filteredStudents.map(student => (
                    <div 
                      key={student.id}
                      className={`px-4 py-3 flex justify-between items-center hover:bg-slate-50 cursor-pointer border-l-2 ${selectedStudent?.id === student.id ? 'border-l-primary bg-slate-50' : 'border-l-transparent'}`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.grade}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {selectedStudent ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedStudent.name}</CardTitle>
                      <CardDescription>{selectedStudent.grade} • {selectedStudent.status}</CardDescription>
                    </div>
                    <Badge variant="outline">Report Due: {selectedStudent.reportDue}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs 
                    value={selectedReportType} 
                    onValueChange={setSelectedReportType} 
                    className="w-full"
                  >
                    <TabsList className="w-full grid grid-cols-4">
                      <TabsTrigger value="goals">Goals</TabsTrigger>
                      <TabsTrigger value="academics">Academics</TabsTrigger>
                      <TabsTrigger value="behavior">Behavior</TabsTrigger>
                      <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="goals" className="mt-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={goalProgressData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Current" fill="#8884d8" />
                            <Bar dataKey="Target" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="academics" className="mt-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={academicData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="score" fill="#60a5fa" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="behavior" className="mt-4">
                      <div className="space-y-4">
                        {selectedStudent.behavior.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>{item.category}</span>
                              <span>{item.score}/{item.outOf}</span>
                            </div>
                            <Progress value={(item.score / item.outOf) * 100} />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="attendance" className="mt-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={attendanceData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {attendanceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button onClick={handleGenerateReport}>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Data
                  </Button>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Review
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Progress Toward Goals</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Goal
                  </Button>
                </div>
                
                {selectedStudent.goals.map(goal => (
                  <Card key={goal.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{goal.name}</CardTitle>
                      <CardDescription className="text-sm">{goal.target}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleUpdateProgress(goal.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteGoal(goal.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Student</h3>
                <p className="text-muted-foreground">
                  Please select a student from the list to view their progress details.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressReports;
