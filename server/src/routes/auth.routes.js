// const express = require("express");
import express from "express";

import {
  signUpHandler,
  loginHandler,
  logoutHandler,
  updateProfileHandler,
  checkAuthHandler,
} from "../controllers/auth.controller.js";

import { checkLoggedOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUpHandler);

router.post("/login", loginHandler);

router.get("/logout", logoutHandler);

router.put("/update-profile", checkLoggedOnly, updateProfileHandler);

router.get("/check", checkLoggedOnly, checkAuthHandler);

export default router;
