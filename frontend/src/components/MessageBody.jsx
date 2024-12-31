import React, { useEffect, useRef } from "react";

import { messageStore } from "../store/messageStore";
import authStore from "../store/authStore";

import handleMessageDate from "../lib/handleMessageDate";

export default function MessageBody() {
  const { authUser } = authStore();
  const { selectedUser, messages } = messageStore();

  const scrollRef = useRef();

  useEffect(() => {
    if (messages && scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-100 overflow-auto p-1 flex-grow-1">
      {messages.map((message) =>
        message.senderId === selectedUser._id ? (
          <div
            className="d-flex  justify-content-start mb-4 "
            key={message._id}
            ref={scrollRef}
          >
            <img
              src={selectedUser.profilePic || "user.png"}
              alt="avatar 1"
              style={{
                width: "45px",
                height: "45px",
                marginRight: "6px",
                objectFit: "contain",
                backgroundColor: "#86A788",
              }}
              className="rounded-circle"
            />
            <div className="d-flex flex-column">
              {message.image && (
                <img
                  style={{ height: "150px", width: "150px" }}
                  src={message.image}
                  className="rounded"
                ></img>
              )}
              <div className="d-flex gap-2 mt-1 p-1 justify-content-between align-items-center rounded border">
                {message.text && (
                  <div className="p-1 me-3 ">
                    <p className="small fw-semibold mb-0">{message.text}</p>
                  </div>
                )}
                <span className="small me-1">
                  {handleMessageDate(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-end mb-4 " key={message._id}>
            <div>
              <div className="d-flex flex-column ">
                {message.image && (
                  <img
                    style={{ height: "150px", width: "150px" }}
                    src={message.image}
                    className="align-self-end rounded"
                  ></img>
                )}
                <div className="d-flex gap-2 mt-1 p-1 justify-content-between align-items-center rounded border ">
                  {message.text && (
                    <div className="p-1 me-3 ">
                      <p className="small fw-semibold mb-0">{message.text}</p>
                    </div>
                  )}
                  <span className="small me-1 ">
                    {handleMessageDate(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <img
              src={authUser.profilePic || "user.png"}
              alt="avatar 1"
              style={{
                width: "45px",
                height: "45px",
                marginLeft: "6px",
                objectFit: "contain",
                backgroundColor: "#86A788",
              }}
              className="rounded-circle"
            />
          </div>
        )
      )}
    </div>
  );
}
