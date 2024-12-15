import { useMutation } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { RemixRequest, RemixResponse } from '../types/contentTools';

export const useContentTools = () => {
  const axios = useAxios();

  const remixContent = async (data: RemixRequest): Promise<RemixResponse> => {
    const response = await axios.post('/api/content/remix', data);
    return response.data;
  };

  return {
    useRemixContent: () =>
      useMutation({
        mutationFn: remixContent,
      }),
  };
};