
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiagnosticAssessment } from '@/components/therapist/diagnostic/DiagnosticAssessment';
import { TherapyToolsLibrary } from '@/components/therapist/diagnostic/TherapyToolsLibrary';

const DiagnosticTools: React.FC = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ablelyf-blue-900">Diagnostic & Therapy Tools</h1>
        <p className="text-muted-foreground">
          Assess conditions and discover appropriate therapy tools for your patients
        </p>
      </div>

      <Tabs defaultValue="assessment" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="assessment">Diagnostic Assessment</TabsTrigger>
          <TabsTrigger value="tools">Therapy Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment">
          <DiagnosticAssessment />
        </TabsContent>
        
        <TabsContent value="tools">
          <TherapyToolsLibrary />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default DiagnosticTools;
