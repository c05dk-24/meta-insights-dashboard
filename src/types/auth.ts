export interface User {
  id: string;
  email: string;
  name: string;
  company_id: string;
  meta_page_id?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}