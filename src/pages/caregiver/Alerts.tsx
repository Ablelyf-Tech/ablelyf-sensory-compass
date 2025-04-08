
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Calendar, MessageSquare, Settings, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Alerts = () => {
  const [readAlerts, setReadAlerts] = useState<string[]>([]);
  
  // Mock alerts data
  const alerts = [
    { 
      id: '1',
      title: 'Upcoming Therapy Session',
      description: 'Reminder: Occupational therapy session scheduled for tomorrow at 3:00 PM.',
      type: 'reminder',
      date: '2025-04-08 09:00 AM',
      actionRequired: false
    },
    { 
      id: '2',
      title: 'New Progress Report Available',
      description: 'A new quarterly progress report has been uploaded by Dr. Rodriguez.',
      type: 'update',
      date: '2025-04-07 02:30 PM',
      actionRequired: true
    },
    { 
      id: '3',
      title: 'Therapy Plan Updated',
      description: 'Your child\'s therapy plan has been updated with new home activities.',
      type: 'update',
      date: '2025-04-05 11:15 AM',
      actionRequired: true
    },
    { 
      id: '4',
      title: 'Sensory Toolkit Available',
      description: 'A new sensory toolkit resource has been shared with you.',
      type: 'resource',
      date: '2025-04-04 04:45 PM',
      actionRequired: false
    },
    { 
      id: '5',
      title: 'Message from Therapist',
      description: 'Dr. Rodriguez has sent you a message regarding the latest session.',
      type: 'message',
      date: '2025-04-03 09:20 AM',
      actionRequired: true
    },
  ];

  const markAsRead = (id: string) => {
    if (!readAlerts.includes(id)) {
      setReadAlerts([...readAlerts, id]);
    }
  };

  const getAlertIcon = (type: string) => {
    switch(type) {
      case 'reminder':
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'update':
        return <Info className="h-5 w-5 text-purple-600" />;
      case 'resource':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-amber-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
  };

  const filterAlerts = (tab: string) => {
    if (tab === 'all') return alerts;
    if (tab === 'unread') return alerts.filter(alert => !readAlerts.includes(alert.id));
    if (tab === 'action') return alerts.filter(alert => alert.actionRequired);
    
    return alerts.filter(alert => alert.type === tab);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with important information about therapy and appointments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="action">Action Required</TabsTrigger>
              <TabsTrigger value="reminder">Reminders</TabsTrigger>
              <TabsTrigger value="update">Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
              {filterAlerts('all').map(alert => (
                <Card key={alert.id} className={readAlerts.includes(alert.id) ? 'opacity-70' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          <CardDescription>{alert.date}</CardDescription>
                        </div>
                      </div>
                      {alert.actionRequired && !readAlerts.includes(alert.id) && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                          Action Required
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{alert.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-1">
                    {!readAlerts.includes(alert.id) && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)}>
                        Mark as Read
                      </Button>
                    )}
                    {alert.type === 'message' && (
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    )}
                    {alert.type === 'update' && (
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    )}
                    {alert.type === 'reminder' && (
                      <Button variant="outline" size="sm">
                        Add to Calendar
                      </Button>
                    )}
                    {alert.type === 'resource' && (
                      <Button variant="outline" size="sm">
                        Access Resource
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}

              {filterAlerts('all').length === 0 && (
                <Card>
                  <CardContent className="py-6 text-center">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Alerts</h3>
                    <p className="text-muted-foreground">
                      You don't have any alerts at the moment.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="mt-4">
              {filterAlerts('unread').length === 0 ? (
                <Card>
                  <CardContent className="py-6 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">All Caught Up!</h3>
                    <p className="text-muted-foreground">
                      You've read all your notifications.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filterAlerts('unread').map(alert => (
                    <Card key={alert.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            {getAlertIcon(alert.type)}
                            <div>
                              <CardTitle className="text-base">{alert.title}</CardTitle>
                              <CardDescription>{alert.date}</CardDescription>
                            </div>
                          </div>
                          {alert.actionRequired && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{alert.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 pt-1">
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)}>
                          Mark as Read
                        </Button>
                        {alert.type === 'update' && (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="action" className="mt-4">
              {filterAlerts('action').length === 0 ? (
                <Card>
                  <CardContent className="py-6 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Actions Required</h3>
                    <p className="text-muted-foreground">
                      You don't have any alerts that require action.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filterAlerts('action').map(alert => (
                    <Card key={alert.id} className={readAlerts.includes(alert.id) ? 'opacity-70' : ''}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            {getAlertIcon(alert.type)}
                            <div>
                              <CardTitle className="text-base">{alert.title}</CardTitle>
                              <CardDescription>{alert.date}</CardDescription>
                            </div>
                          </div>
                          {!readAlerts.includes(alert.id) && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{alert.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 pt-1">
                        {!readAlerts.includes(alert.id) && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)}>
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Take Action
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reminder" className="mt-4">
              <Card>
                <CardContent className="py-6 text-center">
                  <h3 className="text-lg font-medium mb-2">Reminders</h3>
                  <p className="text-muted-foreground">
                    Appointment and therapy session reminders.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="update" className="mt-4">
              <Card>
                <CardContent className="py-6 text-center">
                  <h3 className="text-lg font-medium mb-2">Updates</h3>
                  <p className="text-muted-foreground">
                    Updates on therapy plans and progress reports.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email">Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">Receive alerts via email</div>
                </div>
                <Switch id="email" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms">SMS Notifications</Label>
                  <div className="text-sm text-muted-foreground">Receive alerts via text message</div>
                </div>
                <Switch id="sms" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointments">Appointment Reminders</Label>
                  <div className="text-sm text-muted-foreground">24 hours before scheduled sessions</div>
                </div>
                <Switch id="appointments" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="updates">Therapy Updates</Label>
                  <div className="text-sm text-muted-foreground">When therapy plans are modified</div>
                </div>
                <Switch id="updates" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="messages">Therapist Messages</Label>
                  <div className="text-sm text-muted-foreground">When you receive messages</div>
                </div>
                <Switch id="messages" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Advanced Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
