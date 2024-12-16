import { create } from 'zustand';
import { BoardStore } from './types';
import { initialState } from './initialState';
import { createBoardActions } from './actions';

export const useBoardStore = create<BoardStore>((set) => ({
  ...initialState,
  ...createBoardActions(set)
}));