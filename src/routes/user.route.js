const express = require("express");
const router = express.Router();
const {
  deletebyid,
  findbyemail,
  findbyid,
  allProfils,
  signup,
  update,
  updatebyemail,
  login,
} = require("../controllers/user.controller.js");

router.get("/profils", allProfils);
router.get("/:id", findbyid);
router.delete("/:id", deletebyid);
router.post("/signup", signup);
router.post("/login", login);
router.post("/email", findbyemail);
router.patch("/update/:id", update);
router.patch("/updatebyemail", updatebyemail);

module.exports = router;
