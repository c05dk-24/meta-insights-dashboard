export const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://meta-insights-dashboard-1.onrender.com';
  }
  return 'https://meta-insights-dashboard-1.onrender.com';
};