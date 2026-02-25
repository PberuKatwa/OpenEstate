import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUpload,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { propertiesService } from "../../../services/properties.service";
import { fileService } from "../../../services/file.service";
import type { CreatePropertyPayload } from "../../../types/property.types";

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

export const CreatePropertyModal = function ({
  isOpen,
  onClose,
  onSuccess,
}: CreatePropertyModalProps) {
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
      setData((prev) => ({ ...prev, fileId: response.data.id }));
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
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-xl shadow-lg overflow-y-auto border border-[#E5E7EB]">

        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-5 border-b border-[#E5E7EB]">
          <div>
            <h3 className="text-xl font-semibold text-[#111827]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              New Property
            </h3>
            <p className="text-xs text-[#6B7280] mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              List your space in seconds.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg w-9 h-9 flex items-center justify-center transition-all duration-150"
            aria-label="Close modal"
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
              className={`cursor-pointer flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-[#E5E7EB] rounded-xl bg-[#F9FAFB] hover:border-[#C0182A] hover:bg-[#C0182A]/5 transition-all duration-200 group
                ${loading ? "opacity-50 pointer-events-none" : ""}`}
            >
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    className="text-[#C0182A] text-3xl animate-spin"
                  />
                  <span className="text-sm font-medium text-[#6B7280]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Uploading...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#C0182A] group-hover:bg-white transition-all">
                    <FontAwesomeIcon icon={faUpload} className="text-[#6B7280] text-lg group-hover:text-[#C0182A]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#111827] group-hover:text-[#C0182A]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Drop your images here
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Supports JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>
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

          {/* Fields */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Property Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="e.g. Westlands Plaza"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:bg-white focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] outline-none transition-all text-[#111827] placeholder:text-[#9CA3AF] text-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Price (KES)
              </label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder="e.g. 2,400,000"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:bg-white focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] outline-none transition-all text-[#111827] placeholder:text-[#9CA3AF] text-sm font-medium"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={data.location}
                onChange={handleChange}
                placeholder="e.g. Westlands, Nairobi"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:bg-white focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] outline-none transition-all text-[#111827] placeholder:text-[#9CA3AF] text-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Description
              </label>
              <textarea
                rows={3}
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="e.g. 5 bedrooms, 4 bathrooms, modern finishes"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white focus:bg-white focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] outline-none transition-all text-[#111827] placeholder:text-[#9CA3AF] text-sm resize-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Property Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="isRental"
                    value="true"
                    checked={data.isRental === true}
                    onChange={() => setData((prev) => ({ ...prev, isRental: true }))}
                    className="w-4 h-4 text-[#C0182A] border-[#D1D5DB] focus:ring-[#C0182A] focus:ring-2"
                  />
                  <span className="text-sm text-[#111827] group-hover:text-[#C0182A] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Rental
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="isRental"
                    value="false"
                    checked={data.isRental === false}
                    onChange={() => setData((prev) => ({ ...prev, isRental: false }))}
                    className="w-4 h-4 text-[#C0182A] border-[#D1D5DB] focus:ring-[#C0182A] focus:ring-2"
                  />
                  <span className="text-sm text-[#111827] group-hover:text-[#C0182A] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    For Sale
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-all duration-150 border border-[#E5E7EB]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-2.5 bg-[#22C55E] text-white text-sm font-semibold rounded-lg hover:bg-[#16A34A] hover:shadow-md active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {loading ? "Publishing..." : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
