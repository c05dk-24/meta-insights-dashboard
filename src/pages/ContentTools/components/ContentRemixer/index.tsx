import React, { useState } from 'react';
import { Repeat } from 'lucide-react';
import { RemixModal } from './RemixModal';
import { useContentTools } from '../../hooks/useContentTools';
import { RemixOutput } from '../../types';
import { toast } from 'react-hot-toast';

export const ContentRemixer = () => {
  const [showModal, setShowModal] = useState(false);
  const [output, setOutput] = useState<RemixOutput | null>(null);
  const { useRemixContent } = useContentTools();
  const remixMutation = useRemixContent();

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
      <div
        onClick={() => setShowModal(true)}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Repeat className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Content Remix</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Transform your blog posts into multiple content formats automatically.
            </p>
          </div>
        </div>
      </div>

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