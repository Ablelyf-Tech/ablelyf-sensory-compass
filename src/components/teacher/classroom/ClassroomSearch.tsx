
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import StudentDetailForm from './StudentDetailForm';
import { StudentFormValues } from './StudentDetailForm';

interface ClassroomSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddStudent?: (student: StudentFormValues) => void;
}

const ClassroomSearch: React.FC<ClassroomSearchProps> = ({ 
  searchTerm, 
  setSearchTerm,
  onAddStudent 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddStudent = () => {
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (data: StudentFormValues) => {
    if (onAddStudent) {
      onAddStudent(data);
    } else {
      // Fallback if no handler is provided
      toast.success('Student added successfully!');
      console.log('New student data:', data);
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
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
          <Button className="sm:w-auto" onClick={handleAddStudent}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <StudentDetailForm 
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClassroomSearch;
