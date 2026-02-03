import type { AllBlogsApiResponse } from "../types/blog.types";
import { authorizedApiClient } from "./api.client";

export const blogsService = {

  async getAllBlogs(page: number, limit: number) {
    try {

      const response = await authorizedApiClient.get(`/blogs/all/${page}/${limit}`);
      const blogRes: AllBlogsApiResponse = response.data;
      return blogRes;

    } catch (error) {
      throw error;
    }
  }

}
