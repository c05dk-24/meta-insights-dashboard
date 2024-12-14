import React from 'react';
import { RemixOutput } from '../../../types';

interface Props {
  output: RemixOutput;
  selectedTab: keyof RemixOutput | null;
}

export const OutputContent: React.FC<Props> = ({ output, selectedTab }) => {
  if (!selectedTab) return null;

  const renderContent = () => {
    switch (selectedTab) {
      case 'socialPosts':
        return (
          <div className="space-y-4">
            {output.socialPosts.map((post, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {post}
              </div>
            ))}
          </div>
        );
      case 'emailNewsletter':
        return (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            {output.emailNewsletter}
          </div>
        );
      case 'twitterThread':
        return (
          <div className="space-y-4">
            {output.twitterThread.map((tweet, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {tweet}
              </div>
            ))}
          </div>
        );
      case 'linkedInArticle':
        return (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            {output.linkedInArticle}
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="flex-1 overflow-y-auto">{renderContent()}</div>;
};