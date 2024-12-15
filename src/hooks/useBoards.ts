import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { boardsApi } from '../services/api/boards';
import { toast } from 'react-hot-toast';

export const useBoards = () => {
  const queryClient = useQueryClient();

  return {
    useGetBoards: () => 
      useQuery({
        queryKey: ['boards'],
        queryFn: boardsApi.getBoards
      }),

    useCreateBoard: () =>
      useMutation({
        mutationFn: boardsApi.createBoard,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Board created successfully');
        },
        onError: () => {
          toast.error('Failed to create board');
        }
      }),

    useCreateList: () =>
      useMutation({
        mutationFn: ({ boardId, title, position }: { boardId: string; title: string; position: number }) =>
          boardsApi.createList(boardId, title, position),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('List created successfully');
        },
        onError: () => {
          toast.error('Failed to create list');
        }
      })
  };
};