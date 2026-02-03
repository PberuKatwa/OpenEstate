import { useState } from "react"
import type { AllBlogsApiResponse, BlogPayload, Blog } from "../../../types/blog.types"
import { toast } from "react-toastify";
import { blogsService } from "../../../services/blogs.service";

const initialState:BlogPayload = {
  id: null,
  authorId: null,
  title: "",
  content:""
}

export const Blogs = function () {

  const [payloadData, setPayloadData] = useState<BlogPayload>(initialState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Blog[] | []>([]);

  const getAllBlogs = async function (page: number, limit: number) {
    try {

      setIsLoading(true);
      const response: AllBlogsApiResponse = await blogsService.getAllBlogs(page, limit);

      if (!response.data) throw new Error(`No blog response data`);
      setCurrentPage(response.data?.pagination.currentPage);
      setTotalPages(response.data.pagination.totalPages);
      setLimit(limit);
      setBlogs(response.data.blogs);
      toast.success(response.message);

    } catch (error) {
      console.error(`Error in fetching all blogs`, error);
      toast.error(`${error}`)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <h1>BLOGSSSSSSSss</h1>
  )
}
