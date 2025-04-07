
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TherapyPlan } from '@/types';
import { FileText, CheckCircle } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface TherapyPlanCardProps {
  plan: TherapyPlan;
}

export const TherapyPlanCard: React.FC<TherapyPlanCardProps> = ({ plan }) => {
  const calculateOverallProgress = () => {
    if (plan.goals.length === 0) return 0;
    
    const totalProgress = plan.goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / plan.goals.length);
  };
  
  const completedGoals = plan.goals.filter(goal => goal.status === 'achieved').length;
  const totalGoals = plan.goals.length;
  const overallProgress = calculateOverallProgress();
  
  const getTimeLeft = () => {
    if (!plan.endDate) return 'No end date';
    
    const now = new Date();
    const endDate = new Date(plan.endDate);
    
    if (now > endDate) return 'Overdue';
    
    return formatDistance(endDate, now, { addSuffix: true });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <FileText size={16} className="text-ablelyf-blue-500" />
          {plan.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {completedGoals} of {totalGoals} goals completed
            </span>
            <span className="text-muted-foreground">
              {getTimeLeft()}
            </span>
          </div>
          
          <div className="space-y-2">
            {plan.goals.slice(0, 3).map(goal => (
              <div key={goal.id} className="flex items-start gap-2 text-sm">
                {goal.status === 'achieved' ? (
                  <CheckCircle size={16} className="text-ablelyf-green-500 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-ablelyf-neutral-300 mt-0.5" />
                )}
                <span className={goal.status === 'achieved' ? 'line-through text-muted-foreground' : ''}>
                  {goal.title}
                </span>
              </div>
            ))}
            {plan.goals.length > 3 && (
              <div className="text-xs text-ablelyf-blue-500 pl-6">
                +{plan.goals.length - 3} more goals
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
