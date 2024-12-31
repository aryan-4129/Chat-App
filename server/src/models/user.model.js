import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      require: true,
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
      require: true,
      unique: true,
    },
    password: {
      type: "string",
      require: true,
      min: 6,
    },
    profilePic: {
      type: "string",
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
