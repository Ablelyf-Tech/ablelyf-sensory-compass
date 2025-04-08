
import React from 'react';
import { Users } from 'lucide-react';

interface SessionStatisticsProps {
  aiSentiment: 'positive' | 'neutral' | 'negative';
}

export const SessionStatistics: React.FC<SessionStatisticsProps> = ({ aiSentiment }) => {
  return (
    <div className="bg-ablelyf-neutral-100 rounded-md p-4">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <Users size={16} /> Session Statistics
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-md">
          <p className="text-xs text-ablelyf-neutral-500">Duration</p>
          <p className="text-xl font-medium">24:18</p>
        </div>
        <div className="bg-white p-3 rounded-md">
          <p className="text-xs text-ablelyf-neutral-500">Interactions</p>
          <p className="text-xl font-medium">17</p>
        </div>
        <div className="bg-white p-3 rounded-md">
          <p className="text-xs text-ablelyf-neutral-500">Response Rate</p>
          <p className="text-xl font-medium">92%</p>
        </div>
        <div className="bg-white p-3 rounded-md">
          <p className="text-xs text-ablelyf-neutral-500">Sentiment</p>
          <p className="text-xl font-medium capitalize">{aiSentiment}</p>
        </div>
      </div>
    </div>
  );
};
