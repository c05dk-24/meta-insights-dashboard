import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { Board, List } from '../types/meta';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';

export const useBoards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const fetchBoards = async (): Promise<Board[]> => {
    if (!user) throw new Error('User not authenticated');
    const { data } = await axios.get('/api/boards');
    return data || [];
  };

  const createBoard = async (title: string): Promise<Board> => {
    if (!user) throw new Error('User not authenticated');
    const { data } = await axios.post('/api/boards', { 
      title,
      user_id: user.id,
      company_id: user.company_id
    });
    return data;
  };

  const createList = async ({
    boardId,
    title,
  }: {
    boardId: string;
    title: string;
  }): Promise<List> => {
    if (!user) throw new Error('User not authenticated');
    const { data } = await axios.post(`/api/boards/${boardId}/lists`, {
      title,
    });
    return data;
  };

  return {
    useBoards: () =>
      useQuery({
        queryKey: ['boards', user?.id],
        queryFn: fetchBoards,
        enabled: !!user,
        retry: 1,
        staleTime: 30000,
      }),

    useCreateBoard: () =>
      useMutation({
        mutationFn: createBoard,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('Board created successfully');
        },
        onError: (error: any) => {
          toast.error(error.message || 'Failed to create board');
        },
      }),

    useCreateList: () =>
      useMutation({
        mutationFn: createList,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
          toast.success('List created successfully');
        },
        onError: (error: any) => {
          toast.error(error.message || 'Failed to create list');
        },
      }),
  };
};