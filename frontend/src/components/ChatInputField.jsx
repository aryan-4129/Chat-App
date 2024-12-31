import React, { useRef, useState } from "react";

import toast from "react-hot-toast";

import { themeStore } from "../store/themeStore";
import { messageStore } from "../store/messageStore";

import { CiImageOn } from "react-icons/ci";
import { BsFillSendFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const ChatInputField = () => {
  const { theme } = themeStore();
  const { sendMessage } = messageStore();

  const [textMessage, setTextMessage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const inputFileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file.type.slice(0, 5) !== "image") {
      return toast.error("Select an image ");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const removeImage = () => {
    setPreviewImage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!textMessage && !previewImage) {
      return toast.error("Enter message or select an image to chat");
    }
    const data = {
      text: textMessage,
      image: previewImage,
    };
    sendMessage(data);

    setTextMessage("");
    setPreviewImage("");
  };
  return (
    <div style={{ bottom: "0" }} className="w-full  p-1 ">
      <div className="d-flex flex-column gap-1">
        {previewImage && (
          <div className="position-relative">
            <img
              style={{ height: "70px", width: "70px" }}
              src={previewImage}
              className="ms-1 rounded"
              alt="selected image"
            />
            <RxCross2
              style={{ cursor: "pointer" }}
              className="position-absolute"
              onClick={removeImage}
            />
          </div>
        )}
        <form
          onSubmit={handleFormSubmit}
          className="w-100 p-1 d-flex gap-2 justify-content-between rounded border border-secondary-subtle"
        >
          <input
            style={{ height: "50px" }}
            type="text"
            value={textMessage}
            placeholder="Write your message"
            className="w-75 fs-6 p-2 rounded border-secondary-subtle flex-grow-1"
            onChange={(e) => setTextMessage(e.target.value)}
          />

          <input
            type="file"
            className="visually-hidden"
            ref={inputFileRef}
            onChange={handleImageChange}
          />
          <button
            style={{ backgroundColor: `${theme}` }}
            className="border-0 "
            onClick={() => inputFileRef.current.click()}
            type="button"
          >
            <CiImageOn className=" fs-1" />
          </button>
          <button
            style={{ backgroundColor: `${theme}` }}
            className="border-0 "
            type="submit"
            disabled={!previewImage && !textMessage}
          >
            <BsFillSendFill className="fs-3" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInputField;
