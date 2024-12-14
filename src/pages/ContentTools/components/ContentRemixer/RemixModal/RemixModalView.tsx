import React from 'react';
import { X } from 'lucide-react';
import { RemixOutput } from '../../../types';
import { TabBar } from './TabBar';
import { OutputContent } from './OutputContent';

interface Props {
  onClose: () => void;
  isProcessing: boolean;
  output: RemixOutput | null;
  content: string;
  selectedTab: keyof RemixOutput | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onTabChange: (tab: keyof RemixOutput) => void;
  onContentChange: (value: string) => void;
}

export const RemixModalView: React.FC<Props> = ({
  onClose,
  isProcessing,
  output,
  content,
  selectedTab,
  onSubmit,
  onTabChange,
  onContentChange
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-white">Content Remix</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex h-[calc(100vh-10rem)]">
        <div className="w-1/2 p-4 border-r dark:border-gray-700">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original Content
              </label>
              <textarea
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="Paste your blog post or article here..."
                className="w-full h-[calc(100vh-16rem)] p-3 border dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
                disabled={isProcessing}
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing || !content.trim()}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800"
            >
              {isProcessing ? 'Remixing Content...' : 'Remix Content'}
            </button>
          </form>
        </div>

        <div className="w-1/2 p-4">
          {output ? (
            <div className="h-full flex flex-col">
              <TabBar selectedTab={selectedTab} onTabChange={onTabChange} />
              <OutputContent output={output} selectedTab={selectedTab} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <p>Remixed content will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);