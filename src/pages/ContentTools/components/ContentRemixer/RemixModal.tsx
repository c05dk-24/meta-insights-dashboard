```tsx
import React, { useState } from 'react';
import { X, FileText, Mail, Twitter, Linkedin } from 'lucide-react';
import { RemixOutput } from '../../types';

interface Props {
  onClose: () => void;
  onSubmit: (content: string) => Promise<void>;
  isProcessing: boolean;
  output?: RemixOutput | null;
}

export const RemixModal: React.FC<Props> = ({ onClose, onSubmit, isProcessing, output }) => {
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState<keyof RemixOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      await onSubmit(content.trim());
    }
  };

  return (
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
          {/* Input Section */}
          <div className="w-1/2 p-4 border-r dark:border-gray-700">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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

          {/* Output Section */}
          <div className="w-1/2 p-4">
            {output ? (
              <div className="h-full flex flex-col">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setSelectedTab('socialPosts')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      selectedTab === 'socialPosts'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Social Posts
                  </button>
                  <button
                    onClick={() => setSelectedTab('emailNewsletter')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      selectedTab === 'emailNewsletter'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button
                    onClick={() => setSelectedTab('twitterThread')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      selectedTab === 'twitterThread'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Twitter className="w-4 h-4" />
                    Thread
                  </button>
                  <button
                    onClick={() => setSelectedTab('linkedInArticle')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      selectedTab === 'linkedInArticle'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {selectedTab === 'socialPosts' && (
                    <div className="space-y-4">
                      {output.socialPosts.map((post, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                        >
                          {post}
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'emailNewsletter' && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      {output.emailNewsletter}
                    </div>
                  )}

                  {selectedTab === 'twitterThread' && (
                    <div className="space-y-4">
                      {output.twitterThread.map((tweet, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                        >
                          {tweet}
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'linkedInArticle' && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      {output.linkedInArticle}
                    </div>
                  )}
                </div>
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
};
```