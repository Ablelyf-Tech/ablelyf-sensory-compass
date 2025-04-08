
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Save, Calendar as CalendarIcon, FileText, Share, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DailyLog = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  
  // Mock log data
  const logs = [
    { 
      id: '1',
      date: '2025-04-07',
      title: 'Good day overall',
      mood: 'Happy',
      sleep: '8 hours',
      sensoryIssues: ['Noise sensitivity during lunch', 'Texture sensitivity with new shirt'],
      notes: 'Had a great morning routine. Enjoyed outdoor play time. Some challenges during lunch with cafeteria noise.'
    },
    { 
      id: '2',
      date: '2025-04-06',
      title: 'Difficult afternoon',
      mood: 'Frustrated',
      sleep: '7 hours',
      sensoryIssues: ['Overwhelmed by classroom noise', 'Difficulty with transitions'],
      notes: 'Morning went smoothly but had challenges in the afternoon. Used calming strategies with moderate success.'
    },
    { 
      id: '3',
      date: '2025-04-05',
      title: 'Weekend activities',
      mood: 'Calm',
      sleep: '9 hours',
      sensoryIssues: ['Some texture issues with food'],
      notes: 'Relaxed weekend day. Participated in favorite activities. Limited screen time helped with regulation.'
    }
  ];

  const getMoodColor = (mood) => {
    const colors = {
      'Happy': 'bg-green-100 text-green-800 border-green-200',
      'Calm': 'bg-blue-100 text-blue-800 border-blue-200',
      'Frustrated': 'bg-amber-100 text-amber-800 border-amber-200',
      'Overwhelmed': 'bg-red-100 text-red-800 border-red-200',
      'Tired': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[mood] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Log</h1>
        <p className="text-muted-foreground">
          Track daily behaviors, sensory experiences, and progress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view or create a log</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar 
                mode="single" 
                selected={date} 
                onSelect={setDate} 
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Logs</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {logs.map(log => (
                  <div 
                    key={log.id}
                    className={`px-4 py-3 flex flex-col gap-1 hover:bg-slate-50 cursor-pointer border-l-2 ${selectedLog === log.id ? 'border-l-primary bg-slate-50' : 'border-l-transparent'}`}
                    onClick={() => setSelectedLog(log.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{log.title}</span>
                      <Badge className={getMoodColor(log.mood)}>{log.mood}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{log.date}</div>
                    <div className="text-sm line-clamp-1">{log.notes}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Daily Log Entry</CardTitle>
                  <CardDescription>
                    {date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Load Template
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Entry
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="log">
                <TabsList>
                  <TabsTrigger value="log">Log Entry</TabsTrigger>
                  <TabsTrigger value="sensory">Sensory Profile</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="goals">Goal Tracking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="log" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Brief description of the day" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mood">Mood</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="happy">Happy</SelectItem>
                            <SelectItem value="calm">Calm</SelectItem>
                            <SelectItem value="frustrated">Frustrated</SelectItem>
                            <SelectItem value="overwhelmed">Overwhelmed</SelectItem>
                            <SelectItem value="tired">Tired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="sleep">Sleep</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Hours of sleep" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-than-6">Less than 6 hours</SelectItem>
                            <SelectItem value="6-7">6-7 hours</SelectItem>
                            <SelectItem value="7-8">7-8 hours</SelectItem>
                            <SelectItem value="8-9">8-9 hours</SelectItem>
                            <SelectItem value="more-than-9">More than 9 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Overall Regulation</Label>
                      <div className="pt-2">
                        <Slider defaultValue={[50]} max={100} step={1} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Dysregulated</span>
                          <span>Well-regulated</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Detailed observations about the day..." className="h-32" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="sensory" className="space-y-4 mt-4">
                  <div className="space-y-6">
                    <div>
                      <Label>Sensory Sensitivities Observed</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="noise" className="rounded border-gray-300" />
                          <Label htmlFor="noise">Noise sensitivity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="light" className="rounded border-gray-300" />
                          <Label htmlFor="light">Light sensitivity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="touch" className="rounded border-gray-300" />
                          <Label htmlFor="touch">Touch sensitivity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="texture" className="rounded border-gray-300" />
                          <Label htmlFor="texture">Texture sensitivity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="movement" className="rounded border-gray-300" />
                          <Label htmlFor="movement">Movement seeking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="smell" className="rounded border-gray-300" />
                          <Label htmlFor="smell">Smell sensitivity</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Regulation Strategies Used</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="deep-pressure" className="rounded border-gray-300" />
                          <Label htmlFor="deep-pressure">Deep pressure</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="movement-break" className="rounded border-gray-300" />
                          <Label htmlFor="movement-break">Movement break</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="quiet-space" className="rounded border-gray-300" />
                          <Label htmlFor="quiet-space">Quiet space</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="fidget" className="rounded border-gray-300" />
                          <Label htmlFor="fidget">Fidget tool</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="headphones" className="rounded border-gray-300" />
                          <Label htmlFor="headphones">Noise-canceling headphones</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="visual" className="rounded border-gray-300" />
                          <Label htmlFor="visual">Visual schedule</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="sensory-notes">Notes on Sensory Experiences</Label>
                      <Textarea id="sensory-notes" placeholder="Details about sensory triggers and successful strategies..." className="h-24" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activities" className="mt-4">
                  <Card>
                    <CardContent className="py-6 text-center">
                      <h3 className="text-lg font-medium mb-2">Activity Tracking</h3>
                      <p className="text-muted-foreground">
                        Record activities and their impact on regulation.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="goals" className="mt-4">
                  <Card>
                    <CardContent className="py-6 text-center">
                      <h3 className="text-lg font-medium mb-2">Goal Progress</h3>
                      <p className="text-muted-foreground">
                        Track daily progress toward therapy goals.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share with Therapist
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <Button size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;
