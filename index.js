const express = require("express");
const connectDB = require("./src/config/database.js");
const authRouter = require("./src/routes/auth.route.js");
const requestRouter = require("./src/routes/request.route.js");
const profileRouter = require("./src/routes/profile.route.js");

const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);

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
