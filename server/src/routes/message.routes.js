const express = require("express");
const {
  getAllUserHandler,
  getMessagesHandler,
  sendMessageHanlder,
} = require("../controllers/message.controller");
const { checkLoggedOnly } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/users", checkLoggedOnly, getAllUserHandler);

router.get("/:id", checkLoggedOnly, getMessagesHandler);

router.post("/send/:id", checkLoggedOnly, sendMessageHanlder);

module.exports = router;
