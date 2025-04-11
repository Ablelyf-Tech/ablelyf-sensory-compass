
import React, { useState } from "react";
import { PageTemplate } from "@/components/shared/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchAndFilter } from "@/components/shared/SearchAndFilter";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Bar, 
  Line, 
  Pie, 
  Cell 
} from "recharts";
import { DateRange } from "react-day-picker";

// Mock data
const userActivityData = [
  { name: "Jan", therapists: 65, caregivers: 40, teachers: 30, hr: 25 },
  { name: "Feb", therapists: 70, caregivers: 45, teachers: 32, hr: 28 },
  { name: "Mar", therapists: 68, caregivers: 50, teachers: 35, hr: 30 },
  { name: "Apr", therapists: 75, caregivers: 55, teachers: 40, hr: 32 },
  { name: "May", therapists: 80, caregivers: 60, teachers: 45, hr: 35 },
  { name: "Jun", therapists: 85, caregivers: 65, teachers: 48, hr: 38 },
];

const systemPerformanceData = [
  { name: "Week 1", responseTime: 120, uptime: 99.8, errors: 5 },
  { name: "Week 2", responseTime: 110, uptime: 99.9, errors: 3 },
  { name: "Week 3", responseTime: 115, uptime: 99.7, errors: 7 },
  { name: "Week 4", responseTime: 105, uptime: 99.9, errors: 2 },
  { name: "Week 5", responseTime: 100, uptime: 100, errors: 0 },
  { name: "Week 6", responseTime: 95, uptime: 99.8, errors: 4 },
];

const roleDistributionData = [
  { name: "Therapists", value: 120, color: "#0088FE" },
  { name: "Caregivers", value: 180, color: "#00C49F" },
  { name: "Teachers", value: 80, color: "#FFBB28" },
  { name: "HR", value: 40, color: "#FF8042" },
  { name: "Admin", value: 20, color: "#8884d8" },
];

const SystemMetrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleDateFilter = (range: DateRange | undefined) => {
    setDateRange(range);
    // In a real app, you would filter the data based on the date range
    console.log("Date filter applied:", range);
  };

  const handleSearch = (term: string) => {
    // In a real app, you would filter the data based on the search term
    console.log("Search term:", term);
  };

  return (
    <PageTemplate title="System Metrics" description="Monitor system performance and usage statistics">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <SearchAndFilter
            onSearch={handleSearch}
            searchPlaceholder="Search metrics..."
            showDateFilter={true}
            onDateFilter={handleDateFilter}
          />
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">System Performance</TabsTrigger>
            <TabsTrigger value="users">User Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Users</CardTitle>
                  <CardDescription>Active users in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">440</div>
                  <div className="text-xs text-muted-foreground">
                    +8% from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>System Uptime</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-xs text-green-500">
                    0.1% better than target
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Avg. Response Time</CardTitle>
                  <CardDescription>API endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">110ms</div>
                  <div className="text-xs text-green-500">
                    15% faster than last month
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Role Distribution</CardTitle>
                <CardDescription>
                  User distribution by role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roleDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {roleDistributionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>
                  Response time, uptime, and errors over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={systemPerformanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="responseTime"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="uptime"
                        stroke="#82ca9d"
                      />
                      <Line
                        type="monotone"
                        dataKey="errors"
                        stroke="#ff7300"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Resource Usage</CardTitle>
                  <CardDescription>CPU, Memory, and Disk</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">CPU Usage</span>
                        <span className="text-sm">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: "68%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Disk Usage</span>
                        <span className="text-sm">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-600 h-2.5 rounded-full"
                          style={{ width: "32%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error Breakdown</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-md">
                      <div>
                        <div className="font-medium">API Timeout</div>
                        <div className="text-sm text-muted-foreground">
                          8 occurrences
                        </div>
                      </div>
                      <div className="text-red-500 text-sm font-medium">
                        40%
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
                      <div>
                        <div className="font-medium">Authentication Errors</div>
                        <div className="text-sm text-muted-foreground">
                          6 occurrences
                        </div>
                      </div>
                      <div className="text-yellow-500 text-sm font-medium">
                        30%
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                      <div>
                        <div className="font-medium">Database Connections</div>
                        <div className="text-sm text-muted-foreground">
                          4 occurrences
                        </div>
                      </div>
                      <div className="text-blue-500 text-sm font-medium">
                        20%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                  Monthly active users by role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userActivityData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="therapists"
                        name="Therapists"
                        fill="#8884d8"
                      />
                      <Bar
                        dataKey="caregivers"
                        name="Caregivers"
                        fill="#82ca9d"
                      />
                      <Bar
                        dataKey="teachers"
                        name="Teachers"
                        fill="#ffc658"
                      />
                      <Bar dataKey="hr" name="HR" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Active Users</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="font-medium">Dr. Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">
                          Therapist
                        </div>
                      </div>
                      <div className="text-blue-500 text-sm font-medium">
                        85 sessions
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="font-medium">Michael Davis</div>
                        <div className="text-sm text-muted-foreground">
                          Caregiver
                        </div>
                      </div>
                      <div className="text-blue-500 text-sm font-medium">
                        72 logins
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="font-medium">Emma Wilson</div>
                        <div className="text-sm text-muted-foreground">
                          Teacher
                        </div>
                      </div>
                      <div className="text-blue-500 text-sm font-medium">
                        64 reports
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage</CardTitle>
                  <CardDescription>Most used app features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Video Sessions
                        </span>
                        <span className="text-sm">520 uses</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Progress Tracking
                        </span>
                        <span className="text-sm">410 uses</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Therapy Tools
                        </span>
                        <span className="text-sm">380 uses</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-600 h-2.5 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          Alerts System
                        </span>
                        <span className="text-sm">290 uses</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-600 h-2.5 rounded-full"
                          style={{ width: "55%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default SystemMetrics;
