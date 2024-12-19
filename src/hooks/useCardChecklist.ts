import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from './useSupabase';
import { CardService } from '../services/supabase/CardService';
import { toast } from 'react-hot-toast';

export const useCardChecklist = (cardId: string) => {
  const { supabase, isReady } = useSupabase();
  const queryClient = useQueryClient();
  const cardService = new CardService(supabase);

  const { data: checklist = [], isLoading } = useQuery({
    queryKey: ['card-checklist', cardId],
    queryFn: () => cardService.getChecklists(cardId),
    enabled: isReady && !!cardId
  });

  const addItem = useMutation({
    mutationFn: (text: string) => cardService.addChecklist(cardId, text),
    onSuccess: () => {
      queryClient.invalidateQueries(['card-checklist', cardId]);
      toast.success('Checklist item added');
    },
    onError: () => {
      toast.error('Failed to add checklist item');
    }
  });

  const toggleItem = useMutation({
    mutationFn: (itemId: string) => cardService.toggleChecklistItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['card-checklist', cardId]);
    },
    onError: () => {
      toast.error('Failed to update checklist item');
    }
  });

  return {
    checklist,
    isLoading,
    addItem,
    toggleItem
  };
};