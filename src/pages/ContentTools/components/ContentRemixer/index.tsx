import React, { useState } from 'react';
import { Repeat } from 'lucide-react';
import { RemixModal } from './RemixModal';
import { useContentTools } from '../../hooks/useContentTools';
import { toast } from 'react-hot-toast';

export const ContentRemix = () => {
  const [showModal, setShowModal] = useState(false);
  const { useRemixContent } = useContentTools();
  const remixMutation = useRemixContent();

  const handleSubmit = async (data: { content: string; formats: string[]; tone: string }) => {
    try {
      await remixMutation.mutateAsync(data);
      toast.success('Content remixed successfully!');
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to remix content');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2 dark:text-white">Content Remix</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Transform your content into multiple formats automatically
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Repeat className="w-5 h-5" />
            New Remix
          </button>
        </div>

        {/* Results will be shown here */}
        <div className="space-y-6">
          {remixMutation.data && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              {/* Display remixed content here */}
            </div>
          )}
        </div>

        <RemixModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          isProcessing={remixMutation.isPending}
        />
      </div>
    </div>
  );
};