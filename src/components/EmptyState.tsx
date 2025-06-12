
import React from 'react';

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, message }) => {
  return (
    <div className="text-center py-12">
      <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
