import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  message: string;
}

export const ConnectionError: React.FC<Props> = ({ message }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 text-red-500 mb-4">
        <AlertCircle className="w-6 h-6" />
        <h3 className="text-lg font-semibold">Connection Error</h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {message}
      </p>
      
      <Link
        to="/settings"
        className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Settings
      </Link>
    </div>
  );
};