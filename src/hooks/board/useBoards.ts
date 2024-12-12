import { useQuery } from '@tanstack/react-query';
import { boardApi } from '../../services/api/boardApi';
import { toast } from 'react-hot-toast';

export const useBoards = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: () => boardApi.getBoards(),
    onError: (error: any) => {
      toast.error(error.message || 'Failed to fetch boards');
    }
  });
};