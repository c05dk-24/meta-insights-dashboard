import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';

export const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { preferences, addToHistory } = useAIStore();

  const generateContent = async () => {
    if (!prompt.trim() || !preferences) return;

    setIsGenerating(true);
    try {
      // TODO: Replace with actual API call to ChatGPT
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            content: `Generated Instagram post based on:\nIndustry: ${preferences.industry}\nTone: ${preferences.tone}\nAge: ${preferences.ageRange}\nLocation: ${preferences.location}\n\nPrompt: ${prompt}`,
          });
        }, 1500);
      });

      const generatedContent = {
        id: crypto.randomUUID(),
        userId: 'current-user',
        prompt,
        content: (response as any).content,
        preferences,
        createdAt: new Date().toISOString(),
      };

      addToHistory(generatedContent);
      setPrompt('');
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Wand2 className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-semibold">Generate Content</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Describe your content
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Announce our new summer collection with a focus on sustainable materials..."
            className="w-full p-3 border rounded-lg h-32"
            disabled={isGenerating}
          />
        </div>

        <button
          onClick={generateContent}
          disabled={isGenerating || !prompt.trim()}
          className={`
            w-full py-3 px-4 rounded-lg text-white font-medium
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