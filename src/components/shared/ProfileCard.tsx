
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "./StatusBadge";
import { BadgeCheck, Calendar, Clock, Mail, MapPin, Phone, User } from "lucide-react";
import { ViewButton, EditButton } from "./ActionButtons";

interface ProfileCardProps {
  name: string;
  role?: string;
  status?: "active" | "inactive" | "pending";
  email?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  lastActivity?: string;
  nextSession?: string;
  badges?: string[];
  onView?: () => void;
  onEdit?: () => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  status = "active",
  email,
  phone,
  location,
  avatarUrl,
  lastActivity,
  nextSession,
  badges = [],
  onView,
  onEdit,
  className
}) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              {role && <p className="text-sm text-muted-foreground">{role}</p>}
            </div>
          </div>
          {status && <StatusBadge status={status} />}
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-2">
        <div className="space-y-3">
          {email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{email}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{phone}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{location}</span>
            </div>
          )}
          
          {lastActivity && (
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Last activity: {lastActivity}</span>
            </div>
          )}
          
          {nextSession && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Next session: {nextSession}</span>
            </div>
          )}
          
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center text-xs bg-ablelyf-blue-50 text-ablelyf-blue-800 px-2 py-1 rounded-full">
                  <BadgeCheck className="h-3 w-3 mr-1" />
                  {badge}
                </div>
              ))}
            </div>
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
