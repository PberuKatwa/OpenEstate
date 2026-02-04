import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType, LoginUser } from "../types/auth.types";
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
          const { user, token } = JSON.parse(authData);
          setUser(user)
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

      const response:ApiResponse = await authService.login(email, password);


    } catch (error) {
      console.error(`Error in logging in user`, error)
      throw error;
    }
  }

}
