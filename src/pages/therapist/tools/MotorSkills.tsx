
import React from 'react';
import { TherapyToolsNavigation } from '@/components/therapist/tools/TherapyToolsNavigation';
import { CategoryToolsTemplate } from '@/components/therapist/tools/CategoryToolsTemplate';
import { getTherapyTools } from '@/data/therapyToolsData';

const MotorSkills = () => {
  // Get featured motor skills tools
  const featuredTools = getTherapyTools()
    .filter(tool => tool.category === 'motor')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Motor Skills</h1>
        <p className="text-muted-foreground">
          Resources and activities to support fine and gross motor development.
        </p>
      </div>

      <TherapyToolsNavigation />

      <CategoryToolsTemplate
        title="Motor Skills Tools"
        description="Fine and gross motor activities, handwriting programs, and coordination exercises to support physical development."
        category="motor"
        featuredTools={featuredTools}
      />
    </div>
  );
};

export default MotorSkills;
