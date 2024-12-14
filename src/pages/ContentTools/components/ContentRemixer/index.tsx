```tsx
import React, { useState } from 'react';
import { Repeat } from 'lucide-react';
import { FeatureCard } from '../FeatureCard';
import { RemixModal } from './RemixModal';
import { useContentTools } from '../../hooks/useContentTools';
import { RemixOutput } from '../../types';
import { toast } from 'react-hot-toast';

export const ContentRemixer = () => {
  const [showModal, setShowModal] = useState(false);
  const [output, setOutput] = useState<RemixOutput | null>(null);
  const { useRemixContent } = useContentTools();
  const remixMutation = useRemixContent();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleSubmit = async (content: string) => {
    try {
      const result = await remixMutation.mutateAsync(content);
      setOutput(result);
      toast.success('Content remixed successfully!');
    } catch (error) {
      toast.error('Failed to remix content');
      throw error;
    }
  };

  return (
    <>
      <FeatureCard
        icon={Repeat}
        title="Content Remix"
        description="Transform your blog posts into multiple content formats automatically. Create social posts, email newsletters, and more from existing content."
        onClick={handleClick}
      />

      {showModal && (
        <RemixModal
          onClose={() => {
            setShowModal(false);
            setOutput(null);
          }}
          onSubmit={handleSubmit}
          isProcessing={remixMutation.isPending}
          output={output}
        />
      )}
    </>
  );
};
```