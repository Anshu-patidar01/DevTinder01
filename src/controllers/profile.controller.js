const User = require("../models/user.model.js");

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

module.exports = {
  allProfils,
  profile,
};
