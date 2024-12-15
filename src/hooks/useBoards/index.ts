import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '../useAxios';
import { BoardService } from '../../services/boards/BoardService';
import { useAuth } from '../useAuth';
import { toast } from 'react-hot-toast';

export const useBoards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const boardService = new BoardService(axios);

  return {
    useBoards: () =>
      useQuery({
        queryKey: ['boards'],
        queryFn: () => boardService.getBoards(),
        retry: 1,
        staleTime: 30000,
      }),

    useCreateBoard: () =>
      useMutation({
        mutationFn: (title: string) => {
          if (!user?.id || !user?.company_id) {
            throw new Error('User information is missing');
          }
          return boardService.createBoard({
            title,
            userId: user.id,
            companyId: user.company_id,
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Board created successfully');
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      }),

    useCreateList: () =>
      useMutation({
        mutationFn: ({ boardId, title }: { boardId: string; title: string }) =>
          boardService.createList({ boardId, title }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('List created successfully');
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      }),
  };
};