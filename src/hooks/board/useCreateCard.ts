```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardApi } from '../../services/api/boardApi';
import { toast } from 'react-hot-toast';

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      boardId, 
      listId, 
      title, 
      description 
    }: { 
      boardId: string;
      listId: string;
      title: string;
      description?: string;
    }) => boardApi.createCard(boardId, listId, { title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      toast.success('Card created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create card');
    }
  });
};
```