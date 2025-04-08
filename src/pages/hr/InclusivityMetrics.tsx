
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const InclusivityMetrics = () => {
  // Mock data for charts
  const accommodationTypeData = [
    { name: 'Sensory', value: 35 },
    { name: 'Cognitive', value: 25 },
    { name: 'Physical', value: 20 },
    { name: 'Communication', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const departmentData = [
    { name: 'Engineering', count: 12 },
    { name: 'Marketing', count: 8 },
    { name: 'HR', count: 5 },
    { name: 'Operations', count: 10 },
    { name: 'Finance', count: 7 },
    { name: 'Executive', count: 3 },
  ];

  const trainingData = [
    { name: 'Jan', value: 15 },
    { name: 'Feb', value: 22 },
    { name: 'Mar', value: 28 },
    { name: 'Apr', value: 35 },
    { name: 'May', value: 42 },
    { name: 'Jun', value: 50 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inclusivity Metrics</h1>
        <p className="text-muted-foreground">
          Monitor and analyze workplace inclusivity and accommodation statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Accommodation Types</CardTitle>
            <CardDescription>
              Distribution of accommodation types across the organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accommodationTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {accommodationTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accommodations by Department</CardTitle>
            <CardDescription>
              Number of accommodation plans per department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Training Completion</CardTitle>
            <CardDescription>
              Number of employees who completed inclusivity training over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trainingData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
            <CardDescription>
              Key metrics about workplace accommodations and inclusivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">45</h3>
                <p className="text-sm text-muted-foreground">Active Accommodation Plans</p>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">78%</h3>
                <p className="text-sm text-muted-foreground">Training Completion Rate</p>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">12</h3>
                <p className="text-sm text-muted-foreground">New Plans This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InclusivityMetrics;
