import { BoardState } from './types';

export const initialState: BoardState = {
  boards: [],
  activeBoard: {
    id: '1',
    title: 'Main Board',
    Lists: [
      {
        id: 'list-1',
        title: 'To Do',
        position: 0,
        Cards: []
      },
      {
        id: 'list-2',
        title: 'In Progress',
        position: 1,
        Cards: []
      },
      {
        id: 'list-3',
        title: 'Done',
        position: 2,
        Cards: []
      }
    ]
  }
};