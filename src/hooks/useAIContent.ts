import { useMutation } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { UserPreferences } from '../types/ai';
import { toast } from 'react-hot-toast';
import { generateContent } from '../services/ai';

export const useAIContent = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: ({ prompt, preferences }: { prompt: string; preferences: UserPreferences }) =>
      generateContent(prompt, preferences),
    onError: (error: Error) => {
      console.error('AI generation error:', error);
      toast.error('Failed to generate content. Please try again.');
    },
  });
};