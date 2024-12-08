import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';
import { HistoryItem } from './ContentHistory/HistoryItem';
import { toast } from 'react-hot-toast';

export const ContentHistory = () => {
  const { history, clearHistory } = useAIStore();

  const handleClearHistory = () => {
    clearHistory();
    toast.success('History cleared');
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <History className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          <h2 className="text-lg sm:text-xl font-semibold">Generated Content History</h2>
        </div>
        <button
          onClick={handleClearHistory}
          className="text-red-500 hover:text-red-600 flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear History
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};