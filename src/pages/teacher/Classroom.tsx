
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Plus, Users, UserPlus, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Classroom = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock student data
  const students = [
    { 
      id: 1, 
      name: 'Jamie Rodriguez', 
      age: 9,
      grade: '3rd Grade',
      accommodations: ['Visual supports', 'Noise-canceling headphones', 'Movement breaks'],
      status: 'Active IEP',
      lastAssessment: '2025-03-15'
    },
    { 
      id: 2, 
      name: 'Taylor Wilson', 
      age: 8,
      grade: '3rd Grade',
      accommodations: ['Extended time', 'Preferential seating', 'Written instructions'],
      status: 'Active 504',
      lastAssessment: '2025-03-01'
    },
    { 
      id: 3, 
      name: 'Alex Chen', 
      age: 9,
      grade: '3rd Grade',
      accommodations: ['Visual schedule', 'Fidget tools', 'Check-in system'],
      status: 'Under Evaluation',
      lastAssessment: '2025-04-02'
    },
    { 
      id: 4, 
      name: 'Jordan Santos', 
      age: 8,
      grade: '3rd Grade',
      accommodations: ['Simplified directions', 'Frequent breaks', 'Sensory tools'],
      status: 'Active IEP',
      lastAssessment: '2025-02-20'
    },
    { 
      id: 5, 
      name: 'Riley Kim', 
      age: 9,
      grade: '3rd Grade',
      accommodations: ['Visual timer', 'Alternate workspace', 'Movement opportunities'],
      status: 'Active 504',
      lastAssessment: '2025-03-10'
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

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Classroom Management</h1>
        <p className="text-muted-foreground">
          Manage your classroom and student accommodations
        </p>
      </div>

      <div className="flex justify-between flex-wrap gap-2">
        <Card className="w-full md:w-[49%] lg:w-[24%]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">26</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[49%] lg:w-[24%]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">8</div>
            <div className="text-sm text-muted-foreground">Students with IEPs</div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[49%] lg:w-[24%]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">5</div>
            <div className="text-sm text-muted-foreground">Students with 504s</div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[49%] lg:w-[24%]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">3</div>
            <div className="text-sm text-muted-foreground">Under Evaluation</div>
          </CardContent>
        </Card>
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
          <Button className="sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="iep">IEP</TabsTrigger>
          <TabsTrigger value="504">504 Plan</TabsTrigger>
          <TabsTrigger value="evaluation">Under Evaluation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No students match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredStudents.map(student => (
              <Card key={student.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <CardDescription>{student.age} years old • {student.grade}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-sm text-muted-foreground">Accommodations:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student.accommodations.map((accommodation, index) => (
                          <Badge key={index} variant="outline">{accommodation}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last assessment: {student.lastAssessment}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-1">
                  <Button variant="secondary" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Track Progress
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Note
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="iep" className="space-y-4 mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing students with active IEPs.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="504" className="space-y-4 mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing students with 504 plans.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evaluation" className="space-y-4 mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing students currently under evaluation.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Classroom;
