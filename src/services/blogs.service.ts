import type { AllBlogsApiResponse, BlogPayload, SingleBlogApiResponse } from "../types/blog.types";
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
  },

  async createBlog(payload:BlogPayload) {
    try {
      const response = await authorizedApiClient.post(
        `/blogs`,
        {
          title: payload.title,
          content: payload.content
        }
      )

      const blogRes: SingleBlogApiResponse = response.data;
      return blogRes;

    } catch (error) {
      throw error;
    };
  }

}
