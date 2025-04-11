
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StudentCard from './StudentCard';
import { Student } from './types';

interface StudentsListProps {
  students: Student[];
  emptyMessage?: string;
}

const StudentsList: React.FC<StudentsListProps> = ({ 
  students, 
  emptyMessage = 'No students match your search criteria.' 
}) => {
  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center">
          <p>{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
};

export default StudentsList;
