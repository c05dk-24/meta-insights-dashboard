import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { boardService } from '../services/boardService';
import { toast } from 'react-hot-toast';

export const useBoards = () => {
  const queryClient = useQueryClient();

  return {
    useBoards: () => useQuery({
      queryKey: ['boards'],
      queryFn: () => boardService.getBoards(),
      onError: (error: any) => {
        toast.error(error.message || 'Failed to fetch boards');
      }
    }),

    useCreateBoard: () => useMutation({
      mutationFn: (title: string) => boardService.createBoard(title),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
        toast.success('Board created successfully');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create board');
      }
    }),

    useCreateList: () => useMutation({
      mutationFn: ({ boardId, title }: { boardId: string; title: string }) => 
        boardService.createList(boardId, title),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
        toast.success('List created successfully');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create list');
      }
    }),

    useCreateCard: () => useMutation({
      mutationFn: ({ 
        boardId, 
        listId, 
        title, 
        description 
      }: { 
        boardId: string;
        listId: string;
        title: string;
        description?: string;
      }) => boardService.createCard(boardId, listId, { title, description }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
        toast.success('Card created successfully');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create card');
      }
    })
  };
};