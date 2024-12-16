import { AxiosInstance } from 'axios';
import { BoardList } from '../../types/meta';
import { handleApiError } from '../utils/errorHandler';

export class ListService {
  constructor(private axios: AxiosInstance) {}

  async getListsForBoard(boardId: string): Promise<BoardList[]> {
    try {
      const { data } = await this.axios.get(`/api/boards/${boardId}/lists`);
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async moveCard(sourceListId: string, targetListId: string, cardId: string) {
    try {
      await this.axios.post(`/api/lists/${sourceListId}/cards/${cardId}/move`, {
        targetListId
      });
    } catch (error) {
      throw handleApiError(error);
    }
  }
}