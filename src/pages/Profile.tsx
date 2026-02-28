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
  signed_url:""
}

export const Profile = async function () {
  const response = await authService.profile()
  const user = response.data;
  console.log("userrr", user)
  const [userData, setUserData] = useState<UserProfile>(user ? user : mockUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="h-full w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile Settings</h1>
            <p className="text-slate-600">Manage your account information and preferences</p>
          </div>

          {/* Account Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 m-8">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-slate-600 text-sm font-medium">Account Status</h4>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-slate-900">Active</p>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-slate-600 text-sm font-medium">Member Since</h4>
              </div>
              <p className="text-2xl font-bold text-slate-900">2024</p>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-slate-600 text-sm font-medium">Profile Complete</h4>
              </div>
              <p className="text-2xl font-bold text-slate-900">85%</p>
            </div>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Cover Image with Gradient */}
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-48 sm:h-56">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium border border-white/30">
                  <FontAwesomeIcon icon={faCamera} className="mr-2" />
                  Change Cover
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="relative px-6 sm:px-8 pb-8">
              {/* Profile Image Section */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-20 sm:-mt-16 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                  {/* Avatar with Upload Button */}
                  <div className="relative group">
                    { userData.signed_url ? (
                      <img
                        src={userData.signed_url}
                        alt={`${userData.first_name} ${userData.last_name}`}
                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border-4 border-white object-cover shadow-2xl"
                      />
                    ) : (
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border-4 border-white bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-2xl">
                        <FontAwesomeIcon icon={faUser} className="text-5xl text-blue-600" />
                      </div>
                    )}
                    {/* Hover overlay for image upload */}
                    <button className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="text-center text-white">
                        <FontAwesomeIcon icon={faCamera} className="text-2xl mb-1" />
                        <p className="text-xs font-medium">Change Photo</p>
                      </div>
                    </button>
                  </div>

                  {/* Name and Title */}
                  <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                      {userData.first_name} {userData.last_name}
                    </h2>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <button className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30 font-semibold flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 mb-8"></div>

              {/* Profile Information Grid */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="group">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faUser} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={userData.first_name}
                        readOnly
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 font-medium cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="group">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faUser} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={userData.last_name}
                        readOnly
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 font-medium cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email - Full Width */}
                  <div className="md:col-span-2 group">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faEnvelope} className="text-slate-400" />
                      </div>
                      <input
                        type="email"
                        value={userData.first_name}
                        readOnly
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 font-medium cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* User ID */}
                  <div className="md:col-span-2 group">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      User ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faIdCard} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={`#${userData.id.toString().padStart(6, '0')}`}
                        readOnly
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 font-medium cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Actions */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-semibold">
                    Change Password
                  </button>
                  <button className="flex-1 px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-semibold">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
