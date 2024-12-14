import { AxiosInstance } from 'axios';
import { Board, List } from '../types/meta';

export const boardsApi = (axios: AxiosInstance) => ({
  fetchBoards: async (): Promise<Board[]> => {
    const { data } = await axios.get('/boards');
    return data || [];
  },

  createBoard: async (title: string): Promise<Board> => {
    const { data } = await axios.post('/boards', { title });
    return data;
  },

  createList: async (params: { boardId: string; title: string }): Promise<List> => {
    const { boardId, title } = params;
    const { data } = await axios.post(`/boards/${boardId}/lists`, { title });
    return data;
  },
});