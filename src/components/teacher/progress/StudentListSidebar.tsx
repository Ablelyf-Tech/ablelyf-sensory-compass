
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Student {
  id: number;
  name: string;
  grade: string;
  status: string;
  goals: any[];
  attendance: any;
  behavior: any[];
  academics: any;
  reportDue: string;
}

interface StudentListSidebarProps {
  students: Student[];
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  getStatusColor: (status: string) => string;
}

const StudentListSidebar: React.FC<StudentListSidebarProps> = ({
  students,
  selectedStudent,
  setSelectedStudent,
  getStatusColor
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>Select a student to view progress details</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {students.length === 0 ? (
            <div className="p-4 text-center">
              <p>No students match your search criteria.</p>
            </div>
          ) : (
            students.map(student => (
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
  );
};

export default StudentListSidebar;
