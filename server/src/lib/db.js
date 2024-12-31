// const mongoose = require("mongoose");
import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const URL = process.env.MONGO_URL;
      const conn = await mongoose.connect(URL);

      console.log("db created", conn.connection.host);
    } else {
      console.log("db not created");
    }
  } catch (error) {
    console.log(error);
  }
};
