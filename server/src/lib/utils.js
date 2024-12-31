const jwt = require("jsonwebtoken");

async function generateToken(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // millisecond
    httpOnly: true,
  });

  return token;
}

module.exports = generateToken;
