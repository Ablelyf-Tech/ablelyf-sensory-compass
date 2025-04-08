
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { patients } from '@/data/mockData';
import { PatientIntakeForm } from '@/components/therapist/PatientIntakeForm';
import { PatientSearchBar } from '@/components/therapist/patients/PatientSearchBar';
import { PatientsList } from '@/components/therapist/patients/PatientsList';

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
      
      <PatientSearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <PatientsList 
        patients={filteredPatients} 
        onViewProfile={handleViewProfile} 
      />
    </AppLayout>
  );
};

export default Patients;
