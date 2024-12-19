import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from './useAxios';
import { ChecklistService } from '../services/cards/ChecklistService';
import { toast } from 'react-hot-toast';

export const useCardChecklist = (cardId: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const checklistService = new ChecklistService(axios);

  const { data: checklist = [], isLoading } = useQuery({
    queryKey: ['card-checklist', cardId],
    queryFn: () => checklistService.getChecklists(cardId),
    enabled: !!cardId
  });

  const addItem = useMutation({
    mutationFn: (text: string) => checklistService.addItem(cardId, text),
    onSuccess: () => {
      queryClient.invalidateQueries(['card-checklist', cardId]);
      toast.success('Checklist item added');
    },
    onError: () => {
      toast.error('Failed to add checklist item');
    }
  });

  const toggleItem = useMutation({
    mutationFn: (itemId: string) => checklistService.toggleItem(cardId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['card-checklist', cardId]);
    },
    onError: () => {
      toast.error('Failed to update checklist item');
    }
  });

  const removeItem = useMutation({
    mutationFn: (itemId: string) => checklistService.deleteItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['card-checklist', cardId]);
      toast.success('Checklist item removed');
    },
    onError: () => {
      toast.error('Failed to remove checklist item');
    }
  });

  return {
    checklist,
    isLoading,
    addItem,
    toggleItem,
    removeItem
  };
};