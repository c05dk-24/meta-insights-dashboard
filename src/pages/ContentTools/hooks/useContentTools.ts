import { useQuery, useMutation } from '@tanstack/react-query';
import { useAxios } from '../../../hooks/useAxios';
import { ContentTool, RemixOutput, BrandVoiceAnalysis, CaseStudy } from '../types';

export const useContentTools = () => {
  const axios = useAxios();

  const remixContent = async (content: string): Promise<RemixOutput> => {
    const { data } = await axios.post('/content/remix', { content });
    return data;
  };

  const analyzeBrandVoice = async (samples: string[]): Promise<BrandVoiceAnalysis> => {
    const { data } = await axios.post('/content/brand-voice', { samples });
    return data;
  };

  const generateCaseStudy = async (input: {
    transcript: string;
    notes: string;
  }): Promise<CaseStudy> => {
    const { data } = await axios.post('/content/case-study', input);
    return data;
  };

  return {
    useTools: () =>
      useQuery({
        queryKey: ['content-tools'],
        queryFn: async () => {
          const { data } = await axios.get('/content/tools');
          return data as ContentTool[];
        },
      }),

    useRemixContent: () =>
      useMutation({
        mutationFn: remixContent,
      }),

    useBrandVoice: () =>
      useMutation({
        mutationFn: analyzeBrandVoice,
      }),

    useCaseStudy: () =>
      useMutation({
        mutationFn: generateCaseStudy,
      }),
  };
};