
import React from 'react';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { CategoryToolsTemplate } from '@/components/therapist/tools/CategoryToolsTemplate';
import { getTherapyTools } from '@/data/therapyToolsData';

const SensoryProcessing = () => {
  // Get featured sensory processing tools
  const featuredTools = getTherapyTools()
    .filter(tool => tool.category === 'sensory')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sensory Processing Resources</h1>
        <p className="text-muted-foreground">
          Tools and activities for sensory integration and regulation.
        </p>
      </div>

      <TherapyToolsNavigation />

      <CategoryToolsTemplate
        title="Sensory Processing Tools"
        description="Sensory diet activities, sensory integration resources, and environmental adaptation tools for sensory needs."
        category="sensory"
        featuredTools={featuredTools}
      />
    </div>
  );
};

export default SensoryProcessing;
