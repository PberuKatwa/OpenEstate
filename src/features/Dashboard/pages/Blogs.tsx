import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage, faXmark, faEye, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import type { AllBlogsApiResponse, BlogPayload, Blog, SingleBlogApiResponse } from "../../../types/blog.types"
import { toast } from "react-toastify";
import { blogsService } from "../../../services/blogs.service";
import propertyImg from "../../../assets/pexels-mukula-igavinchi-443985808-15496495.jpg";

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
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogs, setSelectedBlog] = useState<Blog | null>(null);

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

  const openCreateModal = () => {
    setModalMode("create");
    setPayloadData(initialState);
    setSelectedBlog(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (blog: Blog) => {
    setModalMode("update");
    setSelectedBlog(blog);
    setPayloadData({
      id:blog.id,
      title: blog.title,
      content:blog.content
    });
    setIsModalOpen(true);
  };

  const handleChange = function (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) {
    try {
      const { name, value } = event.target;

      setPayloadData(
        (prev) => ({ ...prev, [name]: value })
      );

    } catch (error) {
      console.error("error in handling change event", error)
    }
  }

  const handleCreateBlog = async function (event: React.FormEvent) {
    try {

      event.preventDefault();
      setIsLoading(true);

      const payload: BlogPayload = {
        title: payloadData.title,
        content:payloadData.content
      }

      const response: SingleBlogApiResponse = await blogsService.createBlog(payload);
      if (!response.data) throw new Error(`No blog response data`);
      toast.success(response.message);
      getAllBlogs(currentPage, limit);
      setIsModalOpen(false);

    } catch (error) {
      console.error(`Error in handling submit`, error);
      toast.error(`${error}`);
    } finally {
      toast.success(false);
    }
  }

  const handleUpdateBlog = async function (event:React.FormEvent) {
    try {

      event.preventDefault();
      setIsLoading(true);

      const payload: BlogPayload = {
        id: payloadData.id,
        title: payloadData.title,
        content: payloadData.content
      }

      const response = await blogsService.updateBlog(payload);
      if (!response.data) throw new Error(`Error in handling blog update`);
      toast.success(response.message);
      getAllBlogs(currentPage, limit);
      setIsModalOpen(false);

    } catch (error) {
      console.error(`Error in handling update blog`, error)
      toast.error(`${error}`)
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async function (id: number) {
    try {

      setIsLoading(true);

      const response: SingleBlogApiResponse = await blogsService.trashProperty(id);
      if (!response.data) throw new Error(`No blog response data`);
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
          onClick={openCreateModal}
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
                src={blog.image_url
                  ? `${blog.image_url}`
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

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
          {/* MODAL CONTAINER - This is what adds the 'space' between edges */}
          <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto animate-in fade-in zoom-in duration-300">

            {/* MODAL HEADER */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  {modalMode === "create" ? "New Blog" : "Update Blog"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {modalMode === "create" ? "Write your blog in seconds." : "Update blog details."}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPayloadData(initialState);
                  setSelectedBlog(null);
                }}
                className="text-gray-400 hover:text-black hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-all"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>

            {/* MODAL BODY */}
            <form className="p-8 space-y-6" onSubmit={ modalMode === "create"? handleCreateBlog : handleUpdateBlog}>

              {/* Inputs */}
              <div className="space-y-4">

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Blog Title</label>
                  <input
                    type="text"
                    name="title"
                    value={payloadData.title}
                    onChange={handleChange}
                    placeholder="e.g. New Property Law"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white
                    focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Content</label>
                  <textarea
                    rows={4}
                    name="content"
                    value={payloadData.content}
                    onChange={handleChange}
                    placeholder="e.g. This is a groundbreaking discovery"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white
                    focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
                  />
                </div>

              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setPayloadData(initialState);
                    setSelectedBlog(null);
                  }}
                  className="flex-1 py-3.5 text-sm font-bold text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] py-3.5 bg-black text-white text-sm font-bold rounded-xl hover:shadow-xl
                  hover:shadow-black/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? (modalMode === "create" ? "Publishing Blog..." : "Updating Blog...")
                    : (modalMode === "create" ? "Publish Listing" : "Update Property")
                  }
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}
