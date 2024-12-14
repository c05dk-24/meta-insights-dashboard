export const getApiUrl = (): string => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    console.warn('VITE_API_URL is not defined in environment variables');
    return 'http://localhost:3001';
  }
  return apiUrl.replace(/\/$/, '');
};