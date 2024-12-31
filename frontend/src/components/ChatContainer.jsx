import React, { useEffect } from "react";

import ChatHeader from "./ChatHeader";
import MessageBody from "./MessageBody";
import ChatInputField from "./ChatInputField";
import Loader from "./Loader";

import { messageStore } from "../store/messageStore";

const ChatContainer = () => {
  const {
    selectedUser,
    getMessages,
    isMessagesLoading,
    subscribeToMessage,
    unSubscribeToMessage,
  } = messageStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();

    return () => {
      unSubscribeToMessage();
    };
  }, [selectedUser._id, getMessages, subscribeToMessage, unSubscribeToMessage]);

  if (isMessagesLoading) {
    return (
      <div className="w-100  d-flex flex-column gap-2">
        <ChatHeader />
        <div className="flex-grow-1">
          <Loader />
        </div>
        <ChatInputField />
      </div>
    );
  }
  return (
    <div className="w-100  d-flex flex-column gap-2 ">
      <ChatHeader />
      <MessageBody />
      <ChatInputField />
    </div>
  );
};

export default ChatContainer;
