
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Plus, Search, Edit, MoreVertical } from 'lucide-react';
import { patients } from '@/data/mockData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Patients: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientAction = (action: string, patientName: string) => {
    toast({
      title: `${action} patient`,
      description: `${action} ${patientName} selected`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">Manage your patient profiles and therapy plans</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Patient</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-auto md:flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Patients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">New Referrals</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="overflow-hidden">
              <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-start justify-between space-y-0">
                <div className="flex gap-3 items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://avatar.vercel.sh/${patient.id}`} alt={patient.name} />
                    <AvatarFallback>
                      <User size={18} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handlePatientAction('View', patient.name)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePatientAction('Edit', patient.name)}>
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePatientAction('Schedule', patient.name)}>
                      Schedule Session
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-muted-foreground">Diagnosis:</p>
                        <p className="font-medium">{patient.condition?.join(', ') || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Since:</p>
                        <p className="font-medium">{patient.diagnosisDate || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => handlePatientAction('View', patient.name)}
                    >
                      <Edit size={14} className="mr-1" />
                      Create Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Patients;
