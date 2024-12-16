import { create } from 'zustand';
import { BoardStore } from './types';
import { createBoardActions } from './actions';

const initialState = {
  boards: [],
  activeBoard: null,
  currentUser: null
};

export const useBoardStore = create<BoardStore>((set) => ({
  ...initialState,
  ...createBoardActions(set)
}));