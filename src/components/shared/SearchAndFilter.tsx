
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Filter, Search, Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";

interface FilterOption {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

interface SearchAndFilterProps {
  onSearch: (term: string) => void;
  searchPlaceholder?: string;
  filterOptions?: FilterOption[];
  onFilter?: (filters: Record<string, string>) => void;
  onDateFilter?: (dates: DateRange | undefined) => void;
  showDateFilter?: boolean;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  searchPlaceholder = "Search...",
  filterOptions = [],
  onFilter,
  onDateFilter,
  showDateFilter = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilterChange = (id: string, value: string) => {
    const newFilters = { ...filters, [id]: value };
    setFilters(newFilters);
    if (onFilter) onFilter(newFilters);
  };

  const handleDateSelection = (range: DateRange | undefined) => {
    setDateRange(range);
    if (onDateFilter) onDateFilter(range);
  };

  const clearFilters = () => {
    setFilters({});
    setDateRange(undefined);
    if (onFilter) onFilter({});
    if (onDateFilter) onDateFilter(undefined);
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || (dateRange && dateRange.from);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-0 top-0 h-full"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {(filterOptions.length > 0 || showDateFilter) && (
          <div className="flex gap-2">
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  {hasActiveFilters ? "Filters Applied" : "Filter"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filters</h4>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-8 px-2 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear filters
                      </Button>
                    )}
                  </div>

                  {filterOptions.map((option) => (
                    <div key={option.id} className="space-y-1">
                      <label className="text-sm font-medium">
                        {option.label}
                      </label>
                      <Select
                        value={filters[option.id] || ""}
                        onValueChange={(value) =>
                          handleFilterChange(option.id, value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={`Select ${option.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {option.options.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}

                  {showDateFilter && (
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Date Range</label>
                      <div className="rounded-md border">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={handleDateSelection}
                          className="p-3 pointer-events-auto"
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full bg-ablelyf-blue-500"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {showDateFilter && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="sm:w-auto">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="end">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateSelection}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {Object.entries(filters).map(([key, value]) => {
            const filterOption = filterOptions.find((o) => o.id === key);
            const optionLabel = filterOption?.options.find(
              (o) => o.value === value
            )?.label;
            
            return (
              <div
                key={key}
                className="flex items-center bg-ablelyf-blue-50 text-ablelyf-blue-800 px-2 py-1 rounded-full text-xs"
              >
                <span>
                  {filterOption?.label}: {optionLabel}
                </span>
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => {
                    const newFilters = { ...filters };
                    delete newFilters[key];
                    setFilters(newFilters);
                    if (onFilter) onFilter(newFilters);
                  }}
                />
              </div>
            );
          })}
          
          {dateRange && dateRange.from && (
            <div className="flex items-center bg-ablelyf-blue-50 text-ablelyf-blue-800 px-2 py-1 rounded-full text-xs">
              <span>
                Date: {dateRange.from.toLocaleDateString()} to{" "}
                {dateRange.to ? dateRange.to.toLocaleDateString() : "Any"}
              </span>
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => {
                  setDateRange(undefined);
                  if (onDateFilter) onDateFilter(undefined);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
