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
      localStorage.setItem("token", response.data.data.access_token)
      return response.data;

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
