
import React from 'react';

export const GoalProgress: React.FC = () => {
  return (
    <div className="bg-ablelyf-green-50 rounded-md p-4">
      <h3 className="font-medium mb-2">Session Goal Progress</h3>
      <div className="space-y-2 mt-3">
        <div>
          <div className="flex justify-between text-sm">
            <span>Goal 1: Communication</span>
            <span>85%</span>
          </div>
          <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
            <div className="bg-ablelyf-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm">
            <span>Goal 2: Engagement</span>
            <span>70%</span>
          </div>
          <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
            <div className="bg-ablelyf-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm">
            <span>Goal 3: Skills Practice</span>
            <span>62%</span>
          </div>
          <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '62%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
