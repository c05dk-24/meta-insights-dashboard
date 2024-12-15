import React, { useState } from 'react';
import { Modal } from '../../../../components/ui/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    content: string;
    formats: string[];
    tone: string;
  }) => void;
}

export const RemixModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [tone, setTone] = useState('professional');

  const formats = [
    'Social Posts',
    'Email Newsletter',
    'Twitter Thread',
    'LinkedIn Article',
    'Instagram Carousel'
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'humorous', label: 'Humorous' }
  ];

  const toggleFormat = (format: string) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && selectedFormats.length > 0) {
      onSubmit({
        content: content.trim(),
        formats: selectedFormats,
        tone
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Remix Content">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Original Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border dark:border-gray-600 rounded-lg resize-none h-40 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Paste your blog post or article here..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Output Formats
          </label>
          <div className="grid grid-cols-2 gap-2">
            {formats.map((format) => (
              <label
                key={format}
                className={`
                  flex items-center p-3 rounded-lg border cursor-pointer
                  ${selectedFormats.includes(format)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={selectedFormats.includes(format)}
                  onChange={() => toggleFormat(format)}
                  className="sr-only"
                />
                <span className={`text-sm ${selectedFormats.includes(format) ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                  {format}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {tones.map(({ value, label }) => (
              <label
                key={value}
                className={`
                  flex items-center p-3 rounded-lg border cursor-pointer
                  ${tone === value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                <input
                  type="radio"
                  name="tone"
                  value={value}
                  checked={tone === value}
                  onChange={(e) => setTone(e.target.value)}
                  className="sr-only"
                />
                <span className={`text-sm ${tone === value ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={!content.trim() || selectedFormats.length === 0}
          >
            Remix Content
          </button>
        </div>
      </form>
    </Modal>
  );
};