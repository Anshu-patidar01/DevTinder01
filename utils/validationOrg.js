const { Error } = require("mongoose");
const validator = require("validator");

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

const loginValidation = (req) => {
  if (!validator.isEmail(req.body.email)) {
    throw new Error("Please Enter valid Email address...");
  }
};

const profileUpdateDataValidation = (req) => {
  const allowedKeys = ["fistName", "lastName", "email", "skills", "gender"];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedKeys.includes(field)
  );
  if (!isAllowed) {
    throw new Error("Edit not Allowed...!");
  }
};

module.exports = {
  signupValidation,
  loginValidation,
  profileUpdateDataValidation,
};
