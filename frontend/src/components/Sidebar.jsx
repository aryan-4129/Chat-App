import React, { useEffect, useState } from "react";
import { messageStore } from "../store/messageStore";
import { FaUsers } from "react-icons/fa";
import authStore from "../store/authStore";
import Loader from "./Loader";

const Sidebar = () => {
  const { users, getUsers, setSelectedUser, isuserLoading } = messageStore();

  const { onlineUsers } = authStore();

  const [showOnlineUsers, setshowOnlineUsers] = useState(false);

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isuserLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{ width: "25%" }}
      className="h-100 d-flex flex-column p-2 border rounded border-secondary-subtle"
    >
      <div className="d-flex flex-column fw-100 fs-4 mb-2">
        <div className="d-flex align-items-center gap-2">
          <FaUsers />
          <span className="fs-5">Contacts</span>
        </div>
        <div className="d-flex align-items-center mt-2 gap-2">
          <label
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center gap-2"
          >
            <input
              type="checkbox"
              checked={showOnlineUsers}
              onChange={(e) => setshowOnlineUsers(e.target.checked)}
            />
            <span style={{ fontSize: "15px" }} className="fw-lighter">
              Show Online Users
            </span>
          </label>
          <span style={{ fontSize: "13px" }} className="fw-bold">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>
      <div className="overflow-auto">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="list-group-item list-group-item-action p-1 d-flex align-items-center mb-1"
            to="#list-item-1"
          >
            <div className="position-relative">
              <img
                style={{ height: "50px", width: "50px" }}
                src={user.profilePic ? user.profilePic : "user.png"}
                className="rounded-circle object-fit-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className=" position-absolute rounded-circle bg-success"
                  style={{
                    display: "inline-block",
                    height: "10px",
                    width: "10px",
                    bottom: "0",
                    right: "0",
                  }}
                ></span>
              )}
            </div>
            <div className="mx-2">
              <div className="fw-semibold">
                {user.firstName + " " + user.lastName}
              </div>
              <div>
                <div className="fw-light">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <div className="text-center mt-5">No Online Users</div>
      )}
    </div>
  );
};

export default Sidebar;
