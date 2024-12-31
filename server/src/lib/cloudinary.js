const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET,
});

module.exports = cloudinary;
