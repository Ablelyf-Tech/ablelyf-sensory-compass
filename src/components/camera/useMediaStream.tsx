
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useMediaStream = () => {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
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

  return {
    isVideoOn,
    isAudioOn,
    videoRef,
    toggleVideo,
    toggleAudio
  };
};
