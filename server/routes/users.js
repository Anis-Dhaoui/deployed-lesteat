var express = require('express');
var User = require('../models/userSchema');
var userRouter = express.Router();
var passport = require('passport');
var auth = require('../auth');
const cors = require('./cors');

userRouter.options('*', cors.corsWithOpts, (req, res) => res.status = 200)
/* GET users listing. */
userRouter.get('/', cors.corsWithOpts, function (req, res, next) {
  res.send('respond with a resource');
});

userRouter.post('/signup', cors.corsWithOpts, (req, res, next) => {
  User.register(
    new User(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
      }), req.body.password, (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ Error: err });
        } else {
          passport.authenticate('local')
            (req, res, () => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({ Success: true, status: "Registration Success" });
            })
        }
      })
});

userRouter.post('/login', cors.corsWithOpts, (req, res, next) => {

  User.findOne({ username: req.body.username }, (err, user) => {

    if (user === null) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.send({ success: false, status: "login unsuccessful", err: "User not found" });
    } else {
      passport.authenticate('local', (err, user, info) => {
        if (err){
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, status: "login unsuccessful", err: "Password is incorrect" });
          } else {
            var token = auth.getToken({ _id: req.user._id });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: true,
              status: "Login Successfull!",
              token: token,
              userInfo: {
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                email: req.user.email,
                username: req.user.username,
                admin: req.user.admin
              }
            });
          }
        });
      })(req, res, next);
    }
  })

});


userRouter.delete('/logout', cors.corsWithOpts, (req, res, next) => {
  // console.log(req.session);
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');

    // req.session.message = {message: "Logged out successfully"}
    // or
    // req.flash('notice', "Successfully logged out");

    res.redirect('/');

  } else {
    var err = new Error("You are not logged in");
    next(err);
  }
})
module.exports = userRouter;