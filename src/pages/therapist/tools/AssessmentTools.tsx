
import React from 'react';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { CategoryToolsTemplate } from '@/components/therapist/tools/CategoryToolsTemplate';
import { getTherapyTools } from '@/data/therapyToolsData';

const AssessmentTools = () => {
  // Get featured assessment tools
  const featuredTools = getTherapyTools()
    .filter(tool => tool.category === 'assessment')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assessment Tools</h1>
        <p className="text-muted-foreground">
          Comprehensive evaluation and screening tools for therapeutic assessment.
        </p>
      </div>

      <TherapyToolsNavigation />

      <CategoryToolsTemplate
        title="Assessment Tools"
        description="Standardized assessment tools, evaluation forms, and screening measures for various developmental domains."
        category="assessment"
        featuredTools={featuredTools}
      />
    </div>
  );
};

export default AssessmentTools;
