const express = require("express");
const router = express.Router();
const { profile, allProfils } = require("../controllers/profile.controller.js");
const { userAuth } = require("../meddilware/Auth.js");

router.get("/allUsers", userAuth, allProfils);
router.get("/profile", userAuth, profile);

module.exports = router;
