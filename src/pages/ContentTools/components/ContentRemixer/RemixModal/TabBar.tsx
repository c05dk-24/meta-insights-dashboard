import React from 'react';
import { FileText, Mail, Twitter, Linkedin } from 'lucide-react';
import { RemixOutput } from '../../../types';
import { TabButton } from './TabButton';

interface Props {
  selectedTab: keyof RemixOutput | null;
  onTabChange: (tab: keyof RemixOutput) => void;
}

export const TabBar: React.FC<Props> = ({ selectedTab, onTabChange }) => (
  <div className="flex space-x-2 mb-4">
    <TabButton
      active={selectedTab === 'socialPosts'}
      onClick={() => onTabChange('socialPosts')}
      icon={FileText}
      label="Social Posts"
    />
    <TabButton
      active={selectedTab === 'emailNewsletter'}
      onClick={() => onTabChange('emailNewsletter')}
      icon={Mail}
      label="Email"
    />
    <TabButton
      active={selectedTab === 'twitterThread'}
      onClick={() => onTabChange('twitterThread')}
      icon={Twitter}
      label="Thread"
    />
    <TabButton
      active={selectedTab === 'linkedInArticle'}
      onClick={() => onTabChange('linkedInArticle')}
      icon={Linkedin}
      label="LinkedIn"
    />
  </div>
);