import { authorizedApiClient } from "./api.client";
import type { ApiResponse } from "../types/api.types";
import type { CreatePropertyPayload } from "../types/property.types";

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

  async createProperty(payload:CreatePropertyPayload):Promise<ApiResponse> {
    try {
      console.log("payloaddd", payload)
      const response = await authorizedApiClient.post("/properties", payload);

      const propertyRes: ApiResponse = response.data;
      return propertyRes;
    } catch (error) {
      throw error;
    }
  },

  async trashProperty(id: number) {
    try {
      const response= await authorizedApiClient.post(
        `/properties/trash/${id}`
      )

      const propertyRes: ApiResponse = response.data;
      return propertyRes;
    } catch (error) {
      throw error;
    }
  },

  async updateProperty(payload: FormData):Promise<ApiResponse> {
    try {

      const response = await authorizedApiClient.post(
        "/properties/update",
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
