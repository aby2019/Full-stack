const express = require("express"); //common js modules
// import express from 'express'; es 2015 module
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app); //the function returned is called immediately with 'app' argument
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //express will serve up production assets -> main.js or main.css file;
  app.use(express.static("client/build"));
  //express will serve up the index.html file if it does not recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
