
import { CalendarEvent, CalendarEventType } from '@/types';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Book, 
  Users, 
  FileText,
  Activity
} from 'lucide-react';

export const getEventTypeIcon = (type: CalendarEventType) => {
  switch (type) {
    case 'therapy':
      return <AlertTriangle className="h-4 w-4" />;
    case 'doctor':
      return <Activity className="h-4 w-4" />;
    case 'school':
      return <Book className="h-4 w-4" />;
    case 'activity':
      return <Users className="h-4 w-4" />;
    case 'medication':
      return <AlertTriangle className="h-4 w-4" />;
    case 'session':
      return <Clock className="h-4 w-4" />;
    case 'assessment':
      return <FileText className="h-4 w-4" />;
    case 'meeting':
      return <Users className="h-4 w-4" />;
    case 'reminder':
      return <Clock className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

export const getEventTypeColor = (type: CalendarEventType): string => {
  switch (type) {
    case 'therapy':
      return 'bg-ablelyf-blue-500';
    case 'doctor':
      return 'bg-ablelyf-green-500';
    case 'school':
      return 'bg-amber-500';
    case 'activity':
      return 'bg-purple-500';
    case 'medication':
      return 'bg-red-500';
    case 'session':
      return 'bg-indigo-500';
    case 'assessment':
      return 'bg-emerald-500';
    case 'meeting':
      return 'bg-orange-500';
    case 'reminder':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

export const getEventTypeBadgeClass = (type: CalendarEventType): string => {
  switch (type) {
    case 'therapy':
      return 'bg-ablelyf-blue-100 text-ablelyf-blue-800 border-ablelyf-blue-200';
    case 'doctor':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'school':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'activity':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'medication':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'session':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'assessment':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'meeting':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'reminder':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatTimeRange = (startTime?: string, endTime?: string): string => {
  if (!startTime) return '';
  
  return endTime ? `${startTime} - ${endTime}` : startTime;
};

export const hasEvents = (date: Date, events: CalendarEvent[]): boolean => {
  return events.some(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
};

export const getEventsForDate = (date: Date, events: CalendarEvent[]): CalendarEvent[] => {
  return events.filter(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  ).sort((a, b) => {
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return a.startTime.localeCompare(b.startTime);
  });
};
