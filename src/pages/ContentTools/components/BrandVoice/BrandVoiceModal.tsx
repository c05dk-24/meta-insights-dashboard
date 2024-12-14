```tsx
import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSubmit: (samples: string[]) => void;
  isProcessing: boolean;
}

export const BrandVoiceModal: React.FC<Props> = ({ onClose, onSubmit, isProcessing }) => {
  const [samples, setSamples] = useState<string[]>(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validSamples = samples.filter(s => s.trim());
    if (validSamples.length > 0) {
      onSubmit(validSamples);
    }
  };

  const addSample = () => {
    setSamples([...samples, '']);
  };

  const removeSample = (index: number) => {
    setSamples(samples.filter((_, i) => i !== index));
  };

  const updateSample = (index: number, value: string) => {
    setSamples(samples.map((s, i) => i === index ? value : s));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Analyze Brand Voice</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4 mb-4">
            {samples.map((sample, index) => (
              <div key={index} className="relative">
                <textarea
                  value={sample}
                  onChange={(e) => updateSample(index, e.target.value)}
                  placeholder="Paste a sample of your brand's content..."
                  className="w-full h-32 p-3 border dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={isProcessing}
                />
                {samples.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSample(index)}
                    className="absolute top-2 right-2 p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSample}
            disabled={isProcessing}
            className="mb-4 flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus className="w-4 h-4" />
            Add Another Sample
          </button>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !samples.some(s => s.trim())}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800"
            >
              {isProcessing ? 'Analyzing...' : 'Analyze Voice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
```