import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import propertyImg from "../../../assets/pexels-mukula-igavinchi-443985808-15496495.jpg";

export const Properties = function () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-50">
      {/* ACTION BUTTONS */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all text-sm font-medium shadow-sm"
        >
          <FontAwesomeIcon icon={faPlus} />
          Create Property
        </button>
      </div>

      {/* PROPERTY CARD */}
      <div className="bg-white max-w-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-hover hover:shadow-md">
        <img className="w-full h-52 object-cover" src={propertyImg} alt="Property" />
        <div className="p-6">
          <h5 className="mb-2 text-xl font-bold text-gray-900 leading-tight">
            Streamlining your design process today.
          </h5>
          <p className="text-gray-500 text-sm leading-relaxed">
            In today’s fast-paced digital landscape, fostering seamless collaboration.
          </p>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
          {/* MODAL CONTAINER - This is what adds the 'space' between edges */}
          <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto animate-in fade-in zoom-in duration-300">

            {/* MODAL HEADER */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">New Property</h3>
                <p className="text-xs text-gray-500 mt-0.5">List your space in seconds.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-all"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>

            {/* MODAL BODY */}
            <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>

              {/* Upload Area */}
              <div className="group relative border-2 border-dashed border-gray-200 rounded-2xl p-8 transition-all hover:border-blue-500 hover:bg-blue-50/30 flex flex-col items-center justify-center cursor-pointer">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <div className="bg-gray-50 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faImage} className="text-gray-400 text-xl group-hover:text-blue-500" />
                </div>
                <p className="text-sm font-semibold text-gray-700">Drop your images here</p>
                <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG up to 10MB</p>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Modern Sunset Villa"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="What makes this property special?"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-300 resize-none"
                  />
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 text-sm font-bold text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3.5 bg-black text-white text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-black/20 active:scale-[0.98] transition-all"
                >
                  Publish Listing
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
