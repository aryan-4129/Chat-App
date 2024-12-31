import React from "react";
import { Link } from "react-router-dom";

import { IoChatbox } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

import authStore from "../store/authStore";

const Navbar = () => {
  const { authUser, logout } = authStore();
  return (
    <>
      <header style={{ fontSize: "17px", color: "black" }}>
        <div className="d-flex flex-row  justify-content-between mb-3 pt-2">
          <div>
            <div className="ms-4 me-2">
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                <IoChatbox className="me-1" />
                <span>Messenger</span>
              </Link>
            </div>
          </div>
          {authUser && (
            <div className="d-flex me-4 w-20 justify-content-between align-items-center">
              <div className="me-2">
                <Link
                  to="/setting"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <IoSettings className="me-2" />
                  <span>Settings</span>
                </Link>
              </div>

              <div className="me-2">
                <Link
                  to="/profile"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <FaUser className="me-1" />
                  <span>Profile</span>
                </Link>
              </div>

              <div className="me-2">
                <Link
                  to="/"
                  style={{ color: "black", textDecoration: "none" }}
                  onClick={logout}
                >
                  <IoLogOutOutline className="me-1" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
