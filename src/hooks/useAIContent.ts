import { useMutation } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { UserPreferences } from '../types/ai';
import { toast } from 'react-hot-toast';

export const useAIContent = () => {
  const axios = useAxios();

  const generateContent = async (prompt: string, preferences: UserPreferences) => {
    try {
      const { data } = await axios.post('/api/ai/generate', {
        prompt,
        preferences,
      });
      return data.content;
    } catch (error) {
      console.error('Generation error:', error);
      throw new Error('Failed to generate content');
    }
  };

  return useMutation({
    mutationFn: ({ prompt, preferences }: { prompt: string; preferences: UserPreferences }) =>
      generateContent(prompt, preferences),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};