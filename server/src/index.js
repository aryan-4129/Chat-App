const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./lib/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const cors = require("cors");
const { app, server } = require("./lib/socket");

const path = require("path");

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
