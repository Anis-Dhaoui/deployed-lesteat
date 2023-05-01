var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var passport = require('passport');
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var plateRouter = require('./routes/plateRouter');
var staffRouter = require('./routes/staffRouter');
var uploadRouter = require('./routes/uploadRouter');
var feedbackRouter = require('./routes/feedbackRouter');
var wishListRouter = require('./routes/wishListRouter');
var helmet = require('helmet');

// Connecting with Mongodb Server
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
const url = process.env.mongoUrl;
const connect = mongoose.connect(process.env.MONGODB_URI || url);
connect.then((db) => {
  console.log("Connected to Mongodb Server Correctly... " + db.connections[0]._connectionString);
}, (err) => console.log("Cannot connect to Mongodb server... " + err));

var app = express();

// $$$$$$$$$$$$$$$$$$ Redirect all incomming http request to https $$$$$$$$$$$$$$$$$$
// app.all('*', (req, res, next) => {
//   if(req.secure){
//     return next();
//   }else{
//     res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//   }
// });
// $$$$$$$$$$$$$$$$$$ END $$$$$$$$$$$$$$$$$$

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// This disables the `contentSecurityPolicy` middleware but keeps the rest.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/plates', plateRouter);
app.use('/staff', staffRouter);
app.use('/feedback', feedbackRouter);
app.use('/wishlist', wishListRouter);
app.use('/uploadimg', uploadRouter);
app.use('/', indexRouter);

// app.get('/*', (req, res) => {
//   console.log("******************************");
//   console.log(req.hostname + req.url);
//   console.log("******************************");
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
