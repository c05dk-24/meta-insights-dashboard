import React from 'react';
import { useBoardStore } from '../../../store/boardStore';
import { BoardGrid } from './BoardGrid';
import { BoardListHeader } from './BoardListHeader';
import { useAuth } from '../../../hooks/useAuth';

export const BoardListView = () => {
  const { user } = useAuth();
  const { boards, fetchUserBoards } = useBoardStore();

  React.useEffect(() => {
    if (user?.id) {
      fetchUserBoards(user.id);
    }
  }, [user?.id, fetchUserBoards]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <BoardListHeader />
      <BoardGrid boards={boards} />
    </div>
  );
};