
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Video, Calendar, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const VideoSessionWidget: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const getUpcomingSessions = () => {
    switch (currentUser?.role) {
      case 'therapist':
        return [
          { id: 1, name: 'Alex Morgan', time: '2:00 PM', type: 'Therapy Session' },
          { id: 2, name: 'Mia Johnson', time: 'Tomorrow, 10:00 AM', type: 'Assessment' }
        ];
      case 'caregiver':
        return [
          { id: 1, name: 'Dr. Williams', time: '4:30 PM', type: 'Check-in' }
        ];
      case 'teacher':
        return [
          { id: 1, name: 'Special Ed Team', time: '3:15 PM', type: 'IEP Review' }
        ];
      case 'hr':
        return [
          { id: 1, name: 'James Wilson', time: '11:00 AM', type: 'Accommodation Review' }
        ];
      case 'admin':
        return [
          { id: 1, name: 'Department Heads', time: '9:00 AM', type: 'Weekly Sync' }
        ];
      default:
        return [];
    }
  };
  
  const handleStartSession = () => {
    navigate('/video-session');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-ablelyf-blue-600" />
          <span>Video Sessions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Upcoming Sessions</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-ablelyf-blue-600 border-ablelyf-blue-200"
              onClick={() => navigate('/calendar')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          
          {getUpcomingSessions().length > 0 ? (
            <div className="space-y-3">
              {getUpcomingSessions().map(session => (
                <div key={session.id} className="flex justify-between items-center bg-ablelyf-blue-50 p-3 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="bg-white rounded-full p-2 mt-1">
                      <Clock size={16} className="text-ablelyf-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{session.name}</p>
                      <p className="text-xs text-muted-foreground">{session.time} - {session.type}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-ablelyf-blue-500"
                    onClick={handleStartSession}
                  >
                    Join
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-ablelyf-neutral-100 rounded-md p-4 text-center">
              <p className="text-muted-foreground text-sm">No upcoming sessions</p>
            </div>
          )}
          
          <Button 
            className="w-full bg-ablelyf-green-500 hover:bg-ablelyf-green-600"
            onClick={handleStartSession}
          >
            <Video className="h-4 w-4 mr-2" />
            Start New Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
