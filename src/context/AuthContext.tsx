import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType, LoginUser, LoginUserResponse } from "../types/auth.types";
import type { ApiResponse } from "../types/api.types";
import { authService } from "../services/auth.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = function ({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User|null>(null);
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
        setIsLoading(false);
      }

    },
    []
  )

  const loginUser: LoginUser = async function (email:string,password:string):Promise<ApiResponse> {
    try {

      const response: LoginUserResponse = await authService.login(email, password);
      if (!response.data?.id) throw new Error(`Error in logging in`);
      if (!response.data?.access_token) throw new Error(`Error in logging in`);

      const userData: User = {
        id: response.data?.id,
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        signedUrl: response.data.signedUrl
      };

      setUser(userData);
      setToken(response.data.access_token);
      localStorage.setItem('authData', JSON.stringify({userData,token}))

      return { success:response.success, message:response.message }

    } catch (error) {
      console.error(`Error in logging in user`, error)
      return {
        success: false,
        message:`${error}`
      }
    }
  }

}
