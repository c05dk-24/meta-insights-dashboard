import { useState } from 'react';
import { RemixOutput } from '../../../types';

interface Props {
  onSubmit: (content: string) => Promise<void>;
}

export const useRemixModal = ({ onSubmit }: Props) => {
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState<keyof RemixOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      await onSubmit(content.trim());
    }
  };

  const handleTabChange = (tab: keyof RemixOutput) => {
    setSelectedTab(tab);
  };

  return {
    content,
    selectedTab,
    handleSubmit,
    handleTabChange,
    setContent
  };
};