
import React from 'react';
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, FileText, Download, Calendar } from 'lucide-react';

interface StudentDetailPanelProps {
  selectedStudent: any;
  selectedReportType: string;
  setSelectedReportType: (type: string) => void;
  goalProgressData: any[];
  attendanceData: any[];
  academicData: any[];
  handleGenerateReport: () => void;
}

const StudentDetailPanel: React.FC<StudentDetailPanelProps> = ({
  selectedStudent,
  selectedReportType,
  setSelectedReportType,
  goalProgressData,
  attendanceData,
  academicData,
  handleGenerateReport
}) => {
  if (!selectedStudent) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Select a Student</h3>
          <p className="text-muted-foreground">
            Please select a student from the list to view their progress details.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
};

export default StudentDetailPanel;
