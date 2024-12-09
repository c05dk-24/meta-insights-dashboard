import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { Board, List } from '../types/meta';

export const useBoards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const fetchBoards = async (): Promise<Board[]> => {
    const { data } = await axios.get('/boards');
    return data || [];
  };

  const createBoard = async (title: string): Promise<Board> => {
    const { data } = await axios.post('/boards', { title });
    return data;
  };

  const createList = async ({ boardId, title }: { boardId: string; title: string }): Promise<List> => {
    const { data } = await axios.post(`/boards/${boardId}/lists`, { title });
    return data;
  };

  const updateList = async ({ boardId, listId, updates }: { 
    boardId: string;
    listId: string;
    updates: Partial<List>;
  }): Promise<List> => {
    const { data } = await axios.put(`/boards/${boardId}/lists/${listId}`, updates);
    return data;
  };

  const deleteList = async ({ boardId, listId }: {
    boardId: string;
    listId: string;
  }): Promise<void> => {
    await axios.delete(`/boards/${boardId}/lists/${listId}`);
  };

  return {
    useBoards: () => useQuery({
      queryKey: ['boards'],
      queryFn: fetchBoards,
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: true
    }),

    useCreateBoard: () => useMutation({
      mutationFn: createBoard,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
      }
    }),

    useCreateList: () => useMutation({
      mutationFn: createList,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
      }
    }),

    useUpdateList: () => useMutation({
      mutationFn: updateList,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
      }
    }),

    useDeleteList: () => useMutation({
      mutationFn: deleteList,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
      }
    })
  };
};