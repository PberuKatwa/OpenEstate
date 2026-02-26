import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUpload,
  faCircleNotch,
  faHouse,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { propertiesService } from "../../services/properties.service";
import { fileService } from "../../services/file.service";
import type { Property, UpdatePropertyPayload } from "../../types/property.types";

const initialState: UpdatePropertyPayload = {
  id: 0,
  fileId: null,
  name: "",
  price: 0,
  location: "",
  description: "",
  isRental: false,
};

interface UpdatePropertyModalProps {
  isOpen: boolean;
  property: Property;
  onClose: () => void;
  onSuccess: () => void;
}

export const UpdatePropertyModal = function ({
  isOpen,
  property,
  onClose,
  onSuccess,
}: UpdatePropertyModalProps) {
  const [data, setData] = useState<UpdatePropertyPayload>(initialState);
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    if (property) {
      setData({
        id: property.id,
        fileId: property.file_id,
        name: property.name,
        price: property.price,
        location: property.location,
        description: property.description,
        isRental: property.is_rental,
      });
      setImageUploaded(false);
    }
  }, [property]);

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
      const fileId = response.data.id;
      setData((prev) => ({ ...prev, fileId }));
      setImageUploaded(true);
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
      const response = await propertiesService.updateProperty(data);
      toast.success(response.message);
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(`Error updating property: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setData(initialState);
    setImageUploaded(false);
    onClose();
  };

  if (!isOpen || !property) return null;

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none bg-white focus:border-crimson focus:ring-2 focus:ring-crimson/20 transition-colors duration-150";

  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/30 p-4 sm:p-6 transition-opacity duration-200">
      <div className="relative z-[310] w-full max-w-[500px] max-h-[92vh] flex flex-col bg-white rounded-xl shadow-xl overflow-hidden">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 border border-red-100">
              <FontAwesomeIcon icon={faHouse} className="text-crimson text-sm" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Update Property</h3>
              <p className="text-xs text-gray-400">Edit your listing on Ardhitech</p>
            </div>
          </div>

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
              htmlFor="update-file-upload"
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
                  <span className="text-sm font-medium text-green-600">Image replaced successfully</span>
                </>
              ) : (
                <>
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-200 flex-shrink-0">
                    <FontAwesomeIcon icon={faUpload} className="text-gray-500 text-sm" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Replace property image</span>
                    <span className="text-xs text-gray-400">JPG, PNG, WEBP · optional</span>
                  </div>
                </>
              )}
            </label>
            <input
              id="update-file-upload"
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
            <label htmlFor="update-name" className={labelClass}>Property Name</label>
            <input
              id="update-name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="e.g. Westlands Plaza"
              required
              className={inputClass}
            />
          </div>

          {/* PRICE */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="update-price" className={labelClass}>Price (KES)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 pointer-events-none select-none">
                KES
              </span>
              <input
                id="update-price"
                type="number"
                name="price"
                value={data.price || ""}
                onChange={handleChange}
                placeholder="0"
                required
                className={inputClass + " pl-12 font-medium"}
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="update-location" className={labelClass}>Location</label>
            <input
              id="update-location"
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              placeholder="e.g. Westlands, Nairobi"
              required
              className={inputClass}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="update-description" className={labelClass}>Description</label>
            <textarea
              id="update-description"
              rows={3}
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="e.g. 5 bedrooms, 4 bathrooms, pool..."
              className={inputClass + " resize-none"}
            />
          </div>

          {/* PROPERTY TYPE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Type
            </label>

            <div className="flex gap-2">
              {(
                [
                  { label: "For Sale", value: false },
                  { label: "Rental", value: true },
                ] as const
              ).map(({ label, value }) => {
                const active = data.isRental === value;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, isRental: value }))}
                    className={[
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors duration-150 text-left",
                      active
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-150",
                        active ? "border-blue-500" : "border-gray-300",
                      ].join(" ")}
                    >
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 block" />
                      )}
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>

          </div>

          <hr className="border-gray-100" />

          {/* ACTIONS */}
          <div className="flex items-center gap-3 pb-1">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-gray-200 text-gray-500 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-150 hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:bg-red-100 active:border-red-400 active:text-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
