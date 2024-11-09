//y5Ft9psqcKjT8fIN
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL);
};

module.exports = connectDB;
