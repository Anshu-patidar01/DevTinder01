const { passwordUpdateValidation } = require("../../utils/validationOrg.js");
const bcrypt = require("bcrypt");
const updatePassword = async (req, res) => {
  try {
    passwordUpdateValidation(req);
    const { newPassword, oldPassword } = req.body;
    const UserPassword = req.user;

    const isMatch = await bcrypt.compare(oldPassword, req.user.password);
    if (!isMatch) throw new Error("Oldpassword is not matched...!");

    const bcryptPassword = await bcrypt.hash(newPassword, 10);
    req.user.password = bcryptPassword;

    await UserPassword.save();

    res.send("updating password....!");
  } catch (error) {
    res.json({
      message: "Problem while Updating the Password...!",
      Error: `${error}`,
    });
  }
};
module.exports = updatePassword;
