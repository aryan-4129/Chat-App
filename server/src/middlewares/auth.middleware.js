const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function checkLoggedOnly(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(400).json({ message: "No token Provided" });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    return res.status(400).json({ message: "User not Found" });
  }

  req.user = user;

  next();
}

module.exports = { checkLoggedOnly };
