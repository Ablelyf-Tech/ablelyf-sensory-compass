import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Mic, MicOff, Video, VideoOff, MonitorSmartphone, Users, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CameraModuleProps {
  role: 'therapist' | 'caregiver' | 'teacher' | 'hr' | 'admin';
}

export const CameraModule: React.FC<CameraModuleProps> = ({ role }) => {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('video');
  const [aiSentiment, setAiSentiment] = useState<'positive' | 'neutral' | 'negative'>('neutral');
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getRoleSpecificTitle = () => {
    switch (role) {
      case 'therapist':
        return 'Therapy Session';
      case 'caregiver':
        return 'Remote Care Session';
      case 'teacher':
        return 'Classroom Session';
      case 'hr':
        return 'Employee Consultation';
      case 'admin':
        return 'Administrative Meeting';
      default:
        return 'Video Session';
    }
  };

  const getRoleSpecificInsights = () => {
    switch (role) {
      case 'therapist':
        return [
          'Patient shows increased engagement in the last 5 minutes',
          'Voice tone indicates reduced anxiety levels',
          'Facial expressions suggest positive response to therapy'
        ];
      case 'caregiver':
        return [
          'Sensory response patterns improved by 15%',
          'Morning routine adherence increased',
          'Reduced sensory overload indicators'
        ];
      case 'teacher':
        return [
          'Student attention span: 8.5 minutes (15% increase)',
          'Participation increased during interactive segments',
          'Responded well to visual learning elements'
        ];
      case 'hr':
        return [
          'Accommodation effectiveness increased by 12%',
          'Communication clarity metrics improved',
          'Workplace satisfaction indicators positive'
        ];
      case 'admin':
        return [
          'System performance metrics stable',
          'User engagement metrics trending upward',
          'Satisfaction metrics above threshold'
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const sentiments = ['positive', 'neutral', 'negative'] as const;
      const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      setAiSentiment(randomSentiment);
      
      setAiInsights(getRoleSpecificInsights());
    }, 5000);

    return () => clearInterval(timer);
  }, [role]);

  const toggleVideo = async () => {
    try {
      if (!isVideoOn) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: isAudioOn 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        streamRef.current = stream;
        setIsVideoOn(true);
        
        toast({
          title: "Camera activated",
          description: "Your camera is now active.",
        });
      } else {
        if (streamRef.current) {
          const videoTracks = streamRef.current.getVideoTracks();
          videoTracks.forEach(track => track.stop());
          
          videoTracks.forEach(track => streamRef.current?.removeTrack(track));
          
          if (isAudioOn && streamRef.current.getAudioTracks().length > 0) {
          } else {
            streamRef.current = null;
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
          }
        }
        
        setIsVideoOn(false);
        
        toast({
          title: "Camera deactivated",
          description: "Your camera has been turned off.",
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const toggleAudio = async () => {
    try {
      if (!isAudioOn) {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        if (streamRef.current && isVideoOn) {
          const audioTrack = audioStream.getAudioTracks()[0];
          streamRef.current.addTrack(audioTrack);
        } else {
          streamRef.current = audioStream;
        }
        
        setIsAudioOn(true);
        
        toast({
          title: "Microphone activated",
          description: "Your microphone is now active.",
        });
      } else {
        if (streamRef.current) {
          const audioTracks = streamRef.current.getAudioTracks();
          audioTracks.forEach(track => track.stop());
          
          audioTracks.forEach(track => streamRef.current?.removeTrack(track));
          
          if (isVideoOn && streamRef.current.getVideoTracks().length > 0) {
          } else {
            streamRef.current = null;
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
          }
        }
        
        setIsAudioOn(false);
        
        toast({
          title: "Microphone deactivated",
          description: "Your microphone has been turned off.",
        });
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const getSentimentColor = () => {
    switch (aiSentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Card className="shadow-md border-ablelyf-blue-100">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{getRoleSpecificTitle()}</CardTitle>
          <Badge 
            className={`${getSentimentColor()} capitalize`}
            variant="outline"
          >
            {aiSentiment} engagement
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="ai">
              <MonitorSmartphone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">AI Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Statistics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video" className="space-y-4">
            <div className="bg-ablelyf-neutral-100 rounded-md aspect-video flex items-center justify-center overflow-hidden">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <Camera size={48} className="mx-auto text-ablelyf-neutral-400 mb-2" />
                  <p className="text-ablelyf-neutral-500">Camera is currently off</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center gap-2">
              <Button
                variant={isVideoOn ? "default" : "outline"}
                size="sm"
                onClick={toggleVideo}
                className={isVideoOn ? "bg-ablelyf-blue-500" : ""}
              >
                {isVideoOn ? <VideoOff size={16} className="mr-2" /> : <Video size={16} className="mr-2" />}
                {isVideoOn ? "Stop Video" : "Start Video"}
              </Button>
              
              <Button
                variant={isAudioOn ? "default" : "outline"}
                size="sm"
                onClick={toggleAudio}
                className={isAudioOn ? "bg-ablelyf-blue-500" : ""}
              >
                {isAudioOn ? <MicOff size={16} className="mr-2" /> : <Mic size={16} className="mr-2" />}
                {isAudioOn ? "Mute" : "Unmute"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="bg-ablelyf-blue-50 rounded-md p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <MonitorSmartphone size={16} /> AI Insights
              </h3>
              <ul className="space-y-2">
                {aiInsights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="bg-ablelyf-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                      {index + 1}
                    </span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-ablelyf-neutral-100 rounded-md p-4">
              <h3 className="font-medium mb-2">Speech Analysis</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Clarity</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
                    <div className="bg-ablelyf-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Engagement</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
                    <div className="bg-ablelyf-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-4">
            <div className="bg-ablelyf-neutral-100 rounded-md p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Users size={16} /> Session Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs text-ablelyf-neutral-500">Duration</p>
                  <p className="text-xl font-medium">24:18</p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs text-ablelyf-neutral-500">Interactions</p>
                  <p className="text-xl font-medium">17</p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs text-ablelyf-neutral-500">Response Rate</p>
                  <p className="text-xl font-medium">92%</p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs text-ablelyf-neutral-500">Sentiment</p>
                  <p className="text-xl font-medium capitalize">{aiSentiment}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-ablelyf-green-50 rounded-md p-4">
              <h3 className="font-medium mb-2">Session Goal Progress</h3>
              <div className="space-y-2 mt-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Goal 1: Communication</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
                    <div className="bg-ablelyf-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Goal 2: Engagement</span>
                    <span>70%</span>
                  </div>
                  <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
                    <div className="bg-ablelyf-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Goal 3: Skills Practice</span>
                    <span>62%</span>
                  </div>
                  <div className="w-full bg-ablelyf-neutral-200 rounded-full h-2 mt-1">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
