
import React from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, 
  CardDescription, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Edit, Trash, Plus } from 'lucide-react';
import { Goal } from '@/components/teacher/classroom/types';

interface StudentGoalsListProps {
  selectedStudent: any;
  handleAddGoal: () => void;
  handleUpdateProgress: (goalId: number) => void;
  handleDeleteGoal: (goalId: number) => void;
}

const StudentGoalsList: React.FC<StudentGoalsListProps> = ({
  selectedStudent,
  handleAddGoal,
  handleUpdateProgress,
  handleDeleteGoal
}) => {
  if (!selectedStudent) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Progress Toward Goals</h3>
        <Button size="sm" variant="outline" onClick={handleAddGoal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>
      
      {selectedStudent.goals.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No goals have been set for this student yet.</p>
            <Button className="mt-4" onClick={handleAddGoal}>Add First Goal</Button>
          </CardContent>
        </Card>
      ) : (
        selectedStudent.goals.map((goal: Goal) => (
          <Card key={goal.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{goal.name}</CardTitle>
              <CardDescription className="text-sm">{goal.target}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleUpdateProgress(goal.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Update
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteGoal(goal.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default StudentGoalsList;
