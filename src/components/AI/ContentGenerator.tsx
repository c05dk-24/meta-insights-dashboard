import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';
import { useAIContent } from '../../hooks/useAIContent';
import { PromptInput } from './ContentGenerator/PromptInput';
import { toast } from 'react-hot-toast';

export const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const { preferences, addToHistory } = useAIStore();
  const { mutate: generateContent, isPending } = useAIContent();

  const handleGenerate = () => {
    if (!prompt.trim() || !preferences) return;

    generateContent(
      { prompt: prompt.trim(), preferences },
      {
        onSuccess: (content) => {
          const generatedContent = {
            id: crypto.randomUUID(),
            userId: 'current-user',
            prompt: prompt.trim(),
            content,
            preferences,
            createdAt: new Date().toISOString(),
          };

          addToHistory(generatedContent);
          setPrompt('');
          toast.success('Content generated successfully!');
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
        <h2 className="text-lg sm:text-xl font-semibold">Generate Content</h2>
      </div>

      <div className="space-y-4">
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          isGenerating={isPending}
        />

        <button
          onClick={handleGenerate}
          disabled={isPending || !prompt.trim()}
          className={`
            w-full py-2 sm:py-3 px-4 rounded-lg text-white font-medium text-sm sm:text-base
            transition-colors duration-200
            ${isPending || !prompt.trim()
              ? 'bg-purple-300 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600'
            }
          `}
        >
          {isPending ? 'Generating...' : 'Generate Instagram Post'}
        </button>
      </div>
    </div>
  );
};