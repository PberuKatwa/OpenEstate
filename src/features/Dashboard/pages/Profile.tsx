import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faEdit } from "@fortawesome/free-solid-svg-icons";
import type { User } from "../../../types/auth.types";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const mockUser: User = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  image_url: "https://via.placeholder.com/150",
}

export const Profile = function () {
  const { user } = useAuth();
  console.log("userrr", user)
  const [userData, setUserData ] = useState<User>(user ? user : mockUser);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Profile Image */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="relative">
                {userData.image_url || userData.signedUrl ? (
                  <img
                    src={userData.signedUrl || userData.image_url}
                    alt={`${userData.first_name} ${userData.last_name}`}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faUser} className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Name and Edit Button */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {userData.first_name} {userData.last_name}
                </h1>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Edit profile"
                >
                  <FontAwesomeIcon icon={faEdit} className="text-lg" />
                </button>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              {/* First Name */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="text-base font-medium text-gray-900">{userData.first_name}</p>
                </div>
              </div>

              {/* Last Name */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="text-base font-medium text-gray-900">{userData.last_name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base font-medium text-gray-900">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
