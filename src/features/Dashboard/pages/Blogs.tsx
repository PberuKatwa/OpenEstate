import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import type { AllBlogsApiResponse, Blog, SingleBlogApiResponse, FullBlog } from "../../../types/blog.types"
import { toast } from "react-toastify";
import { blogsService } from "../../../services/blogs.service";
import propertyImg from "../../../assets/pexels-mukula-igavinchi-443985808-15496495.jpg";
import { CreateBlogModal } from "../../../components/blogs/CreateBlogs";
import { UpdateBlogModal } from "../../../components/blogs/UpdateBlogs";

const initialBlog: FullBlog = {
  id: 0,
  author_id: 0,
  content: "",
  file_id: 0,
  file_url: "",
  signed_url: "",
  title:""
}

export const Blogs = function () {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<FullBlog[] | []>([]);
  const [selectedBlog, setSelectedBlog] = useState<FullBlog>();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

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

  const openUpdateModal = (blog: FullBlog) => {
    setSelectedBlog(blog);
    setIsUpdateOpen(true);
  };

  const handleDelete = async function (id: number) {
    try {

      setIsLoading(true);

      const response: SingleBlogApiResponse = await blogsService.trashProperty(id);
      if (!response.message) throw new Error(`No blog response data`);
      toast.success(response.message);
      getAllBlogs(currentPage, limit);

    } catch (error) {
      console.error(`Error in handling delete`, error)
      toast.error(`${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(
    function () {
      getAllBlogs(currentPage,limit)
    },
    [currentPage,limit]
  )

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-50">

      {/* ACTION BUTTONS */}
      <div className="mb-6">
        <button
          type="button"
          onClick={()=>setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all text-sm font-medium shadow-sm"
        >
          <FontAwesomeIcon icon={faPlus} />
          Create Blog
        </button>
      </div>


      {/* PROPERTIES GRID */}
      {isLoading ? (
        <p className="text-gray-400">Loading Blogs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              <img
                src={blog.signed_url
                  ? `${blog.signed_url}`
                  : propertyImg
                }
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h5 className="mb-1 text-lg font-bold text-gray-900">
                  {blog.title}
                </h5>
                <p className="text-sm text-gray-500 mb-3 line-clamp-3">
                  {blog.content}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-90 rounded-lg transition-colors bg-white/90"
                    aria-label="View property"
                  >
                    <FontAwesomeIcon icon={faEye} className="text-lg" />
                  </button>
                  <button
                    onClick={() => openUpdateModal(blog)}
                    className="flex-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors bg-white/90"
                    aria-label="Edit property"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                  </button>
                  <button
                    onClick={()=> handleDelete(blog.id)}
                    className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors bg-white/90"
                    aria-label="Delete property"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {!isLoading && blogs.length === 0 && (
        <p className="text-gray-400">No blogs found.</p>
      )}

      {/* PAGINATION CONTROLS */}
      {!isLoading && blogs.length > 0 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50
              disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg transition-all ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg
              hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

        </div>
      )}

      {/* MODALS */}
      <CreateBlogModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={()=>getAllBlogs(currentPage,limit)}
      />

      <UpdateBlogModal
        isOpen={isUpdateOpen}
        blog={selectedBlog}
      />

    </div>
  )
}
