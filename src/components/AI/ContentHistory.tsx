import React from 'react';
import { History, Copy, Trash2 } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';
import { format } from 'date-fns';

export const ContentHistory = () => {
  const { history, clearHistory } = useAIStore();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-gray-500" />
          <h2 className="text-xl font-semibold">Generated Content History</h2>
        </div>
        <button
          onClick={clearHistory}
          className="text-red-500 hover:text-red-600 flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear History
        </button>
      </div>

      <div className="space-y-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  {format(new Date(item.createdAt), 'MMM d, yyyy HH:mm')}
                </p>
                <p className="font-medium">Prompt: {item.prompt}</p>
              </div>
              <button
                onClick={() => copyToClipboard(item.content)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <span>Industry: {item.preferences.industry}</span>
              <span>•</span>
              <span>Tone: {item.preferences.tone}</span>
              <span>•</span>
              <span>Age: {item.preferences.ageRange}</span>
              <span>•</span>
              <span>Location: {item.preferences.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};