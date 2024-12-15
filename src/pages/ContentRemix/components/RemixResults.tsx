import React from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Props {
  results: {
    format: string;
    content: string;
  }[];
}

export const RemixResults: React.FC<Props> = ({ results }) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold dark:text-white">{result.format}</h3>
            <button
              onClick={() => copyToClipboard(result.content)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {result.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};