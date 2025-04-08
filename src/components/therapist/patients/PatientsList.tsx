
import React from 'react';
import { Patient } from '@/types';
import { PatientCard } from './PatientCard';

interface PatientsListProps {
  patients: Patient[];
  onViewProfile: (patientId: string) => void;
}

export const PatientsList: React.FC<PatientsListProps> = ({ patients, onViewProfile }) => {
  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No patients found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {patients.map((patient) => (
        <PatientCard 
          key={patient.id} 
          patient={patient} 
          onViewProfile={onViewProfile} 
        />
      ))}
    </div>
  );
};
