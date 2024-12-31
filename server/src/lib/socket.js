import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// used to store online users -- user_id to socketId mapping
const userSocketMap = {}; //{userId : socketId}

// to export the socket receiver id to message controller
function getSocketRecieverId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  //   fetching the userId from the frontend socket-i-client
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  //   sending this map data to frontend by emit functions of socket-io
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io, getSocketRecieverId };
