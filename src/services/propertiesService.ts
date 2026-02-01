import { authorizedApiClient} from "./apiClient";

export const propertiesService = {

  async getAllProperties(page: Number= 1, limit: Number = 10) {
    try {
      const response = await authorizedApiClient.get(`properties/all/${page}/${limit}`)

      return response.data;
    } catch (error) {
      throw error;
    }

  }

}
