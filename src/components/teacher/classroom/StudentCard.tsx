
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Student } from './types';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const handleViewProfile = (studentId: number) => {
    toast.success(`Viewing profile for student ID: ${studentId}`);
  };

  const handleTrackProgress = (studentId: number) => {
    toast.success(`Tracking progress for student ID: ${studentId}`);
  };

  const handleAddNote = (studentId: number) => {
    toast.success(`Adding note for student ID: ${studentId}`);
  };

  const getStatusColor = (status: string) => {
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
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
        <Button variant="secondary" size="sm" onClick={() => handleViewProfile(student.id)}>
          <Eye className="mr-2 h-4 w-4" />
          View Profile
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleTrackProgress(student.id)}>
          Track Progress
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleAddNote(student.id)}>
          Add Note
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
