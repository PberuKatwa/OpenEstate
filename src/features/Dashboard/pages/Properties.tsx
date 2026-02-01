import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import propertyImg from "../../../assets/pexels-mukula-igavinchi-443985808-15496495.jpg"

export const Properties = function () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-row min-h-screen">

      {/* ACTION BUTTONS */}
      <div className="inline-flex rounded-base shadow-xs -space-x-px m-2" role="group">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 text-body border border-default hover:bg-neutral-secondary-medium
          hover:text-heading focus:ring-3 focus:ring-neutral-tertiary-soft font-medium rounded-s-base text-sm px-3 py-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Create Property
        </button>
      </div>

      {/* PROPERTY CARD */}
      <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
        <img className="rounded-lg w-full h-48 object-cover" src={propertyImg} alt="" />
        <h5 className="mt-6 mb-2 text-2xl font-semibold text-heading">
          Streamlining your design process today.
        </h5>
        <p className="mb-6 text-body">
          In today’s fast-paced digital landscape, fostering seamless collaboration.
        </p>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40">
          <div className="relative p-4 w-full max-w-md">
            <div className="bg-neutral-primary-soft border border-default rounded-base shadow-sm p-6">

              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-default pb-4">
                <h3 className="text-lg font-medium text-heading">
                  Create new property
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="hover:bg-neutral-tertiary rounded-base w-9 h-9 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* BODY */}
              <form className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="Property name"
                  className="w-full px-3 py-2.5 rounded-base border border-default-medium bg-neutral-secondary-medium"
                />

                <textarea
                  rows={4}
                  placeholder="Description"
                  className="w-full px-3 py-2.5 rounded-base border border-default-medium bg-neutral-secondary-medium"
                />

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-4 border-t border-default">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-base border border-default"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-base bg-brand text-white hover:bg-brand-strong"
                  >
                    Create Property
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
