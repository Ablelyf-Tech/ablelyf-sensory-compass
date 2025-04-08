import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, Bell, Clock, Calendar, 
  Search, Plus, Brain, Activity, FilterX, 
  X, CheckCircle, AlertCircle, Info
} from 'lucide-react';
import { format } from 'date-fns';
import { AlertData } from '@/types';
import { alertData } from '@/data/mockData';

// Additional alert types
interface EnhancedAlertData extends AlertData {
  title: string;
  location?: string;
  actions?: string[];
  reporter?: string;
}

// Convert existing alert data to enhanced alert data
const enhancedAlertData: EnhancedAlertData[] = alertData.map(alert => {
  const titles = {
    behavioral: 'Behavioral Incident',
    sensory: 'Sensory Trigger',
    medical: 'Medical Attention',
    emergency: 'Emergency Alert'
  };
  
  const locations = [
    'Home', 'School', 'Therapy Center', 'Playground', 'Shopping Mall'
  ];
  
  const actions = [
    'Applied calming techniques',
    'Administered medication',
    'Used sensory tools',
    'Called healthcare provider',
    'Implemented redirection'
  ];
  
  const reporters = [
    'Parent', 'Therapist', 'Teacher', 'Caregiver', 'School Nurse'
  ];
  
  return {
    ...alert,
    title: titles[alert.type] || 'Alert',
    location: locations[Math.floor(Math.random() * locations.length)],
    actions: Array(Math.floor(Math.random() * 2) + 1)
      .fill(0)
      .map(() => actions[Math.floor(Math.random() * actions.length)]),
    reporter: reporters[Math.floor(Math.random() * reporters.length)]
  };
});

const Alerts: React.FC = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<EnhancedAlertData[]>(enhancedAlertData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | boolean>('all');
  const [currentTab, setCurrentTab] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAlert, setNewAlert] = useState<Partial<EnhancedAlertData>>({
    type: 'behavioral',
    severity: 'medium',
    resolved: false
  });
  
  // Filter the alerts based on search, filter, and tab
  const filteredAlerts = alerts.filter(alert => {
    // Search filter
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alert.location && alert.location.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Status filter
    const matchesStatus = 
      filterStatus === 'all' || 
      alert.resolved === filterStatus;
    
    // Tab filter
    const matchesTab = 
      currentTab === 'all' || 
      alert.type === currentTab ||
      (currentTab === 'high' && alert.severity === 'high');
    
    return matchesSearch && matchesStatus && matchesTab;
  });
  
  // Handler for resolving an alert
  const handleResolveAlert = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
    
    toast({
      title: "Alert resolved",
      description: "The alert has been marked as resolved.",
    });
  };
  
  // Handler for creating a new alert
  const handleCreateAlert = () => {
    if (!newAlert.message || !newAlert.title) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const createdAlert: EnhancedAlertData = {
      id: `alert-${Date.now()}`,
      patientId: 'p1',
      type: newAlert.type as 'behavioral' | 'sensory' | 'medical' | 'emergency',
      timestamp: new Date().toISOString(),
      message: newAlert.message || '',
      title: newAlert.title || '',
      severity: newAlert.severity as 'low' | 'medium' | 'high',
      resolved: false,
      location: newAlert.location,
      reporter: newAlert.reporter || 'Caregiver',
      actions: newAlert.actions ? [newAlert.actions as string] : []
    };
    
    setAlerts(prev => [createdAlert, ...prev]);
    setShowAddDialog(false);
    setNewAlert({
      type: 'behavioral',
      severity: 'medium',
      resolved: false
    });
    
    toast({
      title: "Alert created",
      description: "Your new alert has been added to the system.",
    });
  };
  
  // Helper for alert severity
  const getSeverityBadge = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return (
          <Badge className="bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600">
            Low
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            Medium
          </Badge>
        );
      case 'high':
        return (
          <Badge variant="destructive">
            High
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Helper for alert type icon
  const getTypeIcon = (type: 'behavioral' | 'sensory' | 'medical' | 'emergency') => {
    switch (type) {
      case 'behavioral':
        return <Activity className="h-5 w-5" />;
      case 'sensory':
        return <Brain className="h-5 w-5" />;
      case 'medical':
        return <Info className="h-5 w-5" />;
      case 'emergency':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setCurrentTab('all');
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
            <Badge className="ml-2" variant="outline">
              {alerts.filter(a => !a.resolved).length} Active
            </Badge>
          </div>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600">
                <Plus className="h-4 w-4" />
                <span>New Alert</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Log a new alert or incident for the patient.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="alert-title"
                    placeholder="Alert title"
                    className="col-span-3"
                    value={newAlert.title || ''}
                    onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={newAlert.type}
                    onValueChange={(value) => 
                      setNewAlert({ 
                        ...newAlert, 
                        type: value as 'behavioral' | 'sensory' | 'medical' | 'emergency' 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="sensory">Sensory</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-severity" className="text-right">
                    Severity
                  </Label>
                  <Select
                    value={newAlert.severity}
                    onValueChange={(value) => 
                      setNewAlert({ 
                        ...newAlert, 
                        severity: value as 'low' | 'medium' | 'high' 
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="alert-location"
                    placeholder="Where did it happen?"
                    className="col-span-3"
                    value={newAlert.location || ''}
                    onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-action" className="text-right">
                    Action Taken
                  </Label>
                  <Input
                    id="alert-action"
                    placeholder="What action was taken?"
                    className="col-span-3"
                    value={newAlert.actions ? newAlert.actions[0] : ''}
                    onChange={(e) => setNewAlert({ ...newAlert, actions: [e.target.value] })}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="alert-message" className="text-right pt-2">
                    Details
                  </Label>
                  <Textarea
                    id="alert-message"
                    placeholder="Provide details about what happened"
                    className="col-span-3"
                    rows={4}
                    value={newAlert.message || ''}
                    onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateAlert}
                  className="bg-ablelyf-blue-500 hover:bg-ablelyf-blue-600"
                >
                  Create Alert
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-amber-50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-white">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold">{alerts.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-white">
                <Bell className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{alerts.filter(a => !a.resolved).length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-ablelyf-green-50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-white">
                <CheckCircle className="h-5 w-5 text-ablelyf-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">{alerts.filter(a => a.resolved).length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select 
            value={filterStatus === 'all' ? 'all' : filterStatus ? 'resolved' : 'active'} 
            onValueChange={(value) => {
              if (value === 'all') {
                setFilterStatus('all');
              } else {
                setFilterStatus(value === 'resolved');
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="resolved">Resolved Only</SelectItem>
            </SelectContent>
          </Select>
          
          {(searchQuery || filterStatus !== 'all' || currentTab !== 'all') && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={clearFilters}
              title="Clear filters"
            >
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="sensory">Sensory</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
          </TabsList>
          
          <TabsContent value={currentTab} className="mt-6">
            {filteredAlerts.length > 0 ? (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card 
                    key={alert.id}
                    className={
                      alert.resolved 
                        ? "border-ablelyf-neutral-200" 
                        : alert.severity === 'high'
                          ? "border-red-300"
                          : ""
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className={`
                          flex-shrink-0 p-3 rounded-full 
                          ${alert.severity === 'high' 
                            ? 'bg-red-50' 
                            : alert.severity === 'medium'
                              ? 'bg-amber-50'
                              : 'bg-ablelyf-blue-50'
                          }
                        `}>
                          {getTypeIcon(alert.type)}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-medium text-lg">{alert.title}</h3>
                              {getSeverityBadge(alert.severity)}
                              {alert.resolved && (
                                <Badge variant="outline" className="bg-ablelyf-green-50 text-ablelyf-green-700">
                                  Resolved
                                </Badge>
                              )}
                            </div>
                            
                            {!alert.resolved && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveAlert(alert.id)}
                              >
                                Mark Resolved
                              </Button>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{format(new Date(alert.timestamp), 'MMM d, h:mm a')}</span>
                            </div>
                            
                            {alert.location && (
                              <div className="flex items-center gap-1">
                                <span>•</span>
                                <span>{alert.location}</span>
                              </div>
                            )}
                            
                            {alert.reporter && (
                              <div className="flex items-center gap-1">
                                <span>•</span>
                                <span>Reported by: {alert.reporter}</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-sm">{alert.message}</p>
                          
                          {alert.actions && alert.actions.length > 0 && (
                            <div className="pt-1">
                              <p className="text-sm font-medium">Actions Taken:</p>
                              <ul className="list-disc list-inside text-sm text-muted-foreground pl-1">
                                {alert.actions.map((action, index) => (
                                  <li key={index}>{action}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="p-3 rounded-full bg-ablelyf-neutral-100 mb-4">
                  <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg">No alerts found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || filterStatus !== 'all' || currentTab !== 'all'
                    ? "Try adjusting your search filters"
                    : "There are no alerts to display"
                  }
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  <FilterX className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Alerts;
