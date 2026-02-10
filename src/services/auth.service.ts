import type { AuthUserApiResponse } from "../types/auth.types";
import { apiClient, authorizedApiClient } from "./api.client";

export const authService = {

  async signUp( firstName:string, lastName:string, email:string, password:string ) {
    try {
      const response = await apiClient.post("/auth/register", {
        firstName,lastName,email,password
      })

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async login( email:string, password:string ) {
    try {

      const response = await apiClient.post("/auth/login", { email, password })
      const loginRes: AuthUserApiResponse = response.data;
      if (!loginRes.data?.access_token) throw new Error(`Invalid login, try agin`);
      localStorage.setItem("token", loginRes.data.access_token)
      return loginRes;

    } catch (error) {
      throw error;
    }
  },

  async profile() {
    try {
      const response = await authorizedApiClient.get("/auth/profile")
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
