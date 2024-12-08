import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';
import { generateContent } from '../../services/ai';

export const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const { preferences, addToHistory } = useAIStore();

  const handleGenerate = async () => {
    if (!prompt.trim() || !preferences) return;

    setIsGenerating(true);
    setError('');

    try {
      const content = await generateContent(prompt.trim(), preferences);

      const generatedContent = {
        id: crypto.randomUUID(),
        userId: 'current-user',
        prompt,
        content,
        preferences,
        createdAt: new Date().toISOString(),
      };

      addToHistory(generatedContent);
      setPrompt('');
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
        <h2 className="text-lg sm:text-xl font-semibold">Generate Content</h2>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Describe your content
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Announce our new summer collection with a focus on sustainable materials..."
            className="w-full p-2 sm:p-3 border rounded-lg h-24 sm:h-32 text-sm sm:text-base"
            disabled={isGenerating}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className={`
            w-full py-2 sm:py-3 px-4 rounded-lg text-white font-medium text-sm sm:text-base
            ${isGenerating
              ? 'bg-purple-300 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600'
            }
          `}
        >
          {isGenerating ? 'Generating...' : 'Generate Instagram Post'}
        </button>
      </div>
    </div>
  );
};