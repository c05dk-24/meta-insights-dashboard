export const getApiUrl = () => {
  return import.meta.env.PROD 
    ? 'https://meta-insights-dashboard-1.onrender.com/api'
    : 'http://localhost:3001/api';
};