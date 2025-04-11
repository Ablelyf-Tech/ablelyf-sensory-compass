
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = 
  | "success" 
  | "warning" 
  | "error" 
  | "info" 
  | "pending" 
  | "completed" 
  | "inprogress" 
  | "cancelled"
  | "active"
  | "inactive";

const statusStyles: Record<StatusType, string> = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  inprogress: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200"
};

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label, 
  className 
}) => {
  // If no label is provided, use the status with first letter capitalized
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <Badge 
      variant="outline" 
      className={cn(statusStyles[status], className)}
    >
      {displayLabel}
    </Badge>
  );
};
