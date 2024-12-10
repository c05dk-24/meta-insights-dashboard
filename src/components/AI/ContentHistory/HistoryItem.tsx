import React from 'react';
import { Copy } from 'lucide-react';
import { format } from 'date-fns';
import { GeneratedContent } from '../../../types/ai';
import { toast } from 'react-hot-toast';

interface Props {
  item: GeneratedContent;
}

export const HistoryItem: React.FC<Props> = ({ item }) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="border rounded-lg p-3 sm:p-4 space-y-3">
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-gray-500">
            {format(new Date(item.createdAt), 'MMM d, yyyy HH:mm')}
          </p>
          <p className="text-sm sm:text-base font-medium">Prompt: {item.prompt}</p>
        </div>
        <button
          onClick={() => copyToClipboard(item.content)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      
      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
        <pre className="whitespace-pre-wrap text-xs sm:text-sm">{item.content}</pre>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        <span>Industry: {item.preferences.industry}</span>
        <span className="hidden sm:inline">•</span>
        <span>Tone: {item.preferences.tone}</span>
        <span className="hidden sm:inline">•</span>
        <span>Age: {item.preferences.ageRange}</span>
        <span className="hidden sm:inline">•</span>
        <span>Location: {item.preferences.location}</span>
      </div>
    </div>
  );
};