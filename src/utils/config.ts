export const getApiUrl = () => {
  return import.meta.env.PROD 
    ? (import.meta.env.VITE_API_URL || '/api')
    : 'http://localhost:3001/api';
};