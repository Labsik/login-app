export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
  expiresInMins?: number;
}
