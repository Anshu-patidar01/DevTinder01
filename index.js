const express = require("express");
const connectDB = require("./src/config/database.js");
const router = require("./src/routes/user.route.js");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());

app.use("/api/user", router);

connectDB()
  .then(() => {
    app.listen(port || 5000, () => {
      console.log("listening at PORT ::", port);
    });
    console.log("DB connection succesfully....");
  })
  .catch((err) => {
    console.error("DB is note Connected!!!!!!", err);
  });
