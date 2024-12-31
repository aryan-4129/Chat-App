import React from "react";

import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

import { messageStore } from "../store/messageStore";

const HomePage = () => {
  const { selectedUser } = messageStore();

  return (
    <div style={{ height: "92.5vh" }} className="container">
      <div
        // style={{ height: "100%", width: "100%" }}
        className="d-flex align-items-center justify-content-center  h-100 w-100 "
      >
        <div className="d-flex   overflow-hidden gap-4  h-100 w-100 p-2">
          <Sidebar />
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
