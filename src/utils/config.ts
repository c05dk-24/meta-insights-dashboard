export const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://meta-insights-dashboard-1.onrender.com/api';
  }
  
  // For development, try environment variable first, then fallback
  return import.meta.env.VITE_API_URL || 'https://meta-insights-dashboard-1.onrender.com/api';
};