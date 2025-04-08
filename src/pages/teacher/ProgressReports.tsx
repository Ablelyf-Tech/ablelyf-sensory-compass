
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  FileText, User, Calendar, ArrowUp, 
  ArrowDown, ChevronRight, Search, Plus, Download 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar
} from 'recharts';

// Mock data for student progress
const students = [
  { id: '1', name: 'Alex Johnson', age: 8, profile: '/placeholder.svg' },
  { id: '2', name: 'Jamie Smith', age: 7, profile: '/placeholder.svg' },
  { id: '3', name: 'Taylor Brown', age: 9, profile: '/placeholder.svg' },
  { id: '4', name: 'Jordan Williams', age: 8, profile: '/placeholder.svg' },
  { id: '5', name: 'Casey Davis', age: 7, profile: '/placeholder.svg' },
  { id: '6', name: 'Riley Wilson', age: 9, profile: '/placeholder.svg' },
];

const progressData = [
  { month: 'Jan', reading: 40, writing: 24, math: 35, social: 45 },
  { month: 'Feb', reading: 45, writing: 28, math: 40, social: 50 },
  { month: 'Mar', reading: 52, writing: 35, math: 45, social: 55 },
  { month: 'Apr', reading: 58, writing: 42, math: 52, social: 60 },
  { month: 'May', reading: 65, writing: 50, math: 58, social: 68 },
  { month: 'Jun', reading: 70, writing: 55, math: 65, social: 75 },
];

const goalTypes = [
  'Reading Comprehension',
  'Written Expression',
  'Mathematical Reasoning',
  'Social Communication',
  'Self-Regulation',
  'Motor Skills',
  'Task Completion',
  'Attention/Focus'
];

interface ProgressGoal {
  id: string;
  studentId: string;
  type: string;
  description: string;
  baseline: number;
  current: number;
  target: number;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

const mockGoals: ProgressGoal[] = [
  {
    id: '1',
    studentId: '1',
    type: 'Reading Comprehension',
    description: 'Identify main idea and supporting details in grade-level text',
    baseline: 25,
    current: 65,
    target: 80,
    notes: [
      'Making consistent progress in identifying main idea',
      'Still needs support with identifying supporting details',
      'Reading fluency has improved significantly'
    ],
    createdAt: '2025-01-15',
    updatedAt: '2025-04-05'
  },
  {
    id: '2',
    studentId: '1',
    type: 'Social Communication',
    description: 'Initiate and maintain conversations with peers for 3-5 exchanges',
    baseline: 30,
    current: 60,
    target: 85,
    notes: [
      'Has started initiating conversations during lunch',
      'Needs prompting to ask follow-up questions',
      'Shows interest in peer interactions during structured activities'
    ],
    createdAt: '2025-01-15',
    updatedAt: '2025-04-05'
  },
  {
    id: '3',
    studentId: '1',
    type: 'Mathematical Reasoning',
    description: 'Solve multi-step word problems involving addition and subtraction',
    baseline: 40,
    current: 70,
    target: 90,
    notes: [
      'Can identify relevant information in word problems',
      'Occasionally struggles with determining operation to use',
      'Shows improvement with visual supports'
    ],
    createdAt: '2025-01-15',
    updatedAt: '2025-04-05'
  }
];

const reports = [
  { 
    id: '1', 
    studentId: '1', 
    name: 'Alex Johnson', 
    period: 'Q1 2025', 
    date: '2025-03-30',
    status: 'completed',
    overview: 'Alex has made significant progress this quarter in reading and social skills.'
  },
  { 
    id: '2', 
    studentId: '2', 
    name: 'Jamie Smith', 
    period: 'Q1 2025', 
    date: '2025-03-28',
    status: 'draft',
    overview: 'Jamie continues to work on math concepts and has improved in writing tasks.'
  },
  { 
    id: '3', 
    studentId: '3', 
    name: 'Taylor Brown', 
    period: 'Q1 2025', 
    date: '2025-03-29',
    status: 'completed',
    overview: 'Taylor shows strengths in science activities and is working to improve focus.'
  },
  { 
    id: '4', 
    studentId: '1', 
    name: 'Alex Johnson', 
    period: 'Q4 2024', 
    date: '2024-12-20',
    status: 'completed',
    overview: 'Alex showed progress in all areas during the last quarter of 2024.'
  }
];

const ProgressReportsPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    type: '',
    description: '',
    baseline: 0,
    target: 100,
    notes: ''
  });

  const handleAddGoal = () => {
    if (!newGoal.type || !newGoal.description) {
      toast({
        title: "Missing information",
        description: "Please provide a goal type and description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Goal Added",
      description: `New goal for ${selectedStudent.name} has been created.`,
    });

    setShowAddGoal(false);
    setNewGoal({
      type: '',
      description: '',
      baseline: 0,
      target: 100,
      notes: ''
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Progress Reports</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select 
              defaultValue={selectedStudent.id} 
              onValueChange={(value) => {
                const student = students.find(s => s.id === value);
                if (student) setSelectedStudent(student);
              }}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button className="gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600">
              <FileText className="h-4 w-4" />
              <span>Generate Report</span>
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedStudent.profile} alt={selectedStudent.name} />
                  <AvatarFallback>{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedStudent.name}</CardTitle>
                  <CardDescription>Age: {selectedStudent.age} • Student ID: {selectedStudent.id}</CardDescription>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-2 mt-4 md:mt-0">
                <Select defaultValue="current">
                  <SelectTrigger className="w-full md:w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Term</SelectItem>
                    <SelectItem value="q1-2025">Q1 2025</SelectItem>
                    <SelectItem value="q4-2024">Q4 2024</SelectItem>
                    <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>View History</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
                <TabsTrigger value="reports">Previous Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Progress Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                          data={progressData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorReading" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorWriting" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Area type="monotone" dataKey="reading" stroke="#3B82F6" fillOpacity={1} fill="url(#colorReading)" />
                          <Area type="monotone" dataKey="writing" stroke="#10B981" fillOpacity={1} fill="url(#colorWriting)" />
                        </AreaChart>
                      </ResponsiveContainer>
                      
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={progressData.filter((_, index) => index % 2 === 0)}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="math" fill="#8884d8" />
                          <Bar dataKey="social" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Key Areas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Academic Skills</h4>
                          <Badge variant="outline" className="bg-ablelyf-blue-50 text-ablelyf-blue-700">+15%</Badge>
                        </div>
                        <Progress value={65} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Showing improvement in reading comprehension and math problem-solving.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Social Skills</h4>
                          <Badge variant="outline" className="bg-green-50 text-green-700">+20%</Badge>
                        </div>
                        <Progress value={60} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Increased participation in group activities and peer interactions.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Communication</h4>
                          <Badge variant="outline" className="bg-ablelyf-blue-50 text-ablelyf-blue-700">+12%</Badge>
                        </div>
                        <Progress value={70} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Improved verbal expression and listening comprehension.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Self-Regulation</h4>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700">+8%</Badge>
                        </div>
                        <Progress value={55} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Working on emotional regulation techniques and attention span.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Teacher Notes</h3>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm">
                        Alex has shown significant growth this term in both academic and social areas. 
                        Reading fluency has improved, and Alex is now more comfortable participating in 
                        small group discussions. Continue to work on math word problems and written 
                        expression. Alex benefits from visual supports and short breaks during longer 
                        tasks.
                      </p>
                      <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                        <span>Last updated: April 5, 2025</span>
                        <Button variant="outline" size="sm">Edit Notes</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="goals">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Current Goals & Objectives</h3>
                    <Button 
                      onClick={() => setShowAddGoal(true)}
                      className="gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Goal</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {mockGoals.map((goal) => (
                      <Card key={goal.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <Badge>{goal.type}</Badge>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Progress: </span>
                              <span className="font-medium">{Math.round((goal.current - goal.baseline) / (goal.target - goal.baseline) * 100)}%</span>
                            </div>
                          </div>
                          <CardTitle className="text-base mt-2">{goal.description}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-full">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Baseline: {goal.baseline}%</span>
                                  <span>Target: {goal.target}%</span>
                                </div>
                                <div className="relative pt-1">
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                                    <div
                                      className="bg-ablelyf-blue-500 h-full"
                                      style={{ width: `${goal.current}%` }}
                                    ></div>
                                  </div>
                                  <div 
                                    className="absolute h-4 w-0.5 bg-gray-400 top-0"
                                    style={{ left: `${goal.target}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Progress Notes</h4>
                              <ul className="text-sm space-y-1">
                                {goal.notes.map((note, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-ablelyf-blue-500">•</span>
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex justify-between items-center pt-2 text-xs text-muted-foreground">
                              <span>Created: {new Date(goal.createdAt).toLocaleDateString()}</span>
                              <Button variant="ghost" size="sm" className="gap-1 h-7">
                                <span>Update Progress</span>
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reports">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Previous Reports</h3>
                    <div className="flex gap-2">
                      <Input 
                        type="search"
                        placeholder="Search reports..."
                        className="w-[200px]"
                      />
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        <span>Export All</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {reports
                      .filter(report => report.studentId === selectedStudent.id)
                      .map((report) => (
                        <div key={report.id} className="p-4 border rounded-lg">
                          <div className="flex flex-col md:flex-row justify-between mb-3">
                            <div>
                              <h4 className="font-medium flex items-center gap-2">
                                <FileText className="h-4 w-4 text-ablelyf-blue-500" />
                                <span>{report.period} Progress Report</span>
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Generated: {new Date(report.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge 
                              className={`mt-2 md:mt-0 self-start md:self-center ${
                                report.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                              }`}
                            >
                              {report.status === 'completed' ? 'Completed' : 'Draft'}
                            </Badge>
                          </div>
                          <p className="text-sm">{report.overview}</p>
                          <div className="flex justify-end gap-2 mt-3">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Download</Button>
                          </div>
                        </div>
                      ))
                    }
                    
                    {reports.filter(report => report.studentId === selectedStudent.id).length === 0 && (
                      <div className="text-center p-8 border rounded-lg">
                        <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="font-medium">No Previous Reports</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          There are no previous reports available for this student.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Goal for {selectedStudent.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-type" className="text-right">
                  Goal Type
                </Label>
                <Select
                  value={newGoal.type}
                  onValueChange={(value) => setNewGoal({ ...newGoal, type: value })}
                >
                  <SelectTrigger className="col-span-3" id="goal-type">
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="goal-description"
                  placeholder="Describe the goal..."
                  className="col-span-3"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Progress</Label>
                <div className="col-span-3 grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="baseline" className="text-sm text-muted-foreground">
                      Baseline (%)
                    </Label>
                    <Input
                      id="baseline"
                      type="number"
                      min="0"
                      max="100"
                      value={newGoal.baseline}
                      onChange={(e) => setNewGoal({ ...newGoal, baseline: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="target" className="text-sm text-muted-foreground">
                      Target (%)
                    </Label>
                    <Input
                      id="target"
                      type="number"
                      min="0"
                      max="100"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-notes" className="text-right">
                  Initial Notes
                </Label>
                <Textarea
                  id="goal-notes"
                  placeholder="Any initial observations or notes..."
                  className="col-span-3"
                  value={newGoal.notes}
                  onChange={(e) => setNewGoal({ ...newGoal, notes: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddGoal}
                className="bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600"
              >
                Add Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default ProgressReportsPage;
