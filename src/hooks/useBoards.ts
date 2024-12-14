import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { Board, List } from '../types/meta';
import { boardsApi } from '../api/boards';

export const useBoards = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const api = boardsApi(axios);

  return {
    useBoards: () =>
      useQuery({
        queryKey: ['boards'],
        queryFn: api.fetchBoards,
        retry: 1,
        staleTime: 30000,
      }),

    useCreateBoard: () =>
      useMutation({
        mutationFn: api.createBoard,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
      }),

    useCreateList: () =>
      useMutation({
        mutationFn: api.createList,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
      }),
  };
};