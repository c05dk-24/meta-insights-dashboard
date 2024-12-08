export const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api';
  }
  return 'https://meta-insights-api.onrender.com/api';
};