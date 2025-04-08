
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CameraModule } from '@/components/camera/CameraModule';
import { useAuth } from '@/contexts/AuthContext';
import { SessionHeader } from '@/components/video-session/SessionHeader';
import { SessionChat } from '@/components/video-session/SessionChat';
import { SessionInfo } from '@/components/video-session/SessionInfo';
import { SessionNotes } from '@/components/video-session/SessionNotes';
import { getSessionParticipants, getRoleSpecificNotes, UserRole } from '@/components/video-session/RoleSpecificHelper';

const VideoSession: React.FC = () => {
  const { currentUser } = useAuth();
  const role = (currentUser?.role || 'therapist') as UserRole;
  
  const participants = getSessionParticipants(role, currentUser?.name);
  const notes = getRoleSpecificNotes(role);

  return (
    <AppLayout>
      <SessionHeader role={role} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CameraModule role={role as any} />
          <SessionChat participants={participants} />
        </div>
        
        <div className="space-y-6">
          <SessionInfo participants={participants} />
          <SessionNotes notes={notes} />
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoSession;
