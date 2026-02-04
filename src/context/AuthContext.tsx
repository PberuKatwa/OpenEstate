import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType, LoginUser } from "../types/auth.types";

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

}
