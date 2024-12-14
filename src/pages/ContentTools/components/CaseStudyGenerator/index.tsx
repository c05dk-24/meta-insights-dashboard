```tsx
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { FeatureCard } from '../FeatureCard';
import { CaseStudyModal } from './CaseStudyModal';
import { useContentTools } from '../../hooks/useContentTools';
import { toast } from 'react-hot-toast';

export const CaseStudyGenerator = () => {
  const [showModal, setShowModal] = useState(false);
  const { useCaseStudy } = useContentTools();
  const caseStudyMutation = useCaseStudy();

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <FeatureCard
        icon={FileText}
        title="Case Study Generator"
        description="Turn customer success stories into compelling case studies. Upload transcripts or notes and let AI structure your case study."
        onClick={handleClick}
      />

      {showModal && (
        <CaseStudyModal
          onClose={() => setShowModal(false)}
          isProcessing={caseStudyMutation.isPending}
          onSubmit={async (data) => {
            try {
              await caseStudyMutation.mutateAsync(data);
              toast.success('Case study generated successfully!');
              setShowModal(false);
            } catch (error) {
              toast.error('Failed to generate case study');
            }
          }}
        />
      )}
    </>
  );
};
```