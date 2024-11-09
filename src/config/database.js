//y5Ft9psqcKjT8fIN
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://patidaranshu490:aEyebS4pYQbODobG@cluster1.u8lfi.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
