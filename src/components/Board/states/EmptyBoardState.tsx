import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onCreate: () => void;
  isCreating: boolean;
}

export const EmptyBoardState: React.FC<Props> = ({ onCreate, isCreating }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="text-center max-w-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">
        Welcome to your boards
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Create your first board to get started organizing your tasks and projects.
      </p>
      <button 
        onClick={onCreate}
        disabled={isCreating}
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        {isCreating ? 'Creating...' : 'Create Board'}
      </button>
    </div>
  </div>
);