```tsx
import React, { useState } from 'react';
import { Repeat } from 'lucide-react';
import { FeatureCard } from '../FeatureCard';
import { RemixModal } from './RemixModal';
import { useContentTools } from '../../hooks/useContentTools';
import { toast } from 'react-hot-toast';

export const ContentRemixer = () => {
  const [showModal, setShowModal] = useState(false);
  const { useRemixContent } = useContentTools();
  const remixMutation = useRemixContent();

  const handleClick = () => {
    setShowModal(true);
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
          onClose={() => setShowModal(false)}
          isProcessing={remixMutation.isPending}
          onSubmit={async (content) => {
            try {
              await remixMutation.mutateAsync(content);
              toast.success('Content remixed successfully!');
              setShowModal(false);
            } catch (error) {
              toast.error('Failed to remix content');
            }
          }}
        />
      )}
    </>
  );
};
```