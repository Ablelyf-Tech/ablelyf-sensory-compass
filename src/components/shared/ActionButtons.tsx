
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Save, 
  Trash, 
  Edit, 
  X, 
  Eye, 
  Download, 
  Calendar, 
  Check,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

// Primary action buttons
export const AddButton = ({ 
  onClick, 
  children = "Add New" 
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
}) => (
  <Button onClick={onClick} className="bg-ablelyf-blue-500">
    <PlusCircle className="mr-2 h-4 w-4" />
    {children}
  </Button>
);

export const SaveButton = ({ 
  onClick,
  isSubmitting = false,
  type = "button",
  className = "",
  children = "Save"
}: { 
  onClick?: () => void; 
  isSubmitting?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
}) => (
  <Button 
    onClick={onClick} 
    disabled={isSubmitting}
    type={type}
    className={`bg-ablelyf-blue-500 ${className}`}
  >
    <Save className="mr-2 h-4 w-4" />
    {isSubmitting ? "Saving..." : children}
  </Button>
);

export const DeleteButton = ({ 
  onClick, 
  children = "Delete",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    variant="destructive"
    className={className}
  >
    <Trash className="mr-2 h-4 w-4" />
    {children}
  </Button>
);

export const EditButton = ({ 
  onClick, 
  children = "Edit",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    variant="outline"
    className={className}
  >
    <Edit className="mr-2 h-4 w-4" />
    {children}
  </Button>
);

export const CancelButton = ({ 
  onClick, 
  children = "Cancel",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    variant="outline"
    className={className}
  >
    <X className="mr-2 h-4 w-4" />
    {children}
  </Button>
);

export const ViewButton = ({ 
  onClick, 
  children = "View",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    variant="outline"
    className={className}
  >
    <Eye className="mr-2 h-4 w-4" />
    {children}
  </Button>
);

export const DownloadButton = ({ 
  onClick, 
  children = "Download",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    variant="outline"
    className={className}
  >
    <Download className="mr-2 h-4 w-4" />
    {children}
  </Button>
);

export const ScheduleButton = ({ 
  onClick, 
  children = "Schedule",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    className={`bg-ablelyf-green-500 ${className}`}
  >
    <Calendar className="mr-2 h-4 w-4" />
    {children}
  </Button>
);

export const CompleteButton = ({ 
  onClick, 
  children = "Complete",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    className={`bg-ablelyf-green-500 ${className}`}
  >
    <Check className="mr-2 h-4 w-4" />
    {children}
  </Button>
);

// Navigation buttons
export const NextButton = ({ 
  onClick, 
  children = "Next",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    className={`bg-ablelyf-blue-500 ${className}`}
  >
    {children}
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
);

export const PreviousButton = ({ 
  onClick, 
  children = "Previous",
  className = ""
}: { 
  onClick: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button 
    onClick={onClick} 
    variant="outline"
    className={className}
  >
    <ArrowLeft className="mr-2 h-4 w-4" />
    {children}
  </Button>
);
