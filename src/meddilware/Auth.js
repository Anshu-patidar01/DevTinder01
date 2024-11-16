const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("not provieded token...");
    }
    const decoded = await jwt.verify(token, "asdfghjkl");
    const user = await User.findById({ _id: decoded._id });
    if (!user) throw new Error("User does not exist....");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "problem on auth...!", Err: `${error}` });
  }
};

module.exports = { userAuth };
