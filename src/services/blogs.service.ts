import type { AllBlogsApiResponse, BlogPayload, SingleBlogApiResponse, UpdateBlogPayload } from "../types/blog.types";
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

  async createBlog(payload:BlogPayload):Promise<SingleBlogApiResponse> {
    try {
      const response = await authorizedApiClient.post(`/blogs`, payload);
      const blogRes: SingleBlogApiResponse = response.data;
      return blogRes;

    } catch (error) {
      throw error;
    };
  },

  async trashProperty(id:number): Promise<SingleBlogApiResponse> {
    try {
      const response = await authorizedApiClient.post(`/blogs/trash/${id}`)

      const blogRes: SingleBlogApiResponse = response.data;
      return blogRes;

    }catch(error){
      throw error;
    }
  },

  async updateBlog(payload:UpdateBlogPayload):Promise<SingleBlogApiResponse> {
    try {

      const response = await authorizedApiClient.post("/blogs/update", payload)
      const blogRes: SingleBlogApiResponse = response.data;
      return blogRes;

    } catch (error) {
      throw error;
    }
  }

}
