const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 10,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 5,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  skills: {
    type: [String],
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 10,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
