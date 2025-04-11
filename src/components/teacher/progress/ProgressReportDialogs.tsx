
import React from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import ReportForm from './ReportForm';
import GoalForm from './GoalForm';
import { Goal, ProgressReport } from '@/components/teacher/classroom/types';

interface ProgressReportDialogsProps {
  isNewReportOpen: boolean;
  setIsNewReportOpen: (isOpen: boolean) => void;
  isAddGoalOpen: boolean;
  setIsAddGoalOpen: (isOpen: boolean) => void;
  isEditGoalOpen: boolean;
  setIsEditGoalOpen: (isOpen: boolean) => void;
  currentGoal: Goal | null;
  selectedStudent: any;
  students: any[];
  handleReportSubmit: (data: any) => void;
  handleGoalSubmit: (data: any) => void;
  handleEditGoalSubmit: (data: any) => void;
}

const ProgressReportDialogs: React.FC<ProgressReportDialogsProps> = ({
  isNewReportOpen,
  setIsNewReportOpen,
  isAddGoalOpen,
  setIsAddGoalOpen,
  isEditGoalOpen,
  setIsEditGoalOpen,
  currentGoal,
  selectedStudent,
  students,
  handleReportSubmit,
  handleGoalSubmit,
  handleEditGoalSubmit
}) => {
  return (
    <>
      {/* New Report Dialog */}
      <Dialog open={isNewReportOpen} onOpenChange={setIsNewReportOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Progress Report</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <ReportForm
              students={students.map(s => ({ id: s.id, name: s.name }))}
              onSubmit={handleReportSubmit}
              onCancel={() => setIsNewReportOpen(false)}
              studentId={selectedStudent.id}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Goal Dialog */}
      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <GoalForm
              studentId={selectedStudent.id}
              onSubmit={handleGoalSubmit}
              onCancel={() => setIsAddGoalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Goal Dialog */}
      <Dialog open={isEditGoalOpen} onOpenChange={setIsEditGoalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          {selectedStudent && currentGoal && (
            <GoalForm
              goal={currentGoal}
              studentId={selectedStudent.id}
              onSubmit={handleEditGoalSubmit}
              onCancel={() => {
                setIsEditGoalOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProgressReportDialogs;
