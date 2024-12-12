export const logMetaApiCall = (
  method: string,
  endpoint: string,
  params?: any,
  response?: any,
  error?: any
) => {
  console.group(`Meta API Call: ${method} ${endpoint}`);
  
  if (params) {
    console.log('Parameters:', params);
  }
  
  if (response) {
    console.log('Response:', response);
  }
  
  if (error) {
    console.error('Error:', error);
  }
  
  console.groupEnd();
};