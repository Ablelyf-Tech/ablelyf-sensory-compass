
import React from 'react';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { CategoryToolsTemplate } from '@/components/therapist/tools/CategoryToolsTemplate';
import { getTherapyTools } from '@/data/therapyToolsData';

const CognitiveSkills = () => {
  // Get featured cognitive skills tools
  const featuredTools = getTherapyTools()
    .filter(tool => tool.category === 'cognitive')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cognitive Skills Resources</h1>
        <p className="text-muted-foreground">
          Tools for supporting problem-solving and executive functioning skills.
        </p>
      </div>

      <TherapyToolsNavigation />

      <CategoryToolsTemplate
        title="Cognitive Skills Tools"
        description="Executive function activities, problem-solving worksheets, and cognitive development resources to support thinking skills."
        category="cognitive"
        featuredTools={featuredTools}
      />
    </div>
  );
};

export default CognitiveSkills;
