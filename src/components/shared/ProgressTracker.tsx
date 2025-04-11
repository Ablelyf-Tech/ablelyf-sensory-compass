
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressItem {
  label: string;
  value: number;
  target?: number;
  color?: string;
}

interface ProgressTrackerProps {
  title: string;
  description?: string;
  items: ProgressItem[];
  className?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  title,
  description,
  items,
  className
}) => {
  // Default colors if not provided
  const defaultColors = [
    "bg-ablelyf-blue-500",
    "bg-ablelyf-green-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-rose-500"
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="pb-4 pt-2">
        <div className="space-y-4">
          {items.map((item, index) => {
            const percentage = item.target 
              ? Math.min(100, Math.round((item.value / item.target) * 100))
              : item.value;
            
            const color = item.color || defaultColors[index % defaultColors.length];
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span>
                    {item.target 
                      ? `${item.value}/${item.target} (${percentage}%)`
                      : `${percentage}%`}
                  </span>
                </div>
                <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2">
                  <div 
                    className={`${color} h-2 rounded-full`} 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
