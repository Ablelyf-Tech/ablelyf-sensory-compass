
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ProgressData } from '@/types';

interface ProgressChartProps {
  data: ProgressData[];
  title: string;
  categories: string[];
}

interface FormattedProgressData {
  date: string;
  [key: string]: string | number;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, title, categories }) => {
  const formatData = (): FormattedProgressData[] => {
    const groupedByDate: Record<string, Record<string, number>> = {};
    
    // Group data by date and category
    data.forEach((item) => {
      if (!groupedByDate[item.date]) {
        groupedByDate[item.date] = {};
      }
      groupedByDate[item.date][item.category] = item.value;
    });
    
    // Transform to array format for Recharts
    return Object.keys(groupedByDate).map((date) => {
      const entry: FormattedProgressData = { date };
      categories.forEach((category) => {
        entry[category] = groupedByDate[date][category] || 0;
      });
      return entry;
    });
  };

  const formattedData = formatData();
  
  // Generate colors for each category
  const getLineColor = (index: number) => {
    const colors = ['#4A6FA5', '#6A9B6A', '#ADB5BD', '#7BADDA', '#A0CEA0'];
    return colors[index % colors.length];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="date" stroke="#6C757D" fontSize={12} />
              <YAxis stroke="#6C757D" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F8F9FA', 
                  borderColor: '#DEE2E6', 
                  borderRadius: '4px' 
                }} 
              />
              <Legend />
              {categories.map((category, index) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  stroke={getLineColor(index)}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
