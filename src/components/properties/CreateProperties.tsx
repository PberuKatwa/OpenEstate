import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUpload,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { propertiesService } from "../../services/properties.service";
import { fileService } from "../../services/file.service";
import type { CreatePropertyPayload } from "../../types/property.types";

const initialPayload: CreatePropertyPayload = {
  userId: null,
  fileId: 0,
  name: "",
  price: 0,
  location: "",
  description: "",
  isRental: false,
};

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreatePropertyModal = function ({ isOpen,onClose, onSuccess }: CreatePropertyModalProps) {
  const [data, setData] = useState<CreatePropertyPayload>(initialPayload);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setLoading(true);
      if (!event.target.files || event.target.files.length === 0)
        throw new Error("No file was uploaded");

      const file = event.target.files[0];
      const form = new FormData();
      form.append("file", file);

      const response = await fileService.uploadImage(form);
      if (!response.data) throw new Error("Error uploading file");

      toast.success(response.message);
      const fileId = response.data.id
      setData((prev) => ({ ...prev, fileId }));
    } catch {
      toast.error("Invalid format, only images are allowed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await propertiesService.createProperty(data);
      toast.success(response.message);
      setData(initialPayload);
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(`Error creating property: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setData(initialPayload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              New Property
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              List your space in seconds.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-black hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-all"
          >
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
          </button>
        </div>

        {/* FORM */}
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>

          {/* Image Upload */}
          <div className="relative">
            <label
              htmlFor="create-file-upload"
              className={`cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300
                ${loading ? "opacity-50 pointer-events-none" : "hover:before:scale-105 active:before:scale-95"}`}
            >
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    className="text-blue-600 text-2xl animate-spin"
                  />
                </div>
              )}
              <div className={`flex items-center gap-4 transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}>
                <FontAwesomeIcon icon={faUpload} className="text-lg" />
                <span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
                  Upload a file
                </span>
              </div>
            </label>
            <input
              id="create-file-upload"
              type="file"
              className="hidden"
              disabled={loading}
              onChange={handleImageUpload}
            />
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Property Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="e.g. Modern Sunset Villa"
                className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder="e.g. 100,000"
                className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Description
              </label>
              <textarea
                rows={3}
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="e.g. 5 bedrooms, 4 bathrooms"
                className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={data.location}
                onChange={handleChange}
                placeholder="e.g. Westlands, Nairobi"
                className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Is Property A Rental
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isRental"
                    value="true"
                    checked={data.isRental === true}
                    onChange={() => setData((prev) => ({ ...prev, isRental: true }))}
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isRental"
                    value="false"
                    checked={data.isRental === false}
                    onChange={() => setData((prev) => ({ ...prev, isRental: false }))}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3.5 text-sm font-bold text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-3.5 bg-black text-white text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-black/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
