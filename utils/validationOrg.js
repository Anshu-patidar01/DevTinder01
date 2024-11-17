const { Error } = require("mongoose");
const validator = require("validator");

//signUp validation
const signupValidation = (req) => {
  const { firstName, lastName, email, password, skills, age, gender } =
    req.body;
  //Validation for firstname and lastname
  const namePattern = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
  if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
    throw new Error(
      "Please enter a valid name using only letters, hyphens, spaces, and apostrophes."
    );
  }

  // if (!firstName || !email || !password)
  //   throw new Error("FirstName, email and password are compulsory...!");

  //Validation for email address
  if (!validator.isEmail(email)) {
    throw new Error(
      "Please Enter a valid email address(e.g., name@gmail.com)."
    );
  }

  //validation for password
  const isStrongPassword = validator.isStrongPassword(password);
  if (!isStrongPassword) {
    throw new Error("please enter Strong passsword!!");
  }

  //validation for skills
  if (skills.length > 20) {
    throw new Error(
      "You have exceeded the limit of 20 skills. Please reduce the number of skills to 20 or fewer."
    );
  } else {
    for (const skill of skills) {
      if (skill.length > 20) {
        throw new Error(
          "You have exceeded the limit of 20 words on skill. Please reduce the number of works to 20 or fewer."
        );
      }
    }
  }

  //validation for the gender
  if (gender !== ("male" || "female" || "other")) {
    throw new Error("please enter valid gender 'male' , 'female' or 'other'.");
  }
};

//login validation
const loginValidation = (req) => {
  if (!validator.isEmail(req.body.email)) {
    throw new Error("Please Enter valid Email address...");
  }
};

//profile validation
const profileUpdateDataValidation = (req) => {
  const allowedKeys = ["fistName", "lastName", "email", "skills", "gender"];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedKeys.includes(field)
  );
  if (!isAllowed) {
    throw new Error("Edit not Allowed...!");
  }
};

// password validation
const passwordUpdateValidation = (req) => {
  const allowedData = ["newPassword", "confirmPassword", "oldPassword"];
  const { newPassword, oldPassword, confirmPassword } = req.body;
  if (!newPassword || !oldPassword || !confirmPassword) {
    throw new Error("Please provide all the fields...!");
  }

  const isStrongPassword = validator.isStrongPassword(newPassword);
  if (!isStrongPassword) {
    throw new Error("please enter Strong passsword!!");
  }

  if (oldPassword == newPassword)
    throw new Error("Your old and new password is Same...!");

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedData.includes(field)
  );
  if (!isAllowed) throw new Error("Update password is not allowed....!");
  if (req.body.newPassword != req.body.confirmPassword)
    throw new Error("password does not Match to confirm Password...!");
};

module.exports = {
  signupValidation,
  loginValidation,
  profileUpdateDataValidation,
  passwordUpdateValidation,
};
