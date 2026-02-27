import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import type { AllBlogsApiResponse, SingleBlogApiResponse, FullBlog } from "../types/blog.types"
import { toast } from "react-toastify";
import { blogsService } from "../services/blogs.service";
import propertyImg from "../assets/pexels-mukula-igavinchi-443985808-15496495.jpg";
import { CreateBlogModal } from "../components/blogs/CreateBlogs";
import { UpdateBlogModal } from "../components/blogs/UpdateBlogs";
import { useAuth } from "../context/AuthContext";

const initialBlog: FullBlog = {
  id: 0,
  author_id: 0,
  content: "",
  file_id: 0,
  file_url: "",
  signed_url: "",
  title: ""
}

export const Blogs = function () {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<FullBlog[] | []>([]);
  const [selectedBlog, setSelectedBlog] = useState<FullBlog>(initialBlog);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const context = useAuth();

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

  useEffect(function () {
    if (!context.isAuthenticated || context.isLoading) return;
    getAllBlogs(currentPage, limit);
  }, [currentPage, limit, context.isAuthenticated, context.isLoading]);

  return (
    <div className="min-h-screen bg-white px-3 py-8 font-[Poppins]">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center shadow-sm">
              <FontAwesomeIcon icon={faNewspaper} className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-[0.2em]">
              Content
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Blog Posts
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and publish your articles
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
          bg-rose-700 shadow-sm shadow-rose-700/20
          hover:bg-rose-800 hover:shadow-md hover:shadow-rose-700/30
          active:scale-95 transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" />
          New Post
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-gray-100/80 mb-10" />

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center gap-3 py-16 justify-center">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-rose-700 rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Loading posts…</span>
        </div>
      )}

      {/* ── Empty State ── */}
      {!isLoading && blogs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faNewspaper} className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-400">No blog posts yet</p>
          <p className="text-xs text-gray-300 mt-1">Create your first post to get started</p>
        </div>
      )}

      {/* ── Grid ── */}
      {!isLoading && blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden
              shadow-sm shadow-gray-200/60
              hover:shadow-lg hover:shadow-gray-200/70
              hover:-translate-y-[2px]
              transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48 rounded-t-2xl">
                <img
                  src={blog.signed_url ? blog.signed_url : propertyImg}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-80" />
              </div>

              {/* Body */}
              <div className="p-5 space-y-2">
                <h5 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
                  {blog.title}
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {blog.content}
                </p>
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 flex gap-2">
                <button
                  onClick={() => openUpdateModal(blog)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg
                  border border-gray-200 text-gray-500
                  hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700
                  hover:shadow-sm transition-all duration-200"                >
                  <FontAwesomeIcon icon={faEdit} className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg
                  border border-gray-200 text-gray-500
                  hover:border-red-300 hover:bg-red-50 hover:text-red-600
                  hover:shadow-sm transition-all duration-200"                >
                  <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {!isLoading && blogs.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Page info */}
          <p className="text-xs text-gray-400">
            Page <span className="font-semibold text-gray-600">{currentPage}</span> of <span className="font-semibold text-gray-600">{totalPages}</span>
          </p>

          {/* Page buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 text-xs font-medium rounded-lg transition-all ${
                  currentPage === page
                    ? "text-white border border-transparent"
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}
                style={currentPage === page ? { background: "#C0182A" } : {}}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>

          {/* Per page */}
          <select
            value={limit}
            onChange={(e) => { setLimit(Number(e.target.value)); setCurrentPage(1); }}
            className="px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer outline-none"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      )}

      {/* ── Modals ── */}
      <CreateBlogModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => getAllBlogs(currentPage, limit)}
      />
      <UpdateBlogModal
        isOpen={isUpdateOpen}
        blog={selectedBlog}
        onClose={() => setIsUpdateOpen(false)}
        onSuccess={() => getAllBlogs(currentPage, limit)}
      />
    </div>
  )
}
