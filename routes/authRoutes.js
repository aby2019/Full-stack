
const passport = require('passport');
 module.exports = app => {

app.get('/auth/google',
passport.authenticate('google',{//this internally finds the google strategy that we have defined above using passport
  scope: ['profile','email']//reading user details- a lot more can be accessed
  })
);

app.get('/auth/google/callback',passport.authenticate('google'));//here the code is avaialaible that google sent us

app.get('/api/logout',(req,res) => {
    req.logout();
    res.send(req.user);
});
app.get('/api/current_user',(req,res)=> {
  res.send(req.user);
  // res.send(req.session);
});
};
