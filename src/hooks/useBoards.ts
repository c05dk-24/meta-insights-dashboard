import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { Board, List } from '../types/meta';

export const useBoards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const fetchBoards = async (): Promise<Board[]> => {
    const { data } = await axios.get('/boards');
    return data;
  };

  const createBoard = async (title: string): Promise<Board> => {
    const { data } = await axios.post('/boards', { title });
    return data;
  };

  const createList = async ({ boardId, title }: { boardId: string; title: string }): Promise<List> => {
    const { data } = await axios.post(`/boards/${boardId}/lists`, { title });
    return data;
  };

  return {
    useBoards: () => useQuery({
      queryKey: ['boards'],
      queryFn: fetchBoards,
      staleTime: 30000,
      refetchOnWindowFocus: true,
      retry: 1
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
    })
  };
};