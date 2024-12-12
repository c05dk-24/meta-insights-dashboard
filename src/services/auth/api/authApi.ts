import { LoginRequest, LoginResponse } from '../types';
import { createAuthApiClient } from './client';
import { handleAuthError } from '../utils/errorHandler';
import { AUTH_ENDPOINTS } from '../constants';

const api = createAuthApiClient();

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const { data } = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  }
};