
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { patients } from '@/data/mockData';
import { Search, Filter, Plus, User, Calendar, FileText, MoreHorizontal } from 'lucide-react';
import { PatientIntakeForm } from '@/components/therapist/PatientIntakeForm';

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewProfile = (patientId: string) => {
    console.log(`Viewing patient profile: ${patientId}`);
    // Navigating to a specific patient profile is not implemented yet
    // navigate(`/patients/${patientId}`);
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-ablelyf-blue-900">Patients</h1>
          <p className="text-muted-foreground">Manage your patient caseload</p>
        </div>
        <PatientIntakeForm />
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search patients..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="border border-border">
            <CardContent className="p-0">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-ablelyf-blue-100 text-ablelyf-blue-600 h-12 w-12 rounded-full flex items-center justify-center font-semibold text-lg">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                    </div>
                  </div>
                  <Badge className={
                    patient.condition && patient.condition[0] === 'Autism Spectrum Disorder' 
                      ? 'bg-blue-100 text-blue-800 border-blue-200' 
                      : patient.condition && patient.condition[0] === 'ADHD'
                      ? 'bg-orange-100 text-orange-800 border-orange-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }>
                    {patient.condition && patient.condition[0]}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Last session: 5 days ago</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Active therapy goals: 3</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewProfile(patient.id)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default Patients;
