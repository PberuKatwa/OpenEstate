import { authorizedApiClient } from "./apiClient";
import type { AllProperties } from "../types/PropertyTypes";
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

  async createProperty(formData) {
    try {
      const response = await authorizedApiClient.post(
        "/properties",
        formData,
        { headers: { "Content-Type": "multipart/form-data", }}
      )

      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
