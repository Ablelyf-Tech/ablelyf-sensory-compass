
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { patients } from '@/data/mockData';
import { PatientIntakeForm } from '@/components/therapist/PatientIntakeForm';
import { PatientSearchBar } from '@/components/therapist/patients/PatientSearchBar';
import { PatientsList } from '@/components/therapist/patients/PatientsList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCondition, setActiveCondition] = React.useState('all');
  
  // Extract unique conditions from patients
  const allConditions = [...new Set(patients.flatMap(patient => patient.condition))];
  
  // Filter patients based on search term and active condition
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = activeCondition === 'all' || patient.condition.includes(activeCondition);
    return matchesSearch && matchesCondition;
  });
  
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
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveCondition}>
        <TabsList className="w-full flex-wrap mb-2 bg-transparent p-0 justify-start">
          <TabsTrigger 
            value="all" 
            className="px-4 py-2 bg-white border rounded-md mr-2 mb-2 data-[state=active]:bg-ablelyf-blue-500 data-[state=active]:text-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            All Patients
          </TabsTrigger>
          
          {allConditions.map(condition => (
            <TabsTrigger 
              key={condition} 
              value={condition}
              className="px-4 py-2 bg-white border rounded-md mr-2 mb-2 data-[state=active]:bg-ablelyf-blue-500 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              {condition}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeCondition} className="mt-0 p-0">
          <PatientSearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <PatientsList 
            patients={filteredPatients} 
            onViewProfile={handleViewProfile} 
          />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Patients;
