
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';

interface ProgressReportsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleNewReport: () => void;
}

const ProgressReportsSearch: React.FC<ProgressReportsSearchProps> = ({
  searchTerm,
  setSearchTerm,
  handleNewReport
}) => {
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
        <Button className="sm:w-auto" onClick={handleNewReport}>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>
    </div>
  );
};

export default ProgressReportsSearch;
