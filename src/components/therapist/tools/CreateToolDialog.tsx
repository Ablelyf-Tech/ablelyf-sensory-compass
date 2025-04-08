
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ToolCreationForm } from './ToolCreationForm';

interface CreateToolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateToolDialog: React.FC<CreateToolDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Therapy Tool</DialogTitle>
          <DialogDescription>
            Upload an existing tool or generate a new one using AI
          </DialogDescription>
        </DialogHeader>
        <ToolCreationForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};
