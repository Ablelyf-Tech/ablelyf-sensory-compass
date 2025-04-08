
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, MonitorSmartphone, BarChart } from 'lucide-react';
import { VideoStream } from './VideoStream';
import { MediaControls } from './MediaControls';
import { AiInsightsPanel } from './AiInsightsPanel';
import { SpeechAnalysis } from './SpeechAnalysis';
import { SessionStatistics } from './SessionStatistics';
import { GoalProgress } from './GoalProgress';
import { useMediaStream } from './useMediaStream';
import { useRoleSpecificContent } from './useRoleSpecificContent';
import { UserRole } from '../video-session/RoleSpecificHelper';

interface CameraModuleProps {
  role: UserRole;
}

export const CameraModule: React.FC<CameraModuleProps> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<string>('video');
  const { isVideoOn, isAudioOn, videoRef, toggleVideo, toggleAudio } = useMediaStream();
  const { title, aiSentiment, aiInsights } = useRoleSpecificContent(role);

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
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
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
            <VideoStream isVideoOn={isVideoOn} videoRef={videoRef} />
            <MediaControls 
              isVideoOn={isVideoOn} 
              isAudioOn={isAudioOn} 
              toggleVideo={toggleVideo} 
              toggleAudio={toggleAudio} 
            />
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <AiInsightsPanel aiInsights={aiInsights} />
            <SpeechAnalysis />
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-4">
            <SessionStatistics aiSentiment={aiSentiment} />
            <GoalProgress />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
