import jwt from "jsonwebtoken";

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

export default generateToken;
