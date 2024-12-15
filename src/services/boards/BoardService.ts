import { AxiosInstance } from 'axios';
import { Board, List } from '../../types/meta';
import { CreateBoardDTO, CreateListDTO, ApiResponse } from './types';
import { handleApiError } from '../utils/errorHandler';

export class BoardService {
  constructor(private axios: AxiosInstance) {}

  async getBoards(): Promise<Board[]> {
    try {
      const { data } = await this.axios.get<ApiResponse<Board[]>>('/boards');
      return data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async createBoard(dto: CreateBoardDTO): Promise<Board> {
    try {
      const { data } = await this.axios.post<ApiResponse<Board>>('/boards', dto);
      return data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async createList(dto: CreateListDTO): Promise<List> {
    try {
      const { data } = await this.axios.post<ApiResponse<List>>(
        `/boards/${dto.boardId}/lists`,
        { title: dto.title }
      );
      return data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getBoardById(boardId: string): Promise<Board> {
    try {
      const { data } = await this.axios.get<ApiResponse<Board>>(`/boards/${boardId}`);
      return data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}