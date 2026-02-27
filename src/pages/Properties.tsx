import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import type { ApiResponse } from "../types/api.types";
import { propertiesService } from "../services/properties.service";
import propertyImg from "../assets/pexels-mukula-igavinchi-443985808-15496495.jpg";
import type { AllProperties, Property } from "../types/property.types";
import { CreatePropertyModal } from "../components/properties/CreateProperties";
import { UpdatePropertyModal } from "../components/properties/UpdateProperties";

const initialUploadPayload: Property = {
  id: 0,
  name: "",
  price: 0,
  is_rental: false,
  file_url: "",
  fileId: 0,
  location: "",
  description: "",
  signedUrl: "",
  status: "",
  file_id:0
}

export const Properties = function () {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property>(initialUploadPayload);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [properties, setProperties] = useState<Property[] | []>([]);
  const [loading, setLoading] = useState(true);

  const openUpdateModal = (property: Property) => {
    setSelectedProperty(property);
    setIsUpdateOpen(true);
  }

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
    <div className="min-h-screen bg-white px-8 py-8 font-[Poppins]">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5 text-rose-700" />
            </div>
            <span className="text-[10px] font-semibold text-rose-700 uppercase tracking-[0.2em]">
              Listings
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Properties</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your property listings</p>
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
          New Property
        </button>
      </div>

      <div className="border-t border-gray-100 mb-10" />

      {/* ── Loading ── */}
      {loading && (
        <div className="flex items-center gap-3 py-16 justify-center">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-rose-700 rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Loading properties…</span>
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && properties.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-400">No properties yet</p>
          <p className="text-xs text-gray-300 mt-1">Create your first listing to get started</p>
        </div>
      )}

      {/* ── Grid ── */}
      {!loading && properties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group flex flex-col bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden
                shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]
                hover:-translate-y-0.5
                transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={property.signedUrl ? property.signedUrl : propertyImg}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Body */}
              <div className="flex-1 p-5 space-y-2 border-b border-stone-200">
                <h5 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
                  {property.name}
                </h5>

                <p className="text-xs text-gray-500">
                  {property.is_rental ? "Rental Property" : "For Sale"}
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  KES {Number(property.price).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="px-5 py-3.5 flex gap-2 bg-stone-50">
                <button
                  onClick={() => openUpdateModal(property)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg
                    border border-stone-200 text-gray-500 bg-white
                    hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700
                    transition-all duration-150"
                >
                  <FontAwesomeIcon icon={faEdit} className="w-3 h-3" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(property.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg
                    border border-stone-200 text-gray-500 bg-white
                    hover:border-red-300 hover:bg-red-50 hover:text-red-600
                    transition-all duration-150"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {!loading && properties.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-gray-400">
            Page <span className="font-semibold text-gray-600">{currentPage}</span> of <span className="font-semibold text-gray-600">{totalPages}</span>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg
                hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 text-xs font-medium rounded-lg transition-all ${
                  currentPage === page
                    ? "bg-rose-700 text-white border border-transparent shadow-sm shadow-rose-700/30"
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg
                hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg
              hover:bg-gray-50 cursor-pointer outline-none"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      )}

      {/* ── Modals ── */}
      <CreatePropertyModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => getAllProperties(currentPage, limit)}
      />

      <UpdatePropertyModal
        isOpen={isUpdateOpen}
        property={selectedProperty}
        onClose={() => setIsUpdateOpen(false)}
        onSuccess={() => getAllProperties(currentPage, limit)}
      />

    </div>
  );
};
