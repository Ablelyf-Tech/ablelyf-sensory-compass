
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface ClassroomSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ClassroomSearch: React.FC<ClassroomSearchProps> = ({ searchTerm, setSearchTerm }) => {
  const handleAddStudent = () => {
    toast.success('Add student functionality coming soon!');
  };

  return (
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
  );
};

export default ClassroomSearch;
