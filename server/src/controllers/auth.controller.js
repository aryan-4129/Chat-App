const generateToken = require("../lib/utils");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const cloudinary = require("../lib/cloudinary");

async function signUpHandler(req, res) {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.json({ message: "Enter all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password length should be greater than 6" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    if (newUser) {
      // generating a token which is to be saved in the cookie
      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(200).json(newUser);
    } else {
      return res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginHandler(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Enter all the credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No such user . Please signup" });
    }
    const isPresent = await bcrypt.compare(password, user.password);
    if (!isPresent) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // console.log(isPresent);

    // generate a token
    generateToken(user._id, res);

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in login handler", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function logoutHandler(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout done" });
  } catch (error) {
    console.log("Error in logout handler", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function updateProfileHandler(req, res) {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile Pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile handler", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function checkAuthHandler(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth handler", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  signUpHandler,
  loginHandler,
  logoutHandler,
  updateProfileHandler,
  checkAuthHandler,
};
