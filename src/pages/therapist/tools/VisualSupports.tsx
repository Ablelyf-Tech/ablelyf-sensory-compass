
import React from 'react';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { CategoryToolsTemplate } from '@/components/therapist/tools/CategoryToolsTemplate';
import { getTherapyTools } from '@/data/therapyToolsData';

const VisualSupports = () => {
  // Get featured visual support tools
  const featuredTools = getTherapyTools()
    .filter(tool => tool.category === 'visual')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visual Supports</h1>
        <p className="text-muted-foreground">
          Visual aids and resources to support communication and understanding.
        </p>
      </div>

      <TherapyToolsNavigation />

      <CategoryToolsTemplate
        title="Visual Supports"
        description="Visual schedules, communication boards, social stories, and other visual support tools for enhancing understanding and communication."
        category="visual"
        featuredTools={featuredTools}
      />
    </div>
  );
};

export default VisualSupports;
