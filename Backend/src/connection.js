const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { connectMongoDB };
