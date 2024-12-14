```tsx
import { useMutation } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { RemixOutput } from '../types/content';

export const useContentTools = () => {
  const axios = useAxios();

  const remixContent = async (content: string): Promise<RemixOutput> => {
    const { data } = await axios.post('/api/content/remix', {
      content,
      model: 'gpt-4',
      temperature: 0.7,
      formats: ['social', 'email', 'twitter', 'linkedin']
    });
    return data;
  };

  return {
    useRemixContent: () =>
      useMutation({
        mutationFn: remixContent,
      }),
  };
};
```