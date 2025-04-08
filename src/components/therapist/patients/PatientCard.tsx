
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types';
import { User, Calendar, FileText, MoreHorizontal } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  onViewProfile: (patientId: string) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onViewProfile }) => {
  return (
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
              onClick={() => onViewProfile(patient.id)}
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
  );
};
