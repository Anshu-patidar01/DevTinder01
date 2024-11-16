const expres = require("express");
const User = require("../models/user.model.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {
  signupValidation,
  loginValidation,
} = require("../../utils/validationOrg.js");
const bcrypt = require("bcrypt");
expres().use(cookieParser());

const signup = async (req, res) => {
  try {
    signupValidation(req);

    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.status(201).send("User created successfully..");
  } catch (err) {
    res.status(400).json({
      message: "some error Occure while creating user...",
      error: `${err}`,
    });
  }
};

const login = async (req, res) => {
  try {
    loginValidation(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("The email or password you entered is incorrect.");
    }

    const ispassword = await bcrypt.compare(password, user.password);
    if (ispassword) {
      const token = await jwt.sign({ _id: user._id }, "asdfghjkl", {
        expiresIn: "1h",
      });
      res.cookie("token", token);
      res.status(200).send("login successfully....");
    } else {
      throw new Error("The email or password you entered is incorrect..");
    }
  } catch (err) {
    res.status(400).json({
      message: "some error Occure while login user...",
      error: `${err}`,
    });
  }
};

const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // 1 day from now
    httpOnly: true,
  });
  res.send("okay");
};

module.exports = {
  login,
  signup,
  logout,
};
