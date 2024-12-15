import React from 'react';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { useCardComments } from '../../../../hooks/useCardComments';

interface Props {
  cardId: string;
}

export const CardComments: React.FC<Props> = ({ cardId }) => {
  const { comments, addComment } = useCardComments(cardId);

  return (
    <div className="space-y-4">
      <CommentInput onSubmit={(text) => addComment({ text, cardId })} />
      <CommentList comments={comments} />
    </div>
  );
};