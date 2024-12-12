import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { Board, List, Card } from '../types/board';
import { toast } from 'react-hot-toast';

export const useBoards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const fetchBoards = async (): Promise<Board[]> => {
    const { data } = await axios.get('/api/boards');
    return data;
  };

  const createBoard = async (title: string): Promise<Board> => {
    const { data } = await axios.post('/api/boards', { title });
    return data;
  };

  const createList = async ({ boardId, title }: { boardId: string; title: string }): Promise<List> => {
    const { data } = await axios.post(`/api/boards/${boardId}/lists`, { title });
    return data;
  };

  const createCard = async ({ 
    boardId, 
    listId, 
    title, 
    description 
  }: { 
    boardId: string;
    listId: string;
    title: string;
    description?: string;
  }): Promise<Card> => {
    const { data } = await axios.post(
      `/api/boards/${boardId}/lists/${listId}/cards`, 
      { title, description }
    );
    return data;
  };

  return {
    useBoards: () => useQuery({
      queryKey: ['boards'],
      queryFn: fetchBoards,
      onError: (error: any) => {
        toast.error(error.message || 'Failed to fetch boards');
      }
    }),

    useCreateBoard: () => useMutation({
      mutationFn: createBoard,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
        toast.success('Board created successfully');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create board');
      }
    }),

    useCreateList: () => useMutation({
      mutationFn: createList,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
        toast.success('List created successfully');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create list');
      }
    }),

    useCreateCard: () => useMutation({
      mutationFn: createCard,
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