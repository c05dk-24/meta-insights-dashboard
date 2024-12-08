import { useQuery } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { MetaInsight } from '../types/meta';

export const useMeta = () => {
  const axios = useAxios();

  const fetchInsights = async (range: string): Promise<MetaInsight> => {
    const { data } = await axios.get('/meta/insights', {
      params: { range }
    });
    return data;
  };

  return {
    useInsights: (range: string) => 
      useQuery({
        queryKey: ['insights', range],
        queryFn: () => fetchInsights(range),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false
      })
  };
};