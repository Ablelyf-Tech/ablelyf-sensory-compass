
import React from 'react';

export const SpeechAnalysis: React.FC = () => {
  return (
    <div className="bg-ablelyf-neutral-100 rounded-md p-4">
      <h3 className="font-medium mb-2">Speech Analysis</h3>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-sm">
            <span>Clarity</span>
            <span>78%</span>
          </div>
          <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
            <div className="bg-ablelyf-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm">
            <span>Engagement</span>
            <span>92%</span>
          </div>
          <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
            <div className="bg-ablelyf-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
