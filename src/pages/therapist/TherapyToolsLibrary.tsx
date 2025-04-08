
import React from 'react';
import { TherapyToolsLibrary as TherapyToolsLibraryComponent } from '@/components/therapist/diagnostic/TherapyToolsLibrary';

const TherapyToolsLibrary = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Therapy Tools Library</h1>
        <p className="text-muted-foreground">
          Discover and download a comprehensive collection of therapy tools and resources
        </p>
      </div>
      
      <TherapyToolsLibraryComponent />
    </div>
  );
};

export default TherapyToolsLibrary;
