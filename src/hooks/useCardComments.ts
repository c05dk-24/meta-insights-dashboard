```typescript
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './useAuth';

interface Comment {
  id: string;
  text: string;
  author: string;
  created_at: string;
}

interface AddCommentParams {
  text: string;
  userId: string;
  cardId: string;
}

export const useCardComments = (cardId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();

  const addComment = ({ text }: AddCommentParams) => {
    if (!user) return;

    const newComment: Comment = {
      id: uuidv4(),
      text,
      author: user.name,
      created_at: new Date().toISOString()
    };

    setComments([newComment, ...comments]);
  };

  return {
    comments,
    addComment
  };
};
```