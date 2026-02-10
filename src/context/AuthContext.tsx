import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { BaseUser, AuthContextType, UserApiResponse, AuthUserApiResponse, AuthUser, ProfileApiResponse } from "../types/auth.types";
import type { ApiResponse } from "../types/api.types";
import { authService } from "../services/auth.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = function ({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<BaseUser|null>(null);
  const [token, setToken] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {

      const authData = localStorage.getItem('authData');

      if (authData) {
        try {
          const { userData, token } = JSON.parse(authData);
          setUser(userData)
          setToken(token)
        } catch (error) {
          console.error(`Error in parsing user`,error)
        }

      }
       setIsLoading(false);
    },
    []
  )

  const login: AuthContextType['login'] = async function (email:string,password:string):Promise<ApiResponse> {
    try {

      const response: AuthUserApiResponse = await authService.login(email, password);
      if (!response.data?.access_token) throw new Error(`Error in logging in`);

      setToken(response.data.access_token);
      localStorage.setItem('acess_token', JSON.stringify(token));

      return { success:response.success, message:response.message }

    } catch (error) {
      console.error(`Error in logging in user`, error)
      return {
        success: false,
        message:`${error}`
      }
    }
  }

  const fetchProfile: AuthContextType['fetchProfile'] = async function (): Promise<ProfileApiResponse> {

    try {

      const response = await authService.profile();
      if (!response.data) throw new Error(`No user data was found`);
      const user = response.data;
      setUser(user);

    } catch (error) {
      console.error(`Error in fetching profile`, error)
    }

  }

  const logout = function () {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authData');
    window.location.href = '/login';
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    isLoading
  };

  return (
      <AuthContext.Provider value={value}>
        {!isLoading && children}
      </AuthContext.Provider>
    );

}

export const useAuth = function ():AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
