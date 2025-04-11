
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ClassroomHeaderProps {
  stats: {
    total: number;
    iep: number;
    plan504: number;
    evaluation: number;
  };
}

const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({ stats }) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Classroom Management</h1>
        <p className="text-muted-foreground">
          Manage your classroom and student accommodations
        </p>
      </div>

      <div className="flex justify-between flex-wrap gap-2">
        <Card className="w-full md:w-[49%] lg:w-[24%]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[49%] lg:w-[24%]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">{stats.iep}</div>
            <div className="text-sm text-muted-foreground">Students with IEPs</div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[49%] lg:w-[24%]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">{stats.plan504}</div>
            <div className="text-sm text-muted-foreground">Students with 504s</div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[49%] lg:w-[24%]">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-1">{stats.evaluation}</div>
            <div className="text-sm text-muted-foreground">Under Evaluation</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ClassroomHeader;
