import axios from 'axios';
import { getApiUrl } from '../../../utils/config';
import { LoginRequest, LoginResponse } from '../types';
import { createAuthApiClient } from './client';
import { handleApiError } from './errorHandler';

const api = createAuthApiClient();

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};