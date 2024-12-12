import { useAxios } from '../hooks/useAxios';
import { Board, List, Card } from '../types/board';
import { API_CONFIG } from '../utils/config';

export class BoardService {
  private axios = useAxios();

  async getBoards(): Promise<Board[]> {
    const { data } = await this.axios.get(API_CONFIG.ENDPOINTS.BOARDS);
    return data;
  }

  async createBoard(title: string): Promise<Board> {
    const { data } = await this.axios.post(API_CONFIG.ENDPOINTS.BOARDS, { title });
    return data;
  }

  async createList(boardId: string, title: string): Promise<List> {
    const { data } = await this.axios.post(
      `${API_CONFIG.ENDPOINTS.BOARDS}/${boardId}/lists`,
      { title }
    );
    return data;
  }

  async createCard(
    boardId: string,
    listId: string,
    { title, description }: { title: string; description?: string }
  ): Promise<Card> {
    const { data } = await this.axios.post(
      `${API_CONFIG.ENDPOINTS.BOARDS}/${boardId}/lists/${listId}/cards`,
      { title, description }
    );
    return data;
  }
}

export const boardService = new BoardService();