const express=require('express');//common js modules
// import express from 'express'; es 2015 module
const mongoose=require('mongoose');
const cookieSession= require('cookie-session');
const keys =require('./config/keys');
const passport=require('passport');
require('./models/User');
require('./services/passport');
 
mongoose.connect(keys.mongoURI);
const app = express();
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,//30 days
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app); //the function returned is called immediately with 'app' argument


const PORT = process.env.PORT || 5000;
app.listen(PORT);
