import { useState } from "react";
import type { BlogPayload } from "../../types/blog.types";
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

}
