const express = require("express");
const {
  signUpHandler,
  loginHandler,
  logoutHandler,
  updateProfileHandler,
  checkAuthHandler,
} = require("../controllers/auth.controller");
const { checkLoggedOnly } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/signup", signUpHandler);

router.post("/login", loginHandler);

router.get("/logout", logoutHandler);

router.put("/update-profile", checkLoggedOnly, updateProfileHandler);

router.get("/check", checkLoggedOnly, checkAuthHandler);

module.exports = router;
