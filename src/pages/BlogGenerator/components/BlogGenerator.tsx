import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useBlogStore } from '../../../store/blogStore';
import { useBlogContent } from '../../../hooks/useBlogContent';
import { PromptInput } from './BlogGenerator/PromptInput';
import { toast } from 'react-hot-toast';

export const BlogGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const { preferences, addToHistory } = useBlogStore();
  const { mutate: generateContent, isPending } = useBlogContent();

  const handleGenerate = () => {
    if (!prompt.trim() || !preferences) return;

    generateContent(
      { prompt: prompt.trim(), preferences },
      {
        onSuccess: (content) => {
          const generatedContent = {
            id: crypto.randomUUID(),
            userId: 'current-user',
            title: content.title,
            content: content.content,
            keywords: preferences.keywords,
            preferences,
            createdAt: new Date().toISOString(),
          };

          addToHistory(generatedContent);
          setPrompt('');
          toast.success('Blog content generated successfully!');
        },
      }
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
        <h2 className="text-lg sm:text-xl font-semibold dark:text-white">Generate Blog Content</h2>
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
              ? 'bg-purple-300 dark:bg-purple-700 cursor-not-allowed'
              : 'bg-purple-500 dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-700'
            }
          `}
        >
          {isPending ? 'Generating...' : 'Generate Blog Post'}
        </button>
      </div>
    </div>
  );
};