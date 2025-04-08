
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Plus, FileText, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AccommodationPlans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock accommodation plans data
  const plans = [
    { 
      id: 1, 
      employeeName: 'Alex Johnson', 
      department: 'Marketing', 
      accommodations: ['Flexible hours', 'Noise-canceling headphones', 'Written instructions'],
      status: 'Active',
      lastUpdated: '2025-03-15'
    },
    { 
      id: 2, 
      employeeName: 'Sam Taylor', 
      department: 'Engineering', 
      accommodations: ['Quiet workspace', 'Screen reader', 'Ergonomic keyboard'],
      status: 'Active',
      lastUpdated: '2025-03-10'
    },
    { 
      id: 3, 
      employeeName: 'Jordan Smith', 
      department: 'Human Resources', 
      accommodations: ['Standing desk', 'Specialized keyboard', 'Speech recognition software'],
      status: 'Under Review',
      lastUpdated: '2025-04-02'
    },
    { 
      id: 4, 
      employeeName: 'Casey Brown', 
      department: 'Operations', 
      accommodations: ['Reduced meeting time', 'Written instructions', 'Regular breaks'],
      status: 'Active',
      lastUpdated: '2025-02-28'
    },
  ];

  // Filter plans based on search term
  const filteredPlans = plans.filter(plan => 
    plan.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Accommodation Plans</h1>
        <p className="text-muted-foreground">
          Create and manage workplace accommodation plans for employees
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search accommodation plans..." 
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
            <Plus className="mr-2 h-4 w-4" />
            Create Plan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Plans</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="review">Under Review</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredPlans.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <p>No accommodation plans match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredPlans.map(plan => (
              <Card key={plan.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{plan.employeeName}</CardTitle>
                      <CardDescription>{plan.department} • Last updated: {plan.lastUpdated}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-sm text-muted-foreground">Accommodations:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {plan.accommodations.map((accommodation, index) => (
                          <Badge key={index} variant="outline">{accommodation}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing active accommodation plans.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="review" className="space-y-4 mt-4">
          <Card>
            <CardContent className="py-6 text-center">
              <p>Showing plans under review.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccommodationPlans;
