import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardApi } from '../../services/api/boardApi';
import { toast } from 'react-hot-toast';

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardApi.createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      toast.success('Board created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create board');
    }
  });
};