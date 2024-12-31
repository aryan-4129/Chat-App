import express from "express";
import {
  getAllUserHandler,
  getMessagesHandler,
  sendMessageHanlder,
} from "../controllers/message.controller.js";
import { checkLoggedOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", checkLoggedOnly, getAllUserHandler);

router.get("/:id", checkLoggedOnly, getMessagesHandler);

router.post("/send/:id", checkLoggedOnly, sendMessageHanlder);

export default router;
