
import React from 'react';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { CategoryToolsTemplate } from '@/components/therapist/tools/CategoryToolsTemplate';
import { getTherapyTools } from '@/data/therapyToolsData';

const Behavioral = () => {
  // Get featured behavioral tools
  const featuredTools = getTherapyTools()
    .filter(tool => tool.category === 'behavioral')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Behavioral Resources</h1>
        <p className="text-muted-foreground">
          Behavior management strategies and intervention tools.
        </p>
      </div>

      <TherapyToolsNavigation />

      <CategoryToolsTemplate
        title="Behavioral Tools"
        description="Behavior management systems, positive reinforcement tools, and intervention strategies for supporting positive behavior."
        category="behavioral"
        featuredTools={featuredTools}
      />
    </div>
  );
};

export default Behavioral;
