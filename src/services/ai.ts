import { useAxios } from '../hooks/useAxios';
import { UserPreferences } from '../types/ai';

export const generateContent = async (prompt: string, preferences: UserPreferences) => {
  const axios = useAxios();
  const { data } = await axios.post('/api/ai/generate', {
    prompt,
    preferences
  });
  return data.content;
};