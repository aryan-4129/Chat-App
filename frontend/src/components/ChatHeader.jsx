import React from "react";

import { messageStore } from "../store/messageStore";
import authStore from "../store/authStore";

import { IoClose } from "react-icons/io5";
import { themeStore } from "../store/themeStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = messageStore();
  const { onlineUsers } = authStore();
  const { theme } = themeStore();

  return (
    <div className=" h-auto rounded border border-light-subtle w-100">
      <div className=" p-1 w-100 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img
            style={{ height: "50px", width: "50px" }}
            className="rounded-circle object-fit-cover"
            src={selectedUser.profilePic || "user.png"}
            alt="User Profile"
          />
          <div>
            <h6 className="fs-6 fw-bold m-0">
              {selectedUser.firstName + " " + selectedUser.lastName}
            </h6>
            <p className="fw-lighter m-0">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setSelectedUser(null)}
          style={{ backgroundColor: theme }}
          className="border-0 fs-1 "
          //   className="text-center"
        >
          <IoClose className="mb-2" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
