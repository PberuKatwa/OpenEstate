import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage, faXmark, faEye, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import type { ApiResponse } from "../../../types/ApiTypes";
import { propertiesService } from "../../../services/propertiesService";
import propertyImg from "../../../assets/pexels-mukula-igavinchi-443985808-15496495.jpg";
import type { AllProperties, Property } from "../../../types/PropertyTypes";

const initialState = {
  id:0,
  image: null as File | null,
  name: "",
  price: 0,
  location: "",
  description: "",
  isRental:false
}

export const Properties = function () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [properties, setProperties] = useState<Property[] | []>([]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(initialState);

  const handleChange = function (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) {
    try {
      const { name, value } = event.target;

      setData(
        (prev) => ({ ...prev, [name]: value })
      );

    } catch (error) {
      console.error("error in handling change event", error)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (modalMode === "create" && !data.image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true)
      const formData = new FormData();

      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("name", data.name);
      formData.append("price", String(data.price));
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("isRental", String(data.isRental));

      let response: ApiResponse;

      if (modalMode === "create") {
        response = await propertiesService.createProperty(formData);
      } else {
        response = await propertiesService.updateProperty(formData)
        toast.success(response.message);
        console.log("Update property ID:",response);
        return;
      }

      toast.success(response.message)
      setIsModalOpen(false);
      setData(initialState);
      setSelectedProperty(null);
      getAllProperties(currentPage, limit);

    } catch (error) {
      console.error(`Failed to ${modalMode} property`, error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setData(initialState);
    setSelectedProperty(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (property: Property) => {
    setModalMode("update");
    setSelectedProperty(property);
    setData({
      id:0,
      image: null,
      name: property.name,
      price: property.price,
      location: property.location,
      description: property.description,
      isRental: property.is_rental
    });
    setIsModalOpen(true);
  };


  const getAllProperties = async function (currentPage:number, limit:number) {
    try {
      setLoading(true);
      const response: ApiResponse = await propertiesService.getAllProperties(currentPage, limit)

      const propertiesData: AllProperties = response.data;
      toast.success(response.message)
      setProperties(propertiesData.properties);
      setCurrentPage(propertiesData.pagination.currentPage);
      setTotalPages(propertiesData.pagination.totalPages);
      return response;
    } catch (error) {
      console.error("Failed to fetch properties", error);
      toast.error(`${error}`)
    }finally {
      setLoading(false);
    }

  }

  const handleDelete = async function (id: number) {
    try {

      const response: ApiResponse = await propertiesService.trashProperty(id);
      const data: Property = response.data;

      toast.success(response.message)
      getAllProperties(currentPage,limit)
    } catch (error) {
      toast.error(`${error}`)
      console.error(`Error in handling delete`, error)
    }
  }

  useEffect(
    function () {
      getAllProperties(currentPage,limit)
    }, [currentPage, limit]
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
          Create Property
        </button>
      </div>

      {/* PROPERTIES GRID */}
      {loading ? (
        <p className="text-gray-400">Loading properties...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              <img
                src={property.signedUrl
                  ? `${property.signedUrl}`
                  : propertyImg
                }
                alt={property.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h5 className="mb-1 text-lg font-bold text-gray-900">
                  {property.name}
                </h5>
                <p className="text-sm text-gray-500 mb-3">
                  {property.is_rental ? "Rental Property" : "For Sale"}
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  KES {Number(property.price).toLocaleString()}
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
                    onClick={() => openUpdateModal(property)}
                    className="flex-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors bg-white/90"
                    aria-label="Edit property"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                  </button>
                  <button
                    onClick={()=> handleDelete(property.id)}
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


      {!loading && properties.length === 0 && (
        <p className="text-gray-400">No properties found.</p>
      )}

      {/* PAGINATION CONTROLS */}
      {!loading && properties.length > 0 && (
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
                  {modalMode === "create" ? "New Property" : "Update Property"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {modalMode === "create" ? "List your space in seconds." : "Update property details."}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setData(initialState);
                  setSelectedProperty(null);
                }}
                className="text-gray-400 hover:text-black hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-all"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>

            {/* MODAL BODY */}
            <form className="p-8 space-y-6" onSubmit={handleSubmit}>

              {/* Upload Area */}
              <div className="group relative border-2 border-dashed border-gray-200 rounded-2xl p-8 transition-all hover:border-blue-500 hover:bg-blue-50/30 flex flex-col items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setData(
                      (prev) => {
                        return {
                          ...prev,
                          image: file,
                        }
                      }
                    );
                  }}
                />
                <div className="bg-gray-50 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faImage} className="text-gray-400 text-xl group-hover:text-blue-500" />
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  {data.image ? data.image.name : modalMode === "update" ? "Change image (optional)" : "Drop your images here"}
                </p>
                <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG up to 10MB</p>
              </div>

              {/* Inputs */}
              <div className="space-y-4">

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Property Name</label>
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
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Price</label>
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
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea
                    rows={3}
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    placeholder="e.g. 5 bedroom, 4 bathrooms"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    placeholder="e.g. Modern Sunset Villa"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-1.5">

                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Is Property A Rental
                  </label>

                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isRental"
                        value="true"
                        checked={data.isRental === true}
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isRental"
                        value="false"
                        checked={data.isRental === false}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>


              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setData(initialState);
                    setSelectedProperty(null);
                  }}
                  className="flex-1 py-3.5 text-sm font-bold text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-3.5 bg-black text-white text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-black/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? (modalMode === "create" ? "Publishing..." : "Updating...")
                    : (modalMode === "create" ? "Publish Listing" : "Update Property")
                  }
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
