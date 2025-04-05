import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../redux/slices/userSlice";
import Title from "../../components/Title";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    getUserLoading,
    updateUserLoading,
    updateUserError,
  } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {};
    
    if (formData.name !== user.name) updateData.name = formData.name;
    if (formData.email !== user.email) updateData.email = formData.email;
    if (formData.password) updateData.password = formData.password;

    if (Object.keys(updateData).length === 0) {
      toast.info("No changes to update");
      return;
    }

    dispatch(updateUser(updateData))
      .unwrap()
      .then(() => {
        setIsEditing(false);
        setFormData((prev) => ({ ...prev, password: "" }));
      })
      .catch((error) => {
        console.log("Update error:", error);
      });
  };

  if (getUserLoading) {
    return (
      <div className="border-t pt-16 min-h-[60vh]">
        <Title text1="YOUR" text2="PROFILE" />
        <div className="text-center py-10">Loading profile...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="border-t pt-16 min-h-[60vh]">
        <Title text1="YOUR" text2="PROFILE" />
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Please Login
          </h2>
          <p className="text-gray-500 mb-6">
            You need to be logged in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 min-h-[60vh]">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="PROFILE" />
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg border">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                />
              ) : (
                <p className="text-gray-900">{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                />
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>

            {/* Password */}
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                  placeholder="Enter new password"
                />
              </div>
            )}

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <p className="text-gray-900 capitalize">{user.role}</p>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joined At
                </label>
                <p className="text-gray-900">
                  {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Updated
                </label>
                <p className="text-gray-900">
                  {new Date(user.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center pt-4">
              <div className="space-x-2">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          password: "",
                        });
                      }}
                      className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updateUserLoading}
                      className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900 transition disabled:opacity-50"
                    >
                      {updateUserLoading ? "Updating..." : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900 transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Error Message */}
            {updateUserError && (
              <p className="text-red-500 text-sm">{updateUserError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;