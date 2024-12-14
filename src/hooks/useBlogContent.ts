import { useMutation } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { BlogPreferences } from '../types/blog';
import { toast } from 'react-hot-toast';

export const useBlogContent = () => {
  const axios = useAxios();

  const generateContent = async (prompt: string, preferences: BlogPreferences) => {
    try {
      const { data } = await axios.post('/api/blog/generate', {
        prompt,
        preferences,
      });
      return data;
    } catch (error) {
      console.error('Generation error:', error);
      throw new Error('Failed to generate blog content');
    }
  };

  return useMutation({
    mutationFn: ({ prompt, preferences }: { prompt: string; preferences: BlogPreferences }) =>
      generateContent(prompt, preferences),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};