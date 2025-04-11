
import React from 'react';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { CategoryToolsTemplate } from '@/components/therapist/tools/CategoryToolsTemplate';
import { getTherapyTools } from '@/data/therapyToolsData';

const SocialSkills = () => {
  // Get featured social skills tools
  const featuredTools = getTherapyTools()
    .filter(tool => tool.category === 'social')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Skills Resources</h1>
        <p className="text-muted-foreground">
          Tools and activities for teaching and reinforcing social interaction skills.
        </p>
      </div>

      <TherapyToolsNavigation />

      <CategoryToolsTemplate
        title="Social Skills Tools"
        description="Social stories, friendship curricula, and interactive activities to develop social understanding and interaction skills."
        category="social"
        featuredTools={featuredTools}
      />
    </div>
  );
};

export default SocialSkills;
