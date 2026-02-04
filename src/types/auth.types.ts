import type { ApiResponse } from "./api.types";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  access_token?: string;
  image_url?: string;
  signedUrl?: string;
}

export interface LoginUserResponse extends ApiResponse<User> { };
export type LoginUser = (email: string, password: string) => Promise<ApiResponse>;

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: LoginUser;
  logout: () => void;
}
