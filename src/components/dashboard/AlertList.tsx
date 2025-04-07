
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { AlertData } from '@/types';
import { cn } from '@/lib/utils';

interface AlertListProps {
  alerts: AlertData[];
  onResolve: (alertId: string) => void;
}

export const AlertList: React.FC<AlertListProps> = ({ alerts, onResolve }) => {
  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'bg-ablelyf-green-100 text-ablelyf-green-800 border-ablelyf-green-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-ablelyf-neutral-100 text-ablelyf-neutral-800 border-ablelyf-neutral-200';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-ablelyf-blue-500" />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li 
                key={alert.id} 
                className={cn(
                  "p-3 rounded-md border",
                  alert.resolved 
                    ? "bg-ablelyf-neutral-100 border-ablelyf-neutral-200" 
                    : getSeverityColor(alert.severity)
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={
                        cn(
                          "font-normal capitalize",
                          !alert.resolved && alert.severity === 'high' ? "animate-pulse" : ""
                        )
                      }>
                        {alert.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(alert.timestamp)}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm",
                      alert.resolved ? "text-muted-foreground" : ""
                    )}>
                      {alert.message}
                    </p>
                  </div>
                  {!alert.resolved && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 px-2 text-ablelyf-green-600 hover:text-ablelyf-green-700 hover:bg-ablelyf-green-100"
                      onClick={() => onResolve(alert.id)}
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Resolve
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No alerts at the moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
