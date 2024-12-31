import React, { useState } from "react";

import { FaCamera } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import authStore from "../store/authStore";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = authStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      // console.log(base64Image);
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <>
      <div className="mt-5 pb-5">
        <div className="w-25 m-auto border rounded border-black  p-4">
          <div className="text-center  ">
            <h1>Profile</h1>
            <span>Your Profile Information</span>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center pt-2 gap-3 ">
            <div
              style={{
                position: "relative",
                height: "70px",
                width: "70px",
              }}
            >
              <img
                src={selectedImage || authUser.profilePic || "user.png"}
                alt="profile"
                className=" rounded-circle h-100 w-100  object-fit-cover"
              />
              <div>
                <label
                  htmlFor="profileImage"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    cursor: "pointer",
                  }}
                >
                  <FaCamera />

                  <input
                    type="file"
                    id="profileImage"
                    onChange={handleImageUpload}
                    className="visually-hidden"
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
            <p>
              {isUpdatingProfile
                ? "Updating the profile"
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div>
            <div className=" mt-3 mb-3">
              <div className="mb-3">
                <div className=" d-flex flex-row  align-items-center gap-2 mb-1">
                  <FaUser />
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="rounded border border-success">
                  <p className="p-1 mb-0">
                    {authUser
                      ? authUser.firstName + " " + authUser.lastName
                      : "Aryan Yadav"}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className=" d-flex flex-row  align-items-center gap-2 mb-1">
                  <FaUser />
                  <h6 className="mb-0">Email Address</h6>
                </div>
                <div className="rounded border border-success">
                  <p className="p-1 mb-0">
                    {authUser ? authUser.email : "xyz@gmail.com"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h4>Account Information</h4>
              <div className="fs-6">
                <div className="d-flex align-items-center justify-content-between border-bottom py-2">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between py-2">
                  <span>Account Status</span>
                  <span className="text-success">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
