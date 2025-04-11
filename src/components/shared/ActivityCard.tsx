
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock, User } from "lucide-react";
import { ViewButton, EditButton } from "./ActionButtons";

interface ActivityCardProps {
  title: string;
  type?: string;
  date?: string;
  time?: string;
  duration?: string;
  status?: "pending" | "completed" | "inprogress" | "cancelled";
  participant?: string;
  description?: string;
  onView?: () => void;
  onEdit?: () => void;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  type,
  date,
  time,
  duration,
  status = "pending",
  participant,
  description,
  onView,
  onEdit,
  className
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {type && <p className="text-sm text-muted-foreground">{type}</p>}
          </div>
          {status && <StatusBadge status={status} />}
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-2">
        <div className="space-y-3">
          {date && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{date}</span>
              {time && <span className="ml-2">{time}</span>}
              {duration && <span className="ml-2">({duration})</span>}
            </div>
          )}
          
          {participant && (
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{participant}</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          
          {(onView || onEdit) && (
            <div className="flex gap-2 mt-4">
              {onView && <ViewButton onClick={onView} className="flex-1" />}
              {onEdit && <EditButton onClick={onEdit} className="flex-1" />}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
