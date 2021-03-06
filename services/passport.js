const passport = require("passport"); //generic
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users"); //model class

passport.serializeUser((user, done) => {
  done(null, user.id); //identifying piece of info //kind of token
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", //route to which user is sent when they grant permission
      proxy: true, //trust heroku proxy and calculate callback url correctly
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken',accessToken);//after callback
      // console.log('refresh token',refreshToken);
      // console.log('profile:',profile);
      const existingUser = await User.findOne({ googleId: profile.id }); //check if there already exist a user with same profile id

      if (existingUser) {
        //we already have a record with given profile id
        return done(null, existingUser); //null->no error,2nd argument-> thats the user i found
      }
      //we don't have a user
      const user = new User({ googleId: profile.id }).save(); //new model instance
      done(null, user); //because the operation is asynchronus and we have to make sure that user has logged in
    }
  )
); //authenticate user with GoogleStrategy
