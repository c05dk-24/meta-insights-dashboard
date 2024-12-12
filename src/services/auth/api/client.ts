import axios from 'axios';
import { getApiUrl } from '../../../utils/config';
import { setupInterceptors } from './interceptors';

export const createAuthApiClient = () => {
  const client = axios.create({
    baseURL: getApiUrl(),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    withCredentials: true
  });

  setupInterceptors(client);
  return client;
};