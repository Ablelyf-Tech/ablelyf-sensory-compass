
import React from 'react';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { CategoryToolsTemplate } from '@/components/therapist/tools/CategoryToolsTemplate';
import { getTherapyTools } from '@/data/therapyToolsData';

const Communication = () => {
  // Get featured communication tools
  const featuredTools = getTherapyTools()
    .filter(tool => tool.category === 'communication')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Communication Tools</h1>
        <p className="text-muted-foreground">
          Speech and language development resources for therapeutic intervention.
        </p>
      </div>

      <TherapyToolsNavigation />

      <CategoryToolsTemplate
        title="Communication Tools"
        description="Speech therapy resources, language development activities, and AAC tools to support verbal and non-verbal communication."
        category="communication"
        featuredTools={featuredTools}
      />
    </div>
  );
};

export default Communication;
