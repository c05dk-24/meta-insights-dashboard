import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { Board, List, Card } from '../types/meta';

export const useBoards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const fetchBoards = async () => {
    const { data } = await axios.get('/boards');
    return data;
  };

  const createBoard = async (title: string) => {
    const { data } = await axios.post('/boards', { title });
    return data;
  };

  const createList = async ({ boardId, title }: { boardId: string; title: string }) => {
    const { data } = await axios.post(`/boards/${boardId}/lists`, { title });
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
  }) => {
    const { data } = await axios.post(
      `/boards/${boardId}/lists/${listId}/cards`,
      { title, description }
    );
    return data;
  };

  const moveCard = async ({
    boardId,
    cardId,
    sourceListId,
    destinationListId,
    newPosition
  }: {
    boardId: string;
    cardId: string;
    sourceListId: string;
    destinationListId: string;
    newPosition: number;
  }) => {
    const { data } = await axios.put(`/boards/${boardId}/cards/${cardId}/move`, {
      sourceListId,
      destinationListId,
      newPosition
    });
    return data;
  };

  return {
    useBoards: () => useQuery({
      queryKey: ['boards'],
      queryFn: fetchBoards
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

    useCreateCard: () => useMutation({
      mutationFn: createCard,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
      }
    }),

    useMoveCard: () => useMutation({
      mutationFn: moveCard,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['boards'] });
      }
    })
  };
};