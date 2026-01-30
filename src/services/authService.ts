import { apiClient } from "./apiClient";

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
  }

}
