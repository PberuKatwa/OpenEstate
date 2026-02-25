import { useState } from "react";
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

export const CreatePropertyModal = function ({
  isOpen,
  onClose,
  onSuccess,
}: CreatePropertyModalProps) {
  const [data, setData] = useState<CreatePropertyPayload>(initialPayload);
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      if (!e.target.files?.length) throw new Error("No file selected");
      const form = new FormData();
      form.append("file", e.target.files[0]);
      const response = await fileService.uploadImage(form);
      if (!response.data) throw new Error("Upload failed");
      toast.success(response.message);
      const fileId = response.data.id
      setData((prev) => ({ ...prev, fileId }));
      setImageUploaded(true);
    } catch {
      toast.error("Invalid format, only images are allowed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await propertiesService.createProperty(data);
      toast.success(response.message);
      setData(initialPayload);
      setImageUploaded(false);
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
    setImageUploaded(false);
    onClose();
  };

  if (!isOpen) return null;

  // Shared input classes per design system §6.7
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
              <FontAwesomeIcon icon={faHouse} className="text-crimson text-sm" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">New Property</h3>
              <p className="text-xs text-gray-400">List your space on Ardhitech</p>
            </div>
          </div>

          {/* close — icon-only button per §6.6 */}
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg
                       bg-red-50 text-red-600
                       hover:bg-red-100 hover:text-red-700
                       transition-colors duration-200"
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
            <label htmlFor="create-name" className={labelClass}>Property Name</label>
            <input
              id="create-name"
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
            <label htmlFor="create-price" className={labelClass}>Price (KES)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 pointer-events-none select-none">
                KES
              </span>
              <input
                id="create-price"
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
            <label htmlFor="create-location" className={labelClass}>Location</label>
            <input
              id="create-location"
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
            <label htmlFor="create-description" className={labelClass}>Description</label>
            <textarea
              id="create-description"
              rows={3}
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="e.g. 5 bedrooms, 4 bathrooms, pool..."
              className={inputClass + " resize-none"}
            />
          </div>

          {/* PROPERTY TYPE — custom button toggles, correct boolean state */}
          {/*
            Root cause of the radio bug: native <input type="radio"> with value="true"/"false"
            always produces a string, breaking boolean comparison. We replace with
            <button type="button"> that sets the exact boolean via onClick.
          */}
          <div className="flex flex-col gap-1.5">
            <span className={labelClass}>Property Type</span>
            <div className="grid grid-cols-2 gap-3">
              {([
                { label: "For Sale", value: false },
                { label: "Rental",   value: true  },
              ] as const).map(({ label, value }) => {
                const active = data.isRental === value;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, isRental: value }))}
                    className={[
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors duration-150 text-left",
                      active
                        ? "border-crimson bg-red-50 text-crimson"
                        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white",
                    ].join(" ")}
                  >
                    {/* custom radio indicator */}
                    <span
                      className={[
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150",
                        active ? "border-crimson" : "border-gray-300",
                      ].join(" ")}
                    >
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-crimson block" />
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
            {/* Ghost neutral cancel */}
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-150"
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
              {loading ? "Publishing..." : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
