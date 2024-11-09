const express = require("express");
const connectDB = require("./src/config/database.js");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

connectDB()
  .then(() => {
    console.log("DB connection succesfully....");
    app.listen(port || 5000, () => {
      console.log("listening at PORT ::", port);
    });
  })
  .catch((err) => {
    console.error("DB is note Connected!!!!!!", err);
  });
