import type { ApiResponse } from "./api.types";

export interface User {
  firstName: string;
  lastName: string;
  signedUrl?: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<ApiResponse>;
  logout: () => void;
}
