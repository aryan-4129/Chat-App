// const express = require("express");
import express from "express";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
// const connectToDb = require("./lib/db");
import { connectToDb } from "./lib/db.js";

// const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
// const authRouter = require("./routes/auth.routes");
import authRouter from "./routes/auth.routes.js";
// const messageRoutes = require("./routes/message.routes");
import messageRoutes from "./routes/message.routes.js";
// const cors = require("cors");
import cors from "cors";
// const { app, server } = require("./lib/socket");
import { app, server } from "./lib/socket.js";

// const path = require("path");
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// increasing the limit of file that can be handled by express json
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],

    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, async () => {
  console.log("server running at ", PORT);
  await connectToDb();
});
