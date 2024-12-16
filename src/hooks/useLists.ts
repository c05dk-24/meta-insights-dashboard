import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { ListService } from '../services/lists/ListService';
import { toast } from 'react-hot-toast';

export const useLists = (boardId: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const listService = new ListService(axios);

  return {
    useBoardLists: () =>
      useQuery({
        queryKey: ['lists', boardId],
        queryFn: () => listService.getListsForBoard(boardId),
        enabled: !!boardId
      }),

    useMoveCard: () =>
      useMutation({
        mutationFn: async ({
          sourceListId,
          targetListId,
          cardId
        }: {
          sourceListId: string;
          targetListId: string;
          cardId: string;
        }) => {
          await listService.moveCard(sourceListId, targetListId, cardId);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['lists'] });
          toast.success('Card moved successfully');
        },
        onError: (error: Error) => {
          toast.error(error.message);
        }
      })
  };
};