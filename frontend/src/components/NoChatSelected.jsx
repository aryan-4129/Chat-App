import React from "react";

import { FaMessage } from "react-icons/fa6";

const NoChatSelected = () => {
  return (
    <div
      style={{ width: "75%" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <div className="text-center">
        <div className="d-flex justify-content-center mb-4">
          <div className="relative">
            <div>
              <FaMessage style={{ height: "50px", width: "50px" }} />
            </div>
          </div>
        </div>
        <h2 className="fs-1">Welcome to Messenger!!</h2>
        <p>Select the user from the sidebar to start the conversation</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
