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

const profile = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).json({
      message: "some error Occure while access profile user...",
      error: `${err}`,
    });
  }
};

const allProfils = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send("somthong went wrong...!!!");
  }
};

const findbyid = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) res.send("wrong id provied...");
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send("something went wrong....");
  }
};

const sendrequest = (req, res) => {
  try {
    const user = req.user;
    const { firstName } = user;

    res.send("request sent by " + firstName);
  } catch (error) {
    res.send(error);
  }
};

const findbyemail = async (req, res) => {
  const { email } = req.body;
  if (!email) res.status(404).send("please provide email..!!");
  try {
    const user = await User.find({ email: `${email}` });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send("Somthing went wrong....");
  }
};

const deletebyid = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).send(`user deleted successfully...`);
  } catch (error) {
    res.status(404).send("something went wrong....");
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await User.findOneAndUpdate({ _id: id }, data);
    res.send(`User with email ${id} Updated successfully`);
  } catch (err) {
    res.status(400).json({
      message: "something went wrong when updating...",
      error: `${err}`,
    });
  }
};

const updatebyemail = async (req, res) => {
  const { email } = req.body;

  if (!email) res.send("email not found..");
  const data = req.body;
  console.log(email);
  try {
    await User.findOneAndUpdate({ email: email }, data);
    res.status(201).send(`user updated with email ${email}...`);
  } catch (error) {
    res.status(400).send(`some error while updating...${error}`);
  }
};
module.exports = {
  login,
  signup,
  allProfils,
  findbyid,
  findbyemail,
  deletebyid,
  update,
  updatebyemail,
  profile,
  sendrequest,
};
