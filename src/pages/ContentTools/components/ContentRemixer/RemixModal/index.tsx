import React from 'react';
import { RemixModalView } from './RemixModalView';
import { useRemixModal } from './useRemixModal';
import { RemixOutput } from '../../../types';

interface Props {
  onClose: () => void;
  onSubmit: (content: string) => Promise<void>;
  isProcessing: boolean;
  output: RemixOutput | null;
}

export const RemixModal: React.FC<Props> = (props) => {
  const { content, selectedTab, handleSubmit, handleTabChange } = useRemixModal(props);

  return (
    <RemixModalView
      {...props}
      content={content}
      selectedTab={selectedTab}
      onSubmit={handleSubmit}
      onTabChange={handleTabChange}
    />
  );
};