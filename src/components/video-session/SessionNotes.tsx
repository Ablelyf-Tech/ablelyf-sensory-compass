
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface SessionNotesProps {
  notes: string[];
}

export const SessionNotes: React.FC<SessionNotesProps> = ({ notes }) => {
  return (
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
            {notes.map((note, index) => (
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
  );
};
