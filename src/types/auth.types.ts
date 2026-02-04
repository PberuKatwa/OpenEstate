import type { ApiResponse } from "./api.types";

export interface User {
  firstName: string;
  lastName: string;
  signedUrl?: string;
  email: string;
}

export type LoginUser = (email: string, password: string) => Promise<ApiResponse>;

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: LoginUser;
  logout: () => void;
}
