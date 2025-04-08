
import React from 'react';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';

interface MediaControlsProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
}

export const MediaControls: React.FC<MediaControlsProps> = ({
  isVideoOn,
  isAudioOn,
  toggleVideo,
  toggleAudio,
}) => {
  return (
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
  );
};
