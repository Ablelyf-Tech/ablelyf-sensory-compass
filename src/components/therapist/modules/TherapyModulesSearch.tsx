
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface TherapyModulesSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const TherapyModulesSearch: React.FC<TherapyModulesSearchProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search therapy tools..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" className="sm:w-auto">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
    </div>
  );
};
