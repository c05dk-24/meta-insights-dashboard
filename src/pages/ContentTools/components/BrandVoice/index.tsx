```tsx
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { FeatureCard } from '../FeatureCard';
import { BrandVoiceModal } from './BrandVoiceModal';
import { useContentTools } from '../../hooks/useContentTools';
import { toast } from 'react-hot-toast';

export const BrandVoice = () => {
  const [showModal, setShowModal] = useState(false);
  const { useBrandVoice } = useContentTools();
  const brandVoiceMutation = useBrandVoice();

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <FeatureCard
        icon={MessageSquare}
        title="Brand Voice"
        description="Maintain consistent brand messaging by analyzing and replicating your unique tone of voice across all content."
        onClick={handleClick}
      />

      {showModal && (
        <BrandVoiceModal
          onClose={() => setShowModal(false)}
          isProcessing={brandVoiceMutation.isPending}
          onSubmit={async (samples) => {
            try {
              await brandVoiceMutation.mutateAsync(samples);
              toast.success('Brand voice analyzed successfully!');
              setShowModal(false);
            } catch (error) {
              toast.error('Failed to analyze brand voice');
            }
          }}
        />
      )}
    </>
  );
};
```