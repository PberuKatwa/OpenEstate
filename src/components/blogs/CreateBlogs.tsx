import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleNotch, faFilePen, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons"; import type { BlogPayload } from "../../types/blog.types";
import { toast } from "react-toastify";
import { fileService } from "../../services/file.service";
import { blogsService } from "../../services/blogs.service";


const initialPayload: BlogPayload = {
  title: "",
  content: "",
  fileId:0
}

interface CreateBlogModalProps {
  isOpen: boolean,
  onClose: () => void,
  onSuccess:() => void
}

export const CreateBlogModal = function (props: CreateBlogModalProps) {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BlogPayload>(initialPayload)
  const [imageUploaded, setImageUploaded] = useState(false);

  const { isOpen, onClose, onSuccess } = props;

  const handleImageUpload = async function (event:React.ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true);
      if (!event.target.files?.length) throw new Error("No file selected");

      const form = new FormData();
      form.append("file", event.target.files[0]);

      const response = await fileService.uploadImage(form);
      if (!response.data) throw new Error("Upload failed");

      toast.success(response.message);
      const fileId = response.data.id

      setData((prev) => ({ ...prev, fileId }));
      setImageUploaded(true);

    } catch (error) {
      console.error(`Error in uploading image`, error)
      toast.error(`Invalid format , only images are allowed.`)
    } finally {
      setLoading(false);
    }
  }

  const createBlog = async function () {
    try {

      setLoading(true);

      const response = await blogsService.createBlog(data);

      if (response.data) throw new Error(`No blog was created`)
      toast.success(response.message)
      setData(initialPayload);
      onSuccess();
      onClose();

    } catch (error) {
      console.error(`Error in creating blog`, error)
      toast.error(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(
      (prev) => ({ ...prev, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = async function (event:React.FormEvent) {
    event.preventDefault();
    await createBlog();
  }

  const handleClose = () => {
    setData(initialPayload);
    setImageUploaded(false);
    onClose();
  }

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none bg-white focus:border-crimson focus:ring-2 focus:ring-crimson/20 transition-colors duration-150";

  const labelClass = "text-sm font-medium text-gray-700";

  return (
    // Overlay — z-[300] per z-index stack §12
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/30 p-4 sm:p-6 transition-opacity duration-200">
      {/* Modal panel — z-[310] */}
      <div className="relative z-[310] w-full max-w-[500px] max-h-[92vh] flex flex-col bg-white rounded-xl shadow-xl overflow-hidden">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3">
            {/* crimson icon badge */}
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 border border-red-100">
              <FontAwesomeIcon icon={faFilePen} className="text-crimson text-sm" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">New Blog</h3>
              <p className="text-xs text-gray-400">Create your new Blog Post</p>
            </div>
          </div>

          {/* close — icon-only button per §6.6 */}
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg
                       text-red-600
                       hover:bg-red-600 hover:text-white
                       active:bg-red-700
                       transition-colors duration-150"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* ── SCROLLABLE FORM ── */}
        <form
          className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          {/* IMAGE UPLOAD */}
          <div className="flex flex-col gap-1.5">
            <span className={labelClass}>Property Image</span>
            <label
              htmlFor="create-file-upload"
              className={[
                "flex items-center gap-4 px-4 py-4 rounded-lg border border-dashed cursor-pointer transition-colors duration-150",
                imageUploaded
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-crimson hover:bg-red-50",
                loading ? "opacity-60 pointer-events-none" : "",
              ].join(" ")}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faCircleNotch} className="text-crimson text-lg animate-spin flex-shrink-0" />
                  <span className="text-sm text-gray-500">Uploading...</span>
                </>
              ) : imageUploaded ? (
                <>
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-lg flex-shrink-0" />
                  <span className="text-sm font-medium text-green-600">Image uploaded successfully</span>
                </>
              ) : (
                <>
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-200 flex-shrink-0">
                    <FontAwesomeIcon icon={faUpload} className="text-gray-500 text-sm" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Upload property image</span>
                    <span className="text-xs text-gray-400">JPG, PNG, WEBP</span>
                  </div>
                </>
              )}
            </label>
            <input
              id="create-file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              disabled={loading}
              onChange={handleImageUpload}
            />
          </div>

          <hr className="border-gray-100" />

          {/* PROPERTY NAME */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="create-name" className={labelClass}>Blog Title</label>
            <input
              id="create-name"
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="e.g. New Building Regulations"
              required
              className={inputClass}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="create-description" className={labelClass}>Description</label>
            <textarea
              id="create-description"
              rows={4}
              name="content"
              value={data.content}
              onChange={handleChange}
              placeholder="e.g. THe property market is rapidly changing ....."
              className={inputClass + " resize-none"}
            />
          </div>

          <hr className="border-gray-100" />

          {/* ACTIONS */}
          <div className="flex items-center gap-3 pb-1">
            {/* Ghost neutral cancel */}
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-gray-200 text-gray-500 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-150 hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:bg-red-100 active:border-red-400 active:text-red-700"
            >
              Cancel
            </button>
            {/* Create / Update green — per §6.6 */}
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />}
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}
