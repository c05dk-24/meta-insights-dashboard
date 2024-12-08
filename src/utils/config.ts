export const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://meta-insights-api.onrender.com';
  }
  return 'https://meta-insights-api.onrender.com';
};