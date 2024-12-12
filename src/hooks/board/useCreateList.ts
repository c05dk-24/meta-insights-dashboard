```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardApi } from '../../services/api/boardApi';
import { toast } from 'react-hot-toast';

export const useCreateList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, title }: { boardId: string; title: string }) => 
      boardApi.createList(boardId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      toast.success('List created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create list');
    }
  });
};
```