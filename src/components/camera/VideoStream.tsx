
import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface VideoStreamProps {
  isVideoOn: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const VideoStream: React.FC<VideoStreamProps> = ({ isVideoOn, videoRef }) => {
  return (
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
  );
};
