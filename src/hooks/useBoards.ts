import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { Board } from '../types/meta';

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

  return {
    useBoards: () => useQuery({
      queryKey: ['boards'],
      queryFn: fetchBoards,
      retry: 1,
      initialData: []
    }),

    useCreateBoard: () => useMutation({
      mutationFn: createBoard,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
      }
    })
  };
};