const express = require("express");
const router = express.Router();
const {
  sendrequest,
  profile,
  deletebyid,
  findbyemail,
  findbyid,
  allProfils,
  signup,
  update,
  updatebyemail,
  login,
} = require("../controllers/user.controller.js");
const { userAuth } = require("../meddilware/Auth.js");

router.get("/allUsers", allProfils);
router.get("/profile", userAuth, profile);
router.get("/:id", findbyid);
router.post("/sendrequest", userAuth, sendrequest);
router.post("/signup", signup);
router.post("/login", login);
router.post("/email", findbyemail);

router.patch("/update/:id", update);
router.patch("/updatebyemail", updatebyemail);

router.delete("/:id", deletebyid);

module.exports = router;
