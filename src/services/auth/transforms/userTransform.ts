import { User } from '../../../types/auth';

export const transformUserResponse = (userData: any): User => {
  // Ensure all required fields are present
  if (!userData.id || !userData.email || !userData.company_id) {
    console.error('Invalid user data:', userData);
    throw new Error('Invalid user data received from server');
  }

  return {
    id: userData.id,
    email: userData.email,
    name: userData.name || 'Unknown User',
    company_id: userData.company_id,
    companyName: userData.Company?.name || userData.companyName || 'Unknown Company',
    meta_page_id: userData.meta_page_id || null
  };
};