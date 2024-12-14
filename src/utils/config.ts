export const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'https://meta-insights-dashboard-1.onrender.com';
  // Remove trailing slash if present
  return apiUrl.replace(/\/$/, '');
};