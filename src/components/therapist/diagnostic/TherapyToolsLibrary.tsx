
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Filter, BookOpen, Brain, BarChart } from 'lucide-react';
import { TherapyTool, ConditionArea, ConditionSeverity } from '@/types/diagnostic';
import { therapyTools } from '@/data/diagnosticData';

export const TherapyToolsLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<ConditionArea | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<ConditionSeverity | 'all'>('all');
  
  const filteredTools = therapyTools.filter(tool => {
    // Search term filter
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Area filter
    const matchesArea = 
      selectedArea === 'all' || 
      tool.targetAreas.includes(selectedArea as ConditionArea);
    
    // Severity filter
    const matchesSeverity = 
      selectedSeverity === 'all' || 
      tool.suitableSeverities.includes(selectedSeverity as ConditionSeverity);
    
    return matchesSearch && matchesArea && matchesSeverity;
  });

  const areas: ConditionArea[] = ['communication', 'sensory', 'social', 'behavioral', 'cognitive', 'motor'];
  const severities: ConditionSeverity[] = ['mild', 'moderate', 'severe'];

  const getSeverityColor = (severity: ConditionSeverity) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'severe': return 'bg-red-100 text-red-800 border-red-200';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ablelyf-blue-900">Therapy Tools Library</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search therapy tools..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="default" className="flex-1 bg-ablelyf-blue-500">
            <FileText className="mr-2 h-4 w-4" />
            Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Target Area</h3>
                <div className="space-y-1">
                  <div 
                    className={`px-3 py-2 rounded-md cursor-pointer hover:bg-ablelyf-blue-50 ${
                      selectedArea === 'all' ? 'bg-ablelyf-blue-100 text-ablelyf-blue-900' : ''
                    }`}
                    onClick={() => setSelectedArea('all')}
                  >
                    All Areas
                  </div>
                  {areas.map(area => (
                    <div 
                      key={area} 
                      className={`px-3 py-2 rounded-md cursor-pointer hover:bg-ablelyf-blue-50 capitalize ${
                        selectedArea === area ? 'bg-ablelyf-blue-100 text-ablelyf-blue-900' : ''
                      }`}
                      onClick={() => setSelectedArea(area)}
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Severity Level</h3>
                <div className="space-y-1">
                  <div 
                    className={`px-3 py-2 rounded-md cursor-pointer hover:bg-ablelyf-neutral-50 ${
                      selectedSeverity === 'all' ? 'bg-ablelyf-neutral-100 text-ablelyf-neutral-900' : ''
                    }`}
                    onClick={() => setSelectedSeverity('all')}
                  >
                    All Levels
                  </div>
                  {severities.map(severity => (
                    <div 
                      key={severity} 
                      className={`px-3 py-2 rounded-md cursor-pointer hover:bg-ablelyf-neutral-50 capitalize ${
                        selectedSeverity === severity ? 'bg-ablelyf-neutral-100 text-ablelyf-neutral-900' : ''
                      }`}
                      onClick={() => setSelectedSeverity(severity)}
                    >
                      {severity}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Available Tools ({filteredTools.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTools.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No tools found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTools.map(tool => (
                    <TherapyToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface TherapyToolCardProps {
  tool: TherapyTool;
}

const TherapyToolCard: React.FC<TherapyToolCardProps> = ({ tool }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="bg-ablelyf-blue-100 rounded-full p-1">
            <Brain className="h-4 w-4 text-ablelyf-blue-800" />
          </div>
          {tool.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.targetAreas.map(area => (
            <Badge key={area} variant="outline" className="bg-ablelyf-blue-50 capitalize">
              {area}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.suitableSeverities.map(severity => (
            <Badge 
              key={severity} 
              variant="outline" 
              className={`capitalize ${
                severity === 'mild' ? 'bg-green-50 text-green-800' :
                severity === 'moderate' ? 'bg-amber-50 text-amber-800' :
                'bg-red-50 text-red-800'
              }`}
            >
              {severity}
            </Badge>
          ))}
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Instructions</h4>
              <p className="text-sm">{tool.instructions}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Evidence Base</h4>
              <p className="text-sm">{tool.evidenceBase}</p>
            </div>
            
            {tool.resources.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-1">Resources</h4>
                <ul className="text-sm space-y-1">
                  {tool.resources.map((resource, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FileText className="h-3 w-3 text-ablelyf-blue-500" />
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-ablelyf-blue-600 hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-3 pt-3 border-t">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
