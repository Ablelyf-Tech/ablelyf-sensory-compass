
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DiagnosticAssessment } from '@/components/therapist/diagnostic/DiagnosticAssessment';
import { TherapyToolsLibrary } from '@/components/therapist/diagnostic/TherapyToolsLibrary';

const DiagnosticTools = () => {
  const [activeTab, setActiveTab] = useState('assessment');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Diagnostic Tools</h1>
        <p className="text-muted-foreground">
          Comprehensive evaluation and therapy resources for personalized patient care.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="assessment">Diagnostic Assessment</TabsTrigger>
          <TabsTrigger value="tools">Therapy Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Assessment</CardTitle>
              <CardDescription>
                Create and manage comprehensive diagnostic assessments for patients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DiagnosticAssessment />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Therapy Tools Library</CardTitle>
              <CardDescription>
                Browse and select specialized tools and resources for various therapy approaches.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TherapyToolsLibrary />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiagnosticTools;
