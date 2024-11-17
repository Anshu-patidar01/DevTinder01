const updatePassword = require("../controllers/password.controller");
const { userAuth } = require("../meddilware/Auth.js");
const Router = require("express").Router();

Router.patch("/password", userAuth, updatePassword);

module.exports = Router;
