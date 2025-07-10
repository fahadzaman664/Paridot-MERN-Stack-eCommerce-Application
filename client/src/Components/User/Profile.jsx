import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import Spinner from "../Spinner";

const Profile = () => {
  const { userProfile } = useContext(UserContext);

  if (!userProfile) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-24 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full shadow mb-4 object-cover"
            src={
              userProfile.avatar ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(userProfile.name) +
                "&background=random&bold=true"
            }
            alt="User avatar"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {userProfile.name}
          </h2>
          <p className="text-gray-500 mb-6">{userProfile.email}</p>

          <div className="w-full">
            <div className="flex justify-between text-gray-600 py-2 border-b">
              <span className="font-medium">ID:</span>
              <span className="text-gray-700 break-all">{userProfile._id}</span>
            </div>
            <div className="flex justify-between text-gray-600 py-2 border-b">
              <span className="font-medium">Role:</span>
              <span className="text-gray-700 capitalize">
                {userProfile.role || "user"}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 py-2">
              <span className="font-medium">Joined:</span>
              <span className="text-gray-700">
                {new Date(userProfile.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
