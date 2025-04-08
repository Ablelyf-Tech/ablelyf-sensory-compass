
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Book, Search, Plus, Users, Calendar, FileText } from 'lucide-react';

const students = [
  { id: '1', name: 'Alex Johnson', age: 8, attendance: '90%', profile: '/placeholder.svg' },
  { id: '2', name: 'Jamie Smith', age: 7, attendance: '85%', profile: '/placeholder.svg' },
  { id: '3', name: 'Taylor Brown', age: 9, attendance: '95%', profile: '/placeholder.svg' },
  { id: '4', name: 'Jordan Williams', age: 8, attendance: '88%', profile: '/placeholder.svg' },
  { id: '5', name: 'Casey Davis', age: 7, attendance: '92%', profile: '/placeholder.svg' },
  { id: '6', name: 'Riley Wilson', age: 9, attendance: '78%', profile: '/placeholder.svg' },
];

const activities = [
  { id: '1', title: 'Morning Circle', time: '9:00 AM', type: 'group', status: 'completed' },
  { id: '2', title: 'Sensory Break', time: '10:30 AM', type: 'individual', status: 'completed' },
  { id: '3', title: 'Reading Session', time: '11:15 AM', type: 'group', status: 'in-progress' },
  { id: '4', title: 'Lunch', time: '12:00 PM', type: 'group', status: 'upcoming' },
  { id: '5', title: 'Therapy Integration', time: '1:00 PM', type: 'individual', status: 'upcoming' },
  { id: '6', title: 'Art Project', time: '2:15 PM', type: 'group', status: 'upcoming' },
];

const ClassroomPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Classroom</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Button className="gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600">
              <Plus className="h-4 w-4" />
              <span>Add Student</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Students</span>
                <Badge variant="outline" className="ml-2">{students.length}</Badge>
              </CardTitle>
              <CardDescription>
                Students enrolled in your classroom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {students.map((student) => (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex gap-3 items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.profile} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">Age: {student.age}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{student.attendance}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center justify-between p-3 rounded-md border"
                    >
                      <div className="flex gap-3 items-center">
                        <div className={`p-2 rounded-full 
                          ${activity.type === 'group' ? 'bg-ablelyf-blue-50' : 'bg-purple-50'}`
                        }>
                          {activity.type === 'group' ? 
                            <Users className="h-4 w-4 text-ablelyf-blue-500" /> : 
                            <Book className="h-4 w-4 text-purple-500" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <Badge 
                        className={`
                          ${activity.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          ${activity.status === 'in-progress' ? 'bg-ablelyf-blue-100 text-ablelyf-blue-800 hover:bg-ablelyf-blue-100' : ''}
                          ${activity.status === 'upcoming' ? 'bg-gray-100 text-gray-800 hover:bg-gray-100' : ''}
                        `}
                      >
                        {activity.status === 'completed' ? 'Completed' : ''}
                        {activity.status === 'in-progress' ? 'In Progress' : ''}
                        {activity.status === 'upcoming' ? 'Upcoming' : ''}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="announcements">
              <TabsList className="mb-4">
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
              </TabsList>
              <TabsContent value="announcements">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium">Field Trip Next Week</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          We'll be visiting the Science Museum next Friday. Please return permission slips by Wednesday.
                        </p>
                        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                          <span>Posted: April 1, 2025</span>
                          <Badge variant="outline">Important</Badge>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium">Parent-Teacher Conferences</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Conferences will be held April 15-16. Sign up for your preferred time slot by April 10th.
                        </p>
                        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                          <span>Posted: March 28, 2025</span>
                          <Badge variant="outline">Upcoming</Badge>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium">New Sensory Room Hours</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          The sensory room is now available during lunch periods for students who need a quiet space.
                        </p>
                        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                          <span>Posted: March 25, 2025</span>
                          <Badge variant="outline">Update</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Classroom Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg flex flex-col">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-ablelyf-blue-50 rounded-full">
                            <FileText className="h-4 w-4 text-ablelyf-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Visual Schedule Templates</h3>
                            <p className="text-xs text-muted-foreground">PDF, 2.3 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 self-end">
                          Download
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex flex-col">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-ablelyf-blue-50 rounded-full">
                            <FileText className="h-4 w-4 text-ablelyf-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Social Stories Collection</h3>
                            <p className="text-xs text-muted-foreground">PDF, 4.1 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 self-end">
                          Download
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex flex-col">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-ablelyf-blue-50 rounded-full">
                            <FileText className="h-4 w-4 text-ablelyf-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Sensory Activities Guide</h3>
                            <p className="text-xs text-muted-foreground">PDF, 1.8 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 self-end">
                          Download
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex flex-col">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-ablelyf-blue-50 rounded-full">
                            <FileText className="h-4 w-4 text-ablelyf-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Communication Cards</h3>
                            <p className="text-xs text-muted-foreground">PDF, 3.5 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 self-end">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="assignments">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Reading Response Journal</h3>
                          <Badge>Due: Apr 10</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete at least 3 journal entries about the book we're reading in class.
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-muted-foreground">Assigned: Apr 3</span>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Math Practice Worksheets</h3>
                          <Badge>Due: Apr 8</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete pages 24-26 in your math workbook.
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-muted-foreground">Assigned: Apr 5</span>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Science Project</h3>
                          <Badge>Due: Apr 15</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Create a poster about your favorite animal and its habitat.
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-muted-foreground">Assigned: Apr 1</span>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClassroomPage;
