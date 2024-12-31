const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState != 1) {
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

module.exports = connectToDb;
