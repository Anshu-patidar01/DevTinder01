const User = require("../models/user.model.js");
const { profileUpdateDataValidation } = require("../../utils/validationOrg.js");
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

const profileUpdateData = async (req, res) => {
  try {
    profileUpdateDataValidation(req);
    const updatedData = req.body;
    const updateIn = req.user;
    Object.keys(updatedData).forEach(
      (key) => (updateIn[key] = updatedData[key])
    );

    updateIn.save();
    res.send(`${updateIn.firstName} you Data is Updated successfuly....!`);
  } catch (err) {
    res.json({
      message: "Problem occur's while Updating",
      Error: `${err}`,
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
  profileUpdateData,
};
