import { create } from 'zustand';
import { BoardStore } from './types';
import { createBoardActions } from './actions';

const initialState = {
  boards: [{
    id: '1',
    title: 'Main Board',
    lists: []
  }],
  activeBoard: {
    id: '1',
    title: 'Main Board',
    lists: []
  }
};

export const useBoardStore = create<BoardStore>((set) => ({
  ...initialState,
  ...createBoardActions(set)
}));