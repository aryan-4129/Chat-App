const Message = require("../models/message.model");
const User = require("../models/user.model");
const cloudinary = require("../lib/cloudinary");
const { getSocketRecieverId, io } = require("../lib/socket");

const getAllUserHandler = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getalluserhandler", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessagesHandler = async (req, res) => {
  try {
    const senderId = req.user._id;
    const recieverId = req.params.id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recieverId: recieverId },
        { senderId: recieverId, recieverId: senderId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesHandler", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendMessageHanlder = async (req, res) => {
  try {
    const { text, image } = req.body;
    const myId = req.user._id;
    const recieverId = req.params.id;

    let image_url;

    if (image) {
      const imageResponse = await cloudinary.uploader.upload(image);
      image_url = imageResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      recieverId: recieverId,
      text: text,
      image: image_url,
    });

    await newMessage.save();

    const socketRecieverId = getSocketRecieverId(recieverId);

    if (socketRecieverId)
      io.to(socketRecieverId).emit("newMessage", newMessage);

    // socket.io
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessageHanlder", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllUserHandler, getMessagesHandler, sendMessageHanlder };
