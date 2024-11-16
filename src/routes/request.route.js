const express = require("express");
const router = express.Router();
const { sendrequest } = require("../controllers/request.controller.js");
const { userAuth } = require("../meddilware/Auth.js");

router.post("/sendrequest", userAuth, sendrequest);

module.exports = router;
