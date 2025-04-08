
import React from 'react';
import { MonitorSmartphone } from 'lucide-react';

interface AiInsightsPanelProps {
  aiInsights: string[];
}

export const AiInsightsPanel: React.FC<AiInsightsPanelProps> = ({ aiInsights }) => {
  return (
    <div className="bg-ablelyf-blue-50 rounded-md p-4">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <MonitorSmartphone size={16} /> AI Insights
      </h3>
      <ul className="space-y-2">
        {aiInsights.map((insight, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="bg-ablelyf-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
              {index + 1}
            </span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
