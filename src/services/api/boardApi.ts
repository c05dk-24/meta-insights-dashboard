```typescript
import { apiClient } from './client';
import { API_CONFIG } from './config';
import { Board, List, Card } from '../../types/board';

class BoardApi {
  async getBoards() {
    return apiClient.get<Board[]>(API_CONFIG.endpoints.boards);
  }

  async createBoard(title: string) {
    return apiClient.post<Board>(API_CONFIG.endpoints.boards, { title });
  }

  async createList(boardId: string, title: string) {
    return apiClient.post<List>(
      API_CONFIG.endpoints.lists(boardId),
      { title }
    );
  }

  async createCard(
    boardId: string,
    listId: string,
    { title, description }: { title: string; description?: string }
  ) {
    return apiClient.post<Card>(
      API_CONFIG.endpoints.cards(boardId, listId),
      { title, description }
    );
  }
}

export const boardApi = new BoardApi();
```