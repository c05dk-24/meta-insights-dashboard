import { User } from '../../../types/auth';

export const transformUserResponse = (userData: any): User => {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    company_id: userData.company_id,
    companyName: userData.Company?.name || userData.companyName,
    meta_page_id: userData.meta_page_id
  };
};