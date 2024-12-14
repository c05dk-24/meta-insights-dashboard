import React from 'react';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { GeneratedBlog } from '../../../../types/blog';
import { toast } from 'react-hot-toast';

interface Props {
  item: GeneratedBlog;
}

export const HistoryItem: React.FC<Props> = ({ item }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

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
    <div className="border dark:border-gray-700 rounded-lg p-4">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div>
          <h3 className="font-medium dark:text-white">{item.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(item.createdAt), 'MMM d, yyyy HH:mm')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard(item.content)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Copy content"
          >
            <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="prose dark:prose-invert max-w-none mb-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              {item.content}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {item.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};