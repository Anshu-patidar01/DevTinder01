const express = require("express");
const router = express.Router();
const {
  profile,
  allProfils,
  profileUpdateData,
} = require("../controllers/profile.controller.js");
const { userAuth } = require("../meddilware/Auth.js");

router.get("/allUsers", userAuth, allProfils);
router.get("/profile/view", userAuth, profile);
router.patch("/profile/update", userAuth, profileUpdateData);

module.exports = router;
