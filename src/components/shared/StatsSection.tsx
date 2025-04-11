
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatItemProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string | number;
    positive: boolean;
  };
  color?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  title,
  value,
  icon: Icon,
  change,
  color = "bg-ablelyf-blue-100 text-ablelyf-blue-800"
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-2">{value}</h4>
            {change && (
              <p
                className={`text-xs mt-1 ${
                  change.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {change.positive ? "+" : "-"}{change.value}{" "}
                <span className="text-muted-foreground">from previous period</span>
              </p>
            )}
          </div>
          <div className={`${color} p-2 rounded-md`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsSectionProps {
  stats: StatItemProps[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  columns = 4,
  className
}) => {
  return (
    <div className={className}>
      <div
        className={`grid gap-4 ${
          columns === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : columns === 3
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};
