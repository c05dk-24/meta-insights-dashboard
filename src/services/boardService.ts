import axios from 'axios';
import { Board } from '../types/meta';
import { getApiUrl } from '../utils/config';

const API_URL = getApiUrl();

export const boardService = {
  async fetchUserBoards(userId: string): Promise<Board[]> {
    try {
      const { data } = await axios.get(`${API_URL}/api/boards?userId=${userId}`);
      return data;
    } catch (error) {
      console.error('Failed to fetch boards:', error);
      return [];
    }
  }
};