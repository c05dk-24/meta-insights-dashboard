import { apiClient } from './config';
import { Board, List, Card } from '../../types/meta';

export const boardsApi = {
  getBoards: async () => {
    const { data } = await apiClient.get<Board[]>('/boards');
    return data;
  },

  createBoard: async (title: string) => {
    const { data } = await apiClient.get<Board>('/boards', { 
      data: { title } 
    });
    return data;
  },

  getBoard: async (id: string) => {
    const { data } = await apiClient.get<Board>(`/boards/${id}`);
    return data;
  },

  createList: async (boardId: string, title: string, position: number) => {
    const { data } = await apiClient.post<List>(`/boards/${boardId}/lists`, {
      title,
      position
    });
    return data;
  },

  createCard: async (listId: string, cardData: Partial<Card>) => {
    const { data } = await apiClient.post<Card>(`/lists/${listId}/cards`, cardData);
    return data;
  }
};