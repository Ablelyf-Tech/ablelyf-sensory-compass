
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CameraModule } from '@/components/camera/CameraModule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Clock, Users, Paperclip, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SessionNotesForm } from '@/components/therapist/SessionNotesForm';

const VideoSession: React.FC = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role || 'therapist';
  
  const getSessionParticipants = () => {
    switch (role) {
      case 'therapist':
        return [
          { name: 'Alex Morgan', role: 'Patient', status: 'online' },
          { name: currentUser?.name || 'Dr. Smith', role: 'Therapist', status: 'online', isCurrentUser: true }
        ];
      case 'caregiver':
        return [
          { name: currentUser?.name || 'Jane Doe', role: 'Caregiver', status: 'online', isCurrentUser: true },
          { name: 'Dr. Williams', role: 'Therapist', status: 'online' }
        ];
      case 'teacher':
        return [
          { name: currentUser?.name || 'Ms. Johnson', role: 'Teacher', status: 'online', isCurrentUser: true },
          { name: 'Student Group', role: 'Students', status: 'online' }
        ];
      case 'hr':
        return [
          { name: currentUser?.name || 'Sarah Miller', role: 'HR Manager', status: 'online', isCurrentUser: true },
          { name: 'James Wilson', role: 'Employee', status: 'online' }
        ];
      case 'admin':
        return [
          { name: currentUser?.name || 'Admin User', role: 'Administrator', status: 'online', isCurrentUser: true },
          { name: 'Department Heads', role: 'Attendees', status: 'online' }
        ];
      default:
        return [];
    }
  };
  
  const getRoleSpecificNotes = () => {
    switch (role) {
      case 'therapist':
        return [
          "Focus on sensory regulation techniques",
          "Address communication strategies for school setting",
          "Review progress on social interaction goals"
        ];
      case 'caregiver':
        return [
          "Discuss morning routine effectiveness",
          "Address recent sensory triggers",
          "Plan for upcoming school transition"
        ];
      case 'teacher':
        return [
          "Review classroom accommodations",
          "Discuss group project participation strategies",
          "Plan for upcoming assessment modifications"
        ];
      case 'hr':
        return [
          "Review workplace accommodation implementation",
          "Discuss productivity support tools",
          "Address communication preferences"
        ];
      case 'admin':
        return [
          "System performance review",
          "User satisfaction metrics",
          "Implementation timeline discussion"
        ];
      default:
        return [];
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-ablelyf-blue-900">Video Session</h1>
          <p className="text-ablelyf-blue-700">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {role === 'therapist' && <SessionNotesForm />}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CameraModule role={role as any} />
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Session Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[300px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  <div className="flex flex-col">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-ablelyf-blue-100 rounded-xl p-3 text-sm">
                        <p className="font-medium text-xs text-ablelyf-blue-800 mb-1">
                          {getSessionParticipants()[1]?.name}
                        </p>
                        <p>Hello! How are you feeling today?</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">10:02 AM</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-start gap-2 max-w-[80%] flex-row-reverse">
                      <div className="bg-ablelyf-green-100 rounded-xl p-3 text-sm">
                        <p className="font-medium text-xs text-ablelyf-green-800 mb-1">
                          {getSessionParticipants()[0]?.name}
                        </p>
                        <p>I'm doing okay today. A little anxious about school tomorrow.</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">10:04 AM</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-ablelyf-blue-100 rounded-xl p-3 text-sm">
                        <p className="font-medium text-xs text-ablelyf-blue-800 mb-1">
                          {getSessionParticipants()[1]?.name}
                        </p>
                        <p>Let's talk about what's making you anxious. Can you share more about what you're worried about?</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">10:05 AM</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      AI Assistant analyzed: Detecting anxiety about social interactions
                    </Badge>
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="w-full border rounded-md py-2 px-3 pr-24"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Paperclip size={16} />
                    </Button>
                    <Button size="sm" className="h-8 rounded-md bg-ablelyf-blue-500">
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Session Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-ablelyf-blue-50 p-3 rounded-md flex items-center gap-3">
                <Clock className="text-ablelyf-blue-500" size={20} />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-xs text-muted-foreground">Started 24 minutes ago</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Users size={16} /> Participants
                </h3>
                
                {getSessionParticipants().map((participant, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md bg-ablelyf-neutral-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-ablelyf-blue-200 flex items-center justify-center text-ablelyf-blue-700">
                        {participant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.role}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        participant.status === 'online' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      {participant.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  Session Notes
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Key points to address:</p>
                <ul className="space-y-2">
                  {getRoleSpecificNotes().map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="bg-ablelyf-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                        {index + 1}
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-3">
                  <p className="text-sm text-muted-foreground mb-2">AI-Generated Summary:</p>
                  <p className="text-sm bg-ablelyf-neutral-100 p-3 rounded-md">
                    Session is focusing on anxiety about school environments. Patient shows moderate engagement. Recommend focusing on sensory regulation strategies for classroom settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoSession;
