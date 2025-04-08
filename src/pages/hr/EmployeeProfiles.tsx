
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, UserPlus, Briefcase, Users } from 'lucide-react';

const EmployeeProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock employee data
  const employees = [
    { id: 1, name: 'Alex Johnson', position: 'Marketing Manager', department: 'Marketing', accommodations: 'Flexible hours, noise-canceling headphones' },
    { id: 2, name: 'Sam Taylor', position: 'Software Engineer', department: 'Engineering', accommodations: 'Quiet workspace, screen reader' },
    { id: 3, name: 'Jordan Smith', position: 'HR Specialist', department: 'Human Resources', accommodations: 'Standing desk, specialized keyboard' },
    { id: 4, name: 'Casey Brown', position: 'Project Manager', department: 'Operations', accommodations: 'Reduced meeting time, written instructions' },
    { id: 5, name: 'Morgan Lee', position: 'Financial Analyst', department: 'Finance', accommodations: 'Sensory-friendly lighting, flexible breaks' },
  ];

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employee Profiles</h1>
        <p className="text-muted-foreground">
          Manage employee profiles and accommodation needs
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search employees..." 
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
            Add Employee
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger value="accommodations">With Accommodations</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredEmployees.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No employees match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredEmployees.map(employee => (
              <Card key={employee.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{employee.name}</CardTitle>
                      <CardDescription>{employee.position} • {employee.department}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-sm text-muted-foreground">Accommodations:</strong>
                      <p>{employee.accommodations}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="accommodations" className="space-y-4 mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing employees with accommodation plans.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4 mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing recently updated employee profiles.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeProfiles;
