import { authorizedApiClient} from "./apiClient";

export const propertiesService = {

  async getAllProperties(page: Number= 1, limit: Number = 10) {
    try {
      const response = await authorizedApiClient.get(`properties/all/${page}/${limit}`)

      return response.data;
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
