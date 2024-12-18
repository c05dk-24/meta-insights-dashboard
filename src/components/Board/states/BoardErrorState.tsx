import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  error: Error;
}

export const BoardErrorState: React.FC<Props> = ({ error }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
        <AlertCircle className="w-6 h-6" />
        <h2 className="text-lg font-semibold">Failed to load board</h2>
      </div>
      <p className="text-red-600/90 dark:text-red-400/90 mb-6">
        {error.message || 'An unexpected error occurred while loading the board.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);