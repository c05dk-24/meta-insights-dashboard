export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginRequest extends LoginCredentials {
  client_version?: string;
  timezone?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    company_id: string;
    Company?: {
      name: string;
    };
  };
}

export interface AuthError {
  code: string;
  message: string;
  status?: number;
}