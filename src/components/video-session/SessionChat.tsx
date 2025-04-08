
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Paperclip, Send } from 'lucide-react';

interface Participant {
  name: string;
  role: string;
  status: string;
  isCurrentUser?: boolean;
}

interface SessionChatProps {
  participants: Participant[];
}

export const SessionChat: React.FC<SessionChatProps> = ({ participants }) => {
  const [message, setMessage] = useState('');
  
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      // Here you would typically send the message to a backend service
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
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
                    {participants[1]?.name}
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
                    {participants[0]?.name}
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
                    {participants[1]?.name}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Paperclip size={16} />
              </Button>
              <Button 
                size="sm" 
                className="h-8 rounded-md bg-ablelyf-blue-500"
                onClick={handleSendMessage}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
