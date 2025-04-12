
import React from 'react';

interface EmptyToolsStateProps {
  message?: string;
  description?: string;
}

export const EmptyToolsState: React.FC<EmptyToolsStateProps> = ({
  message = "No tools found",
  description = "Try adjusting your search criteria or category selection."
}) => {
  return (
    <div className="bg-muted p-8 rounded-md text-center">
      <h3 className="text-lg font-medium mb-2">{message}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
