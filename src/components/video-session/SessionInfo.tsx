
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';

interface Participant {
  name: string;
  role: string;
  status: string;
  isCurrentUser?: boolean;
}

interface SessionInfoProps {
  participants: Participant[];
}

export const SessionInfo: React.FC<SessionInfoProps> = ({ participants }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Session Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-ablelyf-blue-50 p-3 rounded-md flex items-center gap-3">
          <Clock className="text-ablelyf-blue-500" size={20} />
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p className="text-xs text-muted-foreground">Started 24 minutes ago</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Users size={16} /> Participants
          </h3>
          
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-md bg-ablelyf-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-ablelyf-blue-200 flex items-center justify-center text-ablelyf-blue-700">
                  {participant.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{participant.name}</p>
                  <p className="text-xs text-muted-foreground">{participant.role}</p>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`${
                  participant.status === 'online' 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}
              >
                {participant.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
