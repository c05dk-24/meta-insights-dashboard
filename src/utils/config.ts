export const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://meta-insights-api.onrender.com';
  }
  return 'https://meta-insights-api.onrender.com';
};