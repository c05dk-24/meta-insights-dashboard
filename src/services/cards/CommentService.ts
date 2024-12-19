import { AxiosInstance } from 'axios';
import { CardComment } from '../../types/meta';

export class CommentService {
  constructor(private axios: AxiosInstance) {}

  async getComments(cardId: string): Promise<CardComment[]> {
    const { data } = await this.axios.get(`/api/cards/${cardId}/comments`);
    return data;
  }

  async addComment(cardId: string, text: string, userId: string): Promise<CardComment> {
    const { data } = await this.axios.post(`/api/cards/${cardId}/comments`, {
      text,
      user_id: userId
    });
    return data;
  }

  async deleteComment(commentId: string): Promise<void> {
    await this.axios.delete(`/api/comments/${commentId}`);
  }
}