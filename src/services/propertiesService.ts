import { authorizedApiClient } from "./apiClient";
import type { ApiResponse } from "../types/ApiTypes";

export const propertiesService = {

  async getAllProperties(page: Number= 1, limit: Number = 10):Promise<ApiResponse> {
    try {
      const response = await authorizedApiClient.get(`properties/all/${page}/${limit}`)
      const allProperties: ApiResponse = response.data;
      return allProperties;
    } catch (error) {
      throw error;
    }
  },

  async createProperty(payload:FormData):Promise<ApiResponse> {
    try {
      const response = await authorizedApiClient.post(
        "/properties",
        payload,
        { headers: { "Content-Type": "multipart/form-data", }}
      )

      const propertyRes: ApiResponse = response.data;
      return propertyRes;
    } catch (error) {
      throw error;
    }
  }

}
