import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faEdit, faCamera, faIdCard } from "@fortawesome/free-solid-svg-icons";
import type { UserProfile } from "../types/auth.types";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";

const mockUser: UserProfile = {
  id: 1,
  first_name: "Johhn",
  last_name: "Doe",
  file_id: 0,
  file_url: "",
  signed_url: "",
  email:""
}

export const Profile = function () {
  const [userData, setUserData] = useState<UserProfile>(mockUser);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async function () {
    try {
      setLoading(true)
      const response = await authService.profile();
      if (!response.data) throw new Error(`No profile was fetched`);
      toast.success(response.message)
      setUserData(response.data);

    } catch (error) {
      console.error(`Error in fethcing profile`, error)
      toast.error(`Error infetching profile`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(
    () => { fetchProfile() }, []
  );

  return (
    <div className="min-h-screen bg-white px-8 py-8 font-[Poppins]">
      <div className="max-w-5xl mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your account information and preferences
          </p>
        </div>

        {/* ── Profile Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden
          shadow-[0_6px_20px_rgba(0,0,0,0.06)]">

          {/* Top Section */}
          <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-gray-200">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

              {/* Avatar */}
              <div className="flex items-end gap-6">

                <div className="relative group">

                  {userData.signed_url ? (
                    <img
                      src={userData.signed_url}
                      alt={`${userData.first_name} ${userData.last_name}`}
                      className="w-28 h-28 rounded-2xl border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-3xl text-gray-400" />
                    </div>
                  )}

                  <button className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <FontAwesomeIcon icon={faCamera} className="text-white" />
                  </button>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userData.first_name} {userData.last_name}
                  </h2>
                  <p className="text-sm text-gray-400">Administrator</p>
                </div>

              </div>

              {/* Edit Button */}
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                bg-[#C0182A] shadow-sm shadow-[#C0182A]/20
                hover:bg-[#8C1020] hover:shadow-md hover:shadow-[#C0182A]/30
                active:scale-95 transition-all duration-200 flex items-center gap-2">

                <FontAwesomeIcon icon={faEdit} className="w-3.5 h-3.5" />
                Edit Profile
              </button>

            </div>

          </div>

          {/* ── Profile Info ── */}
          <div className="p-6 sm:p-8">

            <h3 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-widest">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* First Name */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block">
                  First Name
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faUser}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    value={userData.first_name}
                    readOnly
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block">
                  Last Name
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faUser}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    value={userData.last_name}
                    readOnly
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="text-xs text-gray-400 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    value={userData.email}
                    readOnly
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm"
                  />
                </div>
              </div>

              {/* User ID */}
              <div className="md:col-span-2">
                <label className="text-xs text-gray-400 mb-2 block">
                  User ID
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faIdCard}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    value={`#${userData.id.toString().padStart(6, '0')}`}
                    readOnly
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm"
                  />
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">

              <button className="flex-1 px-5 py-2.5 rounded-xl text-sm font-medium
                border border-gray-200 text-gray-600
                hover:bg-gray-50 transition-all">
                Change Password
              </button>

              <button className="flex-1 px-5 py-2.5 rounded-xl text-sm font-medium
                border border-red-200 text-red-600
                hover:bg-red-50 transition-all">
                Delete Account
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
