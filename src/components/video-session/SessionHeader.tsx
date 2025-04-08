
import React from 'react';
import { SessionNotesForm } from '@/components/therapist/SessionNotesForm';

interface SessionHeaderProps {
  role: string;
}

export const SessionHeader: React.FC<SessionHeaderProps> = ({ role }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-ablelyf-blue-900">Video Session</h1>
        <p className="text-ablelyf-blue-700">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      {role === 'therapist' && <SessionNotesForm />}
    </div>
  );
};
